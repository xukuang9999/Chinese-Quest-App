import { execFileSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const CHAR_LIST =
  "一二三四五六七八九十零百千万个只口本书笔纸人我你他她它们的了是不有在和很也都就要会能想喜欢爱好大小多少高长短新旧冷热快慢早晚上下左右前后里外中东南西北今天明昨年月日星期时分点半春夏秋冬风雨雪云地山水火木土金花草树林河海田园家学校班课老师同朋友名字叫说读写听看画唱跳跑走坐站来去回进出开关买卖吃喝做玩睡起穿洗给拿放找问答知道认识习练试成绩对错真假每什么谁哪这那吗呢吧啊因为所以可再见请谢没系爸妈哥姐弟妹先生女男孩子儿童身体头手足眼耳鼻心饭面菜果肉奶茶糖蛋鱼鸡猫狗鸟马牛羊车船飞机巴士自行公交路街店院图国文英澳洲周末育音乐颜色红黄蓝绿白黑动物电影故事运球游拼汉部首勇努力奖励贴宠等级礼任务程测正确安全帮助";

const SOURCES = {
  xinhua:
    "https://raw.githubusercontent.com/pwxcoo/chinese-xinhua/master/data/word.json",
  commonBase:
    "https://raw.githubusercontent.com/mapull/chinese-dictionary/main/character/common/char_common_base.json",
  makeMeAHanzi:
    "https://raw.githubusercontent.com/skishore/makemeahanzi/master/dictionary.txt",
  onlineXinhuaBase: "https://zd.hwxnet.com/search/",
};

const WORD_BANK = [
  ["一天", "one day", "time", "今天，我学习一个汉字。"],
  ["二月", "February", "time", "二月有二十八天。"],
  ["三个", "three items", "number", "桌上有三个本子。"],
  ["四点", "four o'clock", "time", "四点以后我们读书。"],
  ["五本", "five books", "number", "我有五本中文书。"],
  ["六只", "six animals/items", "number", "这里有六只玩具。"],
  ["七岁", "seven years old", "number", "她今年七岁。"],
  ["八月", "August", "time", "八月在澳洲是冬天。"],
  ["九点", "nine o'clock", "time", "九点开始上课。"],
  ["十分", "very; ten points", "number", "这个字十分有用。"],
  ["零分", "zero points", "number", "测试不要拿零分。"],
  ["百年", "one hundred years", "number", "大树可以活百年。"],
  ["千米", "kilometre", "number", "学校离家一千米。"],
  ["万一", "just in case", "phrase", "万一不会，可以看提示。"],
  ["一个", "one", "number", "我每天学一个新字。"],
  ["只要", "as long as", "phrase", "只要练习，就会进步。"],
  ["人口", "population; people", "noun", "这个城市人口很多。"],
  ["课本", "textbook", "school", "课本里有新汉字。"],
  ["书包", "school bag", "school", "我把书放进书包。"],
  ["铅笔", "pencil", "school", "我用铅笔写字。"],
  ["白纸", "white paper", "school", "请在白纸上练习。"],
  ["大人", "adult", "person", "大人和孩子一起学习。"],
  ["我们", "we", "person", "我们一起说中文。"],
  ["你们", "you all", "person", "你们读得很好。"],
  ["他们", "they", "person", "他们在操场跑步。"],
  ["她们", "they, female", "person", "她们喜欢唱歌。"],
  ["它们", "they, non-human", "person", "它们都是玩具。"],
  ["我的", "my", "person", "这是我的贴纸。"],
  ["好了", "finished; okay", "phrase", "我写好了这个字。"],
  ["不是", "is not", "phrase", "这不是我的本子。"],
  ["没有", "do not have", "phrase", "我没有忘记作业。"],
  ["在家", "at home", "place", "我在家练习拼音。"],
  ["和平", "peace", "noun", "我们喜欢和平。"],
  ["很好", "very good", "feedback", "你的发音很好。"],
  ["也是", "also is", "phrase", "中文也是有趣的。"],
  ["都对", "all correct", "feedback", "五题都对了。"],
  ["就是", "exactly; just", "phrase", "这就是今天的字。"],
  ["想要", "want", "verb", "我想要一张贴纸。"],
  ["会写", "can write", "verb", "我会写这个汉字。"],
  ["能力", "ability", "noun", "练习可以提高能力。"],
  ["喜欢", "like", "feeling", "我喜欢学中文。"],
  ["爱好", "hobby", "feeling", "我的爱好是画画。"],
  ["大小", "size", "adj", "请比较大小。"],
  ["多少", "how many", "question", "你认识多少汉字？"],
  ["高兴", "happy", "feeling", "答对了，我很高兴。"],
  ["长短", "length", "adj", "线有长短。"],
  ["新书", "new book", "school", "这是一本新书。"],
  ["旧书", "old book", "school", "旧书也很有用。"],
  ["冷热", "hot and cold", "adj", "请说冷热的反义词。"],
  ["快乐", "happy", "feeling", "学习可以很快乐。"],
  ["慢跑", "jog", "verb", "早上我去慢跑。"],
  ["早上", "morning", "time", "早上好！"],
  ["晚上", "evening", "time", "晚上我读故事。"],
  ["上下", "up and down", "direction", "笔画有上下。"],
  ["左右", "left and right", "direction", "请看左右结构。"],
  ["前后", "front and back", "direction", "排队要看前后。"],
  ["里面", "inside", "direction", "书在包里面。"],
  ["外面", "outside", "direction", "外面有风。"],
  ["中间", "middle", "direction", "点在中间。"],
  ["东方", "east", "direction", "太阳从东方升起。"],
  ["南方", "south", "direction", "南方天气暖。"],
  ["西方", "west", "direction", "太阳往西方落下。"],
  ["北方", "north", "direction", "北方冬天冷。"],
  ["今天", "today", "time", "今天完成一课。"],
  ["明天", "tomorrow", "time", "明天继续练习。"],
  ["昨天", "yesterday", "time", "昨天我学了五个字。"],
  ["年月", "year and month", "time", "请写今年几月。"],
  ["日记", "diary", "school", "我用中文写日记。"],
  ["星期", "week", "time", "这个星期我每天打卡。"],
  ["时间", "time", "time", "学习时间到了。"],
  ["分数", "score", "school", "测试分数进步了。"],
  ["点心", "snack", "food", "下课后吃点心。"],
  ["半天", "half a day", "time", "半天可以学很多。"],
  ["春天", "spring", "nature", "春天有花。"],
  ["夏天", "summer", "nature", "夏天很热。"],
  ["秋天", "autumn", "nature", "秋天树叶变黄。"],
  ["冬天", "winter", "nature", "澳洲八月是冬天。"],
  ["风雨", "wind and rain", "nature", "风雨来了，要回家。"],
  ["雪花", "snowflake", "nature", "雪花是白色的。"],
  ["白云", "white cloud", "nature", "天上有白云。"],
  ["地图", "map", "place", "地图上有澳洲。"],
  ["山水", "mountains and water", "nature", "这幅画有山水。"],
  ["火车", "train", "transport", "火车开得很快。"],
  ["木头", "wood", "nature", "桌子是木头做的。"],
  ["土地", "land; soil", "nature", "土地上长草。"],
  ["金色", "gold colour", "colour", "星星是金色的。"],
  ["花园", "garden", "place", "花园里有红花。"],
  ["草地", "grass", "place", "孩子在草地上玩。"],
  ["树林", "woods", "nature", "树林里很安静。"],
  ["河水", "river water", "nature", "河水向东流。"],
  ["大海", "sea", "nature", "大海是蓝色的。"],
  ["田园", "field and garden", "place", "田园里有菜。"],
  ["家庭", "family", "person", "我的家庭很温暖。"],
  ["学校", "school", "school", "我在学校学习中文。"],
  ["班级", "class", "school", "我们班级有新同学。"],
  ["上课", "have class", "school", "我们九点上课。"],
  ["老师", "teacher", "person", "老师教我们拼音。"],
  ["同学", "classmate", "person", "同学一起练习。"],
  ["朋友", "friend", "person", "朋友帮我读字。"],
  ["名字", "name", "person", "请写你的名字。"],
  ["叫做", "be called", "verb", "这个字叫做“山”。"],
  ["说话", "speak", "verb", "请用中文说话。"],
  ["读书", "read", "verb", "我每天读书。"],
  ["写字", "write characters", "verb", "我认真写字。"],
  ["听说", "listen and speak", "verb", "听说练习很重要。"],
  ["看见", "see", "verb", "我看见一个新字。"],
  ["画画", "draw", "verb", "她喜欢画画。"],
  ["唱歌", "sing", "verb", "我们一起唱歌。"],
  ["跳舞", "dance", "verb", "音乐课上跳舞。"],
  ["跑步", "run", "verb", "体育课上跑步。"],
  ["走路", "walk", "verb", "我走路去学校。"],
  ["坐下", "sit down", "verb", "请坐下写字。"],
  ["站立", "stand", "verb", "上课前请站立。"],
  ["来回", "back and forth", "verb", "线条来回移动。"],
  ["进去", "go in", "verb", "请走进去。"],
  ["出来", "come out", "verb", "太阳出来了。"],
  ["开门", "open the door", "verb", "请开门。"],
  ["关门", "close the door", "verb", "请轻轻关门。"],
  ["买书", "buy books", "verb", "周末我去买书。"],
  ["卖花", "sell flowers", "verb", "店里卖花。"],
  ["吃饭", "eat a meal", "verb", "晚上六点吃饭。"],
  ["喝水", "drink water", "verb", "运动后要喝水。"],
  ["做事", "do things", "verb", "做事要认真。"],
  ["玩具", "toy", "noun", "玩具在盒子里。"],
  ["睡觉", "sleep", "verb", "晚上要早睡觉。"],
  ["起床", "get up", "verb", "早上七点起床。"],
  ["穿衣", "put on clothes", "verb", "起床后穿衣。"],
  ["洗手", "wash hands", "verb", "吃饭前要洗手。"],
  ["给你", "give you", "verb", "我给你一支笔。"],
  ["拿笔", "take a pen", "verb", "请拿笔写字。"],
  ["放下", "put down", "verb", "请放下书包。"],
  ["找到", "find", "verb", "我找到正确答案。"],
  ["问答", "question and answer", "school", "测试有问答。"],
  ["知道", "know", "verb", "我知道这个字。"],
  ["认识", "recognise", "verb", "我认识这个汉字。"],
  ["学习", "study", "school", "学习中文很有趣。"],
  ["练习", "practice", "school", "每天练习五分钟。"],
  ["测试", "quiz", "school", "课程后有测试。"],
  ["成绩", "result", "school", "我的成绩进步了。"],
  ["对错", "right and wrong", "feedback", "测试会显示对错。"],
  ["真假", "true and false", "feedback", "请判断真假。"],
  ["每天", "every day", "time", "每天打卡一次。"],
  ["什么", "what", "question", "这是什么字？"],
  ["谁的", "whose", "question", "这是谁的书？"],
  ["哪里", "where", "question", "学校在哪里？"],
  ["这个", "this", "question", "这个字我会读。"],
  ["那个", "that", "question", "那个词是什么意思？"],
  ["好吗", "okay?", "question", "一起练习，好吗？"],
  ["是呢", "indeed", "phrase", "是呢，我也这样想。"],
  ["好吧", "okay", "phrase", "好吧，我们开始。"],
  ["啊呀", "ah!", "phrase", "啊呀，我写错了。"],
  ["因为", "because", "phrase", "因为练习，所以进步。"],
  ["所以", "so", "phrase", "我努力，所以升级了。"],
  ["可以", "can; may", "phrase", "你可以再试一次。"],
  ["再见", "goodbye", "phrase", "下课后说再见。"],
  ["请问", "excuse me", "phrase", "请问，这个字怎么读？"],
  ["谢谢", "thank you", "phrase", "谢谢你的帮助。"],
  ["对不起", "sorry", "phrase", "写错了，说对不起。"],
  ["没关系", "no problem", "phrase", "没关系，再试一次。"],
  ["爸爸", "dad", "family", "爸爸帮我读拼音。"],
  ["妈妈", "mum", "family", "妈妈听我读字。"],
  ["哥哥", "older brother", "family", "哥哥会写中文。"],
  ["姐姐", "older sister", "family", "姐姐教我唱歌。"],
  ["弟弟", "younger brother", "family", "弟弟喜欢玩具。"],
  ["妹妹", "younger sister", "family", "妹妹画了一朵花。"],
  ["先生", "Mr.; teacher", "person", "王先生是老师。"],
  ["女孩", "girl", "person", "女孩在读书。"],
  ["男孩", "boy", "person", "男孩在跑步。"],
  ["孩子", "child", "person", "孩子喜欢贴纸。"],
  ["儿童", "children", "person", "儿童可以快乐学习。"],
  ["身体", "body", "body", "运动让身体健康。"],
  ["头发", "hair", "body", "她的头发是黑色的。"],
  ["手足", "hands and feet", "body", "手足要保持干净。"],
  ["眼睛", "eyes", "body", "请用眼睛看笔顺。"],
  ["耳朵", "ears", "body", "用耳朵听发音。"],
  ["鼻子", "nose", "body", "鼻子在脸中间。"],
  ["口语", "spoken language", "body", "口语练习很有用。"],
  ["心情", "feeling", "body", "答对后心情很好。"],
  ["米饭", "rice", "food", "午饭有米饭。"],
  ["面条", "noodles", "food", "我喜欢吃面条。"],
  ["青菜", "vegetables", "food", "青菜是绿色的。"],
  ["水果", "fruit", "food", "水果很甜。"],
  ["牛肉", "beef", "food", "晚饭有牛肉。"],
  ["牛奶", "milk", "food", "早上喝牛奶。"],
  ["茶水", "tea", "food", "大人喝茶水。"],
  ["糖果", "lolly; candy", "food", "糖果很甜。"],
  ["鸡蛋", "egg", "food", "早餐有鸡蛋。"],
  ["鱼肉", "fish meat", "food", "鱼肉很好吃。"],
  ["小猫", "cat", "animal", "小猫在家里。"],
  ["小狗", "dog", "animal", "小狗跑得很快。"],
  ["小鸟", "bird", "animal", "小鸟会唱歌。"],
  ["马车", "horse cart", "transport", "故事里有马车。"],
  ["牛羊", "cows and sheep", "animal", "田里有牛羊。"],
  ["车站", "station", "transport", "车站在学校前面。"],
  ["船只", "boat", "transport", "河上有船只。"],
  ["飞机", "plane", "transport", "飞机飞得很高。"],
  ["巴士", "bus", "transport", "我坐巴士去学校。"],
  ["自行车", "bicycle", "transport", "我会骑自行车。"],
  ["公交车", "public bus", "transport", "公交车来了。"],
  ["路口", "intersection", "place", "路口要注意安全。"],
  ["街道", "street", "place", "街道上有商店。"],
  ["商店", "shop", "place", "商店卖书。"],
  ["公园", "park", "place", "公园里有花。"],
  ["学院", "college; school", "place", "学院里有图书。"],
  ["图画", "picture", "school", "图画里有山水。"],
  ["中国", "China", "place", "中文来自中国。"],
  ["中文", "Chinese language", "school", "我学习中文。"],
  ["英文", "English language", "school", "英文可以帮助理解。"],
  ["澳洲", "Australia", "place", "我们在澳洲学中文。"],
  ["周末", "weekend", "time", "周末也可以打卡。"],
  ["体育", "PE; sport", "school", "体育课上跑步。"],
  ["音乐", "music", "school", "音乐课上唱歌。"],
  ["颜色", "colour", "colour", "请说这个颜色。"],
  ["红色", "red", "colour", "红色很亮。"],
  ["黄色", "yellow", "colour", "星星是黄色的。"],
  ["蓝色", "blue", "colour", "大海是蓝色的。"],
  ["绿色", "green", "colour", "草地是绿色的。"],
  ["白色", "white", "colour", "白云是白色的。"],
  ["黑色", "black", "colour", "头发是黑色的。"],
  ["动物", "animal", "animal", "动物也有名字。"],
  ["电影", "movie", "noun", "周末我看中文电影。"],
  ["故事", "story", "noun", "老师讲故事。"],
  ["运动", "sport; exercise", "verb", "运动后要喝水。"],
  ["足球", "soccer", "sport", "澳洲小学生喜欢足球。"],
  ["游乐", "play and enjoy", "verb", "周末去公园游乐。"],
  ["拼音", "pinyin", "school", "拼音帮助我们读字。"],
  ["汉字", "Chinese character", "school", "汉字有笔画。"],
  ["部首", "radical", "school", "部首帮助查字。"],
  ["笔画", "strokes", "school", "请看笔画顺序。"],
  ["勇气", "courage", "feeling", "再试一次需要勇气。"],
  ["努力", "work hard", "feedback", "努力练习会进步。"],
  ["奖励", "reward", "feedback", "完成测试有奖励。"],
  ["贴纸", "sticker", "feedback", "今天打卡得到贴纸。"],
  ["宠物", "pet", "feedback", "宠物随着等级成长。"],
  ["成长", "grow up", "feedback", "每天学习会成长。"],
  ["等级", "level", "feedback", "答对题目提高等级。"],
  ["星星", "star", "feedback", "五题全对得星星。"],
  ["礼物", "gift", "feedback", "贴纸是小礼物。"],
  ["任务", "task", "school", "今天任务是五个字。"],
  ["课程", "lesson", "school", "每个课程有五个字。"],
  ["测试", "quiz", "school", "测试可以看进步。"],
  ["正确", "correct", "feedback", "这个答案正确。"],
  ["安全", "safe", "feedback", "学习时也要注意安全。"],
  ["帮助", "help", "feedback", "提示可以帮助你。"],
].map(([word, en, type, example]) => ({ word, en, type, example }));

const EXTRA_WORD_BANK = `
第一|first|number
一点|a little|number
一起|together|phrase
二十|twenty|number
第二|second|number
三个|three items|number
三月|March|time
第三|third|number
四个|four items|number
四月|April|time
第四|fourth|number
五个|five items|number
五月|May|time
第五|fifth|number
六月|June|time
六个|six items|number
第六|sixth|number
七月|July|time
七个|seven items|number
第七|seventh|number
八个|eight items|number
八点|eight o'clock|time
第八|eighth|number
九月|September|time
九个|nine items|number
第九|ninth|number
十个|ten items|number
十岁|ten years old|number
第十|tenth|number
零食|snack|food
零度|zero degrees|weather
一百|one hundred|number
百个|one hundred items|number
一千|one thousand|number
千字|one thousand characters|school
一万|ten thousand|number
万个|ten thousand items|number
千万|ten million; many|number
一只|one animal or small item|measure
两只|two animals or small items|measure
入口|entrance|place
出口|exit|place
门口|doorway|place
本子|notebook|school
书本|book|school
书店|bookshop|place
笔记|notes|school
笔顺|stroke order|school
纸张|paper sheet|school
纸条|paper note|school
友好|friendly|feeling
友爱|friendly love|feeling
自己|oneself|person
自然|nature; natural|nature
自我|self|person
个人|person; individual|person
人们|people|person
人家|other people; family|person
我家|my home|family
你我|you and me|person
你的|your|person
他人|other people|person
他的|his|person
她家|her home|family
她的|her|person
它的|its|person
它们|they; them for things or animals|person
的确|indeed|phrase
有的|some|phrase
了解|understand|verb
为了|in order to|phrase
了不起|amazing|feedback
是的|yes; that is right|phrase
都是|all are|phrase
都会|all can|phrase
就要|about to|phrase
要是|if|phrase
会说|can speak|verb
能够|be able to|verb
可能|possible|phrase
想法|idea|noun
想念|miss; think of|feeling
喜爱|like; love|feeling
爱心|loving heart|feeling
爱吃|like to eat|food
好人|good person|person
好听|nice to hear|audio
大家|everyone|person
小心|be careful|safety
小孩|child|person
多么|how; very|phrase
多数|most|number
少年|young person|person
高山|high mountain|nature
长大|grow up|person
长城|the Great Wall|place
短文|short text|school
新年|New Year|time
新的|new one|adjective
旧的|old one|adjective
冷水|cold water|food
冷天|cold day|weather
热水|hot water|food
热心|warm-hearted|feeling
快车|fast train or bus|transport
快点|hurry up|phrase
慢慢|slowly|adverb
早饭|breakfast|food
早安|good morning|greeting
晚安|good night|greeting
晚饭|dinner|food
上面|above; on top|direction
上学|go to school|school
下课|finish class|school
下面|below; under|direction
左手|left hand|body
左边|left side|direction
右手|right hand|body
右边|right side|direction
前面|front|direction
以前|before|time
后面|behind|direction
以后|after; later|time
里外|inside and outside|direction
外国|foreign country|place
外边|outside|direction
中午|noon|time
中心|centre|place
东西|thing|noun
东边|east side|direction
南边|south side|direction
南半球|Southern Hemisphere|place
西边|west side|direction
北边|north side|direction
今晚|tonight|time
明年|next year|time
明日|tomorrow|time
昨晚|last night|time
去年|last year|time
年级|year level; grade|school
月亮|moon|nature
月份|month|time
日子|day; date|time
生日|birthday|time
星期天|Sunday|time
期末|end of term|school
时候|time; moment|time
小时|hour|time
分钟|minute|time
半个|half of one item|number
半月|half a month|time
春风|spring wind|nature
春雨|spring rain|nature
夏日|summer day|nature
秋风|autumn wind|nature
冬雪|winter snow|nature
风车|windmill|noun
雨水|rainwater|nature
下雪|snow|weather
云朵|cloud|nature
地上|on the ground|place
山上|on the mountain|place
山羊|goat|animal
水杯|water cup|food
火山|volcano|nature
火苗|flame|nature
木马|wooden horse|toy
木屋|wooden house|place
土豆|potato|food
金鱼|goldfish|animal
金星|Venus; gold star|nature
花草|flowers and grass|nature
花朵|flower|nature
草原|grassland|nature
树木|trees|nature
树叶|tree leaf|nature
林子|woods|nature
河边|riverside|place
海水|sea water|nature
海边|seaside|place
田地|field|place
田里|in the field|place
家园|home; homeland|place
家人|family member|family
家长|parent|family
校园|school campus|school
校长|principal|school
班长|class monitor|school
课堂|classroom lesson|school
课文|lesson text|school
老人|older person|person
师生|teachers and students|school
同桌|desk mate|school
同时|at the same time|time
名片|name card|person
叫声|sound; cry|audio
说中文|speak Chinese|verb
读音|pronunciation|school
读者|reader|person
写作|writing|school
听见|hear|verb
听话|listen well|verb
看书|read a book|school
画笔|paintbrush|school
跳高|high jump|sport
跳远|long jump|sport
跑道|running track|sport
走开|walk away|verb
坐好|sit properly|verb
站好|stand properly|verb
来到|come to|verb
来年|next year|time
回家|go home|family
进入|enter|verb
进门|enter the door|verb
出门|go out|verb
开始|begin|verb
开关|switch|noun
关心|care about|feeling
买东西|buy things|verb
买菜|buy vegetables|food
卖东西|sell things|verb
吃水果|eat fruit|food
喝茶|drink tea|food
做饭|cook a meal|food
做好|do well|verb
玩笑|joke|noun
穿上|put on|verb
洗脸|wash face|body
给我|give me|verb
拿书|take a book|school
放学|finish school|school
放手|let go|verb
找人|find someone|person
问题|question; problem|school
答案|answer|school
知识|knowledge|school
认真|serious; careful|feedback
习字|practice characters|school
练字|practice writing characters|school
考试|exam|school
试题|test question|school
错题|wrong question|school
真实|real; true|adjective
假日|holiday|time
每年|every year|time
为什么|why|question
谁家|whose home|question
这边|this side|direction
这里|here|place
那边|that side|direction
那里|there|place
你呢|what about you|question
来吧|come on|phrase
好啊|sure; okay|phrase
原因|reason|noun
所有|all; everything|phrase
可爱|cute|feeling
再来|come again; try again|verb
请坐|please sit|phrase
请进|please come in|phrase
关系|relationship|person
系鞋带|tie shoelaces|verb
学生|student|school
女生|female student|person
男生|male student|person
儿子|son|family
手心|palm|body
手指|finger|body
眼睛|eyes|body
耳朵|ears|body
口水|saliva|body
心里|in the heart; in mind|feeling
饭店|restaurant|place
面包|bread|food
菜园|vegetable garden|place
白菜|bok choy; Chinese cabbage|food
果汁|juice|food
肉包|meat bun|food
奶奶|grandmother|family
茶杯|teacup|food
蛋糕|cake|food
小鱼|small fish|animal
小鸡|chick|animal
狗狗|doggy|animal
马上|right away|time
马路|road|transport
车子|car; vehicle|transport
车票|ticket|transport
小船|small boat|transport
司机|driver|transport
机场|airport|transport
行走|walk|verb
行吗|is it okay|question
公共|public|place
公交|public transport|transport
交通|traffic; transport|transport
交给|hand to|verb
路上|on the road|place
街上|on the street|place
店里|in the shop|place
医院|hospital|place
院子|yard|place
图书|books|school
国家|country|place
文化|culture|school
英国|United Kingdom|place
教育|education|school
声音|sound|audio
红花|red flower|nature
蓝天|blue sky|nature
黑板|blackboard|school
动作|action|verb
电脑|computer|tech
电话|telephone|tech
故乡|hometown|place
运气|luck|feeling
球场|sports field|sport
游泳|swim|sport
游戏|game|play
汉语|Chinese language|school
首先|first of all|phrase
勇敢|brave|feeling
力气|strength|body
奖品|prize|feedback
贴画|sticker picture|feedback
宠爱|dote on; love dearly|feeling
等一等|wait a moment|phrase
有礼|polite|feedback
服务|service|noun
过程|process|noun
测一测|test it|school
安心|feel at ease|feeling
帮忙|help|verb
`.trim()
  .split("\n")
  .map((line) => {
    const [word, en, type] = line.split("|").map((part) => part.trim());
    return { word, en, type };
  });

const COVERAGE_WORD_BANK = `
其它|other things|noun
它是|it is|phrase
现在|now|time
正在|in the middle of doing|phrase
和气|kind and friendly|feeling
和好|make peace|feeling
很多|many; very much|number
很大|very big|adjective
也好|also okay|phrase
也许|maybe|phrase
就好|that will be fine|phrase
喜事|happy event|feeling
喜气|happy atmosphere|feeling
欢笑|laughter|feeling
欢迎|welcome|greeting
很少|very few|number
少女|young girl|person
少儿|children|person
短句|short sentence|school
短跑|sprint|sport
旧衣|old clothes|noun
旧年|old year|time
慢车|slow train or bus|transport
慢走|walk slowly|verb
北京|Beijing|place
北风|north wind|weather
今年|this year|time
今日|today|time
昨日|yesterday|time
夏季|summer season|time
秋日|autumn day|time
秋季|autumn season|time
冬日|winter day|time
冬季|winter season|time
云彩|clouds|nature
泥土|soil|nature
森林|forest|nature
小河|small river|nature
班上|in the class|school
老家|hometown|family
师长|teacher or elder|person
好朋友|good friend|person
小朋友|child; little friend|person
亲朋|relatives and friends|person
朋辈|peers|person
有名|famous|adjective
姓名|full name|person
叫我|call me|phrase
好看|good-looking|adjective
合唱|chorus|music
唱片|record|music
回去|go back|verb
回来|come back|verb
卖书|sell books|verb
卖菜|sell vegetables|food
喝奶|drink milk|food
玩耍|play|verb
睡衣|pyjamas|clothes
午睡|nap|verb
穿过|pass through|verb
洗澡|take a bath or shower|body
拿走|take away|verb
寻找|look for|verb
答对|answer correctly|school
知心|close and understanding|feeling
认字|recognise characters|school
识字|know characters|school
练歌|practice singing|music
成功|success|feedback
成绩单|report card|school
好成绩|good result|school
业绩|achievement|noun
错过|miss; pass by|verb
放假|have a holiday|time
每个|each one|number
什么人|what person|question
谁呀|who is it|question
哪个|which one|question
哪儿|where|question
是吗|is that so|question
对吗|is it right|question
他呢|what about him|question
哪呢|where is it|question
走吧|let's go|phrase
是啊|yes|phrase
因果|cause and effect|noun
厕所|toilet|place
再次|again|time
感谢|thank|feeling
谢礼|thank-you gift|noun
没事|no problem|phrase
先后|before and after|time
先来|come first|time
老爸|dad|family
爸妈|parents|family
老妈|mum|family
大哥|older brother|family
表哥|older male cousin|family
大姐|older sister|family
姐妹|sisters|family
小妹|younger sister|family
兄弟|brothers|family
小弟|younger brother|family
女儿|daughter|family
童年|childhood|time
童话|fairy tale|story
身上|on the body|body
身边|beside someone|place
体力|physical strength|body
头上|on the head|body
足够|enough|adjective
眼前|in front of the eyes|direction
眼看|watch; soon|verb
耳机|earphones|tech
木耳|wood ear mushroom|food
鼻音|nasal sound|audio
鼻尖|tip of the nose|body
奶茶|milk tea|food
糖水|sweet soup|food
白糖|white sugar|food
蛋黄|egg yolk|food
鸡肉|chicken meat|food
猫咪|kitty|animal
花猫|tabby cat|animal
宠物猫|pet cat|animal
宠物狗|pet dog|animal
猫头|cat head|animal
狗叫|dog bark|audio
狗屋|dog house|animal
鸟儿|bird|animal
鸟叫|bird call|audio
羊毛|wool|animal
船上|on the boat|transport
飞走|fly away|verb
飞鸟|flying bird|animal
巴西|Brazil|place
下巴|chin|body
男士|man; gentleman|person
女士|woman; lady|person
街角|street corner|place
英语|English language|school
澳元|Australian dollar|money
澳洲人|Australian person|person
亚洲|Asia|place
欧洲|Europe|place
周日|Sunday|time
一周|one week|time
末尾|end|noun
育儿|raising children|family
颜料|paint; pigment|art
笑颜|smiling face|feeling
红豆|red bean|food
黄花|yellow flower|nature
黄瓜|cucumber|food
蓝莓|blueberry|food
绿草|green grass|nature
绿叶|green leaf|nature
黑夜|dark night|time
影子|shadow|noun
合影|group photo|photo
故人|old friend|person
事情|thing; matter|noun
运河|canal|place
拼写|spell|school
拼图|puzzle|toy
汉堡|hamburger|food
部分|part|noun
总部|head office|place
首都|capital city|place
勇士|brave person|person
努嘴|purse one's lips|body
努努嘴|pout one's lips|body
努目|open eyes wide in anger|body
中奖|win a prize|feedback
鼓励|encourage|feedback
激励|motivate|feedback
贴上|stick on|verb
宠儿|favourite child or person|person
等待|wait|verb
礼貌|polite manners|feedback
任意|any; freely|phrase
责任|responsibility|noun
家务|housework|family
路程|distance; journey|transport
测量|measure|school
正好|just right|phrase
确认|confirm|verb
全对|all correct|feedback
全部|all|number
帮手|helper|person
助手|assistant|person
助人|help people|verb
`.trim()
  .split("\n")
  .map((line) => {
    const [word, en, type] = line.split("|").map((part) => part.trim());
    return { word, en, type };
  });

const COMMON_WORD_TARGET = 500;
const SQLITE_DB_PATH = fileURLToPath(new URL("../data/chinese-study.sqlite", import.meta.url));
const ONLINE_XINHUA_CONCURRENCY = 6;
const ONLINE_XINHUA_TIMEOUT_MS = 8000;

const BEGINNER_OVERRIDES = {
  一: {
    pinyin: "yī",
    meaningEn: "one",
    meaningZh: "数字 1，用来表示一个人、东西或事情。",
    words: [
      ["一个", "one item"],
      ["一天", "one day"],
      ["第一", "first"],
    ],
    sentence: { zh: "我每天学一个新字。", en: "I learn one new character every day." },
  },
  二: {
    pinyin: "èr",
    meaningEn: "two",
    meaningZh: "数字 2，表示两个。",
    words: [
      ["二月", "February"],
      ["二十", "twenty"],
      ["第二", "second"],
    ],
    sentence: { zh: "二月在澳洲是夏天。", en: "February is summer in Australia." },
  },
  三: {
    pinyin: "sān",
    meaningEn: "three",
    meaningZh: "数字 3，表示三个。",
    words: [
      ["三个", "three items"],
      ["三月", "March"],
      ["第三", "third"],
    ],
    sentence: { zh: "桌上有三个本子。", en: "There are three notebooks on the table." },
  },
  四: {
    pinyin: "sì",
    meaningEn: "four",
    meaningZh: "数字 4，表示四个。",
    words: [
      ["四点", "four o'clock"],
      ["四月", "April"],
      ["四个", "four items"],
    ],
    sentence: { zh: "四点以后我们读书。", en: "After four o'clock, we read." },
  },
  五: {
    pinyin: "wǔ",
    meaningEn: "five",
    meaningZh: "数字 5，也常用来表示一组五个。",
    words: [
      ["五本", "five books"],
      ["五月", "May"],
      ["五个", "five items"],
    ],
    sentence: { zh: "我有五本中文书。", en: "I have five Chinese books." },
  },
  六: {
    pinyin: "liù",
    meaningEn: "six",
    meaningZh: "数字 6，表示六个。",
    words: [
      ["六只", "six animals or small items"],
      ["六月", "June"],
      ["六个", "six items"],
    ],
    sentence: { zh: "这里有六只玩具小狗。", en: "There are six toy dogs here." },
  },
  七: {
    pinyin: "qī",
    meaningEn: "seven",
    meaningZh: "数字 7，表示七个。",
    words: [
      ["七岁", "seven years old"],
      ["七月", "July"],
      ["七个", "seven items"],
    ],
    sentence: { zh: "她今年七岁。", en: "She is seven years old this year." },
  },
  八: {
    pinyin: "bā",
    meaningEn: "eight",
    meaningZh: "数字 8，表示八个。",
    words: [
      ["八月", "August"],
      ["八个", "eight items"],
      ["八点", "eight o'clock"],
    ],
    sentence: { zh: "八月在澳洲是冬天。", en: "August is winter in Australia." },
  },
  九: {
    pinyin: "jiǔ",
    meaningEn: "nine",
    meaningZh: "数字 9，表示九个。",
    words: [
      ["九点", "nine o'clock"],
      ["九月", "September"],
      ["九个", "nine items"],
    ],
    sentence: { zh: "九点开始上课。", en: "Class starts at nine o'clock." },
  },
  十: {
    pinyin: "shí",
    meaningEn: "ten",
    meaningZh: "数字 10，表示十个。",
    words: [
      ["十个", "ten items"],
      ["十岁", "ten years old"],
      ["十本", "ten books"],
    ],
    sentence: { zh: "我有十个星星贴纸。", en: "I have ten star stickers." },
  },
  零: {
    pinyin: "líng",
    meaningEn: "zero",
    meaningZh: "数字 0，表示没有数量，也用在电话号码和分数里。",
    words: [
      ["零个", "zero items"],
      ["零度", "zero degrees"],
      ["零食", "snack"],
    ],
    sentence: { zh: "我的错题现在是零个。", en: "I now have zero mistakes." },
  },
  百: {
    pinyin: "bǎi",
    meaningEn: "one hundred",
    meaningZh: "数字 100，表示一百个。",
    words: [
      ["一百", "one hundred"],
      ["百个", "one hundred items"],
      ["百年", "one hundred years"],
    ],
    sentence: { zh: "我会数到一百。", en: "I can count to one hundred." },
  },
  千: {
    pinyin: "qiān",
    meaningEn: "thousand",
    meaningZh: "数字 1000，表示一千个。",
    words: [
      ["千米", "kilometre"],
      ["一千", "one thousand"],
      ["千字", "one thousand characters"],
    ],
    sentence: { zh: "学校离家一千米。", en: "The school is one kilometre from home." },
  },
  万: {
    pinyin: "wàn",
    meaningEn: "ten thousand",
    meaningZh: "数字 10000，表示很多很多。",
    words: [
      ["一万", "ten thousand"],
      ["万一", "just in case"],
      ["千万", "ten million; many"],
    ],
    sentence: { zh: "一万是很大的数。", en: "Ten thousand is a very big number." },
  },
  个: {
    pinyin: "gè",
    meaningEn: "general measure word",
    meaningZh: "常用量词，可以说“一个人”“三个苹果”。",
    words: [
      ["一个", "one item"],
      ["三个", "three items"],
      ["这个", "this one"],
    ],
    sentence: { zh: "我每天学一个新字。", en: "I learn one new character every day." },
  },
  只: {
    pinyin: "zhī",
    meaningEn: "measure word for animals and some small things",
    meaningZh: "量词，常用来数小动物、船、手等，比如“一只猫”。",
    words: [
      ["一只", "one animal or small item"],
      ["两只", "two animals or small items"],
      ["六只", "six animals or small items"],
    ],
    sentence: { zh: "这里有六只玩具小狗。", en: "There are six toy dogs here." },
  },
  口: {
    pinyin: "kǒu",
    meaningEn: "mouth; opening",
    meaningZh: "嘴巴，也可以表示入口、出口。",
    words: [
      ["开口", "open your mouth; speak"],
      ["门口", "doorway"],
      ["路口", "intersection"],
    ],
    sentence: { zh: "请开口读这个字。", en: "Please open your mouth and read this character." },
  },
  本: {
    pinyin: "běn",
    meaningEn: "book; measure word for books",
    meaningZh: "可以表示书，也可以用来数书，比如“一本书”。",
    words: [
      ["课本", "textbook"],
      ["五本", "five books"],
      ["本子", "notebook"],
    ],
    sentence: { zh: "我有五本中文书。", en: "I have five Chinese books." },
  },
  书: {
    pinyin: "shū",
    meaningEn: "book",
    meaningZh: "有字或图的读物，比如课本、故事书。",
    words: [
      ["书包", "school bag"],
      ["新书", "new book"],
      ["读书", "read books"],
    ],
    sentence: { zh: "我把书放进书包。", en: "I put the book into my school bag." },
  },
  笔: {
    pinyin: "bǐ",
    meaningEn: "pen; pencil; writing brush",
    meaningZh: "写字或画画用的工具。",
    words: [
      ["铅笔", "pencil"],
      ["拿笔", "take a pen"],
      ["笔画", "stroke"],
    ],
    sentence: { zh: "我用铅笔写字。", en: "I write characters with a pencil." },
  },
  友: {
    pinyin: "yǒu",
    meaningEn: "friend; friendly",
    meaningZh: "和朋友、友好、友爱有关。",
    words: [
      ["友爱", "friendly care", "feeling"],
      ["朋友", "friend", "person"],
      ["友好", "friendly", "feeling"],
    ],
  },
  朋: {
    pinyin: "péng",
    meaningEn: "friend",
    meaningZh: "常见于“朋友、小朋友、好朋友”等词语。",
    words: [
      ["朋友", "friend", "person"],
      ["好朋友", "good friend", "person"],
      ["小朋友", "child; little friend", "person"],
    ],
  },
};

for (const override of Object.values(BEGINNER_OVERRIDES)) {
  override.words = override.words.map((entry) => {
    if (!Array.isArray(entry)) return entry;
    const [word, meaningEn, type, exampleZh, exampleEn] = entry;
    return { word, meaningEn, type, exampleZh, exampleEn };
  });
}

const TEACHING_OVERRIDES = {
  呢: {
    pinyin: "ne",
    meaningEn: "question particle used at the end of a sentence",
    meaningZh: "语气词，常放在句尾，用来提问或接话，比如“你呢？”。",
  },
  吧: {
    pinyin: "ba",
    meaningEn: "suggestion particle; okay particle",
    meaningZh: "语气词，常放在句尾，表示建议、商量或同意，比如“走吧”。",
  },
  吗: {
    pinyin: "ma",
    meaningEn: "yes-or-no question particle",
    meaningZh: "语气词，放在句尾，把句子变成问题，比如“好吗？”。",
  },
  们: {
    pinyin: "men",
    meaningEn: "plural marker for people and pronouns",
    meaningZh: "表示复数，常用在“我们、你们、他们”里。",
  },
  的: {
    pinyin: "de",
    meaningEn: "possessive or descriptive particle",
    meaningZh: "助词，常表示“属于谁”或说明特点，比如“我的书”。",
  },
  了: {
    pinyin: "le",
    meaningEn: "particle showing completion or a change",
    meaningZh: "助词，常表示事情完成了，或情况有变化。",
  },
  什: {
    pinyin: "shén",
    meaningEn: "part of 什么, meaning what",
    meaningZh: "常和“么”组成“什么”，用来提问。",
  },
  么: {
    pinyin: "me",
    meaningEn: "part of 什么 and 怎么",
    meaningZh: "常见于“什么、怎么、多么”等词里。",
  },
  都: {
    pinyin: "dōu",
    meaningEn: "all; both",
    meaningZh: "表示全部，比如“我们都对了”。",
  },
  为: {
    pinyin: "wèi",
    meaningEn: "for; because, as in 因为",
    meaningZh: "常见于“因为、为了、为什么”，表示原因或目的。",
  },
  笔: {
    radical: "⺮",
    meaningEn: "pen; pencil; writing brush",
    meaningZh: "写字或画画用的工具。小学识字时常看作竹字头。",
  },
};

const DISALLOWED_TEACHING_WORDS = new Set(["亲朋", "朋辈", "努目", "宠儿", "猫头", "业绩"]);

const EXAMPLE_OVERRIDES = {
  一个: {
    zh: "我每天学一个新字。",
    en: "I learn one new character every day.",
  },
  一天: {
    zh: "下雨的一天，我在家读书。",
    en: "On a rainy day, I read at home.",
  },
  第一: {
    zh: "这本书放在第一排。",
    en: "This book is on the first row.",
  },
  友爱: {
    zh: "同学之间要友爱。",
    en: "Classmates should be kind and caring to one another.",
  },
  朋友: {
    zh: "朋友在操场上等我。",
    en: "My friend is waiting for me on the playground.",
  },
  友好: {
    zh: "新同学说话很友好。",
    en: "The new classmate speaks in a friendly way.",
  },
  好朋友: {
    zh: "周末，我和好朋友一起画画。",
    en: "On the weekend, I draw with my good friend.",
  },
  小朋友: {
    zh: "小朋友排队上车。",
    en: "The children line up to get on the bus.",
  },
  自我: {
    zh: "上台前，我先做自我介绍。",
    en: "Before going on stage, I introduce myself.",
  },
  自行车: {
    zh: "我骑自行车去公园。",
    en: "I ride a bicycle to the park.",
  },
  自己: {
    zh: "我自己整理书包。",
    en: "I pack my school bag by myself.",
  },
  早上: {
    zh: "早上，我听见小鸟唱歌。",
    en: "In the morning, I hear birds singing.",
  },
  早饭: {
    zh: "早饭后，我们去上学。",
    en: "After breakfast, we go to school.",
  },
  早安: {
    zh: "见到老师，我说早安。",
    en: "When I see the teacher, I say good morning.",
  },
  他呢: {
    zh: "我准备好了，他呢？",
    en: "I am ready. What about him?",
  },
  哪呢: {
    zh: "我的铅笔在哪呢？",
    en: "Where is my pencil?",
  },
  是呢: {
    zh: "是呢，我们一起去吧。",
    en: "Yes, let's go together.",
  },
};

Object.assign(EXAMPLE_OVERRIDES, {
  晚上: {
    zh: "晚上，我在家读故事。",
    en: "In the evening, I read stories at home.",
  },
  晚安: {
    zh: "睡觉前，我对妈妈说晚安。",
    en: "Before going to sleep, I say good night to Mum.",
  },
  晚饭: {
    zh: "晚饭后，我们一起散步。",
    en: "After dinner, we take a walk together.",
  },
  来吧: {
    zh: "来吧，我们一起练习。",
    en: "Come on, let's practise together.",
  },
  好吧: {
    zh: "好吧，我再试一次。",
    en: "Okay, I will try once more.",
  },
  走吧: {
    zh: "走吧，公交车来了。",
    en: "Let's go. The bus is here.",
  },
  行走: {
    zh: "小朋友在人行道上行走。",
    en: "The child walks on the footpath.",
  },
  名字: {
    zh: "请在本子上写名字。",
    en: "Please write your name in the notebook.",
  },
  名片: {
    zh: "爸爸把名片放进包里。",
    en: "Dad puts the name card into his bag.",
  },
  有名: {
    zh: "这座公园在附近很有名。",
    en: "This park is well known nearby.",
  },
  千字: {
    zh: "这篇短文大约有千字。",
    en: "This short text has about one thousand characters.",
  },
  写字: {
    zh: "我认真写字。",
    en: "I write characters carefully.",
  },
  公园: {
    zh: "周末，我们去公园玩。",
    en: "On the weekend, we go to the park to play.",
  },
  公交: {
    zh: "下雨天，我坐公交上学。",
    en: "On rainy days, I take public transport to school.",
  },
  公交车: {
    zh: "公交车停在学校门口。",
    en: "The public bus stops at the school gate.",
  },
  上下: {
    zh: "写这个字时，要看清上下结构。",
    en: "When writing this character, look carefully at its top-bottom structure.",
  },
  坐下: {
    zh: "上课了，请坐下。",
    en: "Class has started. Please sit down.",
  },
  放下: {
    zh: "进教室后，我放下书包。",
    en: "After entering the classroom, I put down my school bag.",
  },
  啊呀: {
    zh: "啊呀，我把字写错了。",
    en: "Oh no, I wrote the character incorrectly.",
  },
  好啊: {
    zh: "好啊，我们一起读。",
    en: "Sure, let's read together.",
  },
  是啊: {
    zh: "是啊，我也这样想。",
    en: "Yes, I think so too.",
  },
  因为: {
    zh: "因为下雨，我们在家读书。",
    en: "Because it is raining, we read at home.",
  },
  因果: {
    zh: "老师用故事说明因果。",
    en: "The teacher uses a story to explain cause and effect.",
  },
  原因: {
    zh: "请说一说迟到的原因。",
    en: "Please explain the reason for being late.",
  },
  交给: {
    zh: "请把作业交给老师。",
    en: "Please hand the homework to the teacher.",
  },
  叫做: {
    zh: "这个字叫做“山”。",
    en: "This character is called '山'.",
  },
  会说: {
    zh: "妹妹会说简单的中文。",
    en: "My younger sister can speak simple Chinese.",
  },
  说中文: {
    zh: "在中文课上，我们说中文。",
    en: "In Chinese class, we speak Chinese.",
  },
  听说: {
    zh: "听说练习能帮助发音。",
    en: "Listening and speaking practice helps pronunciation.",
  },
  路口: {
    zh: "过路口时要看红绿灯。",
    en: "When crossing an intersection, look at the traffic lights.",
  },
  走路: {
    zh: "我每天走路去学校。",
    en: "I walk to school every day.",
  },
  马路: {
    zh: "过马路时要注意安全。",
    en: "Be careful when crossing the road.",
  },
  左右: {
    zh: "过马路前，我先看左右。",
    en: "Before crossing the road, I look left and right.",
  },
  左手: {
    zh: "他用左手拿书。",
    en: "He holds the book with his left hand.",
  },
  左边: {
    zh: "书店在学校左边。",
    en: "The bookshop is on the left side of the school.",
  },
  右手: {
    zh: "我用右手写字。",
    en: "I write with my right hand.",
  },
  右边: {
    zh: "公园在车站右边。",
    en: "The park is on the right side of the station.",
  },
  为了: {
    zh: "为了学好中文，我每天练习。",
    en: "To learn Chinese well, I practise every day.",
  },
  为什么: {
    zh: "你为什么喜欢这个故事？",
    en: "Why do you like this story?",
  },
  所有: {
    zh: "所有同学都完成了任务。",
    en: "All classmates finished the task.",
  },
  所以: {
    zh: "我认真练习，所以进步了。",
    en: "I practised carefully, so I improved.",
  },
  厕所: {
    zh: "请问，厕所在那里？",
    en: "Excuse me, where is the toilet?",
  },
  街道: {
    zh: "街道两边有很多商店。",
    en: "There are many shops on both sides of the street.",
  },
  街上: {
    zh: "周末，街上很热闹。",
    en: "On the weekend, the street is lively.",
  },
  街角: {
    zh: "妈妈在街角等我。",
    en: "Mum waits for me at the street corner.",
  },
  读书: {
    zh: "我每天读书二十分钟。",
    en: "I read books for twenty minutes every day.",
  },
  读音: {
    zh: "老师示范这个字的读音。",
    en: "The teacher demonstrates the pronunciation of this character.",
  },
  读者: {
    zh: "这本故事书有很多小读者。",
    en: "This storybook has many young readers.",
  },
  会写: {
    zh: "我会写自己的名字。",
    en: "I can write my own name.",
  },
  拼写: {
    zh: "英文课上，我们练习拼写。",
    en: "In English class, we practise spelling.",
  },
  商店: {
    zh: "商店里有中文书。",
    en: "There are Chinese books in the shop.",
  },
  书店: {
    zh: "周末，我去书店买书。",
    en: "On the weekend, I go to the bookshop to buy books.",
  },
  饭店: {
    zh: "饭店里有热面条。",
    en: "There are hot noodles in the restaurant.",
  },
  前后: {
    zh: "排队时，要看前后。",
    en: "When lining up, look at the front and back.",
  },
  前面: {
    zh: "老师站在教室前面。",
    en: "The teacher stands at the front of the classroom.",
  },
  以前: {
    zh: "上课以前，我先拿出课本。",
    en: "Before class, I take out my textbook first.",
  },
  后面: {
    zh: "妹妹坐在我后面。",
    en: "My younger sister sits behind me.",
  },
  以后: {
    zh: "下课以后，我去图书馆。",
    en: "After class, I go to the library.",
  },
  可能: {
    zh: "明天可能会下雨。",
    en: "It may rain tomorrow.",
  },
  可以: {
    zh: "你可以再试一次。",
    en: "You can try once more.",
  },
  可爱: {
    zh: "这只小猫很可爱。",
    en: "This kitten is very cute.",
  },
  学院: {
    zh: "姐姐在音乐学院学习。",
    en: "My older sister studies at a music college.",
  },
  医院: {
    zh: "爸爸带我去医院。",
    en: "Dad takes me to the hospital.",
  },
  院子: {
    zh: "院子里有一棵树。",
    en: "There is a tree in the yard.",
  },
  听见: {
    zh: "我听见窗外有鸟叫。",
    en: "I hear birds calling outside the window.",
  },
  好听: {
    zh: "这首中文歌很好听。",
    en: "This Chinese song sounds very nice.",
  },
  看见: {
    zh: "我看见黑板上的新字。",
    en: "I see the new character on the board.",
  },
  眼看: {
    zh: "眼看要下雨了，我们快回家。",
    en: "It looks like it is about to rain, so we hurry home.",
  },
  看书: {
    zh: "晚上，我在房间里看书。",
    en: "In the evening, I read a book in my room.",
  },
  地图: {
    zh: "地图上有澳洲。",
    en: "Australia is on the map.",
  },
  图画: {
    zh: "图画里有山水。",
    en: "There are mountains and water in the picture.",
  },
  里面: {
    zh: "书包里面有课本。",
    en: "There is a textbook inside the school bag.",
  },
  哪里: {
    zh: "学校在哪里？",
    en: "Where is the school?",
  },
  里外: {
    zh: "我把盒子里外都擦干净。",
    en: "I wipe the inside and outside of the box clean.",
  },
  再见: {
    zh: "下课后，我们说再见。",
    en: "After class, we say goodbye.",
  },
  再来: {
    zh: "这题没答对，我想再来一次。",
    en: "I did not answer this question correctly, so I want to try again.",
  },
  再次: {
    zh: "老师请我再次读一遍。",
    en: "The teacher asks me to read it once again.",
  },
  外国: {
    zh: "他有一个外国朋友。",
    en: "He has a foreign friend.",
  },
  外面: {
    zh: "外面有风，我们穿上外套。",
    en: "It is windy outside, so we put on coats.",
  },
  中国: {
    zh: "中文来自中国。",
    en: "Chinese comes from China.",
  },
  英国: {
    zh: "英国在地图的西边。",
    en: "The United Kingdom is on the western side of the map.",
  },
  笔画: {
    zh: "汉字有不同的笔画。",
    en: "Chinese characters have different strokes.",
  },
  画笔: {
    zh: "她用画笔画花。",
    en: "She uses a paintbrush to draw flowers.",
  },
  零个: {
    zh: "今天我的错题是零个。",
    en: "Today I have zero wrong answers.",
  },
  零度: {
    zh: "零度时，水会结冰。",
    en: "At zero degrees, water can freeze.",
  },
  零食: {
    zh: "下课后，我吃一点零食。",
    en: "After class, I eat a little snack.",
  },
  唱歌: {
    zh: "音乐课上，我们一起唱歌。",
    en: "In music class, we sing together.",
  },
  合唱: {
    zh: "全班一起合唱生日歌。",
    en: "The whole class sings the birthday song together.",
  },
  唱片: {
    zh: "爷爷家里有旧唱片。",
    en: "Grandpa has old records at home.",
  },
  短文: {
    zh: "这篇短文很容易读。",
    en: "This short text is easy to read.",
  },
  中文: {
    zh: "我学习中文。",
    en: "I study Chinese.",
  },
  英文: {
    zh: "英文可以帮助理解。",
    en: "English can help with understanding.",
  },
  英语: {
    zh: "她每天练习英语。",
    en: "She practises English every day.",
  },
  请坐: {
    zh: "老师微笑着说：请坐。",
    en: "The teacher smiles and says: please sit.",
  },
  请进: {
    zh: "听到敲门声，老师说请进。",
    en: "Hearing a knock, the teacher says please come in.",
  },
  请问: {
    zh: "请问，这个字怎么读？",
    en: "Excuse me, how do you read this character?",
  },
  买东西: {
    zh: "周末，我和妈妈去买东西。",
    en: "On the weekend, I go shopping with Mum.",
  },
  卖东西: {
    zh: "商店里的人在卖东西。",
    en: "The people in the shop are selling things.",
  },
  东西: {
    zh: "请把东西放进书包。",
    en: "Please put the things into the school bag.",
  },
  谢礼: {
    zh: "这束花是一份谢礼。",
    en: "This bunch of flowers is a thank-you gift.",
  },
  谢谢: {
    zh: "谢谢你帮我拿书。",
    en: "Thank you for helping me carry the book.",
  },
  感谢: {
    zh: "我感谢老师的帮助。",
    en: "I thank the teacher for the help.",
  },
  一百: {
    zh: "我会数到一百。",
    en: "I can count to one hundred.",
  },
  百个: {
    zh: "盒子里有百个小贴纸。",
    en: "There are one hundred small stickers in the box.",
  },
  百年: {
    zh: "这棵大树已经有百年。",
    en: "This big tree is already one hundred years old.",
  },
  跳高: {
    zh: "体育课上，他练习跳高。",
    en: "In PE class, he practises high jump.",
  },
  跳舞: {
    zh: "音乐响起后，妹妹开始跳舞。",
    en: "After the music starts, my younger sister begins to dance.",
  },
  跳远: {
    zh: "哥哥在操场上练习跳远。",
    en: "My older brother practises long jump on the playground.",
  },
  好成绩: {
    zh: "认真复习能得到好成绩。",
    en: "Careful revision can lead to a good result.",
  },
  花猫: {
    zh: "花猫坐在窗边晒太阳。",
    en: "The tabby cat sits by the window in the sun.",
  },
  宠物猫: {
    zh: "姐姐照顾家里的宠物猫。",
    en: "My older sister takes care of the pet cat at home.",
  },
  宠物狗: {
    zh: "弟弟带宠物狗去散步。",
    en: "My younger brother takes the pet dog for a walk.",
  },
  努努嘴: {
    zh: "妹妹努努嘴，指向门口。",
    en: "My younger sister pouts and points to the door.",
  },
});

function cleanEnglishMeaning(value) {
  return String(value || "it")
    .split(";")[0]
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function capitalizeEnglish(value) {
  const text = String(value || "it").trim();
  return text ? `${text[0].toUpperCase()}${text.slice(1)}` : "It";
}

function sentenceEnglishMeaning(value) {
  return cleanEnglishMeaning(value)
    .replace(/\bchina\b/g, "China")
    .replace(/\bchinese\b/g, "Chinese")
    .replace(/\baustralia\b/g, "Australia")
    .replace(/\baustralian\b/g, "Australian")
    .replace(/\bbrazil\b/g, "Brazil")
    .replace(/\benglish\b/g, "English")
    .replace(/\bpe\b/g, "PE");
}

function verbBase(value) {
  const text = sentenceEnglishMeaning(value).replace(/^to\s+/, "").replace(/^can\s+/, "");
  const replacements = {
    "be called": "use this name",
    "do not have": "say that I do not have it",
    "is not": "say that it is not",
    know: "know the answer",
    recognise: "recognise it",
    confirm: "check it",
    want: "ask for it",
    wait: "wait",
    "help people": "help others",
    "go in": "go inside",
    "come out": "come out",
    "go out": "go out",
    "go back": "go back",
    walk: "walk",
    jog: "jog",
    run: "run",
    "buy things": "go shopping",
    "sell things": "sell things",
    "eat a meal": "eat",
    "drink water": "drink water",
  };
  return replacements[text] || text;
}

function gerundPhrase(value) {
  const base = verbBase(value);
  const parts = base.split(" ");
  const first = parts[0];
  const irregular = {
    be: "being",
    do: "doing",
    go: "going",
    come: "coming",
    run: "running",
    swim: "swimming",
    see: "seeing",
    tie: "tying",
    write: "writing",
    make: "making",
    take: "taking",
    have: "having",
    use: "using",
    put: "putting",
    sit: "sitting",
    get: "getting",
  };
  const gerund = irregular[first] || (first.endsWith("e") ? `${first.slice(0, -1)}ing` : `${first}ing`);
  return [gerund, ...parts.slice(1)].join(" ");
}

function withArticle(value) {
  const text = sentenceEnglishMeaning(value);
  if (/^(a|an|the|my|some|one|two|three|four|five|six|seven|eight|nine|ten)\b/i.test(text)) return text;
  if (/s$|children|people|homework|Chinese|English|PE|public transport|rice|milk|water|tea|knowledge|study|practice|music/i.test(text)) {
    return text;
  }
  return /^[aeiou]/i.test(text) ? `an ${text}` : `a ${text}`;
}

function hashWord(word) {
  return [...word].reduce((sum, char) => sum + char.codePointAt(0), 0);
}

function chooseTemplate(word, templates) {
  return templates[hashWord(word) % templates.length];
}

const CATEGORY_EXAMPLES = {
  animal: [
    {
      zh: (word) => `图画里有${word}。`,
      en: (meaning) => `There is ${meaning} in the picture.`,
    },
    {
      zh: (word) => `公园里，我看见${word}。`,
      en: (meaning) => `I see ${meaning} in the park.`,
    },
    {
      zh: (word) => `${word}在草地上玩。`,
      en: (meaning) => `The ${meaning} plays on the grass.`,
    },
  ],
  audio: [
    {
      zh: (word) => `我听见${word}。`,
      en: (meaning) => `I hear ${meaning}.`,
    },
    {
      zh: (word) => `${word}从窗外传来。`,
      en: (meaning) => `The sound of ${meaning} comes from outside the window.`,
    },
  ],
  body: [
    {
      zh: (word) => `运动后，我活动${word}。`,
      en: (meaning) => `After exercise, I move my ${meaning}.`,
    },
    {
      zh: (word) => `画人像时，她先画${word}。`,
      en: (meaning) => `When drawing a portrait, she draws the ${meaning} first.`,
    },
    {
      zh: (word) => `医生检查了我的${word}。`,
      en: (meaning) => `The doctor checked my ${meaning}.`,
    },
  ],
  clothes: [
    {
      zh: (word) => `晚上，我换上${word}。`,
      en: (meaning) => `At night, I put on ${meaning}.`,
    },
  ],
  colour: [
    {
      zh: (word) => `画画时，我用了${word}。`,
      en: (meaning) => `When drawing, I use ${meaning}.`,
    },
    {
      zh: (word) => `老师让我们找出${word}。`,
      en: (meaning) => `The teacher asks us to find ${meaning}.`,
    },
    {
      zh: (word) => `图画里有${word}。`,
      en: (meaning) => `There is ${meaning} in the picture.`,
    },
  ],
  direction: [
    {
      zh: (word) => `老师用图说明${word}。`,
      en: (meaning) => `The teacher uses a diagram to explain ${meaning}.`,
    },
    {
      zh: (word) => `请指出${word}的位置。`,
      en: (meaning) => `Please point out the position of ${meaning}.`,
    },
    {
      zh: (word) => `地图上标出了${word}。`,
      en: (meaning) => `The map marks ${meaning}.`,
    },
  ],
  family: [
    {
      zh: (word) => `这节课讲到${word}。`,
      en: (meaning) => `This lesson talks about ${meaning}.`,
    },
    {
      zh: (word) => `故事里提到${word}。`,
      en: (meaning) => `The story mentions ${meaning}.`,
    },
    {
      zh: (word) => `老师请大家说说${word}。`,
      en: (meaning) => `The teacher asks everyone to talk about ${meaning}.`,
    },
  ],
  feedback: [
    {
      zh: (word) => `完成任务后，我得到${word}。`,
      en: (meaning) => `After finishing the task, I receive ${meaning}.`,
    },
    {
      zh: (word) => `老师给了我${word}。`,
      en: (meaning) => `The teacher gives me ${meaning}.`,
    },
    {
      zh: (word) => `${word}让我更想练习。`,
      en: (meaning) => `${meaning} makes me want to practise more.`,
    },
  ],
  feeling: [
    {
      zh: (word) => `故事里表现出${word}。`,
      en: (meaning) => `The story shows ${meaning}.`,
    },
    {
      zh: (word) => `老师讲到${word}。`,
      en: (meaning) => `The teacher talks about ${meaning}.`,
    },
    {
      zh: (word) => `这句话里有${word}的意思。`,
      en: (meaning) => `This sentence has the meaning of ${meaning}.`,
    },
  ],
  food: [
    {
      zh: (word) => `午饭时，我吃了${word}。`,
      en: (meaning) => `At lunch, I eat ${meaning}.`,
    },
    {
      zh: (word) => `桌上放着${word}。`,
      en: (meaning) => `There is ${meaning} on the table.`,
    },
    {
      zh: (word) => `我想尝一尝${word}。`,
      en: (meaning) => `I want to try ${meaning}.`,
    },
  ],
  greeting: [
    {
      zh: (word) => `进教室时，我说${word}。`,
      en: (meaning) => `When I enter the classroom, I say ${meaning}.`,
    },
    {
      zh: (word) => `${word}让新同学笑了。`,
      en: (meaning) => `${meaning} makes the new classmate smile.`,
    },
  ],
  measure: [
    {
      zh: (word) => `树上有${word}小鸟。`,
      en: (meaning) => `There are ${meaning} birds in the tree.`,
    },
    {
      zh: (word) => `桌上放着${word}铅笔。`,
      en: (meaning) => `There are ${meaning} pencils on the table.`,
    },
  ],
  money: [
    {
      zh: (word) => `这个贴纸要${word}。`,
      en: (meaning) => `This sticker costs ${meaning}.`,
    },
  ],
  nature: [
    {
      zh: (word) => `窗外有${word}。`,
      en: (meaning) => `There is ${meaning} outside the window.`,
    },
    {
      zh: (word) => `图画里画着${word}。`,
      en: (meaning) => `The picture shows ${meaning}.`,
    },
    {
      zh: (word) => `我们在课文里读到${word}。`,
      en: (meaning) => `We read about ${meaning} in the lesson text.`,
    },
  ],
  noun: [
    {
      zh: (word) => `课文里提到${word}。`,
      en: (meaning) => `The lesson text mentions ${meaning}.`,
    },
    {
      zh: (word) => `老师讲了${word}。`,
      en: (meaning) => `The teacher talks about ${meaning}.`,
    },
    {
      zh: (word) => `故事里出现了${word}。`,
      en: (meaning) => `${meaning} appears in the story.`,
    },
  ],
  person: [
    {
      zh: (word) => `课文里提到${word}。`,
      en: (meaning) => `The lesson text mentions ${meaning}.`,
    },
    {
      zh: (word) => `老师讲了${word}。`,
      en: (meaning) => `The teacher talks about ${meaning}.`,
    },
    {
      zh: (word) => `故事里出现了${word}。`,
      en: (meaning) => `${meaning} appears in the story.`,
    },
  ],
  photo: [
    {
      zh: (word) => `毕业那天，我们一起${word}。`,
      en: (meaning) => `On graduation day, we take ${meaning} together.`,
    },
  ],
  place: [
    {
      zh: (word) => `地图上可以找到${word}。`,
      en: (meaning) => `You can find ${meaning} on the map.`,
    },
    {
      zh: (word) => `课文里提到${word}。`,
      en: (meaning) => `The lesson text mentions ${meaning}.`,
    },
    {
      zh: (word) => `我们经过${word}。`,
      en: (meaning) => `We pass by ${meaning}.`,
    },
  ],
  play: [
    {
      zh: (word) => `下课后，我们一起玩${word}。`,
      en: (meaning) => `After class, we play ${meaning} together.`,
    },
  ],
  question: [
    {
      zh: (word) => `这道题问${word}。`,
      en: (meaning) => `This question asks ${meaning}.`,
    },
    {
      zh: (word) => `老师解释${word}的用法。`,
      en: (meaning) => `The teacher explains how to use ${meaning}.`,
    },
    {
      zh: (word) => `课文里有${word}。`,
      en: (meaning) => `The lesson text has ${meaning}.`,
    },
  ],
  safety: [
    {
      zh: (word) => `过马路时要${word}。`,
      en: (meaning) => `When crossing the road, be ${meaning}.`,
    },
  ],
  school: [
    {
      zh: (word) => `上课时，我们用到${word}。`,
      en: (meaning) => `In class, we use ${meaning}.`,
    },
    {
      zh: (word) => `今天的练习和${word}有关。`,
      en: (meaning) => `Today's practice is about ${meaning}.`,
    },
    {
      zh: (word) => `老师讲解${word}。`,
      en: (meaning) => `The teacher explains ${meaning}.`,
    },
  ],
  sport: [
    {
      zh: (word) => `体育课上，我们练习${word}。`,
      en: (meaning) => `In PE class, we practise ${meaning}.`,
    },
    {
      zh: (word) => `放学后，他去参加${word}。`,
      en: (meaning) => `After school, he goes to do ${meaning}.`,
    },
  ],
  story: [
    {
      zh: (word) => `睡觉前，妈妈讲${word}。`,
      en: (meaning) => `Before bedtime, Mum tells ${meaning}.`,
    },
  ],
  tech: [
    {
      zh: (word) => `爸爸用${word}联系老师。`,
      en: (meaning) => `Dad uses ${meaning} to contact the teacher.`,
    },
  ],
  time: [
    {
      zh: (word) => `老师在日历上指出${word}。`,
      en: (meaning) => `The teacher points out ${meaning} on the calendar.`,
    },
    {
      zh: (word) => `课文里提到${word}。`,
      en: (meaning) => `The lesson text mentions ${meaning}.`,
    },
    {
      zh: (word) => `我们用${word}安排学习。`,
      en: (meaning) => `We use ${meaning} to plan study.`,
    },
  ],
  toy: [
    {
      zh: (word) => `弟弟喜欢玩${word}。`,
      en: (meaning) => `My younger brother likes playing with ${meaning}.`,
    },
  ],
  transport: [
    {
      zh: (word) => `课文里提到${word}。`,
      en: (meaning) => `The lesson text mentions ${meaning}.`,
    },
    {
      zh: (word) => `出门时，我们会看到${word}。`,
      en: (meaning) => `When going out, we can see ${meaning}.`,
    },
    {
      zh: (word) => `地图上标出了${word}。`,
      en: (meaning) => `The map marks ${meaning}.`,
    },
  ],
  verb: [
    {
      zh: (word) => `老师示范${word}这个动作。`,
      en: (meaning) => `The teacher demonstrates the action ${meaning}.`,
    },
    {
      zh: (word) => `练习时，我们用到${word}。`,
      en: (meaning) => `During practice, we use ${meaning}.`,
    },
    {
      zh: (word) => `故事里有人${word}。`,
      en: (meaning) => `Someone in the story ${meaning}.`,
    },
  ],
  weather: [
    {
      zh: (word) => `今天有${word}，出门要穿暖。`,
      en: (meaning) => `There is ${meaning} today, so wear warm clothes when going out.`,
    },
  ],
};

CATEGORY_EXAMPLES.adjective = CATEGORY_EXAMPLES.noun;
CATEGORY_EXAMPLES.adj = CATEGORY_EXAMPLES.noun;
CATEGORY_EXAMPLES.adverb = CATEGORY_EXAMPLES.verb;
CATEGORY_EXAMPLES.art = CATEGORY_EXAMPLES.school;
CATEGORY_EXAMPLES.common = CATEGORY_EXAMPLES.noun;
CATEGORY_EXAMPLES.music = CATEGORY_EXAMPLES.sport;
CATEGORY_EXAMPLES.number = [
  {
    zh: (word) => `老师在黑板上写下${word}。`,
    en: (meaning) => `The teacher writes ${meaning} on the board.`,
  },
  {
    zh: (word) => `请把${word}圈出来。`,
    en: (meaning) => `Please circle ${meaning}.`,
  },
  {
    zh: (word) => `数学题里有${word}。`,
    en: (meaning) => `There is ${meaning} in the math question.`,
  },
];
CATEGORY_EXAMPLES.phrase = [
  {
    zh: (word) => `老师解释${word}的意思。`,
    en: (meaning) => `The teacher explains the meaning of ${meaning}.`,
  },
  {
    zh: (word) => `课文里有${word}这个说法。`,
    en: (meaning) => `The lesson text has the expression ${meaning}.`,
  },
  {
    zh: (word) => `这句话里用到了${word}。`,
    en: (meaning) => `This sentence uses ${meaning}.`,
  },
];

function specialExample(item) {
  const { word } = item;
  if (/^第[一二三四五六七八九十]$/.test(word)) {
    return {
      zh: `她排在${word}。`,
      en: `She is in ${cleanEnglishMeaning(item.en)} place.`,
    };
  }
  if (/^[一二三四五六七八九十]月$/.test(word)) {
    const monthNames = {
      一月: "January",
      二月: "February",
      三月: "March",
      四月: "April",
      五月: "May",
      六月: "June",
      七月: "July",
      八月: "August",
      九月: "September",
      十月: "October",
    };
    return {
      zh: `${word}有学校活动。`,
      en: `There is a school activity in ${monthNames[word] || item.en}.`,
    };
  }
  if (/^[一二三四五六七八九十]点$/.test(word)) {
    return {
      zh: `我们${word}开始上课。`,
      en: `We start class at ${cleanEnglishMeaning(item.en)}.`,
    };
  }
  if (/^[一二三四五六七八九十]岁$/.test(word)) {
    return {
      zh: `妹妹今年${word}。`,
      en: `My younger sister is ${cleanEnglishMeaning(item.en)} this year.`,
    };
  }
  if (/^[一二三四五六七八九十百千万两半]+个$/.test(word)) {
    const count = {
      一个: "one",
      三个: "three",
      四个: "four",
      五个: "five",
      六个: "six",
      七个: "seven",
      八个: "eight",
      九个: "nine",
      十个: "ten",
      百个: "one hundred",
    }[word] || cleanEnglishMeaning(item.en);
    return {
      zh: `盒子里有${word}苹果。`,
      en: `There are ${count} apples in the box.`,
    };
  }
  if (/^[一二三四五六七八九十]+本$/.test(word)) {
    const count = {
      一本: "one",
      五本: "five",
      十本: "ten",
    }[word] || cleanEnglishMeaning(item.en);
    return {
      zh: `书架上有${word}书。`,
      en: `There are ${count} books on the shelf.`,
    };
  }
  if (/^[一二三四五六七八九十两六]+只$/.test(word)) {
    const count = {
      一只: "one",
      两只: "two",
      六只: "six",
    }[word] || cleanEnglishMeaning(item.en);
    return {
      zh: `草地上有${word}小鸟。`,
      en: `${count === "one" ? "There is" : "There are"} ${count} birds on the grass.`,
    };
  }
  if (/^[你他她它我]的$/.test(word) || word === "谁的") {
    return {
      zh: `这是${word}书包吗？`,
      en: `Is this ${cleanEnglishMeaning(item.en)} school bag?`,
    };
  }
  if (word.endsWith("吗")) {
    const questionExamples = {
      好吗: {
        zh: "我们一起练习，好吗？",
        en: "Shall we practise together?",
      },
      行吗: {
        zh: "这样做行吗？",
        en: "Is it okay to do it this way?",
      },
      是吗: {
        zh: "这是你的书，是吗？",
        en: "This is your book, right?",
      },
    };
    if (questionExamples[word]) return questionExamples[word];
    return {
      zh: `老师问：“${word}？”`,
      en: `The teacher asks, "${word}?"`,
    };
  }
  if (word.endsWith("呢")) {
    const questionExamples = {
      他呢: {
        zh: "我准备好了，他呢？",
        en: "I am ready. What about him?",
      },
      哪呢: {
        zh: "我的铅笔在哪呢？",
        en: "Where is my pencil?",
      },
      是呢: {
        zh: "是呢，我们一起去吧。",
        en: "Yes, let's go together.",
      },
    };
    if (questionExamples[word]) return questionExamples[word];
    return {
      zh: `我问同学：“${word}？”`,
      en: `I ask my classmate, "${word}?"`,
    };
  }
  if (word.endsWith("吧")) {
    const phraseExamples = {
      来吧: {
        zh: "来吧，我们一起练习。",
        en: "Come on, let's practise together.",
      },
      好吧: {
        zh: "好吧，我再试一次。",
        en: "Okay, I will try once more.",
      },
      走吧: {
        zh: "走吧，公交车来了。",
        en: "Let's go. The bus is here.",
      },
    };
    if (phraseExamples[word]) return phraseExamples[word];
    return {
      zh: `老师说：“${word}。”`,
      en: `The teacher says, "${word}."`,
    };
  }
  return null;
}

function normalizeExample(item) {
  const explicit = EXAMPLE_OVERRIDES[item.word];
  if (explicit) return explicit;
  if (item.exampleZh && item.exampleEn) {
    return { zh: item.exampleZh, en: item.exampleEn };
  }
  if (item.example && item.exampleEn) {
    return { zh: item.example, en: item.exampleEn };
  }
  const special = specialExample(item);
  if (special) return special;
  const meaning = sentenceEnglishMeaning(item.en || item.meaningEn);
  const templates = CATEGORY_EXAMPLES[item.type] || CATEGORY_EXAMPLES.common;
  const template = chooseTemplate(item.word, templates);
  return {
    zh: template.zh(item.word),
    en: template.en(meaning),
  };
}

function normalizeWord(item) {
  const example = normalizeExample(item);
  return {
    word: item.word,
    en: item.en || item.meaningEn,
    type: item.type || "common",
    exampleZh: example.zh,
    exampleEn: example.en,
  };
}

function allWordCandidates() {
  const candidates = [];
  const seen = new Set();
  [...WORD_BANK, ...EXTRA_WORD_BANK, ...COVERAGE_WORD_BANK].map(normalizeWord).forEach((item) => {
    if (!item.word || !item.en || seen.has(item.word) || DISALLOWED_TEACHING_WORDS.has(item.word)) return;
    seen.add(item.word);
    candidates.push(item);
  });
  return candidates;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function xinhuaPageUrl(char) {
  const path = [...new TextEncoder().encode(char)]
    .map((byte) => `hwx${byte.toString(16).toUpperCase().padStart(2, "0")}`)
    .join("");
  return `${SOURCES.onlineXinhuaBase}${path}.html`;
}

function decodeHtmlEntities(value = "") {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };
  return String(value).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    const key = entity.toLowerCase();
    if (key.startsWith("#x")) return String.fromCodePoint(Number.parseInt(key.slice(2), 16));
    if (key.startsWith("#")) return String.fromCodePoint(Number.parseInt(key.slice(1), 10));
    return named[key] ?? match;
  });
}

