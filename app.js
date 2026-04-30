const DATA = window.CHINESE_STUDY_DATA;
const STORAGE_KEY = "chinese-quest-300-state-v2";
const ACTIVE_USER_KEY = "chinese-quest-active-user-v1";
const USER_PROFILES_KEY = "chinese-quest-user-profiles-v1";
const CUSTOM_ENTRIES_KEY = "chinese-quest-custom-entries-v1";
const BASE_ENTRIES = Array.isArray(DATA.entries) ? DATA.entries : [];
const IDIOMS = Array.isArray(DATA.idioms) ? DATA.idioms : [];
const LESSON_SIZE = DATA.lessonSize || 5;
const XP_PER_LEVEL = 120;
const STICKERS = ["星", "中", "好", "学", "棒", "✓", "5"];
const HOME_ANIMAL_SOUND_COOLDOWN_MS = 360;
const USER_PROFILES = [
  { id: "xiaoming", name: "小明", mark: "明" },
  { id: "xiaohong", name: "小红", mark: "红" },
  { id: "xiaohua", name: "小华", mark: "华" },
  { id: "xiaoli", name: "小丽", mark: "丽" },
  { id: "xiaoqiang", name: "小强", mark: "强" },
  { id: "xiaomei", name: "小美", mark: "美" },
  { id: "xiaojie", name: "小杰", mark: "杰" },
  { id: "xiaolan", name: "小兰", mark: "兰" },
  { id: "xiaoyu", name: "小宇", mark: "宇" },
];
const UI_LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "bilingual", label: "中文 + English" },
];
const UI_SKIN_OPTIONS = [
  { value: "classic", labelKey: "skinClassic" },
  { value: "anime", labelKey: "skinAnime" },
  { value: "candy", labelKey: "skinCandy" },
  { value: "forest", labelKey: "skinForest" },
  { value: "ocean", labelKey: "skinOcean" },
];
const UI_LANG_ATTR = {
  en: "en",
  zh: "zh-Hans",
  ja: "ja",
  ko: "ko",
  bilingual: "en",
};
const UI_DATE_LOCALE = {
  en: "en-AU",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  bilingual: "en-AU",
};
const UI_TEXT = {
  en: {
    brandTagline: "Five characters per lesson",
    loginTitle: "Choose your learner",
    loginUsers: "learner choices",
    editProfile: "Edit",
    editProfileFor: "Edit {name}'s profile",
    profileEditTitle: "Edit learner profile",
    profileEditHint: "Change the learner name and avatar mark shown on this device.",
    profileNameLabel: "Learner name",
    profileMarkLabel: "Avatar mark",
    profileMarkHint: "Use one Chinese character, letter, number, or emoji.",
    profileSave: "Save profile",
    profileReset: "Reset",
    profileCancel: "Cancel",
    profileSavedToast: "{name}'s profile was saved.",
    profileResetToast: "Profile reset.",
    profileNameRequired: "Enter a learner name.",
    profileMarkRequired: "Enter an avatar mark.",
    loginProgressMeta: "{xp} XP · Level {level} · {lessons} lessons complete",
    lastUser: "Last used",
    currentUser: "Current user",
    switchUser: "Switch user",
    signedInAs: "Current learner: {name}",
    loginToast: "Welcome back, {name}.",
    dailyLesson: "Daily Lesson",
    startToday: "Start today's lesson",
    uiLanguage: "UI language",
    uiLanguageHint: "Choose the display language.",
    uiSkin: "UI skin",
    uiSkinHint: "Switch the homepage color style.",
    skinClassic: "Classic",
    skinAnime: "Anime",
    skinCandy: "Candy",
    skinForest: "Forest",
    skinOcean: "Ocean",
    progressSummary: "progress summary",
    level: "Level",
    xpProgress: "XP progress",
    streak: "Streak",
    chooseLesson: "Choose a lesson",
    start: "Start",
    howToPlay: "How to play",
    howToUse: "how to use",
    closeHowToPlay: "close how to play",
    howToPlayHint: "See how lessons, tests, stickers, and camera writing work.",
    openHowToPlay: "Open guide",
    guideStep1: "<strong>Choose</strong> one lesson.",
    guideStep2: "<strong>Learn</strong> 5 characters with pinyin.",
    guideStep3: "<strong>Listen</strong> and practise stroke order.",
    guideStep4: "<strong>Test</strong> to earn XP and a sticker.",
    cameraGuideAria: "camera tracks a fingertip writing in a square",
    cameraWriting: "Camera writing",
    cameraGuideText: "In a lesson, tap <strong>Camera</strong>. The app follows your fingertip so you can write the character inside the box.",
    home: "Home",
    lesson: "Lesson",
    previousCharacter: "previous character",
    speak: "Speak",
    playing: "Playing",
    nextCharacter: "next character",
    meaning: "Meaning",
    words: "Words",
    sentences: "Sentences",
    strokeOrder: "Stroke Order",
    animate: "Animate",
    trace: "Trace",
    camera: "Camera",
    strokeOrderAnimation: "stroke order animation",
    cameraPractice: "camera writing practice",
    cameraCanvas: "camera writing canvas",
    cameraOff: "Camera off",
    clear: "Clear",
    close: "Close",
    radical: "Radical",
    strokes: "Strokes",
    shape: "Shape",
    coachInitial: "Listen, read, trace, then continue.",
    next: "Next",
    test: "Test",
    result: "Result",
    recentStickers: "recent stickers",
    tryTestAgain: "Try test again",
    nextLesson: "Next lesson",
    contact: "Contact",
    lessonN: "Lesson {n}",
    lessonOption: "Lesson {n}{done}: {chars}",
    startTodayAria: "Start today's Lesson {n}",
    englishLabel: "English",
    pinyinFallback: "pinyin",
    startTest: "Start test",
    characterCount: "Character {current} of {total}.",
    playLabel: "play {label}",
    playingLabel: "Playing {label}.",
    sentenceLabel: "sentence {n}",
    strokesCount: "{char} · {count} strokes",
    pinchToDraw: "Pinch to draw inside the box.",
    touchDraw: "Touch or mouse can draw here.",
    cameraPermission: "Camera permission is needed. Touch or mouse can draw here.",
    cameraNotFound: "No camera was found. Touch or mouse can draw here.",
    cameraUnavailable: "Camera is unavailable. Touch or mouse can draw here.",
    cameraOnTouch: "Camera on. Touch or mouse can draw here.",
    starting: "Starting",
    startingCamera: "Starting camera...",
    showHandPinch: "Show one hand, then pinch to draw.",
    stop: "Stop",
    cameraReady: "Camera writing is ready.",
    speechUnavailable: "Speech is not available on this browser.",
    audioFailed: "Audio did not play. Try again.",
    playingChar: "Playing {char}: {pinyin}.",
    watchStroke: "Watch the stroke order.",
    closeTrace: "Close. Follow the guide line and try again.",
    goodStroke: "Good stroke.",
    traceComplete: "Trace complete: {char}. +4 XP",
    traceMode: "Trace mode is on.",
    whichPinyin: "Which pinyin matches {char}?",
    pickCharacter: "Pick the character for: {meaning}",
    whatMeaning: "What does {char} mean?",
    questionN: "Question {n}",
    correctFeedback: "Correct. {char} is {pinyin}.",
    correctAnswer: "Correct answer: {answer}.",
    showResult: "Show result",
    lessonComplete: "Lesson complete",
    keepPractising: "Keep practising",
    resultEarned: "You earned {xp} XP.",
    resultEarnedSticker: "You earned {xp} XP and today's sticker.",
    resultPractice: "Score {needed} out of {total} to complete this lesson. Review the lesson and try again.",
    resultSaved: "Result saved.",
    tryReview: "Try again after a quick review.",
    dailyToast: "Today's lesson: Lesson {n}.",
    functionMenu: "function menu",
    courseLearning: "Course lessons",
    courseLearningHint: "Choose one lesson from the 800-character course.",
    chooseLessonAction: "Choose a lesson",
    startSelectedLesson: "Start selected lesson",
    openDialogue: "Open dialogue practice",
    openRoleplay: "Open role play",
    practiceModes: "practice modes",
    databaseTotals: "Database totals",
    databaseTotalsHint: "Current totals for characters, words, sentences, and idioms.",
    databaseCharacters: "Characters",
    databaseWords: "Words",
    databaseSentences: "Sentences",
    databaseIdioms: "Idioms",
    dailyDialogue: "Daily dialogue",
    dialogueModeHint: "Choose a topic and hear useful words.",
    rolePlay: "Role play",
    roleplayModeHint: "Read a short scene aloud.",
    practice: "Practice",
    chooseTopic: "Choose a topic",
    readPhrase: "Read phrase",
    vocabulary: "Vocabulary",
    readAll: "Read all",
    chooseScene: "Choose a scene",
    readRoleplayArea: "read role play scene",
    tapToRead: "Tap this card to read aloud.",
    readScene: "Read scene",
    scenarioWords: "Scene words",
    dialogueToast: "Topic: {topic}.",
    roleplayToast: "Scene: {title}.",
    customCharacter: "Add character",
    customCharacterHint: "Add your own course character with words and sentences.",
    openCustomCharacter: "Add a character",
    customCharacterCount: "{count} saved custom characters",
    customCharacterEmpty: "No custom characters yet",
    customCharactersLabel: "Custom database",
    customBackToHome: "Back home",
    customNotice: "Original 800 course characters are locked. Custom characters can be added, but there is no delete action after saving.",
    customBasicTitle: "Character details",
    customCharLabel: "Character",
    customPinyinLabel: "Pinyin",
    customMeaningZhLabel: "Chinese meaning",
    customMeaningEnLabel: "English meaning",
    customRadicalLabel: "Radical (optional)",
    customStrokesLabel: "Strokes (optional)",
    customStructureLabel: "Shape (optional)",
    customWordsTitle: "Words",
    customSentencesTitle: "Sentences",
    customRequiredHint: "3 required",
    customWordLabel: "Word {n}",
    customWordMeaningLabel: "English meaning {n}",
    customSentenceZhLabel: "Sentence {n}",
    customSentenceEnLabel: "English sentence {n}",
    customSave: "Save character",
    customReset: "Clear form",
    customSavedTitle: "Saved custom characters",
    customSavedEmpty: "Saved characters will appear here and in Course lessons.",
    customInvalidChar: "Enter one Chinese character.",
    customMissingRequired: "Please fill in every required field.",
    customWordMustUseChar: "Each word should include {char}.",
    customSentenceMustUseChar: "Each Chinese sentence should include {char}.",
    customOriginalLocked: "{char} is one of the original course characters and cannot be changed.",
    customAlreadyExists: "{char} has already been added.",
    customSavedToast: "{char} was saved to Course lessons.",
    searchTitle: "Search",
    searchModeHint: "Type Chinese to find pinyin, words, sentences, stroke order, and radical.",
    openSearch: "Open search",
    searchLabel: "Course database",
    searchInputLabel: "Chinese search",
    searchPlaceholder: "输入中文，例如：新 / 新书",
    searchAction: "Search",
    searchEmpty: "Type Chinese to look up a course character.",
    searchNoMatches: "No matching course character found.",
    searchCount: "{count} result(s)",
    openInLesson: "Open in lesson",
    idiomSeries: "Idiom series",
    idiomSeriesHint: "Learn 200 common Chinese idioms.",
    openIdioms: "Open idioms",
    idiomLabel: "Idiom database",
    idiomSearchLabel: "Find an idiom",
    idiomSearchPlaceholder: "搜索成语，例如：一心一意",
    idiomCount: "{count} idioms",
    idiomCountOne: "1 idiom",
    idiomMeaning: "Meaning",
    idiomExample: "Example",
    idiomSource: "Source",
    idiomEmpty: "No matching idiom found.",
  },
  zh: {
    brandTagline: "每节课 5 个汉字",
    loginTitle: "选择学习用户",
    loginUsers: "学习用户选择选项",
    editProfile: "编辑",
    editProfileFor: "编辑 {name} 的资料",
    profileEditTitle: "修改学习用户资料",
    profileEditHint: "修改此设备上显示的学习用户名字和头像标记。",
    profileNameLabel: "学习用户名字",
    profileMarkLabel: "头像标记",
    profileMarkHint: "可使用一个汉字、字母、数字或表情。",
    profileSave: "保存资料",
    profileReset: "恢复默认",
    profileCancel: "取消",
    profileSavedToast: "{name} 的资料已保存。",
    profileResetToast: "资料已恢复默认。",
    profileNameRequired: "请输入学习用户名字。",
    profileMarkRequired: "请输入头像标记。",
    loginProgressMeta: "{xp} 经验 · {level} 级 · 已完成 {lessons} 课",
    lastUser: "上次使用",
    currentUser: "当前用户",
    switchUser: "切换用户",
    signedInAs: "当前学习用户：{name}",
    loginToast: "{name}，欢迎回来。",
    dailyLesson: "一日一课",
    startToday: "开始今天的一课",
    uiLanguage: "界面语言",
    uiLanguageHint: "选择界面显示语言。",
    uiSkin: "界面皮肤",
    uiSkinHint: "切换主页配色风格。",
    skinClassic: "经典",
    skinAnime: "二次元",
    skinCandy: "糖果",
    skinForest: "森林",
    skinOcean: "海洋",
    progressSummary: "学习进度摘要",
    level: "等级",
    xpProgress: "经验进度",
    streak: "连续",
    chooseLesson: "选择课程",
    start: "开始",
    howToPlay: "使用说明",
    howToUse: "如何使用",
    closeHowToPlay: "关闭使用说明",
    howToPlayHint: "查看课程、测试、贴纸和摄像头写字的用法。",
    openHowToPlay: "打开说明",
    guideStep1: "<strong>选择</strong> 一节课。",
    guideStep2: "<strong>学习</strong> 5 个汉字和拼音。",
    guideStep3: "<strong>听读</strong> 并练习笔顺。",
    guideStep4: "<strong>测试</strong> 后获得经验和贴纸。",
    cameraGuideAria: "摄像头追踪手指在方格中写字",
    cameraWriting: "摄像头写字",
    cameraGuideText: "在课程里点击 <strong>摄像头</strong>，应用会追踪手指尖，让你在方格里写字。",
    home: "主页",
    lesson: "课程",
    previousCharacter: "上一个汉字",
    speak: "发音",
    playing: "播放中",
    nextCharacter: "下一个汉字",
    meaning: "意思",
    words: "组词",
    sentences: "造句",
    strokeOrder: "笔顺",
    animate: "演示",
    trace: "描红",
    camera: "摄像头",
    strokeOrderAnimation: "笔顺动画",
    cameraPractice: "摄像头写字练习",
    cameraCanvas: "摄像头写字画布",
    cameraOff: "摄像头关闭",
    clear: "清除",
    close: "关闭",
    radical: "部首",
    strokes: "笔画",
    shape: "结构",
    coachInitial: "先听、读、写，再继续。",
    next: "下一步",
    test: "测试",
    result: "结果",
    recentStickers: "最近贴纸",
    tryTestAgain: "再测一次",
    nextLesson: "下一课",
    contact: "联系方式",
    lessonN: "第 {n} 课",
    lessonOption: "第 {n} 课{done}: {chars}",
    startTodayAria: "开始今天的第 {n} 课",
    englishLabel: "英语",
    pinyinFallback: "拼音",
    startTest: "开始测试",
    characterCount: "第 {current} / {total} 个字。",
    playLabel: "播放 {label}",
    playingLabel: "正在播放 {label}。",
    sentenceLabel: "句子 {n}",
    strokesCount: "{char} · {count} 画",
    pinchToDraw: "捏合手指，在方格里写字。",
    touchDraw: "也可以用触摸或鼠标写字。",
    cameraPermission: "需要摄像头权限。也可以用触摸或鼠标写字。",
    cameraNotFound: "没有找到摄像头。也可以用触摸或鼠标写字。",
    cameraUnavailable: "摄像头不可用。也可以用触摸或鼠标写字。",
    cameraOnTouch: "摄像头已开启。也可以用触摸或鼠标写字。",
    starting: "启动中",
    startingCamera: "正在启动摄像头...",
    showHandPinch: "伸出一只手，捏合手指开始写字。",
    stop: "停止",
    cameraReady: "摄像头写字已准备好。",
    speechUnavailable: "这个浏览器不支持语音播放。",
    audioFailed: "音频没有播放，请再试一次。",
    playingChar: "正在播放 {char}: {pinyin}。",
    watchStroke: "看笔顺演示。",
    closeTrace: "差一点。沿着提示线再试一次。",
    goodStroke: "这一笔很好。",
    traceComplete: "描红完成：{char}。+4 XP",
    traceMode: "描红模式已开启。",
    whichPinyin: "{char} 的拼音是哪一个？",
    pickCharacter: "请选择表示“{meaning}”的汉字",
    whatMeaning: "{char} 是什么意思？",
    questionN: "第 {n} 题",
    correctFeedback: "答对了。{char} 的拼音是 {pinyin}。",
    correctAnswer: "正确答案：{answer}。",
    showResult: "查看结果",
    lessonComplete: "课程完成",
    keepPractising: "继续练习",
    resultEarned: "你获得了 {xp} XP。",
    resultEarnedSticker: "你获得了 {xp} XP 和今天的贴纸。",
    resultPractice: "答对 {total} 题中的 {needed} 题即可完成本课。复习后再试一次。",
    resultSaved: "结果已保存。",
    tryReview: "快速复习后再试一次。",
    dailyToast: "今日课程：第 {n} 课。",
    functionMenu: "功能菜单",
    courseLearning: "课程学习",
    courseLearningHint: "从 800 字课程中选择一课学习。",
    chooseLessonAction: "选择课程",
    startSelectedLesson: "开始选择的课程",
    openDialogue: "进入日常对话",
    openRoleplay: "进入角色扮演",
    practiceModes: "练习模式",
    databaseTotals: "数据库总量",
    databaseTotalsHint: "字、词、句和成语的当前总数。",
    databaseCharacters: "字",
    databaseWords: "词",
    databaseSentences: "句",
    databaseIdioms: "成语",
    dailyDialogue: "日常对话练习",
    dialogueModeHint: "选择主题，听读常用词语。",
    rolePlay: "角色扮演",
    roleplayModeHint: "朗读一个简短情景。",
    practice: "练习",
    chooseTopic: "选择主题",
    readPhrase: "朗读短句",
    vocabulary: "词语",
    readAll: "全部朗读",
    chooseScene: "选择情景",
    readRoleplayArea: "朗读角色扮演情景",
    tapToRead: "点击这个区域开始朗读。",
    readScene: "朗读情景",
    scenarioWords: "情景词语",
    dialogueToast: "主题：{topic}。",
    roleplayToast: "情景：{title}。",
    customCharacter: "新增汉字",
    customCharacterHint: "把自己的汉字、组词和造句加入课程。",
    openCustomCharacter: "新增一个汉字",
    customCharacterCount: "已保存 {count} 个自定义汉字",
    customCharacterEmpty: "还没有自定义汉字",
    customCharactersLabel: "自定义数据库",
    customBackToHome: "返回主页",
    customNotice: "原始 800 个课程汉字已锁定，不能修改。自定义汉字保存后没有删除功能。",
    customBasicTitle: "汉字资料",
    customCharLabel: "汉字",
    customPinyinLabel: "拼音",
    customMeaningZhLabel: "中文意思",
    customMeaningEnLabel: "英文意思",
    customRadicalLabel: "部首（可选）",
    customStrokesLabel: "笔画（可选）",
    customStructureLabel: "结构（可选）",
    customWordsTitle: "组词",
    customSentencesTitle: "造句",
    customRequiredHint: "必须填写 3 个",
    customWordLabel: "组词 {n}",
    customWordMeaningLabel: "英文意思 {n}",
    customSentenceZhLabel: "造句 {n}",
    customSentenceEnLabel: "英文句子 {n}",
    customSave: "保存汉字",
    customReset: "清空表单",
    customSavedTitle: "已保存的自定义汉字",
    customSavedEmpty: "保存后的汉字会显示在这里，并加入课程学习。",
    customInvalidChar: "请输入一个汉字。",
    customMissingRequired: "请填写所有必填内容。",
    customWordMustUseChar: "每个组词都应该包含“{char}”。",
    customSentenceMustUseChar: "每个中文句子都应该包含“{char}”。",
    customOriginalLocked: "“{char}”属于原始课程汉字，不能修改。",
    customAlreadyExists: "“{char}”已经添加过。",
    customSavedToast: "“{char}”已保存到课程学习。",
    searchTitle: "搜索",
    searchModeHint: "输入中文，查找拼音、组词、造句、笔顺和部首。",
    openSearch: "打开搜索",
    searchLabel: "课程数据库",
    searchInputLabel: "中文搜索",
    searchPlaceholder: "输入中文，例如：新 / 新书",
    searchAction: "搜索",
    searchEmpty: "输入中文，即可查询课程汉字。",
    searchNoMatches: "没有找到匹配的课程汉字。",
    searchCount: "{count} 个结果",
    openInLesson: "在课程中打开",
    idiomSeries: "成语系列",
    idiomSeriesHint: "学习 200 条常用成语。",
    openIdioms: "打开成语",
    idiomLabel: "成语数据库",
    idiomSearchLabel: "搜索成语",
    idiomSearchPlaceholder: "搜索成语，例如：一心一意",
    idiomCount: "{count} 条成语",
    idiomCountOne: "1 条成语",
    idiomMeaning: "意思",
    idiomExample: "例句",
    idiomSource: "出处",
    idiomEmpty: "没有找到匹配的成语。",
  },
  ja: {
    brandTagline: "1レッスン5文字",
    dailyLesson: "今日のレッスン",
    startToday: "今日のレッスンを開始",
    uiLanguage: "UI言語",
    uiLanguageHint: "表示言語を選びます。",
    uiSkin: "UIスキン",
    uiSkinHint: "ホーム画面の色を切り替えます。",
    skinClassic: "クラシック",
    skinAnime: "アニメ",
    skinCandy: "キャンディ",
    skinForest: "森",
    skinOcean: "海",
    progressSummary: "進度の概要",
    level: "レベル",
    xpProgress: "XP進度",
    streak: "連続",
    chooseLesson: "レッスンを選ぶ",
    start: "開始",
    howToPlay: "使い方",
    howToUse: "使い方",
    closeHowToPlay: "使い方を閉じる",
    howToPlayHint: "レッスン、テスト、シール、カメラ書き取りの使い方を見ます。",
    openHowToPlay: "ガイドを開く",
    guideStep1: "<strong>選ぶ</strong> レッスンを1つ選びます。",
    guideStep2: "<strong>学ぶ</strong> 5文字をピンインと一緒に学びます。",
    guideStep3: "<strong>聞く</strong> 音声を聞き、筆順を練習します。",
    guideStep4: "<strong>テスト</strong> XPとシールを獲得します。",
    cameraGuideAria: "カメラが指先を追跡して枠内に文字を書く",
    cameraWriting: "カメラ書き取り",
    cameraGuideText: "レッスンで <strong>Camera</strong> をタップすると、指先を追跡して枠内に文字を書けます。",
    home: "ホーム",
    lesson: "レッスン",
    previousCharacter: "前の文字",
    speak: "発音",
    playing: "再生中",
    nextCharacter: "次の文字",
    meaning: "意味",
    words: "単語",
    sentences: "例文",
    strokeOrder: "筆順",
    animate: "再生",
    trace: "なぞる",
    camera: "カメラ",
    strokeOrderAnimation: "筆順アニメーション",
    cameraPractice: "カメラ書き取り練習",
    cameraCanvas: "カメラ書き取りキャンバス",
    cameraOff: "カメラはオフ",
    clear: "消す",
    close: "閉じる",
    radical: "部首",
    strokes: "画数",
    shape: "構造",
    coachInitial: "聞いて、読んで、なぞってから進みます。",
    next: "次へ",
    test: "テスト",
    result: "結果",
    recentStickers: "最近のシール",
    tryTestAgain: "もう一度テスト",
    nextLesson: "次のレッスン",
    contact: "連絡先",
    lessonN: "レッスン {n}",
    lessonOption: "レッスン {n}{done}: {chars}",
    startTodayAria: "今日のレッスン {n} を始める",
    englishLabel: "英語",
    pinyinFallback: "ピンイン",
    startTest: "テスト開始",
    characterCount: "{current} / {total} 文字目。",
    playLabel: "{label} を再生",
    playingLabel: "{label} を再生中。",
    sentenceLabel: "例文 {n}",
    strokesCount: "{char} · {count}画",
    pinchToDraw: "指をつまんで枠内に書きます。",
    touchDraw: "タッチやマウスでも書けます。",
    cameraPermission: "カメラ許可が必要です。タッチやマウスでも書けます。",
    cameraNotFound: "カメラが見つかりません。タッチやマウスでも書けます。",
    cameraUnavailable: "カメラを使えません。タッチやマウスでも書けます。",
    cameraOnTouch: "カメラはオンです。タッチやマウスでも書けます。",
    starting: "起動中",
    startingCamera: "カメラを起動中...",
    showHandPinch: "手を1つ見せ、指をつまんで書きます。",
    stop: "停止",
    cameraReady: "カメラ書き取りの準備ができました。",
    speechUnavailable: "このブラウザでは音声を使えません。",
    audioFailed: "音声を再生できませんでした。もう一度試してください。",
    playingChar: "{char}: {pinyin} を再生中。",
    watchStroke: "筆順を見ましょう。",
    closeTrace: "もう少し。ガイド線に沿ってもう一度。",
    goodStroke: "よい一画です。",
    traceComplete: "なぞり完了: {char}。+4 XP",
    traceMode: "なぞりモードです。",
    whichPinyin: "{char} に合うピンインはどれ？",
    pickCharacter: "「{meaning}」を表す漢字を選んでください",
    whatMeaning: "{char} の意味は？",
    questionN: "問題 {n}",
    correctFeedback: "正解。{char} は {pinyin} です。",
    correctAnswer: "正しい答え: {answer}。",
    showResult: "結果を見る",
    lessonComplete: "レッスン完了",
    keepPractising: "練習を続けましょう",
    resultEarned: "{xp} XP を獲得しました。",
    resultEarnedSticker: "{xp} XP と今日のシールを獲得しました。",
    resultPractice: "{total}問中{needed}問正解で完了です。復習してもう一度。",
    resultSaved: "結果を保存しました。",
    tryReview: "少し復習してもう一度。",
    dailyToast: "今日のレッスン: レッスン {n}。",
    functionMenu: "機能メニュー",
    courseLearning: "コース学習",
    courseLearningHint: "800文字コースからレッスンを選びます。",
    chooseLessonAction: "レッスンを選ぶ",
    startSelectedLesson: "選んだレッスンを開始",
    openDialogue: "日常会話を開く",
    openRoleplay: "ロールプレイを開く",
    practiceModes: "練習モード",
    databaseTotals: "データベース総数",
    databaseTotalsHint: "文字、単語、例文、成語の現在の総数です。",
    databaseCharacters: "文字",
    databaseWords: "単語",
    databaseSentences: "例文",
    databaseIdioms: "成語",
    dailyDialogue: "日常会話練習",
    dialogueModeHint: "テーマを選び、役立つ語句を聞きます。",
    rolePlay: "ロールプレイ",
    roleplayModeHint: "短い場面を音読します。",
    practice: "練習",
    chooseTopic: "テーマを選ぶ",
    readPhrase: "文を読む",
    vocabulary: "語句",
    readAll: "すべて読む",
    chooseScene: "場面を選ぶ",
    readRoleplayArea: "ロールプレイ場面を読む",
    tapToRead: "このカードをタップして音読します。",
    readScene: "場面を読む",
    scenarioWords: "場面の語句",
    dialogueToast: "テーマ: {topic}。",
    roleplayToast: "場面: {title}。",
  },
  ko: {
    brandTagline: "한 과에 한자 5개",
    dailyLesson: "오늘의 수업",
    startToday: "오늘의 수업 시작",
    uiLanguage: "UI 언어",
    uiLanguageHint: "표시 언어를 선택합니다.",
    uiSkin: "UI 스킨",
    uiSkinHint: "홈 화면 색상을 바꿉니다.",
    skinClassic: "클래식",
    skinAnime: "애니",
    skinCandy: "캔디",
    skinForest: "숲",
    skinOcean: "바다",
    progressSummary: "진도 요약",
    level: "레벨",
    xpProgress: "XP 진행",
    streak: "연속",
    chooseLesson: "수업 선택",
    start: "시작",
    howToPlay: "사용 방법",
    howToUse: "사용 방법",
    closeHowToPlay: "사용 방법 닫기",
    howToPlayHint: "수업, 테스트, 스티커, 카메라 쓰기 사용법을 봅니다.",
    openHowToPlay: "안내 열기",
    guideStep1: "<strong>선택</strong> 수업 하나를 고릅니다.",
    guideStep2: "<strong>학습</strong> 한자 5개와 병음을 배웁니다.",
    guideStep3: "<strong>듣기</strong> 발음을 듣고 필순을 연습합니다.",
    guideStep4: "<strong>테스트</strong> XP와 스티커를 받습니다.",
    cameraGuideAria: "카메라가 손끝을 추적해 네모 안에 글자를 씁니다",
    cameraWriting: "카메라 쓰기",
    cameraGuideText: "수업에서 <strong>Camera</strong> 를 누르면 손끝을 따라가며 네모 안에 글자를 쓸 수 있습니다.",
    home: "홈",
    lesson: "수업",
    previousCharacter: "이전 글자",
    speak: "발음",
    playing: "재생 중",
    nextCharacter: "다음 글자",
    meaning: "뜻",
    words: "단어",
    sentences: "예문",
    strokeOrder: "필순",
    animate: "재생",
    trace: "따라쓰기",
    camera: "카메라",
    strokeOrderAnimation: "필순 애니메이션",
    cameraPractice: "카메라 쓰기 연습",
    cameraCanvas: "카메라 쓰기 캔버스",
    cameraOff: "카메라 꺼짐",
    clear: "지우기",
    close: "닫기",
    radical: "부수",
    strokes: "획수",
    shape: "구조",
    coachInitial: "듣고, 읽고, 따라쓴 뒤 계속하세요.",
    next: "다음",
    test: "테스트",
    result: "결과",
    recentStickers: "최근 스티커",
    tryTestAgain: "테스트 다시 하기",
    nextLesson: "다음 수업",
    contact: "연락처",
    lessonN: "제 {n}과",
    lessonOption: "제 {n}과{done}: {chars}",
    startTodayAria: "오늘의 제 {n}과 시작",
    englishLabel: "영어",
    pinyinFallback: "병음",
    startTest: "테스트 시작",
    characterCount: "{current} / {total}번째 글자.",
    playLabel: "{label} 재생",
    playingLabel: "{label} 재생 중.",
    sentenceLabel: "예문 {n}",
    strokesCount: "{char} · {count}획",
    pinchToDraw: "손가락을 오므려 네모 안에 쓰세요.",
    touchDraw: "터치나 마우스로도 쓸 수 있습니다.",
    cameraPermission: "카메라 권한이 필요합니다. 터치나 마우스로도 쓸 수 있습니다.",
    cameraNotFound: "카메라를 찾을 수 없습니다. 터치나 마우스로도 쓸 수 있습니다.",
    cameraUnavailable: "카메라를 사용할 수 없습니다. 터치나 마우스로도 쓸 수 있습니다.",
    cameraOnTouch: "카메라가 켜졌습니다. 터치나 마우스로도 쓸 수 있습니다.",
    starting: "시작 중",
    startingCamera: "카메라 시작 중...",
    showHandPinch: "손 하나를 보이고 손가락을 오므려 쓰세요.",
    stop: "정지",
    cameraReady: "카메라 쓰기가 준비되었습니다.",
    speechUnavailable: "이 브라우저에서는 음성을 사용할 수 없습니다.",
    audioFailed: "오디오가 재생되지 않았습니다. 다시 시도하세요.",
    playingChar: "{char}: {pinyin} 재생 중.",
    watchStroke: "필순을 보세요.",
    closeTrace: "아쉬워요. 안내선을 따라 다시 해보세요.",
    goodStroke: "좋은 획이에요.",
    traceComplete: "따라쓰기 완료: {char}. +4 XP",
    traceMode: "따라쓰기 모드입니다.",
    whichPinyin: "{char} 에 맞는 병음은?",
    pickCharacter: "“{meaning}”에 맞는 한자를 고르세요",
    whatMeaning: "{char} 의 뜻은?",
    questionN: "문제 {n}",
    correctFeedback: "정답입니다. {char} 은/는 {pinyin} 입니다.",
    correctAnswer: "정답: {answer}.",
    showResult: "결과 보기",
    lessonComplete: "수업 완료",
    keepPractising: "계속 연습하세요",
    resultEarned: "{xp} XP를 받았습니다.",
    resultEarnedSticker: "{xp} XP와 오늘의 스티커를 받았습니다.",
    resultPractice: "{total}개 중 {needed}개를 맞히면 수업 완료입니다. 복습하고 다시 해보세요.",
    resultSaved: "결과가 저장되었습니다.",
    tryReview: "짧게 복습하고 다시 시도하세요.",
    dailyToast: "오늘의 수업: 제 {n}과.",
    functionMenu: "기능 메뉴",
    courseLearning: "코스 학습",
    courseLearningHint: "800자 코스에서 수업을 선택합니다.",
    chooseLessonAction: "수업 선택",
    startSelectedLesson: "선택한 수업 시작",
    openDialogue: "일상 대화 열기",
    openRoleplay: "역할 놀이 열기",
    practiceModes: "연습 모드",
    databaseTotals: "데이터베이스 총수",
    databaseTotalsHint: "글자, 단어, 예문, 성어의 현재 총수입니다.",
    databaseCharacters: "글자",
    databaseWords: "단어",
    databaseSentences: "예문",
    databaseIdioms: "성어",
    dailyDialogue: "일상 대화 연습",
    dialogueModeHint: "주제를 고르고 유용한 말을 들어요.",
    rolePlay: "역할 놀이",
    roleplayModeHint: "짧은 상황을 소리 내어 읽어요.",
    practice: "연습",
    chooseTopic: "주제 선택",
    readPhrase: "문장 읽기",
    vocabulary: "어휘",
    readAll: "모두 읽기",
    chooseScene: "상황 선택",
    readRoleplayArea: "역할 놀이 상황 읽기",
    tapToRead: "이 카드를 눌러 소리 내어 읽어요.",
    readScene: "상황 읽기",
    scenarioWords: "상황 단어",
    dialogueToast: "주제: {topic}.",
    roleplayToast: "상황: {title}.",
  },
};

