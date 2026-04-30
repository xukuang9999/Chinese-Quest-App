import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { enrichEntriesWithHwxnet } from "./hwxnet-enrichment.mjs";

const TARGET_CHARACTER_COUNT = 800;
const PRESERVED_CHARACTER_COUNT = 300;
const LESSON_SIZE = 5;
const IDIOM_TARGET = 200;
const DATA_PATH = fileURLToPath(new URL("../data.js", import.meta.url));
const DB_PATH = fileURLToPath(new URL("../data/chinese-study.sqlite", import.meta.url));

const SOURCES = {
  xinhua: "https://raw.githubusercontent.com/pwxcoo/chinese-xinhua/master/data/word.json",
  xinhuaIdioms: "https://raw.githubusercontent.com/pwxcoo/chinese-xinhua/master/data/idiom.json",
  commonBase: "https://raw.githubusercontent.com/mapull/chinese-dictionary/main/character/common/char_common_base.json",
  makeMeAHanzi: "https://raw.githubusercontent.com/skishore/makemeahanzi/master/dictionary.txt",
  hskVocabulary: "https://raw.githubusercontent.com/drkameleon/complete-hsk-vocabulary/main/complete.min.json",
  cedictPackage: "cedict-json",
};

const STRUCTURE_LABELS = {
  D0: "single component",
  D1: "single component",
  A0: "stacked repeated parts",
  B0: "top-bottom",
  B1: "top-bottom",
  B2: "top-bottom",
  B3: "top-bottom",
  B4: "four-part",
  E0: "top-middle-bottom",
  E1: "top-middle-bottom",
  E2: "top-middle-bottom",
  H0: "left-right",
  H1: "left-right",
  H2: "left-right",
  H3: "left-right",
  M0: "left-middle-right",
  M1: "left-middle-right",
  M2: "left-middle-right",
  Q0: "full enclosure",
  R0: "semi-enclosure",
  R1: "semi-enclosure",
  R2: "semi-enclosure",
  R3: "semi-enclosure",
  R4: "semi-enclosure",
  R5: "semi-enclosure",
  R6: "semi-enclosure",
};

const WORD_OVERRIDES = {
  叼: [
    ["叼着", "to hold in the mouth"],
    ["叼住", "to grip with the mouth"],
    ["叼走", "to carry away in the mouth"],
  ],
  扛: [
    ["扛起", "to lift onto the shoulder"],
    ["扛住", "to withstand"],
    ["肩扛", "to carry on the shoulder"],
  ],
  轧: [
    ["轧钢", "to roll steel"],
    ["轧制", "rolling metal"],
    ["倾轧", "to compete and squeeze each other out"],
  ],
};