function cleanLine(value = "") {
  return decodeHtmlEntities(value)
    .replace(/\u00a0/g, " ")
    .replace(/\s+([,.;:，。；：、！？)）])/g, "$1")
    .replace(/([(（])\s+/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlToLines(html = "") {
  const text = String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|div|h\d|li|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  return decodeHtmlEntities(text)
    .split(/\n+/)
    .map(cleanLine)
    .filter(Boolean);
}

function htmlToText(html = "") {
  return htmlToLines(html).join(" ");
}

function sectionHtml(html, title) {
  const heading = new RegExp(`<h1>\\s*${escapeRegExp(title)}\\s*<\\/h1>`, "i").exec(html);
  if (!heading) return "";
  const rest = html.slice(heading.index + heading[0].length);
  const next = rest.search(/<div\s+class=["']sub_label["']/i);
  return next >= 0 ? rest.slice(0, next) : rest;
}

function cleanEnglishGloss(value = "") {
  return cleanLine(value)
    .replace(/^◎\s*/, "")
    .replace(/[；]+/g, "; ")
    .replace(/\s*;\s*/g, "; ")
    .replace(/;+\s*$/g, "")
    .slice(0, 140)
    .trim();
}

function normalizePhraseWord(value = "") {
  const word = cleanLine(value)
    .replace(/^◎\s*/, "")
    .split(/[，,、]/)[0]
    .replace(/[()（）].*$/, "")
    .trim();
  return /^[\u3400-\u9fff]{2,5}$/u.test(word) ? word : "";
}

function isPinyinLine(value = "") {
  const line = cleanLine(value);
  return /[a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜńňǹḿ]/.test(line) &&
    /^[a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜńňǹḿêɡ\s'’·,\-－]+$/.test(line);
}

function isPhraseStart(lines, index, char) {
  const word = normalizePhraseWord(lines[index]);
  return Boolean(word && word.includes(char) && isPinyinLine(lines[index + 1] || ""));
}

function cleanChineseDefinition(value = "") {
  return cleanLine(value)
    .replace(/^◎\s*/, "")
    .replace(/^[（(]?\d+[）)]\s*/, "")
    .replace(/\[[^\]]+\]\s*/g, "")
    .replace(/^[:：]\s*/, "")
    .trim();
}

function isUsefulExampleLine(line, word, char, definitionZh) {
  const cleaned = cleanChineseDefinition(line);
  if (!cleaned || cleaned === definitionZh) return false;
  if (!cleaned.includes(word)) return false;
  if (/^\d+$/.test(cleaned) || isPinyinLine(cleaned) || /\[[^\]]+\]/.test(cleaned)) return false;
  if (/^(又如|如|见|同|比喻|指|形容|用来|用于|表示|也作|泛指)/.test(cleaned)) return false;
  return cleaned.length >= Math.min(4, word.length) && cleaned.length <= 48;
}

function parseXinhuaMorePhrases(more = "", char) {
  const lines = String(more).split(/\n+/).map(cleanLine).filter(Boolean);
  const phrases = [];

  for (let index = 0; index < lines.length - 1; index += 1) {
    if (!isPhraseStart(lines, index, char)) continue;
    const word = normalizePhraseWord(lines[index]);
    const pinyin = cleanLine(lines[index + 1]);
    const block = [];
    let next = index + 2;
    while (next < lines.length && !isPhraseStart(lines, next, char) && block.length < 10) {
      block.push(lines[next]);
      next += 1;
    }

    const englishMatch = block.join(" ").match(/\[([^\]]*[A-Za-z][^\]]*)\]/);
    const meaningEn = englishMatch ? cleanEnglishGloss(englishMatch[1]) : "";
    const definitionZh =
      block
        .map(cleanChineseDefinition)
        .find((line) => line && !/^\d+$/.test(line) && !isPinyinLine(line) && !/^[A-Za-z\s,;.'’-]+$/.test(line)) || "";
    const exampleZh =
      block.map(cleanChineseDefinition).find((line) => isUsefulExampleLine(line, word, char, definitionZh)) || "";

    phrases.push({ word, pinyin, meaningEn, definitionZh, exampleZh });
    index = next - 1;
  }

  return phrases;
}

function parseXinhuaMoreEnglish(more = "") {
  const lines = String(more).split(/\n+/).map(cleanLine).filter(Boolean);
  const line = lines.slice(0, 4).find((item) => /[A-Za-z]/.test(item) && !item.includes("部首") && !isPinyinLine(item));
  return line ? cleanEnglishGloss(line) : "";
}

function parseOnlineXinhuaPhrases(html = "", char) {
  const groupHtml = sectionHtml(html, "常用词组");
  const phrases = [];
  const pattern =
    /<p>\s*◎\s*<strong>([\s\S]*?)<\/strong>\s*<span[^>]*class=["']cpinyin["'][^>]*>([\s\S]*?)<\/span>\s*<\/p>\s*<p[^>]*class=["']pgroup["'][^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = pattern.exec(groupHtml))) {
    const word = normalizePhraseWord(htmlToText(match[1]));
    if (!word || !word.includes(char)) continue;
    const lines = htmlToLines(match[3]);
    const definitionZh = lines.map(cleanChineseDefinition).find(Boolean) || "";
    const exampleZh = lines.map(cleanChineseDefinition).find((line) => isUsefulExampleLine(line, word, char, definitionZh)) || "";
    phrases.push({
      word,
      pinyin: cleanLine(htmlToText(match[2])),
      definitionZh,
      exampleZh,
    });
  }
  return phrases;
}

function parseOnlineXinhuaPage(html = "", char, url = "") {
  const basicDefinitions = htmlToLines(sectionHtml(html, "基本字义解释"))
    .filter((line) => line.startsWith("◎"))
    .map(cleanChineseDefinition)
    .filter(Boolean);
  const english =
    htmlToLines(sectionHtml(html, "英文翻译"))
      .map(cleanEnglishGloss)
      .find((line) => /[A-Za-z]/.test(line)) || "";
  return {
    url,
    basicDefinitions,
    english,
    phrases: parseOnlineXinhuaPhrases(html, char),
  };
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function fetchOnlineXinhuaPages(chars) {
  const pairs = await mapLimit(chars, ONLINE_XINHUA_CONCURRENCY, async (char) => {
    const url = xinhuaPageUrl(char);
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(ONLINE_XINHUA_TIMEOUT_MS) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return [char, parseOnlineXinhuaPage(await response.text(), char, url)];
    } catch (error) {
      console.warn(`Warning: online Xinhua page unavailable for ${char}: ${error.message}`);
      return [char, { url, basicDefinitions: [], english: "", phrases: [] }];
    }
  });
  return new Map(pairs);
}

function mergePhraseSources(...sources) {
  const map = new Map();
  sources.flat().forEach((phrase) => {
    if (!phrase?.word) return;
    const current = map.get(phrase.word) || { word: phrase.word };
    map.set(phrase.word, {
      ...current,
      ...Object.fromEntries(Object.entries(phrase).filter(([, value]) => value)),
    });
  });
  return map;
}

function fallbackWordSentence(word) {
  return {
    zh: `我会用“${word}”造句。`,
    en: `I can make a sentence with "${word}".`,
  };
}

function dictionarySentenceFor(word, phrase) {
  if (phrase?.exampleZh) {
    return {
      zh: phrase.exampleZh,
      en: phrase.meaningEn ? `${word}: ${phrase.meaningEn}` : fallbackWordSentence(word).en,
    };
  }
  return fallbackWordSentence(word);
}

function dictionaryWordRows(char, fallbackWords, phraseMap) {
  const selected = [];
  const seen = new Set();

  function add(word, fallbackMeaning = "", fallbackSentence = null, itemType = "common") {
    if (!word || seen.has(word) || !word.includes(char)) return;
    const phrase = phraseMap.get(word);
    const meaningEn = fallbackMeaning || phrase?.meaningEn;
    if (!meaningEn) return;
    seen.add(word);
    const sentence = phrase?.exampleZh
      ? dictionarySentenceFor(word, { ...phrase, meaningEn })
      : fallbackSentence || fallbackWordSentence(word);
    selected.push({
      word,
      meaningEn: cleanEnglishGloss(meaningEn),
      type: itemType || phrase?.type || "common",
      sentence,
    });
  }

  fallbackWords.forEach((item) =>
    add(item.word, item.en, { zh: item.exampleZh, en: item.exampleEn }, item.type)
  );

  [...phraseMap.values()]
    .filter((phrase) => phrase.meaningEn)
    .sort((a, b) => a.word.length - b.word.length)
    .forEach((phrase) => add(phrase.word, phrase.meaningEn));

  return selected.slice(0, 3);
}

function compactMeaningZh(definitions = [], words = []) {
  const definition = definitions.find((line) => line && !/^姓[。.]?$/.test(line)) || "";
  if (definition) {
    const firstSentence = definition.split(/(?<=。)/u).find(Boolean) || definition;
    return firstSentence.length > 110 ? `${firstSentence.slice(0, 108)}…` : firstSentence;
  }
  return `常用汉字，常见于“${words[0]?.word}、${words[1]?.word}、${words[2]?.word}”等词语。`;
}

const WEAK_SENTENCE_ZH =
  /^(课文里提到|今天的练习和|老师讲了|老师讲解|故事里出现了|老师讲到|这句话里有|故事里表现出|出门时，我们会看到|我会用|老师解释.*的意思|课文里有.*这个说法|老师在日历上指出|我们用.*安排学习|老师用图说明|请指出.*的位置|地图上标出了|上课时，我们用到|练习时，我们用到|故事里有人|今天的故事里有|这张图里有|课堂上，老师写下|我在课后复习|同学们一起读|老师用一个例子说明|老师给了我|我在本子上写|上课时，我读到|我在句子里用到了|老师请我读出|学习“.+”字时，我再读|请你先|公园里，我看见|操场上有一位(自我|我们|你们|他们|你的)|我认识这位(自我|我们)|数学题里有|完成任务后，我得到(努力|等级|认真|成长|全对)|中文课上，我们学习(纸张|同桌)|老师用图解释(早安|晚安|谢礼)|桌上放着(买菜|卖菜|爱吃|喝茶|喝奶|吃水果)|午饭时，我吃了(做饭|热水|茶水|卖菜)|我想尝一尝(吃水果|喝奶)|老师示范喝水这个动作|草地上有一只牛羊|老师用.+帮助我们学习|.+让我更想练习|运动后，我活动(努嘴|体力|头发)|画人像时，她先画(体力|头上|努嘴)|我会(会说|动作|运动|认识|给你)|我每天练习(会说|动作|运动|认识|看见|睡觉|穿过|眼看|给你|想要|能够|错过))/;

const WEAK_SENTENCE_EN =
  /^(The lesson text mentions|Today's practice is about|The teacher talks about|The teacher explains|The story shows|Today's story includes|This picture includes|In class, the teacher writes a word meaning|After class, I review a word meaning|The classmates read a word meaning|There is .* in the math question\.?$|There is (a |an )?(self|we|you all|they|your) on the playground\.?$|When going out, we can see|I can make a sentence|This sentence has|.*appears in the story\.?$|We use .* to plan study\.?$|The map marks|In class, we use|In class, I read|I write ".+" in my notebook|While learning|Please do ".+" first|I practise ".+" every day|I use ".+" in the sentence|The teacher gives me|The teacher uses .* to help us learn\.?$|The teacher uses a picture to explain (good morning|good night|thank-you gift)\.?$|I see (?!a |an |the |some )[a-z ]+ in the park\.?$)|is it is|okay\? to|^[\u3400-\u9fff]+[:：]|what the hell|onetime former|be on one's foot|I know this (self|we)\.?$|There is (an eat fruit|buy vegetables|sell vegetables|like to eat|drink tea|drink milk|cows and sheep) |At lunch, I eat (cook a meal|hot water|tea|sell vegetables)\.?$|I want to try (eat fruit|drink milk)\.?$|The teacher demonstrates the action drink water\.?$|On at the same time|I can (speak|action|sport|recognise it|give you)\.?$|I practise (speaking|actioning|sporting|recognising it|seeing|sleeping|passing through|watching|giving you|asking for it|being able to|missing) every day\.?$|After finishing the task, I receive (work hard|level|serious|grow up|all correct)\.?$|draws the (physical strength|on the head|purse one's lips)|move my (purse one's lips|physical strength|hair)|makes me want to practise more/i;

const DICTIONARY_FRAGMENT_ZH = /《|》|--|——|∶|\[[^\]]+\]|。--|曰|乎|矣|焉|也。--/;

const SENTENCE_REPAIR_TEMPLATES = {
  animal: [
    { zh: ({ word }) => `草地上有一只${word}。`, en: ({ meaning }) => `There is ${withArticle(meaning)} on the grass.` },
    { zh: ({ word }) => `我在公园里看见${word}。`, en: ({ meaning }) => `I see ${withArticle(meaning)} in the park.` },
  ],
  body: [
    { zh: ({ word }) => `运动后，我活动${word}。`, en: ({ meaning }) => `After exercise, I move my ${meaning}.` },
    { zh: ({ word }) => `画人像时，她先画${word}。`, en: ({ meaning }) => `When drawing a portrait, she draws the ${meaning} first.` },
  ],
  colour: [
    { zh: ({ word }) => `我用${word}画了一朵花。`, en: ({ meaning }) => `I use ${meaning} to draw a flower.` },
    { zh: ({ word }) => `图画里有一块${word}。`, en: ({ meaning }) => `There is some ${meaning} in the picture.` },
  ],
  direction: [
    { zh: ({ word }) => `请看${word}的位置。`, en: ({ meaning }) => `Please look at the position of ${meaning}.` },
    { zh: ({ word }) => `地图上标着${word}。`, en: ({ meaning }) => `${capitalizeEnglish(meaning)} is marked on the map.` },
  ],
  family: [
    { zh: ({ word }) => `我的${word}在家里等我。`, en: ({ meaning }) => `My ${meaning} waits for me at home.` },
    { zh: ({ word }) => `周末，我和${word}一起吃饭。`, en: ({ meaning }) => `On the weekend, I eat with my ${meaning}.` },
  ],
  feedback: [
    { zh: ({ word }) => `${word}让我更想练习。`, en: ({ meaning }) => `${capitalizeEnglish(meaning)} makes me want to practise more.` },
    { zh: ({ word }) => `老师给了我${word}。`, en: ({ meaning }) => `The teacher gives me ${meaning}.` },
  ],
  feeling: [
    { zh: ({ word }) => `听到好消息，我很${word}。`, en: ({ meaning }) => `I feel ${meaning} when I hear the good news.` },
    { zh: ({ word }) => `她说话很${word}。`, en: ({ meaning }) => `She speaks in a ${meaning} way.` },
  ],
  food: [
    { zh: ({ word }) => `午饭时，我吃了${word}。`, en: ({ meaning }) => `At lunch, I eat ${meaning}.` },
    { zh: ({ word }) => `桌上放着${word}。`, en: ({ meaning }) => `There is ${withArticle(meaning)} on the table.` },
  ],
  nature: [
    { zh: ({ word }) => `窗外有${word}。`, en: ({ meaning }) => `There is ${meaning} outside the window.` },
    { zh: ({ word }) => `图画里画着${word}。`, en: ({ meaning }) => `The picture shows ${meaning}.` },
  ],
  number: [
    { zh: ({ word }) => `老师在黑板上写下${word}。`, en: ({ meaning }) => `The teacher writes ${meaning} on the board.` },
    { zh: ({ word }) => `数学题里有${word}。`, en: ({ meaning }) => `There is ${meaning} in the math question.` },
  ],
  person: [
    { zh: ({ word }) => `操场上有一位${word}。`, en: ({ meaning }) => `There is ${withArticle(meaning)} on the playground.` },
    { zh: ({ word }) => `我认识这位${word}。`, en: ({ meaning }) => `I know this ${meaning}.` },
  ],
  phrase: [
    { zh: ({ word }) => `我会说${word}。`, en: ({ meaning }) => `I can say "${meaning}."` },
    { zh: ({ word }) => `老师听见我说${word}。`, en: ({ meaning }) => `The teacher hears me say "${meaning}."` },
  ],
  place: [
    { zh: ({ word }) => `周末，我们去了${word}。`, en: ({ meaning }) => `On the weekend, we went to ${meaning}.` },
    { zh: ({ word }) => `我在地图上找到${word}。`, en: ({ meaning }) => `I find ${withArticle(meaning)} on the map.` },
  ],
  question: [
    { zh: ({ word }) => `我问：“${word}？”`, en: ({ meaning }) => `I ask, "${meaning}?"` },
    { zh: ({ word }) => `老师听见我问${word}。`, en: ({ meaning }) => `The teacher hears me ask "${meaning}?"` },
  ],
  school: [
    { zh: ({ word }) => `中文课上，我们学习${word}。`, en: ({ meaning }) => `In Chinese class, we learn about ${meaning}.` },
    { zh: ({ word }) => `老师用${word}帮助我们学习。`, en: ({ meaning }) => `The teacher uses ${meaning} to help us learn.` },
  ],
  time: [
    { zh: ({ word }) => `${word}，我在家读书。`, en: ({ meaning }) => `On ${meaning}, I read at home.` },
    { zh: ({ word }) => `${word}，我们一起去学校。`, en: ({ meaning }) => `On ${meaning}, we go to school together.` },
  ],
  transport: [
    { zh: ({ word }) => `我在路上看见${word}。`, en: ({ meaning }) => `I see ${withArticle(meaning)} on the road.` },
    { zh: ({ word }) => `放学后，我坐${word}回家。`, en: ({ meaning }) => `After school, I take ${withArticle(meaning)} home.` },
  ],
  verb: [
    { zh: ({ word }) => `我会${word}。`, en: ({ meaning }) => `I can ${verbBase(meaning)}.` },
    { zh: ({ word }) => `我每天练习${word}。`, en: ({ meaning }) => `I practise ${gerundPhrase(meaning)} every day.` },
  ],
  common: [
    { zh: ({ word }) => `这节课，我们学习${word}。`, en: ({ meaning }) => `In this lesson, we learn about ${meaning}.` },
    { zh: ({ word }) => `老师用图解释${word}。`, en: ({ meaning }) => `The teacher uses a picture to explain ${meaning}.` },
  ],
};

const FINAL_FALLBACK_SCENES = [
  {
    zh: ({ word }) => `课堂上，老师写下${word}。`,
    en: ({ meaning }) => `In class, the teacher writes a word meaning ${meaning}.`,
  },
  {
    zh: ({ word }) => `我在课后复习${word}。`,
    en: ({ meaning }) => `After class, I review a word meaning ${meaning}.`,
  },
  {
    zh: ({ word }) => `同学们一起读${word}。`,
    en: ({ meaning }) => `The classmates read a word meaning ${meaning} together.`,
  },
];

const REPAIR_EXAMPLE_OVERRIDES = {
  一天: [{ zh: "有一天，我在家读书。", en: "One day, I read at home." }],
  自我: [{ zh: "画画时，我喜欢表达自我。", en: "When I draw, I like to express myself." }],
  自己: [{ zh: "我自己整理书包。", en: "I pack my school bag by myself." }],
  哪呢: [{ zh: "我的书在哪呢？", en: "Where is my book?" }],
  来吧: [{ zh: "来吧，我们一起练习。", en: "Come on, let's practise together." }],
  行吗: [{ zh: "这样做行吗？", en: "Is it okay to do it this way?" }],
  名字: [{ zh: "请写下你的名字。", en: "Please write down your name." }],
  千字: [{ zh: "这篇短文大约有一千字。", en: "This short passage has about one thousand characters." }],
  早上: [{ zh: "早上，我们一起去学校。", en: "In the morning, we go to school together." }],
  晚上: [{ zh: "晚上，我们在家吃饭。", en: "In the evening, we eat dinner at home." }],
  上下: [{ zh: "电梯可以上下走。", en: "The lift can go up and down." }],
  因果: [{ zh: "老师讲了一个简单的因果关系。", en: "The teacher explains a simple cause-and-effect link." }],
  交给: [{ zh: "请把作业交给老师。", en: "Please hand your homework to the teacher." }],
  公交车: [
    { zh: "我在路上看见一辆公交车。", en: "I see a bus on the road." },
    { zh: "公交车停在学校门口。", en: "The public bus stops at the school gate." },
  ],
  狗叫: [{ zh: "我听见狗在叫。", en: "I hear a dog barking." }],
  鸟叫: [{ zh: "我听见小鸟在叫。", en: "I hear a bird singing." }],
  左右: [{ zh: "地图上标着左右方向。", en: "Left and right directions are marked on the map." }],
  为什么: [{ zh: "你为什么笑？", en: "Why are you laughing?" }],
  所有: [{ zh: "所有同学都到了。", en: "All the students have arrived." }],
  厕所: [{ zh: "请问，厕所在哪里？", en: "Excuse me, where is the toilet?" }],
  街上: [{ zh: "街上有很多人。", en: "There are many people on the street." }],
  前后: [{ zh: "请看看队伍的前后。", en: "Please look at the front and back of the line." }],
  以前: [{ zh: "以前，我不会写这个字。", en: "Before, I could not write this character." }],
  以后: [{ zh: "以后，我会每天练习。", en: "After this, I will practise every day." }],
  后面: [{ zh: "书包在椅子后面。", en: "The school bag is behind the chair." }],
  可能: [{ zh: "今天可能会下雨。", en: "It might rain today." }],
  可爱: [{ zh: "这只小狗很可爱。", en: "This puppy is very cute." }],
  看见: [{ zh: "我看见一只小鸟。", en: "I see a bird." }],
  图画: [{ zh: "美术课上，我画了一幅图画。", en: "In art class, I draw a picture." }],
  拼图: [{ zh: "弟弟喜欢玩拼图。", en: "My younger brother likes doing puzzles." }],
  里面: [{ zh: "盒子里面有铅笔。", en: "There is a pencil inside the box." }],
  里外: [{ zh: "我把书包里外都看了一遍。", en: "I checked the inside and outside of my school bag." }],
  外面: [{ zh: "孩子们在外面玩。", en: "The children are playing outside." }],
  再见: [{ zh: "放学时，我对朋友说再见。", en: "After school, I say goodbye to my friend." }],
  外国: [{ zh: "我的朋友来自外国。", en: "My friend comes from another country." }],
  笔画: [{ zh: "写汉字时，要注意笔画。", en: "When writing Chinese characters, pay attention to the strokes." }],
  短文: [{ zh: "上课时，我读了一篇短文。", en: "In class, I read a short passage." }],
  请坐: [
    { zh: "进教室后，老师请我们坐下。", en: "After we enter the classroom, the teacher asks us to sit down." },
    { zh: "老师微笑着说：请坐。", en: "The teacher smiles and says: please sit." },
  ],
  东西: [{ zh: "请把东西放进书包。", en: "Please put the things into your school bag." }],
  百个: [{ zh: "盒子里有一百个小贴纸。", en: "There are one hundred small stickers in the box." }],
  百年: [{ zh: "这所学校有百年历史。", en: "This school has a history of one hundred years." }],
  英国: [{ zh: "我在地图上找到英国。", en: "I find the United Kingdom on the map." }],
  跳高: [{ zh: "体育课上，我练习跳高。", en: "In PE class, I practise high jump." }],
  千米: [{ zh: "一千米很远。", en: "One kilometre is a long way." }],
  短跑: [{ zh: "运动会上，我参加短跑。", en: "At sports day, I take part in the sprint." }],
  慢跑: [
    { zh: "请你先慢跑一圈。", en: "Please jog one lap first." },
    { zh: "早上，我和爸爸一起慢跑。", en: "In the morning, I jog with Dad." },
  ],
  南半球: [{ zh: "澳洲在南半球。", en: "Australia is in the Southern Hemisphere." }],
  南方: [{ zh: "太阳从南方照进教室。", en: "The sun shines into the classroom from the south." }],
  南边: [{ zh: "学校在公园的南边。", en: "The school is south of the park." }],
  买东西: [{ zh: "周末，我和妈妈去买东西。", en: "On the weekend, I go shopping with Mum." }],
  卖东西: [{ zh: "学校义卖时，我们卖东西。", en: "At the school fair, we sell things." }],
  关系: [{ zh: "我和同学关系很好。", en: "I have a good relationship with my classmates." }],
  系鞋带: [{ zh: "我会自己系鞋带。", en: "I can tie my shoelaces by myself." }],
  万一: [{ zh: "万一下雨，我们就在教室里玩。", en: "If it rains, we will play in the classroom." }],
  千万: [{ zh: "过马路时，千万要小心。", en: "Be very careful when crossing the road." }],
  亚洲: [{ zh: "中国在亚洲。", en: "China is in Asia." }],
  走路: [{ zh: "我每天走路去学校。", en: "I walk to school every day." }],
  走开: [{ zh: "请走开一点，让大家过去。", en: "Please move aside a little so everyone can pass." }],
  一个: [{ zh: "我有一个苹果。", en: "I have one apple." }],
  三个: [{ zh: "桌上有三个杯子。", en: "There are three cups on the table." }],
  这个: [{ zh: "这个字很简单。", en: "This character is easy." }],
  坐下: [{ zh: "上课了，请坐下。", en: "Class has started. Please sit down." }],
  坐好: [{ zh: "上课时，大家要坐好。", en: "In class, everyone should sit properly." }],
  周末: [{ zh: "周末，我在家读书。", en: "On the weekend, I read at home." }],
  周日: [{ zh: "周日，我去中文学校。", en: "On Sunday, I go to Chinese school." }],
  一周: [{ zh: "一周有七天。", en: "There are seven days in a week." }],
  北风: [{ zh: "冬天，北风吹得很冷。", en: "In winter, the north wind feels cold." }],
  北方: [{ zh: "地图上，上面是北方。", en: "On the map, north is at the top." }],
  北边: [{ zh: "图书馆在学校北边。", en: "The library is north of the school." }],
  今天: [{ zh: "今天，我学了一个新字。", en: "Today, I learnt a new character." }],
  今日: [{ zh: "今日天气很好。", en: "The weather is good today." }],
  今晚: [{ zh: "今晚，我在家读书。", en: "Tonight, I read at home." }],
  一只: [{ zh: "草地上有一只小鸟。", en: "There is one bird on the grass." }],
  两只: [{ zh: "草地上有两只小鸟。", en: "There are two birds on the grass." }],
  六只: [{ zh: "树上有六只小鸟。", en: "There are six birds in the tree." }],
  期末: [{ zh: "期末，我们有中文表演。", en: "At the end of the term, we have a Chinese performance." }],
  末尾: [{ zh: "请看句子的末尾。", en: "Please look at the end of the sentence." }],
  站立: [{ zh: "升旗时，我们站立唱歌。", en: "During the flag ceremony, we stand and sing." }],
  车站: [{ zh: "放学后，我在车站等车。", en: "After school, I wait for the bus at the station." }],
  站好: [{ zh: "排队时，请站好。", en: "Please stand properly when lining up." }],
  开口: [{ zh: "读拼音时，要开口。", en: "When reading pinyin, open your mouth." }],
  门口: [{ zh: "我在学校门口等妈妈。", en: "I wait for Mum at the school gate." }],
  来回: [{ zh: "我在操场上来回跑。", en: "I run back and forth on the playground." }],
  出来: [{ zh: "太阳出来了。", en: "The sun has come out." }],
  体育: [{ zh: "体育课上，我们一起跑步。", en: "In PE class, we run together." }],
  教育: [{ zh: "学校重视安全教育。", en: "The school values safety education." }],
  育儿: [{ zh: "妈妈读了一本育儿书。", en: "Mum read a parenting book." }],
  冷天: [{ zh: "冷天要穿外套。", en: "On cold days, we should wear a coat." }],
  大哥: [{ zh: "大哥帮我拿书包。", en: "My eldest brother helps me carry my school bag." }],
  表哥: [{ zh: "表哥周末来我家。", en: "My older male cousin comes to my home on the weekend." }],
  明日: [{ zh: "明日是学校开放日。", en: "Tomorrow is school open day." }],
  明天: [{ zh: "明天，我们去公园。", en: "Tomorrow, we will go to the park." }],
  明年: [{ zh: "明年，我上三年级。", en: "Next year, I will be in Year 3." }],
  课本: [{ zh: "请把课本放在桌上。", en: "Please put the textbook on the desk." }],
  五本: [{ zh: "书架上有五本书。", en: "There are five books on the shelf." }],
  本子: [{ zh: "我在本子上写字。", en: "I write characters in my notebook." }],
  读音: [{ zh: "老师教我们这个字的读音。", en: "The teacher teaches us the pronunciation of this character." }],
  鼻音: [{ zh: "学拼音时，我练习鼻音。", en: "When learning pinyin, I practise nasal sounds." }],
  音乐: [{ zh: "音乐课上，我们唱歌。", en: "In music class, we sing." }],
  进去: [{ zh: "下课后，我们走进去。", en: "After class, we walk inside." }],
  回去: [{ zh: "东西忘了，我要回去拿。", en: "I forgot my things, so I need to go back and get them." }],
  去年: [{ zh: "去年，我上一年级。", en: "Last year, I was in Year 1." }],
  书包: [{ zh: "我的书包很重。", en: "My school bag is heavy." }],
  新书: [{ zh: "我买了一本新书。", en: "I bought a new book." }],
  回家: [{ zh: "放学后，我回家。", en: "After school, I go home." }],
  快乐: [{ zh: "生日那天，我很快乐。", en: "On my birthday, I am very happy." }],
  游乐: [{ zh: "周末，我们去游乐场玩。", en: "On the weekend, we go to the playground to play." }],
  昨日: [{ zh: "昨日，我去了图书馆。", en: "Yesterday, I went to the library." }],
  昨天: [{ zh: "昨天，我在家读书。", en: "Yesterday, I read at home." }],
  昨晚: [{ zh: "昨晚，我在家读书。", en: "Last night, I read at home." }],
  弟弟: [{ zh: "弟弟喜欢画画。", en: "My younger brother likes drawing." }],
  小弟: [{ zh: "小弟跟我一起玩。", en: "My little brother plays with me." }],
  少年: [{ zh: "那位少年在操场上跑步。", en: "That young person is running on the playground." }],
  新年: [{ zh: "新年，我们和家人吃饭。", en: "At New Year, we eat with our family." }],
  小妹: [{ zh: "小妹喜欢听故事。", en: "My little sister likes listening to stories." }],
  铅笔: [{ zh: "我用铅笔写字。", en: "I write with a pencil." }],
  颜料: [{ zh: "美术课上，我们用颜料画画。", en: "In art class, we paint with colours." }],
  笑颜: [{ zh: "她露出笑颜。", en: "She smiles." }],
  进入: [{ zh: "上课铃响了，我们进入教室。", en: "The class bell rings, and we enter the classroom." }],
  白纸: [
    { zh: "我在白纸上画画。", en: "I draw on white paper." },
    { zh: "我在白纸上写名字。", en: "I write my name on white paper." },
  ],
  贴纸: [{ zh: "我把贴纸贴在本子上。", en: "I put a sticker in my notebook." }],
  纸张: [{ zh: "老师发给我们几张纸。", en: "The teacher gives us some sheets of paper." }],
  出门: [{ zh: "我早上八点出门。", en: "I leave home at eight in the morning." }],
  金色: [{ zh: "我用金色画太阳。", en: "I draw the sun in gold." }],
  颜色: [{ zh: "我喜欢这支笔的颜色。", en: "I like the colour of this pen." }],
  二月: [{ zh: "二月是夏天的最后一个月。", en: "February is the last month of summer." }],
  三月: [{ zh: "三月，天气慢慢变凉。", en: "In March, the weather slowly gets cooler." }],
  四月: [{ zh: "四月，我们放秋假。", en: "In April, we have autumn holidays." }],
  五月: [{ zh: "五月有学校活动。", en: "There is a school activity in May." }],
  六月: [{ zh: "六月有学校活动。", en: "There is a school activity in June." }],
  七月: [{ zh: "七月有学校活动。", en: "There is a school activity in July." }],
  八月: [{ zh: "八月在澳洲是冬天。", en: "August is winter in Australia." }],
  九月: [{ zh: "九月有学校活动。", en: "There is a school activity in September." }],
  先生: [
    { zh: "王先生是我们的中文老师。", en: "Mr Wang is our Chinese teacher." },
    { zh: "那位先生在校门口等孩子。", en: "That man is waiting for his child at the school gate." },
  ],
  首先: [
    { zh: "首先，请写你的名字。", en: "First, please write your name." },
    { zh: "首先，请打开课本。", en: "First, please open your textbook." },
  ],
  先后: [{ zh: "我们先后走进教室。", en: "We walk into the classroom one after another." }],
  师生: [{ zh: "全校师生一起唱歌。", en: "All the teachers and students sing together." }],
  人口: [{ zh: "澳洲的人口比中国少。", en: "Australia has a smaller population than China." }],
  什么人: [{ zh: "门口站着什么人？", en: "Who is standing at the door?" }],
  红花: [{ zh: "花园里有一朵红花。", en: "There is a red flower in the garden." }],
  红豆: [{ zh: "我喜欢吃红豆包。", en: "I like eating red bean buns." }],
  走开: [{ zh: "小狗听到声音就走开了。", en: "The puppy walked away when it heard the sound." }],
  开关: [
    { zh: "门边有一个电灯开关。", en: "There is a light switch by the door." },
    { zh: "请把电灯开关关上。", en: "Please turn off the light switch." },
  ],
  开门: [{ zh: "请帮我开门。", en: "Please help me open the door." }],
  我们: [{ zh: "我们在操场上跑步。", en: "We run on the playground." }],
  关心: [{ zh: "老师很关心我们。", en: "The teacher cares about us." }],
  星期: [
    { zh: "这个星期我们学习新字。", en: "This week we are learning new characters." },
    { zh: "这个星期我每天读中文。", en: "This week I read Chinese every day." },
  ],
  金星: [{ zh: "我在书上看到金星。", en: "I see Venus in the book." }],
  星期天: [
    { zh: "星期天，我在家读书。", en: "On Sunday, I read at home." },
    { zh: "星期天，我们一起去公园。", en: "On Sunday, we go to the park together." },
  ],
  你们: [{ zh: "你们喜欢中文课吗？", en: "Do you like Chinese class?" }],
  买菜: [
    { zh: "爸爸去市场买菜。", en: "Dad goes to the market to buy vegetables." },
    { zh: "妈妈去市场买菜。", en: "Mum goes to the market to buy vegetables." },
  ],
  买书: [{ zh: "我想去书店买书。", en: "I want to go to the bookshop to buy a book." }],
  他们: [{ zh: "他们在操场上踢足球。", en: "They are playing soccer on the playground." }],
  卖菜: [
    { zh: "市场里有很多人在卖菜。", en: "Many people are selling vegetables at the market." },
    { zh: "市场里有人在卖菜。", en: "Someone is selling vegetables at the market." },
  ],
  绿叶: [{ zh: "树上有很多绿叶。", en: "There are many green leaves on the tree." }],
  时间: [{ zh: "现在是上课时间。", en: "It is class time now." }],
  时候: [{ zh: "吃饭的时候，请不要看电视。", en: "Please do not watch TV while eating." }],
  十分: [{ zh: "这本书十分有趣。", en: "This book is very interesting." }],
  部分: [
    { zh: "我只读了故事的一部分。", en: "I only read part of the story." },
    { zh: "我只做完了一部分作业。", en: "I finished only part of my homework." },
  ],
  她们: [{ zh: "她们一起去图书馆。", en: "They go to the library together." }],
  白云: [
    { zh: "窗外有一朵白云。", en: "There is a white cloud outside the window." },
    { zh: "图画里画着一朵白云。", en: "There is a white cloud in the picture." },
  ],
  吃饭: [
    { zh: "我们中午一起吃饭。", en: "We eat lunch together at noon." },
    { zh: "请你先吃饭。", en: "Please eat first." },
  ],
  爱吃: [{ zh: "我爱吃苹果。", en: "I like eating apples." }],
  它是: [{ zh: "它是一只小猫。", en: "It is a kitten." }],
  它们: [{ zh: "它们在草地上玩。", en: "They are playing on the grass." }],
  它的: [{ zh: "这是它的玩具。", en: "This is its toy." }],
  喝水: [{ zh: "运动后要喝水。", en: "You should drink water after exercise." }],
  黑板: [{ zh: "老师在黑板上写字。", en: "The teacher writes on the board." }],
  黑夜: [{ zh: "黑夜里，星星很亮。", en: "At night, the stars are bright." }],
  四点: [{ zh: "下午四点，我回家。", en: "At four in the afternoon, I go home." }],
  八点: [{ zh: "晚上八点，我在家读书。", en: "At eight in the evening, I read at home." }],
  九点: [{ zh: "早上九点，我们开始上课。", en: "At nine in the morning, we start class." }],
  儿童: [
    { zh: "儿童节那天，大家很开心。", en: "On Children's Day, everyone is happy." },
    { zh: "公园里有很多儿童。", en: "There are many children in the park." },
  ],
  鸟儿: [{ zh: "树上有一只鸟儿。", en: "There is a bird in the tree." }],
  半天: [{ zh: "我花了半天做作业。", en: "I spent half a day doing homework." }],
  半个: [{ zh: "我吃了半个苹果。", en: "I ate half an apple." }],
  童年: [{ zh: "爸爸常说他的童年故事。", en: "Dad often tells stories from his childhood." }],
  童话: [{ zh: "睡觉前，妈妈讲童话故事。", en: "Before bedtime, Mum tells a fairy tale." }],
  动物: [{ zh: "动物园里有很多动物。", en: "There are many animals at the zoo." }],
  运动: [
    { zh: "我每天做运动。", en: "I exercise every day." },
    { zh: "每天运动对身体好。", en: "Exercise every day is good for your body." },
  ],
  动作: [{ zh: "这个舞蹈动作很简单。", en: "This dance move is simple." }],
  做事: [
    { zh: "做事要认真。", en: "We should do things carefully." },
    { zh: "做事要有耐心。", en: "We should be patient when doing things." },
  ],
  做饭: [{ zh: "爸爸正在做饭。", en: "Dad is cooking." }],
  我的: [{ zh: "这是我的铅笔。", en: "This is my pencil." }],
  你的: [{ zh: "这是你的本子吗？", en: "Is this your notebook?" }],
  他的: [{ zh: "那是他的书包。", en: "That is his school bag." }],
  玩具: [{ zh: "弟弟有一个新玩具。", en: "My younger brother has a new toy." }],
  玩笑: [{ zh: "这个玩笑很好笑。", en: "This joke is funny." }],
  玩耍: [{ zh: "孩子们在公园里玩耍。", en: "The children play in the park." }],
  礼物: [{ zh: "老师给了我一个礼物。", en: "The teacher gave me a gift." }],
  身上: [{ zh: "我的身上有很多雨水。", en: "There is a lot of rainwater on me." }],
  身边: [{ zh: "妈妈坐在我身边。", en: "Mum sits beside me." }],
  夏天: [{ zh: "澳洲的夏天很热。", en: "Summer in Australia is hot." }],
  夏日: [{ zh: "夏日里，我们去海边玩。", en: "On summer days, we go to the beach." }],
  夏季: [{ zh: "夏季要多喝水。", en: "In summer, we should drink more water." }],
  了不起: [
    { zh: "你会写这么多字，真了不起！", en: "You can write so many characters. That is amazing!" },
    { zh: "你今天读得很好，真了不起！", en: "You read very well today. That is amazing!" },
  ],
  电影: [
    { zh: "周末我们看了一部电影。", en: "We watched a movie on the weekend." },
    { zh: "我们周末看电影。", en: "We watch a movie on the weekend." },
  ],
  电脑: [{ zh: "爸爸用电脑联系老师。", en: "Dad uses a computer to contact the teacher." }],
  电话: [{ zh: "爸爸用电话联系老师。", en: "Dad uses the phone to contact the teacher." }],
  睡觉: [{ zh: "我晚上九点睡觉。", en: "I go to sleep at nine at night." }],
  午睡: [{ zh: "弟弟下午要午睡。", en: "My younger brother needs a nap in the afternoon." }],
  影子: [{ zh: "阳光下有我的影子。", en: "I can see my shadow in the sunshine." }],
  合影: [{ zh: "毕业那天，我们一起合影。", en: "On graduation day, we take a group photo together." }],
  秋日: [{ zh: "秋日的早上有点凉。", en: "Autumn mornings are a little cool." }],
  木头: [{ zh: "地上有一块木头。", en: "There is a piece of wood on the ground." }],
  冬日: [{ zh: "冬日的早上很冷。", en: "Winter mornings are cold." }],
  洗手: [
    { zh: "吃饭前请先洗手。", en: "Please wash your hands before eating." },
    { zh: "吃饭前，我先洗手。", en: "Before eating, I wash my hands." },
  ],
  故事: [{ zh: "老师给我们讲故事。", en: "The teacher tells us a story." }],
  故乡: [{ zh: "奶奶的故乡在中国。", en: "Grandma's hometown is in China." }],
  故人: [{ zh: "爷爷见到一位故人。", en: "Grandpa meets an old friend." }],
  穿衣: [{ zh: "弟弟正在学习自己穿衣。", en: "My younger brother is learning to dress himself." }],
  穿上: [{ zh: "天气冷了，请穿上外套。", en: "It is cold. Please put on your jacket." }],
  穿过: [{ zh: "我们穿过马路去学校。", en: "We cross the road to go to school." }],
  洗脸: [{ zh: "早上起床后，我洗脸。", en: "After getting up in the morning, I wash my face." }],
  洗澡: [{ zh: "晚上睡觉前，我洗澡。", en: "Before going to bed at night, I take a shower." }],
  足球: [
    { zh: "体育课上，我们踢足球。", en: "In PE class, we play soccer." },
    { zh: "我们放学后踢足球。", en: "We play soccer after school." },
  ],
  手足: [{ zh: "画人时，要画出手足。", en: "When drawing a person, you need to draw the hands and feet." }],
  足够: [{ zh: "这些铅笔足够全班用。", en: "These pencils are enough for the whole class." }],
  眼看: [{ zh: "眼看就要下雨了。", en: "It looks like it is about to rain." }],
  眼前: [{ zh: "我的眼前有一张地图。", en: "There is a map in front of me." }],
  现在: [{ zh: "现在，我在家读书。", en: "Now I am reading at home." }],
  运气: [{ zh: "我今天运气很好。", en: "I am lucky today." }],
  给我: [{ zh: "请把铅笔给我。", en: "Please give me the pencil." }],
  和平: [{ zh: "我们都希望世界和平。", en: "We all hope for world peace." }],
  和气: [{ zh: "老师说话很和气。", en: "The teacher speaks kindly." }],
  拿书: [{ zh: "上课前，我先拿书。", en: "Before class, I take out my book." }],
  拿走: [{ zh: "请不要拿走我的本子。", en: "Please do not take away my notebook." }],
  球场: [{ zh: "放学后，他去球场踢球。", en: "After school, he goes to the field to play ball." }],
  下雪: [{ zh: "今天下雪了，出门要穿暖。", en: "It snowed today, so wear warm clothes when going out." }],
  云朵: [{ zh: "天上有很多云朵。", en: "There are many clouds in the sky." }],
  云彩: [{ zh: "窗外有美丽的云彩。", en: "There are beautiful clouds outside the window." }],
  很大: [{ zh: "这个书包很大。", en: "This school bag is very big." }],
  游泳: [{ zh: "夏天，我喜欢游泳。", en: "In summer, I like swimming." }],
  游戏: [{ zh: "下课后，我们玩游戏。", en: "After class, we play a game." }],
  放下: [{ zh: "请把书包放下。", en: "Please put down your school bag." }],
  放学: [{ zh: "放学后，我坐车回家。", en: "After school, I take the bus home." }],
  找到: [{ zh: "我找到我的铅笔了。", en: "I found my pencil." }],
  找人: [{ zh: "老师正在找人帮忙。", en: "The teacher is looking for someone to help." }],
  寻找: [{ zh: "我们在图书馆寻找一本书。", en: "We look for a book in the library." }],
  拼写: [{ zh: "请拼写你的名字。", en: "Please spell your name." }],
  拼音: [{ zh: "我会读这个字的拼音。", en: "I can read the pinyin for this character." }],
  地图: [{ zh: "我在地图上找到学校。", en: "I find the school on the map." }],
  热水: [{ zh: "天气冷时，我喝热水。", en: "When the weather is cold, I drink hot water." }],
  冷水: [{ zh: "运动后，我喝冷水。", en: "After exercise, I drink cold water." }],
  雨水: [{ zh: "地上有很多雨水。", en: "There is a lot of rainwater on the ground." }],
  前面: [{ zh: "老师站在教室前面。", en: "The teacher stands at the front of the classroom." }],
  火山: [{ zh: "书上有一张火山的图片。", en: "There is a picture of a volcano in the book." }],
  火苗: [{ zh: "火苗很小，请离远一点。", en: "The flame is small, but please stay away." }],
  就要: [
    { zh: "我们就要上课了。", en: "We are about to start class." },
    { zh: "我们就要放学了。", en: "We are about to finish school." },
  ],
  首都: [
    { zh: "堪培拉是澳洲的首都。", en: "Canberra is the capital of Australia." },
    { zh: "我在地图上找到澳洲的首都。", en: "I find Australia's capital on the map." },
  ],
  汉字: [{ zh: "我会写五个汉字。", en: "I can write five Chinese characters." }],
  汉语: [{ zh: "她会说汉语。", en: "She can speak Chinese." }],
  问答: [
    { zh: "我们做中文问答练习。", en: "We do Chinese question-and-answer practice." },
    { zh: "我们做问答游戏。", en: "We play a question-and-answer game." },
  ],
  问题: [{ zh: "我有一个问题。", en: "I have a question." }],
  答对: [{ zh: "这道题你答对了。", en: "You answered this question correctly." }],
  全部: [{ zh: "我把作业全部写完了。", en: "I finished all my homework." }],
  知识: [{ zh: "读书可以学到新知识。", en: "Reading can help us learn new knowledge." }],
  友爱: [
    { zh: "同学之间要友爱。", en: "Classmates should be kind and caring to one another." },
    { zh: "友爱让班级更温暖。", en: "Friendly care makes the class warmer." },
  ],
  爱心: [
    { zh: "她用爱心帮助同学。", en: "She helps classmates with a caring heart." },
    { zh: "这张卡片画着一个爱心。", en: "This card has a heart on it." },
  ],
  喜爱: [
    { zh: "我喜爱这本故事书。", en: "I like this storybook." },
    { zh: "妹妹喜爱唱中文歌。", en: "My younger sister likes singing Chinese songs." },
  ],
  自行车: [
    { zh: "我骑自行车去公园。", en: "I ride a bicycle to the park." },
    { zh: "放学后，我骑自行车回家。", en: "After school, I ride my bicycle home." },
  ],
  说中文: [
    { zh: "在中文课上，我们说中文。", en: "In Chinese class, we speak Chinese." },
    { zh: "我在家练习说中文。", en: "I practise speaking Chinese at home." },
  ],
  中国: [
    { zh: "中文来自中国。", en: "Chinese comes from China." },
    { zh: "地图上可以找到中国。", en: "You can find China on the map." },
  ],
  中文: [
    { zh: "我学习中文。", en: "I study Chinese." },
    { zh: "中文课上，我们认真听讲。", en: "In Chinese class, we listen carefully." },
  ],
  公园: [
    { zh: "周末，我们去公园玩。", en: "On the weekend, we go to the park to play." },
    { zh: "公园里有花和树。", en: "There are flowers and trees in the park." },
  ],
  飞机: [
    { zh: "飞机飞得很高。", en: "The plane flies very high." },
    { zh: "我在天空中看见飞机。", en: "I see a plane in the sky." },
  ],
  司机: [
    { zh: "司机把公交车停好。", en: "The driver parks the bus carefully." },
    { zh: "司机提醒大家坐好。", en: "The driver reminds everyone to sit properly." },
  ],
  耳机: [
    { zh: "爸爸用耳机联系老师。", en: "Dad uses earphones to contact the teacher." },
    { zh: "我把耳机放进书包。", en: "I put the earphones into my school bag." },
  ],
  马路: [
    { zh: "过马路时要注意安全。", en: "Be careful when crossing the road." },
    { zh: "马路边有一个公交站。", en: "There is a bus stop beside the road." },
  ],
  叫做: [
    { zh: "这个字叫做“山”。", en: "This character is called '山'." },
    { zh: "这只小狗叫做豆豆。", en: "This puppy is called Doudou." },
  ],
  会说: [
    { zh: "妹妹会说简单的中文。", en: "My younger sister can speak simple Chinese." },
    { zh: "他会说自己的名字。", en: "He can say his own name." },
  ],
  会写: [
    { zh: "我会写自己的名字。", en: "I can write my own name." },
    { zh: "她会写这个新字。", en: "She can write this new character." },
  ],
  听说: [
    { zh: "听说练习能帮助发音。", en: "Listening and speaking practice helps pronunciation." },
    { zh: "中文课有听说练习。", en: "Chinese class has listening and speaking practice." },
  ],
  听见: [
    { zh: "我听见窗外有鸟叫。", en: "I hear birds calling outside the window." },
    { zh: "上课铃响了，我听见了。", en: "The class bell rings, and I hear it." },
  ],
  读书: [
    { zh: "我每天读书二十分钟。", en: "I read books for twenty minutes every day." },
    { zh: "晚上，我在房间里读书。", en: "In the evening, I read in my room." },
  ],
  写字: [
    { zh: "我认真写字。", en: "I write characters carefully." },
    { zh: "写字时，我坐得很直。", en: "When writing characters, I sit up straight." },
  ],
  拿笔: [
    { zh: "请拿笔写字。", en: "Please take a pen and write." },
    { zh: "上课前，我先拿笔。", en: "Before class, I take out my pen first." },
  ],
  给你: [
    { zh: "我给你一支铅笔。", en: "I give you a pencil." },
    { zh: "这本书给你看。", en: "This book is for you to read." },
  ],
  澳洲: [
    { zh: "澳洲有很多美丽的海边。", en: "Australia has many beautiful beaches." },
    { zh: "我住在澳洲。", en: "I live in Australia." },
  ],
  澳洲人: [
    { zh: "这位澳洲人会说中文。", en: "This Australian person can speak Chinese." },
    { zh: "澳洲人也学习中文。", en: "Australian people also learn Chinese." },
  ],
  澳元: [
    { zh: "这本书要十澳元。", en: "This book costs ten Australian dollars." },
    { zh: "妈妈给我一枚澳元硬币。", en: "Mum gives me an Australian dollar coin." },
  ],
  巴西: [
    { zh: "巴西在地图上很远。", en: "Brazil is far away on the map." },
    { zh: "他读到一个关于巴西的故事。", en: "He reads a story about Brazil." },
  ],
  巴士: [
    { zh: "我坐巴士去学校。", en: "I take the bus to school." },
    { zh: "巴士停在车站旁边。", en: "The bus stops beside the station." },
  ],
  跑道: [{ zh: "体育课上，我们在跑道上跑步。", en: "In PE class, we run on the running track." }],
  知道: [{ zh: "我知道这个字怎么读。", en: "I know how to read this character." }],
  勇气: [{ zh: "她有勇气上台说中文。", en: "She has the courage to speak Chinese on stage." }],
  勇敢: [{ zh: "他勇敢地举手回答问题。", en: "He bravely raises his hand to answer the question." }],
  吃水果: [{ zh: "我每天吃水果。", en: "I eat fruit every day." }],
  能够: [{ zh: "我能够自己读这个句子。", en: "I can read this sentence by myself." }],
  努力: [
    { zh: "我努力练习写汉字。", en: "I work hard to practise writing Chinese characters." },
    { zh: "我努力完成中文作业。", en: "I work hard to finish my Chinese homework." },
  ],
  努嘴: [{ zh: "妹妹努嘴说她不想走。", en: "My younger sister pouts and says she does not want to go." }],
  努努嘴: [{ zh: "妹妹努努嘴，指向门口。", en: "My younger sister pouts and points to the door." }],
  认识: [{ zh: "我认识这位新同学。", en: "I know this new classmate." }],
  认真: [
    { zh: "我认真写每一个字。", en: "I write every character carefully." },
    { zh: "我认真听老师说话。", en: "I listen to the teacher carefully." },
  ],
  想要: [{ zh: "我想要一本新书。", en: "I want a new book." }],
  想念: [{ zh: "我想念在中国的爷爷。", en: "I miss my grandpa in China." }],
  体力: [{ zh: "跑步需要很多体力。", en: "Running needs a lot of energy." }],
  喝奶: [{ zh: "弟弟早上喝奶。", en: "My younger brother drinks milk in the morning." }],
  卖花: [{ zh: "市场里有人卖花。", en: "Someone sells flowers at the market." }],
  喝茶: [{ zh: "妈妈喜欢喝茶。", en: "Mum likes drinking tea." }],
  茶水: [{ zh: "桌上有一杯茶水。", en: "There is a cup of tea on the table." }],
  喜欢: [
    { zh: "我喜欢这本故事书。", en: "I like this storybook." },
    { zh: "她喜欢唱中文歌。", en: "She likes singing Chinese songs." },
  ],
  喜事: [{ zh: "家里有一件喜事。", en: "There is a happy event in the family." }],
  中奖: [{ zh: "他在学校活动中中奖了。", en: "He won a prize in the school activity." }],
  欢笑: [{ zh: "教室里充满了欢笑。", en: "The classroom is full of laughter." }],
  欢迎: [{ zh: "同学们欢迎新老师。", en: "The classmates welcome the new teacher." }],
  练歌: [{ zh: "放学后，他练歌。", en: "After school, he practises singing." }],
  激励: [{ zh: "老师的话激励我继续练习。", en: "The teacher's words encourage me to keep practising." }],
  草地: [{ zh: "周末，我们在草地上玩。", en: "On the weekend, we played on the grass." }],
  贴上: [{ zh: "请把贴纸贴上去。", en: "Please stick the sticker on." }],
  和好: [{ zh: "我和朋友和好了。", en: "My friend and I made up." }],
  很好: [{ zh: "你的中文说得很好。", en: "You speak Chinese very well." }],
  成长: [{ zh: "我在学习中慢慢成长。", en: "I grow little by little through learning." }],
  好成绩: [{ zh: "认真复习能得到好成绩。", en: "Careful revision can lead to a good result." }],
  宠物: [{ zh: "我家有一只宠物。", en: "My family has a pet." }],
  宠物猫: [{ zh: "姐姐照顾家里的宠物猫。", en: "My older sister takes care of the pet cat at home." }],
  宠物狗: [{ zh: "弟弟带宠物狗去散步。", en: "My younger brother takes the pet dog for a walk." }],
  宠爱: [{ zh: "奶奶很宠爱妹妹。", en: "Grandma loves my younger sister very much." }],
  等级: [{ zh: "这个游戏有不同等级。", en: "This game has different levels." }],
  等待: [{ zh: "我们在车站等待巴士。", en: "We wait for the bus at the station." }],
  都对: [{ zh: "我的答案都对。", en: "All my answers are correct." }],
  田里: [{ zh: "农夫在田里工作。", en: "The farmer works in the field." }],
  很多: [{ zh: "教室里有很多学生。", en: "There are many students in the classroom." }],
  有礼: [{ zh: "他说话很有礼。", en: "He speaks politely." }],
  错过: [{ zh: "我不想错过中文课。", en: "I do not want to miss Chinese class." }],
  她家: [{ zh: "周末，我去她家玩。", en: "On the weekend, I go to her house to play." }],
  在家: [{ zh: "下雨天，我在家读书。", en: "On rainy days, I read at home." }],
  放假: [{ zh: "明天学校放假。", en: "School has a holiday tomorrow." }],
  每天: [{ zh: "我每天去学校。", en: "I go to school every day." }],
  每年: [{ zh: "我们每年都有运动会。", en: "We have a sports day every year." }],
  路程: [{ zh: "从家到学校的路程不远。", en: "The distance from home to school is not far." }],
  牛奶: [{ zh: "早餐时，我喝牛奶。", en: "At breakfast, I drink milk." }],
  牛羊: [{ zh: "草地上有牛羊。", en: "There are cows and sheep on the grass." }],
  正确: [{ zh: "这个答案是正确的。", en: "This answer is correct." }],
  火车: [{ zh: "我在车站看见火车。", en: "I see a train at the station." }],
  船只: [{ zh: "我在河上看见船只。", en: "I see boats on the river." }],
  船上: [{ zh: "船上有很多人。", en: "There are many people on the boat." }],
  谁的: [{ zh: "这是谁的书包？", en: "Whose school bag is this?" }],
  冷天: [{ zh: "今天是冷天，出门要穿暖。", en: "Today is a cold day, so wear warm clothes when you go out." }],
  安全: [
    { zh: "过马路时要注意安全。", en: "Be careful when crossing the road." },
    { zh: "学校门口很安全。", en: "The school gate is safe." },
  ],
  热心: [{ zh: "她很热心，常常帮助同学。", en: "She is warm-hearted and often helps classmates." }],
  全部: [{ zh: "我把作业全部写完了。", en: "I finished all my homework." }],
  这里: [{ zh: "这里是我们的教室。", en: "Here is our classroom." }],
  那里: [{ zh: "那里有一个公园。", en: "There is a park over there." }],
  同时: [{ zh: "我们同时举手回答问题。", en: "We raise our hands to answer the question at the same time." }],
  慢走: [{ zh: "下楼梯时请慢走。", en: "Please walk slowly when going down the stairs." }],
  助人: [{ zh: "助人是一件好事。", en: "Helping others is a good thing." }],
  他呢: [
    { zh: "老师到了，他呢？", en: "The teacher is here. What about him?" },
    { zh: "我已经写完了，他呢？", en: "I have finished writing. What about him?" },
  ],
  啊呀: [
    { zh: "啊呀，我忘了带课本。", en: "Oh no, I forgot to bring my textbook." },
    { zh: "啊呀，雨下得真大。", en: "Oh no, it is raining hard." },
  ],
  因为: [
    { zh: "因为下雨，我们在家读书。", en: "Because it is raining, we read at home." },
    { zh: "因为天气冷，我穿上外套。", en: "Because the weather is cold, I put on a coat." },
  ],
  为了: [
    { zh: "为了学好中文，我每天练习。", en: "To learn Chinese well, I practise every day." },
    { zh: "为了赶上公交车，我走得很快。", en: "To catch the bus, I walk quickly." },
  ],
  所以: [
    { zh: "我认真练习，所以进步了。", en: "I practised carefully, so I improved." },
    { zh: "今天下雨，所以我们在教室里玩。", en: "It is raining today, so we play in the classroom." },
  ],
  可以: [
    { zh: "你可以再试一次。", en: "You can try once more." },
    { zh: "写完作业后，我们可以看书。", en: "After finishing homework, we can read." },
  ],
  请坐: [
    { zh: "老师微笑着说：请坐。", en: "The teacher smiles and says: please sit." },
    { zh: "进教室后，老师请坐下。", en: "After entering the classroom, the teacher asks us to sit down." },
  ],
  请进: [
    { zh: "听到敲门声，老师说请进。", en: "Hearing a knock, the teacher says please come in." },
    { zh: "同学站在门口，老师说请进。", en: "A classmate stands at the door, and the teacher says please come in." },
  ],
  请问: [
    { zh: "请问，这个字怎么读？", en: "Excuse me, how do you read this character?" },
    { zh: "请问，图书馆在哪里？", en: "Excuse me, where is the library?" },
  ],
  没有: [
    { zh: "我没有忘记带课本。", en: "I did not forget to bring my textbook." },
    { zh: "今天我没有迟到。", en: "I was not late today." },
  ],
  没关系: [
    { zh: "没关系，我们再试一次。", en: "No problem, we can try again." },
    { zh: "写错了也没关系。", en: "It is okay if you write it wrong." },
  ],
  好了: [
    { zh: "我写好了这个字。", en: "I have finished writing this character." },
    { zh: "书包整理好了，我们出门吧。", en: "The school bag is packed, so let's go out." },
  ],
  不是: [
    { zh: "这不是我的本子。", en: "This is not my notebook." },
    { zh: "那不是老师的书。", en: "That is not the teacher's book." },
  ],
  对不起: [
    { zh: "对不起，我来晚了。", en: "Sorry, I am late." },
    { zh: "写错了，我说对不起。", en: "I wrote it wrong, so I said sorry." },
  ],
  没事: [
    { zh: "没事，我们一起想办法。", en: "It is okay, we can find a way together." },
    { zh: "摔倒后，他说没事。", en: "After falling down, he says he is okay." },
  ],
  正在: [
    { zh: "我正在写中文作业。", en: "I am doing my Chinese homework now." },
    { zh: "妹妹正在读故事书。", en: "My younger sister is reading a storybook now." },
  ],
  也是: [
    { zh: "中文也是有趣的。", en: "Chinese is interesting too." },
    { zh: "她也是我们班的同学。", en: "She is also a classmate in our class." },
  ],
  也好: [
    { zh: "这样也好，我们可以多练习。", en: "That is also fine; we can practise more." },
    { zh: "坐在这里也好。", en: "Sitting here is fine too." },
  ],
  也许: [
    { zh: "也许明天会下雨。", en: "Maybe it will rain tomorrow." },
    { zh: "也许这本书在书包里。", en: "Maybe this book is in the school bag." },
  ],
  就是: [
    { zh: "这就是今天要学的字。", en: "This is the character we will learn today." },
    { zh: "答案就是这一句。", en: "The answer is this sentence." },
  ],
  都会: [
    { zh: "我们都会写这个字。", en: "We can all write this character." },
    { zh: "他们都会说中文。", en: "They can all speak Chinese." },
  ],
  就好: [
    { zh: "慢慢写就好。", en: "Writing slowly is fine." },
    { zh: "你先读一遍就好。", en: "You only need to read it once first." },
  ],
  只要: [
    { zh: "只要练习，就会进步。", en: "As long as you practise, you will improve." },
    { zh: "只要认真听，就能读准。", en: "As long as you listen carefully, you can read it correctly." },
  ],
  本子: [
    { zh: "我把本子放进书包。", en: "I put the notebook into my school bag." },
    { zh: "这个本子是我的。", en: "This notebook is mine." },
    { zh: "妹妹在本子上画花。", en: "My younger sister draws a flower in the notebook." },
  ],
  林子: [
    { zh: "林子里有小鸟。", en: "There are birds in the woods." },
    { zh: "我们在林子边散步。", en: "We walk beside the woods." },
  ],
  孩子: [
    { zh: "孩子们在操场上玩。", en: "The children play on the playground." },
    { zh: "那个孩子认真读书。", en: "That child reads carefully." },
  ],
  部首: [
    { zh: "这个字的部首是木。", en: "The radical of this character is wood." },
    { zh: "老师教我们查部首。", en: "The teacher teaches us to look up radicals." },
  ],
  学习: [
    { zh: "我每天学习中文。", en: "I study Chinese every day." },
    { zh: "学习让我认识新字。", en: "Studying helps me recognise new characters." },
    { zh: "我们在学校学习。", en: "We study at school." },
  ],
  练习: [
    { zh: "我每天练习写汉字。", en: "I practise writing Chinese characters every day." },
    { zh: "练习以后，我会读这个词。", en: "After practice, I can read this word." },
    { zh: "中文课上，我们做练习。", en: "In Chinese class, we do practice exercises." },
  ],
  奖励: [
    { zh: "老师给认真听讲的同学奖励。", en: "The teacher gives a reward to the classmates who listen carefully." },
    { zh: "完成任务后，我得到奖励。", en: "After finishing the task, I get a reward." },
  ],
  宠物猫: [
    { zh: "姐姐照顾家里的宠物猫。", en: "My older sister takes care of the pet cat at home." },
    { zh: "宠物猫喜欢晒太阳。", en: "The pet cat likes sitting in the sun." },
    { zh: "我给宠物猫倒水。", en: "I pour water for the pet cat." },
  ],
  宠物狗: [
    { zh: "弟弟带宠物狗去散步。", en: "My younger brother takes the pet dog for a walk." },
    { zh: "宠物狗在门口等我们。", en: "The pet dog waits for us at the door." },
    { zh: "我给宠物狗准备水。", en: "I prepare water for the pet dog." },
  ],
  成绩: [
    { zh: "我的成绩进步了。", en: "My result has improved." },
    { zh: "这次中文成绩很好。", en: "This Chinese result is very good." },
    { zh: "老师表扬我的成绩。", en: "The teacher praises my result." },
  ],
  成绩单: [
    { zh: "妈妈看了我的成绩单。", en: "Mum looked at my report card." },
    { zh: "老师发下成绩单。", en: "The teacher hands out the report cards." },
  ],
  班级: [
    { zh: "我们的班级很友好。", en: "Our class is friendly." },
    { zh: "班级活动在周五。", en: "The class activity is on Friday." },
  ],
  任务: [
    { zh: "我完成了今天的任务。", en: "I finished today's task." },
    { zh: "老师给我们一个小任务。", en: "The teacher gives us a small task." },
  ],
  真假: [
    { zh: "请判断这句话的真假。", en: "Please decide whether this sentence is true or false." },
    { zh: "这个游戏要分清真假。", en: "This game asks us to tell true from false." },
  ],
  课程: [
    { zh: "中文课程很有趣。", en: "The Chinese lesson is interesting." },
    { zh: "今天的课程有故事。", en: "Today's lesson has a story." },
  ],
  学校: [
    { zh: "我每天去学校。", en: "I go to school every day." },
    { zh: "学校门口有一棵树。", en: "There is a tree at the school gate." },
  ],
  测试: [
    { zh: "今天有中文测试。", en: "There is a Chinese quiz today." },
    { zh: "测试前，我认真复习。", en: "Before the quiz, I revise carefully." },
  ],
  帮助: [
    { zh: "谢谢你的帮助。", en: "Thank you for your help." },
    { zh: "有了老师的帮助，我进步了。", en: "With the teacher's help, I improved." },
  ],
  会说: [
    { zh: "妹妹会说中文。", en: "My younger sister can speak Chinese." },
    { zh: "他会说自己的名字。", en: "He can say his own name." },
  ],
  来回: [
    { zh: "小车在路上来回开。", en: "The small car goes back and forth on the road." },
    { zh: "他来回走了两次。", en: "He walked back and forth twice." },
  ],
  给你: [
    { zh: "这本书给你。", en: "This book is for you." },
    { zh: "我把铅笔给你。", en: "I give the pencil to you." },
  ],
  给我: [
    { zh: "老师把本子给我。", en: "The teacher gives the notebook to me." },
    { zh: "请把那支笔给我。", en: "Please give that pen to me." },
  ],
  动作: [
    { zh: "这个动作很简单。", en: "This action is simple." },
    { zh: "老师示范新的动作。", en: "The teacher demonstrates the new action." },
  ],
  运动: [
    { zh: "放学后，我去运动。", en: "After school, I exercise." },
    { zh: "运动让身体更健康。", en: "Exercise makes the body healthier." },
  ],
  游乐: [
    { zh: "周末，我们去游乐场玩。", en: "On the weekend, we go to the playground to play." },
    { zh: "孩子们在游乐园游乐。", en: "The children play at the amusement park." },
  ],
  认识: [
    { zh: "我认识这位新同学。", en: "I know this new classmate." },
    { zh: "我认识这个汉字。", en: "I recognise this Chinese character." },
  ],
  确认: [
    { zh: "请确认答案是否正确。", en: "Please check whether the answer is correct." },
    { zh: "我确认书包里有课本。", en: "I check that the textbook is in my school bag." },
  ],
  交给: [
    { zh: "请把作业交给老师。", en: "Please hand your homework to the teacher." },
    { zh: "我把本子交给同桌。", en: "I hand the notebook to my desk mate." },
  ],
  看见: [
    { zh: "我看见一只小鸟。", en: "I see a bird." },
    { zh: "我看见老师走进教室。", en: "I see the teacher walk into the classroom." },
  ],
  出来: [
    { zh: "太阳出来了。", en: "The sun has come out." },
    { zh: "下课后，同学们出来玩。", en: "After class, the classmates come out to play." },
  ],
  进去: [
    { zh: "门开了，我们进去。", en: "The door opens, and we go in." },
    { zh: "请从正门进去。", en: "Please go in through the front door." },
  ],
  进入: [
    { zh: "上课铃响了，我们进入教室。", en: "The class bell rings, and we enter the classroom." },
    { zh: "请安静地进入图书馆。", en: "Please enter the library quietly." },
  ],
  走开: [
    { zh: "车来了，请走开一点。", en: "The car is coming, so please move away a little." },
    { zh: "小狗从门口走开了。", en: "The dog walked away from the door." },
  ],
  穿上: [
    { zh: "天冷了，请穿上外衣。", en: "It is cold, so please put on a coat." },
    { zh: "妹妹穿上新鞋。", en: "My younger sister puts on new shoes." },
  ],
  穿过: [
    { zh: "我们穿过操场去教室。", en: "We pass through the playground to the classroom." },
    { zh: "小路穿过树林。", en: "The small path passes through the woods." },
  ],
  眼看: [
    { zh: "我眼看着飞机飞走。", en: "I watch the plane fly away." },
    { zh: "眼看要下雨了。", en: "It looks as if it is about to rain." },
  ],
  知道: [
    { zh: "我知道这个字怎么读。", en: "I know how to read this character." },
    { zh: "我知道答案在哪里。", en: "I know where the answer is." },
  ],
  能够: [
    { zh: "我能够自己读这个句子。", en: "I can read this sentence by myself." },
    { zh: "认真练习后，我能够写这个字。", en: "After careful practice, I can write this character." },
  ],
  想要: [
    { zh: "我想要一本新书。", en: "I want a new book." },
    { zh: "妹妹想要一杯水。", en: "My younger sister wants a cup of water." },
  ],
  睡觉: [
    { zh: "晚上九点，我准备睡觉。", en: "At nine in the evening, I get ready to sleep." },
    { zh: "弟弟睡觉前听故事。", en: "My younger brother listens to a story before sleeping." },
  ],
  叫做: [
    { zh: "这个地方叫做学校。", en: "This place is called a school." },
    { zh: "这本书叫做《春天》。", en: "This book is called Spring." },
  ],
  午睡: [
    { zh: "午饭后，弟弟午睡。", en: "After lunch, my younger brother takes a nap." },
    { zh: "妹妹午睡了一会儿。", en: "My younger sister took a short nap." },
  ],
  放下: [
    { zh: "进教室后，我放下书包。", en: "After entering the classroom, I put down my school bag." },
    { zh: "请先放下铅笔。", en: "Please put down the pencil first." },
  ],
  错过: [
    { zh: "我不想错过中文课。", en: "I do not want to miss Chinese class." },
    { zh: "他错过了早上的巴士。", en: "He missed the morning bus." },
  ],
  贴纸: [
    { zh: "我把贴纸贴在本子上。", en: "I put a sticker in my notebook." },
    { zh: "老师在作业上贴了贴纸。", en: "The teacher put a sticker on the homework." },
  ],
  了不起: [
    { zh: "你能读完这本书，真了不起。", en: "It is amazing that you can finish reading this book." },
    { zh: "她一个人完成任务，真了不起。", en: "It is amazing that she finished the task by herself." },
    { zh: "弟弟自己系好鞋带，真了不起。", en: "It is amazing that my younger brother tied his shoelaces by himself." },
  ],
  有礼: [
    { zh: "他说话很有礼。", en: "He speaks politely." },
    { zh: "有礼的孩子会说谢谢。", en: "A polite child says thank you." },
  ],
  很好: [
    { zh: "你的中文说得很好。", en: "You speak Chinese very well." },
    { zh: "这次作业写得很好。", en: "This homework is written very well." },
  ],
  努力: [
    { zh: "我努力练习写汉字。", en: "I work hard to practise writing Chinese characters." },
    { zh: "我努力完成中文作业。", en: "I work hard to finish my Chinese homework." },
  ],
  奖品: [
    { zh: "比赛结束后，他得到奖品。", en: "After the contest, he receives a prize." },
    { zh: "桌上放着小奖品。", en: "There are small prizes on the table." },
  ],
  中奖: [
    { zh: "他在学校活动中中奖了。", en: "He won a prize in the school activity." },
    { zh: "妹妹中奖后很开心。", en: "My younger sister is happy after winning a prize." },
  ],
  鼓励: [
    { zh: "老师鼓励我继续练习。", en: "The teacher encourages me to keep practising." },
    { zh: "妈妈的鼓励让我更勇敢。", en: "Mum's encouragement makes me braver." },
  ],
  激励: [
    { zh: "老师的话激励我继续练习。", en: "The teacher's words encourage me to keep practising." },
    { zh: "这个故事激励我努力学习。", en: "This story motivates me to study hard." },
  ],
  贴画: [
    { zh: "我把贴画贴在本子上。", en: "I put the sticker picture in my notebook." },
    { zh: "这张贴画很可爱。", en: "This sticker picture is cute." },
  ],
  都对: [
    { zh: "我的答案都对。", en: "All my answers are correct." },
    { zh: "这三道题都对。", en: "All three questions are correct." },
  ],
  礼物: [
    { zh: "生日那天，我收到礼物。", en: "On my birthday, I receive a gift." },
    { zh: "这本书是妈妈的礼物。", en: "This book is Mum's gift." },
  ],
  对错: [
    { zh: "做完题后，我检查对错。", en: "After finishing the questions, I check what is right and wrong." },
    { zh: "老师帮我们分清对错。", en: "The teacher helps us tell right from wrong." },
  ],
  正确: [
    { zh: "这个答案是正确的。", en: "This answer is correct." },
    { zh: "请用正确的读音读字。", en: "Please read the character with the correct pronunciation." },
  ],
  安全: [
    { zh: "过马路时要注意安全。", en: "Pay attention to safety when crossing the road." },
    { zh: "安全第一，大家慢慢走。", en: "Safety comes first, so everyone walks slowly." },
    { zh: "学校门口有安全提示。", en: "There is a safety notice at the school gate." },
  ],
  体力: [
    { zh: "跑步需要很多体力。", en: "Running needs a lot of energy." },
    { zh: "休息以后，我恢复了体力。", en: "After resting, I got my energy back." },
  ],
  头上: [
    { zh: "妹妹头上戴着红花。", en: "My younger sister wears a red flower on her head." },
    { zh: "小鸟停在树头上。", en: "The bird stops at the top of the tree." },
  ],
  努嘴: [
    { zh: "妹妹努嘴说她不想走。", en: "My younger sister pouts and says she does not want to go." },
    { zh: "弟弟努嘴指着桌上的糖。", en: "My younger brother pouts and points at the candy on the table." },
  ],
  纸张: [
    { zh: "老师发给我们几张纸。", en: "The teacher gives us some sheets of paper." },
    { zh: "这些纸张放在桌上。", en: "These sheets of paper are on the table." },
  ],
  想法: [
    { zh: "我有一个新想法。", en: "I have a new idea." },
    { zh: "这个想法很有趣。", en: "This idea is interesting." },
  ],
  错题: [
    { zh: "我认真改正错题。", en: "I carefully correct the wrong question." },
    { zh: "错题旁边有老师的说明。", en: "There is the teacher's note beside the wrong question." },
  ],
  千米: [
    { zh: "学校离家一千米。", en: "The school is one kilometre from home." },
    { zh: "我们今天走了一千米。", en: "We walked one kilometre today." },
  ],
  五本: [
    { zh: "我有五本中文书。", en: "I have five Chinese books." },
    { zh: "桌上放着五本书。", en: "There are five books on the table." },
  ],
  十分: [
    { zh: "这本故事书十分有趣。", en: "This storybook is very interesting." },
    { zh: "她写字十分认真。", en: "She writes characters very carefully." },
  ],
  很多: [
    { zh: "教室里有很多学生。", en: "There are many students in the classroom." },
    { zh: "书包里有很多书。", en: "There are many books in the school bag." },
  ],
  每个: [
    { zh: "每个学生都有一本书。", en: "Each student has a book." },
    { zh: "老师检查每个答案。", en: "The teacher checks each answer." },
  ],
  全部: [
    { zh: "我把作业全部写完了。", en: "I finished all my homework." },
    { zh: "这些书全部放进书包。", en: "All these books go into the school bag." },
  ],
  等级: [
    { zh: "这个游戏有不同等级。", en: "This game has different levels." },
    { zh: "阅读练习分成三个等级。", en: "The reading practice is divided into three levels." },
  ],
  认真: [
    { zh: "我认真写每一个字。", en: "I write every character carefully." },
    { zh: "我认真听老师说话。", en: "I listen to the teacher carefully." },
  ],
  成长: [
    { zh: "我在学习中慢慢成长。", en: "I grow little by little through learning." },
    { zh: "孩子在阅读中成长。", en: "The child grows through reading." },
  ],
  全对: [
    { zh: "我的答案全对。", en: "All my answers are correct." },
    { zh: "这次听写我全对。", en: "I got everything right in this dictation." },
  ],
  早安: [
    { zh: "见到老师，我说早安。", en: "When I see the teacher, I say good morning." },
    { zh: "早安，今天我们一起读书。", en: "Good morning, today we read together." },
  ],
  晚安: [
    { zh: "睡觉前，我对妈妈说晚安。", en: "Before sleeping, I say good night to Mum." },
    { zh: "弟弟说晚安后去睡觉。", en: "My younger brother says good night and goes to sleep." },
  ],
  谢礼: [
    { zh: "这束花是一份谢礼。", en: "This bunch of flowers is a thank-you gift." },
    { zh: "他准备了一份小谢礼。", en: "He prepared a small thank-you gift." },
  ],
  自我: [
    { zh: "画画时，我喜欢表达自我。", en: "When I draw, I like to express myself." },
    { zh: "上台前，我先做自我介绍。", en: "Before going on stage, I introduce myself." },
  ],
  澳洲人: [
    { zh: "这位澳洲人会说中文。", en: "This Australian person can speak Chinese." },
    { zh: "我的朋友是澳洲人。", en: "My friend is Australian." },
  ],
  我们: [
    { zh: "我们一起读中文书。", en: "We read Chinese books together." },
    { zh: "放学后，我们一起回家。", en: "After school, we go home together." },
  ],
  你们: [
    { zh: "你们今天学了什么？", en: "What did you all learn today?" },
    { zh: "老师问你们准备好了吗？", en: "The teacher asks whether you all are ready." },
  ],
  他们: [
    { zh: "他们在操场上跑步。", en: "They run on the playground." },
    { zh: "他们一起读故事。", en: "They read a story together." },
  ],
  你的: [
    { zh: "这是你的书吗？", en: "Is this your book?" },
    { zh: "你的名字写得很好。", en: "Your name is written very well." },
  ],
  买菜: [
    { zh: "周末，我和妈妈去买菜。", en: "On the weekend, Mum and I buy vegetables." },
    { zh: "爸爸下班后去买菜。", en: "Dad buys vegetables after work." },
  ],
  卖菜: [
    { zh: "市场里有人卖菜。", en: "Someone sells vegetables at the market." },
    { zh: "这家小店卖菜。", en: "This small shop sells vegetables." },
  ],
  爱吃: [
    { zh: "弟弟爱吃苹果。", en: "My younger brother likes eating apples." },
    { zh: "我爱吃妈妈做的面。", en: "I like eating the noodles Mum makes." },
  ],
  喝茶: [
    { zh: "妈妈喜欢喝茶。", en: "Mum likes drinking tea." },
    { zh: "饭后，爷爷喝茶。", en: "After the meal, Grandpa drinks tea." },
  ],
  喝奶: [
    { zh: "弟弟早上喝奶。", en: "My younger brother drinks milk in the morning." },
    { zh: "睡觉前，妹妹喝奶。", en: "Before sleeping, my younger sister drinks milk." },
  ],
  做饭: [
    { zh: "爸爸今天做饭。", en: "Dad cooks today." },
    { zh: "妈妈教我做饭。", en: "Mum teaches me to cook." },
  ],
  热水: [
    { zh: "杯子里有热水。", en: "There is hot water in the cup." },
    { zh: "请小心热水。", en: "Please be careful with the hot water." },
  ],
  茶水: [
    { zh: "桌上有一杯茶水。", en: "There is a cup of tea on the table." },
    { zh: "老师倒了一杯茶水。", en: "The teacher pours a cup of tea." },
  ],
  牛羊: [
    { zh: "草地上有牛羊。", en: "There are cows and sheep on the grass." },
    { zh: "农场里养着牛羊。", en: "The farm keeps cows and sheep." },
  ],
  老师: [
    { zh: "老师在教室里讲故事。", en: "The teacher tells a story in the classroom." },
    { zh: "我们向老师问好。", en: "We greet the teacher." },
    { zh: "老师帮助我读准字音。", en: "The teacher helps me read the character sound correctly." },
  ],
  同学: [
    { zh: "同学们一起读课文。", en: "The classmates read the text together." },
    { zh: "这位同学写字很认真。", en: "This classmate writes characters carefully." },
    { zh: "我和同学一起做练习。", en: "I do the practice exercises with my classmate." },
  ],
  吃水果: [
    { zh: "我每天吃水果。", en: "I eat fruit every day." },
    { zh: "午饭后，妹妹吃水果。", en: "After lunch, my younger sister eats fruit." },
    { zh: "饭后吃水果很好。", en: "Eating fruit after a meal is good." },
  ],
  喝水: [
    { zh: "运动后要喝水。", en: "Drink water after exercise." },
    { zh: "我每天带水去学校喝水。", en: "I take water to school every day to drink." },
    { zh: "天气热时，我们要多喝水。", en: "When the weather is hot, we should drink more water." },
  ],
  同时: [
    { zh: "我们同时举手回答。", en: "We raise our hands to answer at the same time." },
    { zh: "灯和音乐同时开始。", en: "The lights and music start at the same time." },
  ],
  同桌: [
    { zh: "我的同桌很友好。", en: "My desk mate is friendly." },
    { zh: "我和同桌一起读课文。", en: "My desk mate and I read the text together." },
  ],
};

function isWeakSentence(sentence) {
  if (!sentence?.zh || !sentence?.en) return true;
  if (!/[。！？][”"]?$/.test(sentence.zh) || !/[.!?][”"]?$/.test(sentence.en)) return true;
  if (DICTIONARY_FRAGMENT_ZH.test(sentence.zh)) return true;
  if (/".*[\u3400-\u9fff].*"/.test(sentence.en)) return true;
  return WEAK_SENTENCE_ZH.test(sentence.zh) || WEAK_SENTENCE_EN.test(sentence.en);
}

function repairSentence({ char, item, index, usedZh, usedEn }) {
  const word = item.word;
  const meaning = cleanEnglishMeaning(item.en || item.meaningEn);
  const type = item.type || "common";
  const specificTemplates = REPAIR_EXAMPLE_OVERRIDES[word] || [];
  const typeTemplates = SENTENCE_REPAIR_TEMPLATES[type] || SENTENCE_REPAIR_TEMPLATES.common;
  const templates = specificTemplates.length ? [...specificTemplates, ...typeTemplates] : typeTemplates;
  const offset = hashWord(`${char}${word}${index}`);
  for (let attempt = 0; attempt < templates.length; attempt += 1) {
    const template = templates[(offset + attempt) % templates.length];
    const sentence = {
      zh: typeof template.zh === "function" ? template.zh({ char, word, meaning }) : template.zh,
      en: typeof template.en === "function" ? template.en({ char, word, meaning }) : template.en,
    };
    if (
      sentence.zh.includes(char) &&
      sentence.zh.includes(word) &&
      !usedZh.has(sentence.zh) &&
      !usedEn.has(sentence.en) &&
      !isWeakSentence(sentence)
    ) {
      return sentence;
    }
  }
  for (const template of FINAL_FALLBACK_SCENES) {
    const sentence = {
      zh: template.zh({ char, word, meaning }),
      en: template.en({ char, word, meaning }),
    };
    if (
      sentence.zh.includes(char) &&
      sentence.zh.includes(word) &&
      !usedZh.has(sentence.zh) &&
      !usedEn.has(sentence.en) &&
      !isWeakSentence(sentence)
    ) {
      return sentence;
    }
  }
  throw new Error(`Could not repair sentence for ${char}:${word}`);
}

function sentenceForDatabase({ char, item, index, usedZh, usedEn }) {
  const current = { zh: item.exampleZh, en: item.exampleEn };
  if (
    !isWeakSentence(current) &&
    current.zh.includes(char) &&
    current.zh.includes(item.word) &&
    !usedZh.has(current.zh) &&
    !usedEn.has(current.en)
  ) {
    usedZh.add(current.zh);
    usedEn.add(current.en);
    return current;
  }

  const repaired = repairSentence({ char, item, index, usedZh, usedEn });
  usedZh.add(repaired.zh);
  usedEn.add(repaired.en);
  return repaired;
}

function selectedCommonWords() {
  const candidates = allWordCandidates();
  const selected = candidates.slice(0, COMMON_WORD_TARGET);
  if (selected.length !== COMMON_WORD_TARGET) {
    throw new Error(`Expected ${COMMON_WORD_TARGET} common words, got ${selected.length}.`);
  }
  return selected;
}

function teachingWordsForChars() {
  const candidates = allWordCandidates();

  const chars = [...CHAR_LIST];
  const coverage = new Map(chars.map((char) => [char, 0]));
  const selected = [];
  const selectedWords = new Set();

  function wordChars(word) {
    return chars.filter((char) => word.includes(char));
  }

  function addSelected(item) {
    if (selectedWords.has(item.word)) return;
    selectedWords.add(item.word);
    selected.push(item);
    wordChars(item.word).forEach((char) => coverage.set(char, coverage.get(char) + 1));
  }

  chars.forEach((char) => {
    while (coverage.get(char) < 3) {
      const best = candidates
        .filter((item) => item.word.includes(char) && !selectedWords.has(item.word))
        .map((item) => ({
          item,
          score: wordChars(item.word).filter((wordChar) => coverage.get(wordChar) < 3).length,
        }))
        .sort((a, b) => b.score - a.score || a.item.word.length - b.item.word.length)[0]?.item;
      if (!best) break;
      addSelected(best);
    }
  });

  for (const item of candidates) {
    if (selected.length >= COMMON_WORD_TARGET) break;
    addSelected(item);
  }

  const undercovered = chars.filter((char) => coverage.get(char) < 3);
  if (undercovered.length) {
    throw new Error(`Characters need at least 3 words: ${undercovered.join("")}`);
  }

  return selected;
}

function sqlValue(value) {
  return `'${String(value ?? "").replaceAll("'", "''")}'`;
}

async function seedSqliteDatabase({ xinhuaMap = new Map(), onlineXinhuaMap = new Map() } = {}) {
  await mkdir(new URL("../data", import.meta.url), { recursive: true });
  await rm(SQLITE_DB_PATH, { force: true });

  const words = selectedCommonWords();
  const teachingWords = teachingWordsForChars();
  const candidateByWord = new Map(allWordCandidates().map((item) => [item.word, item]));
  const chars = [...CHAR_LIST];
  const usedSentenceZh = new Set();
  const usedSentenceEn = new Set();
  const statements = [
    "PRAGMA foreign_keys = ON;",
    "CREATE TABLE metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL);",
    "CREATE TABLE words (id INTEGER PRIMARY KEY, word TEXT NOT NULL UNIQUE, meaning_en TEXT NOT NULL, category TEXT NOT NULL, example_zh TEXT NOT NULL, example_en TEXT NOT NULL);",
    "CREATE TABLE character_words (char TEXT NOT NULL, sort_order INTEGER NOT NULL, word TEXT NOT NULL, meaning_en TEXT NOT NULL, PRIMARY KEY (char, sort_order));",
    "CREATE TABLE character_sentences (char TEXT NOT NULL, sort_order INTEGER NOT NULL, zh TEXT NOT NULL, en TEXT NOT NULL, PRIMARY KEY (char, sort_order));",
    `INSERT INTO metadata VALUES ('common_word_count', ${sqlValue(words.length)});`,
    `INSERT INTO metadata VALUES ('character_count', ${sqlValue(chars.length)});`,
  ];

  words.forEach((item, index) => {
    statements.push(
      `INSERT INTO words VALUES (${index + 1}, ${sqlValue(item.word)}, ${sqlValue(
        item.en
      )}, ${sqlValue(item.type)}, ${sqlValue(item.exampleZh)}, ${sqlValue(item.exampleEn)});`
    );
  });

  chars.forEach((char) => {
    const overrideWords = BEGINNER_OVERRIDES[char]?.words?.map((word) => {
      const base = candidateByWord.get(word.word);
      return normalizeWord({
        ...base,
        word: word.word,
        en: word.meaningEn,
        type: word.type || base?.type || "common",
        exampleZh: word.exampleZh || base?.exampleZh,
        exampleEn: word.exampleEn || base?.exampleEn,
      });
    });
    const fallbackMatches =
      overrideWords?.length >= 3 ? overrideWords.slice(0, 3) : teachingWords.filter((item) => item.word.includes(char)).slice(0, 3);
    const xinhua = xinhuaMap.get(char);
    const onlineXinhua = onlineXinhuaMap.get(char);
    const phraseMap = mergePhraseSources(
      parseXinhuaMorePhrases(xinhua?.more, char),
      onlineXinhua?.phrases || []
    );
    const dictionaryMatches = dictionaryWordRows(char, fallbackMatches, phraseMap);
    const matches =
      dictionaryMatches.length >= 3
        ? dictionaryMatches.map((item) => ({
            word: item.word,
            en: item.meaningEn,
            type: item.type,
            exampleZh: item.sentence.zh,
            exampleEn: item.sentence.en,
          }))
        : fallbackMatches;
    if (matches.length !== 3) {
      throw new Error(`Expected 3 words for ${char}, got ${matches.length}`);
    }
    matches.forEach((item, index) => {
      const sentence = sentenceForDatabase({
        char,
        item,
        index,
        usedZh: usedSentenceZh,
        usedEn: usedSentenceEn,
      });
      statements.push(
        `INSERT INTO character_words VALUES (${sqlValue(char)}, ${index + 1}, ${sqlValue(
          item.word
        )}, ${sqlValue(item.en)});`
      );
      statements.push(
        `INSERT INTO character_sentences VALUES (${sqlValue(char)}, ${index + 1}, ${sqlValue(
          sentence.zh
        )}, ${sqlValue(sentence.en)});`
      );
    });
  });

  execFileSync("sqlite3", [SQLITE_DB_PATH], {
    input: statements.join("\n"),
    maxBuffer: 20 * 1024 * 1024,
  });
}

function sqliteJson(query) {
  const output = execFileSync("sqlite3", ["-json", SQLITE_DB_PATH, query], {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  }).trim();
  return output ? JSON.parse(output) : [];
}

function readTeachingData() {
  const wordRows = sqliteJson("SELECT id, word, meaning_en AS meaningEn, category, example_zh AS exampleZh, example_en AS exampleEn FROM words ORDER BY id;");
  const charWordRows = sqliteJson(
    "SELECT char, sort_order AS sortOrder, word, meaning_en AS meaningEn FROM character_words ORDER BY char, sort_order;"
  );
  const sentenceRows = sqliteJson("SELECT char, sort_order AS sortOrder, zh, en FROM character_sentences ORDER BY char, sort_order;");

  const wordsByChar = new Map();
  charWordRows.forEach((row) => {
    if (!wordsByChar.has(row.char)) wordsByChar.set(row.char, []);
    wordsByChar.get(row.char).push({ word: row.word, meaningEn: row.meaningEn });
  });

  const sentencesByChar = new Map();
  sentenceRows.forEach((row) => {
    if (!sentencesByChar.has(row.char)) sentencesByChar.set(row.char, []);
    sentencesByChar.get(row.char).push({ zh: row.zh, en: row.en });
  });

  return { wordRows, wordsByChar, sentencesByChar };
}

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

function assertUnique300() {
  const chars = [...CHAR_LIST];
  const unique = new Set(chars);
  if (chars.length !== 300 || unique.size !== 300) {
    throw new Error(`Expected 300 unique chars, got ${chars.length}/${unique.size}`);
  }
}

function mixedLessonChars(chars, lessonSize = 5) {
  const lessonCount = chars.length / lessonSize;
  if (!Number.isInteger(lessonCount)) {
    throw new Error(`Character count must divide evenly by ${lessonSize}`);
  }

  const bands = Array.from({ length: lessonSize }, (_, band) =>
    chars.slice(band * lessonCount, (band + 1) * lessonCount)
  );

  const mixed = [];
  for (let lesson = 0; lesson < lessonCount; lesson += 1) {
    const bandOrder =
      lesson % 2 === 0
        ? [0, 2, 4, 1, 3]
        : [1, 3, 0, 4, 2];
    bandOrder.forEach((band) => mixed.push(bands[band][lesson]));
  }
  return mixed;
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status}: ${url}`);
  }
  return response.json();
}

async function getText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status}: ${url}`);
  }
  return response.text();
}