const els = {
  loginView: document.querySelector("#loginView"),
  loginUserList: document.querySelector("#loginUserList"),
  profileEditDialog: document.querySelector("#profileEditDialog"),
  profileEditForm: document.querySelector("#profileEditForm"),
  profileEditTitle: document.querySelector("#profileEditTitle"),
  profileNameInput: document.querySelector("#profileNameInput"),
  profileMarkInput: document.querySelector("#profileMarkInput"),
  profileEditValidation: document.querySelector("#profileEditValidation"),
  profileEditResetBtn: document.querySelector("#profileEditResetBtn"),
  profileEditCancelBtn: document.querySelector("#profileEditCancelBtn"),
  homeView: document.querySelector("#homeView"),
  homeHotspots: document.querySelectorAll(".home-hotspot"),
  lessonPickerView: document.querySelector("#lessonPickerView"),
  customCharacterView: document.querySelector("#customCharacterView"),
  searchView: document.querySelector("#searchView"),
  idiomView: document.querySelector("#idiomView"),
  dialogueView: document.querySelector("#dialogueView"),
  roleplayView: document.querySelector("#roleplayView"),
  lessonView: document.querySelector("#lessonView"),
  testView: document.querySelector("#testView"),
  resultView: document.querySelector("#resultView"),
  levelValue: document.querySelector("#levelValue"),
  xpLabel: document.querySelector("#xpLabel"),
  xpWrap: document.querySelector(".xp-wrap"),
  xpBar: document.querySelector("#xpBar"),
  streakValue: document.querySelector("#streakValue"),
  currentUserName: document.querySelector("#currentUserName"),
  switchUserBtn: document.querySelector("#switchUserBtn"),
  homeCurrentUserName: document.querySelector("#homeCurrentUserName"),
  homeSwitchUserBtn: document.querySelector("#homeSwitchUserBtn"),
  lessonSelect: document.querySelector("#lessonSelect"),
  startLessonBtn: document.querySelector("#startLessonBtn"),
  uiLanguageSelect: document.querySelector("#uiLanguageSelect"),
  uiSkinSelect: document.querySelector("#uiSkinSelect"),
  dailyMonth: document.querySelector("#dailyMonth"),
  dailyDay: document.querySelector("#dailyDay"),
  dailyLessonTitle: document.querySelector("#dailyLessonTitle"),
  dailyLessonChars: document.querySelector("#dailyLessonChars"),
  dailyLessonBtn: document.querySelector("#dailyLessonBtn"),
  dailyLessonCtaBtn: document.querySelector("#dailyLessonCtaBtn"),
  howToPlayBtn: document.querySelector("#howToPlayBtn"),
  howToPlayDialog: document.querySelector("#howToPlayDialog"),
  lessonPickerBtn: document.querySelector("#lessonPickerBtn"),
  lessonPickerHomeBtn: document.querySelector("#lessonPickerHomeBtn"),
  customCharacterBtn: document.querySelector("#customCharacterBtn"),
  customCharacterCount: document.querySelector("#customCharacterCount"),
  searchModeBtn: document.querySelector("#searchModeBtn"),
  idiomModeBtn: document.querySelector("#idiomModeBtn"),
  idiomHomeCount: document.querySelector("#idiomHomeCount"),
  databaseCharacterCount: document.querySelector("#databaseCharacterCount"),
  databaseWordCount: document.querySelector("#databaseWordCount"),
  databaseSentenceCount: document.querySelector("#databaseSentenceCount"),
  databaseIdiomCount: document.querySelector("#databaseIdiomCount"),
  customHomeBtn: document.querySelector("#customHomeBtn"),
  customCharacterForm: document.querySelector("#customCharacterForm"),
  customCharInput: document.querySelector("#customCharInput"),
  customPinyinInput: document.querySelector("#customPinyinInput"),
  customMeaningZhInput: document.querySelector("#customMeaningZhInput"),
  customMeaningEnInput: document.querySelector("#customMeaningEnInput"),
  customRadicalInput: document.querySelector("#customRadicalInput"),
  customStrokesInput: document.querySelector("#customStrokesInput"),
  customStructureInput: document.querySelector("#customStructureInput"),
  customValidation: document.querySelector("#customValidation"),
  customResetBtn: document.querySelector("#customResetBtn"),
  customSavedList: document.querySelector("#customSavedList"),
  searchHomeBtn: document.querySelector("#searchHomeBtn"),
  searchForm: document.querySelector("#searchForm"),
  searchInput: document.querySelector("#searchInput"),
  searchResultCount: document.querySelector("#searchResultCount"),
  searchResults: document.querySelector("#searchResults"),
  searchDetailEmpty: document.querySelector("#searchDetailEmpty"),
  searchDetailBody: document.querySelector("#searchDetailBody"),
  searchDetailChar: document.querySelector("#searchDetailChar"),
  searchDetailPinyin: document.querySelector("#searchDetailPinyin"),
  searchSpeakBtn: document.querySelector("#searchSpeakBtn"),
  searchDetailMeaningZh: document.querySelector("#searchDetailMeaningZh"),
  searchDetailMeaningEn: document.querySelector("#searchDetailMeaningEn"),
  searchRadicalValue: document.querySelector("#searchRadicalValue"),
  searchStrokeValue: document.querySelector("#searchStrokeValue"),
  searchStructureValue: document.querySelector("#searchStructureValue"),
  searchDetailWords: document.querySelector("#searchDetailWords"),
  searchDetailSentences: document.querySelector("#searchDetailSentences"),
  searchStrokeTarget: document.querySelector("#searchStrokeTarget"),
  searchOpenLessonBtn: document.querySelector("#searchOpenLessonBtn"),
  idiomHomeBtn: document.querySelector("#idiomHomeBtn"),
  idiomSearchInput: document.querySelector("#idiomSearchInput"),
  idiomCount: document.querySelector("#idiomCount"),
  idiomList: document.querySelector("#idiomList"),
  customWords: [1, 2, 3].map((index) => ({
    word: document.querySelector(`#customWord${index}`),
    meaningEn: document.querySelector(`#customWordMeaning${index}`),
  })),
  customSentences: [1, 2, 3].map((index) => ({
    zh: document.querySelector(`#customSentenceZh${index}`),
    en: document.querySelector(`#customSentenceEn${index}`),
  })),
  dialogueModeBtn: document.querySelector("#dialogueModeBtn"),
  roleplayModeBtn: document.querySelector("#roleplayModeBtn"),
  dialogueHomeBtn: document.querySelector("#dialogueHomeBtn"),
  roleplayHomeBtn: document.querySelector("#roleplayHomeBtn"),
  dialogueTopicSelect: document.querySelector("#dialogueTopicSelect"),
  dialogueIcon: document.querySelector("#dialogueIcon"),
  dialogueTopic: document.querySelector("#dialogueTopic"),
  dialoguePinyin: document.querySelector("#dialoguePinyin"),
  dialogueEnglish: document.querySelector("#dialogueEnglish"),
  dialoguePhraseBtn: document.querySelector("#dialoguePhraseBtn"),
  dialoguePhrase: document.querySelector("#dialoguePhrase"),
  dialoguePhrasePinyin: document.querySelector("#dialoguePhrasePinyin"),
  dialogueAllBtn: document.querySelector("#dialogueAllBtn"),
  dialogueWords: document.querySelector("#dialogueWords"),
  roleplaySelect: document.querySelector("#roleplaySelect"),
  roleplayIcon: document.querySelector("#roleplayIcon"),
  roleplayTitle: document.querySelector("#roleplayTitle"),
  roleplayTitlePinyin: document.querySelector("#roleplayTitlePinyin"),
  roleplayReadArea: document.querySelector("#roleplayReadArea"),
  roleplayText: document.querySelector("#roleplayText"),
  roleplayPinyin: document.querySelector("#roleplayPinyin"),
  roleplaySpeakBtn: document.querySelector("#roleplaySpeakBtn"),
  roleplayWords: document.querySelector("#roleplayWords"),
  homeBtn: document.querySelector("#homeBtn"),
  resultHomeBtn: document.querySelector("#resultHomeBtn"),
  lessonTitle: document.querySelector("#lessonTitle"),
  lessonProgress: document.querySelector("#lessonProgress"),
  prevCharBtn: document.querySelector("#prevCharBtn"),
  nextCharBtn: document.querySelector("#nextCharBtn"),
  speakBtn: document.querySelector("#speakBtn"),
  speakLabel: document.querySelector("#speakLabel"),
  bigChar: document.querySelector("#bigChar"),
  pinyin: document.querySelector("#pinyin"),
  meaning: document.querySelector("#meaning"),
  meaningZh: document.querySelector("#meaningZh"),
  meaningEn: document.querySelector("#meaningEn"),
  wordList: document.querySelector("#wordList"),
  sentenceList: document.querySelector("#sentenceList"),
  strokeTarget: document.querySelector("#strokeTarget"),
  animateBtn: document.querySelector("#animateBtn"),
  traceBtn: document.querySelector("#traceBtn"),
  cameraWriteBtn: document.querySelector("#cameraWriteBtn"),
  cameraPanel: document.querySelector("#cameraPanel"),
  cameraVideo: document.querySelector("#cameraVideo"),
  cameraCanvas: document.querySelector("#cameraCanvas"),
  cameraStatus: document.querySelector("#cameraStatus"),
  cameraClearBtn: document.querySelector("#cameraClearBtn"),
  cameraCloseBtn: document.querySelector("#cameraCloseBtn"),
  radicalValue: document.querySelector("#radicalValue"),
  strokeValue: document.querySelector("#strokeValue"),
  structureValue: document.querySelector("#structureValue"),
  coachMessage: document.querySelector("#coachMessage"),
  continueBtn: document.querySelector("#continueBtn"),
  quizTitle: document.querySelector("#quizTitle"),
  quizProgress: document.querySelector("#quizProgress"),
  quizBody: document.querySelector("#quizBody"),
  quizFeedback: document.querySelector("#quizFeedback"),
  nextQuestionBtn: document.querySelector("#nextQuestionBtn"),
  resultTitle: document.querySelector("#resultTitle"),
  resultScore: document.querySelector("#resultScore"),
  resultMessage: document.querySelector("#resultMessage"),
  stickerStrip: document.querySelector("#stickerStrip"),
  retryBtn: document.querySelector("#retryBtn"),
  nextLessonBtn: document.querySelector("#nextLessonBtn"),
  celebrationLayer: document.querySelector("#celebrationLayer"),
  toast: document.querySelector("#toast"),
};