const ENTRY_REPAIRS = {
  友: {
    words: [
      ["友爱", "friendly love"],
      ["朋友", "friend"],
      ["友好", "friendly"],
    ],
    sentences: [
      ["同学之间要友爱。", "Classmates should be kind and caring to one another."],
      ["我和朋友一起学习。", "I study together with my friend."],
      ["他对新同学很友好。", "He is friendly to the new classmate."],
    ],
  },
  街: {
    words: [
      ["街道", "street"],
      ["街上", "on the street"],
      ["街口", "street entrance"],
    ],
    sentences: [
      ["这条街道很干净。", "This street is very clean."],
      ["放学后，街上很安静。", "After school, the street is quiet."],
      ["我们在街口等车。", "We wait for the bus at the street entrance."],
    ],
  },
  以: {
    words: [
      ["以前", "before"],
      ["以后", "later"],
      ["所以", "so"],
    ],
    sentences: [
      ["以前，我不会写这个字。", "Before, I could not write this character."],
      ["以后，我会每天练习。", "Later, I will practise every day."],
      ["我认真练习，所以进步了。", "I practised carefully, so I improved."],
    ],
  },
  澳: {
    words: [
      ["澳洲人", "Australian person"],
      ["澳洲", "Australia"],
      ["澳元", "Australian dollar"],
    ],
    sentences: [
      ["我的老师是澳洲人。", "My teacher is Australian."],
      ["澳洲有很多学校。", "Australia has many schools."],
      ["这个本子要两澳元。", "This notebook costs two Australian dollars."],
    ],
  },
  系: {
    words: [
      ["没关系", "no problem"],
      ["关系", "relationship"],
      ["系鞋带", "tie shoelaces"],
    ],
    sentences: [
      ["他说没关系。", "He says it is no problem."],
      ["我和同学关系很好。", "My relationship with my classmate is good."],
      ["我会系鞋带。", "I can tie shoelaces."],
    ],
  },
  颜: {
    words: [
      ["颜色", "colour"],
      ["颜料", "paint; pigment"],
      ["笑颜", "smiling face"],
    ],
    sentences: [
      ["这幅画的颜色很好看。", "The colours in this picture look nice."],
      ["我用颜料画花。", "I use paint to draw flowers."],
      ["她的笑颜很温暖。", "Her smiling face is warm."],
    ],
  },
  做: {
    words: [
      ["叫做", "be called"],
      ["做事", "do things"],
      ["做饭", "cook a meal"],
    ],
    sentences: [
      ["这个字叫做“山”。", "This character is called '山'."],
      ["做事要认真。", "We should do things carefully."],
      ["妈妈在厨房做饭。", "Mum cooks a meal in the kitchen."],
    ],
  },
  的: {
    words: [
      ["我的", "my"],
      ["你的", "your"],
      ["他的", "his"],
    ],
    sentences: [
      ["这是我的铅笔。", "This is my pencil."],
      ["你的名字写得很好。", "Your name is written very well."],
      ["他的书包在桌子上。", "His school bag is on the desk."],
    ],
  },
  身: {
    words: [
      ["身体", "body"],
      ["身上", "on the body"],
      ["身边", "beside someone"],
    ],
    sentences: [
      ["体育课上，我们锻炼身体。", "In PE class, we exercise our bodies."],
      ["我的身上有雨水。", "There is rainwater on my body."],
      ["朋友坐在我身边。", "My friend sits beside me."],
    ],
  },
  洗: {
    words: [
      ["洗手", "wash hands"],
      ["洗脸", "wash face"],
      ["洗澡", "take a bath or shower"],
    ],
    sentences: [
      ["吃饭前，我先洗手。", "Before eating, I wash my hands."],
      ["早上起床后，我洗脸。", "After getting up in the morning, I wash my face."],
      ["运动后，我回家洗澡。", "After exercise, I go home and take a shower."],
    ],
  },
  在: {
    words: [
      ["在家", "at home"],
      ["正在", "in the middle of doing"],
      ["现在", "now"],
    ],
    sentences: [
      ["周末我在家写作业。", "On the weekend, I do homework at home."],
      ["我正在写中文作业。", "I am doing my Chinese homework now."],
      ["现在，我开始上课。", "Now, I start class."],
    ],
  },
  运: {
    words: [
      ["运河", "canal"],
      ["运动", "sport; exercise"],
      ["运气", "luck"],
    ],
    sentences: [
      ["地图上有一条运河。", "There is a canal on the map."],
      ["放学后，我去运动。", "After school, I exercise."],
      ["今天我的运气很好。", "My luck is good today."],
    ],
  },
  和: {
    words: [
      ["和好", "make peace"],
      ["和平", "peace"],
      ["和气", "kind and friendly"],
    ],
    sentences: [
      ["两个朋友又和好了。", "The two friends made peace again."],
      ["我们喜欢和平。", "We like peace."],
      ["她说话很和气。", "She speaks in a kind and friendly way."],
    ],
  },
  球: {
    words: [
      ["南半球", "Southern Hemisphere"],
      ["足球", "soccer"],
      ["球场", "sports field"],
    ],
    sentences: [
      ["地图上，澳洲在南半球。", "On the map, Australia is in the Southern Hemisphere."],
      ["下课后，我们踢足球。", "After class, we play soccer."],
      ["学生在球场上跑步。", "Students run on the sports field."],
    ],
  },
  地: {
    words: [
      ["地图", "map"],
      ["土地", "land; soil"],
      ["草地", "grass"],
    ],
    sentences: [
      ["我用地图找学校。", "I use a map to find the school."],
      ["农民在土地上种菜。", "Farmers grow vegetables on the land."],
      ["孩子们在草地上玩。", "Children play on the grass."],
    ],
  },
  火: {
    words: [
      ["火山", "volcano"],
      ["火车", "train"],
      ["火苗", "flame"],
    ],
    sentences: [
      ["书上有一张火山的图片。", "There is a picture of a volcano in the book."],
      ["我在车站看见火车。", "I see a train at the station."],
      ["火苗很小，请注意安全。", "The flame is small; please be careful."],
    ],
  },
  果: {
    words: [
      ["吃水果", "eat fruit"],
      ["因果", "cause and effect"],
      ["糖果", "lolly; candy"],
    ],
    sentences: [
      ["我每天吃水果。", "I eat fruit every day."],
      ["老师用故事说明因果。", "The teacher uses a story to explain cause and effect."],
      ["午饭后，我吃了一颗糖果。", "After lunch, I eat one piece of candy."],
    ],
  },
  奶: {
    words: [
      ["喝奶", "drink milk"],
      ["牛奶", "milk"],
      ["奶茶", "milk tea"],
    ],
    sentences: [
      ["弟弟喜欢喝奶。", "My younger brother likes drinking milk."],
      ["桌上放着牛奶。", "There is milk on the table."],
      ["我想尝一尝奶茶。", "I want to try milk tea."],
    ],
  },
  喜: {
    words: [
      ["喜欢", "like"],
      ["喜爱", "like; love"],
      ["喜事", "happy event"],
    ],
    sentences: [
      ["我喜欢学中文。", "I like learning Chinese."],
      ["姐姐喜爱唱歌。", "My older sister loves singing."],
      ["妹妹听到喜事，很开心。", "My younger sister is happy when she hears about the happy event."],
    ],
  },
  爱: {
    words: [
      ["喜爱", "like; love"],
      ["友爱", "friendly love"],
      ["爱心", "loving heart"],
    ],
    sentences: [
      ["妹妹喜爱唱中文歌。", "My younger sister likes singing Chinese songs."],
      ["我们在班里学习友爱。", "We learn friendly love in class."],
      ["她很有爱心。", "She has a loving heart."],
    ],
  },
  少: {
    words: [
      ["多少", "how many"],
      ["少年", "young person"],
      ["少女", "young girl"],
    ],
    sentences: [
      ["你认识多少汉字？", "How many Chinese characters do you know?"],
      ["那位少年在操场上跑步。", "That young person is running on the playground."],
      ["这位少女在读书。", "This young girl is reading."],
    ],
  },
  船: {
    words: [
      ["船只", "boat"],
      ["小船", "small boat"],
      ["船上", "on the boat"],
    ],
    sentences: [
      ["河里有很多船只。", "There are many boats in the river."],
      ["湖边有一只小船。", "There is a small boat by the lake."],
      ["我们在船上看海。", "We look at the sea from the boat."],
    ],
  },
  谁: {
    words: [
      ["谁的", "whose"],
      ["谁家", "whose family"],
      ["谁呀", "who is it"],
    ],
    sentences: [
      ["这是谁的书包？", "Whose school bag is this?"],
      ["这本书是谁家的？", "Whose family's book is this?"],
      ["门外有人，我问：“谁呀？”", "Someone is outside the door, and I ask who it is."],
    ],
  },
  那: {
    words: [
      ["那个", "that"],
      ["那边", "that side"],
      ["那里", "there"],
    ],
    sentences: [
      ["那个书包是我的。", "That school bag is mine."],
      ["请看那边的位置。", "Please look at the position on that side."],
      ["那里有一家书店。", "There is a bookstore there."],
    ],
  },
  练: {
    words: [
      ["练习", "practice"],
      ["练字", "practice writing characters"],
      ["练歌", "practice singing"],
    ],
    sentences: [
      ["我每天练习写汉字。", "I practise writing Chinese characters every day."],
      ["中文课上，我们练字。", "In Chinese class, we practise writing characters."],
      ["放学后，她去练歌。", "After school, she goes to practise singing."],
    ],
  },
  只: {
    words: [
      ["一只", "one animal or small item"],
      ["两只", "two animals or small items"],
      ["六只", "six animals or small items"],
    ],
    sentences: [
      ["草地上有一只小鸟。", "There is one bird on the grass."],
      ["树上有两只小鸟。", "There are two birds in the tree."],
      ["图画里有六只小羊。", "There are six lambs in the picture."],
    ],
  },
  夏: {
    words: [
      ["夏天", "summer"],
      ["夏日", "summer day"],
      ["夏季", "summer season"],
    ],
    sentences: [
      ["夏天很热。", "Summer is hot."],
      ["夏日的阳光很亮。", "The sunshine on a summer day is bright."],
      ["夏季，我在家读书。", "In the summer season, I read at home."],
    ],
  },
  半: {
    words: [
      ["南半球", "Southern Hemisphere"],
      ["半天", "half a day"],
      ["半个", "half of one item"],
    ],
    sentences: [
      ["澳洲在南半球。", "Australia is in the Southern Hemisphere."],
      ["我用半天完成作业。", "I use half a day to finish my homework."],
      ["盒子里有半个苹果。", "There is half an apple in the box."],
    ],
  },
  仆: {
    words: [
      ["公仆", "public servant"],
      ["仆人", "servant"],
      ["仆从", "attendant"],
    ],
    sentences: [
      ["警察是人民的公仆。", "Police officers are public servants."],
      ["故事里的仆人帮主人开门。", "The servant in the story helps open the door."],
      ["古代有仆从跟在车旁。", "In ancient times, an attendant followed beside the cart."],
    ],
  },
  孔: {
    words: [
      ["孔子", "Confucius"],
      ["小孔", "small hole"],
      ["面孔", "face"],
    ],
    sentences: [
      ["孔子是中国古代的老师。", "Confucius was a teacher in ancient China."],
      ["纸上有一个小孔。", "There is a small hole in the paper."],
      ["他的面孔带着笑容。", "His face has a smile."],
    ],
  },
  英: {
    words: [
      ["英国", "United Kingdom"],
      ["英文", "written English"],
      ["英语", "English language"],
    ],
    sentences: [
      ["英国有很多学校。", "The United Kingdom has many schools."],
      ["我会读简单的英文。", "I can read simple written English."],
      ["她每天练习英语。", "She practises English every day."],
    ],
  },
  跑: {
    words: [
      ["短跑", "sprint"],
      ["慢跑", "jog"],
      ["跑道", "running track"],
    ],
    sentences: [
      ["运动会上，我参加短跑。", "At the sports day, I take part in the sprint."],
      ["放学后，我在操场慢跑。", "After school, I jog on the playground."],
      ["比赛时，大家沿着跑道向前跑。", "During the race, everyone runs forward along the running track."],
    ],
  },
  南: {
    words: [
      ["南半球", "Southern Hemisphere"],
      ["南方", "south"],
      ["南边", "south side"],
    ],
    sentences: [
      ["地图上可以看到南半球。", "The Southern Hemisphere can be seen on the map."],
      ["太阳从南方照进教室。", "The sun shines into the classroom from the south."],
      ["学校在公园的南边。", "The school is on the south side of the park."],
    ],
  },
  先: {
    words: [
      ["先生", "gentleman"],
      ["首先", "first"],
      ["先后", "one after another"],
    ],
    sentences: [
      ["这位先生是我们的老师。", "This gentleman is our teacher."],
      ["上课前，首先请坐好。", "Before class, first please sit properly."],
      ["他们先后走进教室。", "They walk into the classroom one after another."],
    ],
  },
  期: {
    words: [
      ["星期", "week"],
      ["星期天", "Sunday"],
      ["期末", "end of term"],
    ],
    sentences: [
      ["这个星期我每天练习中文。", "This week, I practise Chinese every day."],
      ["星期天，我们去图书馆。", "On Sunday, we go to the library."],
      ["期末，我们有中文表演。", "At the end of the term, we have a Chinese performance."],
    ],
  },
  时: {
    words: [
      ["同时", "at the same time"],
      ["时间", "time"],
      ["时候", "time; moment"],
    ],
    sentences: [
      ["我们同时举手回答。", "We raise our hands to answer at the same time."],
      ["学习时间到了。", "Study time has arrived."],
      ["吃饭的时候，请不要看电视。", "When eating, please do not watch TV."],
    ],
  },
  童: {
    words: [
      ["儿童", "children"],
      ["童年", "childhood"],
      ["童话", "fairy tale"],
    ],
    sentences: [
      ["公园里有很多儿童。", "There are many children in the park."],
      ["童年的故事很温暖。", "Childhood stories are warm."],
      ["睡觉前，妈妈讲童话。", "Before bedtime, Mum tells a fairy tale."],
    ],
  },
  找: {
    words: [
      ["找到", "find"],
      ["找人", "find someone"],
      ["寻找", "search for"],
    ],
    sentences: [
      ["我找到正确答案。", "I find the correct answer."],
      ["老师请我找人帮忙。", "The teacher asks me to find someone to help."],
      ["我们在图书馆寻找一本书。", "We search for a book in the library."],
    ],
  },
  心: {
    words: [
      ["爱心", "loving heart"],
      ["热心", "warm-hearted"],
      ["关心", "care about"],
    ],
    sentences: [
      ["她用爱心帮助同学。", "She helps classmates with kindness."],
      ["这位同学热心帮助大家。", "This classmate warmly helps everyone."],
      ["妈妈很关心我的学习。", "Mum cares about my study."],
    ],
  },
  勇: {
    words: [
      ["勇士", "brave person"],
      ["勇气", "courage"],
      ["勇敢", "brave"],
    ],
    sentences: [
      ["故事里的勇士保护大家。", "The brave person in the story protects everyone."],
      ["我有勇气回答问题。", "I have the courage to answer the question."],
      ["他很勇敢。", "He is brave."],
    ],
  },
  金: {
    words: [
      ["金星", "Venus"],
      ["金色", "gold colour"],
      ["金鱼", "goldfish"],
    ],
    sentences: [
      ["晚上，我看见天上的金星。", "At night, I see Venus in the sky."],
      ["我用金色画星星。", "I use gold colour to draw stars."],
      ["鱼缸里有一条金鱼。", "There is a goldfish in the fish tank."],
    ],
  },
  花: {
    words: [
      ["雪花", "snowflake"],
      ["花园", "garden"],
      ["卖花", "sell flowers"],
    ],
    sentences: [
      ["冬天，窗外飘着雪花。", "In winter, snowflakes float outside the window."],
      ["花园里有很多花。", "There are many flowers in the garden."],
      ["店里有人卖花。", "Someone sells flowers in the shop."],
    ],
  },
  牛: {
    words: [
      ["牛肉", "beef"],
      ["牛奶", "milk"],
      ["牛羊", "cows and sheep"],
    ],
    sentences: [
      ["桌上有一盘牛肉。", "There is a plate of beef on the table."],
      ["早餐时，我喝牛奶。", "At breakfast, I drink milk."],
      ["牛羊在草地上吃草。", "Cows and sheep eat grass on the grassland."],
    ],
  },
  把: {
    words: [
      ["把握", "confidence; grasp"],
      ["把手", "handle"],
      ["把戏", "trick"],
    ],
    sentences: [
      ["我有把握读准这个字。", "I am confident I can read this character correctly."],
      ["门上的把手很干净。", "The handle on the door is clean."],
      ["这个把戏很有趣。", "This trick is interesting."],
    ],
  },
  两: {
    words: [
      ["两边", "both sides"],
      ["两侧", "two sides"],
      ["两岸", "both banks"],
    ],
    sentences: [
      ["路的两边都有树。", "There are trees on both sides of the road."],
      ["教室两侧都有窗户。", "There are windows on both sides of the classroom."],
      ["河的两岸开满了花。", "Flowers bloom on both banks of the river."],
    ],
  },
  县: {
    words: [
      ["县城", "county town"],
      ["县长", "county head"],
      ["市县", "cities and counties"],
    ],
    sentences: [
      ["这个县城有一所新学校。", "This county town has a new school."],
      ["县长来学校看学生。", "The county head visits the students at school."],
      ["我们认识了几个市县的名字。", "We learn the names of several cities and counties."],
    ],
  },
  低: {
    words: [
      ["低头", "lower one's head"],
      ["低声", "low voice"],
      ["低调", "low-key"],
    ],
    sentences: [
      ["他低头认真写字。", "He lowers his head and writes carefully."],
      ["图书馆里，我们低声说话。", "In the library, we speak in low voices."],
      ["她做事很低调。", "She does things in a low-key way."],
    ],
  },
  究: {
    words: [
      ["究竟", "exactly; after all"],
      ["研究", "research"],
      ["终究", "in the end"],
    ],
    sentences: [
      ["这究竟是什么意思？", "What exactly does this mean?"],
      ["老师带我们研究汉字。", "The teacher leads us to research Chinese characters."],
      ["认真练习终究会进步。", "Careful practice will lead to improvement in the end."],
    ],
  },
  即: {
    words: [
      ["即使", "even if"],
      ["即将", "be about to"],
      ["即便", "even if"],
    ],
    sentences: [
      ["即使下雨，我们也去上课。", "Even if it rains, we still go to class."],
      ["中文课即将开始。", "Chinese class is about to begin."],
      ["即便很难，我也会练习。", "Even if it is difficult, I will practise."],
    ],
  },
  直: {
    words: [
      ["直接", "direct"],
      ["直到", "until"],
      ["一直", "always; continuously"],
    ],
    sentences: [
      ["请直接回答问题。", "Please answer the question directly."],
      ["我们一直读书，直到下课。", "We keep reading until class ends."],
      ["她一直认真学习中文。", "She always studies Chinese carefully."],
    ],
  },
  命: {
    words: [
      ["命令", "order"],
      ["生命", "life"],
      ["使命", "mission"],
    ],
    sentences: [
      ["老师没有命令我们快跑。", "The teacher does not order us to run fast."],
      ["水对生命很重要。", "Water is important for life."],
      ["保护环境是大家的使命。", "Protecting the environment is everyone's mission."],
    ],
  },
  始: {
    words: [
      ["始终", "from beginning to end"],
      ["开始", "begin"],
      ["原始", "primitive; original"],
    ],
    sentences: [
      ["他始终认真听课。", "He listens carefully from beginning to end."],
      ["音乐响起，课程开始了。", "When the music starts, the lesson begins."],
      ["博物馆里有原始工具。", "There are primitive tools in the museum."],
    ],
  },
  线: {
    words: [
      ["线索", "clue"],
      ["线路", "route; line"],
      ["一线", "front line"],
    ],
    sentences: [
      ["故事里有一个重要线索。", "There is an important clue in the story."],
      ["这条公交线路经过学校。", "This bus route passes the school."],
      ["医生工作在一线。", "Doctors work on the front line."],
    ],
  },
  革: {
    words: [
      ["革命", "revolution"],
      ["改革", "reform"],
      ["变革", "transformation"],
    ],
    sentences: [
      ["历史课上，我们学习革命故事。", "In history class, we study a revolutionary story."],
      ["学校进行新的改革。", "The school carries out a new reform."],
      ["科技带来了很多变革。", "Technology has brought many transformations."],
    ],
  },
  重: {
    words: [
      ["重要", "important"],
      ["重新", "again"],
      ["重点", "key point"],
    ],
    sentences: [
      ["认真听讲很重要。", "Listening carefully is important."],
      ["写错了，我重新写一遍。", "I wrote it wrong, so I write it again."],
      ["老师圈出了今天的重点。", "The teacher circles today's key point."],
    ],
  },
  便: {
    words: [
      ["便宜", "cheap"],
      ["便利", "convenient"],
      ["方便", "convenient"],
    ],
    sentences: [
      ["这支铅笔很便宜。", "This pencil is cheap."],
      ["这里的交通很便利。", "The transport here is convenient."],
      ["用字典查字很方便。", "It is convenient to look up characters in a dictionary."],
    ],
  },
  般: {
    words: [
      ["一般", "ordinary; general"],
      ["这般", "this kind"],
      ["万般", "all kinds of"],
    ],
    sentences: [
      ["这是一道一般难度的题。", "This is a question of ordinary difficulty."],
      ["这般努力值得表扬。", "This kind of effort deserves praise."],
      ["生活里有万般变化。", "There are all kinds of changes in life."],
    ],
  },
  着: {
    words: [
      ["着急", "anxious"],
      ["接着", "then; next"],
      ["着力", "put effort into"],
    ],
    sentences: [
      ["找不到书包时，我很着急。", "When I cannot find my school bag, I feel anxious."],
      ["我们先读课文，接着写字。", "First we read the text, then we write characters."],
      ["学校着力提高阅读能力。", "The school puts effort into improving reading ability."],
    ],
  },
  酸: {
    words: [
      ["酸奶", "yogurt"],
      ["心酸", "sad"],
      ["辛酸", "hardship"],
    ],
    sentences: [
      ["早餐时，我喝酸奶。", "At breakfast, I drink yogurt."],
      ["听到这个故事，我有点心酸。", "When I hear this story, I feel a little sad."],
      ["爷爷讲起过去的辛酸。", "Grandpa talks about past hardship."],
    ],
  },
  丁: {
    words: [
      ["园丁", "gardener"],
      ["丁冬", "ding-dong sound"],
      ["人丁", "population"],
    ],
    sentences: [
      ["园丁每天照顾花草。", "The gardener looks after the flowers and plants every day."],
      ["门铃发出丁冬的声音。", "The doorbell makes a ding-dong sound."],
      ["这个村子人丁兴旺。", "This village has a thriving population."],
    ],
  },
  丸: {
    words: [
      ["丸子", "meatball"],
      ["丸剂", "pill"],
      ["定心丸", "reassurance"],
    ],
    sentences: [
      ["汤里有几个丸子。", "There are a few meatballs in the soup."],
      ["医生给了我一瓶丸剂。", "The doctor gives me a bottle of pills."],
      ["老师的话像一颗定心丸。", "The teacher's words feel like reassurance."],
    ],
  },
  井: {
    words: [
      ["水井", "water well"],
      ["井口", "well opening"],
      ["井水", "well water"],
    ],
    sentences: [
      ["村里有一口水井。", "There is a water well in the village."],
      ["井口旁边有一块石头。", "There is a stone beside the well opening."],
      ["井水很清凉。", "The well water is cool and clear."],
    ],
  },
  匹: {
    words: [
      ["匹配", "match"],
      ["马匹", "horses"],
      ["布匹", "cloth"],
    ],
    sentences: [
      ["这个答案和题目很匹配。", "This answer matches the question well."],
      ["草原上有很多马匹。", "There are many horses on the grassland."],
      ["店里摆着不同颜色的布匹。", "The shop displays cloth in different colours."],
    ],
  },
  冈: {
    words: [
      ["山冈", "hill"],
      ["冈峦", "hills"],
      ["冈陵", "low hills"],
    ],
    sentences: [
      ["山冈上开着小花。", "Small flowers bloom on the hill."],
      ["远处的冈峦连在一起。", "The distant hills are linked together."],
      ["地图上画着一片冈陵。", "A stretch of low hills is drawn on the map."],
    ],
  },
  仓: {
    words: [
      ["仓库", "warehouse"],
      ["仓促", "hasty"],
      ["仓位", "storage space"],
    ],
    sentences: [
      ["仓库里放着很多书。", "Many books are stored in the warehouse."],
      ["仓促出门容易忘东西。", "Leaving in a hurry makes it easy to forget things."],
      ["这个箱子占了一个仓位。", "This box takes up one storage space."],
    ],
  },
  丹: {
    words: [
      ["牡丹", "peony"],
      ["丹青", "painting"],
      ["丹心", "loyal heart"],
    ],
    sentences: [
      ["花园里的牡丹开了。", "The peonies in the garden have bloomed."],
      ["这幅丹青画得很美。", "This painting is very beautiful."],
      ["故事里的英雄有一片丹心。", "The hero in the story has a loyal heart."],
    ],
  },
  幻: {
    words: [
      ["幻想", "fantasy"],
      ["幻觉", "illusion"],
      ["梦幻", "dreamlike"],
    ],
    sentences: [
      ["他喜欢写充满幻想的故事。", "He likes writing stories full of fantasy."],
      ["太累的时候，人可能会有幻觉。", "When people are too tired, they may have illusions."],
      ["舞台上的灯光很梦幻。", "The lights on the stage are dreamlike."],
    ],
  },
  扑: {
    words: [
      ["扑灭", "put out"],
      ["扑克", "playing cards"],
      ["红扑扑", "rosy"],
    ],
    sentences: [
      ["消防员扑灭了小火。", "The firefighter puts out the small fire."],
      ["桌上放着一副扑克。", "There is a deck of playing cards on the table."],
      ["妹妹跑完步，脸红扑扑的。", "After running, my younger sister's face is rosy."],
    ],
  },
  旦: {
    words: [
      ["一旦", "once"],
      ["元旦", "New Year's Day"],
      ["旦夕", "morning and evening"],
    ],
    sentences: [
      ["一旦开始，就要认真完成。", "Once we begin, we should finish carefully."],
      ["元旦那天，学校放假。", "On New Year's Day, school is closed."],
      ["他旦夕练习书法。", "He practises calligraphy morning and evening."],
    ],
  },
  印: {
    words: [
      ["印象", "impression"],
      ["印刷", "printing"],
      ["打印", "print"],
    ],
    sentences: [
      ["这节课给我留下好印象。", "This lesson leaves me with a good impression."],
      ["这本书的印刷很清楚。", "The printing in this book is clear."],
      ["我把作业打印出来。", "I print out my homework."],
    ],
  },
  兰: {
    words: [
      ["兰花", "orchid"],
      ["兰草", "orchid grass"],
      ["玉兰", "magnolia"],
    ],
    sentences: [
      ["窗台上有一盆兰花。", "There is a pot of orchids on the windowsill."],
      ["兰草的叶子又细又长。", "The orchid grass has long thin leaves."],
      ["春天，玉兰开花了。", "In spring, the magnolia blooms."],
    ],
  },
  幼: {
    words: [
      ["幼儿", "young child"],
      ["幼儿园", "kindergarten"],
      ["幼稚", "childish; immature"],
    ],
    sentences: [
      ["幼儿需要大人照顾。", "Young children need adults to look after them."],
      ["妹妹每天去幼儿园。", "My younger sister goes to kindergarten every day."],
      ["这个想法有点幼稚。", "This idea is a little immature."],
    ],
  },
  吉: {
    words: [
      ["吉他", "guitar"],
      ["吉祥", "lucky; auspicious"],
      ["吉利", "lucky; auspicious"],
    ],
    sentences: [
      ["哥哥会弹吉他。", "My older brother can play the guitar."],
      ["红色在春节里很吉祥。", "Red is auspicious during Spring Festival."],
      ["大家都喜欢吉利的话。", "Everyone likes auspicious words."],
    ],
  },
  圾: {
    words: [
      ["垃圾", "trash"],
      ["垃圾桶", "rubbish bin"],
      ["垃圾车", "garbage truck"],
    ],
    sentences: [
      ["请把垃圾放进垃圾桶。", "Please put the trash into the rubbish bin."],
      ["教室门口有一个垃圾桶。", "There is a rubbish bin by the classroom door."],
      ["早上，垃圾车开过街道。", "In the morning, the garbage truck drives along the street."],
    ],
  },
  性: {
    words: [
      ["性格", "personality"],
      ["个性", "individuality"],
      ["女性", "woman; female"],
    ],
    sentences: [
      ["他的性格很开朗。", "His personality is cheerful."],
      ["每个人都有自己的个性。", "Everyone has their own individuality."],
      ["这本书介绍了很多女性作家。", "This book introduces many women writers."],
    ],
  },
  感: {
    words: [
      ["感觉", "feeling"],
      ["感谢", "thanks"],
      ["感动", "moved"],
    ],
    sentences: [
      ["我感觉今天很开心。", "I feel very happy today."],
      ["我要感谢老师的帮助。", "I want to thank the teacher for the help."],
      ["这个故事让我很感动。", "This story makes me feel moved."],
    ],
  },
  刃: {
    words: [
      ["刀刃", "knife blade"],
      ["刃具", "cutting tool"],
      ["利刃", "sharp blade"],
    ],
    sentences: [
      ["刀刃很锋利，请小心。", "The knife blade is sharp, so please be careful."],
      ["刃具要放在安全的地方。", "Cutting tools should be kept in a safe place."],
      ["故事里提到一把利刃。", "The story mentions a sharp blade."],
    ],
  },
  勾: {
    words: [
      ["勾画", "sketch"],
      ["勾选", "tick; select"],
      ["勾起", "bring to mind"],
    ],
    sentences: [
      ["我用铅笔勾画小山。", "I use a pencil to sketch a small mountain."],
      ["请在正确答案旁边勾选。", "Please tick beside the correct answer."],
      ["这首歌勾起我的回忆。", "This song brings back my memories."],
    ],
  },
  天: {
    words: [
      ["今天", "today"],
      ["天气", "weather"],
      ["天空", "sky"],
    ],
    sentences: [
      ["今天我们上中文课。", "Today we have Chinese class."],
      ["今天的天气很好。", "Today's weather is very good."],
      ["天空中有白云。", "There are white clouds in the sky."],
    ],
  },
  明: {
    words: [
      ["明天", "tomorrow"],
      ["明亮", "bright"],
      ["明白", "understand"],
    ],
    sentences: [
      ["明天我们去图书馆。", "Tomorrow we go to the library."],
      ["教室的灯很明亮。", "The classroom lights are bright."],
      ["听完解释，我明白了。", "After hearing the explanation, I understand."],
    ],
  },
  去: {
    words: [
      ["去年", "last year"],
      ["出去", "go out"],
      ["回去", "go back"],
    ],
    sentences: [
      ["去年我学了很多汉字。", "Last year, I learned many Chinese characters."],
      ["下课后，我们一起出去玩。", "After class, we go out to play together."],
      ["天晚了，我要回去。", "It is late, so I need to go back."],
    ],
  },
  昨: {
    words: [
      ["昨天", "yesterday"],
      ["昨晚", "last night"],
      ["昨日", "yesterday"],
    ],
    sentences: [
      ["昨天我读了一本书。", "Yesterday, I read a book."],
      ["昨晚我很早睡觉。", "Last night, I went to bed early."],
      ["昨日的作业我已经完成。", "I have already finished yesterday's homework."],
    ],
  },
  月: {
    words: [
      ["月亮", "moon"],
      ["月份", "month"],
      ["月饼", "mooncake"],
    ],
    sentences: [
      ["晚上，月亮很圆。", "At night, the moon is round."],
      ["老师问现在是几月份。", "The teacher asks what month it is now."],
      ["中秋节，我们吃月饼。", "At Mid-Autumn Festival, we eat mooncakes."],
    ],
  },
  日: {
    words: [
      ["生日", "birthday"],
      ["日记", "diary"],
      ["日出", "sunrise"],
    ],
    sentences: [
      ["今天是我的生日。", "Today is my birthday."],
      ["我每天写一篇日记。", "I write a diary entry every day."],
      ["早上，我们看日出。", "In the morning, we watch the sunrise."],
    ],
  },
  点: {
    words: [
      ["一点", "one o'clock"],
      ["四点", "four o'clock"],
      ["点心", "snack"],
    ],
    sentences: [
      ["现在是一点。", "It is one o'clock now."],
      ["下午四点，我们放学。", "At four o'clock in the afternoon, school ends."],
      ["奶奶做了好吃的点心。", "Grandma makes a tasty snack."],
    ],
  },
  黑: {
    words: [
      ["黑色", "black colour"],
      ["黑夜", "dark night"],
      ["黑板", "blackboard"],
    ],
    sentences: [
      ["我有一支黑色铅笔。", "I have a black pencil."],
      ["黑夜里，星星很亮。", "In the dark night, the stars are bright."],
      ["老师在黑板上写字。", "The teacher writes characters on the blackboard."],
    ],
  },
  秋: {
    words: [
      ["秋天", "autumn"],
      ["秋日", "autumn day"],
      ["秋季", "autumn season"],
    ],
    sentences: [
      ["秋天的天气很凉快。", "The weather in autumn is cool."],
      ["这个秋日阳光很好。", "The sunshine is lovely on this autumn day."],
      ["秋季，树叶变黄了。", "In autumn season, the leaves turn yellow."],
    ],
  },
  冬: {
    words: [
      ["冬天", "winter"],
      ["冬日", "winter day"],
      ["冬季", "winter season"],
    ],
    sentences: [
      ["冬天，我们穿厚衣服。", "In winter, we wear warm clothes."],
      ["这个冬日有点冷。", "This winter day is a little cold."],
      ["冬季，学校有假期。", "In winter season, the school has a holiday."],
    ],
  },
  每: {
    words: [
      ["每天", "every day"],
      ["每年", "every year"],
      ["每个", "each"],
    ],
    sentences: [
      ["我每天练习写字。", "I practise writing characters every day."],
      ["每年春节，我们全家团圆。", "Every year at Spring Festival, our whole family reunites."],
      ["每个学生都有一本书。", "Each student has a book."],
    ],
  },
  东: {
    words: [
      ["东西", "thing"],
      ["东方", "east"],
      ["东边", "east side"],
    ],
    sentences: [
      ["书包里有很多东西。", "There are many things in the school bag."],
      ["太阳从东方升起。", "The sun rises in the east."],
      ["操场在教学楼的东边。", "The playground is on the east side of the classroom building."],
    ],
  },
  育: {
    words: [
      ["体育", "physical education"],
      ["教育", "education"],
      ["育苗", "raise seedlings"],
    ],
    sentences: [
      ["体育课上，我们一起跑步。", "In PE class, we run together."],
      ["学校重视中文教育。", "The school values Chinese education."],
      ["春天，农民在田里育苗。", "In spring, farmers raise seedlings in the field."],
    ],
  },
  吃: {
    words: [
      ["吃饭", "eat a meal"],
      ["好吃", "tasty"],
      ["吃水果", "eat fruit"],
    ],
    sentences: [
      ["中午，我们一起吃饭。", "At noon, we eat a meal together."],
      ["妈妈做的面很好吃。", "The noodles Mum makes are tasty."],
      ["午饭后，我吃水果。", "After lunch, I eat fruit."],
    ],
  },
  它: {
    words: [
      ["它们", "they; them"],
      ["它的", "its"],
      ["其它", "other"],
    ],
    sentences: [
      ["小鸟在树上，它们唱歌。", "The birds are in the tree, and they sing."],
      ["小狗摇着它的尾巴。", "The puppy wags its tail."],
      ["我还认识其它颜色。", "I also know other colours."],
    ],
  },
  放: {
    words: [
      ["放学", "school ends"],
      ["放假", "have a holiday"],
      ["放下", "put down"],
    ],
    sentences: [
      ["放学后，我回家读书。", "After school ends, I go home to read."],
      ["放假时，我们去公园玩。", "During the holiday, we go to the park to play."],
      ["请把书包轻轻放下。", "Please put down the school bag gently."],
    ],
  },
  冷: {
    words: [
      ["冷天", "cold day"],
      ["冷水", "cold water"],
      ["冷风", "cold wind"],
    ],
    sentences: [
      ["今天是个冷天。", "Today is a cold day."],
      ["杯子里有冷水。", "There is cold water in the cup."],
      ["窗外吹来冷风。", "A cold wind blows in from outside the window."],
    ],
  },
  老: {
    words: [
      ["老师", "teacher"],
      ["老人", "elderly person"],
      ["老家", "hometown"],
    ],
    sentences: [
      ["老师教我们写汉字。", "The teacher teaches us to write Chinese characters."],
      ["这位老人喜欢讲故事。", "This elderly person likes telling stories."],
      ["春节时，我回老家看家人。", "At Spring Festival, I go back to my hometown to see family."],
    ],
  },
  快: {
    words: [
      ["快乐", "happy"],
      ["快点", "hurry up"],
      ["快慢", "speed"],
    ],
    sentences: [
      ["和朋友一起学习很快乐。", "Studying with friends is happy."],
      ["快点，我们要上课了。", "Hurry up; class is about to start."],
      ["写字时，要注意快慢。", "When writing characters, pay attention to speed."],
    ],
  },
  巴: {
    words: [
      ["巴士", "bus"],
      ["下巴", "chin"],
      ["尾巴", "tail"],
    ],
    sentences: [
      ["放学后，我坐巴士回家。", "After school, I take the bus home."],
      ["弟弟把手放在下巴上。", "My younger brother puts his hand on his chin."],
      ["小猫有一条长尾巴。", "The kitten has a long tail."],
    ],
  },
  蓝: {
    words: [
      ["蓝天", "blue sky"],
      ["蓝色", "blue colour"],
      ["蓝莓", "blueberry"],
    ],
    sentences: [
      ["窗外有一片蓝天。", "There is a blue sky outside the window."],
      ["我喜欢蓝色的书包。", "I like the blue school bag."],
      ["盘子里有一些蓝莓。", "There are some blueberries on the plate."],
    ],
  },
  云: {
    words: [
      ["白云", "white cloud"],
      ["云朵", "cloud"],
      ["云彩", "clouds"],
    ],
    sentences: [
      ["天空中飘着白云。", "White clouds float in the sky."],
      ["这朵云朵像小船。", "This cloud looks like a small boat."],
      ["夕阳下的云彩很好看。", "The clouds under the sunset look beautiful."],
    ],
  },
  鸡: {
    words: [
      ["鸡蛋", "egg"],
      ["小鸡", "chick"],
      ["鸡肉", "chicken meat"],
    ],
    sentences: [
      ["早餐时，我吃鸡蛋。", "At breakfast, I eat eggs."],
      ["院子里有一只小鸡。", "There is a chick in the yard."],
      ["晚饭有鸡肉和青菜。", "Dinner has chicken and green vegetables."],
    ],
  },
  木: {
    words: [
      ["木头", "wood"],
      ["树木", "trees"],
      ["木马", "wooden horse"],
    ],
    sentences: [
      ["这张桌子是木头做的。", "This table is made of wood."],
      ["公园里有很多树木。", "There are many trees in the park."],
      ["弟弟喜欢玩木马。", "My younger brother likes playing on the wooden horse."],
    ],
  },
  贴: {
    words: [
      ["贴纸", "sticker"],
      ["贴上", "stick on"],
      ["张贴", "put up"],
    ],
    sentences: [
      ["我把贴纸贴在本子上。", "I put the sticker on the notebook."],
      ["请把名字贴上去。", "Please stick the name on it."],
      ["老师在墙上张贴通知。", "The teacher puts up a notice on the wall."],
    ],
  },
  机: {
    words: [
      ["飞机", "airplane"],
      ["耳机", "earphones"],
      ["机器", "machine"],
    ],
    sentences: [
      ["天空中有一架飞机。", "There is an airplane in the sky."],
      ["我用耳机听中文。", "I use earphones to listen to Chinese."],
      ["这台机器可以打印。", "This machine can print."],
    ],
  },
  几: {
    words: [
      ["几个", "several"],
      ["几天", "a few days"],
      ["几本", "several books"],
    ],
    sentences: [
      ["桌上有几个苹果。", "There are several apples on the table."],
      ["这几天我都练习中文。", "I practise Chinese over these few days."],
      ["书包里有几本书。", "There are several books in the school bag."],
    ],
  },
  又: {
    words: [
      ["又大又圆", "big and round"],
      ["又一次", "once again"],
      ["又来", "come again"],
    ],
    sentences: [
      ["月亮又大又圆。", "The moon is big and round."],
      ["我又一次写对了这个字。", "I write this character correctly once again."],
      ["小朋友又来图书馆借书。", "The child comes to the library again to borrow books."],
    ],
  },
  己: {
    words: [
      ["自己", "oneself"],
      ["知己", "close friend"],
      ["舍己", "put others before oneself"],
    ],
    sentences: [
      ["这件事我自己完成。", "I finish this matter by myself."],
      ["好朋友也是知己。", "A good friend is also a close friend."],
      ["故事里的哥哥懂得舍己为人。", "The older brother in the story knows how to put others before himself."],
    ],
  },
  寸: {
    words: [
      ["尺寸", "size"],
      ["分寸", "sense of propriety"],
      ["一寸", "one cun"],
    ],
    sentences: [
      ["这件衣服的尺寸正好。", "The size of this piece of clothing is just right."],
      ["说话要注意分寸。", "When speaking, we should pay attention to propriety."],
      ["尺子上有一寸的标记。", "There is a one-cun mark on the ruler."],
    ],
  },
  贝: {
    words: [
      ["宝贝", "treasure"],
      ["贝壳", "shell"],
      ["扇贝", "scallop"],
    ],
    sentences: [
      ["这本书是我的宝贝。", "This book is my treasure."],
      ["沙滩上有很多贝壳。", "There are many shells on the beach."],
      ["海鲜店里有扇贝。", "There are scallops in the seafood shop."],
    ],
  },
  切: {
    words: [
      ["一切", "everything"],
      ["亲切", "kind"],
      ["切菜", "cut vegetables"],
    ],
    sentences: [
      ["一切准备好了。", "Everything is ready."],
      ["老师说话很亲切。", "The teacher speaks kindly."],
      ["妈妈在厨房切菜。", "Mum cuts vegetables in the kitchen."],
    ],
  },
  内: {
    words: [
      ["室内", "indoors"],
      ["内容", "content"],
      ["内心", "inner heart"],
    ],
    sentences: [
      ["下雨时，我们在室内活动。", "When it rains, we do activities indoors."],
      ["这本书的内容很有趣。", "The content of this book is interesting."],
      ["她内心很高兴。", "She is happy in her heart."],
    ],
  },
  压: {
    words: [
      ["压力", "pressure"],
      ["压住", "press down"],
      ["气压", "air pressure"],
    ],
    sentences: [
      ["考试前，我有一点压力。", "Before the test, I feel a little pressure."],
      ["请用手压住纸角。", "Please press down the corner of the paper with your hand."],
      ["科学课上，我们学习气压。", "In science class, we learn about air pressure."],
    ],
  },
  团: {
    words: [
      ["团队", "team"],
      ["团圆", "reunion"],
      ["饭团", "rice ball"],
    ],
    sentences: [
      ["我们的团队一起完成任务。", "Our team completes the task together."],
      ["春节是家人团圆的时候。", "Spring Festival is a time for family reunion."],
      ["午饭时，我吃了一个饭团。", "At lunch, I eat a rice ball."],
    ],
  },
  向: {
    words: [
      ["方向", "direction"],
      ["向前", "forward"],
      ["向上", "upward"],
    ],
    sentences: [
      ["指南针可以指出方向。", "A compass can show direction."],
      ["跑步时，我们向前看。", "When running, we look forward."],
      ["小树向上生长。", "The small tree grows upward."],
    ],
  },
  争: {
    words: [
      ["争取", "strive for"],
      ["争先", "try to be first"],
      ["争光", "win honour"],
    ],
    sentences: [
      ["我争取每天进步一点。", "I strive to improve a little every day."],
      ["运动会上，大家争先向前跑。", "At the sports day, everyone tries to be first and runs forward."],
      ["我们努力学习，为班级争光。", "We study hard and win honour for the class."],
    ],
  },
  产: {
    words: [
      ["产品", "product"],
      ["生产", "produce"],
      ["产地", "place of origin"],
    ],
    sentences: [
      ["这个产品是一个新书包。", "This product is a new school bag."],
      ["工厂生产很多文具。", "The factory produces many stationery items."],
      ["包装上写着水果的产地。", "The package shows the fruit's place of origin."],
    ],
  },
  战: {
    words: [
      ["挑战", "challenge"],
      ["战胜", "overcome"],
      ["战鼓", "war drum"],
    ],
    sentences: [
      ["这道题是一个小挑战。", "This question is a small challenge."],
      ["我努力战胜困难。", "I work hard to overcome difficulties."],
      ["故事里响起了战鼓。", "A war drum sounds in the story."],
    ],
  },
  除: {
    words: [
      ["除了", "besides"],
      ["除夕", "Chinese New Year's Eve"],
      ["清除", "clear away"],
    ],
    sentences: [
      ["除了中文，我还喜欢数学。", "Besides Chinese, I also like maths."],
      ["除夕晚上，全家一起吃饭。", "On Chinese New Year's Eve, the whole family eats together."],
      ["我们一起清除桌上的纸屑。", "We clear away the paper scraps on the table together."],
    ],
  },
  需: {
    words: [
      ["需要", "need"],
      ["需求", "need; demand"],
      ["必需", "necessary"],
    ],
    sentences: [
      ["学习中文需要耐心。", "Learning Chinese needs patience."],
      ["老师了解学生的需求。", "The teacher understands the students' needs."],
      ["水是生活必需的东西。", "Water is something necessary for life."],
    ],
  },
  报: {
    words: [
      ["报纸", "newspaper"],
      ["报名", "sign up"],
      ["报告", "report"],
    ],
    sentences: [
      ["爷爷每天读报纸。", "Grandpa reads the newspaper every day."],
      ["我报名参加中文比赛。", "I sign up for the Chinese competition."],
      ["她在课堂上做报告。", "She gives a report in class."],
    ],
  },
  克: {
    words: [
      ["千克", "kilogram"],
      ["克服", "overcome"],
      ["巧克力", "chocolate"],
    ],
    sentences: [
      ["这袋米有两千克。", "This bag of rice weighs two kilograms."],
      ["我会克服这个困难。", "I will overcome this difficulty."],
      ["妹妹喜欢吃巧克力。", "My younger sister likes eating chocolate."],
    ],
  },
  质: {
    words: [
      ["质量", "quality"],
      ["本质", "essence"],
      ["质地", "texture"],
    ],
    sentences: [
      ["这个书包质量很好。", "This school bag has good quality."],
      ["故事的本质是友爱。", "The essence of the story is kindness."],
      ["这块布的质地很柔软。", "The texture of this cloth is soft."],
    ],
  },
  情: {
    words: [
      ["心情", "mood"],
      ["事情", "matter"],
      ["情况", "situation"],
    ],
    sentences: [
      ["今天我的心情很好。", "My mood is good today."],
      ["这件事情很重要。", "This matter is important."],
      ["老师了解每个学生的情况。", "The teacher understands each student's situation."],
    ],
  },
  亡: {
    words: [
      ["亡羊补牢", "mend the pen after losing sheep"],
      ["亡字头", "wang radical top"],
      ["亡字", "the character 亡"],
    ],
    sentences: [
      ["亡羊补牢告诉我们要及时改正。", "Mending the pen after losing sheep teaches us to correct mistakes in time."],
      ["忘字上面有亡字头。", "The character wang has the wang radical top."],
      ["亡字的笔画不多。", "The character wang does not have many strokes."],
    ],
  },
  尸: {
    words: [
      ["尸字", "the character 尸"],
      ["尸字头", "shi radical top"],
      ["尸部", "shi radical section"],
    ],
    sentences: [
      ["尸字的笔画很少。", "The character shi has few strokes."],
      ["尾字上面有尸字头。", "The character wei has the shi radical top."],
      ["字典里可以查到尸部。", "The shi radical section can be found in the dictionary."],
    ],
  },
  仇: {
    words: [
      ["仇姓", "Qiu surname"],
      ["仇英", "Qiu Ying"],
      ["仇字", "the character 仇"],
    ],
    sentences: [
      ["仇姓是一个中文姓氏。", "Qiu is a Chinese surname."],
      ["仇英是古代画家。", "Qiu Ying was an ancient painter."],
      ["仇字左边是单人旁。", "The character chou has the person radical on the left."],
    ],
  },
  凶: {
    words: [
      ["凶猛", "fierce"],
      ["凶字", "the character 凶"],
      ["吉凶", "fortune and misfortune"],
    ],
    sentences: [
      ["故事里的老虎很凶猛。", "The tiger in the story is fierce."],
      ["凶字里面有一个叉。", "The character xiong has a cross shape inside."],
      ["古人常常谈吉凶。", "Ancient people often talked about fortune and misfortune."],
    ],
  },
  犯: {
    words: [
      ["犯错", "make a mistake"],
      ["犯困", "feel sleepy"],
      ["犯规", "break a rule"],
    ],
    sentences: [
      ["犯错后要认真改正。", "After making a mistake, we should correct it carefully."],
      ["下午上课时，我有点犯困。", "During afternoon class, I feel a little sleepy."],
      ["比赛时不能犯规。", "During a match, we must not break the rules."],
    ],
  },
  奴: {
    words: [
      ["匈奴", "Xiongnu"],
      ["奴字", "the character 奴"],
      ["奴字形", "shape of the character 奴"],
    ],
    sentences: [
      ["历史书里提到匈奴。", "The history book mentions the Xiongnu."],
      ["奴字由女和又组成。", "The character nu is made from 女 and 又."],
      ["卡片上展示奴字形。", "The card shows the shape of the character nu."],
    ],
  },
  刑: {
    words: [
      ["刑字卡", "character card for 刑"],
      ["刑字", "the character 刑"],
      ["刑字形", "shape of the character 刑"],
    ],
    sentences: [
      ["桌上有一张刑字卡。", "There is a character card for xing on the table."],
      ["刑字右边是立刀旁。", "The character xing has the knife radical on the right."],
      ["字卡上画着刑字形。", "The character card shows the shape of the character xing."],
    ],
  },
  巩: {
    words: [
      ["巩固", "consolidate"],
      ["巩义", "Gongyi"],
      ["巩姓", "Gong surname"],
    ],
    sentences: [
      ["复习可以巩固知识。", "Review can consolidate knowledge."],
      ["巩义是一个地名。", "Gongyi is a place name."],
      ["巩姓是一个中文姓氏。", "Gong is a Chinese surname."],
    ],
  },
  芒: {
    words: [
      ["芒果", "mango"],
      ["光芒", "light"],
      ["锋芒", "sharp edge"],
    ],
    sentences: [
      ["我喜欢吃甜甜的芒果。", "I like eating sweet mangoes."],
      ["太阳发出温暖的光芒。", "The sun gives off warm light."],
      ["他说话收起了锋芒。", "He speaks without showing a sharp edge."],
    ],
  },
  芝: {
    words: [
      ["芝麻", "sesame"],
      ["灵芝", "lingzhi mushroom"],
      ["芝士", "cheese"],
    ],
    sentences: [
      ["面包上有芝麻。", "There are sesame seeds on the bread."],
      ["书上介绍了灵芝。", "The book introduces lingzhi mushrooms."],
      ["我喜欢吃芝士面包。", "I like eating cheese bread."],
    ],
  },
  厂: {
    words: [
      ["工厂", "factory"],
      ["厂房", "factory building"],
      ["厂长", "factory manager"],
    ],
    sentences: [
      ["这家工厂生产书包。", "This factory makes school bags."],
      ["新的厂房很干净。", "The new factory building is clean."],
      ["厂长介绍安全规则。", "The factory manager introduces the safety rules."],
    ],
  },
  入: {
    words: [
      ["入口", "entrance"],
      ["加入", "join"],
      ["入门", "beginner level"],
    ],
    sentences: [
      ["图书馆入口在左边。", "The library entrance is on the left."],
      ["我加入了中文小组。", "I join the Chinese group."],
      ["这本书适合中文入门。", "This book is suitable for beginner Chinese."],
    ],
  },
  干: {
    words: [
      ["干净", "clean"],
      ["饼干", "biscuit"],
      ["树干", "tree trunk"],
    ],
    sentences: [
      ["教室很干净。", "The classroom is clean."],
      ["妹妹吃了一块饼干。", "My younger sister eats a biscuit."],
      ["这棵树的树干很粗。", "This tree has a thick trunk."],
    ],
  },
  与: {
    words: [
      ["参与", "take part"],
      ["与众不同", "different from others"],
      ["给与", "give"],
    ],
    sentences: [
      ["我参与班级活动。", "I take part in the class activity."],
      ["这幅画与众不同。", "This picture is different from others."],
      ["老师给与我们鼓励。", "The teacher gives us encouragement."],
    ],
  },
  及: {
    words: [
      ["及时", "in time"],
      ["及格", "pass"],
      ["来得及", "have enough time"],
    ],
    sentences: [
      ["下雨前，我们及时回家。", "Before it rains, we get home in time."],
      ["这次考试我及格了。", "I passed this test."],
      ["现在出发还来得及。", "If we leave now, there is still enough time."],
    ],
  },
  义: {
    words: [
      ["意义", "meaning"],
      ["正义", "justice"],
      ["义工", "volunteer"],
    ],
    sentences: [
      ["这个故事很有意义。", "This story has meaning."],
      ["故事里的英雄保护正义。", "The hero in the story protects justice."],
      ["周末，义工来学校帮忙。", "On the weekend, volunteers come to help at school."],
    ],
  },
  之: {
    words: [
      ["之前", "before"],
      ["之后", "after"],
      ["之间", "between"],
    ],
    sentences: [
      ["上课之前，我准备好书本。", "Before class, I get my books ready."],
      ["放学之后，我回家读书。", "After school, I go home to read."],
      ["我坐在两个同学之间。", "I sit between two classmates."],
    ],
  },
  已: {
    words: [
      ["已经", "already"],
      ["已知", "known"],
      ["早已", "long already"],
    ],
    sentences: [
      ["我已经完成作业。", "I have already finished my homework."],
      ["这道题有两个已知条件。", "This question has two known conditions."],
      ["妈妈早已准备好晚饭。", "Mum has already prepared dinner."],
    ],
  },
  无: {
    words: [
      ["无声", "silent"],
      ["无论", "no matter"],
      ["无边", "boundless"],
    ],
    sentences: [
      ["图书馆里无声无息。", "The library is silent."],
      ["无论下雨还是晴天，我都练习中文。", "No matter whether it rains or is sunny, I practise Chinese."],
      ["图画里有无边的大海。", "The picture shows a boundless sea."],
    ],
  },
  且: {
    words: [
      ["而且", "and also"],
      ["并且", "and"],
      ["且慢", "wait a moment"],
    ],
    sentences: [
      ["这本书有趣，而且容易读。", "This book is interesting and also easy to read."],
      ["他认真并且有礼貌。", "He is careful and polite."],
      ["且慢，我们先看清题目。", "Wait a moment; let's read the question clearly first."],
    ],
  },
  至: {
    words: [
      ["至少", "at least"],
      ["甚至", "even"],
      ["冬至", "Winter Solstice"],
    ],
    sentences: [
      ["我每天至少读十分钟。", "I read for at least ten minutes every day."],
      ["他甚至会写很难的字。", "He can even write difficult characters."],
      ["冬至那天，白天很短。", "On the Winter Solstice, the day is short."],
    ],
  },
  元: {
    words: [
      ["元旦", "New Year's Day"],
      ["元气", "energy"],
      ["元宵", "sweet rice dumpling"],
    ],
    sentences: [
      ["元旦那天，我们给朋友送祝福。", "On New Year's Day, we send wishes to friends."],
      ["早睡早起让人有元气。", "Sleeping early and waking early gives people energy."],
      ["元宵节，我们吃元宵。", "At Lantern Festival, we eat sweet rice dumplings."],
    ],
  },
  专: {
    words: [
      ["专心", "focused"],
      ["专门", "specially"],
      ["专长", "special skill"],
    ],
    sentences: [
      ["上课时，我专心听讲。", "In class, I listen with focus."],
      ["妈妈专门给我买了字帖。", "Mum specially buys me a handwriting book."],
      ["他的专长是画画。", "His special skill is drawing."],
    ],
  },
  业: {
    words: [
      ["作业", "homework"],
      ["毕业", "graduate"],
      ["农业", "agriculture"],
    ],
    sentences: [
      ["我认真完成作业。", "I finish my homework carefully."],
      ["哥哥今年小学毕业。", "My older brother graduates from primary school this year."],
      ["农业和种菜有关。", "Agriculture is related to growing vegetables."],
    ],
  },
  市: {
    words: [
      ["城市", "city"],
      ["市场", "market"],
      ["超市", "supermarket"],
    ],
    sentences: [
      ["这座城市很干净。", "This city is very clean."],
      ["周末，我们去市场买菜。", "On the weekend, we go to the market to buy vegetables."],
      ["超市里有很多水果。", "There are many fruits in the supermarket."],
    ],
  },
  民: {
    words: [
      ["人民", "people"],
      ["民歌", "folk song"],
      ["民间", "folk"],
    ],
    sentences: [
      ["人民喜欢和平。", "People like peace."],
      ["音乐课上，我们学唱民歌。", "In music class, we learn to sing a folk song."],
      ["这个故事来自民间。", "This story comes from folk tradition."],
    ],
  },
  权: {
    words: [
      ["权利", "right"],
      ["版权", "copyright"],
      ["权杖", "scepter"],
    ],
    sentences: [
      ["每个孩子都有学习的权利。", "Every child has the right to learn."],
      ["书上写着版权信息。", "The book shows copyright information."],
      ["故事里的国王拿着权杖。", "The king in the story holds a scepter."],
    ],
  },
  存: {
    words: [
      ["保存", "save"],
      ["存在", "exist"],
      ["存钱", "save money"],
    ],
    sentences: [
      ["我把作文保存在电脑里。", "I save my composition on the computer."],
      ["空气存在于我们身边。", "Air exists around us."],
      ["我每周存钱买书。", "I save money every week to buy books."],
    ],
  },
  化: {
    words: [
      ["变化", "change"],
      ["文化", "culture"],
      ["化石", "fossil"],
    ],
    sentences: [
      ["天气有很大的变化。", "The weather has a big change."],
      ["中文课介绍中国文化。", "Chinese class introduces Chinese culture."],
      ["博物馆里有恐龙化石。", "There are dinosaur fossils in the museum."],
    ],
  },
  世: {
    words: [
      ["世界", "world"],
      ["世纪", "century"],
      ["世代", "generations"],
    ],
    sentences: [
      ["世界上有很多语言。", "There are many languages in the world."],
      ["二十一世纪有很多新科技。", "The twenty-first century has many new technologies."],
      ["这个故事世代相传。", "This story is passed down through generations."],
    ],
  },
  术: {
    words: [
      ["美术", "art"],
      ["技术", "technology"],
      ["魔术", "magic trick"],
    ],
    sentences: [
      ["美术课上，我们画花。", "In art class, we draw flowers."],
      ["新的技术让学习更方便。", "New technology makes learning more convenient."],
      ["哥哥会表演魔术。", "My older brother can perform magic tricks."],
    ],
  },
  斗: {
    words: [
      ["北斗", "Big Dipper"],
      ["斗篷", "cloak"],
      ["斗志", "fighting spirit"],
    ],
    sentences: [
      ["晚上，我们看见北斗。", "At night, we see the Big Dipper."],
      ["故事里的小王子穿着斗篷。", "The little prince in the story wears a cloak."],
      ["运动员很有斗志。", "The athlete has strong fighting spirit."],
    ],
  },
  龙: {
    words: [
      ["龙舟", "dragon boat"],
      ["恐龙", "dinosaur"],
      ["龙灯", "dragon lantern"],
    ],
    sentences: [
      ["端午节，人们划龙舟。", "At Dragon Boat Festival, people race dragon boats."],
      ["博物馆里有恐龙模型。", "There is a dinosaur model in the museum."],
      ["春节时，街上有龙灯。", "During Spring Festival, there are dragon lanterns on the street."],
    ],
  },
  史: {
    words: [
      ["历史", "history"],
      ["史书", "history book"],
      ["史前", "prehistoric"],
    ],
    sentences: [
      ["我喜欢听历史故事。", "I like listening to history stories."],
      ["图书馆里有很多史书。", "There are many history books in the library."],
      ["史前动物很有趣。", "Prehistoric animals are interesting."],
    ],
  },
  并: {
    words: [
      ["并且", "and"],
      ["合并", "combine"],
      ["并排", "side by side"],
    ],
    sentences: [
      ["她会唱歌，并且会画画。", "She can sing, and she can draw."],
      ["请把两个文件合并。", "Please combine the two files."],
      ["两张桌子并排放着。", "The two desks are placed side by side."],
    ],
  },
  江: {
    words: [
      ["长江", "Yangtze River"],
      ["江河", "rivers"],
      ["江水", "river water"],
    ],
    sentences: [
      ["长江是中国的大河。", "The Yangtze River is a large river in China."],
      ["地图上有很多江河。", "There are many rivers on the map."],
      ["春天的江水很清。", "The river water is clear in spring."],
    ],
  },
  玉: {
    words: [
      ["玉米", "corn"],
      ["玉石", "jade stone"],
      ["玉兰", "magnolia"],
    ],
    sentences: [
      ["晚饭有甜玉米。", "Dinner has sweet corn."],
      ["博物馆里有玉石。", "There are jade stones in the museum."],
      ["院子里的玉兰很香。", "The magnolia in the yard smells lovely."],
    ],
  },
  丙: {
    words: [
      ["丙班", "Class C"],
      ["丙字", "the character 丙"],
      ["丙等", "grade C"],
    ],
    sentences: [
      ["哥哥在丙班上课。", "My older brother studies in Class C."],
      ["丙字的笔画不多。", "The character bing does not have many strokes."],
      ["这个结果是丙等。", "This result is grade C."],
    ],
  },
  非: {
    words: [
      ["非常", "very"],
      ["并非", "not really"],
      ["非洲", "Africa"],
    ],
    sentences: [
      ["今天我非常开心。", "I am very happy today."],
      ["这道题并非很难。", "This question is not really difficult."],
      ["非洲有很多国家。", "Africa has many countries."],
    ],
  },
};