function parseLooseJsonLines(text) {
  const body = text.trim().replace(/,\s*$/, "");
  return JSON.parse(`[${body}]`);
}

function cleanPinyin(value) {
  if (!value) return "";
  return String(value).replaceAll("ɡ", "g").replace(/\s+/g, " ").trim();
}

function compactDefinition(definition = "") {
  const first = definition
    .split(/;|\n/)
    .map((part) => part.trim())
    .find(Boolean);
  return (first || definition || "common Chinese character")
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\s+/g, " ")
    .replace(/^variant of /i, "")
    .slice(0, 120);
}

function sourceTags({ common, xinhua, make, onlineXinhua }) {
  const tags = [];
  if (onlineXinhua) tags.push("online-xinhua");
  if (xinhua) tags.push("xinhua");
  if (common) tags.push("common-300");
  if (make) tags.push("learner-def");
  return tags;
}

assertUnique300();
const COURSE_CHARS = mixedLessonChars([...CHAR_LIST]);

console.log("Fetching dictionary data...");
const [xinhuaRows, commonText, makeText] = await Promise.all([
  getJson(SOURCES.xinhua),
  getText(SOURCES.commonBase),
  getText(SOURCES.makeMeAHanzi),
]);

const xinhuaMap = new Map(xinhuaRows.map((row) => [row.word, row]));
const commonMap = new Map(parseLooseJsonLines(commonText).map((row) => [row.char, row]));
const makeMap = new Map(
  makeText
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line))
    .map((row) => [row.character, row])
);