let writer = null;
let searchWriter = null;
let selectedSearchEntry = null;
let homeAudioContext = null;
let lastHomeAnimalSound = "";
let lastHomeAnimalSoundAt = 0;
let quiz = null;
let lastResult = null;
let toastTimer = null;
let cameraScriptPromise = null;
let activeSpeechJob = null;
let speechJobId = 0;
let cachedChineseVoice = null;
const SPARKLE_GLYPHS = ["✦", "★", "星", "好", "棒"];
const SPARKLE_COLORS = ["#ff7078", "#2f80ed", "#54b86a", "#ffd45d", "#8d65d8"];

const MEDIAPIPE_HANDS_SCRIPT = "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js";
const MEDIAPIPE_HANDS_ASSET_BASE = "https://cdn.jsdelivr.net/npm/@mediapipe/hands";
const CAMERA_LIBRARY_TIMEOUT = 9000;

const cameraState = {
  panelOpen: false,
  stream: null,
  hands: null,
  rafId: 0,
  sendingFrame: false,
  hasTracking: false,
  seenHand: false,
  handLandmarks: null,
  handDrawing: false,
  pointerDrawing: false,
  currentStroke: null,
  currentStrokeSource: null,
  strokes: [],
  smoothedHandPoint: null,
};

function makeDialogueCategory(topic, pinyin, en, icon, phrase, phrasePinyin, words) {
  return {
    topic,
    pinyin,
    en,
    icon,
    phrase,
    phrasePinyin,
    words: words.map(([zh, wordPinyin, meaning]) => ({ zh, pinyin: wordPinyin, meaning })),
  };
}

function makeRoleplayScenario(title, titlePinyin, en, icon, text, pinyin, words) {
  return {
    title,
    titlePinyin,
    en,
    icon,
    text,
    pinyin,
    words: words.map(([zh, wordPinyin, meaning]) => ({ zh, pinyin: wordPinyin, meaning })),
  };
}

const DIALOGUE_CATEGORIES = [
  makeDialogueCategory("学校", "xué xiào", "school", "🏫", "我在学校学习中文。", "wǒ zài xué xiào xué xí zhōng wén.", [["学校", "xué xiào", "school"], ["老师", "lǎo shī", "teacher"], ["学生", "xué sheng", "student"], ["教室", "jiào shì", "classroom"], ["上课", "shàng kè", "have class"]]),
  makeDialogueCategory("家庭", "jiā tíng", "family", "🏠", "我家有四个人。", "wǒ jiā yǒu sì ge rén.", [["家", "jiā", "home"], ["爸爸", "bà ba", "dad"], ["妈妈", "mā ma", "mum"], ["哥哥", "gē ge", "older brother"], ["妹妹", "mèi mei", "younger sister"]]),
  makeDialogueCategory("食物", "shí wù", "food", "🍚", "我喜欢吃米饭和菜。", "wǒ xǐ huān chī mǐ fàn hé cài.", [["米饭", "mǐ fàn", "rice"], ["面条", "miàn tiáo", "noodles"], ["水果", "shuǐ guǒ", "fruit"], ["蔬菜", "shū cài", "vegetables"], ["喝水", "hē shuǐ", "drink water"]]),
  makeDialogueCategory("运动", "yùn dòng", "sport", "⚽", "放学后我去跑步。", "fàng xué hòu wǒ qù pǎo bù.", [["跑步", "pǎo bù", "run"], ["足球", "zú qiú", "football"], ["游泳", "yóu yǒng", "swim"], ["跳高", "tiào gāo", "high jump"], ["拍球", "pāi qiú", "bounce a ball"]]),
  makeDialogueCategory("动物", "dòng wù", "animals", "🐾", "我家有一只小狗。", "wǒ jiā yǒu yì zhī xiǎo gǒu.", [["小狗", "xiǎo gǒu", "dog"], ["小猫", "xiǎo māo", "cat"], ["小鸟", "xiǎo niǎo", "bird"], ["小鱼", "xiǎo yú", "fish"], ["马", "mǎ", "horse"]]),
  makeDialogueCategory("颜色", "yán sè", "colours", "🎨", "我喜欢蓝色和绿色。", "wǒ xǐ huān lán sè hé lǜ sè.", [["红色", "hóng sè", "red"], ["黄色", "huáng sè", "yellow"], ["蓝色", "lán sè", "blue"], ["绿色", "lǜ sè", "green"], ["白色", "bái sè", "white"]]),
  makeDialogueCategory("问候", "wèn hòu", "greetings", "👋", "你好，很高兴见到你。", "nǐ hǎo, hěn gāo xìng jiàn dào nǐ.", [["你好", "nǐ hǎo", "hello"], ["再见", "zài jiàn", "goodbye"], ["谢谢", "xiè xie", "thank you"], ["对不起", "duì bu qǐ", "sorry"], ["请", "qǐng", "please"]]),
  makeDialogueCategory("天气", "tiān qì", "weather", "🌦️", "今天很热，也有风。", "jīn tiān hěn rè, yě yǒu fēng.", [["晴天", "qíng tiān", "sunny day"], ["下雨", "xià yǔ", "rain"], ["刮风", "guā fēng", "windy"], ["下雪", "xià xuě", "snow"], ["很热", "hěn rè", "hot"]]),
  makeDialogueCategory("时间", "shí jiān", "time", "🕒", "明天早上我去学校。", "míng tiān zǎo shang wǒ qù xué xiào.", [["今天", "jīn tiān", "today"], ["明天", "míng tiān", "tomorrow"], ["昨天", "zuó tiān", "yesterday"], ["早上", "zǎo shang", "morning"], ["晚上", "wǎn shang", "evening"]]),
  makeDialogueCategory("数字", "shù zì", "numbers", "🔢", "我有三本中文书。", "wǒ yǒu sān běn zhōng wén shū.", [["一", "yī", "one"], ["二", "èr", "two"], ["三", "sān", "three"], ["十", "shí", "ten"], ["百", "bǎi", "hundred"]]),
  makeDialogueCategory("购物", "gòu wù", "shopping", "🛍️", "这个苹果多少钱？", "zhè ge píng guǒ duō shao qián?", [["商店", "shāng diàn", "shop"], ["买", "mǎi", "buy"], ["钱", "qián", "money"], ["多少", "duō shao", "how much"], ["便宜", "pián yi", "cheap"]]),
  makeDialogueCategory("交通", "jiāo tōng", "transport", "🚌", "我坐公交车去学校。", "wǒ zuò gōng jiāo chē qù xué xiào.", [["公交车", "gōng jiāo chē", "bus"], ["汽车", "qì chē", "car"], ["火车", "huǒ chē", "train"], ["飞机", "fēi jī", "plane"], ["自行车", "zì xíng chē", "bicycle"]]),
  makeDialogueCategory("身体", "shēn tǐ", "body", "🙂", "我的手和脚都很干净。", "wǒ de shǒu hé jiǎo dōu hěn gān jìng.", [["头", "tóu", "head"], ["手", "shǒu", "hand"], ["眼睛", "yǎn jing", "eyes"], ["嘴巴", "zuǐ ba", "mouth"], ["脚", "jiǎo", "foot"]]),
  makeDialogueCategory("衣服", "yī fu", "clothes", "👕", "我穿蓝色的上衣。", "wǒ chuān lán sè de shàng yī.", [["衣服", "yī fu", "clothes"], ["上衣", "shàng yī", "top"], ["裤子", "kù zi", "pants"], ["鞋子", "xié zi", "shoes"], ["帽子", "mào zi", "hat"]]),
  makeDialogueCategory("爱好", "ài hào", "hobbies", "🎵", "我喜欢画画和唱歌。", "wǒ xǐ huān huà huà hé chàng gē.", [["画画", "huà huà", "draw"], ["唱歌", "chàng gē", "sing"], ["跳舞", "tiào wǔ", "dance"], ["看书", "kàn shū", "read"], ["音乐", "yīn yuè", "music"]]),
  makeDialogueCategory("心情", "xīn qíng", "feelings", "😊", "今天我很开心。", "jīn tiān wǒ hěn kāi xīn.", [["开心", "kāi xīn", "happy"], ["难过", "nán guò", "sad"], ["生气", "shēng qì", "angry"], ["累", "lèi", "tired"], ["害怕", "hài pà", "scared"]]),
  makeDialogueCategory("健康", "jiàn kāng", "health", "🏥", "我发烧了，要看医生。", "wǒ fā shāo le, yào kàn yī shēng.", [["医生", "yī shēng", "doctor"], ["医院", "yī yuàn", "hospital"], ["发烧", "fā shāo", "fever"], ["疼", "téng", "hurt"], ["药", "yào", "medicine"]]),
  makeDialogueCategory("方向", "fāng xiàng", "directions", "🧭", "图书馆在学校左边。", "tú shū guǎn zài xué xiào zuǒ bian.", [["左边", "zuǒ bian", "left"], ["右边", "yòu bian", "right"], ["前面", "qián mian", "front"], ["后面", "hòu mian", "back"], ["旁边", "páng biān", "beside"]]),
  makeDialogueCategory("自然", "zì rán", "nature", "🌳", "公园里有树和花。", "gōng yuán lǐ yǒu shù hé huā.", [["山", "shān", "mountain"], ["河", "hé", "river"], ["树", "shù", "tree"], ["花", "huā", "flower"], ["草", "cǎo", "grass"]]),
  makeDialogueCategory("海边", "hǎi biān", "beach", "🏖️", "我在海边看大海。", "wǒ zài hǎi biān kàn dà hǎi.", [["海", "hǎi", "sea"], ["沙子", "shā zi", "sand"], ["海水", "hǎi shuǐ", "sea water"], ["太阳", "tài yáng", "sun"], ["游泳", "yóu yǒng", "swim"]]),
  makeDialogueCategory("生日", "shēng rì", "birthday", "🎂", "今天是我的生日。", "jīn tiān shì wǒ de shēng rì.", [["生日", "shēng rì", "birthday"], ["蛋糕", "dàn gāo", "cake"], ["礼物", "lǐ wù", "gift"], ["朋友", "péng you", "friend"], ["快乐", "kuài lè", "happy"]]),
  makeDialogueCategory("教室用品", "jiào shì yòng pǐn", "classroom things", "🎒", "我的书包里有铅笔。", "wǒ de shū bāo lǐ yǒu qiān bǐ.", [["桌子", "zhuō zi", "desk"], ["椅子", "yǐ zi", "chair"], ["黑板", "hēi bǎn", "blackboard"], ["铅笔", "qiān bǐ", "pencil"], ["书包", "shū bāo", "school bag"]]),
  makeDialogueCategory("操场", "cāo chǎng", "playground", "🛝", "我们在操场玩游戏。", "wǒ men zài cāo chǎng wán yóu xì.", [["操场", "cāo chǎng", "playground"], ["滑梯", "huá tī", "slide"], ["秋千", "qiū qiān", "swing"], ["跑", "pǎo", "run"], ["游戏", "yóu xì", "game"]]),
  makeDialogueCategory("房间", "fáng jiān", "rooms", "🚪", "我的卧室很干净。", "wǒ de wò shì hěn gān jìng.", [["卧室", "wò shì", "bedroom"], ["厨房", "chú fáng", "kitchen"], ["浴室", "yù shì", "bathroom"], ["客厅", "kè tīng", "living room"], ["门", "mén", "door"]]),
  makeDialogueCategory("厨房", "chú fáng", "kitchen", "🥣", "桌上有碗和筷子。", "zhuō shang yǒu wǎn hé kuài zi.", [["碗", "wǎn", "bowl"], ["筷子", "kuài zi", "chopsticks"], ["勺子", "sháo zi", "spoon"], ["杯子", "bēi zi", "cup"], ["盘子", "pán zi", "plate"]]),
  makeDialogueCategory("水果", "shuǐ guǒ", "fruit", "🍎", "我想吃一个苹果。", "wǒ xiǎng chī yí ge píng guǒ.", [["苹果", "píng guǒ", "apple"], ["香蕉", "xiāng jiāo", "banana"], ["橙子", "chéng zi", "orange"], ["葡萄", "pú tao", "grape"], ["西瓜", "xī guā", "watermelon"]]),
  makeDialogueCategory("蔬菜", "shū cài", "vegetables", "🥕", "晚饭有很多蔬菜。", "wǎn fàn yǒu hěn duō shū cài.", [["胡萝卜", "hú luó bo", "carrot"], ["西红柿", "xī hóng shì", "tomato"], ["土豆", "tǔ dòu", "potato"], ["白菜", "bái cài", "cabbage"], ["玉米", "yù mǐ", "corn"]]),
  makeDialogueCategory("早餐", "zǎo cān", "breakfast", "🥛", "早餐我喝牛奶。", "zǎo cān wǒ hē niú nǎi.", [["早餐", "zǎo cān", "breakfast"], ["牛奶", "niú nǎi", "milk"], ["面包", "miàn bāo", "bread"], ["鸡蛋", "jī dàn", "egg"], ["粥", "zhōu", "porridge"]]),
  makeDialogueCategory("午餐", "wǔ cān", "lunch", "🍱", "午餐我吃米饭和汤。", "wǔ cān wǒ chī mǐ fàn hé tāng.", [["午餐", "wǔ cān", "lunch"], ["米饭", "mǐ fàn", "rice"], ["汤", "tāng", "soup"], ["肉", "ròu", "meat"], ["菜", "cài", "dish"]]),
  makeDialogueCategory("晚餐", "wǎn cān", "dinner", "🍜", "晚餐我们吃鱼和面。", "wǎn cān wǒ men chī yú hé miàn.", [["晚餐", "wǎn cān", "dinner"], ["鱼", "yú", "fish"], ["面", "miàn", "noodles"], ["豆腐", "dòu fu", "tofu"], ["茶", "chá", "tea"]]),
  makeDialogueCategory("科目", "kē mù", "subjects", "📚", "我最喜欢中文课。", "wǒ zuì xǐ huān zhōng wén kè.", [["中文", "zhōng wén", "Chinese"], ["英文", "yīng wén", "English"], ["数学", "shù xué", "maths"], ["美术", "měi shù", "art"], ["体育", "tǐ yù", "PE"]]),
  makeDialogueCategory("科技", "kē jì", "technology", "💻", "我用电脑学习中文。", "wǒ yòng diàn nǎo xué xí zhōng wén.", [["电脑", "diàn nǎo", "computer"], ["手机", "shǒu jī", "phone"], ["电视", "diàn shì", "TV"], ["相机", "xiàng jī", "camera"], ["网络", "wǎng luò", "internet"]]),
  makeDialogueCategory("地点", "dì diǎn", "places", "📍", "周末我去图书馆。", "zhōu mò wǒ qù tú shū guǎn.", [["公园", "gōng yuán", "park"], ["图书馆", "tú shū guǎn", "library"], ["动物园", "dòng wù yuán", "zoo"], ["博物馆", "bó wù guǎn", "museum"], ["车站", "chē zhàn", "station"]]),
  makeDialogueCategory("人物", "rén wù", "people", "🧒", "我的朋友也学中文。", "wǒ de péng you yě xué zhōng wén.", [["朋友", "péng you", "friend"], ["同学", "tóng xué", "classmate"], ["老师", "lǎo shī", "teacher"], ["孩子", "hái zi", "child"], ["大人", "dà rén", "adult"]]),
  makeDialogueCategory("家务", "jiā wù", "housework", "🧹", "我在家帮妈妈。", "wǒ zài jiā bāng mā ma.", [["帮忙", "bāng máng", "help"], ["打扫", "dǎ sǎo", "clean"], ["洗碗", "xǐ wǎn", "wash dishes"], ["整理", "zhěng lǐ", "tidy"], ["一起", "yì qǐ", "together"]]),
  makeDialogueCategory("日常作息", "rì cháng zuò xī", "daily routine", "⏰", "我早上刷牙洗脸。", "wǒ zǎo shang shuā yá xǐ liǎn.", [["起床", "qǐ chuáng", "get up"], ["刷牙", "shuā yá", "brush teeth"], ["洗脸", "xǐ liǎn", "wash face"], ["上学", "shàng xué", "go to school"], ["睡觉", "shuì jiào", "sleep"]]),
  makeDialogueCategory("问题", "wèn tí", "questions", "❓", "你什么时候去学校？", "nǐ shén me shí hou qù xué xiào?", [["谁", "shéi", "who"], ["什么", "shén me", "what"], ["哪里", "nǎ lǐ", "where"], ["什么时候", "shén me shí hou", "when"], ["为什么", "wèi shén me", "why"]]),
  makeDialogueCategory("代词", "dài cí", "pronouns", "💬", "我们一起说中文。", "wǒ men yì qǐ shuō zhōng wén.", [["我", "wǒ", "I"], ["你", "nǐ", "you"], ["他", "tā", "he"], ["她", "tā", "she"], ["我们", "wǒ men", "we"]]),
  makeDialogueCategory("礼貌用语", "lǐ mào yòng yǔ", "polite words", "🙏", "请问，厕所在哪里？", "qǐng wèn, cè suǒ zài nǎ lǐ?", [["请问", "qǐng wèn", "excuse me"], ["可以", "kě yǐ", "may"], ["谢谢", "xiè xie", "thanks"], ["没关系", "méi guān xi", "no problem"], ["不用谢", "bú yòng xiè", "you are welcome"]]),
  makeDialogueCategory("学习动作", "xué xí dòng zuò", "study actions", "✏️", "请听、说、读、写。", "qǐng tīng, shuō, dú, xiě.", [["听", "tīng", "listen"], ["说", "shuō", "speak"], ["读", "dú", "read"], ["写", "xiě", "write"], ["练习", "liàn xí", "practice"]]),
  makeDialogueCategory("商店对话", "shāng diàn duì huà", "shop talk", "🧾", "我要一个袋子，谢谢。", "wǒ yào yí ge dài zi, xiè xie.", [["我要", "wǒ yào", "I want"], ["一个", "yí ge", "one"], ["袋子", "dài zi", "bag"], ["收据", "shōu jù", "receipt"], ["找钱", "zhǎo qián", "change"]]),
  makeDialogueCategory("餐厅", "cān tīng", "restaurant", "🍽️", "我想点一碗面。", "wǒ xiǎng diǎn yì wǎn miàn.", [["菜单", "cài dān", "menu"], ["点菜", "diǎn cài", "order food"], ["好吃", "hǎo chī", "tasty"], ["服务员", "fú wù yuán", "waiter"], ["一碗", "yì wǎn", "a bowl"]]),
  makeDialogueCategory("宠物", "chǒng wù", "pets", "🐶", "我每天喂小狗。", "wǒ měi tiān wèi xiǎo gǒu.", [["宠物", "chǒng wù", "pet"], ["兔子", "tù zi", "rabbit"], ["小狗", "xiǎo gǒu", "dog"], ["小猫", "xiǎo māo", "cat"], ["喂", "wèi", "feed"]]),
  makeDialogueCategory("农场", "nóng chǎng", "farm", "🚜", "农场里有牛和羊。", "nóng chǎng lǐ yǒu niú hé yáng.", [["农场", "nóng chǎng", "farm"], ["牛", "niú", "cow"], ["羊", "yáng", "sheep"], ["鸡", "jī", "chicken"], ["猪", "zhū", "pig"]]),
  makeDialogueCategory("节日", "jié rì", "festivals", "🏮", "春节我们收红包。", "chūn jié wǒ men shōu hóng bāo.", [["春节", "chūn jié", "Spring Festival"], ["灯笼", "dēng long", "lantern"], ["月饼", "yuè bǐng", "mooncake"], ["舞龙", "wǔ lóng", "dragon dance"], ["红包", "hóng bāo", "red packet"]]),
  makeDialogueCategory("中文文化", "zhōng wén wén huà", "Chinese culture", "🖌️", "我用毛笔写汉字。", "wǒ yòng máo bǐ xiě hàn zì.", [["汉字", "hàn zì", "Chinese character"], ["拼音", "pīn yīn", "pinyin"], ["毛笔", "máo bǐ", "brush"], ["书法", "shū fǎ", "calligraphy"], ["宣纸", "xuān zhǐ", "rice paper"]]),
  makeDialogueCategory("澳洲", "ào zhōu", "Australia", "🌏", "我住在澳洲。", "wǒ zhù zài ào zhōu.", [["澳洲", "ào zhōu", "Australia"], ["学校", "xué xiào", "school"], ["海边", "hǎi biān", "beach"], ["城市", "chéng shì", "city"], ["家", "jiā", "home"]]),
  makeDialogueCategory("安全", "ān quán", "safety", "🛑", "过马路时要小心。", "guò mǎ lù shí yào xiǎo xīn.", [["停", "tíng", "stop"], ["等", "děng", "wait"], ["小心", "xiǎo xīn", "careful"], ["帮忙", "bāng máng", "help"], ["马路", "mǎ lù", "road"]]),
  makeDialogueCategory("动作", "dòng zuò", "actions", "🏃", "请站起来，再坐下。", "qǐng zhàn qǐ lái, zài zuò xià.", [["走", "zǒu", "walk"], ["跑", "pǎo", "run"], ["坐", "zuò", "sit"], ["站", "zhàn", "stand"], ["转", "zhuǎn", "turn"]]),
  makeDialogueCategory("形状", "xíng zhuàng", "shapes", "🔺", "这个盒子是方形。", "zhè ge hé zi shì fāng xíng.", [["圆形", "yuán xíng", "circle"], ["方形", "fāng xíng", "square"], ["三角形", "sān jiǎo xíng", "triangle"], ["大", "dà", "big"], ["小", "xiǎo", "small"]]),
];