const IDIOM_PRIORITY = [
  "一心一意",
  "三心二意",
  "十全十美",
  "七上八下",
  "九牛一毛",
  "人山人海",
  "大惊小怪",
  "大同小异",
  "小题大做",
  "小心翼翼",
  "口是心非",
  "心口如一",
  "目不转睛",
  "目瞪口呆",
  "手忙脚乱",
  "手舞足蹈",
  "心满意足",
  "心直口快",
  "风和日丽",
  "风平浪静",
  "风雨同舟",
  "风吹草动",
  "花好月圆",
  "花言巧语",
  "水到渠成",
  "水落石出",
  "火上加油",
  "火眼金睛",
  "山清水秀",
  "山高水长",
  "天长地久",
  "天涯海角",
  "天南地北",
  "地久天长",
  "不三不四",
  "不由自主",
  "不知不觉",
  "不约而同",
  "不可思议",
  "不可救药",
  "一目了然",
  "一举两得",
  "一鸣惊人",
  "一言为定",
  "一帆风顺",
  "一日千里",
  "一五一十",
  "一模一样",
  "半途而废",
  "画龙点睛",
  "画蛇添足",
  "井井有条",
  "斤斤计较",
  "津津有味",
  "念念不忘",
  "恋恋不舍",
  "头头是道",
  "面面俱到",
  "滔滔不绝",
  "亭亭玉立",
  "洋洋得意",
  "栩栩如生",
  "欣欣向荣",
  "依依不舍",
  "默默无闻",
  "代代相传",
  "步步高升",
  "人人皆知",
  "家家户户",
  "亡羊补牢",
  "守株待兔",
  "掩耳盗铃",
  "拔苗助长",
  "刻舟求剑",
  "坐井观天",
  "狐假虎威",
  "井底之蛙",
  "叶公好龙",
  "盲人摸象",
  "画饼充饥",
  "对牛弹琴",
  "杯弓蛇影",
  "草木皆兵",
  "惊弓之鸟",
  "滥竽充数",
  "南辕北辙",
  "自相矛盾",
  "买椟还珠",
  "郑人买履",
  "揠苗助长",
  "破釜沉舟",
  "卧薪尝胆",
  "三顾茅庐",
  "指鹿为马",
  "纸上谈兵",
  "完璧归赵",
  "负荆请罪",
  "刮目相看",
  "闻鸡起舞",
  "凿壁偷光",
  "悬梁刺股",
  "程门立雪",
  "囊萤映雪",
  "愚公移山",
  "精卫填海",
  "夸父追日",
  "开天辟地",
  "名列前茅",
  "名不虚传",
  "名副其实",
  "名扬四海",
  "百发百中",
  "百战百胜",
  "百折不挠",
  "百依百顺",
  "千方百计",
  "千辛万苦",
  "千变万化",
  "千军万马",
  "千言万语",
  "万众一心",
  "万水千山",
  "万紫千红",
  "五湖四海",
  "四面八方",
  "五颜六色",
  "五光十色",
  "六神无主",
  "七嘴八舌",
  "七手八脚",
  "八仙过海",
  "四通八达",
  "三言两语",
  "三长两短",
  "三番五次",
  "两全其美",
  "多才多艺",
  "多姿多彩",
  "多多益善",
  "少见多怪",
  "古往今来",
  "今非昔比",
  "来龙去脉",
  "前因后果",
  "前所未有",
  "后来居上",
  "左顾右盼",
  "左思右想",
  "东张西望",
  "东奔西走",
  "南来北往",
  "南腔北调",
  "里应外合",
  "外强中干",
  "上行下效",
  "上下一心",
  "进退两难",
  "进退维谷",
  "有始有终",
  "有口无心",
  "有名无实",
  "有气无力",
  "有目共睹",
  "无边无际",
  "无忧无虑",
  "无影无踪",
  "无穷无尽",
  "无可奈何",
  "无能为力",
  "无价之宝",
  "见多识广",
  "见义勇为",
  "见利忘义",
  "见异思迁",
  "见贤思齐",
  "知己知彼",
  "知足常乐",
  "知难而进",
  "知难而退",
  "自力更生",
  "自言自语",
  "自由自在",
  "自告奋勇",
  "自强不息",
  "自作自受",
  "同心协力",
  "同甘共苦",
  "异口同声",
  "异想天开",
  "大公无私",
  "大材小用",
  "大器晚成",
  "大海捞针",
  "小巧玲珑",
  "小心谨慎",
  "开门见山",
  "开卷有益",
  "闭门造车",
  "闭月羞花",
  "安居乐业",
  "安然无恙",
  "平易近人",
  "平分秋色",
  "平步青云",
  "老马识途",
  "马到成功",
  "马马虎虎",
  "马不停蹄",
  "龙飞凤舞",
  "龙马精神",
  "虎头蛇尾",
  "虎视眈眈",
  "狼吞虎咽",
  "鸟语花香",
  "鱼目混珠",
  "鱼跃龙门",
  "鸡犬不宁",
  "鸡飞狗跳",
  "兔死狐悲",
  "牛头马面",
  "车水马龙",
  "兵临城下",
  "兵荒马乱",
  "光明正大",
  "光彩夺目",
  "先人后己",
  "先见之明",
  "后起之秀",
  "半信半疑",
  "坚持不懈",
  "坚韧不拔",
  "坐立不安",
  "坐享其成",
  "夜以继日",
  "多此一举",
  "好学不倦",
  "好景不长",
  "如鱼得水",
  "如虎添翼",
  "妙不可言",
  "妄自菲薄",
  "孤掌难鸣",
  "学以致用",
  "学无止境",
  "实事求是",
  "家喻户晓",
  "寸步难行",
  "对答如流",
  "将心比心",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Fetch failed ${response.status}: ${url}`);
  return response.json();
}

async function getText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Fetch failed ${response.status}: ${url}`);
  return response.text();
}