console.log("Fetching online Xinhua dictionary pages...");
const onlineXinhuaMap = await fetchOnlineXinhuaPages(COURSE_CHARS);

console.log("Seeding SQLite teaching database...");
await seedSqliteDatabase({ xinhuaMap, onlineXinhuaMap });
const teachingData = readTeachingData();

const entries = COURSE_CHARS.map((char, index) => {
  const common = commonMap.get(char);
  const xinhua = xinhuaMap.get(char);
  const onlineXinhua = onlineXinhuaMap.get(char);
  const make = makeMap.get(char);
  const override = { ...(BEGINNER_OVERRIDES[char] || {}), ...(TEACHING_OVERRIDES[char] || {}) };
  const words = teachingData.wordsByChar.get(char);
  const sentences = teachingData.sentencesByChar.get(char);
  if (!words || words.length !== 3) {
    throw new Error(`SQLite needs exactly 3 words for ${char}.`);
  }
  if (!sentences || sentences.length !== 3) {
    throw new Error(`SQLite needs exactly 3 sentences for ${char}.`);
  }
  const pinyin = cleanPinyin(
    override?.pinyin || common?.pinyin?.[0] || xinhua?.pinyin || make?.pinyin?.[0] || ""
  );
  const allPinyin = [
    override?.pinyin,
    ...(common?.pinyin || []),
    ...(xinhua?.pinyin ? [xinhua.pinyin] : []),
    ...(make?.pinyin || []),
  ]
    .map(cleanPinyin)
    .filter(Boolean);
  const uniquePinyin = [...new Set(allPinyin)];
  const meaningEn =
    onlineXinhua?.english ||
    parseXinhuaMoreEnglish(xinhua?.more) ||
    override?.meaningEn ||
    compactDefinition(make?.definition || words[0]?.meaningEn);
  const meaningZh = onlineXinhua?.basicDefinitions?.length
    ? compactMeaningZh(onlineXinhua.basicDefinitions, words)
    : override?.meaningZh ||
      `常用汉字，常见于“${words[0].word}、${words[1].word}、${words[2].word}”等词语。`;

  return {
    id: index + 1,
    char,
    pinyin,
    pinyinAlt: uniquePinyin.slice(0, 4),
    meaningEn,
    meaningZh,
    radical: override?.radical || common?.radicals || xinhua?.radicals || make?.radical || "",
    strokes: Number(common?.strokes || xinhua?.strokes || make?.matches?.length || 0),
    structure: STRUCTURE_LABELS[common?.structure] || "standard character",
    words,
    sentence: sentences[0],
    sentences,
    etymologyHint: make?.etymology?.hint || "",
    sourceTags: sourceTags({
      common,
      xinhua,
      make,
      onlineXinhua: onlineXinhua?.english || onlineXinhua?.basicDefinitions?.length,
    }),
  };
});