const ROLEPLAY_SCENARIOS = [
  makeRoleplayScenario("在学校介绍自己", "zài xué xiào jiè shào zì jǐ", "introducing yourself at school", "🏫", "大家好，我叫小明。我来自澳洲，喜欢中文。", "dà jiā hǎo, wǒ jiào xiǎo míng. wǒ lái zì ào zhōu, xǐ huān zhōng wén.", [["大家好", "dà jiā hǎo", "hello everyone"], ["我叫", "wǒ jiào", "my name is"], ["来自", "lái zì", "come from"], ["澳洲", "ào zhōu", "Australia"], ["喜欢", "xǐ huān", "like"]]),
  makeRoleplayScenario("去商店买东西", "qù shāng diàn mǎi dōng xi", "shopping at a store", "🛍️", "你好，我想买一个苹果。这个多少钱？", "nǐ hǎo, wǒ xiǎng mǎi yí ge píng guǒ. zhè ge duō shao qián?", [["商店", "shāng diàn", "store"], ["买", "mǎi", "buy"], ["苹果", "píng guǒ", "apple"], ["多少", "duō shao", "how much"], ["钱", "qián", "money"]]),
  makeRoleplayScenario("在餐厅点餐", "zài cān tīng diǎn cān", "ordering food", "🍜", "服务员你好。我想要一碗面和一杯水。", "fú wù yuán nǐ hǎo. wǒ xiǎng yào yì wǎn miàn hé yì bēi shuǐ.", [["服务员", "fú wù yuán", "waiter"], ["想要", "xiǎng yào", "would like"], ["一碗", "yì wǎn", "a bowl"], ["面", "miàn", "noodles"], ["水", "shuǐ", "water"]]),
  makeRoleplayScenario("在家帮忙", "zài jiā bāng máng", "helping at home", "🧹", "妈妈，我来洗碗。然后我们一起打扫。", "mā ma, wǒ lái xǐ wǎn. rán hòu wǒ men yì qǐ dǎ sǎo.", [["妈妈", "mā ma", "mum"], ["洗碗", "xǐ wǎn", "wash dishes"], ["然后", "rán hòu", "then"], ["一起", "yì qǐ", "together"], ["打扫", "dǎ sǎo", "clean"]]),
  makeRoleplayScenario("问路去图书馆", "wèn lù qù tú shū guǎn", "asking the way to the library", "📚", "请问，图书馆在哪里？在学校右边。", "qǐng wèn, tú shū guǎn zài nǎ lǐ? zài xué xiào yòu bian.", [["请问", "qǐng wèn", "excuse me"], ["图书馆", "tú shū guǎn", "library"], ["哪里", "nǎ lǐ", "where"], ["学校", "xué xiào", "school"], ["右边", "yòu bian", "right side"]]),
  makeRoleplayScenario("看医生", "kàn yī shēng", "seeing a doctor", "🏥", "医生你好。我头疼，也有点发烧。", "yī shēng nǐ hǎo. wǒ tóu téng, yě yǒu diǎn fā shāo.", [["医生", "yī shēng", "doctor"], ["头疼", "tóu téng", "headache"], ["有点", "yǒu diǎn", "a little"], ["发烧", "fā shāo", "fever"], ["你好", "nǐ hǎo", "hello"]]),
  makeRoleplayScenario("运动会报名", "yùn dòng huì bào míng", "joining sports day", "🏃", "老师，我想参加跑步。我会努力练习。", "lǎo shī, wǒ xiǎng cān jiā pǎo bù. wǒ huì nǔ lì liàn xí.", [["老师", "lǎo shī", "teacher"], ["参加", "cān jiā", "join"], ["跑步", "pǎo bù", "running"], ["努力", "nǔ lì", "work hard"], ["练习", "liàn xí", "practice"]]),
  makeRoleplayScenario("生日聚会", "shēng rì jù huì", "birthday party", "🎂", "祝你生日快乐！这是我送你的礼物。", "zhù nǐ shēng rì kuài lè! zhè shì wǒ sòng nǐ de lǐ wù.", [["祝", "zhù", "wish"], ["生日", "shēng rì", "birthday"], ["快乐", "kuài lè", "happy"], ["送", "sòng", "give"], ["礼物", "lǐ wù", "gift"]]),
  makeRoleplayScenario("照顾宠物", "zhào gù chǒng wù", "caring for a pet", "🐶", "我的小狗饿了。我给它水和饭。", "wǒ de xiǎo gǒu è le. wǒ gěi tā shuǐ hé fàn.", [["小狗", "xiǎo gǒu", "dog"], ["饿了", "è le", "hungry"], ["给", "gěi", "give"], ["水", "shuǐ", "water"], ["饭", "fàn", "food"]]),
  makeRoleplayScenario("下雨借伞", "xià yǔ jiè sǎn", "borrowing an umbrella", "☂️", "外面下雨了。请问，我可以借你的伞吗？", "wài mian xià yǔ le. qǐng wèn, wǒ kě yǐ jiè nǐ de sǎn ma?", [["外面", "wài mian", "outside"], ["下雨", "xià yǔ", "rain"], ["请问", "qǐng wèn", "may I ask"], ["可以", "kě yǐ", "may"], ["伞", "sǎn", "umbrella"]]),
  makeRoleplayScenario("上课回答问题", "shàng kè huí dá wèn tí", "answering in class", "🙋", "老师，我知道答案。这个字读作水。", "lǎo shī, wǒ zhī dào dá àn. zhè ge zì dú zuò shuǐ.", [["老师", "lǎo shī", "teacher"], ["知道", "zhī dào", "know"], ["答案", "dá àn", "answer"], ["这个字", "zhè ge zì", "this character"], ["读作", "dú zuò", "is read as"]]),
  makeRoleplayScenario("在公园找朋友", "zài gōng yuán zhǎo péng you", "finding a friend at the park", "🌳", "你好，我在公园门口。你在哪里？", "nǐ hǎo, wǒ zài gōng yuán mén kǒu. nǐ zài nǎ lǐ?", [["公园", "gōng yuán", "park"], ["门口", "mén kǒu", "entrance"], ["哪里", "nǎ lǐ", "where"], ["朋友", "péng you", "friend"], ["你好", "nǐ hǎo", "hello"]]),
];

const defaultState = {
  lessonIndex: 0,
  charIndex: 0,
  xp: 0,
  completedLessons: [],
  stickers: [],
  attempts: {},
  uiLanguage: "bilingual",
  uiSkin: "classic",
  dialogueCategoryIndex: 0,
  roleplayIndex: 0,
};

let customEntries = loadCustomEntries();
let userProfiles = loadUserProfiles();
let activeUser = null;
let state = freshDefaultState();
let lastRenderedXp = null;
let lastRenderedLevel = null;
let editingProfileId = null;

function freshDefaultState() {
  return {
    ...defaultState,
    completedLessons: [],
    stickers: [],
    attempts: {},
  };
}

function stateStorageKey(userId) {
  return `${STORAGE_KEY}-user-${userId}`;
}

function readStoredState(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key));
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
}

function normalizeLoadedState(loadedState) {
  const merged = { ...freshDefaultState(), ...loadedState };
  if (!Array.isArray(merged.completedLessons)) merged.completedLessons = [];
  if (!Array.isArray(merged.stickers)) merged.stickers = [];
  if (!merged.attempts || typeof merged.attempts !== "object" || Array.isArray(merged.attempts)) {
    merged.attempts = {};
  }
  if (!UI_LANGUAGE_OPTIONS.some((option) => option.value === merged.uiLanguage)) {
    merged.uiLanguage = "en";
  }
  if (!UI_SKIN_OPTIONS.some((option) => option.value === merged.uiSkin)) {
    merged.uiSkin = "classic";
  }
  return merged;
}

function loadStateForUser(userId) {
  const stored = readStoredState(stateStorageKey(userId));
  const hasUserState = Object.keys(stored).length > 0;
  const legacyState = userId === USER_PROFILES[0]?.id && !hasUserState ? readStoredState(STORAGE_KEY) : {};
  return normalizeLoadedState(hasUserState ? stored : legacyState);
}

function loadState() {
  return activeUser ? loadStateForUser(activeUser.id) : normalizeLoadedState(state);
}

function saveState() {
  if (!activeUser) return;
  localStorage.setItem(stateStorageKey(activeUser.id), JSON.stringify(state));
}

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function cleanMultiline(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function firstProfileMark(name, fallbackMark) {
  const first = Array.from(cleanText(name))[0];
  return first ? first.toLocaleUpperCase() : fallbackMark;
}

function normalizeProfileMark(value, fallbackMark) {
  const mark = Array.from(cleanText(value)).slice(0, 2).join("");
  return mark || fallbackMark;
}

function normalizeUserProfile(raw, fallbackProfile) {
  const name = cleanText(raw?.name).slice(0, 24) || fallbackProfile.name;
  const mark = normalizeProfileMark(raw?.mark, firstProfileMark(name, fallbackProfile.mark));
  return {
    ...fallbackProfile,
    name,
    mark,
  };
}

function profileStoragePayload() {
  return Object.fromEntries(userProfiles.map(({ id, name, mark }) => [id, { name, mark }]));
}

function loadUserProfiles() {
  let savedProfiles = {};
  try {
    const parsed = JSON.parse(localStorage.getItem(USER_PROFILES_KEY));
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) savedProfiles = parsed;
  } catch {
    savedProfiles = {};
  }
  return USER_PROFILES.map((profile) => normalizeUserProfile(savedProfiles[profile.id], profile));
}

function saveUserProfiles() {
  localStorage.setItem(USER_PROFILES_KEY, JSON.stringify(profileStoragePayload()));
}

function resetUserProfile(userId) {
  const fallbackProfile = USER_PROFILES.find((profile) => profile.id === userId);
  if (!fallbackProfile) return null;
  const resetProfile = { ...fallbackProfile };
  userProfiles = userProfiles.map((profile) => (profile.id === userId ? resetProfile : profile));
  saveUserProfiles();
  return resetProfile;
}

function customEntryFromRaw(raw) {
  if (!raw || typeof raw !== "object") return null;
  const char = cleanText(raw.char);
  const pinyin = cleanText(raw.pinyin);
  const meaningZh = cleanMultiline(raw.meaningZh);
  const meaningEn = cleanText(raw.meaningEn);
  const words = Array.isArray(raw.words)
    ? raw.words
        .map((word) => ({
          word: cleanText(word?.word),
          meaningEn: cleanText(word?.meaningEn),
        }))
        .filter((word) => word.word && word.meaningEn)
        .slice(0, 3)
    : [];
  const sentences = Array.isArray(raw.sentences)
    ? raw.sentences
        .map((sentence) => ({
          zh: cleanMultiline(sentence?.zh),
          en: cleanText(sentence?.en),
        }))
        .filter((sentence) => sentence.zh && sentence.en)
        .slice(0, 3)
    : [];

  if (!char || !pinyin || !meaningZh || !meaningEn || words.length !== 3 || sentences.length !== 3) {
    return null;
  }

  return {
    id: cleanText(raw.id) || `custom-${char}`,
    char,
    pinyin,
    pinyinAlt: Array.isArray(raw.pinyinAlt) && raw.pinyinAlt.length ? raw.pinyinAlt.map(cleanText).filter(Boolean) : [pinyin],
    meaningEn,
    meaningZh,
    radical: cleanText(raw.radical) || char,
    strokes: Number.isFinite(Number(raw.strokes)) && Number(raw.strokes) > 0 ? Number(raw.strokes) : "",
    structure: cleanText(raw.structure) || "custom character",
    words,
    sentence: sentences[0],
    sentences,
    etymologyHint: cleanText(raw.etymologyHint) || "Added by user",
    sourceTags: ["custom-local"],
    custom: true,
    createdAt: cleanText(raw.createdAt) || new Date().toISOString(),
  };
}

function loadCustomEntries() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CUSTOM_ENTRIES_KEY));
    if (!Array.isArray(parsed)) return [];
    return parsed.map(customEntryFromRaw).filter(Boolean);
  } catch {
    return [];
  }
}

function saveCustomEntries() {
  localStorage.setItem(CUSTOM_ENTRIES_KEY, JSON.stringify(customEntries));
}

function allEntries() {
  return [...BASE_ENTRIES, ...customEntries];
}

function countEntryWords(entries) {
  return entries.reduce((total, entry) => total + (Array.isArray(entry.words) ? entry.words.length : 0), 0);
}

function countEntrySentences(entries) {
  return entries.reduce((total, entry) => {
    if (Array.isArray(entry.sentences)) return total + entry.sentences.length;
    return total + (entry.sentence ? 1 : 0);
  }, 0);
}

function numericDataValue(key, fallback) {
  const value = Number(DATA[key]);
  return Number.isFinite(value) ? value : fallback;
}

function databaseTotals() {
  return {
    characters: allEntries().length,
    words: numericDataValue("commonWordCount", countEntryWords(BASE_ENTRIES)) + countEntryWords(customEntries),
    sentences: numericDataValue("sentenceCount", countEntrySentences(BASE_ENTRIES)) + countEntrySentences(customEntries),
    idioms: numericDataValue("idiomCount", IDIOMS.length),
  };
}

function lessonCount() {
  return Math.max(1, Math.ceil(allEntries().length / LESSON_SIZE));
}