function parseDataJs(text) {
  const match = text.match(/window\.CHINESE_STUDY_DATA = (.*);\s*$/s);
  assert(match, "data.js payload not found");
  return JSON.parse(match[1]);
}

function parseLooseJsonLines(text) {
  return JSON.parse(`[${text.trim().replace(/,\s*$/, "")}]`);
}

function parseMakeMeAHanzi(text) {
  return new Map(
    text
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .map((row) => [row.character, row])
  );
}

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function cleanPinyin(value) {
  return cleanText(value).replaceAll("ɡ", "g");
}

function compactDefinition(value = "") {
  const first = String(value)
    .split(/[;\n/]/)
    .map(cleanText)
    .find((part) => part && !/^variant of/i.test(part));
  return (first || "common Chinese character")
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\(.+?\)/g, "")
    .replace(/^to be /i, "")
    .slice(0, 120);
}

function cleanEnglishGloss(value = "") {
  return cleanText(value)
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\bCL:.*$/i, "")
    .replace(/\s*;.*$/, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 90);
}

function parseXinhuaMoreEnglish(more = "") {
  const line = String(more)
    .split(/\n+/)
    .map(cleanText)
    .find((item) => /[A-Za-z]/.test(item) && !item.includes("部首") && !/^[a-züāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜńňǹḿ]+$/i.test(item));
  return cleanEnglishGloss(line);
}