function assertDataQuality(entries, teachingData) {
  const placeholderWords = [];
  const templateSentences = [];
  const badSentenceCounts = [];
  const badWordCounts = [];
  const missingSentenceChars = [];
  const missingSentenceWords = [];
  const disallowedWords = [];
  const suspiciousMeaningZh = [];
  const duplicateSentenceZh = [];
  const duplicateSentenceEn = [];
  const seenSentenceZh = new Set();
  const seenSentenceEn = new Set();

  entries.forEach((entry) => {
    if (entry.words.length !== 3) badWordCounts.push(entry.char);
    if (!entry.sentences || entry.sentences.length !== 3) badSentenceCounts.push(entry.char);
    entry.words.forEach((word) => {
      if (DISALLOWED_TEACHING_WORDS.has(word.word)) {
        disallowedWords.push(`${entry.char}:${word.word}`);
      }
      if (
        word.word === `${entry.char}卡` ||
        /flashcard|sound of/i.test(word.meaningEn)
      ) {
        placeholderWords.push(`${entry.char}:${word.word}`);
      }
    });
    (entry.sentences || []).forEach((sentence, index) => {
      const word = entry.words[index]?.word;
      if (/^Try it:/i.test(sentence.en) || /^我会读“.+”这个词。$/.test(sentence.zh) || isWeakSentence(sentence)) {
        templateSentences.push(`${entry.char}:${sentence.zh}`);
      }
      if (!sentence.zh.includes(entry.char)) missingSentenceChars.push(`${entry.char}:${sentence.zh}`);
      if (word && !sentence.zh.includes(word)) missingSentenceWords.push(`${entry.char}:${word}:${sentence.zh}`);
      if (seenSentenceZh.has(sentence.zh)) duplicateSentenceZh.push(`${entry.char}:${sentence.zh}`);
      seenSentenceZh.add(sentence.zh);
      if (seenSentenceEn.has(sentence.en)) duplicateSentenceEn.push(`${entry.char}:${sentence.en}`);
      seenSentenceEn.add(sentence.en);
    });
    if (/(甲骨|小篆|会意|象形|形声|从.+声|搜索与|\([^)]+$)/.test(entry.meaningZh)) {
      suspiciousMeaningZh.push(entry.char);
    }
  });

  if (teachingData.wordRows.length !== COMMON_WORD_TARGET) {
    throw new Error(`SQLite word count mismatch: ${teachingData.wordRows.length}`);
  }
  if (placeholderWords.length) throw new Error(`Placeholder words found: ${placeholderWords.slice(0, 20).join(", ")}`);
  if (disallowedWords.length) throw new Error(`Disallowed words found: ${disallowedWords.slice(0, 20).join(", ")}`);
  if (templateSentences.length) throw new Error(`Template sentences found: ${templateSentences.slice(0, 20).join(", ")}`);
  if (badWordCounts.length) throw new Error(`Entries without exactly 3 words: ${badWordCounts.join("")}`);
  if (badSentenceCounts.length) throw new Error(`Entries without exactly 3 sentences: ${badSentenceCounts.join("")}`);
  if (missingSentenceChars.length) throw new Error(`Sentences missing current char: ${missingSentenceChars.slice(0, 20).join(", ")}`);
  if (missingSentenceWords.length) throw new Error(`Sentences missing teaching word: ${missingSentenceWords.slice(0, 20).join(", ")}`);
  if (duplicateSentenceZh.length) throw new Error(`Duplicate Chinese sentences: ${duplicateSentenceZh.slice(0, 20).join(", ")}`);
  if (duplicateSentenceEn.length) throw new Error(`Duplicate English sentences: ${duplicateSentenceEn.slice(0, 20).join(", ")}`);
  if (suspiciousMeaningZh.length) throw new Error(`Suspicious meaningZh values: ${suspiciousMeaningZh.join("")}`);
}

