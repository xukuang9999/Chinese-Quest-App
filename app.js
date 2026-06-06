const DATA = window.CHINESE_STUDY_DATA;
const STORAGE_KEY = "chinese-quest-300-state-v2";
const ACTIVE_USER_KEY = "chinese-quest-active-user-v1";
const USER_PROFILES_KEY = "chinese-quest-user-profiles-v1";
const CUSTOM_ENTRIES_KEY = "chinese-quest-custom-entries-v1";
const API_BASE = "";
const BASE_ENTRIES = Array.isArray(DATA.entries) ? DATA.entries : [];
const IDIOMS = Array.isArray(DATA.idioms) ? DATA.idioms : [];
const EVOLUTION_VIDEO_DIR = "assets/font-evolution-videos";
const LESSON_SIZE = DATA.lessonSize || 5;
const EXAM_SIZE = 20;
const EXAM_TYPES = ["pinyin", "meaning", "strokes"];
const AI_TEACHER_STORY_MAX_CHINESE_CHARS = 100;
const XP_PER_LEVEL = 120;
const STICKERS = ["星", "中", "好", "学", "棒", "✓", "5"];
const HOME_ANIMAL_SOUND_COOLDOWN_MS = 360;
const USER_PROFILES = [
  { id: "xiaoming", name: "小明", mark: "🐼" },
  { id: "xiaohong", name: "小红", mark: "🐰" },
  { id: "xiaohua", name: "小华", mark: "🦊" },
  { id: "xiaoli", name: "小丽", mark: "🐱" },
  { id: "xiaoqiang", name: "小强", mark: "🐯" },
  { id: "xiaomei", name: "小美", mark: "🐨" },
  { id: "xiaojie", name: "小杰", mark: "🐵" },
  { id: "xiaolan", name: "小兰", mark: "🐧" },
];
const PROFILE_AVATAR_OPTIONS = [
  { value: "🐼", en: "Panda", zh: "熊猫" },
  { value: "🐰", en: "Rabbit", zh: "兔子" },
  { value: "🦊", en: "Fox", zh: "狐狸" },
  { value: "🐱", en: "Cat", zh: "小猫" },
  { value: "🐯", en: "Tiger", zh: "老虎" },
  { value: "🐨", en: "Koala", zh: "考拉" },
  { value: "🐵", en: "Monkey", zh: "猴子" },
  { value: "🐧", en: "Penguin", zh: "企鹅" },
  { value: "🐶", en: "Dog", zh: "小狗" },
  { value: "🐸", en: "Frog", zh: "青蛙" },
  { value: "🐻", en: "Bear", zh: "小熊" },
  { value: "🐥", en: "Chick", zh: "小鸡" },
  { value: "🦔", en: "Hedgehog", zh: "刺猬" },
  { value: "🐘", en: "Elephant", zh: "大象" },
  { value: "🦁", en: "Lion", zh: "狮子" },
  { value: "🐮", en: "Cow", zh: "小牛" },
  { value: "🐷", en: "Pig", zh: "小猪" },
  { value: "🐹", en: "Hamster", zh: "仓鼠" },
  { value: "🐢", en: "Turtle", zh: "乌龟" },
  { value: "🦉", en: "Owl", zh: "猫头鹰" },
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
    signInTitle: "Sign in",
    signInAction: "Sign in",
    guestLoginAction: "访客登陆",
    registerTitle: "Create profile",
    registerAction: "Create profile",
    registerNewAccount: "Register new account",
    registerPromptHint: "Create a private learner profile with email, child details, and avatar.",
    backToLogin: "Back to login",
    usernameLabel: "ID / Username",
    pinLabel: "4-digit password",
    emailLabel: "Email",
    childNameLabel: "Child name",
    childAgeLabel: "Age",
    childInterestsLabel: "Interests",
    authRequired: "Please fill in the required fields.",
    authPinInvalid: "Password must be exactly 4 digits.",
    authRegistering: "Creating profile...",
    authSigningIn: "Signing in...",
    authBackendUnavailable: "Start the Chinese Quest server to use profiles.",
    registerToast: "{name}'s profile was created.",
    logoutAction: "Sign out",
    logoutConfirm: "Sign out and return to the ID login page?",
    logoutToast: "Signed out.",
    editProfile: "Edit",
    editProfileFor: "Edit {name}'s profile",
    profileEditTitle: "Edit learner profile",
    profileEditHint: "Change the learner name and animal avatar shown on this device.",
    profileNameLabel: "Learner name",
    profileMarkLabel: "Animal avatar",
    profileMarkHint: "Choose one animal for this learner.",
    profileSave: "Save profile",
    profileReset: "Reset",
    profileCancel: "Cancel",
    profileSavedToast: "{name}'s profile was saved.",
    profileResetToast: "Profile reset.",
    profileNameRequired: "Enter a learner name.",
    profileMarkRequired: "Choose an animal avatar.",
    lastUser: "Last used",
    currentUser: "Current user",
    signedInAs: "Current learner: {name}",
    loginToast: "Welcome back, {name}.",
    dailyLesson: "Daily Lesson",
    dailyPersonalLesson: "Personalized lesson",
    examTitle: "Exam",
    examLabel: "Assessment",
    examHint: "20 questions from known characters.",
    examHomeReady: "20 questions",
    openExam: "Start exam",
    startExam: "Start exam",
    examComplete: "Exam complete",
    examResultSummary: "Score {score} / {total} · {percent}% · {time}",
    examNoHistory: "No exam history yet.",
    examNeedsKnown: "Mark known characters in Self Assessment before starting an exam.",
    examNotEnoughKnown: "Using {count} known characters for this exam.",
    lastExamSummary: "Last exam: {score} / {total} · {percent}% · {time}",
    wrongWordsTitle: "Wrong words",
    wrongWordsHint: "Review characters missed in exams.",
    openWrongWords: "Open wrong words",
    wrongWordsEmpty: "No wrong words yet.",
    wrongWordsCount: "{count} wrong",
    wrongWordsCountOne: "1 wrong",
    wrongWordMistakes: "{count} mistakes",
    wrongWordMistakesOne: "1 mistake",
    howManyStrokes: "How many strokes does {char} have?",
    learnedStatus: "Learned",
    notLearnedStatus: "Not learned",
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
    howToPlayHint: "See what every module does and how to use it.",
    openHowToPlay: "Open guide",
    guideStep1: "<strong>Choose</strong> one lesson.",
    guideStep2: "<strong>Learn</strong> 5 characters with pinyin.",
    guideStep3: "<strong>Listen</strong> and practise stroke order.",
    guideStep4: "<strong>Test</strong> to earn XP and a sticker.",
    guideModulesLabel: "module guide",
    guideModulesTitle: "Module guide",
    guideStatsTitle: "Home progress",
    guideStatsUse: "<strong>Use:</strong> see known-character progress and database totals.",
    guideStatsPlay: "<strong>Play:</strong> update known characters in Self Assessment, then watch the Home progress bar and totals for characters, words, and idioms.",
    guideDailyTitle: "Daily Lesson",
    guideDailyUse: "<strong>Use:</strong> start the lesson selected for today.",
    guideDailyPlay: "<strong>Play:</strong> learn 5 characters, listen to pinyin, view meaning and words, practise stroke order or camera writing, then finish the test.",
    guideCourseTitle: "Course lessons",
    guideCourseUse: "<strong>Use:</strong> choose any lesson from the 800-character course.",
    guideCoursePlay: "<strong>Play:</strong> select a lesson, study each character card, use audio and stroke tools, then take the lesson test to save progress.",
    guideKnownTitle: "Self Assessment",
    guideKnownUse: "<strong>Use:</strong> record which characters this learner already knows.",
    guideKnownPlay: "<strong>Play:</strong> tick known characters in a 100-character batch, save to the profile, and use this list to power exams and the home progress bar.",
    guideExamTitle: "Exam",
    guideExamUse: "<strong>Use:</strong> check understanding with 20 questions from known characters.",
    guideExamPlay: "<strong>Play:</strong> answer pinyin, meaning, and stroke-count questions. Results are saved, and missed characters are sent to Wrong words.",
    guideWrongTitle: "Wrong words",
    guideWrongUse: "<strong>Use:</strong> review characters missed in exams.",
    guideWrongPlay: "<strong>Play:</strong> read each mistake card, check pinyin and meaning, then start another exam when ready.",
    guideDialogueTitle: "Daily dialogue",
    guideDialogueUse: "<strong>Use:</strong> practise useful spoken Chinese by topic.",
    guideDialoguePlay: "<strong>Play:</strong> choose a topic, tap the sentence to hear it, use Read all, and tap word cards for vocabulary practice.",
    guideRoleplayTitle: "Role play",
    guideRoleplayUse: "<strong>Use:</strong> practise reading short real-life scenes aloud.",
    guideRoleplayPlay: "<strong>Play:</strong> choose a scene, listen to the full line, repeat it aloud, and review the scene vocabulary below.",
    guideCustomTitle: "Add character",
    guideCustomUse: "<strong>Use:</strong> add a custom character that is not already in the course.",
    guideCustomPlay: "<strong>Play:</strong> enter the character, pinyin, Chinese and English meanings, plus 3 example words. Saved custom characters appear in Course lessons.",
    guideSearchTitle: "Search",
    guideSearchUse: "<strong>Use:</strong> look up characters or words in the course database.",
    guideSearchPlay: "<strong>Play:</strong> type Chinese, open a result, listen to pronunciation, inspect meanings, words, dictionary details, and jump into its lesson.",
    guideIdiomTitle: "Idiom series",
    guideIdiomUse: "<strong>Use:</strong> learn 200 common Chinese idioms.",
    guideIdiomPlay: "<strong>Play:</strong> browse or search an idiom, read its meaning, example sentence, and source, then practise using it in speech or writing.",
    guideLanguageTitle: "UI language",
    guideLanguageUse: "<strong>Use:</strong> change the app display language.",
    guideLanguagePlay: "<strong>Play:</strong> choose Chinese, English, bilingual, Japanese, or Korean. The setting is saved in the learner profile.",
    guideLogoutTitle: "Sign out",
    guideLogoutUse: "<strong>Use:</strong> leave the current learner profile and return to the ID login page.",
    guideLogoutPlay: "<strong>Play:</strong> tap Sign out at the bottom of Home, confirm, then another learner can log in with their ID and 4-digit password.",
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
    fontEvolution: "Font Evolution",
    fontEvolutionVideo: "Evolution Video",
    fontEvolutionVideoAria: "character evolution video",
    words: "Words",
    zdicDictionary: "Dictionary Details",
    zdicOfflineSource: "Offline {source} data",
    zdicBasic: "Basic explanation",
    zdicDetailed: "Detailed explanation",
    zdicMandarin: "Mandarin dictionary",
    zdicKangxi: "Kangxi dictionary",
    zdicPhonetics: "Phonetics and dialects",
    zdicGlyph: "Glyph and variants",
    zhuyin: "Zhuyin",
    outerStrokes: "Outer strokes",
    strokeCode: "Stroke code",
    unicode: "Unicode",
    wubi: "Wubi",
    cangjie: "Cangjie",
    zhengma: "Zhengma",
    fourCorner: "Four-corner",
    variants: "Variants",
    translations: "Translations",
    commonTerms: "Common terms",
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
    startDailyGeneratedAria: "Start today's personalized lesson",
    englishLabel: "English",
    pinyinFallback: "pinyin",
    startTest: "Start test",
    characterCount: "Character {current} of {total}.",
    playLabel: "play {label}",
    playingLabel: "Playing {label}.",
    readMeaning: "read Chinese meaning",
    playingMeaning: "Reading the Chinese meaning for {char}.",
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
    dailyGeneratedToast: "Today's personalized lesson is ready.",
    aiTeacherTitle: "AI teacher",
    aiTeacherLabel: "Personal reading",
    aiTeacherHint: "Generate a short article from known characters.",
    aiTeacherHomeAction: "Open AI teacher",
    openAiTeacher: "Open AI teacher",
    aiTeacherNotice: "The AI teacher writes a short article with mostly known characters and a few new words. Generation runs only on the server.",
    aiTeacherGenerate: "Generate article",
    aiTeacherGenerating: "Generating article...",
    aiTeacherReadAll: "Read article",
    aiTeacherReadArea: "Tap to read the AI teacher article",
    aiTeacherEmptyTitle: "Ready for a new article",
    aiTeacherEmptyMeta: "Use Generate article to create a reading under 100 Chinese characters.",
    aiTeacherEmptyText: "Generate a short article, then tap any character or the article to hear it.",
    aiTeacherReady: "AI teacher article is ready.",
    aiTeacherNeedsKnown: "Mark known characters first for a better personalized article.",
    aiTeacherKnownSummary: "{count} known characters",
    aiTeacherKnownSummaryOne: "1 known character",
    aiTeacherUsedKnownSummary: "{count} known characters used",
    aiTeacherNewWords: "New words",
    aiTeacherNoNewWords: "New words will appear here after generation.",
    aiTeacherCharCount: "{count} Chinese characters",
    aiTeacherGenerateFailed: "AI teacher could not generate an article.",
    functionMenu: "function menu",
    courseLearning: "Course lessons",
    courseLearningHint: "Choose one lesson from the 800-character course.",
    chooseLessonAction: "Choose a lesson",
    startSelectedLesson: "Start selected lesson",
    openDialogue: "Open dialogue practice",
    openRoleplay: "Open role play",
    practiceModes: "practice modes",
    databaseTotals: "Database totals",
    databaseTotalsHint: "Current totals for characters, words, and idioms.",
    databaseCharacters: "Characters",
    databaseWords: "Words",
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
    customCharacterHint: "Add your own course character with words.",
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
    customRequiredHint: "3 required",
    customWordLabel: "Word {n}",
    customWordMeaningLabel: "English meaning {n}",
    customSave: "Save character",
    customReset: "Clear form",
    customSavedTitle: "Saved custom characters",
    customSavedEmpty: "Saved characters will appear here and in Course lessons.",
    customInvalidChar: "Enter one Chinese character.",
    customMissingRequired: "Please fill in every required field.",
    customWordMustUseChar: "Each word should include {char}.",
    customOriginalLocked: "{char} is one of the original course characters and cannot be changed.",
    customAlreadyExists: "{char} has already been added.",
    customSavedToast: "{char} was saved to Course lessons.",
    knownCharactersTitle: "Self Assessment",
    knownCharactersHint: "Pick the characters this learner already knows.",
    openKnownCharacters: "Open Self Assessment",
    knownCharactersProgressLabel: "Known characters",
    knownCharactersLabel: "Learner profile",
    knownCharactersPageHint: "Choose the characters this learner already knows. The saved result is kept in the current learner profile.",
    knownCharactersNewBatch: "New 100",
    knownCharactersSelectAll: "Select all",
    knownCharactersClear: "Clear",
    knownCharactersSave: "Save to profile",
    knownCharactersSelected: "{selected} selected in this set · {total} saved",
    knownCharactersBatch: "{count} database characters",
    knownCharactersCount: "{count} known",
    knownCharactersCountOne: "1 known",
    knownCharactersEmpty: "0 known",
    knownCharactersSavedToast: "{selected} from this set saved. {total} known in this profile.",
    searchTitle: "Search",
    searchModeHint: "Type Chinese to find pinyin, words, stroke order, and radical.",
    openSearch: "Open search",
    searchLabel: "Course database",
    searchInputLabel: "Chinese search",
    searchPlaceholder: "Enter Chinese, for example: 新 / 新书",
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
    idiomSearchPlaceholder: "Search idioms, for example: 一心一意",
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
    signInTitle: "登录",
    signInAction: "登录",
    guestLoginAction: "访客登陆",
    registerTitle: "建立档案",
    registerAction: "建立档案",
    registerNewAccount: "注册新账户",
    registerPromptHint: "建立只属于这个孩子的档案，包含邮箱、孩子信息和头像。",
    backToLogin: "返回登录",
    usernameLabel: "ID / 用户名",
    pinLabel: "4 位密码",
    emailLabel: "邮箱",
    childNameLabel: "孩子名字",
    childAgeLabel: "年龄",
    childInterestsLabel: "喜好",
    authRequired: "请填写必填内容。",
    authPinInvalid: "密码必须是 4 位数字。",
    authRegistering: "正在建立档案...",
    authSigningIn: "正在登录...",
    authBackendUnavailable: "请先启动 Chinese Quest 后台服务，才能使用学习档案。",
    registerToast: "{name} 的档案已建立。",
    logoutAction: "退出登录",
    logoutConfirm: "确定要退出登录并返回 ID 登录页面吗？",
    logoutToast: "已退出登录。",
    profileEditHint: "修改此设备上显示的学习用户名字和小动物头像。",
    profileNameLabel: "学习用户名字",
    profileMarkLabel: "小动物头像",
    profileMarkHint: "为这个学习用户选择一种小动物。",
    profileSave: "保存资料",
    profileReset: "恢复默认",
    profileCancel: "取消",
    profileSavedToast: "{name} 的资料已保存。",
    profileResetToast: "资料已恢复默认。",
    profileNameRequired: "请输入学习用户名字。",
    profileMarkRequired: "请选择小动物头像。",
    lastUser: "上次使用",
    currentUser: "当前用户",
    signedInAs: "当前学习用户：{name}",
    loginToast: "{name}，欢迎回来。",
    dailyLesson: "一日一课",
    dailyPersonalLesson: "个性一日课",
    examTitle: "考试",
    examLabel: "测评",
    examHint: "从会的字中抽 20 题。",
    examHomeReady: "20 题",
    openExam: "开始考试",
    startExam: "开始考试",
    examComplete: "考试完成",
    examResultSummary: "成绩 {score} / {total} · {percent}% · {time}",
    examNoHistory: "还没有考试记录。",
    examNeedsKnown: "请先在识字自评里标记会的字，再开始考试。",
    examNotEnoughKnown: "本次使用 {count} 个已认识的字考试。",
    lastExamSummary: "上次考试：{score} / {total} · {percent}% · {time}",
    wrongWordsTitle: "错词数据库",
    wrongWordsHint: "复习考试答错的字。",
    openWrongWords: "打开错词数据库",
    wrongWordsEmpty: "还没有错词。",
    wrongWordsCount: "{count} 个错词",
    wrongWordsCountOne: "1 个错词",
    wrongWordMistakes: "错 {count} 次",
    wrongWordMistakesOne: "错 1 次",
    howManyStrokes: "“{char}”有多少笔画？",
    learnedStatus: "已学过",
    notLearnedStatus: "未学过",
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
    howToPlayHint: "查看每个模块的用途和具体玩法。",
    openHowToPlay: "打开说明",
    guideStep1: "<strong>选择</strong> 一节课。",
    guideStep2: "<strong>学习</strong> 5 个汉字和拼音。",
    guideStep3: "<strong>听读</strong> 并练习笔顺。",
    guideStep4: "<strong>测试</strong> 后获得经验和贴纸。",
    guideModulesLabel: "模块使用说明",
    guideModulesTitle: "各模块具体玩法",
    guideStatsTitle: "主页进度",
    guideStatsUse: "<strong>用处：</strong>查看已认识汉字进度，以及数据库里字、词、成语的总量。",
    guideStatsPlay: "<strong>玩法：</strong>先在 Self Assessment 更新会的字，再回主页看进度条变化；字、词、成语总量用于了解当前可学习内容规模。",
    guideDailyTitle: "一日一课",
    guideDailyUse: "<strong>用处：</strong>进入系统为今天安排的学习内容。",
    guideDailyPlay: "<strong>玩法：</strong>一次学习 5 个汉字，听拼音，看意思和组词，练习笔顺或摄像头写字，最后完成测试保存进度。",
    guideCourseTitle: "课程学习",
    guideCourseUse: "<strong>用处：</strong>从 800 个汉字课程中自由选择任意一课。",
    guideCoursePlay: "<strong>玩法：</strong>选择课号，逐个查看汉字卡片，用发音、笔顺、描红和摄像头练习，完成本课测试后记录 XP 和贴纸。",
    guideKnownTitle: "Self Assessment",
    guideKnownUse: "<strong>用处：</strong>记录这个学习用户已经认识哪些汉字。",
    guideKnownPlay: "<strong>玩法：</strong>每次从 100 个字里勾选会的字，保存到学习档案；这个记录会更新主页进度条，并作为考试抽题范围。",
    guideExamTitle: "考试",
    guideExamUse: "<strong>用处：</strong>用 20 道题检查已认识汉字的掌握情况。",
    guideExamPlay: "<strong>玩法：</strong>回答拼音、意思和笔画数题目；考试结果会保存，答错的字会自动进入错词数据库。",
    guideWrongTitle: "错词数据库",
    guideWrongUse: "<strong>用处：</strong>集中复习考试里答错的汉字。",
    guideWrongPlay: "<strong>玩法：</strong>查看每张错词卡的拼音、意思和出错次数，复习后可以再次开始考试巩固。",
    guideDialogueTitle: "日常对话",
    guideDialogueUse: "<strong>用处：</strong>按主题练习常用中文口语。",
    guideDialoguePlay: "<strong>玩法：</strong>选择主题，点击句子听读，使用“全部朗读”，再点击词语卡片练习相关词汇。",
    guideRoleplayTitle: "角色扮演",
    guideRoleplayUse: "<strong>用处：</strong>练习真实生活场景中的短句朗读。",
    guideRoleplayPlay: "<strong>玩法：</strong>选择情景，听完整台词，跟读并大声复述，再复习下面的情景词语。",
    guideCustomTitle: "新增汉字",
    guideCustomUse: "<strong>用处：</strong>加入课程里没有的自定义汉字。",
    guideCustomPlay: "<strong>玩法：</strong>填写汉字、拼音、中文意思、英文意思和 3 个组词；保存后会出现在课程学习中，原始课程汉字不能覆盖。",
    guideSearchTitle: "搜索",
    guideSearchUse: "<strong>用处：</strong>快速查询课程数据库里的汉字或词语。",
    guideSearchPlay: "<strong>玩法：</strong>输入中文，打开结果，听发音，查看意思、组词、字典资料和笔顺，也可以直接跳到包含该字的课程。",
    guideIdiomTitle: "成语系列",
    guideIdiomUse: "<strong>用处：</strong>学习 200 条常用中文成语。",
    guideIdiomPlay: "<strong>玩法：</strong>浏览或搜索成语，阅读意思、例句和出处，再尝试把成语用在口头表达或写作里。",
    guideLanguageTitle: "界面语言",
    guideLanguageUse: "<strong>用处：</strong>切换应用显示语言。",
    guideLanguagePlay: "<strong>玩法：</strong>选择中文、英文、双语、日文或韩文；设置会保存在当前学习用户档案里。",
    guideLogoutTitle: "退出登录",
    guideLogoutUse: "<strong>用处：</strong>离开当前学习用户档案，回到 ID 登录页面。",
    guideLogoutPlay: "<strong>玩法：</strong>在主页最下方点击退出登录，确认后返回登录页，其他学习用户可以用自己的 ID 和 4 位密码登录。",
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
    fontEvolution: "字体演变",
    fontEvolutionVideo: "字形演化视频",
    fontEvolutionVideoAria: "汉字字形演化视频",
    words: "组词",
    zdicDictionary: "字典资料",
    zdicOfflineSource: "已内置的{source}数据",
    zdicBasic: "基本解释",
    zdicDetailed: "详细解释",
    zdicMandarin: "国语辞典",
    zdicKangxi: "康熙字典",
    zdicPhonetics: "音韵方言",
    zdicGlyph: "字源字形",
    zhuyin: "注音",
    outerStrokes: "部外笔画",
    strokeCode: "笔顺编号",
    unicode: "统一码",
    wubi: "五笔",
    cangjie: "仓颉",
    zhengma: "郑码",
    fourCorner: "四角",
    variants: "异体字",
    translations: "外文释义",
    commonTerms: "常用词组",
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
    startDailyGeneratedAria: "开始今天的个性一日课",
    englishLabel: "英语",
    pinyinFallback: "拼音",
    startTest: "开始测试",
    characterCount: "第 {current} / {total} 个字。",
    playLabel: "播放 {label}",
    playingLabel: "正在播放 {label}。",
    readMeaning: "朗读中文意思",
    playingMeaning: "正在朗读“{char}”的中文意思。",
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
    dailyGeneratedToast: "今日个性一日课已生成。",
    aiTeacherTitle: "AI老师",
    aiTeacherLabel: "个性阅读",
    aiTeacherHint: "用已会汉字生成一篇短文。",
    aiTeacherHomeAction: "打开AI老师",
    openAiTeacher: "打开AI老师",
    aiTeacherNotice: "AI老师会尽量使用学生已经会的字词，加入少量新字词。文章生成只在后台服务端进行。",
    aiTeacherGenerate: "生成文章",
    aiTeacherGenerating: "正在生成文章...",
    aiTeacherReadAll: "朗读文章",
    aiTeacherReadArea: "点击朗读AI老师文章",
    aiTeacherEmptyTitle: "准备生成新文章",
    aiTeacherEmptyMeta: "点击生成文章，创建一篇 100 个汉字以内的阅读。",
    aiTeacherEmptyText: "生成短文后，可以点击任意汉字或整篇文章听读。",
    aiTeacherReady: "AI老师文章已生成。",
    aiTeacherNeedsKnown: "先在识字自评里标记会的字，个性文章会更准确。",
    aiTeacherKnownSummary: "已认识 {count} 个字",
    aiTeacherKnownSummaryOne: "已认识 1 个字",
    aiTeacherUsedKnownSummary: "使用了 {count} 个已会字",
    aiTeacherNewWords: "新字词",
    aiTeacherNoNewWords: "生成文章后，新字词会显示在这里。",
    aiTeacherCharCount: "{count} 个汉字",
    aiTeacherGenerateFailed: "AI老师暂时无法生成文章。",
    functionMenu: "功能菜单",
    courseLearning: "课程学习",
    courseLearningHint: "从 800 字课程中选择一课学习。",
    chooseLessonAction: "选择课程",
    startSelectedLesson: "开始选择的课程",
    openDialogue: "进入日常对话",
    openRoleplay: "进入角色扮演",
    practiceModes: "练习模式",
    databaseTotals: "数据库总量",
    databaseTotalsHint: "字、词和成语的当前总数。",
    databaseCharacters: "字",
    databaseWords: "词",
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
    customCharacterHint: "把自己的汉字和组词加入课程。",
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
    customRequiredHint: "必须填写 3 个",
    customWordLabel: "组词 {n}",
    customWordMeaningLabel: "英文意思 {n}",
    customSave: "保存汉字",
    customReset: "清空表单",
    customSavedTitle: "已保存的自定义汉字",
    customSavedEmpty: "保存后的汉字会显示在这里，并加入课程学习。",
    customInvalidChar: "请输入一个汉字。",
    customMissingRequired: "请填写所有必填内容。",
    customWordMustUseChar: "每个组词都应该包含“{char}”。",
    customOriginalLocked: "“{char}”属于原始课程汉字，不能修改。",
    customAlreadyExists: "“{char}”已经添加过。",
    customSavedToast: "“{char}”已保存到课程学习。",
    knownCharactersTitle: "识字自评",
    knownCharactersHint: "选择这个学习用户已经认识的字。",
    openKnownCharacters: "打开识字自评",
    knownCharactersProgressLabel: "已认识汉字",
    knownCharactersLabel: "学习用户档案",
    knownCharactersPageHint: "从这 100 个数据库汉字里选择已经认识的字，保存到当前学习用户档案。",
    knownCharactersNewBatch: "换 100 个",
    knownCharactersSelectAll: "全选",
    knownCharactersClear: "清空",
    knownCharactersSave: "保存到档案",
    knownCharactersSelected: "本组已选 {selected} 个 · 档案共 {total} 个",
    knownCharactersBatch: "{count} 个数据库汉字",
    knownCharactersCount: "已认识 {count} 个字",
    knownCharactersCountOne: "已认识 1 个字",
    knownCharactersEmpty: "还没有记录认识的字",
    knownCharactersSavedToast: "本组保存 {selected} 个，档案共记录 {total} 个。",
    searchTitle: "搜索",
    searchModeHint: "输入中文，查找拼音、组词、笔顺和部首。",
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
    logoutAction: "サインアウト",
    logoutConfirm: "サインアウトしてIDログイン画面に戻りますか？",
    logoutToast: "サインアウトしました。",
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
    fontEvolution: "字体の変化",
    fontEvolutionVideo: "字形変化ビデオ",
    fontEvolutionVideoAria: "文字の字形変化ビデオ",
    words: "単語",
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
    readMeaning: "中国語の意味を読む",
    playingMeaning: "{char} の中国語の意味を読み上げ中。",
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
    databaseTotalsHint: "文字、単語、成語の現在の総数です。",
    databaseCharacters: "文字",
    databaseWords: "単語",
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
    logoutAction: "로그아웃",
    logoutConfirm: "로그아웃하고 ID 로그인 화면으로 돌아갈까요?",
    logoutToast: "로그아웃했습니다.",
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
    fontEvolution: "글자체 변화",
    fontEvolutionVideo: "글자 변화 영상",
    fontEvolutionVideoAria: "한자 글자 변화 영상",
    words: "단어",
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
    readMeaning: "중국어 뜻 읽기",
    playingMeaning: "{char}의 중국어 뜻을 읽는 중.",
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
    databaseTotalsHint: "글자, 단어, 성어의 현재 총수입니다.",
    databaseCharacters: "글자",
    databaseWords: "단어",
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
  loginForm: document.querySelector("#loginForm"),
  loginUsernameInput: document.querySelector("#loginUsernameInput"),
  loginPinInput: document.querySelector("#loginPinInput"),
  loginValidation: document.querySelector("#loginValidation"),
  guestLoginBtn: document.querySelector("#guestLoginBtn"),
  registerPrompt: document.querySelector("#registerPrompt"),
  openRegisterBtn: document.querySelector("#openRegisterBtn"),
  cancelRegisterBtn: document.querySelector("#cancelRegisterBtn"),
  registerForm: document.querySelector("#registerForm"),
  registerUsernameInput: document.querySelector("#registerUsernameInput"),
  registerPinInput: document.querySelector("#registerPinInput"),
  registerEmailInput: document.querySelector("#registerEmailInput"),
  registerChildNameInput: document.querySelector("#registerChildNameInput"),
  registerAgeInput: document.querySelector("#registerAgeInput"),
  registerAvatarInput: document.querySelector("#registerAvatarInput"),
  registerInterestsInput: document.querySelector("#registerInterestsInput"),
  registerValidation: document.querySelector("#registerValidation"),
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
  screenHomeTitles: document.querySelectorAll("[data-home-title]"),
  lessonPickerView: document.querySelector("#lessonPickerView"),
  customCharacterView: document.querySelector("#customCharacterView"),
  searchView: document.querySelector("#searchView"),
  idiomView: document.querySelector("#idiomView"),
  knownCharactersView: document.querySelector("#knownCharactersView"),
  wrongWordsView: document.querySelector("#wrongWordsView"),
  dialogueView: document.querySelector("#dialogueView"),
  roleplayView: document.querySelector("#roleplayView"),
  aiTeacherView: document.querySelector("#aiTeacherView"),
  lessonView: document.querySelector("#lessonView"),
  testView: document.querySelector("#testView"),
  resultView: document.querySelector("#resultView"),
  levelValue: document.querySelector("#levelValue"),
  xpLabel: document.querySelector("#xpLabel"),
  xpWrap: document.querySelector(".xp-wrap"),
  xpBar: document.querySelector("#xpBar"),
  streakValue: document.querySelector("#streakValue"),
  currentUserName: document.querySelector("#currentUserName"),
  logoutBtn: document.querySelector("#logoutBtn"),
  homeLogoutBtn: document.querySelector("#homeLogoutBtn"),
  homeCurrentUserName: document.querySelector("#homeCurrentUserName"),
  knownCharactersProgressMeter: document.querySelector("#knownCharactersProgressMeter"),
  knownCharactersProgressValue: document.querySelector("#knownCharactersProgressValue"),
  knownCharactersProgressPercent: document.querySelector("#knownCharactersProgressPercent"),
  knownCharactersProgressBar: document.querySelector("#knownCharactersProgressBar"),
  lessonSelect: document.querySelector("#lessonSelect"),
  startLessonBtn: document.querySelector("#startLessonBtn"),
  uiLanguageSelect: document.querySelector("#uiLanguageSelect"),
  uiSkinSelect: document.querySelector("#uiSkinSelect"),
  homeAmbientLayer: document.querySelector("#homeAmbientLayer"),
  dailyMonth: document.querySelector("#dailyMonth"),
  dailyDay: document.querySelector("#dailyDay"),
  dailyLessonTitle: document.querySelector("#dailyLessonTitle"),
  dailyLessonChars: document.querySelector("#dailyLessonChars"),
  dailyLessonBtn: document.querySelector("#dailyLessonBtn"),
  dailyLessonCtaBtn: document.querySelector("#dailyLessonCtaBtn"),
  howToPlayBtn: document.querySelector("#howToPlayBtn"),
  howToPlayDialog: document.querySelector("#howToPlayDialog"),
  lessonPickerBtn: document.querySelector("#lessonPickerBtn"),
  customCharacterBtn: document.querySelector("#customCharacterBtn"),
  customCharacterCount: document.querySelector("#customCharacterCount"),
  searchModeBtn: document.querySelector("#searchModeBtn"),
  idiomModeBtn: document.querySelector("#idiomModeBtn"),
  knownCharactersBtn: document.querySelector("#knownCharactersBtn"),
  knownCharactersHomeCount: document.querySelector("#knownCharactersHomeCount"),
  examModeBtn: document.querySelector("#examModeBtn"),
  examHomeSummary: document.querySelector("#examHomeSummary"),
  wrongWordsBtn: document.querySelector("#wrongWordsBtn"),
  wrongWordsHomeCount: document.querySelector("#wrongWordsHomeCount"),
  idiomHomeCount: document.querySelector("#idiomHomeCount"),
  databaseCharacterCount: document.querySelector("#databaseCharacterCount"),
  databaseWordCount: document.querySelector("#databaseWordCount"),
  databaseIdiomCount: document.querySelector("#databaseIdiomCount"),
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
  searchForm: document.querySelector("#searchForm"),
  searchInput: document.querySelector("#searchInput"),
  searchResultCount: document.querySelector("#searchResultCount"),
  searchResults: document.querySelector("#searchResults"),
  searchDetailEmpty: document.querySelector("#searchDetailEmpty"),
  searchDetailBody: document.querySelector("#searchDetailBody"),
  searchDetailChar: document.querySelector("#searchDetailChar"),
  searchCharStatus: document.querySelector("#searchCharStatus"),
  searchDetailPinyin: document.querySelector("#searchDetailPinyin"),
  searchSpeakBtn: document.querySelector("#searchSpeakBtn"),
  searchDetailMeaningZh: document.querySelector("#searchDetailMeaningZh"),
  searchDetailMeaningEn: document.querySelector("#searchDetailMeaningEn"),
  searchFontEvolutionList: document.querySelector("#searchFontEvolutionList"),
  searchRadicalValue: document.querySelector("#searchRadicalValue"),
  searchStrokeValue: document.querySelector("#searchStrokeValue"),
  searchStructureValue: document.querySelector("#searchStructureValue"),
  searchDetailWords: document.querySelector("#searchDetailWords"),
  searchZdicPanel: document.querySelector("#searchZdicPanel"),
  searchStrokeTarget: document.querySelector("#searchStrokeTarget"),
  searchOpenLessonBtn: document.querySelector("#searchOpenLessonBtn"),
  idiomSearchInput: document.querySelector("#idiomSearchInput"),
  idiomCount: document.querySelector("#idiomCount"),
  idiomList: document.querySelector("#idiomList"),
  knownCharactersForm: document.querySelector("#knownCharactersForm"),
  knownCharactersGrid: document.querySelector("#knownCharactersGrid"),
  knownCharactersSummary: document.querySelector("#knownCharactersSummary"),
  knownCharactersBatchMeta: document.querySelector("#knownCharactersBatchMeta"),
  knownCharactersNewBatchBtn: document.querySelector("#knownCharactersNewBatchBtn"),
  knownCharactersSelectAllBtn: document.querySelector("#knownCharactersSelectAllBtn"),
  knownCharactersClearBtn: document.querySelector("#knownCharactersClearBtn"),
  knownCharactersValidation: document.querySelector("#knownCharactersValidation"),
  wrongWordsCount: document.querySelector("#wrongWordsCount"),
  lastExamSummary: document.querySelector("#lastExamSummary"),
  wrongWordsList: document.querySelector("#wrongWordsList"),
  startExamFromWrongWordsBtn: document.querySelector("#startExamFromWrongWordsBtn"),
  customWords: [1, 2, 3].map((index) => ({
    word: document.querySelector(`#customWord${index}`),
    meaningEn: document.querySelector(`#customWordMeaning${index}`),
  })),
  dialogueModeBtn: document.querySelector("#dialogueModeBtn"),
  roleplayModeBtn: document.querySelector("#roleplayModeBtn"),
  aiTeacherBtn: document.querySelector("#aiTeacherBtn"),
  aiTeacherKnownCount: document.querySelector("#aiTeacherKnownCount"),
  aiTeacherGenerateBtn: document.querySelector("#aiTeacherGenerateBtn"),
  aiTeacherReadBtn: document.querySelector("#aiTeacherReadBtn"),
  aiTeacherStatus: document.querySelector("#aiTeacherStatus"),
  aiTeacherReadArea: document.querySelector("#aiTeacherReadArea"),
  aiTeacherArticleTitle: document.querySelector("#aiTeacherArticleTitle"),
  aiTeacherArticleMeta: document.querySelector("#aiTeacherArticleMeta"),
  aiTeacherArticleText: document.querySelector("#aiTeacherArticleText"),
  aiTeacherUsedKnownCount: document.querySelector("#aiTeacherUsedKnownCount"),
  aiTeacherNewWordsList: document.querySelector("#aiTeacherNewWordsList"),
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
  lessonTitle: document.querySelector("#lessonTitle"),
  lessonProgress: document.querySelector("#lessonProgress"),
  prevCharBtn: document.querySelector("#prevCharBtn"),
  nextCharBtn: document.querySelector("#nextCharBtn"),
  speakBtn: document.querySelector("#speakBtn"),
  speakLabel: document.querySelector("#speakLabel"),
  bigChar: document.querySelector("#bigChar"),
  lessonCharStatus: document.querySelector("#lessonCharStatus"),
  pinyin: document.querySelector("#pinyin"),
  meaning: document.querySelector("#meaning"),
  meaningSpeakBtn: document.querySelector("#meaningSpeakBtn"),
  meaningZh: document.querySelector("#meaningZh"),
  meaningEn: document.querySelector("#meaningEn"),
  fontEvolutionList: document.querySelector("#fontEvolutionList"),
  evolutionVideoSection: document.querySelector("#evolutionVideoSection"),
  evolutionVideo: document.querySelector("#evolutionVideo"),
  wordList: document.querySelector("#wordList"),
  lessonZdicPanel: document.querySelector("#lessonZdicPanel"),
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
let evolutionVideoRequestId = 0;
let cachedChineseVoice = null;
const SPARKLE_GLYPHS = ["✦", "★", "星", "好", "棒"];
const SPARKLE_COLORS = ["#ff7078", "#2f80ed", "#54b86a", "#ffd45d", "#8d65d8"];
const HOME_AMBIENT_GROUPS = [
  {
    kind: "cloud",
    glyphs: ["☁"],
    count: 9,
    top: [3, 86],
    size: [3.8, 8.2],
    duration: [34, 58],
    opacity: [0.18, 0.42],
    drift: [-8, 8],
  },
  {
    kind: "bird",
    glyphs: ["🐦", "🕊️", "🐤", "🐥"],
    count: 10,
    top: [5, 78],
    size: [2.0, 4.0],
    duration: [16, 32],
    opacity: [0.46, 0.78],
    drift: [-14, 14],
  },
  {
    kind: "animal",
    glyphs: ["🐼", "🐰", "🦊", "🐵", "🐢", "🐸", "🐨", "🐯", "🐱", "🐧"],
    count: 8,
    top: [24, 90],
    size: [2.3, 4.6],
    duration: [22, 42],
    opacity: [0.42, 0.72],
    drift: [-10, 12],
  },
];

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
  learnedCharacters: [],
  knownCharacters: [],
  knownCharacterBatch: [],
  knownCharactersUpdatedAt: "",
  examHistory: [],
  wrongCharacters: {},
  aiTeacherStory: null,
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
let saveStateQueue = Promise.resolve();
let saveFailureNotified = false;
let activeLesson = null;
let aiTeacherBusy = false;
let loginUrlAttempted = false;

function freshDefaultState() {
  return {
    ...defaultState,
    completedLessons: [],
    stickers: [],
    attempts: {},
    learnedCharacters: [],
    knownCharacters: [],
    knownCharacterBatch: [],
    examHistory: [],
    wrongCharacters: {},
    aiTeacherStory: null,
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
  if (!Array.isArray(merged.learnedCharacters)) {
    merged.learnedCharacters = [];
  } else {
    merged.learnedCharacters = [...new Set(merged.learnedCharacters.map(cleanText).filter(isSingleChineseCharacter))];
  }
  if (!Array.isArray(merged.knownCharacters)) {
    merged.knownCharacters = [];
  } else {
    merged.knownCharacters = [...new Set(merged.knownCharacters.map(cleanText).filter(isSingleChineseCharacter))];
  }
  if (!Array.isArray(merged.examHistory)) {
    merged.examHistory = [];
  } else {
    merged.examHistory = merged.examHistory
      .filter((item) => item && typeof item === "object")
      .map((item) => ({
        takenAt: typeof item.takenAt === "string" ? item.takenAt : "",
        score: Math.max(0, Number(item.score) || 0),
        total: Math.max(0, Number(item.total) || 0),
        percent: Math.max(0, Number(item.percent) || 0),
        wrongChars: Array.isArray(item.wrongChars) ? [...new Set(item.wrongChars.map(cleanText).filter(isSingleChineseCharacter))] : [],
      }))
      .slice(-50);
  }
  if (!merged.wrongCharacters || typeof merged.wrongCharacters !== "object" || Array.isArray(merged.wrongCharacters)) {
    merged.wrongCharacters = {};
  } else {
    merged.wrongCharacters = Object.fromEntries(
      Object.entries(merged.wrongCharacters)
        .map(([char, raw]) => {
          const cleanChar = cleanText(char);
          if (!isSingleChineseCharacter(cleanChar)) return null;
          const value = raw && typeof raw === "object" ? raw : {};
          return [cleanChar, {
            count: Math.max(1, Number(value.count) || 1),
            lastWrongAt: typeof value.lastWrongAt === "string" ? value.lastWrongAt : "",
            lastTestedAt: typeof value.lastTestedAt === "string" ? value.lastTestedAt : "",
          }];
        })
        .filter(Boolean)
    );
  }
  merged.aiTeacherStory = normalizeAiTeacherStory(merged.aiTeacherStory);
  if (!Array.isArray(merged.knownCharacterBatch)) {
    merged.knownCharacterBatch = [];
  } else {
    merged.knownCharacterBatch = [...new Set(merged.knownCharacterBatch.map(cleanText).filter(isSingleChineseCharacter))].slice(0, 100);
  }
  if (typeof merged.knownCharactersUpdatedAt !== "string") {
    merged.knownCharactersUpdatedAt = "";
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

async function apiRequest(path, options = {}) {
  if (!window.fetch) {
    throw new Error(t("authBackendUnavailable"));
  }
  const { body, headers = {}, ...rest } = options;
  const requestOptions = {
    credentials: "same-origin",
    ...rest,
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
  };
  if (body !== undefined) requestOptions.body = JSON.stringify(body);
  const response = await fetch(`${API_BASE}${path}`, requestOptions);
  const text = await response.text();
  let payload = {};
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = {};
    }
  }
  if (!response.ok) {
    const fallbackMessage = response.status === 404 && path.startsWith("/api/")
      ? t("authBackendUnavailable")
      : response.statusText || "Request failed.";
    const error = new Error(payload.error || fallbackMessage);
    error.status = response.status;
    throw error;
  }
  return payload;
}

function cloneStateForSave() {
  return JSON.parse(JSON.stringify(state));
}

function saveState(growthEvent = null) {
  if (!activeUser) return;
  const body = { state: cloneStateForSave() };
  if (growthEvent) body.growthEvent = growthEvent;
  saveStateQueue = saveStateQueue
    .catch(() => {})
    .then(() =>
      apiRequest("/api/profile/state", {
        method: "PUT",
        body,
      })
        .then(() => {
          saveFailureNotified = false;
        })
        .catch((error) => {
          console.warn("Could not save profile state:", error);
          if (!saveFailureNotified) {
            showToast(error.message || t("authBackendUnavailable"));
            saveFailureNotified = true;
          }
        })
    );
}

function cleanText(value, maxLength = Infinity) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return Number.isFinite(maxLength) ? text.slice(0, maxLength) : text;
}

function cleanMultiline(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function profileAvatarFallback(fallbackMark) {
  return PROFILE_AVATAR_OPTIONS.some((option) => option.value === fallbackMark)
    ? fallbackMark
    : PROFILE_AVATAR_OPTIONS[0].value;
}

function normalizeProfileMark(value, fallbackMark) {
  const mark = cleanText(value);
  return PROFILE_AVATAR_OPTIONS.some((option) => option.value === mark) ? mark : profileAvatarFallback(fallbackMark);
}

function normalizeUserProfile(raw, fallbackProfile) {
  const name = cleanText(raw?.name).slice(0, 24) || fallbackProfile.name;
  const mark = normalizeProfileMark(raw?.mark, fallbackProfile.mark);
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

function profileAvatarLabel(option) {
  if (state.uiLanguage === "zh") return `${option.value} ${option.zh}`;
  if (state.uiLanguage === "bilingual") return `${option.value} ${option.zh} / ${option.en}`;
  return `${option.value} ${option.en}`;
}

function populateProfileAvatarOptions(selectedMark = "") {
  if (!els.profileMarkInput) return;
  const currentMark = normalizeProfileMark(selectedMark || els.profileMarkInput.value, PROFILE_AVATAR_OPTIONS[0].value);
  els.profileMarkInput.innerHTML = "";
  PROFILE_AVATAR_OPTIONS.forEach((avatar) => {
    const option = document.createElement("option");
    option.value = avatar.value;
    option.textContent = profileAvatarLabel(avatar);
    els.profileMarkInput.append(option);
  });
  els.profileMarkInput.value = currentMark;
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

  if (!char || !pinyin || !meaningZh || !meaningEn || words.length !== 3) {
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

function numericDataValue(key, fallback) {
  const value = Number(DATA[key]);
  return Number.isFinite(value) ? value : fallback;
}

function databaseTotals() {
  return {
    characters: numericDataValue("characterCount", BASE_ENTRIES.length) + customEntries.length,
    words: numericDataValue("commonWordCount", countEntryWords(BASE_ENTRIES)) + countEntryWords(customEntries),
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

function localizedEntryMeaning(entry) {
  const zh = cleanText(entry?.meaningZh);
  const en = cleanText(entry?.meaningEn);
  if (state.uiLanguage === "zh") return zh || en || "";
  if (state.uiLanguage === "bilingual") {
    if (zh && en && zh !== en) return `${zh} / ${en}`;
    return zh || en || "";
  }
  return en || zh || "";
}

function applyUiSkin() {
  document.body.dataset.skin = "classic";
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
  if (els.uiSkinSelect) {
    els.uiSkinSelect.innerHTML = "";
    UI_SKIN_OPTIONS.forEach((skin) => {
      const option = document.createElement("option");
      option.value = skin.value;
      option.textContent = t(skin.labelKey);
      option.selected = skin.value === state.uiSkin;
      els.uiSkinSelect.append(option);
    });
  }
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
  populateProfileAvatarOptions(els.profileMarkInput?.value);
  populateRegisterAvatarOptions(els.registerAvatarInput?.value);
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
  } else if (screen === "knownCharacters") {
    renderKnownCharacters();
    renderStats();
  } else if (screen === "wrongWords") {
    renderWrongWords();
    renderStats();
  } else if (screen === "dialogue") {
    renderDialoguePractice();
    renderStats();
  } else if (screen === "roleplay") {
    renderRoleplayPractice();
    renderStats();
  } else if (screen === "aiTeacher") {
    renderAiTeacher();
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

function lessonEntries(lessonIndex) {
  if (lessonIndex === undefined && activeLesson?.entries?.length) {
    return activeLesson.entries;
  }
  const index = lessonIndex ?? state.lessonIndex;
  const start = index * LESSON_SIZE;
  return allEntries().slice(start, start + LESSON_SIZE);
}

function currentEntry() {
  return lessonEntries()[state.charIndex] || lessonEntries()[0] || allEntries()[0];
}

function lessonKey(index) {
  if (index === undefined && activeLesson?.key) return activeLesson.key;
  return String(index ?? state.lessonIndex);
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
  const entries = generatedDailyLessonEntries();
  const firstCourseIndex = allEntries().findIndex((entry) => entry.char === entries[0]?.char);
  const index = firstCourseIndex >= 0 ? Math.floor(firstCourseIndex / LESSON_SIZE) : 0;
  return {
    dateKey,
    index,
    key: `daily-${dateKey}-${entries.map((entry) => entry.char).join("")}`,
    entries,
  };
}

function completedCourseCharacters() {
  const characters = new Set();
  (Array.isArray(state.completedLessons) ? state.completedLessons : []).forEach((key) => {
    if (!/^\d+$/.test(String(key))) return;
    lessonEntries(Number(key)).forEach((entry) => characters.add(entry.char));
  });
  return characters;
}

function learnedCharactersForDailyLesson() {
  const learned = savedKnownCharacters();
  (Array.isArray(state.learnedCharacters) ? state.learnedCharacters : []).forEach((char) => learned.add(char));
  completedCourseCharacters().forEach((char) => learned.add(char));
  return learned;
}

function isCharacterLearned(char, learnedSet = learnedCharactersForDailyLesson()) {
  return learnedSet.has(char);
}

function updateLearnedStatusBadge(badge, char, learnedSet = learnedCharactersForDailyLesson()) {
  if (!badge) return;
  const learned = isCharacterLearned(char, learnedSet);
  badge.textContent = t(learned ? "learnedStatus" : "notLearnedStatus");
  badge.classList.toggle("is-learned", learned);
  badge.classList.toggle("is-new", !learned);
  badge.title = badge.textContent;
}

function makeLearnedStatusBadge(char, options = {}) {
  const badge = document.createElement("span");
  badge.className = `learned-status-badge${options.compact ? " compact" : ""}`;
  updateLearnedStatusBadge(badge, char, options.learnedSet);
  return badge;
}

function generatedDailyLessonEntries() {
  const entries = allEntries();
  const learned = learnedCharactersForDailyLesson();
  const newEntries = entries.filter((entry) => !learned.has(entry.char));
  const selected = newEntries.slice(0, LESSON_SIZE);
  if (selected.length < LESSON_SIZE) {
    entries.some((entry) => {
      if (!selected.some((item) => item.char === entry.char)) selected.push(entry);
      return selected.length >= LESSON_SIZE;
    });
  }
  return selected;
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
  activeLesson = null;
  writer = null;
  searchWriter = null;
  lastRenderedXp = null;
  lastRenderedLevel = null;
}

function normalizeBackendUser(raw) {
  const fallbackMark = PROFILE_AVATAR_OPTIONS[0].value;
  return {
    id: cleanText(raw?.id),
    username: cleanText(raw?.username),
    name: cleanText(raw?.name || raw?.childName || raw?.username).slice(0, 40) || t("currentUser"),
    mark: normalizeProfileMark(raw?.mark || raw?.avatar, fallbackMark),
    email: cleanText(raw?.email),
    childAge: raw?.childAge ?? "",
    childInterests: cleanText(raw?.childInterests || raw?.interests, 500),
  };
}

function populateRegisterAvatarOptions(selectedMark = "") {
  if (!els.registerAvatarInput) return;
  const currentMark = normalizeProfileMark(selectedMark || els.registerAvatarInput.value, PROFILE_AVATAR_OPTIONS[0].value);
  els.registerAvatarInput.innerHTML = "";
  PROFILE_AVATAR_OPTIONS.forEach((avatar) => {
    const option = document.createElement("option");
    option.value = avatar.value;
    option.textContent = profileAvatarLabel(avatar);
    option.selected = avatar.value === currentMark;
    els.registerAvatarInput.append(option);
  });
}

function setAuthValidation(target, message, tone = "") {
  if (!target) return;
  target.textContent = message;
  target.className = `custom-validation${tone ? ` ${tone}` : ""}`;
}

function setAuthBusy(form, busy) {
  if (!form) return;
  form.querySelectorAll("button, input, select, textarea").forEach((field) => {
    field.disabled = busy;
  });
}

function showRegisterForm() {
  els.loginUserList?.classList.add("is-registering");
  els.registerPrompt?.classList.add("hidden");
  els.registerForm?.classList.remove("hidden");
  setAuthValidation(els.registerValidation, "");
  requestAnimationFrame(() => els.registerUsernameInput?.focus({ preventScroll: true }));
}

function hideRegisterForm({ reset = false } = {}) {
  els.loginUserList?.classList.remove("is-registering");
  els.registerForm?.classList.add("hidden");
  els.registerPrompt?.classList.remove("hidden");
  setAuthValidation(els.registerValidation, "");
  if (reset) {
    els.registerForm?.reset();
    populateRegisterAvatarOptions();
  }
}

function readLoginDraft() {
  return {
    username: cleanText(els.loginUsernameInput?.value),
    pin: cleanText(els.loginPinInput?.value),
  };
}

function readRegisterDraft() {
  return {
    username: cleanText(els.registerUsernameInput?.value),
    pin: cleanText(els.registerPinInput?.value),
    email: cleanText(els.registerEmailInput?.value),
    childName: cleanText(els.registerChildNameInput?.value),
    age: cleanText(els.registerAgeInput?.value),
    interests: cleanText(els.registerInterestsInput?.value, 500),
    avatar: normalizeProfileMark(els.registerAvatarInput?.value, PROFILE_AVATAR_OPTIONS[0].value),
    initialState: freshDefaultState(),
  };
}

function pinIsValid(pin) {
  return /^\d{4}$/.test(pin);
}

function applyAuthenticatedProfile(payload, toastMessage = "") {
  activeUser = normalizeBackendUser(payload.user);
  state = normalizeLoadedState(payload.state || {});
  normalizeStateCoursePointers();
  resetSessionViews();
  applyStaticText();
  updateActiveUserLabels();
  renderHome();
  if (toastMessage) showToast(toastMessage);
}

async function submitLogin(event) {
  event.preventDefault();
  const draft = readLoginDraft();
  if (!draft.username || !draft.pin) {
    setAuthValidation(els.loginValidation, t("authRequired"), "needs-review");
    return;
  }
  if (!pinIsValid(draft.pin)) {
    setAuthValidation(els.loginValidation, t("authPinInvalid"), "needs-review");
    return;
  }
  setAuthValidation(els.loginValidation, t("authSigningIn"));
  setAuthBusy(els.loginForm, true);
  try {
    const payload = await apiRequest("/api/login", {
      method: "POST",
      body: { username: draft.username, pin: draft.pin },
    });
    if (els.loginPinInput) els.loginPinInput.value = "";
    applyAuthenticatedProfile(payload, t("loginToast", { name: payload.user?.name || draft.username }));
  } catch (error) {
    setAuthValidation(els.loginValidation, error.message || t("authBackendUnavailable"), "needs-review");
  } finally {
    setAuthBusy(els.loginForm, false);
  }
}

async function loginAsGuest() {
  if (els.loginUsernameInput) els.loginUsernameInput.value = "guest";
  if (els.loginPinInput) els.loginPinInput.value = "";
  setAuthValidation(els.loginValidation, t("authSigningIn"));
  setAuthBusy(els.loginForm, true);
  try {
    const payload = await apiRequest("/api/login", {
      method: "POST",
      body: { username: "guest", pin: "" },
    });
    applyAuthenticatedProfile(payload, t("loginToast", { name: payload.user?.name || "Guest" }));
  } catch (error) {
    setAuthValidation(els.loginValidation, error.message || t("authBackendUnavailable"), "needs-review");
  } finally {
    setAuthBusy(els.loginForm, false);
  }
}

async function submitRegister(event) {
  event.preventDefault();
  const draft = readRegisterDraft();
  if (!draft.username || !draft.pin || !draft.email || !draft.childName) {
    setAuthValidation(els.registerValidation, t("authRequired"), "needs-review");
    return;
  }
  if (!pinIsValid(draft.pin)) {
    setAuthValidation(els.registerValidation, t("authPinInvalid"), "needs-review");
    return;
  }
  setAuthValidation(els.registerValidation, t("authRegistering"));
  setAuthBusy(els.registerForm, true);
  try {
    const payload = await apiRequest("/api/register", {
      method: "POST",
      body: draft,
    });
    els.registerForm?.reset();
    populateRegisterAvatarOptions();
    applyAuthenticatedProfile(payload, t("registerToast", { name: payload.user?.name || draft.childName }));
  } catch (error) {
    setAuthValidation(els.registerValidation, error.message || t("authBackendUnavailable"), "needs-review");
  } finally {
    setAuthBusy(els.registerForm, false);
  }
}

function renderLogin() {
  activeUser = null;
  state = freshDefaultState();
  resetSessionViews();
  applyStaticText();
  populateRegisterAvatarOptions();
  hideRegisterForm({ reset: true });
  updateActiveUserLabels();
  setScreen("login");
}

async function restoreSession() {
  try {
    const payload = await apiRequest("/api/session");
    applyAuthenticatedProfile(payload);
    return true;
  } catch (error) {
    if (error.status && error.status !== 401) {
      console.warn("Could not restore session:", error);
    }
    return false;
  }
}

async function logoutCurrentUser() {
  if (!window.confirm(t("logoutConfirm"))) return;
  try {
    await saveStateQueue.catch(() => {});
    await apiRequest("/api/logout", { method: "POST", body: {} });
  } catch (error) {
    console.warn("Could not clear backend session:", error);
  }
  renderLogin();
  showToast(t("logoutToast"));
}

function setProfileValidation(message, tone = "") {
  if (!els.profileEditValidation) return;
  els.profileEditValidation.textContent = message;
  els.profileEditValidation.className = `custom-validation${tone ? ` ${tone}` : ""}`;
}

function fillProfileForm(profile) {
  if (!profile) return;
  if (els.profileNameInput) els.profileNameInput.value = profile.name;
  populateProfileAvatarOptions(profile.mark);
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
  const mark = normalizeProfileMark(els.profileMarkInput?.value, fallbackProfile?.mark || PROFILE_AVATAR_OPTIONS[0].value);
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

function screenElementFor(screen) {
  return {
    login: els.loginView,
    home: els.homeView,
    lessonPicker: els.lessonPickerView,
    customCharacter: els.customCharacterView,
    search: els.searchView,
    idiom: els.idiomView,
    knownCharacters: els.knownCharactersView,
    wrongWords: els.wrongWordsView,
    dialogue: els.dialogueView,
    roleplay: els.roleplayView,
    aiTeacher: els.aiTeacherView,
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
  els.knownCharactersView.classList.toggle("hidden", screen !== "knownCharacters");
  els.wrongWordsView.classList.toggle("hidden", screen !== "wrongWords");
  els.dialogueView.classList.toggle("hidden", screen !== "dialogue");
  els.roleplayView.classList.toggle("hidden", screen !== "roleplay");
  els.aiTeacherView.classList.toggle("hidden", screen !== "aiTeacher");
  els.lessonView.classList.toggle("hidden", screen !== "lesson");
  els.testView.classList.toggle("hidden", screen !== "test");
  els.resultView.classList.toggle("hidden", screen !== "result");
  if (els.logoutBtn) els.logoutBtn.hidden = screen === "login";
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
  els.dailyLessonTitle.textContent = t("dailyPersonalLesson");
  els.dailyLessonChars.innerHTML = "";
  const learnedSet = learnedCharactersForDailyLesson();
  daily.entries.forEach((entry) => {
    const item = document.createElement("span");
    item.className = "daily-char-status";
    const char = document.createElement("strong");
    char.textContent = entry.char;
    item.append(char, makeLearnedStatusBadge(entry.char, { compact: true, learnedSet }));
    els.dailyLessonChars.append(item);
  });
  els.dailyLessonBtn.setAttribute("aria-label", t("startDailyGeneratedAria"));
}

function formatCount(value) {
  return new Intl.NumberFormat(UI_DATE_LOCALE[state.uiLanguage] || "en-AU").format(value);
}

function formatProgressPercent(known, total) {
  if (!total) return "0";
  return ((known / total) * 100).toFixed(2).replace(/\.?0+$/, "");
}

function renderKnownCharactersProgress() {
  const known = savedKnownCharacters().size;
  const total = databaseTotals().characters;
  const percent = formatProgressPercent(known, total);
  const progressText = `${formatCount(known)} / ${formatCount(total)}`;
  const percentText = `${percent}%`;
  if (els.knownCharactersProgressValue) {
    els.knownCharactersProgressValue.textContent = progressText;
  }
  if (els.knownCharactersProgressPercent) {
    els.knownCharactersProgressPercent.textContent = percentText;
  }
  if (els.knownCharactersProgressBar) {
    els.knownCharactersProgressBar.style.width = `${Math.min(Number(percent) || 0, 100)}%`;
  }
  if (els.knownCharactersProgressMeter) {
    els.knownCharactersProgressMeter.setAttribute("aria-label", t("knownCharactersProgressLabel"));
    els.knownCharactersProgressMeter.setAttribute("aria-valuenow", String(Math.min(Number(percent) || 0, 100)));
    els.knownCharactersProgressMeter.setAttribute("aria-valuetext", `${progressText}, ${percentText}`);
  }
}

function examPercent(score, total) {
  if (!total) return 0;
  return Math.round((score / total) * 100);
}

function latestExamRecord() {
  const history = Array.isArray(state.examHistory) ? state.examHistory : [];
  return history.length ? history[history.length - 1] : null;
}

function formatExamTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat(UI_DATE_LOCALE[state.uiLanguage] || "en-AU", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Australia/Melbourne",
  }).format(date);
}

function formatExamRecord(record, templateKey = "lastExamSummary") {
  if (!record) return t("examNoHistory");
  const score = Number(record.score) || 0;
  const total = Number(record.total) || 0;
  return t(templateKey, {
    score,
    total,
    percent: Number(record.percent) || examPercent(score, total),
    time: formatExamTime(record.takenAt),
  });
}

function wrongCharactersCount() {
  return wrongCharacterRecords().length;
}

function wrongWordCountLabel(count) {
  return count === 1 ? t("wrongWordsCountOne") : t("wrongWordsCount", { count });
}

function wrongMistakeLabel(count) {
  return count === 1 ? t("wrongWordMistakesOne") : t("wrongWordMistakes", { count });
}

function wrongCharacterRecords() {
  const entryByChar = new Map(allEntries().map((entry) => [entry.char, entry]));
  return Object.entries(state.wrongCharacters || {})
    .map(([char, raw]) => {
      const entry = entryByChar.get(char);
      if (!entry) return null;
      const count = Math.max(1, Number(raw?.count) || 1);
      return {
        char,
        entry,
        count,
        lastWrongAt: typeof raw?.lastWrongAt === "string" ? raw.lastWrongAt : "",
        lastTestedAt: typeof raw?.lastTestedAt === "string" ? raw.lastTestedAt : "",
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return new Date(b.lastWrongAt).getTime() - new Date(a.lastWrongAt).getTime();
    });
}

function renderDatabaseTotals() {
  const totals = databaseTotals();
  [
    [els.databaseCharacterCount, totals.characters],
    [els.databaseWordCount, totals.words],
    [els.databaseIdiomCount, totals.idioms],
  ].forEach(([node, value]) => {
    if (node) node.textContent = formatCount(value);
  });
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function seedHomeAmbientLayer() {
  if (!els.homeAmbientLayer) return;
  els.homeAmbientLayer.innerHTML = "";
  HOME_AMBIENT_GROUPS.forEach((group) => {
    for (let index = 0; index < group.count; index += 1) {
      const sprite = document.createElement("span");
      const glyph = document.createElement("span");
      const duration = randomBetween(group.duration[0], group.duration[1]);
      const direction = Math.random() > 0.5 ? "reverse" : "forward";
      const size = randomBetween(group.size[0], group.size[1]);
      const driftY = randomBetween(group.drift[0], group.drift[1]);
      const restX = randomBetween(2, 96);
      sprite.className = `home-float home-float-${group.kind} home-float-${direction}`;
      glyph.className = "home-float-glyph";
      glyph.textContent = randomItem(group.glyphs);
      sprite.style.setProperty("--top", `${randomBetween(group.top[0], group.top[1]).toFixed(2)}%`);
      sprite.style.setProperty("--size", `${size.toFixed(2)}cqw`);
      sprite.style.setProperty("--duration", `${duration.toFixed(2)}s`);
      sprite.style.setProperty("--delay", `${(-Math.random() * duration).toFixed(2)}s`);
      sprite.style.setProperty("--opacity", randomBetween(group.opacity[0], group.opacity[1]).toFixed(2));
      sprite.style.setProperty("--drift-y", `${driftY.toFixed(2)}cqw`);
      sprite.style.setProperty("--drift-y-end", `${(driftY * -0.45).toFixed(2)}cqw`);
      sprite.style.setProperty("--rest-x", `${restX.toFixed(2)}cqw`);
      sprite.style.setProperty("--scale", randomBetween(0.86, 1.18).toFixed(2));
      sprite.style.setProperty("--tilt-start", `${randomBetween(-12, 12).toFixed(1)}deg`);
      sprite.style.setProperty("--tilt-mid", `${randomBetween(-18, 18).toFixed(1)}deg`);
      sprite.style.setProperty("--tilt-end", `${randomBetween(-12, 12).toFixed(1)}deg`);
      sprite.style.setProperty("--bob-duration", `${randomBetween(2.4, 5.2).toFixed(2)}s`);
      sprite.style.setProperty("--bob-delay", `${(-Math.random() * 4).toFixed(2)}s`);
      sprite.append(glyph);
      els.homeAmbientLayer.append(sprite);
    }
  });
}

function renderCustomSummary() {
  els.customCharacterCount.textContent = customEntries.length
    ? t("customCharacterCount", { count: customEntries.length })
    : t("customCharacterEmpty");
  if (els.knownCharactersHomeCount) {
    els.knownCharactersHomeCount.textContent = knownCharactersCountLabel(savedKnownCharacters().size);
  }
  if (els.examHomeSummary) {
    els.examHomeSummary.textContent = latestExamRecord()
      ? formatExamRecord(latestExamRecord(), "examResultSummary")
      : t("examHomeReady");
  }
  if (els.wrongWordsHomeCount) {
    els.wrongWordsHomeCount.textContent = wrongWordCountLabel(wrongCharactersCount());
  }
  renderKnownCharactersProgress();
  if (els.idiomHomeCount) {
    els.idiomHomeCount.textContent = idiomCountLabel(IDIOMS.length);
  }
  renderDatabaseTotals();
}

function knownCharactersCountLabel(count) {
  if (!count) return t("knownCharactersEmpty");
  return count === 1 ? t("knownCharactersCountOne") : t("knownCharactersCount", { count });
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
  seedHomeAmbientLayer();
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
  if (BASE_ENTRIES.some((entry) => entry.char === draft.char)) {
    return t("customOriginalLocked", { char: draft.char });
  }
  if (customEntries.some((entry) => entry.char === draft.char)) {
    return t("customAlreadyExists", { char: draft.char });
  }
  if (draft.words.some((word) => !word.word.includes(draft.char))) {
    return t("customWordMustUseChar", { char: draft.char });
  }
  return "";
}

function createCustomEntry(draft) {
  const createdAt = new Date().toISOString();
  const strokes = Number(draft.strokes);
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

  const learnedSet = learnedCharactersForDailyLesson();
  customEntries.forEach((entry, index) => {
    const item = document.createElement("div");
    item.className = "custom-saved-item";
    const char = document.createElement("strong");
    char.textContent = entry.char;
    const text = document.createElement("span");
    text.className = "character-meta-line";
    text.append(document.createTextNode(`${entry.pinyin} · ${localizedEntryMeaning(entry)}`), makeLearnedStatusBadge(entry.char, { compact: true, learnedSet }));
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

  const learnedSet = learnedCharactersForDailyLesson();
  results.forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "search-result-card";
    if (selectedSearchEntry?.char === entry.char) button.classList.add("is-selected");
    const char = document.createElement("strong");
    char.textContent = entry.char;
    const text = document.createElement("span");
    text.className = "character-meta-line";
    const index = entryCourseIndex(entry);
    text.append(
      document.createTextNode(`${entry.pinyin || t("pinyinFallback")} · ${index >= 0 ? t("lessonN", { n: Math.floor(index / LESSON_SIZE) + 1 }) : ""}`),
      makeLearnedStatusBadge(entry.char, { compact: true, learnedSet })
    );
    const meaning = document.createElement("em");
    meaning.textContent = localizedEntryMeaning(entry);
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
    renderZdicPanel(els.searchZdicPanel, null);
    return;
  }
  selectedSearchEntry = entry;
  els.searchDetailEmpty.classList.add("hidden");
  els.searchDetailBody.classList.remove("hidden");
  els.searchDetailChar.textContent = entry.char;
  updateLearnedStatusBadge(els.searchCharStatus, entry.char);
  els.searchDetailPinyin.textContent = entry.pinyin || t("pinyinFallback");
  els.searchDetailMeaningZh.textContent = entry.meaningZh || "";
  els.searchDetailMeaningEn.textContent = entry.meaningEn || "";
  els.searchRadicalValue.textContent = entry.radical || "—";
  els.searchStrokeValue.textContent = entry.strokes || "—";
  els.searchStructureValue.textContent = entry.structure || "—";
  renderFontEvolution(els.searchFontEvolutionList, entry);
  renderWordCards(els.searchDetailWords, entry);
  renderZdicPanel(els.searchZdicPanel, entry);
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

function savedKnownCharacters() {
  const databaseChars = new Set(allEntries().map((entry) => entry.char));
  return new Set((Array.isArray(state.knownCharacters) ? state.knownCharacters : []).filter((char) => databaseChars.has(char)));
}

function orderedKnownCharacters(characters) {
  const knownSet = characters instanceof Set ? characters : new Set(characters);
  return allEntries()
    .filter((entry) => knownSet.has(entry.char))
    .map((entry) => entry.char);
}

function knownCharacterBatchEntries() {
  const entryByChar = new Map(allEntries().map((entry) => [entry.char, entry]));
  return (Array.isArray(state.knownCharacterBatch) ? state.knownCharacterBatch : [])
    .map((char) => entryByChar.get(char))
    .filter(Boolean);
}

function createKnownCharacterBatch() {
  const entries = allEntries();
  return shuffle(entries).slice(0, Math.min(100, entries.length));
}

function ensureKnownCharacterBatch({ force = false } = {}) {
  const targetCount = Math.min(100, allEntries().length);
  let entries = force ? [] : knownCharacterBatchEntries();
  if (force || entries.length !== targetCount) {
    entries = createKnownCharacterBatch();
    state.knownCharacterBatch = entries.map((entry) => entry.char);
    saveState();
  }
  return entries;
}

function selectedKnownCharactersInBatch() {
  return [...els.knownCharactersGrid.querySelectorAll("input[type='checkbox']:checked")].map((input) => input.value);
}

function projectedKnownCharacters() {
  const nextKnown = savedKnownCharacters();
  const selected = new Set(selectedKnownCharactersInBatch());
  const batchChars = new Set(knownCharacterBatchEntries().map((entry) => entry.char));
  selected.forEach((char) => nextKnown.add(char));
  batchChars.forEach((char) => {
    if (!selected.has(char)) nextKnown.delete(char);
  });
  return nextKnown;
}

function setKnownCharactersValidation(message, type = "") {
  els.knownCharactersValidation.textContent = message;
  els.knownCharactersValidation.className = "custom-validation";
  if (type) els.knownCharactersValidation.classList.add(type);
}

function updateKnownCharactersSummary() {
  const selected = selectedKnownCharactersInBatch();
  const total = projectedKnownCharacters().size;
  els.knownCharactersSummary.textContent = `${selected.length} / ${knownCharacterBatchEntries().length}`;
  els.knownCharactersBatchMeta.textContent = t("knownCharactersBatch", { count: knownCharacterBatchEntries().length });
  setKnownCharactersValidation(t("knownCharactersSelected", { selected: selected.length, total }));
}

function renderKnownCharactersGrid(entries) {
  els.knownCharactersGrid.innerHTML = "";
  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = t("searchNoMatches");
    els.knownCharactersGrid.append(empty);
    return;
  }

  const known = savedKnownCharacters();
  const learnedSet = learnedCharactersForDailyLesson();
  entries.forEach((entry) => {
    const label = document.createElement("label");
    label.className = "known-character-option";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = entry.char;
    checkbox.checked = known.has(entry.char);
    checkbox.addEventListener("change", updateKnownCharactersSummary);

    const mark = document.createElement("span");
    mark.className = "known-character-check";
    mark.setAttribute("aria-hidden", "true");

    const char = document.createElement("strong");
    char.textContent = entry.char;

    const pinyin = document.createElement("span");
    pinyin.className = "character-meta-line";
    pinyin.append(document.createTextNode(entry.pinyin || t("pinyinFallback")), makeLearnedStatusBadge(entry.char, { compact: true, learnedSet }));

    const meaning = document.createElement("em");
    meaning.textContent = localizedEntryMeaning(entry);

    label.append(checkbox, mark, char, pinyin, meaning);
    els.knownCharactersGrid.append(label);
  });
  staggerChildren(els.knownCharactersGrid, ".known-character-option");
}

function renderKnownCharacters(options = {}) {
  const entries = ensureKnownCharacterBatch(options);
  renderKnownCharactersGrid(entries);
  updateKnownCharactersSummary();
  setScreen("knownCharacters");
}

function openKnownCharacters() {
  renderKnownCharacters();
}

function showNewKnownCharacterBatch() {
  renderKnownCharacters({ force: true });
  setKnownCharactersValidation(t("knownCharactersSelected", { selected: selectedKnownCharactersInBatch().length, total: projectedKnownCharacters().size }));
  sparkleAt(els.knownCharactersGrid, { count: 10, spread: 120, glyphs: ["字", "会", "✦"] });
}

function setKnownCharacterChecks(checked) {
  els.knownCharactersGrid.querySelectorAll("input[type='checkbox']").forEach((input) => {
    input.checked = checked;
  });
  updateKnownCharactersSummary();
}

function saveKnownCharacters(event) {
  event.preventDefault();
  const selected = selectedKnownCharactersInBatch();
  state.knownCharacters = orderedKnownCharacters(projectedKnownCharacters());
  state.knownCharactersUpdatedAt = new Date().toISOString();
  saveState({
    eventType: "known_characters_saved",
    payload: {
      selectedInBatch: selected.length,
      knownTotal: state.knownCharacters.length,
    },
  });
  renderCustomSummary();
  renderKnownCharactersGrid(knownCharacterBatchEntries());
  updateKnownCharactersSummary();
  const message = t("knownCharactersSavedToast", { selected: selected.length, total: state.knownCharacters.length });
  setKnownCharactersValidation(message, "success");
  showToast(message);
  sparkleAt(els.knownCharactersSummary, { count: 10, spread: 88, glyphs: ["会", "字", "★"] });
}

function renderWrongWords() {
  const records = wrongCharacterRecords();
  if (els.wrongWordsCount) {
    els.wrongWordsCount.textContent = wrongWordCountLabel(records.length);
  }
  if (els.lastExamSummary) {
    els.lastExamSummary.textContent = formatExamRecord(latestExamRecord());
  }
  if (!els.wrongWordsList) return;
  els.wrongWordsList.innerHTML = "";

  if (!records.length) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = t("wrongWordsEmpty");
    els.wrongWordsList.append(empty);
    setScreen("wrongWords");
    return;
  }

  const learnedSet = learnedCharactersForDailyLesson();
  records.forEach(({ entry, count, lastWrongAt }) => {
    const card = document.createElement("article");
    card.className = "wrong-word-item";

    const char = document.createElement("strong");
    char.textContent = entry.char;

    const body = document.createElement("div");
    body.className = "wrong-word-body";

    const title = document.createElement("span");
    title.className = "character-meta-line";
    title.append(document.createTextNode(entry.pinyin || t("pinyinFallback")), makeLearnedStatusBadge(entry.char, { compact: true, learnedSet }));

    const meaning = document.createElement("em");
    meaning.textContent = localizedEntryMeaning(entry);

    body.append(title, meaning);

    const meta = document.createElement("div");
    meta.className = "wrong-word-meta";
    const mistakes = document.createElement("b");
    mistakes.textContent = wrongMistakeLabel(count);
    const time = document.createElement("small");
    time.textContent = formatExamTime(lastWrongAt);
    meta.append(mistakes, time);

    card.append(char, body, meta);
    els.wrongWordsList.append(card);
  });
  staggerChildren(els.wrongWordsList, ".wrong-word-item");
  setScreen("wrongWords");
}

function openWrongWords() {
  renderWrongWords();
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

function countChineseCharacters(value) {
  return [...String(value || "")].filter(isSingleChineseCharacter).length;
}

function truncateAiTeacherText(value) {
  let count = 0;
  const output = [];
  for (const char of cleanMultiline(value)) {
    if (isSingleChineseCharacter(char)) {
      if (count >= AI_TEACHER_STORY_MAX_CHINESE_CHARS) break;
      count += 1;
    }
    output.push(char);
  }
  return output.join("").trim();
}

function normalizeAiTeacherCharacters(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .map((item) => ({
      char: cleanText(item?.char).slice(0, 1),
      pinyin: cleanText(item?.pinyin, 32),
    }))
    .filter((item) => {
      if (!isSingleChineseCharacter(item.char) || !item.pinyin || seen.has(item.char)) return false;
      seen.add(item.char);
      return true;
    })
    .slice(0, AI_TEACHER_STORY_MAX_CHINESE_CHARS);
}

function normalizeAiTeacherVocabulary(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .map((item) => ({
      word: cleanText(item?.word, 12),
      pinyin: cleanText(item?.pinyin, 80),
      meaningZh: cleanText(item?.meaningZh, 80),
      meaningEn: cleanText(item?.meaningEn, 100),
    }))
    .filter((item) => {
      if (!item.word || seen.has(item.word) || !uniqueCharactersFromText(item.word).length) return false;
      seen.add(item.word);
      return true;
    })
    .slice(0, 5);
}

function normalizeAiTeacherStory(raw) {
  if (!raw || typeof raw !== "object") return null;
  const text = truncateAiTeacherText(raw.text);
  if (!text) return null;
  return {
    title: cleanText(raw.title, 24) || t("aiTeacherTitle"),
    text,
    characters: normalizeAiTeacherCharacters(raw.characters),
    newVocabulary: normalizeAiTeacherVocabulary(raw.newVocabulary),
    usedKnownCharacters: cleanStringArray(raw.usedKnownCharacters, 100).filter(isSingleChineseCharacter),
    model: cleanText(raw.model, 40),
    generatedAt: cleanText(raw.generatedAt, 40),
    chineseCharacterCount: countChineseCharacters(text),
  };
}

function cleanStringArray(value, maxItems = 100, maxLength = 24) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .map((item) => cleanText(item, maxLength))
    .filter((item) => {
      if (!item || seen.has(item)) return false;
      seen.add(item);
      return true;
    })
    .slice(0, maxItems);
}

function aiTeacherKnownCountLabel(count) {
  return count === 1 ? t("aiTeacherKnownSummaryOne") : t("aiTeacherKnownSummary", { count });
}

function entryPinyinForChar(char) {
  return allEntries().find((entry) => entry.char === char)?.pinyin || "";
}

function aiTeacherCharacterPinyinMap(story) {
  const map = new Map();
  story?.characters?.forEach((item) => {
    if (item.char && item.pinyin) map.set(item.char, item.pinyin);
  });
  uniqueCharactersFromText(story?.text || "").forEach((char) => {
    if (!map.has(char)) map.set(char, entryPinyinForChar(char) || t("pinyinFallback"));
  });
  return map;
}

function knownWordsForAiTeacher(knownSet) {
  const words = [];
  const seen = new Set();
  allEntries().forEach((entry) => {
    if (!knownSet.has(entry.char)) return;
    (entry.words || []).forEach((word) => {
      const text = cleanText(word?.word, 12);
      if (!text || seen.has(text)) return;
      seen.add(text);
      words.push({
        word: text,
        meaningEn: cleanText(word?.meaningEn, 100),
      });
    });
  });
  return words.slice(0, 120);
}

function aiTeacherRequestPayload() {
  const knownSet = learnedCharactersForDailyLesson();
  return {
    knownCharacters: [...knownSet].filter(isSingleChineseCharacter).slice(0, 500),
    knownWords: knownWordsForAiTeacher(knownSet),
    recentCharacters: generatedDailyLessonEntries().map((entry) => entry.char).filter(isSingleChineseCharacter),
    interests: activeUser?.childInterests || "",
    age: activeUser?.childAge || "",
  };
}

function setAiTeacherStatus(message, type = "") {
  if (!els.aiTeacherStatus) return;
  els.aiTeacherStatus.textContent = message;
  els.aiTeacherStatus.className = "custom-validation";
  if (type) els.aiTeacherStatus.classList.add(type);
}

function setAiTeacherBusy(busy) {
  aiTeacherBusy = busy;
  if (els.aiTeacherGenerateBtn) {
    els.aiTeacherGenerateBtn.disabled = busy;
    els.aiTeacherGenerateBtn.textContent = busy ? t("aiTeacherGenerating") : t("aiTeacherGenerate");
  }
  if (els.aiTeacherReadBtn) els.aiTeacherReadBtn.disabled = busy || !state.aiTeacherStory?.text;
  if (els.aiTeacherReadArea) els.aiTeacherReadArea.classList.toggle("is-loading", busy);
}

function renderAiTeacherArticle(story) {
  const hasStory = Boolean(story?.text);
  if (els.aiTeacherArticleTitle) {
    els.aiTeacherArticleTitle.textContent = hasStory ? story.title : t("aiTeacherEmptyTitle");
  }
  if (els.aiTeacherArticleMeta) {
    els.aiTeacherArticleMeta.textContent = hasStory
      ? t("aiTeacherCharCount", { count: story.chineseCharacterCount || countChineseCharacters(story.text) })
      : t("aiTeacherEmptyMeta");
  }
  if (!els.aiTeacherArticleText) return;
  els.aiTeacherArticleText.innerHTML = "";
  if (!hasStory) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = t("aiTeacherEmptyText");
    els.aiTeacherArticleText.append(empty);
    return;
  }

  const pinyinMap = aiTeacherCharacterPinyinMap(story);
  [...story.text].forEach((char) => {
    if (!isSingleChineseCharacter(char)) {
      const punctuation = document.createElement("span");
      punctuation.className = "ai-reader-punctuation";
      punctuation.textContent = char;
      els.aiTeacherArticleText.append(punctuation);
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ai-reader-character";
    button.setAttribute("aria-label", t("playLabel", { label: char }));
    const pinyin = document.createElement("span");
    pinyin.className = "ai-reader-pinyin";
    pinyin.textContent = pinyinMap.get(char) || t("pinyinFallback");
    const hanzi = document.createElement("strong");
    hanzi.textContent = char;
    button.append(pinyin, hanzi);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      speakText(char, t("playingLabel", { label: char }), { button, mode: "character" });
    });
    els.aiTeacherArticleText.append(button);
  });
}

function renderAiTeacherVocabulary(story) {
  if (!els.aiTeacherNewWordsList) return;
  els.aiTeacherNewWordsList.innerHTML = "";
  const words = story?.newVocabulary || [];
  if (!words.length) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = t("aiTeacherNoNewWords");
    els.aiTeacherNewWordsList.append(empty);
    return;
  }
  words.forEach((word) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dialogue-word-card ai-teacher-word-card";
    button.setAttribute("aria-label", t("playLabel", { label: word.word }));

    const zh = document.createElement("strong");
    zh.textContent = word.word;
    const pinyin = document.createElement("span");
    pinyin.className = "pinyin-line";
    pinyin.textContent = word.pinyin || t("pinyinFallback");
    const meaning = document.createElement("span");
    meaning.className = "practice-english";
    meaning.textContent = state.uiLanguage === "zh" ? word.meaningZh || word.meaningEn : word.meaningEn || word.meaningZh;
    const icon = document.createElement("span");
    icon.className = "word-audio-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.append(makeSpeakerIcon("speaker-icon-small"));

    button.append(zh, pinyin, meaning, icon);
    button.addEventListener("click", () => speakText(word.word, t("playingLabel", { label: word.word }), { button, mode: "word" }));
    els.aiTeacherNewWordsList.append(button);
  });
  staggerChildren(els.aiTeacherNewWordsList, ".ai-teacher-word-card");
}

function renderAiTeacher() {
  const knownCount = learnedCharactersForDailyLesson().size;
  if (els.aiTeacherKnownCount) els.aiTeacherKnownCount.textContent = aiTeacherKnownCountLabel(knownCount);
  if (els.aiTeacherUsedKnownCount) {
    const usedCount = state.aiTeacherStory?.usedKnownCharacters?.length || 0;
    els.aiTeacherUsedKnownCount.textContent = usedCount ? t("aiTeacherUsedKnownSummary", { count: usedCount }) : "";
  }
  renderAiTeacherArticle(state.aiTeacherStory);
  renderAiTeacherVocabulary(state.aiTeacherStory);
  setAiTeacherBusy(aiTeacherBusy);
  setScreen("aiTeacher");
}

function openAiTeacher() {
  renderAiTeacher();
  const knownCount = learnedCharactersForDailyLesson().size;
  setAiTeacherStatus(knownCount ? "" : t("aiTeacherNeedsKnown"), knownCount ? "" : "needs-review");
  requestAnimationFrame(() => replayClass(els.aiTeacherReadArea, "screen-enter"));
}

async function generateAiTeacherArticle() {
  if (aiTeacherBusy) return;
  setAiTeacherBusy(true);
  setAiTeacherStatus(t("aiTeacherGenerating"));
  try {
    const payload = await apiRequest("/api/ai-teacher/story", {
      method: "POST",
      body: aiTeacherRequestPayload(),
    });
    const story = normalizeAiTeacherStory(payload.story);
    if (!story) throw new Error(t("aiTeacherGenerateFailed"));
    state.aiTeacherStory = story;
    saveState({
      eventType: "ai_teacher_story_saved",
      payload: {
        chineseCharacterCount: story.chineseCharacterCount,
        newVocabularyCount: story.newVocabulary.length,
      },
    });
    renderAiTeacher();
    setAiTeacherStatus(t("aiTeacherReady"), "success");
    showToast(t("aiTeacherReady"));
    sparkleAt(els.aiTeacherReadArea, { count: 12, spread: 140, glyphs: ["师", "读", "字"] });
  } catch (error) {
    const message = error.message || t("aiTeacherGenerateFailed");
    setAiTeacherStatus(message, "needs-review");
    showToast(message);
  } finally {
    setAiTeacherBusy(false);
  }
}

function readAiTeacherArticle(triggerButton = els.aiTeacherReadBtn) {
  const story = state.aiTeacherStory;
  if (!story?.text) return;
  const played = speakText(story.text, t("playingLabel", { label: story.title || t("aiTeacherTitle") }), {
    button: triggerButton,
    mode: "sentence",
  });
  if (played) sparkleAt(triggerButton || els.aiTeacherReadArea, { count: 8, spread: 86, glyphs: ["声", "读", "✦"] });
}

function handleAiTeacherReadAreaKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  readAiTeacherArticle(els.aiTeacherReadArea);
}

function renderLesson() {
  const entries = lessonEntries();
  const entry = currentEntry();
  const isLast = state.charIndex === entries.length - 1;

  els.lessonTitle.textContent = activeLesson?.kind === "daily" ? t("dailyPersonalLesson") : t("lessonN", { n: state.lessonIndex + 1 });
  els.lessonProgress.textContent = `${state.charIndex + 1} / ${entries.length}`;
  els.bigChar.textContent = entry.char;
  updateLearnedStatusBadge(els.lessonCharStatus, entry.char);
  els.pinyin.textContent = entry.pinyin || t("pinyinFallback");
  els.meaning.textContent = localizedEntryMeaning(entry);
  els.meaningZh.textContent = entry.meaningZh;
  els.meaningEn.textContent = entry.meaningEn;
  els.meaningSpeakBtn.disabled = !cleanMultiline(entry.meaningZh);
  els.radicalValue.textContent = entry.radical || "—";
  els.strokeValue.textContent = entry.strokes || "—";
  els.structureValue.textContent = entry.structure || "—";
  els.prevCharBtn.disabled = state.charIndex === 0;
  els.nextCharBtn.disabled = isLast;
  els.continueBtn.textContent = isLast ? t("startTest") : t("next");

  renderFontEvolution(els.fontEvolutionList, entry);
  renderEvolutionVideo(entry);
  renderWords(entry);
  renderZdicPanel(els.lessonZdicPanel, entry);
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

function renderFontEvolution(container, entry) {
  container.innerHTML = "";
  const items = Array.isArray(entry.fontEvolution)
    ? entry.fontEvolution.filter((item) => item?.imageUrl).slice(0, 6)
    : [];
  if (!items.length) {
    const empty = document.createElement("span");
    empty.className = "font-evolution-empty";
    empty.textContent = "—";
    container.append(empty);
    return;
  }
  items.forEach((item) => {
    const tile = document.createElement("figure");
    tile.className = "font-evolution-item";
    const image = document.createElement("img");
    image.src = item.imageUrl;
    image.alt = item.alt || `${entry.char} ${item.label || ""}`.trim();
    image.loading = "lazy";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";
    const caption = document.createElement("figcaption");
    caption.textContent = item.label || t("fontEvolution");
    tile.append(image, caption);
    container.append(tile);
  });
  staggerChildren(container, ".font-evolution-item");
}

function evolutionVideoUrl(entry) {
  const configuredUrl = cleanText(
    entry?.fontEvolutionVideoUrl ||
      entry?.evolutionVideoUrl ||
      entry?.evolutionVideo ||
      entry?.videoUrl ||
      entry?.media?.fontEvolutionVideoUrl
  );
  if (configuredUrl) return configuredUrl;

  const char = cleanText(entry?.char);
  return char ? `${EVOLUTION_VIDEO_DIR}/${encodeURIComponent(char)}.mp4` : "";
}

function renderEvolutionVideo(entry) {
  if (!els.evolutionVideoSection || !els.evolutionVideo) return;

  const requestId = ++evolutionVideoRequestId;
  const video = els.evolutionVideo;
  const section = els.evolutionVideoSection;
  const url = evolutionVideoUrl(entry);

  section.classList.add("hidden");
  video.pause();
  video.onloadedmetadata = null;
  video.oncanplay = null;
  video.onerror = null;
  video.removeAttribute("src");
  video.load();

  if (!url) return;

  const showVideo = () => {
    if (requestId !== evolutionVideoRequestId) return;
    section.classList.remove("hidden");
  };
  const hideVideo = () => {
    if (requestId !== evolutionVideoRequestId) return;
    section.classList.add("hidden");
    video.pause();
  };

  video.onloadedmetadata = showVideo;
  video.oncanplay = showVideo;
  video.onerror = hideVideo;
  video.src = url;
  video.load();
}

function appendZdicText(container, text, className = "zdic-text") {
  const value = cleanMultiline(text);
  if (!value) return false;
  const paragraph = document.createElement("p");
  paragraph.className = className;
  paragraph.textContent = value;
  container.append(paragraph);
  return true;
}

function appendZdicChipList(container, items, labelKey) {
  const values = Array.isArray(items) ? items.map(cleanText).filter(Boolean) : [];
  if (!values.length) return false;
  const group = document.createElement("div");
  group.className = "zdic-chip-group";
  if (labelKey) {
    const label = document.createElement("span");
    label.className = "zdic-chip-label";
    label.textContent = t(labelKey);
    group.append(label);
  }
  values.forEach((value) => {
    const chip = document.createElement("span");
    chip.className = "zdic-chip";
    chip.textContent = value;
    group.append(chip);
  });
  container.append(group);
  return true;
}

function appendZdicDefinitionList(container, definitions) {
  const items = Array.isArray(definitions) ? definitions.map(cleanText).filter(Boolean) : [];
  if (!items.length) return false;
  const list = document.createElement("ol");
  list.className = "zdic-definition-list";
  items.forEach((item) => {
    const row = document.createElement("li");
    row.textContent = item;
    list.append(row);
  });
  container.append(list);
  return true;
}

function appendZdicTranslations(container, translations) {
  const rows = Object.entries(translations || {}).filter(([, value]) => cleanText(value));
  if (!rows.length) return false;
  const table = document.createElement("div");
  table.className = "zdic-translation-grid";
  rows.forEach(([label, value]) => {
    const term = document.createElement("span");
    term.textContent = label;
    const description = document.createElement("strong");
    description.textContent = cleanText(value);
    table.append(term, description);
  });
  container.append(table);
  return true;
}

function makeZdicSection(titleKey, build, open = false) {
  const body = document.createElement("div");
  body.className = "zdic-section-body";
  build(body);
  if (!body.childElementCount) return null;

  const details = document.createElement("details");
  details.className = "zdic-section";
  details.open = open;
  const summary = document.createElement("summary");
  summary.textContent = t(titleKey);
  details.append(summary, body);
  return details;
}

function renderZdicFacts(container, zdic) {
  const facts = [
    [t("pinyinFallback"), Array.isArray(zdic.pinyin) ? zdic.pinyin.join(" / ") : ""],
    [t("zhuyin"), Array.isArray(zdic.zhuyin) ? zdic.zhuyin.join(" / ") : ""],
    [t("radical"), zdic.radical],
    [t("outerStrokes"), zdic.outerStrokes ?? ""],
    [t("strokes"), zdic.totalStrokes ?? ""],
    [t("shape"), zdic.structure],
    [t("strokeCode"), zdic.strokeOrder],
    [t("unicode"), zdic.unicode],
    [t("wubi"), zdic.codes?.wubi],
    [t("cangjie"), zdic.codes?.cangjie],
    [t("zhengma"), zdic.codes?.zhengma],
    [t("fourCorner"), zdic.codes?.fourCorner],
  ].filter(([, value]) => cleanText(value));

  if (!facts.length) return false;
  const grid = document.createElement("div");
  grid.className = "zdic-fact-grid";
  facts.forEach(([label, value]) => {
    const item = document.createElement("div");
    const labelEl = document.createElement("span");
    labelEl.textContent = label;
    const valueEl = document.createElement("strong");
    valueEl.textContent = value;
    item.append(labelEl, valueEl);
    grid.append(item);
  });
  container.append(grid);
  return true;
}

function renderZdicPanel(container, entry) {
  if (!container) return;
  container.innerHTML = "";
  const zdic = entry?.zdic;
  if (!zdic) {
    container.classList.add("hidden");
    return;
  }

  const header = document.createElement("div");
  header.className = "zdic-header";
  const title = document.createElement("h3");
  title.textContent = t("zdicDictionary");
  const badge = document.createElement("span");
  badge.textContent = t("zdicOfflineSource", { source: zdic.sourceName || "汉典" });
  header.append(title, badge);
  container.append(header);
  renderZdicFacts(container, zdic);

  [
    makeZdicSection(
      "zdicBasic",
      (body) => {
        appendZdicDefinitionList(body, zdic.basic?.definitions);
        appendZdicTranslations(body, zdic.basic?.translations);
      },
      true
    ),
    makeZdicSection("zdicDetailed", (body) => {
      appendZdicText(body, zdic.detailed?.text);
      appendZdicChipList(body, zdic.detailed?.commonTerms, "commonTerms");
    }),
    makeZdicSection("zdicMandarin", (body) => appendZdicText(body, zdic.mandarin?.text)),
    makeZdicSection("zdicKangxi", (body) => appendZdicText(body, zdic.kangxi?.text)),
    makeZdicSection("zdicPhonetics", (body) => {
      appendZdicChipList(body, zdic.phonetics?.categories);
      appendZdicText(body, zdic.phonetics?.text);
    }),
    makeZdicSection("zdicGlyph", (body) => {
      appendZdicChipList(body, zdic.glyph?.variants || zdic.variants, "variants");
      appendZdicText(body, zdic.glyph?.text);
    }),
  ]
    .filter(Boolean)
    .forEach((section) => container.append(section));

  container.classList.toggle("hidden", container.childElementCount <= 1);
}

function renderWords(entry) {
  renderWordCards(els.wordList, entry);
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
  activeLesson = null;
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
  stopCameraWriting({ quiet: true });
  activeLesson = {
    kind: "daily",
    dateKey: daily.dateKey,
    key: daily.key,
    entries: daily.entries,
  };
  state.lessonIndex = clamp(Number(daily.index), 0, lessonCount() - 1);
  state.charIndex = 0;
  quiz = null;
  lastResult = null;
  if (els.lessonSelect) els.lessonSelect.value = String(state.lessonIndex);
  saveState();
  setScreen("lesson");
  renderLesson();
  sparkleAt(els.bigChar, { count: 8, spread: 90, glyphs: ["中", "文", "✦"] });
  showToast(t("dailyGeneratedToast"));
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

function handleHomeTitleKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  goHome();
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

function speakCurrentMeaning() {
  const entry = currentEntry();
  const text = cleanMultiline(entry.meaningZh);
  const played = speakText(text, t("playingMeaning", { char: entry.char }), {
    button: els.meaningSpeakBtn,
    mode: "sentence",
  });
  if (played) sparkleAt(els.meaningSpeakBtn, { count: 6, spread: 64, glyphs: ["意", "声", "✦"] });
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
  const entryMeaning = localizedEntryMeaning(entry);
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
      prompt: t("pickCharacter", { meaning: entryMeaning }),
      display: entry.pinyin,
      answer: entry.char,
      options: makeOptions(entry.char, entries.map((item) => item.char)),
    };
  }

  if (type === "strokes") {
    const answer = String(entry.strokes);
    return {
      type,
      entry,
      prompt: t("howManyStrokes", { char: entry.char }),
      display: entry.char,
      answer,
      options: makeOptions(answer, entries.map((item) => (Number(item.strokes) > 0 ? String(item.strokes) : ""))),
    };
  }

  return {
    type: "meaning",
    entry,
    prompt: t("whatMeaning", { char: entry.char }),
    display: entry.char,
    answer: entryMeaning,
    options: makeOptions(entryMeaning, entries.map(localizedEntryMeaning)),
  };
}

function makeOptions(answer, pool) {
  const distractors = shuffle([...new Set(pool.filter((item) => item && item !== answer))]).slice(0, 3);
  return shuffle([answer, ...distractors]);
}

function questionTypesForEntry(entry, types = ["pinyin", "meaning", "character"]) {
  return types.filter((type) => {
    if (type === "pinyin") return Boolean(entry.pinyin);
    if (type === "meaning" || type === "character") return Boolean(entry.meaningEn || entry.meaningZh);
    if (type === "strokes") return Number(entry.strokes) > 0;
    return false;
  });
}

function examQuestionType(entry, index) {
  const validTypes = questionTypesForEntry(entry, EXAM_TYPES);
  for (let offset = 0; offset < EXAM_TYPES.length; offset += 1) {
    const type = EXAM_TYPES[(index + offset) % EXAM_TYPES.length];
    if (validTypes.includes(type)) return type;
  }
  return validTypes[0] || "pinyin";
}

function examCandidateEntries() {
  const known = savedKnownCharacters();
  return allEntries().filter((entry) => known.has(entry.char) && questionTypesForEntry(entry, EXAM_TYPES).length);
}

function examEntryWeight(entry) {
  const wrongCount = Number(state.wrongCharacters?.[entry.char]?.count) || 0;
  return 1 + Math.min(wrongCount * 3, 18);
}

function pickWeightedExamEntries(candidates, limit = EXAM_SIZE) {
  const remaining = [...candidates];
  const picked = [];
  while (remaining.length && picked.length < limit) {
    const totalWeight = remaining.reduce((total, entry) => total + examEntryWeight(entry), 0);
    let cursor = Math.random() * totalWeight;
    const selectedIndex = remaining.findIndex((entry) => {
      cursor -= examEntryWeight(entry);
      return cursor <= 0;
    });
    const index = selectedIndex >= 0 ? selectedIndex : remaining.length - 1;
    picked.push(remaining.splice(index, 1)[0]);
  }
  return picked;
}

function passThreshold(total) {
  return Math.min(4, Math.max(1, total));
}

function startQuiz() {
  stopCameraWriting({ quiet: true });
  const types = ["meaning", "pinyin", "character", "meaning", "pinyin"];
  const entries = lessonEntries();
  quiz = {
    mode: "lesson",
    questions: entries.map((entry, index) => makeQuestion(entry, types[index % types.length])),
    index: 0,
    correct: 0,
    answered: false,
    wrongAnswers: [],
  };
  setScreen("test");
  renderQuiz();
}

function startExam() {
  stopCameraWriting({ quiet: true });
  const candidates = examCandidateEntries();
  if (!candidates.length) {
    showToast(t("examNeedsKnown"));
    renderKnownCharacters();
    return;
  }

  const entries = pickWeightedExamEntries(candidates);
  activeLesson = null;
  lastResult = null;
  quiz = {
    mode: "exam",
    questions: entries.map((entry, index) => makeQuestion(entry, examQuestionType(entry, index))),
    index: 0,
    correct: 0,
    answered: false,
    wrongAnswers: [],
  };
  setScreen("test");
  renderQuiz();
  if (entries.length < EXAM_SIZE) {
    showToast(t("examNotEnoughKnown", { count: entries.length }));
  }
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
  if (!correct) {
    quiz.wrongAnswers.push({
      char: question.entry.char,
      type: question.type,
      answer: question.answer,
      selected: option,
    });
  }

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

function finishExam() {
  const takenAt = new Date().toISOString();
  const score = quiz.correct;
  const total = quiz.questions.length;
  const percent = examPercent(score, total);
  const wrongChars = [...new Set(quiz.wrongAnswers.map((answer) => answer.char))];
  const testedChars = [...new Set(quiz.questions.map((question) => question.entry.char))];
  const wrongCharacters = { ...(state.wrongCharacters || {}) };

  testedChars.forEach((char) => {
    if (wrongCharacters[char]) {
      wrongCharacters[char] = {
        ...wrongCharacters[char],
        count: Math.max(1, Number(wrongCharacters[char].count) || 1),
        lastWrongAt: wrongCharacters[char].lastWrongAt || "",
        lastTestedAt: takenAt,
      };
    }
  });
  wrongChars.forEach((char) => {
    const current = wrongCharacters[char] || {};
    wrongCharacters[char] = {
      count: Math.max(0, Number(current.count) || 0) + 1,
      lastWrongAt: takenAt,
      lastTestedAt: takenAt,
    };
  });

  state.wrongCharacters = wrongCharacters;
  state.examHistory = [
    ...(Array.isArray(state.examHistory) ? state.examHistory : []),
    { takenAt, score, total, percent, wrongChars },
  ].slice(-50);

  lastResult = {
    mode: "exam",
    score,
    total,
    percent,
    wrongChars,
    takenAt,
  };
  quiz = null;
  saveState({
    eventType: "exam_result",
    payload: {
      score,
      total,
      percent,
      wrongCount: wrongChars.length,
      takenAt,
    },
  });
  renderCustomSummary();
  renderResult();
}

function finishQuiz() {
  if (quiz?.mode === "exam") {
    finishExam();
    return;
  }

  const needed = passThreshold(quiz.questions.length);
  const passed = quiz.correct >= needed;
  const key = lessonKey();
  const today = melbourneDateKey();
  const lessonLabel = activeLesson?.kind === "daily" ? t("dailyPersonalLesson") : state.lessonIndex + 1;
  const firstPass = passed && !state.completedLessons.includes(key);
  const todaySticker = state.stickers.some((sticker) => sticker.date === today);
  const xpGain = quiz.correct * 10 + (passed ? 25 : 5) + (firstPass ? 20 : 0);

  state.xp += xpGain;
  state.attempts[key] = (state.attempts[key] || 0) + 1;
  if (passed && !state.completedLessons.includes(key)) {
    state.completedLessons.push(key);
  }
  if (passed) {
    const learned = new Set(Array.isArray(state.learnedCharacters) ? state.learnedCharacters : []);
    lessonEntries().forEach((entry) => learned.add(entry.char));
    state.learnedCharacters = orderedKnownCharacters(learned);
  }
  if (passed && !todaySticker) {
    state.stickers.push({
      date: today,
      icon: STICKERS[state.stickers.length % STICKERS.length],
      lesson: lessonLabel,
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
  saveState({
    eventType: "lesson_result",
    payload: {
      lesson: lessonLabel,
      score: lastResult.score,
      total: lastResult.total,
      passed,
      xpGain,
      stickerEarned: lastResult.stickerEarned,
    },
  });
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
  if (result.mode === "exam") {
    els.resultTitle.textContent = t("examComplete");
    els.resultScore.textContent = `${result.score} / ${result.total}`;
    els.resultMessage.textContent = t("examResultSummary", {
      score: result.score,
      total: result.total,
      percent: result.percent,
      time: formatExamTime(result.takenAt),
    });
    els.retryBtn.textContent = t("startExam");
    els.nextLessonBtn.classList.add("hidden");
    renderStickers();
    setScreen("result");
    if (!quiet) {
      showToast(t("resultSaved"));
      replayClass(els.resultView, "is-celebrating");
      window.setTimeout(() => {
        sparkleAt(els.resultScore, { count: 18, spread: 170, glyphs: ["考", "分", "★", "好"] });
      }, 180);
    }
    return;
  }

  els.resultTitle.textContent = result.passed ? t("lessonComplete") : t("keepPractising");
  els.resultScore.textContent = `${result.score} / ${result.total}`;
  els.resultMessage.textContent = result.passed
    ? t(result.stickerEarned ? "resultEarnedSticker" : "resultEarned", { xp: result.xpGain })
    : t("resultPractice", { needed: passThreshold(result.total), total: result.total });
  els.retryBtn.textContent = t("tryTestAgain");
  els.nextLessonBtn.classList.remove("hidden");
  els.nextLessonBtn.disabled = activeLesson?.kind === "daily" || state.lessonIndex >= lessonCount() - 1;
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

function retryCurrentResult() {
  if (lastResult?.mode === "exam") {
    startExam();
    return;
  }
  startQuiz();
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
  els.loginForm?.addEventListener("submit", submitLogin);
  els.openRegisterBtn?.addEventListener("click", showRegisterForm);
  els.cancelRegisterBtn?.addEventListener("click", () => hideRegisterForm({ reset: true }));
  els.registerForm?.addEventListener("submit", submitRegister);
  els.guestLoginBtn?.addEventListener("click", loginAsGuest);
  els.logoutBtn?.addEventListener("click", logoutCurrentUser);
  els.homeLogoutBtn?.addEventListener("click", logoutCurrentUser);
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
  els.screenHomeTitles.forEach((title) => {
    title.addEventListener("click", goHome);
    title.addEventListener("keydown", handleHomeTitleKeydown);
  });
  els.lessonSelect.addEventListener("change", (event) => {
    state.lessonIndex = Number(event.target.value);
    saveState();
    sparkleAt(els.startLessonBtn, { count: 5, spread: 58, glyphs: ["课", "✦", "学"] });
  });
  els.uiLanguageSelect.addEventListener("change", changeUiLanguage);
  els.uiSkinSelect?.addEventListener("change", changeUiSkin);
  els.lessonPickerBtn.addEventListener("click", openLessonPicker);
  els.customCharacterBtn.addEventListener("click", openCustomCharacter);
  els.customCharacterForm.addEventListener("submit", saveCustomCharacter);
  els.customResetBtn.addEventListener("click", clearCustomCharacterForm);
  els.searchModeBtn.addEventListener("click", openSearchView);
  els.searchForm.addEventListener("submit", submitSearch);
  els.searchInput.addEventListener("input", updateSearchInput);
  els.searchSpeakBtn.addEventListener("click", speakSelectedSearchEntry);
  els.searchOpenLessonBtn.addEventListener("click", openSelectedSearchEntryInLesson);
  els.idiomModeBtn.addEventListener("click", openIdiomSeries);
  els.idiomSearchInput.addEventListener("input", renderIdiomSeries);
  els.knownCharactersBtn.addEventListener("click", openKnownCharacters);
  els.examModeBtn.addEventListener("click", startExam);
  els.wrongWordsBtn.addEventListener("click", openWrongWords);
  els.startExamFromWrongWordsBtn.addEventListener("click", startExam);
  els.knownCharactersForm.addEventListener("submit", saveKnownCharacters);
  els.knownCharactersNewBatchBtn.addEventListener("click", showNewKnownCharacterBatch);
  els.knownCharactersSelectAllBtn.addEventListener("click", () => setKnownCharacterChecks(true));
  els.knownCharactersClearBtn.addEventListener("click", () => setKnownCharacterChecks(false));
  els.startLessonBtn.addEventListener("click", startLesson);
  els.dailyLessonBtn.addEventListener("click", startDailyLesson);
  els.dailyLessonCtaBtn?.addEventListener("click", startDailyLesson);
  els.aiTeacherBtn.addEventListener("click", openAiTeacher);
  els.aiTeacherGenerateBtn.addEventListener("click", generateAiTeacherArticle);
  els.aiTeacherReadBtn.addEventListener("click", () => readAiTeacherArticle(els.aiTeacherReadBtn));
  els.aiTeacherReadArea.addEventListener("click", () => readAiTeacherArticle(els.aiTeacherReadArea));
  els.aiTeacherReadArea.addEventListener("keydown", handleAiTeacherReadAreaKeydown);
  els.dialogueModeBtn.addEventListener("click", openDialoguePractice);
  els.roleplayModeBtn.addEventListener("click", openRoleplayPractice);
  els.dialogueTopicSelect.addEventListener("change", changeDialogueCategory);
  els.dialoguePhraseBtn.addEventListener("click", speakDialoguePhrase);
  els.dialogueAllBtn.addEventListener("click", speakDialogueAll);
  els.roleplaySelect.addEventListener("change", changeRoleplayScenario);
  els.roleplayReadArea.addEventListener("click", () => speakRoleplayScene(els.roleplayReadArea));
  els.roleplaySpeakBtn.addEventListener("click", () => speakRoleplayScene(els.roleplaySpeakBtn));
  els.howToPlayBtn.addEventListener("click", openHowToPlay);
  els.howToPlayDialog.addEventListener("click", closeHowToPlayOnBackdrop);
  els.prevCharBtn.addEventListener("click", () => moveChar(-1));
  els.nextCharBtn.addEventListener("click", () => moveChar(1));
  els.speakBtn.addEventListener("click", speakCurrent);
  els.meaningSpeakBtn.addEventListener("click", speakCurrentMeaning);
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
  els.retryBtn.addEventListener("click", retryCurrentResult);
  els.nextLessonBtn.addEventListener("click", goNextLesson);
  document.addEventListener("pointerdown", (event) => {
    const source = event.target instanceof Element ? event.target : null;
    const button = source?.closest("button");
    if (button) addPressRipple(button, event);
  });
  document.addEventListener("click", (event) => {
    const source = event.target instanceof Element ? event.target : null;
    const target = source?.closest(
      ".function-action, .audio-button, .dialogue-word-card, .ai-reader-character, .search-result-card, .known-character-option, .small-button, .speak-button, .login-user-card"
    );
    if (!target || target.disabled) return;
    sparkleAt(target, { count: 3, spread: 46, glyphs: ["✦", "星"] });
  });
}

async function initializeApp() {
  bindEvents();
  prepareSpeechVoices();
  applyStaticText();
  const restored = await restoreSession();
  if (!restored) renderLogin();
}

initializeApp();