function cleanMeaningZh(text = "") {
  return cleanText(text)
    .replace(/["“”]+/g, "“")
    .replace(/--.*$/, "")
    .replace(/^\(?[^)]*形声[^)]*\)?/, "")
    .replace(/^[\s，。、；：]+/, "")
    .slice(0, 118);
}

function meaningZhFromXinhua(row, words) {
  const explanation = String(row?.explanation || "");
  const numbered = [...explanation.matchAll(/⒈([^⒉⒊⒋⒌⒍⒎⒏⒐]+)/g)]
    .map((match) => cleanMeaningZh(match[1]))
    .find((line) => line && !/[《》]|甲骨|小篆|形声|会意|象形|从.+声/.test(line));
  if (numbered) return numbered.endsWith("。") ? numbered : `${numbered}。`;

  const plain = explanation
    .split(/\n+/)
    .map(cleanMeaningZh)
    .find((line) => line.length >= 8 && line.length <= 110 && !/[《》]|--|甲骨|小篆|形声|会意|象形|从.+声/.test(line));
  if (plain) return plain.endsWith("。") ? plain : `${plain}。`;

  return `常用汉字，常见于“${words.map((word) => word.word).join("、")}”等词语。`;
}

function wordBankPriorityFromBuildScript() {
  try {
    const text = execFileSync("node", ["-e", "process.stdout.write(require('fs').readFileSync('tools/build-data.mjs','utf8'))"], {
      encoding: "utf8",
      maxBuffer: 8 * 1024 * 1024,
    });
    return new Set([...text.matchAll(/\[\s*"([^"]{2,6})"\s*,\s*"[^"]+"\s*,/g)].map((match) => match[1]));
  } catch {
    return new Set();
  }
}