function formatTemplate(template, values = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function activeUiLanguage() {
  return UI_TEXT[state.uiLanguage] ? state.uiLanguage : "en";
}

function t(key, values = {}) {
  if (state.uiLanguage === "bilingual") {
    const zh = UI_TEXT.zh[key] || UI_TEXT.en[key] || key;
    const en = UI_TEXT.en[key] || key;
    const zhText = formatTemplate(zh, values);
    const enText = formatTemplate(en, values);
    return zhText === enText ? zhText : `${zhText} / ${enText}`;
  }
  const language = activeUiLanguage();
  return formatTemplate(UI_TEXT[language][key] || UI_TEXT.en[key] || key, values);
}

function applyUiSkin() {
  document.body.dataset.skin = UI_SKIN_OPTIONS.some((option) => option.value === state.uiSkin)
    ? state.uiSkin
    : "classic";
}

function applyStaticText() {
  document.documentElement.lang = UI_LANG_ATTR[state.uiLanguage] || "en";
  applyUiSkin();
  els.uiLanguageSelect.innerHTML = "";
  UI_LANGUAGE_OPTIONS.forEach((language) => {
    const option = document.createElement("option");
    option.value = language.value;
    option.textContent = language.label;
    option.selected = language.value === state.uiLanguage;
    els.uiLanguageSelect.append(option);
  });
  els.uiSkinSelect.innerHTML = "";
  UI_SKIN_OPTIONS.forEach((skin) => {
    const option = document.createElement("option");
    option.value = skin.value;
    option.textContent = t(skin.labelKey);
    option.selected = skin.value === state.uiSkin;
    els.uiSkinSelect.append(option);
  });
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    node.innerHTML = t(node.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
}

function refreshCurrentScreen() {
  const screen = document.body.dataset.screen || "home";
  if (screen === "login") {
    renderLogin();
  } else if (screen === "home") {
    renderHome();
  } else if (screen === "lessonPicker") {
    renderLessonPicker();
  } else if (screen === "customCharacter") {
    renderCustomCharacter();
    renderStats();
  } else if (screen === "search") {
    renderSearch();
    renderStats();
  } else if (screen === "idiom") {
    renderIdiomSeries();
    renderStats();
  } else if (screen === "dialogue") {
    renderDialoguePractice();
    renderStats();
  } else if (screen === "roleplay") {
    renderRoleplayPractice();
    renderStats();
  } else if (screen === "lesson") {
    renderLesson();
    renderStats();
  } else if (screen === "test" && quiz) {
    renderQuiz();
    renderStats();
  } else if (screen === "result") {
    renderResult({ quiet: true });
  } else {
    renderStats();
  }
}

function changeUiLanguage(event) {
  state.uiLanguage = event.target.value;
  saveState();
  applyStaticText();
  refreshCurrentScreen();
}

function changeUiSkin(event) {
  state.uiSkin = event.target.value;
  saveState();
  applyUiSkin();
  sparkleAt(els.uiSkinSelect, { count: 7, spread: 62, glyphs: ["✦", "色", "★"] });
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeStateCoursePointers() {
  state.lessonIndex = clamp(Number(state.lessonIndex) || 0, 0, lessonCount() - 1);
  const entries = lessonEntries(state.lessonIndex);
  state.charIndex = clamp(Number(state.charIndex) || 0, 0, Math.max(0, entries.length - 1));
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function lessonEntries(lessonIndex = state.lessonIndex) {
  const start = lessonIndex * LESSON_SIZE;
  return allEntries().slice(start, start + LESSON_SIZE);
}

function currentEntry() {
  return lessonEntries()[state.charIndex] || lessonEntries()[0] || allEntries()[0];
}

function lessonKey(index = state.lessonIndex) {
  return String(index);
}

function levelInfo() {
  const level = Math.floor(state.xp / XP_PER_LEVEL) + 1;
  const intoLevel = state.xp % XP_PER_LEVEL;
  const percent = (intoLevel / XP_PER_LEVEL) * 100;
  return { level, intoLevel, percent };
}

function melbourneDateKey(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function prettyDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat(UI_DATE_LOCALE[state.uiLanguage] || "en-AU", {
    month: "short",
    day: "numeric",
    timeZone: "Australia/Melbourne",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function dateParts(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const monthText = new Intl.DateTimeFormat(UI_DATE_LOCALE[state.uiLanguage] || "en-AU", {
    month: "short",
    timeZone: "Australia/Melbourne",
  }).format(date);
  return {
    month: state.uiLanguage === "en" || state.uiLanguage === "bilingual" ? monthText.toUpperCase() : monthText,
    day: String(day),
  };
}

function hashText(value) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function dailyLessonInfo(dateKey = melbourneDateKey()) {
  const index = hashText(`daily-lesson-${dateKey}`) % lessonCount();
  return {
    dateKey,
    index,
    entries: lessonEntries(index),
  };
}

function currentStreak() {
  const dates = new Set(state.stickers.map((sticker) => sticker.date));
  let streak = 0;
  for (let offset = 0; offset > -120; offset -= 1) {
    if (dates.has(melbourneDateKey(offset))) {
      streak += 1;
    } else if (offset !== 0) {
      break;
    }
  }
  return streak;
}

function allowMotion() {
  return !window.matchMedia || !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function replayClass(element, className) {
  if (!element || !allowMotion()) return;
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

function getHomeAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!homeAudioContext || homeAudioContext.state === "closed") {
    homeAudioContext = new AudioContextClass();
  }
  return homeAudioContext;
}

function unlockHomeAnimalAudio() {
  const ctx = getHomeAudioContext();
  if (!ctx || ctx.state !== "suspended") return;
  ctx.resume().catch(() => {});
}

function scheduleAnimalTone(ctx, destination, options) {
  const {
    at = 0,
    duration = 0.16,
    type = "sine",
    from = 440,
    to = from,
    gain = 0.08,
    attack = 0.015,
  } = options;
  const start = ctx.currentTime + at;
  const end = start + duration;
  const oscillator = ctx.createOscillator();
  const envelope = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(Math.max(1, from), start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, to), Math.max(start + 0.01, end - 0.018));
  envelope.gain.setValueAtTime(0.0001, start);
  envelope.gain.exponentialRampToValueAtTime(gain, start + attack);
  envelope.gain.exponentialRampToValueAtTime(0.0001, end);
  oscillator.connect(envelope);
  envelope.connect(destination);
  oscillator.start(start);
  oscillator.stop(end + 0.04);
}

function scheduleAnimalNoise(ctx, destination, options) {
  const {
    at = 0,
    duration = 0.16,
    gain = 0.04,
    filterType = "bandpass",
    frequency = 700,
    q = 4,
  } = options;
  const start = ctx.currentTime + at;
  const frameCount = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, frameCount, ctx.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let index = 0; index < frameCount; index += 1) {
    samples[index] = Math.random() * 2 - 1;
  }

  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const envelope = ctx.createGain();
  source.buffer = buffer;
  filter.type = filterType;
  filter.frequency.setValueAtTime(frequency, start);
  filter.Q.setValueAtTime(q, start);
  envelope.gain.setValueAtTime(0.0001, start);
  envelope.gain.exponentialRampToValueAtTime(gain, start + 0.018);
  envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter);
  filter.connect(envelope);
  envelope.connect(destination);
  source.start(start);
  source.stop(start + duration + 0.03);
}

function scheduleHomeAnimalSound(kind, ctx, destination) {
  switch (kind) {
    case "dog":
      scheduleAnimalTone(ctx, destination, { type: "square", from: 180, to: 92, duration: 0.09, gain: 0.09 });
      scheduleAnimalTone(ctx, destination, { at: 0.11, type: "square", from: 230, to: 120, duration: 0.08, gain: 0.07 });
      break;
    case "frog":
      scheduleAnimalTone(ctx, destination, { type: "sine", from: 105, to: 72, duration: 0.23, gain: 0.09, attack: 0.035 });
      scheduleAnimalTone(ctx, destination, { at: 0.04, type: "sawtooth", from: 145, to: 88, duration: 0.18, gain: 0.045 });
      break;
    case "duck":
      scheduleAnimalTone(ctx, destination, { type: "sawtooth", from: 450, to: 260, duration: 0.12, gain: 0.075 });
      scheduleAnimalTone(ctx, destination, { at: 0.15, type: "sawtooth", from: 420, to: 250, duration: 0.11, gain: 0.07 });
      break;
    case "elephant":
      scheduleAnimalTone(ctx, destination, { type: "sawtooth", from: 520, to: 900, duration: 0.22, gain: 0.055 });
      scheduleAnimalTone(ctx, destination, { at: 0.04, type: "triangle", from: 340, to: 720, duration: 0.18, gain: 0.045 });
      scheduleAnimalTone(ctx, destination, { at: 0.2, type: "sawtooth", from: 820, to: 520, duration: 0.18, gain: 0.04 });
      break;
    case "fox":
      scheduleAnimalTone(ctx, destination, { type: "triangle", from: 780, to: 1180, duration: 0.08, gain: 0.06 });
      scheduleAnimalTone(ctx, destination, { at: 0.1, type: "triangle", from: 540, to: 850, duration: 0.09, gain: 0.055 });
      break;
    case "rabbit":
      scheduleAnimalTone(ctx, destination, { type: "sine", from: 1250, to: 1620, duration: 0.055, gain: 0.045 });
      scheduleAnimalTone(ctx, destination, { at: 0.075, type: "sine", from: 980, to: 1450, duration: 0.06, gain: 0.04 });
      break;
    case "hedgehog":
      scheduleAnimalNoise(ctx, destination, { duration: 0.15, gain: 0.035, frequency: 880, q: 6 });
      scheduleAnimalNoise(ctx, destination, { at: 0.15, duration: 0.12, gain: 0.03, frequency: 620, q: 5 });
      scheduleAnimalTone(ctx, destination, { at: 0.05, type: "triangle", from: 640, to: 520, duration: 0.04, gain: 0.025 });
      break;
    case "bear":
      scheduleAnimalTone(ctx, destination, { type: "sawtooth", from: 92, to: 62, duration: 0.28, gain: 0.065, attack: 0.035 });
      scheduleAnimalNoise(ctx, destination, { duration: 0.26, gain: 0.032, filterType: "lowpass", frequency: 190, q: 1.2 });
      break;
    case "panda":
    default:
      scheduleAnimalTone(ctx, destination, { type: "triangle", from: 250, to: 182, duration: 0.16, gain: 0.065, attack: 0.025 });
      scheduleAnimalTone(ctx, destination, { at: 0.12, type: "sine", from: 330, to: 230, duration: 0.12, gain: 0.045 });
      break;
  }
}

async function playHomeAnimalSound(kind) {
  const ctx = getHomeAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    await ctx.resume();
  }
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.72, ctx.currentTime);
  master.connect(ctx.destination);
  scheduleHomeAnimalSound(kind, ctx, master);
  window.setTimeout(() => {
    try {
      master.disconnect();
    } catch {
      // The sound may already have been disconnected by the browser.
    }
  }, 720);
}

function handleHomeAnimalHover(event) {
  if (event.pointerType === "touch") return;
  const target = event.currentTarget;
  if (!(target instanceof HTMLElement)) return;
  const sound = target.dataset.animalSound;
  if (!sound) return;
  const now = performance.now();
  if (sound === lastHomeAnimalSound && now - lastHomeAnimalSoundAt < HOME_ANIMAL_SOUND_COOLDOWN_MS) return;
  if (now - lastHomeAnimalSoundAt < 110) return;
  lastHomeAnimalSound = sound;
  lastHomeAnimalSoundAt = now;
  replayClass(target, "hotspot-sound");
  playHomeAnimalSound(sound).catch(() => {});
}

function staggerChildren(container, selector) {
  if (!container) return;
  [...container.querySelectorAll(selector)].forEach((child, index) => {
    child.style.setProperty("--stagger", index);
  });
}

function celebrationPoint(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function sparkleAt(element, options = {}) {
  if (!allowMotion() || !element || !els.celebrationLayer) return;
  const { count = 10, spread = 120, glyphs = SPARKLE_GLYPHS } = options;
  const { x, y } = celebrationPoint(element);
  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.42;
    const distance = spread * (0.42 + Math.random() * 0.72);
    particle.className = "sparkle-particle";
    particle.textContent = glyphs[index % glyphs.length];
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--dy", `${Math.sin(angle) * distance - 24}px`);
    particle.style.setProperty("--rot", `${Math.round(Math.random() * 220 - 80)}deg`);
    particle.style.setProperty("--sparkle-color", SPARKLE_COLORS[index % SPARKLE_COLORS.length]);
    particle.style.setProperty("--sparkle-size", `${0.9 + Math.random() * 0.7}rem`);
    particle.addEventListener("animationend", () => particle.remove(), { once: true });
    els.celebrationLayer.append(particle);
  }
}

function floatScore(element, text) {
  if (!allowMotion() || !element || !els.celebrationLayer) return;
  const label = document.createElement("span");
  const { x, y } = celebrationPoint(element);
  label.className = "floating-score";
  label.textContent = text;
  label.style.left = `${x}px`;
  label.style.top = `${y}px`;
  label.addEventListener("animationend", () => label.remove(), { once: true });
  els.celebrationLayer.append(label);
}

function addPressRipple(button, event) {
  if (!allowMotion() || !button || button.disabled) return;
  const rect = button.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "press-ripple";
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  button.append(ripple);
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2400);
}

function coach(message, toast = false) {
  els.coachMessage.textContent = message;
  if (toast) showToast(message);
}

function userById(userId) {
  return userProfiles.find((user) => user.id === userId) || null;
}

function levelForState(userState) {
  return Math.floor((Number(userState.xp) || 0) / XP_PER_LEVEL) + 1;
}

function updateActiveUserLabels() {
  const label = activeUser ? t("signedInAs", { name: activeUser.name }) : "";
  if (els.currentUserName) els.currentUserName.textContent = label;
  if (els.homeCurrentUserName) els.homeCurrentUserName.textContent = label;
}

function resetSessionViews() {
  selectedSearchEntry = null;
  quiz = null;
  lastResult = null;
  writer = null;
  searchWriter = null;
  lastRenderedXp = null;
  lastRenderedLevel = null;
}

function renderLoginUsers() {
  if (!els.loginUserList) return;
  const lastUserId = localStorage.getItem(ACTIVE_USER_KEY);
  els.loginUserList.innerHTML = "";
  userProfiles.forEach((profile) => {
    const previewState = loadStateForUser(profile.id);
    const completedCount = Array.isArray(previewState.completedLessons) ? previewState.completedLessons.length : 0;
    const card = document.createElement("article");
    card.className = "login-user-card";
    if (profile.id === lastUserId) card.classList.add("last-used");
    card.dataset.userId = profile.id;

    const avatar = document.createElement("span");
    avatar.className = "login-user-avatar";
    avatar.textContent = profile.mark;

    const copy = document.createElement("span");
    copy.className = "login-user-copy";
    const name = document.createElement("strong");
    name.textContent = profile.name;
    const meta = document.createElement("span");
    meta.textContent = t("loginProgressMeta", {
      xp: Number(previewState.xp) || 0,
      level: levelForState(previewState),
      lessons: completedCount,
    });
    copy.append(name, meta);

    const actions = document.createElement("span");
    actions.className = "login-user-actions";

    const editAction = document.createElement("button");
    editAction.className = "login-profile-edit";
    editAction.type = "button";
    editAction.dataset.editProfileId = profile.id;
    editAction.textContent = "✎";
    editAction.title = t("editProfile");
    editAction.setAttribute("aria-label", t("editProfileFor", { name: profile.name }));

    actions.append(editAction);
    card.append(avatar, copy, actions);

    if (profile.id === lastUserId) {
      const badge = document.createElement("em");
      badge.textContent = t("lastUser");
      card.append(badge);
    }

    els.loginUserList.append(card);
  });
}

function renderLogin() {
  renderLoginUsers();
  setScreen("login");
}

function loginUser(userId) {
  const user = userById(userId);
  if (!user) return;
  unlockHomeAnimalAudio();
  activeUser = user;
  state = loadStateForUser(user.id);
  normalizeStateCoursePointers();
  localStorage.setItem(ACTIVE_USER_KEY, user.id);
  resetSessionViews();
  applyStaticText();
  updateActiveUserLabels();
  renderHome();
  showToast(t("loginToast", { name: user.name }));
}

function handleLoginUserClick(event) {
  const source = event.target instanceof Element ? event.target : null;
  const editButton = source?.closest("[data-edit-profile-id]");
  if (editButton) {
    openProfileEditor(editButton.dataset.editProfileId);
    return;
  }
  const card = source?.closest("[data-user-id]");
  if (!card) return;
  loginUser(card.dataset.userId);
}

function setProfileValidation(message, tone = "") {
  if (!els.profileEditValidation) return;
  els.profileEditValidation.textContent = message;
  els.profileEditValidation.className = `custom-validation${tone ? ` ${tone}` : ""}`;
}

function fillProfileForm(profile) {
  if (!profile) return;
  if (els.profileNameInput) els.profileNameInput.value = profile.name;
  if (els.profileMarkInput) els.profileMarkInput.value = profile.mark;
  setProfileValidation("");
}

function openProfileEditor(userId) {
  const profile = userById(userId);
  if (!profile || !els.profileEditDialog) return;
  editingProfileId = userId;
  fillProfileForm(profile);
  if (typeof els.profileEditDialog.showModal === "function") {
    els.profileEditDialog.showModal();
  } else {
    els.profileEditDialog.setAttribute("open", "");
  }
  requestAnimationFrame(() => replayClass(els.profileEditDialog.querySelector(".profile-panel"), "guide-pop"));
}

function closeProfileEditor() {
  editingProfileId = null;
  if (!els.profileEditDialog) return;
  if (typeof els.profileEditDialog.close === "function") {
    els.profileEditDialog.close();
  } else {
    els.profileEditDialog.removeAttribute("open");
  }
}

function closeProfileEditorOnBackdrop(event) {
  if (event.target === els.profileEditDialog) closeProfileEditor();
}

function saveProfileEdit(event) {
  event.preventDefault();
  if (!editingProfileId) return;
  const name = cleanText(els.profileNameInput?.value).slice(0, 24);
  const fallbackProfile = USER_PROFILES.find((profile) => profile.id === editingProfileId);
  if (!name) {
    setProfileValidation(t("profileNameRequired"), "needs-review");
    return;
  }
  const mark = normalizeProfileMark(els.profileMarkInput?.value, firstProfileMark(name, fallbackProfile?.mark || "学"));
  if (!mark) {
    setProfileValidation(t("profileMarkRequired"), "needs-review");
    return;
  }
  const nextProfile = normalizeUserProfile({ name, mark }, fallbackProfile || { id: editingProfileId, name, mark });
  userProfiles = userProfiles.map((profile) => (profile.id === editingProfileId ? { ...profile, ...nextProfile } : profile));
  saveUserProfiles();
  if (activeUser?.id === editingProfileId) activeUser = userById(editingProfileId);
  updateActiveUserLabels();
  renderLoginUsers();
  closeProfileEditor();
  showToast(t("profileSavedToast", { name: nextProfile.name }));
}

function resetProfileEdit() {
  if (!editingProfileId) return;
  const resetProfile = resetUserProfile(editingProfileId);
  if (!resetProfile) return;
  if (activeUser?.id === editingProfileId) activeUser = userById(editingProfileId);
  fillProfileForm(resetProfile);
  updateActiveUserLabels();
  renderLoginUsers();
  showToast(t("profileResetToast"));
}

function switchUser() {
  const uiLanguage = state.uiLanguage;
  const uiSkin = state.uiSkin;
  stopSpeech();
  stopCameraWriting({ quiet: true });
  activeUser = null;
  state = normalizeLoadedState({ uiLanguage, uiSkin });
  resetSessionViews();
  applyStaticText();
  updateActiveUserLabels();
  renderLogin();
}

function screenElementFor(screen) {
  return {
    login: els.loginView,
    home: els.homeView,
    lessonPicker: els.lessonPickerView,
    customCharacter: els.customCharacterView,
    search: els.searchView,
    idiom: els.idiomView,
    dialogue: els.dialogueView,
    roleplay: els.roleplayView,
    lesson: els.lessonView,
    test: els.testView,
    result: els.resultView,
  }[screen];
}

function setScreen(screen) {
  stopSpeech();
  if (screen !== "lesson") stopCameraWriting({ quiet: true });
  const previousScreen = document.body.dataset.screen;
  document.body.dataset.screen = screen;
  els.loginView.classList.toggle("hidden", screen !== "login");
  els.homeView.classList.toggle("hidden", screen !== "home");
  els.lessonPickerView.classList.toggle("hidden", screen !== "lessonPicker");
  els.customCharacterView.classList.toggle("hidden", screen !== "customCharacter");
  els.searchView.classList.toggle("hidden", screen !== "search");
  els.idiomView.classList.toggle("hidden", screen !== "idiom");
  els.dialogueView.classList.toggle("hidden", screen !== "dialogue");
  els.roleplayView.classList.toggle("hidden", screen !== "roleplay");
  els.lessonView.classList.toggle("hidden", screen !== "lesson");
  els.testView.classList.toggle("hidden", screen !== "test");
  els.resultView.classList.toggle("hidden", screen !== "result");
  const screenElement = screenElementFor(screen);
  if (previousScreen !== screen && screenElement) {
    replayClass(screenElement, "screen-enter");
    requestAnimationFrame(() => {
      screenElement.scrollIntoView({ block: "start", behavior: allowMotion() ? "smooth" : "auto" });
    });
  }
  renderStats();
}

function renderStats() {
  const { level, percent } = levelInfo();
  const xpChanged = lastRenderedXp !== null && lastRenderedXp !== state.xp;
  const levelChanged = lastRenderedLevel !== null && lastRenderedLevel !== level;
  els.levelValue.textContent = level;
  els.xpLabel.textContent = `${state.xp} XP`;
  els.xpBar.style.width = `${percent}%`;
  els.streakValue.textContent = currentStreak();
  if (xpChanged) replayClass(els.xpBar, "xp-bump");
  if (levelChanged) {
    replayClass(els.levelValue.closest(".stat-pill"), "stat-bump");
    sparkleAt(els.levelValue, { count: 12, spread: 110, glyphs: ["★", "星", "棒"] });
  }
  lastRenderedXp = state.xp;
  lastRenderedLevel = level;
}

function renderDailyLesson() {
  const daily = dailyLessonInfo();
  const parts = dateParts(daily.dateKey);
  els.dailyMonth.textContent = parts.month;
  els.dailyDay.textContent = parts.day;
  els.dailyLessonTitle.textContent = t("lessonN", { n: daily.index + 1 });
  els.dailyLessonChars.textContent = daily.entries.map((entry) => entry.char).join(" ");
  els.dailyLessonBtn.setAttribute("aria-label", t("startTodayAria", { n: daily.index + 1 }));
}

function formatCount(value) {
  return new Intl.NumberFormat(UI_DATE_LOCALE[state.uiLanguage] || "en-AU").format(value);
}

function renderDatabaseTotals() {
  const totals = databaseTotals();
  [
    [els.databaseCharacterCount, totals.characters],
    [els.databaseWordCount, totals.words],
    [els.databaseSentenceCount, totals.sentences],
    [els.databaseIdiomCount, totals.idioms],
  ].forEach(([node, value]) => {
    if (node) node.textContent = formatCount(value);
  });
}

function renderCustomSummary() {
  els.customCharacterCount.textContent = customEntries.length
    ? t("customCharacterCount", { count: customEntries.length })
    : t("customCharacterEmpty");
  if (els.idiomHomeCount) {
    els.idiomHomeCount.textContent = idiomCountLabel(IDIOMS.length);
  }
  renderDatabaseTotals();
}

function idiomCountLabel(count) {
  return count === 1 ? t("idiomCountOne") : t("idiomCount", { count });
}

function populateLessonSelect() {
  els.lessonSelect.innerHTML = "";
  for (let index = 0; index < lessonCount(); index += 1) {
    const entries = lessonEntries(index);
    const completed = state.completedLessons.includes(lessonKey(index));
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = t("lessonOption", {
      n: index + 1,
      done: completed ? " ✓" : "",
      chars: entries.map((entry) => entry.char).join(" "),
    });
    option.selected = index === state.lessonIndex;
    els.lessonSelect.append(option);
  }
}

function renderHome() {
  renderDailyLesson();
  renderCustomSummary();
  updateActiveUserLabels();
  setScreen("home");
}

function renderLessonPicker() {
  populateLessonSelect();
  setScreen("lessonPicker");
}

function openLessonPicker() {
  renderLessonPicker();
}

function clearCustomCharacterForm() {
  els.customCharacterForm.reset();
  setCustomValidation("");
}

function setCustomValidation(message, type = "") {
  els.customValidation.textContent = message;
  els.customValidation.className = "custom-validation";
  if (type) els.customValidation.classList.add(type);
}

function readCustomEntryDraft() {
  return {
    char: cleanText(els.customCharInput.value),
    pinyin: cleanText(els.customPinyinInput.value),
    meaningZh: cleanMultiline(els.customMeaningZhInput.value),
    meaningEn: cleanText(els.customMeaningEnInput.value),
    radical: cleanText(els.customRadicalInput.value),
    strokes: cleanText(els.customStrokesInput.value),
    structure: cleanText(els.customStructureInput.value),
    words: els.customWords.map((fields) => ({
      word: cleanText(fields.word.value),
      meaningEn: cleanText(fields.meaningEn.value),
    })),
    sentences: els.customSentences.map((fields) => ({
      zh: cleanMultiline(fields.zh.value),
      en: cleanText(fields.en.value),
    })),
  };
}

function isSingleChineseCharacter(value) {
  return /^[\u3400-\u9fff\uf900-\ufaff]$/.test(value);
}

function validateCustomEntryDraft(draft) {
  if (!isSingleChineseCharacter(draft.char)) {
    return t("customInvalidChar");
  }
  if (!draft.pinyin || !draft.meaningZh || !draft.meaningEn) {
    return t("customMissingRequired");
  }
  if (draft.words.some((word) => !word.word || !word.meaningEn)) {
    return t("customMissingRequired");
  }
  if (draft.sentences.some((sentence) => !sentence.zh || !sentence.en)) {
    return t("customMissingRequired");
  }
  if (BASE_ENTRIES.some((entry) => entry.char === draft.char)) {
    return t("customOriginalLocked", { char: draft.char });
  }
  if (customEntries.some((entry) => entry.char === draft.char)) {
    return t("customAlreadyExists", { char: draft.char });
  }
  if (draft.words.some((word) => !word.word.includes(draft.char))) {
    return t("customWordMustUseChar", { char: draft.char });
  }
  if (draft.sentences.some((sentence) => !sentence.zh.includes(draft.char))) {
    return t("customSentenceMustUseChar", { char: draft.char });
  }
  return "";
}

function createCustomEntry(draft) {
  const createdAt = new Date().toISOString();
  const strokes = Number(draft.strokes);
  const sentences = draft.sentences.map((sentence) => ({
    zh: sentence.zh,
    en: sentence.en,
  }));
  return {
    id: `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    char: draft.char,
    pinyin: draft.pinyin,
    pinyinAlt: [draft.pinyin],
    meaningEn: draft.meaningEn,
    meaningZh: draft.meaningZh,
    radical: draft.radical || draft.char,
    strokes: Number.isFinite(strokes) && strokes > 0 ? strokes : "",
    structure: draft.structure || "custom character",
    words: draft.words.map((word) => ({
      word: word.word,
      meaningEn: word.meaningEn,
    })),
    sentence: sentences[0],
    sentences,
    etymologyHint: "Added by user",
    sourceTags: ["custom-local"],
    custom: true,
    createdAt,
  };
}

function renderCustomSavedList() {
  els.customSavedList.innerHTML = "";
  if (!customEntries.length) {
    const empty = document.createElement("p");
    empty.className = "custom-saved-empty";
    empty.textContent = t("customSavedEmpty");
    els.customSavedList.append(empty);
    return;
  }

  customEntries.forEach((entry, index) => {
    const item = document.createElement("div");
    item.className = "custom-saved-item";
    const char = document.createElement("strong");
    char.textContent = entry.char;
    const text = document.createElement("span");
    text.textContent = `${entry.pinyin} · ${entry.meaningEn}`;
    const lesson = document.createElement("em");
    const courseIndex = BASE_ENTRIES.length + index;
    lesson.textContent = t("lessonN", { n: Math.floor(courseIndex / LESSON_SIZE) + 1 });
    item.append(char, text, lesson);
    els.customSavedList.append(item);
  });
}

function renderCustomCharacter() {
  renderCustomSavedList();
  setScreen("customCharacter");
}

function openCustomCharacter() {
  renderCustomCharacter();
  requestAnimationFrame(() => els.customCharInput.focus({ preventScroll: true }));
}

function uniqueCharactersFromText(value) {
  const seen = new Set();
  const chars = [];
  [...String(value || "")].forEach((char) => {
    if (isSingleChineseCharacter(char) && !seen.has(char)) {
      seen.add(char);
      chars.push(char);
    }
  });
  return chars;
}

function searchCourseEntries(query) {
  const cleaned = cleanText(query);
  if (!cleaned) return [];
  const chars = new Set(uniqueCharactersFromText(cleaned));
  const results = [];
  const seen = new Set();
  allEntries().forEach((entry) => {
    const matchesChar = chars.has(entry.char);
    const matchesText =
      cleaned.length > 1 &&
      entry.words?.some((word) => word.word.includes(cleaned) || cleaned.includes(word.word));
    if (!matchesChar && !matchesText) return;
    if (seen.has(entry.char)) return;
    seen.add(entry.char);
    results.push(entry);
  });
  return results.slice(0, 60);
}

function entryCourseIndex(entry) {
  return allEntries().findIndex((item) => item.char === entry.char);
}

function renderSearchResults(results) {
  els.searchResults.innerHTML = "";
  if (!results.length) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = cleanText(els.searchInput.value) ? t("searchNoMatches") : t("searchEmpty");
    els.searchResults.append(empty);
    return;
  }

  results.forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "search-result-card";
    if (selectedSearchEntry?.char === entry.char) button.classList.add("is-selected");
    const char = document.createElement("strong");
    char.textContent = entry.char;
    const text = document.createElement("span");
    const index = entryCourseIndex(entry);
    text.textContent = `${entry.pinyin || t("pinyinFallback")} · ${index >= 0 ? t("lessonN", { n: Math.floor(index / LESSON_SIZE) + 1 }) : ""}`;
    const meaning = document.createElement("em");
    meaning.textContent = entry.meaningEn || "";
    button.append(char, text, meaning);
    button.addEventListener("click", () => {
      selectedSearchEntry = entry;
      renderSearchResults(results);
      renderSearchDetail(entry);
    });
    els.searchResults.append(button);
  });
  staggerChildren(els.searchResults, ".search-result-card");
}

function renderSearchWriter(entry) {
  searchWriter = null;
  els.searchStrokeTarget.innerHTML = "";
  if (!window.HanziWriter) {
    const fallback = document.createElement("div");
    fallback.className = "writer-fallback";
    fallback.textContent = t("strokesCount", { char: entry.char, count: entry.strokes || "?" });
    els.searchStrokeTarget.append(fallback);
    return;
  }
  try {
    searchWriter = HanziWriter.create(els.searchStrokeTarget, entry.char, {
      width: 220,
      height: 220,
      padding: 12,
      showOutline: true,
      showCharacter: false,
      strokeAnimationSpeed: 1.15,
      delayBetweenStrokes: 90,
      radicalColor: "#ff7078",
      outlineColor: "#b8c8d5",
      strokeColor: "#17324d",
      drawingColor: "#2f80ed",
    });
    searchWriter.animateCharacter();
    replayClass(els.searchStrokeTarget, "writer-ready");
  } catch {
    const fallback = document.createElement("div");
    fallback.className = "writer-fallback";
    fallback.textContent = t("strokesCount", { char: entry.char, count: entry.strokes || "?" });
    els.searchStrokeTarget.append(fallback);
  }
}

function renderSearchDetail(entry) {
  if (!entry) {
    selectedSearchEntry = null;
    els.searchDetailEmpty.classList.remove("hidden");
    els.searchDetailBody.classList.add("hidden");
    els.searchDetailEmpty.textContent = cleanText(els.searchInput.value) ? t("searchNoMatches") : t("searchEmpty");
    searchWriter = null;
    els.searchStrokeTarget.innerHTML = "";
    return;
  }
  selectedSearchEntry = entry;
  els.searchDetailEmpty.classList.add("hidden");
  els.searchDetailBody.classList.remove("hidden");
  els.searchDetailChar.textContent = entry.char;
  els.searchDetailPinyin.textContent = entry.pinyin || t("pinyinFallback");
  els.searchDetailMeaningZh.textContent = entry.meaningZh || "";
  els.searchDetailMeaningEn.textContent = entry.meaningEn || "";
  els.searchRadicalValue.textContent = entry.radical || "—";
  els.searchStrokeValue.textContent = entry.strokes || "—";
  els.searchStructureValue.textContent = entry.structure || "—";
  renderWordCards(els.searchDetailWords, entry);
  renderSentenceCards(els.searchDetailSentences, entry);
  renderSearchWriter(entry);
  replayClass(els.searchDetailChar, "char-pop");
}

function renderSearch() {
  const query = cleanText(els.searchInput.value);
  const results = searchCourseEntries(query);
  if (!results.some((entry) => entry.char === selectedSearchEntry?.char)) {
    selectedSearchEntry = results[0] || null;
  }
  els.searchResultCount.textContent = query ? t("searchCount", { count: results.length }) : "";
  renderSearchResults(results);
  renderSearchDetail(selectedSearchEntry);
  setScreen("search");
}

function openSearchView() {
  renderSearch();
  requestAnimationFrame(() => els.searchInput.focus({ preventScroll: true }));
}

function submitSearch(event) {
  event.preventDefault();
  selectedSearchEntry = null;
  renderSearch();
}

function updateSearchInput() {
  selectedSearchEntry = null;
  renderSearch();
}

function speakSelectedSearchEntry() {
  const entry = selectedSearchEntry;
  if (!entry) return;
  speakText(entry.char, t("playingChar", { char: entry.char, pinyin: entry.pinyin || "" }), {
    button: els.searchSpeakBtn,
    mode: "character",
  });
}

function openSelectedSearchEntryInLesson() {
  const entry = selectedSearchEntry;
  if (!entry) return;
  const index = entryCourseIndex(entry);
  if (index < 0) return;
  state.lessonIndex = Math.floor(index / LESSON_SIZE);
  state.charIndex = index % LESSON_SIZE;
  quiz = null;
  lastResult = null;
  saveState();
  setScreen("lesson");
  renderLesson();
}

function labeledParagraph(label, text, className = "") {
  const paragraph = document.createElement("p");
  if (className) paragraph.className = className;
  const strong = document.createElement("b");
  strong.textContent = label;
  paragraph.append(strong, document.createTextNode(` ${text}`));
  return paragraph;
}

function renderIdiomSeries() {
  const query = cleanText(els.idiomSearchInput.value);
  const idioms = IDIOMS.filter((idiom) => {
    if (!query) return true;
    return (
      idiom.word.includes(query) ||
      idiom.pinyin.toLowerCase().includes(query.toLowerCase()) ||
      idiom.explanation.includes(query)
    );
  });
  els.idiomCount.textContent = idiomCountLabel(idioms.length);
  els.idiomList.innerHTML = "";

  if (!idioms.length) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = t("idiomEmpty");
    els.idiomList.append(empty);
    setScreen("idiom");
    return;
  }

  idioms.forEach((idiom) => {
    const card = document.createElement("article");
    card.className = "idiom-item";

    const head = document.createElement("div");
    head.className = "idiom-head";
    const title = document.createElement("div");
    const word = document.createElement("strong");
    word.textContent = idiom.word;
    const pinyin = document.createElement("span");
    pinyin.className = "pinyin-line";
    pinyin.textContent = idiom.pinyin;
    title.append(word, pinyin);
    const speak = makeAudioButton(idiom.word, idiom.word, "word");
    speak.classList.add("idiom-speak-button");
    head.append(title, speak);

    card.append(head, labeledParagraph(t("idiomMeaning"), idiom.explanation));
    if (idiom.example) {
      card.append(labeledParagraph(t("idiomExample"), idiom.example));
    }
    if (idiom.derivation) {
      card.append(labeledParagraph(t("idiomSource"), idiom.derivation, "idiom-source"));
    }
    els.idiomList.append(card);
  });
  staggerChildren(els.idiomList, ".idiom-item");
  setScreen("idiom");
}

function openIdiomSeries() {
  renderIdiomSeries();
  requestAnimationFrame(() => els.idiomSearchInput.focus({ preventScroll: true }));
}

function saveCustomCharacter(event) {
  event.preventDefault();
  const draft = readCustomEntryDraft();
  const validationMessage = validateCustomEntryDraft(draft);
  if (validationMessage) {
    setCustomValidation(validationMessage, "needs-review");
    showToast(validationMessage);
    return;
  }

  const entry = createCustomEntry(draft);
  customEntries.push(entry);
  saveCustomEntries();

  const courseIndex = BASE_ENTRIES.length + customEntries.length - 1;
  state.lessonIndex = Math.floor(courseIndex / LESSON_SIZE);
  state.charIndex = courseIndex % LESSON_SIZE;
  quiz = null;
  lastResult = null;
  saveState();

  clearCustomCharacterForm();
  renderCustomSummary();
  renderCustomSavedList();
  populateLessonSelect();
  const message = t("customSavedToast", { char: entry.char });
  setCustomValidation(message, "success");
  showToast(message);
  sparkleAt(els.customSavedList.lastElementChild, { count: 10, spread: 90, glyphs: ["新", "字", "✦"] });
}

function optionText(index, title, pinyin) {
  return `${index + 1}. ${title}${pinyin ? ` · ${pinyin}` : ""}`;
}

function makeSpeakerIcon(className = "") {
  const icon = document.createElement("span");
  icon.className = ["cartoon-speaker-icon", className].filter(Boolean).join(" ");
  icon.setAttribute("aria-hidden", "true");
  return icon;
}

function renderDialogueSelect() {
  els.dialogueTopicSelect.innerHTML = "";
  DIALOGUE_CATEGORIES.forEach((category, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = optionText(index, category.topic, category.pinyin);
    option.selected = index === state.dialogueCategoryIndex;
    els.dialogueTopicSelect.append(option);
  });
}

function renderDialoguePractice() {
  state.dialogueCategoryIndex = clamp(Number(state.dialogueCategoryIndex) || 0, 0, DIALOGUE_CATEGORIES.length - 1);
  const category = DIALOGUE_CATEGORIES[state.dialogueCategoryIndex];
  renderDialogueSelect();
  els.dialogueIcon.textContent = category.icon;
  els.dialogueTopic.textContent = category.topic;
  els.dialoguePinyin.textContent = category.pinyin;
  els.dialogueEnglish.textContent = category.en;
  els.dialoguePhrase.textContent = category.phrase;
  els.dialoguePhrasePinyin.textContent = category.phrasePinyin;
  els.dialogueWords.innerHTML = "";

  category.words.forEach((word) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dialogue-word-card";
    button.setAttribute("aria-label", t("playLabel", { label: word.zh }));

    const zh = document.createElement("strong");
    zh.textContent = word.zh;
    const pinyin = document.createElement("span");
    pinyin.className = "pinyin-line";
    pinyin.textContent = word.pinyin;
    const meaning = document.createElement("span");
    meaning.className = "practice-english";
    meaning.textContent = word.meaning;
    const icon = document.createElement("span");
    icon.className = "word-audio-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.append(makeSpeakerIcon("speaker-icon-small"));

    button.append(zh, pinyin, meaning, icon);
    button.addEventListener("click", () => speakText(word.zh, t("playingLabel", { label: word.zh }), { button, mode: "word" }));
    els.dialogueWords.append(button);
  });

  staggerChildren(els.dialogueWords, ".dialogue-word-card");
  replayClass(els.dialogueIcon, "pop-attention");
  setScreen("dialogue");
}

function renderRoleplaySelect() {
  els.roleplaySelect.innerHTML = "";
  ROLEPLAY_SCENARIOS.forEach((scenario, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = optionText(index, scenario.title, scenario.titlePinyin);
    option.selected = index === state.roleplayIndex;
    els.roleplaySelect.append(option);
  });
}

function renderRoleplayPractice() {
  state.roleplayIndex = clamp(Number(state.roleplayIndex) || 0, 0, ROLEPLAY_SCENARIOS.length - 1);
  const scenario = ROLEPLAY_SCENARIOS[state.roleplayIndex];
  renderRoleplaySelect();
  els.roleplayIcon.textContent = scenario.icon;
  els.roleplayTitle.textContent = scenario.title;
  els.roleplayTitlePinyin.textContent = scenario.titlePinyin;
  els.roleplayText.textContent = scenario.text;
  els.roleplayPinyin.textContent = scenario.pinyin;
  els.roleplayWords.innerHTML = "";

  scenario.words.forEach((word) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dialogue-word-card";
    button.setAttribute("aria-label", t("playLabel", { label: word.zh }));

    const zh = document.createElement("strong");
    zh.textContent = word.zh;
    const pinyin = document.createElement("span");
    pinyin.className = "pinyin-line";
    pinyin.textContent = word.pinyin;
    const meaning = document.createElement("span");
    meaning.className = "practice-english";
    meaning.textContent = word.meaning;
    const icon = document.createElement("span");
    icon.className = "word-audio-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.append(makeSpeakerIcon("speaker-icon-small"));

    button.append(zh, pinyin, meaning, icon);
    button.addEventListener("click", () => speakText(word.zh, t("playingLabel", { label: word.zh }), { button, mode: "word" }));
    els.roleplayWords.append(button);
  });

  staggerChildren(els.roleplayWords, ".dialogue-word-card");
  replayClass(els.roleplayIcon, "pop-attention");
  setScreen("roleplay");
}

function renderLesson() {
  const entries = lessonEntries();
  const entry = currentEntry();
  const isLast = state.charIndex === entries.length - 1;

  els.lessonTitle.textContent = t("lessonN", { n: state.lessonIndex + 1 });
  els.lessonProgress.textContent = `${state.charIndex + 1} / ${entries.length}`;
  els.bigChar.textContent = entry.char;
  els.pinyin.textContent = entry.pinyin || t("pinyinFallback");
  els.meaning.textContent = entry.meaningEn;
  els.meaningZh.textContent = entry.meaningZh;
  els.meaningEn.textContent = entry.meaningEn;
  els.radicalValue.textContent = entry.radical || "—";
  els.strokeValue.textContent = entry.strokes || "—";
  els.structureValue.textContent = entry.structure || "—";
  els.prevCharBtn.disabled = state.charIndex === 0;
  els.nextCharBtn.disabled = isLast;
  els.continueBtn.textContent = isLast ? t("startTest") : t("next");

  renderWords(entry);
  renderSentences(entry);
  renderWriter(entry);
  replayClass(els.bigChar, "char-pop");
  replayClass(els.lessonProgress, "counter-bump");
  if (cameraState.panelOpen) {
    clearCameraPath({ redraw: false });
    drawCameraScene();
    if (cameraState.stream) {
      setCameraStatus(cameraState.hasTracking ? t("pinchToDraw") : t("touchDraw"));
    }
  }
  coach(t("characterCount", { current: state.charIndex + 1, total: entries.length }));
}

function makeAudioButton(text, label, mode = "word") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "audio-button";
  button.setAttribute("aria-label", t("playLabel", { label }));
  button.append(makeSpeakerIcon("speaker-icon-small"));
  button.addEventListener("click", () => speakText(text, t("playingLabel", { label }), { button, mode }));
  return button;
}

function renderWordCards(container, entry) {
  container.innerHTML = "";
  entry.words.forEach((word) => {
    const chip = document.createElement("div");
    chip.className = "word-chip";
    const strong = document.createElement("strong");
    strong.textContent = word.word;
    const span = document.createElement("span");
    span.textContent = word.meaningEn;
    chip.append(strong, span, makeAudioButton(word.word, word.word));
    container.append(chip);
  });
  staggerChildren(container, ".word-chip");
}

function renderWords(entry) {
  renderWordCards(els.wordList, entry);
}

function renderSentenceCards(container, entry) {
  const sentences = entry.sentences?.length ? entry.sentences : [entry.sentence];
  container.innerHTML = "";
  sentences.forEach((sentence, index) => {
    const item = document.createElement("div");
    item.className = "sentence-item";

    const number = document.createElement("span");
    number.className = "sentence-number";
    number.textContent = String(index + 1);

    const text = document.createElement("div");
    const zh = document.createElement("p");
    zh.className = "sentence";
    zh.textContent = sentence.zh;
    const en = document.createElement("p");
    en.className = "sentence-en";
    en.textContent = sentence.en;
    text.append(zh, en);

    item.append(number, text, makeAudioButton(sentence.zh, t("sentenceLabel", { n: index + 1 }), "sentence"));
    container.append(item);
  });
  staggerChildren(container, ".sentence-item");
}

function renderSentences(entry) {
  renderSentenceCards(els.sentenceList, entry);
}

function renderWriter(entry) {
  writer = null;
  els.strokeTarget.innerHTML = "";
  if (!window.HanziWriter) {
    const fallback = document.createElement("div");
    fallback.className = "writer-fallback";
    fallback.textContent = t("strokesCount", { char: entry.char, count: entry.strokes || "?" });
    els.strokeTarget.append(fallback);
    return;
  }

  try {
    writer = HanziWriter.create(els.strokeTarget, entry.char, {
      width: 250,
      height: 250,
      padding: 12,
      showOutline: true,
      showCharacter: false,
      strokeAnimationSpeed: 1.15,
      delayBetweenStrokes: 90,
      radicalColor: "#ff7078",
      outlineColor: "#b8c8d5",
      strokeColor: "#17324d",
      drawingColor: "#2f80ed",
    });
    writer.animateCharacter();
    replayClass(els.strokeTarget, "writer-ready");
  } catch {
    const fallback = document.createElement("div");
    fallback.className = "writer-fallback";
    fallback.textContent = t("strokesCount", { char: entry.char, count: entry.strokes || "?" });
    els.strokeTarget.append(fallback);
  }
}

function setCameraStatus(message) {
  els.cameraStatus.textContent = message;
}

function cameraErrorMessage(error) {
  if (error?.name === "NotAllowedError" || error?.name === "PermissionDeniedError") {
    return t("cameraPermission");
  }
  if (error?.name === "NotFoundError" || error?.name === "DevicesNotFoundError") {
    return t("cameraNotFound");
  }
  return t("cameraUnavailable");
}

function loadCameraHandsLibrary() {
  if (window.Hands) return Promise.resolve();
  if (cameraScriptPromise) return cameraScriptPromise;

  cameraScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    let settled = false;
    const timeout = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new Error("Hand tracking took too long to load."));
      }
    }, CAMERA_LIBRARY_TIMEOUT);

    script.src = MEDIAPIPE_HANDS_SCRIPT;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      if (window.Hands) {
        resolve();
      } else {
        reject(new Error("Hand tracking did not start."));
      }
    };
    script.onerror = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      reject(new Error("Hand tracking could not load."));
    };

    document.head.append(script);
  }).catch((error) => {
    cameraScriptPromise = null;
    throw error;
  });

  return cameraScriptPromise;
}

function createHandTracker() {
  const hands = new window.Hands({
    locateFile: (file) => `${MEDIAPIPE_HANDS_ASSET_BASE}/${file}`,
  });
  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 0,
    minDetectionConfidence: 0.65,
    minTrackingConfidence: 0.65,
  });
  hands.onResults((results) => {
    cameraState.handLandmarks = results.multiHandLandmarks?.[0] || null;
  });
  return hands;
}

function stopCameraStreamOnly() {
  if (cameraState.stream) {
    cameraState.stream.getTracks().forEach((track) => track.stop());
  }
  cameraState.stream = null;
  els.cameraVideo.pause();
  els.cameraVideo.srcObject = null;
}

function stopCameraWriting({ quiet = false, hide = true } = {}) {
  if (cameraState.rafId) {
    window.cancelAnimationFrame(cameraState.rafId);
    cameraState.rafId = 0;
  }

  stopCameraStreamOnly();
  if (cameraState.hands?.close) {
    cameraState.hands.close().catch(() => {});
  }
  cameraState.hands = null;
  cameraState.sendingFrame = false;
  cameraState.hasTracking = false;
  cameraState.seenHand = false;
  cameraState.handLandmarks = null;
  cameraState.handDrawing = false;
  cameraState.pointerDrawing = false;
  cameraState.currentStroke = null;
  cameraState.currentStrokeSource = null;
  cameraState.smoothedHandPoint = null;

  els.cameraWriteBtn.disabled = false;
  els.cameraWriteBtn.textContent = t("camera");
  if (hide) {
    els.cameraPanel.classList.add("hidden");
    cameraState.panelOpen = false;
  }
  if (!quiet) setCameraStatus(t("cameraOff"));
}

function cameraWritingFrame() {
  const canvas = els.cameraCanvas;
  const size = Math.min(canvas.width, canvas.height) * 0.72;
  return {
    x: (canvas.width - size) / 2,
    y: (canvas.height - size) / 2,
    size,
  };
}

function pointInCameraFrame(point) {
  const frame = cameraWritingFrame();
  return (
    point.x >= frame.x &&
    point.x <= frame.x + frame.size &&
    point.y >= frame.y &&
    point.y <= frame.y + frame.size
  );
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function beginCameraStroke(source) {
  cameraState.currentStroke = [];
  cameraState.currentStrokeSource = source;
  cameraState.strokes.push(cameraState.currentStroke);
}

function endCameraStroke(source) {
  if (!source || cameraState.currentStrokeSource === source) {
    cameraState.currentStroke = null;
    cameraState.currentStrokeSource = null;
  }
  if (!source || source === "hand") {
    cameraState.smoothedHandPoint = null;
  }
}

function addCameraPoint(point, source) {
  if (!pointInCameraFrame(point)) {
    endCameraStroke(source);
    return;
  }

  if (!cameraState.currentStroke || cameraState.currentStrokeSource !== source) {
    beginCameraStroke(source);
  }
  const stroke = cameraState.currentStroke;
  const last = stroke[stroke.length - 1];
  if (!last || distance(last, point) > 2.5) {
    stroke.push(point);
  }
}

function clearCameraPath({ redraw = true } = {}) {
  cameraState.strokes = [];
  cameraState.currentStroke = null;
  cameraState.currentStrokeSource = null;
  cameraState.smoothedHandPoint = null;
  if (redraw) drawCameraScene();
}

function currentHandPoint() {
  const landmarks = cameraState.handLandmarks;
  if (!landmarks) return null;
  const tip = landmarks[8];
  const thumb = landmarks[4];
  if (!tip || !thumb) return null;

  const canvas = els.cameraCanvas;
  const rawPoint = {
    x: (1 - tip.x) * canvas.width,
    y: tip.y * canvas.height,
  };
  const pinchDistance = Math.hypot(tip.x - thumb.x, tip.y - thumb.y);
  return { ...rawPoint, pinching: pinchDistance < 0.085 };
}

function smoothHandPoint(point) {
  const previous = cameraState.smoothedHandPoint;
  if (!previous || distance(previous, point) > 90) {
    cameraState.smoothedHandPoint = point;
    return point;
  }
  const next = {
    x: previous.x * 0.62 + point.x * 0.38,
    y: previous.y * 0.62 + point.y * 0.38,
    pinching: point.pinching,
  };
  cameraState.smoothedHandPoint = next;
  return next;
}

function drawCameraPath(ctx) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 13;
  ctx.strokeStyle = "rgba(47, 128, 237, 0.95)";
  cameraState.strokes.forEach((stroke) => {
    if (stroke.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(stroke[0].x, stroke[0].y);
    stroke.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.stroke();
  });
  ctx.restore();
}

function drawCameraGuide(ctx) {
  const entry = currentEntry();
  const frame = cameraWritingFrame();
  const midX = frame.x + frame.size / 2;
  const midY = frame.y + frame.size / 2;

  ctx.save();
  ctx.fillStyle = "rgba(255, 253, 247, 0.56)";
  ctx.fillRect(frame.x, frame.y, frame.size, frame.size);
  ctx.setLineDash([12, 10]);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(23, 50, 77, 0.72)";
  ctx.strokeRect(frame.x, frame.y, frame.size, frame.size);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(23, 50, 77, 0.24)";
  ctx.beginPath();
  ctx.moveTo(midX, frame.y);
  ctx.lineTo(midX, frame.y + frame.size);
  ctx.moveTo(frame.x, midY);
  ctx.lineTo(frame.x + frame.size, midY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "#17324d";
  ctx.font = `900 ${frame.size * 0.66}px "Kaiti SC", "KaiTi", "STKaiti", serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(entry.char, midX, midY + frame.size * 0.03);
  ctx.restore();
}

function drawCameraCursor(ctx, point, active) {
  if (!point) return;
  ctx.save();
  ctx.lineWidth = 5;
  ctx.strokeStyle = active ? "#ff7078" : "#17324d";
  ctx.fillStyle = active ? "#ffd45d" : "#ffffff";
  ctx.beginPath();
  ctx.arc(point.x, point.y, active ? 17 : 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function updateHandDrawing() {
  const rawPoint = currentHandPoint();
  if (!rawPoint) {
    cameraState.handDrawing = false;
    endCameraStroke("hand");
    return null;
  }

  if (!cameraState.seenHand) {
    cameraState.seenHand = true;
    setCameraStatus(t("pinchToDraw"));
  }

  const point = smoothHandPoint(rawPoint);
  const active = point.pinching && pointInCameraFrame(point) && !cameraState.pointerDrawing;
  if (active) {
    cameraState.handDrawing = true;
    addCameraPoint(point, "hand");
  } else if (cameraState.handDrawing) {
    cameraState.handDrawing = false;
    endCameraStroke("hand");
  }
  return { point, active };
}

function drawCameraScene() {
  const canvas = els.cameraCanvas;
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;

  ctx.clearRect(0, 0, width, height);
  if (cameraState.stream && els.cameraVideo.readyState >= 2) {
    ctx.save();
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.globalAlpha = 0.62;
    ctx.drawImage(els.cameraVideo, 0, 0, width, height);
    ctx.restore();
  } else {
    ctx.fillStyle = "#fffdf7";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(123, 216, 238, 0.18)";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.fillStyle = "rgba(255, 253, 247, 0.22)";
  ctx.fillRect(0, 0, width, height);
  drawCameraGuide(ctx);
  const hand = updateHandDrawing();
  drawCameraPath(ctx);
  drawCameraCursor(ctx, hand?.point, hand?.active);
}

function startCameraFrameLoop() {
  if (cameraState.rafId) window.cancelAnimationFrame(cameraState.rafId);

  const tick = () => {
    if (!cameraState.panelOpen) return;
    drawCameraScene();

    if (
      cameraState.hands &&
      cameraState.stream &&
      !cameraState.sendingFrame &&
      els.cameraVideo.readyState >= 2
    ) {
      cameraState.sendingFrame = true;
      cameraState.hands
        .send({ image: els.cameraVideo })
        .catch(() => {
          cameraState.hands = null;
          cameraState.hasTracking = false;
          setCameraStatus(t("cameraOnTouch"));
        })
        .finally(() => {
          cameraState.sendingFrame = false;
        });
    }

    cameraState.rafId = window.requestAnimationFrame(tick);
  };

  tick();
}

async function startCameraWriting() {
  if (cameraState.stream) {
    stopCameraWriting();
    return;
  }

  cameraState.panelOpen = true;
  cameraState.seenHand = false;
  cameraState.handLandmarks = null;
  els.cameraPanel.classList.remove("hidden");
  els.cameraWriteBtn.disabled = true;
  els.cameraWriteBtn.textContent = t("starting");
  clearCameraPath({ redraw: false });
  setCameraStatus(t("startingCamera"));
  drawCameraScene();

  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("Camera is not supported.");
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
    });
    cameraState.stream = stream;
    els.cameraVideo.srcObject = stream;
    await els.cameraVideo.play();

    try {
      await loadCameraHandsLibrary();
      cameraState.hands = createHandTracker();
      cameraState.hasTracking = true;
      setCameraStatus(t("showHandPinch"));
    } catch {
      cameraState.hands = null;
      cameraState.hasTracking = false;
      setCameraStatus(t("cameraOnTouch"));
    }

    startCameraFrameLoop();
    els.cameraWriteBtn.textContent = t("stop");
    coach(t("cameraReady"));
  } catch (error) {
    stopCameraStreamOnly();
    els.cameraWriteBtn.textContent = t("camera");
    setCameraStatus(cameraErrorMessage(error));
    coach(cameraErrorMessage(error), true);
    drawCameraScene();
  } finally {
    els.cameraWriteBtn.disabled = false;
  }
}

function canvasPointFromEvent(event) {
  const rect = els.cameraCanvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * els.cameraCanvas.width,
    y: ((event.clientY - rect.top) / rect.height) * els.cameraCanvas.height,
  };
}

function beginCameraPointerStroke(event) {
  if (!cameraState.panelOpen) return;
  event.preventDefault();
  cameraState.pointerDrawing = true;
  cameraState.handDrawing = false;
  beginCameraStroke("pointer");
  addCameraPoint(canvasPointFromEvent(event), "pointer");
  els.cameraCanvas.setPointerCapture?.(event.pointerId);
  drawCameraScene();
}

function moveCameraPointerStroke(event) {
  if (!cameraState.pointerDrawing) return;
  event.preventDefault();
  addCameraPoint(canvasPointFromEvent(event), "pointer");
  drawCameraScene();
}

function endCameraPointerStroke(event) {
  if (!cameraState.pointerDrawing) return;
  event.preventDefault();
  cameraState.pointerDrawing = false;
  endCameraStroke("pointer");
  els.cameraCanvas.releasePointerCapture?.(event.pointerId);
  drawCameraScene();
}

function startLessonByIndex(lessonIndex) {
  stopCameraWriting({ quiet: true });
  state.lessonIndex = clamp(Number(lessonIndex), 0, lessonCount() - 1);
  state.charIndex = 0;
  quiz = null;
  lastResult = null;
  els.lessonSelect.value = String(state.lessonIndex);
  saveState();
  setScreen("lesson");
  renderLesson();
  sparkleAt(els.bigChar, { count: 8, spread: 90, glyphs: ["中", "文", "✦"] });
}

function startLesson() {
  startLessonByIndex(Number(els.lessonSelect.value));
}

function startDailyLesson() {
  const daily = dailyLessonInfo();
  startLessonByIndex(daily.index);
  showToast(t("dailyToast", { n: daily.index + 1 }));
}

function openDialoguePractice() {
  renderDialoguePractice();
  sparkleAt(els.dialogueIcon, { count: 8, spread: 80, glyphs: ["听", "说", "✦"] });
}

function openRoleplayPractice() {
  renderRoleplayPractice();
  sparkleAt(els.roleplayIcon, { count: 8, spread: 80, glyphs: ["读", "演", "✦"] });
}

function changeDialogueCategory(event) {
  state.dialogueCategoryIndex = Number(event.target.value);
  saveState();
  renderDialoguePractice();
}

function changeRoleplayScenario(event) {
  state.roleplayIndex = Number(event.target.value);
  saveState();
  renderRoleplayPractice();
}

function speakDialoguePhrase() {
  const category = DIALOGUE_CATEGORIES[state.dialogueCategoryIndex] || DIALOGUE_CATEGORIES[0];
  const played = speakText(category.phrase, t("dialogueToast", { topic: category.topic }), {
    button: els.dialoguePhraseBtn,
    mode: "sentence",
  });
  if (played) sparkleAt(els.dialoguePhraseBtn, { count: 6, spread: 72, glyphs: ["声", "♪", "✦"] });
}

function speakDialogueAll() {
  const category = DIALOGUE_CATEGORIES[state.dialogueCategoryIndex] || DIALOGUE_CATEGORIES[0];
  const text = [category.phrase, ...category.words.map((word) => word.zh)];
  const played = speakText(text, t("dialogueToast", { topic: category.topic }), {
    button: els.dialogueAllBtn,
    mode: "list",
  });
  if (played) sparkleAt(els.dialogueAllBtn, { count: 8, spread: 80, glyphs: ["声", "听", "✦"] });
}

function speakRoleplayScene(triggerButton = els.roleplaySpeakBtn) {
  const scenario = ROLEPLAY_SCENARIOS[state.roleplayIndex] || ROLEPLAY_SCENARIOS[0];
  const played = speakText(scenario.text, t("roleplayToast", { title: scenario.title }), {
    button: triggerButton,
    mode: "scene",
  });
  if (played) sparkleAt(triggerButton, { count: 8, spread: 84, glyphs: ["读", "声", "✦"] });
}

function goHome() {
  quiz = null;
  renderHome();
}

function moveChar(delta) {
  stopSpeech();
  const entries = lessonEntries();
  state.charIndex = clamp(state.charIndex + delta, 0, entries.length - 1);
  saveState();
  renderLesson();
}

function continueLesson() {
  stopSpeech();
  const entries = lessonEntries();
  if (state.charIndex >= entries.length - 1) {
    startQuiz();
    return;
  }
  state.charIndex += 1;
  saveState();
  renderLesson();
}

const SPEECH_PRESETS = {
  character: { rate: 0.88, pitch: 1, volume: 1, pause: 110, maxChunkLength: 2, punctuate: false },
  word: { rate: 0.91, pitch: 1, volume: 1, pause: 130, maxChunkLength: 10, punctuate: false },
  sentence: { rate: 0.93, pitch: 1, volume: 1, pause: 190, maxChunkLength: 34, punctuate: true },
  list: { rate: 0.9, pitch: 1, volume: 1, pause: 210, maxChunkLength: 24, punctuate: true, arrayJoin: "，" },
  scene: { rate: 0.92, pitch: 0.99, volume: 1, pause: 230, maxChunkLength: 42, punctuate: true },
};

const SPEECH_VOICE_START_DELAY = 140;
const CJK_SPACE_RE = /([\u3400-\u9fff\uf900-\ufaff])\s+([\u3400-\u9fff\uf900-\ufaff])/g;
const SPEECH_HARD_BREAK_RE = /[。！？!?；;]/;
const SPEECH_SOFT_BREAK_RE = /[，、,：:]/;
const SPEECH_TRAILING_PUNCTUATION_RE = /[。！？!?；;，、,：:]$/;
const SPEECH_TERMINAL_PUNCTUATION_RE = /[。！？!?；;]$/;
const SPEECH_QUESTION_OR_EXCLAMATION_RE = /[？！?!]$/;
const SPEECH_LEADING_PUNCTUATION_RE = /^[。！？!?；;，、,：:\s]+/;
let chineseSpeechSegmenter = null;

function scoreChineseVoice(voice) {
  const lang = String(voice.lang || "").toLowerCase().replace(/_/g, "-");
  const label = `${voice.name || ""} ${voice.lang || ""}`.toLowerCase();
  let score = 0;

  if (/^zh-cn\b/.test(lang)) score += 110;
  else if (/^zh-hans\b/.test(lang)) score += 100;
  else if (/^zh-sg\b/.test(lang)) score += 88;
  else if (/^cmn\b/.test(lang)) score += 82;
  else if (/^zh-tw\b/.test(lang)) score += 68;
  else if (/^zh-hk\b/.test(lang)) score += 62;
  else if (/^zh\b/.test(lang)) score += 55;
  else if (/chinese|mandarin|普通话|中文/.test(label)) score += 45;
  else return 0;

  if (/neural|natural|premium|enhanced|online/.test(label)) score += 46;
  if (/xiaoxiao|xiaoyi|xiaobei|xiaoni|xiaohan|xiaomeng|xiaorui|yunxi|yunjian|yunyang|yunxia|xiaoqiu|xiaoshuang/.test(label)) {
    score += 58;
  }
  if (/microsoft|huihui|yaoyao|kangkang/.test(label)) score += 34;
  if (/siri|ting-?ting|li-?mu|limu|mei-?jia|sin-?ji|yu-?shu|yushu/.test(label)) {
    score += 34;
  }
  if (/google|普通话|mandarin|putonghua/.test(label)) score += 28;
  if (voice.localService) score += 8;
  if (voice.default) score += 4;
  if (/compact|basic|novelty|eloquence|bells|boing|bad news|good news|cellos|zarvox/.test(label)) {
    score -= 72;
  }

  return score;
}

function refreshSpeechVoices() {
  if (!("speechSynthesis" in window)) return;
  const voices = speechSynthesis.getVoices();
  cachedChineseVoice = voices
    .map((voice) => ({ voice, score: scoreChineseVoice(voice) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.voice || null;
}

function prepareSpeechVoices() {
  if (!("speechSynthesis" in window)) return;
  refreshSpeechVoices();
  window.setTimeout(refreshSpeechVoices, 120);
  window.setTimeout(refreshSpeechVoices, 650);
  if (typeof speechSynthesis.addEventListener === "function") {
    speechSynthesis.addEventListener("voiceschanged", refreshSpeechVoices);
  } else {
    speechSynthesis.onvoiceschanged = refreshSpeechVoices;
  }
}

function preferredChineseVoice() {
  if (!("speechSynthesis" in window)) return null;
  if (!cachedChineseVoice) refreshSpeechVoices();
  return cachedChineseVoice;
}

function speechVoiceAdjustment(voice) {
  const label = `${voice?.name || ""} ${voice?.lang || ""}`.toLowerCase();
  if (!voice) return { rate: -0.02, pitch: 0 };
  if (/compact|basic/.test(label)) return { rate: -0.08, pitch: -0.02 };
  if (/neural|natural|premium|enhanced|xiaoxiao|yunxi|yunjian|yunyang|yunxia/.test(label)) {
    return { rate: 0.02, pitch: 0 };
  }
  if (/google/.test(label)) return { rate: -0.01, pitch: 0 };
  if (/siri|ting-?ting|huihui|yaoyao|kangkang/.test(label)) return { rate: -0.04, pitch: 0 };
  return { rate: -0.03, pitch: 0 };
}

function speechTextLength(text) {
  return Array.from(String(text).replace(/[。！？!?；;，、,：:\s]/g, "")).length;
}

function normalizeSpeechText(text, preset = SPEECH_PRESETS.sentence) {
  const source = Array.isArray(text) ? text.filter(Boolean).join(preset.arrayJoin || "。") : text ?? "";
  let normalized = String(source)
    .replace(/[\r\n]+/g, "。")
    .replace(/[?]/g, "？")
    .replace(/[!]/g, "！")
    .replace(/[;]/g, "；")
    .replace(/[,]/g, "，")
    .replace(/[:]/g, "，")
    .replace(/\s*([。！？；，、])\s*/g, "$1")
    .replace(/([。！？；，、])\1+/g, "$1");

  let previous = "";
  while (previous !== normalized) {
    previous = normalized;
    normalized = normalized.replace(CJK_SPACE_RE, "$1$2");
  }

  return normalized
    .replace(/\s+/g, " ")
    .replace(/([。！？；])([，、])/g, "$1")
    .replace(/([，、])([。！？；])/g, "$2")
    .trim();
}

function finishSpeechChunkText(chunk, preset, breakType = "terminal") {
  const text = chunk.trim().replace(SPEECH_LEADING_PUNCTUATION_RE, "");
  if (!text) return "";
  if (preset.punctuate && text.length > 1 && !SPEECH_TRAILING_PUNCTUATION_RE.test(text)) {
    return `${text}${breakType === "soft" ? "，" : "。"}`;
  }
  return text;
}

function pushSpeechChunk(chunks, chunk, preset, breakType = "terminal") {
  const text = finishSpeechChunkText(chunk, preset, breakType);
  if (text) chunks.push(text);
}

function segmentChineseSpeech(text) {
  if (typeof Intl !== "undefined" && typeof Intl.Segmenter === "function") {
    chineseSpeechSegmenter ||= new Intl.Segmenter("zh-Hans", { granularity: "word" });
    return Array.from(chineseSpeechSegmenter.segment(text), (part) => part.segment).filter(Boolean);
  }
  return Array.from(text);
}

function splitSpeechChunkAtBoundary(text, maxChunkLength) {
  if (speechTextLength(text) <= maxChunkLength) return [text, ""];

  const segments = segmentChineseSpeech(text);
  let head = "";
  let tail = "";

  segments.forEach((segment) => {
    if (tail) {
      tail += segment;
      return;
    }

    const next = head + segment;
    if (head && speechTextLength(next) > maxChunkLength) {
      tail = segment;
    } else {
      head = next;
    }
  });

  if (head && tail) return [head, tail];

  const chars = Array.from(text);
  let count = 0;
  let splitIndex = chars.length;
  for (let index = 0; index < chars.length; index += 1) {
    if (!/[。！？!?；;，、,：:\s]/.test(chars[index])) count += 1;
    if (count >= maxChunkLength) {
      splitIndex = index + 1;
      break;
    }
  }
  return [chars.slice(0, splitIndex).join(""), chars.slice(splitIndex).join("")];
}

function splitSpeechText(text, preset) {
  const normalized = normalizeSpeechText(text, preset);
  if (!normalized) return [];

  const chunks = [];
  let current = "";
  const maxChunkLength = preset.maxChunkLength || SPEECH_PRESETS.sentence.maxChunkLength;

  for (const char of normalized) {
    current += char;
    if (SPEECH_HARD_BREAK_RE.test(char)) {
      pushSpeechChunk(chunks, current, preset, "terminal");
      current = "";
    } else if (SPEECH_SOFT_BREAK_RE.test(char) && speechTextLength(current) >= maxChunkLength * 0.65) {
      pushSpeechChunk(chunks, current, preset, "soft");
      current = "";
    } else if (speechTextLength(current) >= maxChunkLength) {
      const [head, tail] = splitSpeechChunkAtBoundary(current, maxChunkLength);
      if (tail) {
        pushSpeechChunk(chunks, head, preset, "soft");
        current = tail;
      }
    }
  }
  if (current) pushSpeechChunk(chunks, current, preset, "terminal");

  return chunks;
}

function pauseAfterSpeechChunk(chunk, preset) {
  if (SPEECH_QUESTION_OR_EXCLAMATION_RE.test(chunk)) return preset.pause + 90;
  if (SPEECH_TERMINAL_PUNCTUATION_RE.test(chunk)) return preset.pause;
  if (SPEECH_SOFT_BREAK_RE.test(chunk.slice(-1))) return Math.max(90, Math.round(preset.pause * 0.58));
  return Math.max(80, Math.round(preset.pause * 0.72));
}

function rateForSpeechChunk(chunk, job) {
  const length = speechTextLength(chunk);
  let rate = job.rate + job.voiceAdjustment.rate;
  if (job.mode !== "character") {
    if (length <= 3) rate -= 0.04;
    else if (length >= 18) rate += 0.02;
  }
  if (SPEECH_QUESTION_OR_EXCLAMATION_RE.test(chunk)) rate += 0.01;
  return clamp(rate, 0.72, 1.06);
}

function pitchForSpeechChunk(chunk, job) {
  let pitch = job.pitch + job.voiceAdjustment.pitch;
  if (job.mode !== "character" && SPEECH_QUESTION_OR_EXCLAMATION_RE.test(chunk)) pitch += 0.01;
  return clamp(pitch, 0.86, 1.12);
}

function applySpeechJobVoice(job) {
  const voice = preferredChineseVoice();
  job.voice = voice;
  job.voiceAdjustment = speechVoiceAdjustment(voice);
  job.lang = voice?.lang || "zh-CN";
}

function speechUtteranceText(chunk, job) {
  const text = chunk.trim();
  if ((job.mode === "character" || job.mode === "word") && speechTextLength(text) <= 2 && !SPEECH_TRAILING_PUNCTUATION_RE.test(text)) {
    return `${text}。`;
  }
  return text;
}

function cleanupSpeechJob(job, { notifyEnd = true, error = false } = {}) {
  if (!job || job.finished) return;
  job.finished = true;
  job.timers.forEach((timer) => clearTimeout(timer));
  if (job.button) job.button.classList.remove("is-playing");
  if (activeSpeechJob === job) activeSpeechJob = null;
  if (notifyEnd && job.onEnd) job.onEnd();
  if (error) coach(t("audioFailed"), true);
}

function stopSpeech({ notifyEnd = true } = {}) {
  if (!("speechSynthesis" in window)) return;
  if (activeSpeechJob) {
    activeSpeechJob.cancelled = true;
    cleanupSpeechJob(activeSpeechJob, { notifyEnd });
  }
  speechSynthesis.cancel();
}

function playSpeechChunk(job, index) {
  if (!job || job.cancelled || job.finished) return;
  const chunk = job.chunks[index];
  if (!chunk) {
    cleanupSpeechJob(job);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(speechUtteranceText(chunk, job));
  utterance.lang = job.lang;
  utterance.rate = rateForSpeechChunk(chunk, job);
  utterance.pitch = pitchForSpeechChunk(chunk, job);
  utterance.volume = job.volume;
  if (job.voice) utterance.voice = job.voice;

  let settled = false;
  const finishChunk = (failed = false) => {
    if (settled || job.cancelled || job.finished) return;
    settled = true;
    if (failed) {
      cleanupSpeechJob(job, { error: true });
      return;
    }
    if (index >= job.chunks.length - 1) {
      cleanupSpeechJob(job);
      return;
    }
    const timer = window.setTimeout(() => playSpeechChunk(job, index + 1), pauseAfterSpeechChunk(chunk, job));
    job.timers.push(timer);
  };

  utterance.onend = () => finishChunk(false);
  utterance.onerror = () => finishChunk(true);

  speechSynthesis.resume();
  speechSynthesis.speak(utterance);

  const fallbackTimer = window.setTimeout(() => {
    if (!speechSynthesis.speaking && !speechSynthesis.pending) finishChunk(false);
  }, Math.max(1800, chunk.length * 420 + 1200));
  job.timers.push(fallbackTimer);
}

function startSpeechJob(job) {
  refreshSpeechVoices();
  applySpeechJobVoice(job);

  if (job.voice || speechSynthesis.getVoices().length) {
    playSpeechChunk(job, 0);
    return;
  }

  const startTimer = window.setTimeout(() => {
    if (job.cancelled || job.finished) return;
    refreshSpeechVoices();
    applySpeechJobVoice(job);
    playSpeechChunk(job, 0);
  }, SPEECH_VOICE_START_DELAY);
  job.timers.push(startTimer);
}

function setSpeakState(isPlaying) {
  els.speakBtn.classList.toggle("is-playing", isPlaying);
  els.speakLabel.textContent = isPlaying ? t("playing") : t("speak");
}

function speakText(text, message, options = {}) {
  if (!("speechSynthesis" in window)) {
    coach(t("speechUnavailable"), true);
    return false;
  }

  const basePreset = SPEECH_PRESETS[options.mode] || SPEECH_PRESETS.sentence;
  const preset = {
    ...basePreset,
    rate: options.rate ?? basePreset.rate,
    pitch: options.pitch ?? basePreset.pitch,
    volume: options.volume ?? basePreset.volume,
    pause: options.pause ?? basePreset.pause,
  };
  const chunks = splitSpeechText(text, preset);
  if (!chunks.length) return false;

  stopSpeech();

  const job = {
    id: ++speechJobId,
    chunks,
    timers: [],
    cancelled: false,
    finished: false,
    button: options.button,
    onEnd: options.onEnd,
    mode: options.mode || "sentence",
    voice: null,
    voiceAdjustment: speechVoiceAdjustment(null),
    lang: "zh-CN",
    rate: preset.rate,
    pitch: preset.pitch,
    volume: preset.volume,
    pause: preset.pause,
  };
  activeSpeechJob = job;

  if (job.button) job.button.classList.add("is-playing");
  if (options.onStart) options.onStart();
  coach(message, true);
  startSpeechJob(job);
  return true;
}

function speakCurrent() {
  const entry = currentEntry();
  const played = speakText(entry.char, t("playingChar", { char: entry.char, pinyin: entry.pinyin }), {
    button: els.speakBtn,
    mode: "character",
    onStart: () => setSpeakState(true),
    onEnd: () => setSpeakState(false),
  });
  if (!played) setSpeakState(false);
  if (played) sparkleAt(els.speakBtn, { count: 6, spread: 70, glyphs: ["声", "♪", "✦"] });
}

function animateCurrent() {
  if (!writer) return;
  writer.cancelQuiz();
  writer.animateCharacter();
  replayClass(els.strokeTarget, "writer-wiggle");
  sparkleAt(els.strokeTarget, { count: 7, spread: 78, glyphs: ["笔", "✦", "好"] });
  coach(t("watchStroke"));
}

function traceCurrent() {
  if (!writer) return;
  const entry = currentEntry();
  writer.quiz({
    onMistake: () => {
      replayClass(els.strokeTarget, "writer-wiggle");
      coach(t("closeTrace"));
    },
    onCorrectStroke: () => {
      replayClass(els.strokeTarget, "good-stroke");
      coach(t("goodStroke"));
    },
    onComplete: () => {
      state.xp += 4;
      saveState();
      renderStats();
      sparkleAt(els.strokeTarget, { count: 14, spread: 120, glyphs: ["棒", "★", "好"] });
      floatScore(els.strokeTarget, "+4 XP");
      coach(t("traceComplete", { char: entry.char }), true);
    },
  });
  coach(t("traceMode"));
}

function makeQuestion(entry, type) {
  const entries = allEntries();
  if (type === "pinyin") {
    return {
      type,
      entry,
      prompt: t("whichPinyin", { char: entry.char }),
      display: entry.char,
      answer: entry.pinyin,
      options: makeOptions(entry.pinyin, entries.map((item) => item.pinyin)),
    };
  }

  if (type === "character") {
    return {
      type,
      entry,
      prompt: t("pickCharacter", { meaning: entry.meaningEn }),
      display: entry.pinyin,
      answer: entry.char,
      options: makeOptions(entry.char, entries.map((item) => item.char)),
    };
  }

  return {
    type: "meaning",
    entry,
    prompt: t("whatMeaning", { char: entry.char }),
    display: entry.char,
    answer: entry.meaningEn,
    options: makeOptions(entry.meaningEn, entries.map((item) => item.meaningEn)),
  };
}

function makeOptions(answer, pool) {
  const distractors = shuffle([...new Set(pool.filter((item) => item && item !== answer))]).slice(0, 3);
  return shuffle([answer, ...distractors]);
}

function passThreshold(total) {
  return Math.min(4, Math.max(1, total));
}

function startQuiz() {
  stopCameraWriting({ quiet: true });
  const types = ["meaning", "pinyin", "character", "meaning", "pinyin"];
  const entries = lessonEntries();
  quiz = {
    questions: entries.map((entry, index) => makeQuestion(entry, types[index % types.length])),
    index: 0,
    correct: 0,
    answered: false,
  };
  setScreen("test");
  renderQuiz();
}

function renderQuiz() {
  const question = quiz.questions[quiz.index];
  els.nextQuestionBtn.classList.add("hidden");
  els.quizFeedback.textContent = "";
  els.quizFeedback.className = "quiz-feedback";
  els.quizTitle.textContent = t("questionN", { n: quiz.index + 1 });
  els.quizProgress.textContent = `${quiz.index + 1} / ${quiz.questions.length}`;
  replayClass(els.quizProgress, "counter-bump");
  els.quizBody.innerHTML = "";

  const prompt = document.createElement("div");
  prompt.className = "quiz-prompt";
  const display = document.createElement("div");
  display.className = question.type === "character" ? "pinyin" : "quiz-char";
  display.textContent = question.display;
  const text = document.createElement("div");
  text.className = "quiz-question";
  text.textContent = question.prompt;
  prompt.append(display, text);

  const answers = document.createElement("div");
  answers.className = "answer-grid";
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.textContent = option;
    button.addEventListener("click", () => answerQuestion(button, option));
    answers.append(button);
  });
  staggerChildren(answers, ".answer-option");

  els.quizBody.append(prompt, answers);
}

function answerQuestion(button, option) {
  if (!quiz || quiz.answered) return;
  const question = quiz.questions[quiz.index];
  const correct = option === question.answer;
  quiz.answered = true;
  if (correct) quiz.correct += 1;

  [...els.quizBody.querySelectorAll(".answer-option")].forEach((item) => {
    item.disabled = true;
    if (item.textContent === question.answer) item.classList.add("correct");
  });
  if (!correct) button.classList.add("wrong");

  els.quizFeedback.textContent = correct
    ? t("correctFeedback", { char: question.entry.char, pinyin: question.entry.pinyin })
    : t("correctAnswer", { answer: question.answer });
  els.quizFeedback.classList.add(correct ? "success" : "needs-review");
  if (correct) {
    sparkleAt(button, { count: 14, spread: 130, glyphs: ["✓", "★", "棒"] });
    floatScore(button, "+10 XP");
  } else {
    replayClass(button, "wrong");
  }
  els.nextQuestionBtn.textContent =
    quiz.index === quiz.questions.length - 1 ? t("showResult") : t("next");
  els.nextQuestionBtn.classList.remove("hidden");
}

function nextQuestion() {
  if (!quiz || !quiz.answered) return;
  if (quiz.index >= quiz.questions.length - 1) {
    finishQuiz();
    return;
  }
  quiz.index += 1;
  quiz.answered = false;
  renderQuiz();
}

function finishQuiz() {
  const needed = passThreshold(quiz.questions.length);
  const passed = quiz.correct >= needed;
  const key = lessonKey();
  const today = melbourneDateKey();
  const firstPass = passed && !state.completedLessons.includes(key);
  const todaySticker = state.stickers.some((sticker) => sticker.date === today);
  const xpGain = quiz.correct * 10 + (passed ? 25 : 5) + (firstPass ? 20 : 0);

  state.xp += xpGain;
  state.attempts[key] = (state.attempts[key] || 0) + 1;
  if (passed && !state.completedLessons.includes(key)) {
    state.completedLessons.push(key);
  }
  if (passed && !todaySticker) {
    state.stickers.push({
      date: today,
      icon: STICKERS[state.stickers.length % STICKERS.length],
      lesson: state.lessonIndex + 1,
    });
  }

  lastResult = {
    score: quiz.correct,
    total: quiz.questions.length,
    passed,
    xpGain,
    stickerEarned: passed && !todaySticker,
  };
  quiz = null;
  saveState();
  renderResult();
}

function renderStickers() {
  els.stickerStrip.innerHTML = "";
  const recent = [];
  for (let offset = -6; offset <= 0; offset += 1) {
    const date = melbourneDateKey(offset);
    recent.push({
      date,
      earned: state.stickers.find((sticker) => sticker.date === date),
    });
  }
  recent.forEach(({ date, earned }) => {
    const item = document.createElement("div");
    item.className = "sticker";
    item.classList.toggle("earned", Boolean(earned));
    item.title = prettyDate(date);
    item.textContent = earned ? earned.icon : prettyDate(date).slice(0, 2);
    els.stickerStrip.append(item);
  });
  staggerChildren(els.stickerStrip, ".sticker");
}

function renderResult({ quiet = false } = {}) {
  const result = lastResult || { score: 0, total: 5, passed: false, xpGain: 0, stickerEarned: false };
  els.resultTitle.textContent = result.passed ? t("lessonComplete") : t("keepPractising");
  els.resultScore.textContent = `${result.score} / ${result.total}`;
  els.resultMessage.textContent = result.passed
    ? t(result.stickerEarned ? "resultEarnedSticker" : "resultEarned", { xp: result.xpGain })
    : t("resultPractice", { needed: passThreshold(result.total), total: result.total });
  els.nextLessonBtn.disabled = state.lessonIndex >= lessonCount() - 1;
  renderStickers();
  setScreen("result");
  if (!quiet) {
    showToast(result.passed ? t("resultSaved") : t("tryReview"));
    if (result.passed) {
      replayClass(els.resultView, "is-celebrating");
      window.setTimeout(() => {
        sparkleAt(els.resultScore, { count: result.stickerEarned ? 28 : 18, spread: 190, glyphs: ["★", "棒", "星", "好"] });
        floatScore(els.resultScore, `+${result.xpGain} XP`);
      }, 180);
    }
  }
}

function goNextLesson() {
  state.lessonIndex = clamp(state.lessonIndex + 1, 0, lessonCount() - 1);
  state.charIndex = 0;
  els.lessonSelect.value = String(state.lessonIndex);
  saveState();
  startLessonByIndex(state.lessonIndex);
}

function openHowToPlay() {
  if (els.howToPlayDialog.open) {
    return;
  }
  if (typeof els.howToPlayDialog.showModal === "function") {
    els.howToPlayDialog.showModal();
    requestAnimationFrame(() => replayClass(els.howToPlayDialog.querySelector(".home-guide"), "guide-pop"));
    return;
  }
  els.howToPlayDialog.setAttribute("open", "");
  requestAnimationFrame(() => replayClass(els.howToPlayDialog.querySelector(".home-guide"), "guide-pop"));
}

function closeHowToPlayOnBackdrop(event) {
  if (event.target === els.howToPlayDialog) {
    els.howToPlayDialog.close();
  }
}

function handleHomeHotspotPress(event) {
  unlockHomeAnimalAudio();
  const target = event.currentTarget;
  if (!(target instanceof HTMLElement)) return;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--hotspot-x", `${event.clientX - rect.left}px`);
  target.style.setProperty("--hotspot-y", `${event.clientY - rect.top}px`);
  replayClass(target, "hotspot-press");
}

function bindEvents() {
  els.loginUserList.addEventListener("click", handleLoginUserClick);
  els.profileEditForm?.addEventListener("submit", saveProfileEdit);
  els.profileEditForm?.addEventListener("click", (event) => {
    const source = event.target instanceof Element ? event.target : null;
    if (source?.closest("[data-close-profile]")) closeProfileEditor();
  });
  els.profileEditResetBtn?.addEventListener("click", resetProfileEdit);
  els.profileEditCancelBtn?.addEventListener("click", closeProfileEditor);
  els.profileEditDialog?.addEventListener("click", closeProfileEditorOnBackdrop);
  els.profileEditDialog?.addEventListener("close", () => {
    editingProfileId = null;
  });
  els.homeHotspots.forEach((hotspot) => {
    hotspot.addEventListener("pointerdown", handleHomeHotspotPress);
    hotspot.addEventListener("pointerenter", handleHomeAnimalHover);
  });
  els.switchUserBtn.addEventListener("click", switchUser);
  els.homeSwitchUserBtn.addEventListener("click", switchUser);
  els.lessonSelect.addEventListener("change", (event) => {
    state.lessonIndex = Number(event.target.value);
    saveState();
    sparkleAt(els.startLessonBtn, { count: 5, spread: 58, glyphs: ["课", "✦", "学"] });
  });
  els.uiLanguageSelect.addEventListener("change", changeUiLanguage);
  els.uiSkinSelect.addEventListener("change", changeUiSkin);
  els.lessonPickerBtn.addEventListener("click", openLessonPicker);
  els.lessonPickerHomeBtn.addEventListener("click", goHome);
  els.customCharacterBtn.addEventListener("click", openCustomCharacter);
  els.customHomeBtn.addEventListener("click", goHome);
  els.customCharacterForm.addEventListener("submit", saveCustomCharacter);
  els.customResetBtn.addEventListener("click", clearCustomCharacterForm);
  els.searchModeBtn.addEventListener("click", openSearchView);
  els.searchHomeBtn.addEventListener("click", goHome);
  els.searchForm.addEventListener("submit", submitSearch);
  els.searchInput.addEventListener("input", updateSearchInput);
  els.searchSpeakBtn.addEventListener("click", speakSelectedSearchEntry);
  els.searchOpenLessonBtn.addEventListener("click", openSelectedSearchEntryInLesson);
  els.idiomModeBtn.addEventListener("click", openIdiomSeries);
  els.idiomHomeBtn.addEventListener("click", goHome);
  els.idiomSearchInput.addEventListener("input", renderIdiomSeries);
  els.startLessonBtn.addEventListener("click", startLesson);
  els.dailyLessonBtn.addEventListener("click", startDailyLesson);
  els.dailyLessonCtaBtn?.addEventListener("click", startDailyLesson);
  els.dialogueModeBtn.addEventListener("click", openDialoguePractice);
  els.roleplayModeBtn.addEventListener("click", openRoleplayPractice);
  els.dialogueHomeBtn.addEventListener("click", goHome);
  els.roleplayHomeBtn.addEventListener("click", goHome);
  els.dialogueTopicSelect.addEventListener("change", changeDialogueCategory);
  els.dialoguePhraseBtn.addEventListener("click", speakDialoguePhrase);
  els.dialogueAllBtn.addEventListener("click", speakDialogueAll);
  els.roleplaySelect.addEventListener("change", changeRoleplayScenario);
  els.roleplayReadArea.addEventListener("click", () => speakRoleplayScene(els.roleplayReadArea));
  els.roleplaySpeakBtn.addEventListener("click", () => speakRoleplayScene(els.roleplaySpeakBtn));
  els.howToPlayBtn.addEventListener("click", openHowToPlay);
  els.howToPlayDialog.addEventListener("click", closeHowToPlayOnBackdrop);
  els.homeBtn.addEventListener("click", goHome);
  els.resultHomeBtn.addEventListener("click", goHome);
  els.prevCharBtn.addEventListener("click", () => moveChar(-1));
  els.nextCharBtn.addEventListener("click", () => moveChar(1));
  els.speakBtn.addEventListener("click", speakCurrent);
  els.animateBtn.addEventListener("click", animateCurrent);
  els.traceBtn.addEventListener("click", traceCurrent);
  els.cameraWriteBtn.addEventListener("click", startCameraWriting);
  els.cameraClearBtn.addEventListener("click", () => clearCameraPath());
  els.cameraCloseBtn.addEventListener("click", () => stopCameraWriting());
  els.cameraCanvas.addEventListener("pointerdown", beginCameraPointerStroke);
  els.cameraCanvas.addEventListener("pointermove", moveCameraPointerStroke);
  els.cameraCanvas.addEventListener("pointerup", endCameraPointerStroke);
  els.cameraCanvas.addEventListener("pointercancel", endCameraPointerStroke);
  els.cameraCanvas.addEventListener("pointerleave", endCameraPointerStroke);
  els.continueBtn.addEventListener("click", continueLesson);
  els.nextQuestionBtn.addEventListener("click", nextQuestion);
  els.retryBtn.addEventListener("click", startQuiz);
  els.nextLessonBtn.addEventListener("click", goNextLesson);
  document.addEventListener("pointerdown", (event) => {
    const source = event.target instanceof Element ? event.target : null;
    const button = source?.closest("button");
    if (button) addPressRipple(button, event);
  });
  document.addEventListener("click", (event) => {
    const source = event.target instanceof Element ? event.target : null;
    const target = source?.closest(
      ".function-action, .audio-button, .dialogue-word-card, .search-result-card, .small-button, .speak-button, .login-user-card"
    );
    if (!target || target.disabled) return;
    sparkleAt(target, { count: 3, spread: 46, glyphs: ["✦", "星"] });
  });
}

bindEvents();
prepareSpeechVoices();
applyStaticText();
renderLogin();