assertDataQuality(entries, teachingData);

const missing = entries.filter((entry) => !entry.pinyin || !entry.strokes);
if (missing.length) {
  console.warn(
    `Warning: ${missing.length} entries miss pinyin or strokes: ${missing
      .map((entry) => entry.char)
      .join("")}`
  );
}

const payload = `// Generated by tools/build-data.mjs. Do not edit by hand.
window.CHINESE_STUDY_DATA = ${JSON.stringify(
  {
    generatedAt: "2026-04-27",
    scope: "300 beginner-friendly common Simplified Chinese characters with 500 SQLite-backed common words",
    lessonSize: 5,
    commonWordCount: teachingData.wordRows.length,
    sources: [
      {
        name: "汉文学网在线新华字典",
        role: "web-sourced character explanations, English glosses, and common phrase examples",
        url: "https://zd.hwxnet.com/",
      },
      {
        name: "pwxcoo/chinese-xinhua",
        role: "Xinhua-style character pinyin, radicals, strokes and common phrase English glosses",
        url: "https://github.com/pwxcoo/chinese-xinhua",
      },
      {
        name: "mapull/chinese-dictionary",
        role: "common-character base metadata and stroke counts",
        url: "https://github.com/mapull/chinese-dictionary",
      },
      {
        name: "Make Me a Hanzi",
        role: "learner-friendly English definitions and component hints",
        url: "https://github.com/skishore/makemeahanzi",
      },
      {
        name: "Hanzi Writer",
        role: "runtime stroke-order animation data",
        url: "https://chanind.github.io/hanzi-writer/",
      },
    ],
    entries,
  },
  null,
  2
)};
`;

await writeFile(new URL("../data.js", import.meta.url), payload, "utf8");
console.log(`Wrote data.js with ${entries.length} characters.`);