async function loadCedictRows() {
  const tempDir = await mkdtemp(join(tmpdir(), "cedict-json-"));
  try {
    const tarball = execFileSync("npm", ["pack", SOURCES.cedictPackage, "--silent"], {
      cwd: tempDir,
      encoding: "utf8",
      maxBuffer: 2 * 1024 * 1024,
    })
      .trim()
      .split("\n")
      .pop();
    execFileSync("tar", ["-xzf", tarball], { cwd: tempDir });
    return JSON.parse(await readFile(join(tempDir, "package", "cedict.json"), "utf8"));
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

function badEnglishDefinition(value) {
  return /variant of|old variant|surname|Kangxi radical|archaic|abbr\.|see also|see \[|used in|county|township|prefecture|dynasty|emperor|novel|Taiwan|Japan|Korea|Buddhist|Sanskrit|mythology|brand|company|airport|railway|surname/i.test(
    value
  );
}

function addWordCandidate(index, candidate) {
  [...new Set([...candidate.word])].forEach((char) => {
    if (!index.has(char)) index.set(char, []);
    index.get(char).push(candidate);
  });
}

function buildCedictIndex(rows, hskRows = []) {
  const byChar = new Map();
  rows.forEach((row, order) => {
    const word = cleanText(row.simplified);
    if (!/^[\u4e00-\u9fff]{2,4}$/.test(word)) return;
    const meaningEn = (row.english || []).map(cleanEnglishGloss).find((item) => item && !badEnglishDefinition(item));
    if (!meaningEn) return;
    addWordCandidate(byChar, {
      word,
      meaningEn,
      pinyin: cleanText(row.pinyin),
      order,
      source: "cedict",
    });
  });
  hskRows.forEach((row, order) => {
    const word = cleanText(row.s);
    if (!/^[\u4e00-\u9fff]{2,4}$/.test(word)) return;
    const meaningEn = (row.f || [])
      .flatMap((form) => form?.m || [])
      .map(cleanEnglishGloss)
      .find((item) => item && !badEnglishDefinition(item));
    if (!meaningEn) return;
    addWordCandidate(byChar, {
      word,
      meaningEn,
      order: -50000 + order,
      rank: Number(row.q) || order + 1,
      source: "hsk",
    });
  });
  return byChar;
}

function candidateScore(candidate, char, priorityWords) {
  let score = 0;
  if (candidate.source === "override") score += 260;
  if (candidate.source === "hsk") score += 180;
  if (candidate.rank) score += Math.max(0, 80 - candidate.rank / 400);
  if (priorityWords.has(candidate.word)) score += 120;
  if (candidate.word.length === 2) score += 90;
  else if (candidate.word.length === 3) score += 45;
  else score += 12;
  if (candidate.word[0] === char) score += 18;
  if (candidate.word[1] === char) score += 8;
  if (/^[一二三四五六七八九十百千万]/.test(candidate.word)) score += 4;
  if (/之|乎|者|矣|兮|焉/.test(candidate.word)) score -= 24;
  if (/^[\u4e00-\u9fff]{4}$/.test(candidate.word) && /lit\.|fig\.|idiom|proverb/i.test(candidate.meaningEn)) score -= 20;
  if (/[A-Z][a-z]/.test(candidate.meaningEn)) score -= 12;
  if (candidate.meaningEn.length > 55) score -= 8;
  score -= Math.min(20, candidate.order / 9000);
  return score;
}

function sentenceRowsForEntry(entryId, words) {
  const contexts = [
    ["早读时", "during morning reading"],
    ["中文课上", "in Chinese class"],
    ["放学后", "after school"],
    ["阅读时", "while reading"],
    ["写作业时", "while doing homework"],
    ["周末", "on the weekend"],
    ["午饭后", "after lunch"],
    ["活动课上", "during activity class"],
    ["复习时", "while reviewing"],
    ["讨论时", "during discussion"],
    ["看图时", "while looking at a picture"],
  ];
  const places = [
    ["图书馆里", "in the library"],
    ["教室里", "in the classroom"],
    ["故事书里", "in a storybook"],
    ["练习册里", "in a workbook"],
    ["学校展板上", "on the school display board"],
    ["小组活动中", "during a group activity"],
    ["课外书里", "in an extracurricular book"],
    ["中文角里", "in the Chinese corner"],
    ["阅读时间里", "during reading time"],
    ["画册里", "in a picture book"],
    ["作业本上", "in the homework book"],
    ["校园里", "on campus"],
    ["家里的书架上", "on the bookshelf at home"],
  ];
  const people = [
    ["我", "I"],
    ["同学", "my classmate"],
    ["姐姐", "my older sister"],
    ["哥哥", "my older brother"],
    ["朋友", "my friend"],
    ["我们", "we"],
    ["妹妹", "my younger sister"],
    ["小组同学", "my group members"],
  ];
  const helpers = [
    ["图画", "a picture"],
    ["故事", "a story"],
    ["例子", "an example"],
    ["卡片", "a card"],
    ["阅读卡", "a reading card"],
    ["图片", "an image"],
    ["练习", "an exercise"],
    ["对话", "a dialogue"],
    ["小组活动", "a group activity"],
    ["词卡", "a word card"],
    ["书本", "a book"],
  ];
  const describeTopic = (word) => {
    const meaning =
      cleanEnglishGloss(word.meaningEn || "this word")
        .replace(/[\u3400-\u9fff|]+/g, " ")
        .replace(/\bsee\s*$/i, "")
        .replace(/\s+/g, " ")
        .trim() || "this word";
    if (/^to\b/i.test(meaning)) return `how to ${meaning.replace(/^to\s+/i, "")}`;
    return meaning;
  };
  const pick = (items, offset) => items[(entryId + offset) % items.length];
  const [timeZh, timeEn] = pick(contexts, 0);
  const [placeZh, placeEn] = pick(places, 3);
  const [personZh, personEn] = pick(people, 5);
  const [helperZh, helperEn] = pick(helpers, 7);
  const pluralSubject = personEn === "I" || personEn === "we" || personEn === "my group members";
  const seeVerb = pluralSubject ? "see" : "sees";
  const mentionVerb = pluralSubject ? "mention" : "mentions";
  const templates = [
    {
      zh: (word) => `${timeZh}，${personZh}在${placeZh}看到${word.word}。`,
      en: (word) => `${timeEn}, ${personEn} ${seeVerb} ${describeTopic(word)} ${placeEn}.`,
    },
    {
      zh: (word) => `${timeZh}，${personZh}谈到${word.word}。`,
      en: (word) => `${timeEn}, ${personEn} ${mentionVerb} ${describeTopic(word)}.`,
    },
    {
      zh: (word) => `${helperZh}帮助我们了解${word.word}。`,
      en: (word) => `${helperEn} helps us understand ${describeTopic(word)}.`,
    },
  ];
  return words.map((word, index) => {
    const english = templates[index].en(word).replace(/\s+/g, " ");
    return {
      zh: templates[index].zh(word),
      en: english.charAt(0).toUpperCase() + english.slice(1),
    };
  });
}

function chooseWords(char, cedictIndex, priorityWords) {
  const overrides = WORD_OVERRIDES[char]?.map(([word, meaningEn], order) => ({
    word,
    meaningEn,
    order: -100 - order,
    source: "override",
  }));
  const candidates = [...(overrides || []), ...(cedictIndex.get(char) || [])];
  const seen = new Set();
  const selected = [];
  candidates
    .filter((candidate) => candidate.word.includes(char))
    .sort((a, b) => candidateScore(b, char, priorityWords) - candidateScore(a, char, priorityWords))
    .forEach((candidate) => {
      if (seen.has(candidate.word) || selected.length >= 3) return;
      seen.add(candidate.word);
      selected.push({
        word: candidate.word,
        meaningEn: cleanEnglishGloss(candidate.meaningEn) || `word with ${char}`,
      });
    });

  let fallbackIndex = 1;
  while (selected.length < 3) {
    const word = `${char}字${fallbackIndex}`;
    selected.push({ word, meaningEn: `practice word ${fallbackIndex} for ${char}` });
    fallbackIndex += 1;
  }
  return selected;
}

function sourceTags({ common, xinhua, make }) {
  return [
    common ? "common-800" : "",
    xinhua ? "xinhua" : "",
    make ? "learner-def" : "",
    "cc-cedict",
  ].filter(Boolean);
}

function genericMeaningZh(words) {
  return `常用汉字，常见于“${words.map((word) => word.word).join("、")}”等词语。`;
}

function makeEntry({ char, id, common, xinhua, make, cedictIndex, priorityWords }) {
  const words = chooseWords(char, cedictIndex, priorityWords);
  const pinyinValues = [
    ...(common?.pinyin || []),
    ...(xinhua?.pinyin ? [xinhua.pinyin] : []),
    ...(make?.pinyin || []),
  ]
    .map(cleanPinyin)
    .filter(Boolean);
  const pinyinAlt = [...new Set(pinyinValues)];
  const meaningEn =
    parseXinhuaMoreEnglish(xinhua?.more) ||
    compactDefinition(make?.definition || words[0]?.meaningEn || "common Chinese character");
  const meaningZh = genericMeaningZh(words);

  return {
    id,
    char,
    pinyin: pinyinAlt[0] || "",
    pinyinAlt: pinyinAlt.slice(0, 4),
    meaningEn,
    meaningZh,
    radical: common?.radicals || xinhua?.radicals || make?.radical || "",
    strokes: Number(common?.strokes || xinhua?.strokes || make?.matches?.length || 0),
    structure: STRUCTURE_LABELS[common?.structure] || "standard character",
    words,
    etymologyHint: make?.etymology?.hint || "",
    sourceTags: sourceTags({ common, xinhua, make }),
  };
}

function stripSentenceData(entry) {
  const { sentence, sentences, ...rest } = entry;
  return rest;
}

function applyEntryRepairs(entries) {
  entries.forEach((entry) => {
    const repair = ENTRY_REPAIRS[entry.char];
    if (!repair) return;
    if (repair.words) {
      entry.words = repair.words.map(([word, meaningEn]) => ({ word, meaningEn }));
      if (!repair.meaningZh) entry.meaningZh = genericMeaningZh(entry.words);
    }
    if (repair.meaningEn) entry.meaningEn = repair.meaningEn;
    if (repair.meaningZh) entry.meaningZh = repair.meaningZh;
  });
}

function pickCourseChars(existingEntries, commonRows) {
  const existingChars = existingEntries.map((entry) => entry.char);
  if (existingChars.length >= TARGET_CHARACTER_COUNT) {
    return existingChars.slice(0, TARGET_CHARACTER_COUNT);
  }
  const seen = new Set(existingChars);
  const sortedCommon = commonRows
    .filter((row) => /^[\u4e00-\u9fff]$/.test(row.char))
    .sort((a, b) => (a.frequency ?? 9999) - (b.frequency ?? 9999) || a.index - b.index);
  const additions = [];
  for (const row of sortedCommon) {
    if (seen.has(row.char)) continue;
    seen.add(row.char);
    additions.push(row.char);
    if (existingChars.length + additions.length >= TARGET_CHARACTER_COUNT) break;
  }
  assert(existingChars.length + additions.length === TARGET_CHARACTER_COUNT, "Could not pick enough course characters");
  return [...existingChars, ...additions];
}

function cleanIdiomText(value = "", word = "") {
  return cleanText(value)
    .replace(/”/g, "”")
    .replace(/～/g, word)
    .slice(0, 180);
}

function buildIdioms(idiomRows) {
  const byWord = new Map(idiomRows.map((row) => [row.word, row]));
  const selected = [];
  const seen = new Set();
  const unsafeIdiomText = /战争|仇恨|凶手|死亡|报复|杀|尸|奴隶|犯罪|侵犯|玉人/;

  function add(row) {
    if (selected.length >= IDIOM_TARGET) return;
    if (!row || seen.has(row.word)) return;
    if (!/^[\u4e00-\u9fff]{4}$/.test(row.word)) return;
    if (!row.pinyin || !row.explanation) return;
    if (unsafeIdiomText.test(`${row.explanation || ""}${row.example || ""}${row.derivation || ""}`)) return;
    seen.add(row.word);
    selected.push({
      id: selected.length + 1,
      word: row.word,
      pinyin: cleanPinyin(row.pinyin),
      explanation: cleanIdiomText(row.explanation, row.word),
      example: row.example && row.example !== "无" ? cleanIdiomText(row.example, row.word) : "",
      derivation: row.derivation && row.derivation !== "无" ? cleanIdiomText(row.derivation, row.word) : "",
    });
  }

  IDIOM_PRIORITY.forEach((word) => add(byWord.get(word)));
  idiomRows
    .filter((row) => /^[\u4e00-\u9fff]{4}$/.test(row.word))
    .sort((a, b) => a.word.localeCompare(b.word, "zh-Hans-CN"))
    .forEach((row) => {
      if (selected.length < IDIOM_TARGET) add(row);
    });

  assert(selected.length === IDIOM_TARGET, `Expected ${IDIOM_TARGET} idioms, got ${selected.length}`);
  return selected.map((idiom, index) => ({ ...idiom, id: index + 1 }));
}

function sqlValue(value) {
  if (value === null || value === undefined) return "NULL";
  return `'${String(value).replace(/'/g, "''")}'`;
}

async function writeSqlite(entries, idioms) {
  const uniqueWords = new Map();
  let characterWordCount = 0;
  entries.forEach((entry) => {
    characterWordCount += entry.words.length;
    entry.words.forEach((word) => {
      if (!uniqueWords.has(word.word)) {
        uniqueWords.set(word.word, {
          word: word.word,
          meaningEn: word.meaningEn,
          category: "course",
          exampleZh: "",
          exampleEn: "",
        });
      }
    });
  });

  const statements = [
    "PRAGMA foreign_keys = OFF;",
    "DROP TABLE IF EXISTS metadata;",
    "DROP TABLE IF EXISTS words;",
    "DROP TABLE IF EXISTS characters;",
    "DROP TABLE IF EXISTS character_words;",
    "DROP TABLE IF EXISTS character_sentences;",
    "DROP TABLE IF EXISTS idioms;",
    "CREATE TABLE metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL);",
    "CREATE TABLE characters (id INTEGER PRIMARY KEY, char TEXT NOT NULL UNIQUE, pinyin TEXT NOT NULL, pinyin_alt_json TEXT NOT NULL, meaning_zh TEXT NOT NULL, meaning_en TEXT NOT NULL, radical TEXT NOT NULL, strokes INTEGER NOT NULL, structure TEXT NOT NULL, etymology_hint TEXT NOT NULL, font_evolution_json TEXT NOT NULL, source_url TEXT NOT NULL, source_tags_json TEXT NOT NULL);",
    "CREATE TABLE words (id INTEGER PRIMARY KEY, word TEXT NOT NULL UNIQUE, meaning_en TEXT NOT NULL, category TEXT NOT NULL, example_zh TEXT NOT NULL, example_en TEXT NOT NULL);",
    "CREATE TABLE character_words (char TEXT NOT NULL, sort_order INTEGER NOT NULL, word TEXT NOT NULL, meaning_en TEXT NOT NULL, PRIMARY KEY (char, sort_order));",
    "CREATE TABLE idioms (id INTEGER PRIMARY KEY, word TEXT NOT NULL UNIQUE, pinyin TEXT NOT NULL, explanation TEXT NOT NULL, example_zh TEXT NOT NULL, derivation TEXT NOT NULL);",
    `INSERT INTO metadata VALUES ('character_count', ${sqlValue(entries.length)});`,
    `INSERT INTO metadata VALUES ('lesson_size', ${sqlValue(LESSON_SIZE)});`,
    `INSERT INTO metadata VALUES ('lesson_count', ${sqlValue(entries.length / LESSON_SIZE)});`,
    `INSERT INTO metadata VALUES ('common_word_count', ${sqlValue(uniqueWords.size)});`,
    `INSERT INTO metadata VALUES ('character_word_count', ${sqlValue(characterWordCount)});`,
    `INSERT INTO metadata VALUES ('idiom_count', ${sqlValue(idioms.length)});`,
    `INSERT INTO metadata VALUES ('font_evolution_count', ${sqlValue(
      entries.filter((entry) => entry.fontEvolution?.length).length
    )});`,
  ];

  entries.forEach((entry) => {
    statements.push(
      `INSERT INTO characters VALUES (${entry.id}, ${sqlValue(entry.char)}, ${sqlValue(entry.pinyin)}, ${sqlValue(
        JSON.stringify(entry.pinyinAlt || [])
      )}, ${sqlValue(entry.meaningZh)}, ${sqlValue(entry.meaningEn)}, ${sqlValue(entry.radical)}, ${sqlValue(
        entry.strokes
      )}, ${sqlValue(entry.structure)}, ${sqlValue(entry.etymologyHint || "")}, ${sqlValue(
        JSON.stringify(entry.fontEvolution || [])
      )}, ${sqlValue(entry.sourceUrl || "")}, ${sqlValue(JSON.stringify(entry.sourceTags || []))});`
    );
  });

  [...uniqueWords.values()].forEach((word, index) => {
    statements.push(
      `INSERT INTO words VALUES (${index + 1}, ${sqlValue(word.word)}, ${sqlValue(word.meaningEn)}, ${sqlValue(
        word.category
      )}, ${sqlValue(word.exampleZh)}, ${sqlValue(word.exampleEn)});`
    );
  });
  entries.forEach((entry) => {
    entry.words.forEach((word, index) => {
      statements.push(
        `INSERT INTO character_words VALUES (${sqlValue(entry.char)}, ${index + 1}, ${sqlValue(word.word)}, ${sqlValue(
          word.meaningEn
        )});`
      );
    });
  });
  idioms.forEach((idiom) => {
    statements.push(
      `INSERT INTO idioms VALUES (${idiom.id}, ${sqlValue(idiom.word)}, ${sqlValue(idiom.pinyin)}, ${sqlValue(
        idiom.explanation
      )}, ${sqlValue(idiom.example)}, ${sqlValue(idiom.derivation)});`
    );
  });

  execFileSync("sqlite3", [DB_PATH], {
    input: statements.join("\n"),
    maxBuffer: 40 * 1024 * 1024,
  });
  return {
    characterCount: entries.length,
    commonWordCount: uniqueWords.size,
    characterWordCount,
    idiomCount: idioms.length,
  };
}

function assertEntries(entries) {
  assert(entries.length === TARGET_CHARACTER_COUNT, `Expected ${TARGET_CHARACTER_COUNT} entries`);
  assert(new Set(entries.map((entry) => entry.char)).size === entries.length, "Duplicate course characters");
  entries.forEach((entry) => {
    assert(entry.pinyin, `${entry.char} missing pinyin`);
    assert(entry.radical, `${entry.char} missing radical`);
    assert(entry.strokes, `${entry.char} missing stroke count`);
    assert(entry.meaningZh, `${entry.char} missing Chinese meaning`);
    assert(entry.meaningEn, `${entry.char} missing English meaning`);
    assert(entry.sourceUrl, `${entry.char} missing hwxnet source URL`);
    assert(entry.fontEvolution?.length >= 3, `${entry.char} missing font evolution`);
    assert(entry.words.length === 3, `${entry.char} needs 3 words`);
    entry.words.forEach((word) => assert(word.word.includes(entry.char), `${entry.char} word missing char: ${word.word}`));
  });
}

const existingData = parseDataJs(await readFile(DATA_PATH, "utf8"));
const [xinhuaRows, commonText, makeText, cedictRows, idiomRows, hskRows] = await Promise.all([
  getJson(SOURCES.xinhua),
  getText(SOURCES.commonBase),
  getText(SOURCES.makeMeAHanzi),
  loadCedictRows(),
  getJson(SOURCES.xinhuaIdioms),
  getJson(SOURCES.hskVocabulary),
]);

const commonRows = parseLooseJsonLines(commonText);
const xinhuaMap = new Map(xinhuaRows.map((row) => [row.word, row]));
const commonMap = new Map(commonRows.map((row) => [row.char, row]));
const makeMap = parseMakeMeAHanzi(makeText);
const cedictIndex = buildCedictIndex(cedictRows, hskRows);
const priorityWords = new Set([
  ...wordBankPriorityFromBuildScript(),
  ...existingData.entries.flatMap((entry) => entry.words.map((word) => word.word)),
]);
const preservedEntries = existingData.entries.slice(0, PRESERVED_CHARACTER_COUNT);
const courseChars = pickCourseChars(preservedEntries, commonRows);
const existingByChar = new Map(preservedEntries.map((entry) => [entry.char, entry]));
const entries = courseChars.map((char, index) => {
  const existing = existingByChar.get(char);
  if (existing) return stripSentenceData({ ...existing, id: index + 1 });
  return makeEntry({
    char,
    id: index + 1,
    common: commonMap.get(char),
    xinhua: xinhuaMap.get(char),
    make: makeMap.get(char),
    cedictIndex,
    priorityWords,
  });
});
applyEntryRepairs(entries);
console.log("Fetching 汉文学网 character explanations and font evolution...");
const hwxnet = await enrichEntriesWithHwxnet(entries, {
  onProgress({ index, total, char, ok, error }) {
    if (!ok) {
      console.warn(`Warning: 汉文学网 fetch failed for ${char}: ${error.message}`);
      return;
    }
    if (index === total || index % 50 === 0) {
      console.log(`Fetched ${index}/${total} 汉文学网 pages`);
    }
  },
});
entries.splice(0, entries.length, ...hwxnet.entries);
const idioms = buildIdioms(idiomRows);

assertEntries(entries);
const databaseCounts = await writeSqlite(entries, idioms);
const payload = `// Generated by tools/expand-course-data.mjs. Do not edit by hand.
window.CHINESE_STUDY_DATA = ${JSON.stringify(
  {
    generatedAt: "2026-04-30",
    scope: "800 Simplified Chinese characters, five characters per lesson, with 200 idioms",
    lessonSize: LESSON_SIZE,
    characterCount: databaseCounts.characterCount,
    commonWordCount: databaseCounts.commonWordCount,
    idiomCount: databaseCounts.idiomCount,
    sources: [
      {
        name: "汉文学网在线新华字典",
        role: "character explanations, English glosses, source URLs, and font evolution images",
        url: "https://zd.hwxnet.com/",
      },
      {
        name: "pwxcoo/chinese-xinhua",
        role: "Xinhua-style character pinyin, radicals, strokes and idiom data",
        url: "https://github.com/pwxcoo/chinese-xinhua",
      },
      {
        name: "mapull/chinese-dictionary",
        role: "common-character metadata and stroke counts",
        url: "https://github.com/mapull/chinese-dictionary",
      },
      {
        name: "Make Me a Hanzi",
        role: "learner-friendly English definitions and component hints",
        url: "https://github.com/skishore/makemeahanzi",
      },
      {
        name: "CC-CEDICT",
        role: "Chinese-English word definitions for expanded course words",
        url: "https://cc-cedict.org/wiki/",
      },
      {
        name: "Complete HSK Vocabulary",
        role: "common HSK vocabulary prioritisation for expanded course words",
        url: "https://github.com/drkameleon/complete-hsk-vocabulary",
      },
      {
        name: "Hanzi Writer",
        role: "runtime stroke-order animation data",
        url: "https://chanind.github.io/hanzi-writer/",
      },
    ],
    entries,
    idioms,
  },
  null,
  2
)};
`;

await writeFile(DATA_PATH, payload, "utf8");

if (!existsSync(DB_PATH)) {
  throw new Error(`SQLite database was not written: ${DB_PATH}`);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      entries: entries.length,
      lessons: entries.length / LESSON_SIZE,
      commonWordCount: databaseCounts.commonWordCount,
      idioms: idioms.length,
      hwxnet: hwxnet.stats,
    },
    null,
    2
  )
);
