// Built-in confusing English word pairs (50 pairs)
// Categories: 拼写易混, 同音易混, 用法易混

const BUILTIN_WORDS = [
  {
    id: "affect_effect",
    wordA: "affect", wordB: "effect",
    meaningA: "影响；感动（动词）", meaningB: "效果；影响（名词）",
    exampleA: "The weather affects my mood.", exampleB: "The effect was immediate.",
    tip: "affect 以 a 开头 = action（动作/动词），effect 以 e 开头 = end result（结果/名词）",
    tags: ["拼写易混"], difficulty: "中等"
  },
  {
    id: "accept_except",
    wordA: "accept", wordB: "except",
    meaningA: "接受；接纳（动词）", meaningB: "除了……之外（介词/连词）",
    exampleA: "She accepted the gift with a smile.", exampleB: "Everyone came except Tom.",
    tip: "accept 有 a 像"拿"（接受），except 有 ex 像"排除"（除了）",
    tags: ["拼写易混"], difficulty: "简单"
  },
  {
    id: "advice_advise",
    wordA: "advice", wordB: "advise",
    meaningA: "建议；忠告（名词）", meaningB: "建议；劝告（动词）",
    exampleA: "He gave me some good advice.", exampleB: "I advise you to leave early.",
    tip: "advice 以 ice 结尾是名词（像 ice 是固体），advise 以 ise 结尾是动词",
    tags: ["拼写易混"], difficulty: "简单"
  },
  {
    id: "altar_alter",
    wordA: "altar", wordB: "alter",
    meaningA: "祭坛；神坛（名词）", meaningB: "改变；修改（动词）",
    exampleA: "The couple stood before the altar.", exampleB: "We need to alter the plan.",
    tip: "altar 有 tar（像庙里的香灰），alter 有 ter（像 turn 转变）",
    tags: ["拼写易混"], difficulty: "中等"
  },
  {
    id: "bare_bear",
    wordA: "bare", wordB: "bear",
    meaningA: "裸露的；光秃的（形容词）", meaningB: "熊；忍受；承担（名词/动词）",
    exampleA: "He walked on the bare floor.", exampleB: "I can't bear the pain. / A brown bear.",
    tip: "bare 只有 4 个字母 = 光秃秃的少，bear 有 ear（耳朵）= 熊有耳朵",
    tags: ["同音易混"], difficulty: "简单"
  },
  {
    id: "brake_break",
    wordA: "brake", wordB: "break",
    meaningA: "刹车；制动器（名词/动词）", meaningB: "打破；折断；休息（动词/名词）",
    exampleA: "He hit the brake to stop the car.", exampleB: "Don't break the glass. / Take a break.",
    tip: "brake 有 ake 像"ache"（刹车时会疼），break 有 reak 像"wreck"（破坏）",
    tags: ["同音易混"], difficulty: "简单"
  },
  {
    id: "breath_breathe",
    wordA: "breath", wordB: "breathe",
    meaningA: "呼吸；气息（名词）", meaningB: "呼吸（动词）",
    exampleA: "Take a deep breath.", exampleB: "It's hard to breathe here.",
    tip: "breath 短（无 e 结尾 = 名词短促），breathe 长（有 e 结尾 = 动词拉长发音）",
    tags: ["拼写易混"], difficulty: "简单"
  },
  {
    id: "capital_capitol",
    wordA: "capital", wordB: "capitol",
    meaningA: "首都；资本；大写字母（名词/形容词）", meaningB: "美国国会大厦（名词）",
    exampleA: "Beijing is the capital of China.", exampleB: "The Capitol is in Washington D.C.",
    tip: "capital 通用（首都/资本），capitol 特指美国国会大厦（o = dome 圆顶）",
    tags: ["拼写易混"], difficulty: "中等"
  },
  {
    id: "cite_site_sight",
    wordA: "cite", wordB: "site",
    meaningA: "引用；引证（动词）", meaningB: "地点；场所；网站（名词）",
    exampleA: "He cited three sources in his paper.", exampleB: "This is the site of the new school.",
    tip: "cite = cite a source（引证），site = location（地点），sight = see（看见）",
    tags: ["同音易混"], difficulty: "中等"
  },
  {
    id: "complement_compliment",
    wordA: "complement", wordB: "compliment",
    meaningA: "补充；补足（动词/名词）", meaningB: "赞美；称赞（动词/名词）",
    exampleA: "The wine complements the meal.", exampleB: "She received many compliments on her dress.",
    tip: "complement 有 e = complete（补充完整），compliment 有 i = I like（我喜欢=赞美）",
    tags: ["拼写易混"], difficulty: "中等"
  },
  {
    id: "conscience_conscious",
    wordA: "conscience", wordB: "conscious",
    meaningA: "良心；良知（名词）", meaningB: "有意识的；清醒的（形容词）",
    exampleA: "His conscience kept him awake.", exampleB: "She was conscious of the danger.",
    tip: "conscience 以 science 结尾 → 内心的"科学"审判（良心），conscious 以 ous 结尾 → 形容词（有意识的）",
    tags: ["拼写易混"], difficulty: "困难"
  },
  {
    id: "council_counsel",
    wordA: "council", wordB: "counsel",
    meaningA: "委员会；议会（名词）", meaningB: "忠告；法律顾问（名词/动词）",
    exampleA: "The city council met yesterday.", exampleB: "She sought legal counsel.",
    tip: "council 有 cil（委员会开会），counsel 有 sel（sell 卖建议 → 忠告）",
    tags: ["拼写易混", "同音易混"], difficulty: "困难"
  },
  {
    id: "dairy_diary",
    wordA: "dairy", wordB: "diary",
    meaningA: "乳制品；牛奶场（名词）", meaningB: "日记（名词）",
    exampleA: "I buy dairy products every week.", exampleB: "She writes in her diary every night.",
    tip: "dairy 有 air（空气=牛奶场有气味），diary 有 ia（I 我→日记写我自己）",
    tags: ["拼写易混"], difficulty: "简单"
  },
  {
    id: "desert_dessert",
    wordA: "desert", wordB: "dessert",
    meaningA: "沙漠；抛弃（名词/动词）", meaningB: "甜点（名词）",
    exampleA: "The Sahara is a vast desert.", exampleB: "I'd like ice cream for dessert.",
    tip: "dessert 有两个 s = sweet stuff（甜的东西=两个s），desert 一个 s = sand（沙漠一个s）",
    tags: ["拼写易混"], difficulty: "简单"
  },
  {
    id: "device_devise",
    wordA: "device", wordB: "devise",
    meaningA: "设备；装置（名词）", meaningB: "设计；发明（动词）",
    exampleA: "This device can measure temperature.", exampleB: "They devised a new plan.",
    tip: "device 以 ice 结尾是名词，devise 以 ise 结尾是动词（同 advice/advise 规则）",
    tags: ["拼写易混"], difficulty: "中等"
  },
  {
    id: "discreet_discrete",
    wordA: "discreet", wordB: "discrete",
    meaningA: "谨慎的；小心的（形容词）", meaningB: "分立的；不连续的（形容词）",
    exampleA: "He was discreet about the secret.", exampleB: "The project has three discrete phases.",
    tip: "discreet 两个 ee 像一双眼睛在观察（谨慎），discrete 有 ete 像 separate（分离）",
    tags: ["拼写易混"], difficulty: "困难"
  },
  {
    id: "elicit_illicit",
    wordA: "elicit", wordB: "illicit",
    meaningA: "引出；探出（动词）", meaningB: "非法的；不正当的（形容词）",
    exampleA: "The question elicited a strong response.", exampleB: "Illicit drugs are banned.",
    tip: "elicit 有 e = extract（引出），illicit 有 ill = illegal（非法）",
    tags: ["拼写易混"], difficulty: "困难"
  },
  {
    id: "emigrate_immigrate",
    wordA: "emigrate", wordB: "immigrate",
    meaningA: "移出；移民国外（动词）", meaningB: "移入；移民进来（动词）",
    exampleA: "He emigrated from China to the US.", exampleB: "She immigrated to Canada.",
    tip: "emigrate 有 e = exit（离开），immigrate 有 im = in（进来）",
    tags: ["用法易混"], difficulty: "中等"
  },
  {
    id: "ensure_insure",
    wordA: "ensure", wordB: "insure",
    meaningA: "确保；保证（动词）", meaningB: "给……上保险（动词）",
    exampleA: "Please ensure the door is locked.", exampleB: "I insured my car against theft.",
    tip: "ensure = make sure（确保），insure = buy insurance（买保险）",
    tags: ["拼写易混", "用法易混"], difficulty: "中等"
  },
  {
    id: "farther_further",
    wordA: "farther", wordB: "further",
    meaningA: "更远（物理距离）（形容词/副词）", meaningB: "更进一步（抽象程度）（形容词/副词）",
    exampleA: "The store is farther than I thought.", exampleB: "We need further discussion.",
    tip: "farther 有 far（物理上的远），further 有 fur（fur 毛皮→抽象概念像毛线团一样深入）",
    tags: ["用法易混"], difficulty: "中等"
  },
  {
    id: "flaunt_flout",
    wordA: "flaunt", wordB: "flout",
    meaningA: "炫耀；卖弄（动词）", meaningB: "藐视；公然违抗（动词）",
    exampleA: "He flaunted his new car.", exampleB: "They flouted the school rules.",
    tip: "flaunt 有 aunt（阿姨爱炫耀），flout 有 out（把规矩赶出去=藐视）",
    tags: ["拼写易混", "用法易混"], difficulty: "困难"
  },
  {
    id: "hear_here",
    wordA: "hear", wordB: "here",
    meaningA: "听见；听说（动词）", meaningB: "在这里（副词）",
    exampleA: "Can you hear me?", exampleB: "Come here, please.",
    tip: "hear 有 ear（耳朵=听见），here 有 here（位置=这里，和 there/where 同族）",
    tags: ["同音易混"], difficulty: "简单"
  },
  {
    id: "historic_historical",
    wordA: "historic", wordB: "historical",
    meaningA: "有历史意义的；历史性的（形容词）", meaningB: "与历史有关的（形容词）",
    exampleA: "This is a historic moment.", exampleB: "I love reading historical novels.",
    tip: "historic = important in history（历史性重要），historical = related to history（与历史相关）",
    tags: ["用法易混"], difficulty: "中等"
  },
  {
    id: "imply_infer",
    wordA: "imply", wordB: "infer",
    meaningA: "暗示；暗指（说话者）（动词）", meaningB: "推断；推论（听者）（动词）",
    exampleA: "He implied that I was wrong.", exampleB: "I inferred from his tone that he was angry.",
    tip: "imply = 说话的人暗示，infer = 听话的人推断（方向相反）",
    tags: ["用法易混"], difficulty: "中等"
  },
  {
    id: "its_its",
    wordA: "its", wordB: "it's",
    meaningA: "它的（物主代词）", meaningB: "它是 / 它有（it is/it has 缩写）",
    exampleA: "The cat licked its paw.", exampleB: "It's going to rain today.",
    tip: "it's 有撇号 = it is 的缩写，its 无撇号 = 它的（和 his/her 一样是物主代词）",
    tags: ["拼写易混"], difficulty: "简单"
  },
  {
    id: "later_latter",
    wordA: "later", wordB: "latter",
    meaningA: "后来；以后（副词/形容词）", meaningB: "后者（名词/形容词）",
    exampleA: "I'll call you later.", exampleB: "Between tea and coffee, I prefer the latter.",
    tip: "later = after some time（后来），latter 有 tter 像 latter vs former（后者 vs 前者）",
    tags: ["拼写易混"], difficulty: "简单"
  },
  {
    id: "lay_lie",
    wordA: "lay", wordB: "lie",
    meaningA: "放下；放置（及物动词）（lay-laid-laid）", meaningB: "躺；说谎（不及物动词）（lie-lay-lain / lie-lied-lied）",
    exampleA: "Lay the book on the table.", exampleB: "I need to lie down. / Don't lie to me.",
    tip: "lay 需要宾语（放什么），lie 不需要宾语（自己躺/说谎）。注意 lie 的过去式是 lay！",
    tags: ["用法易混"], difficulty: "困难"
  },
  {
    id: "lead_led",
    wordA: "lead", wordB: "led",
    meaningA: "带领；领导（动词原形）/ 铅（名词）", meaningB: "带领（lead 的过去式）",
    exampleA: "She will lead the team.", exampleB: "She led the team last year.",
    tip: "lead 发音 /liːd/（领导）或 /led/（铅），led 是 lead 的过去式，发音 /led/",
    tags: ["拼写易混"], difficulty: "中等"
  },
  {
    id: "lose_loose",
    wordA: "lose", wordB: "loose",
    meaningA: "丢失；输掉（动词）", meaningB: "松的；宽松的（形容词）",
    exampleA: "Don't lose your keys.", exampleB: "This shirt is too loose.",
    tip: "lose 只有一个 o = 丢了就没了（少），loose 有两个 o = 宽松多加一个 o",
    tags: ["拼写易混"], difficulty: "简单"
  },
  {
    id: "moral_morale",
    wordA: "moral", wordB: "morale",
    meaningA: "道德的；道德教训（形容词/名词）", meaningB: "士气；精神面貌（名词）",
    exampleA: "It's a moral obligation.", exampleB: "The team's morale is high.",
    tip: "moral 无 e = 道德，morale 有 e = emotion/energy（士气跟情绪有关）",
    tags: ["拼写易混"], difficulty: "中等"
  },
  {
    id: "passed_past",
    wordA: "passed", wordB: "past",
    meaningA: "通过；过去（pass 的过去式/过去分词）（动词）", meaningB: "过去的；经过（形容词/介词/名词）",
    exampleA: "She passed the exam.", exampleB: "In the past, people traveled by horse.",
    tip: "passed 是动词 pass 的过去式（动作），past 不是动词（表示时间/位置的过去）",
    tags: ["同音易混"], difficulty: "中等"
  },
  {
    id: "personal_personnel",
    wordA: "personal", wordB: "personnel",
    meaningA: "个人的；私人的（形容词）", meaningB: "人员；人事部门（名词）",
    exampleA: "This is my personal opinion.", exampleB: "The company personnel are well-trained.",
    tip: "personal 有 a = individual（个人），personnel 有 nnel 像 channel（人事部是沟通渠道）",
    tags: ["拼写易混"], difficulty: "中等"
  },
  {
    id: "principal_principle",
    wordA: "principal", wordB: "principle",
    meaningA: "校长；主要的（名词/形容词）", meaningB: "原则；原理（名词）",
    exampleA: "The principal made an announcement.", exampleB: "Honesty is a core principle.",
    tip: "principal 有 pal = the main person（校长是你的伙伴），principle 有 ple = rule（原则/规则）",
    tags: ["拼写易混"], difficulty: "中等"
  },
  {
    id: "quiet_quite",
    wordA: "quiet", wordB: "quite",
    meaningA: "安静的（形容词）", meaningB: "相当；很（副词）",
    exampleA: "Please be quiet in the library.", exampleB: "The movie was quite good.",
    tip: "quiet 以 et 结尾 = 安静的结尾，quite 以 te 结尾 = 相当地",
    tags: ["拼写易混"], difficulty: "简单"
  },
  {
    id: "raise_rise",
    wordA: "raise", wordB: "rise",
    meaningA: "举起；提高；抚养（及物动词）", meaningB: "上升；升起（不及物动词）",
    exampleA: "He raised his hand.", exampleB: "The sun rises in the east.",
    tip: "raise 需要宾语（举起某物），rise 不需要宾语（自己上升）",
    tags: ["用法易混"], difficulty: "中等"
  },
  {
    id: "respectively_respectfully",
    wordA: "respectively", wordB: "respectfully",
    meaningA: "分别地；各自地（副词）", meaningB: "尊敬地；恭敬地（副词）",
    exampleA: "Tom and Jerry are 10 and 12 respectively.", exampleB: "He bowed respectfully.",
    tip: "respectively = in that order（分别对应），respectfully = with respect（尊敬地）",
    tags: ["拼写易混", "用法易混"], difficulty: "困难"
  },
  {
    id: "stationary_stationery",
    wordA: "stationary", wordB: "stationery",
    meaningA: "静止的；固定的（形容词）", meaningB: "文具（名词）",
    exampleA: "The car remained stationary.", exampleB: "I bought some stationery at the shop.",
    tip: "stationary 有 ary = stay（静止），stationery 有 ery = paper（文具=纸）",
    tags: ["拼写易混"], difficulty: "中等"
  },
  {
    id: "than_then",
    wordA: "than", wordB: "then",
    meaningA: "比（用于比较）（连词/介词）", meaningB: "然后；那时（副词）",
    exampleA: "She is taller than me.", exampleB: "We had lunch, then went shopping.",
    tip: "than 有 a = compare（比较），then 有 e = next/time（接下来/时间）",
    tags: ["拼写易混"], difficulty: "简单"
  },
  {
    id: "their_there_theyre",
    wordA: "their", wordB: "there",
    meaningA: "他们的（物主形容词）", meaningB: "在那里（副词）",
    exampleA: "Their house is big.", exampleB: "Put it over there.",
    tip: "their = 他们的（有 i = I 关联人），there = 那里（有 here 在里面），they're = they are",
    tags: ["同音易混"], difficulty: "简单"
  },
  {
    id: "to_too_two",
    wordA: "to", wordB: "too",
    meaningA: "到；向（介词/不定式）", meaningB: "太；也（副词）",
    exampleA: "I went to the store.", exampleB: "It's too hot. / Me too!",
    tip: "to 最短（方向），too 有两个 o = 太多/也（多一个 o 表示"太"），two 有 w = 数字 2",
    tags: ["同音易混"], difficulty: "简单"
  },
  {
    id: "weather_whether",
    wordA: "weather", wordB: "whether",
    meaningA: "天气（名词）", meaningB: "是否（连词）",
    exampleA: "The weather is nice today.", exampleB: "I don't know whether to go.",
    tip: "weather 有 eat（天气影响吃饭），whether 有 her（她不确定→是否）",
    tags: ["同音易混"], difficulty: "简单"
  },
  {
    id: "who_whom",
    wordA: "who", wordB: "whom",
    meaningA: "谁（主格）", meaningB: "谁（宾格）",
    exampleA: "Who called you?", exampleB: "To whom did you speak?",
    tip: "who = 主语（谁做），whom = 宾语（对谁做）。用 him 替换测试：如果回答是 he → who，如果是 him → whom",
    tags: ["用法易混"], difficulty: "困难"
  },
  {
    id: "fewer_less",
    wordA: "fewer", wordB: "less",
    meaningA: "更少（可数名词）", meaningB: "更少（不可数名词）",
    exampleA: "Fewer people came today.", exampleB: "I have less money than before.",
    tip: "fewer = 可数（人能数），less = 不可数（钱数不清）。超市"10 items or fewer"才对",
    tags: ["用法易混"], difficulty: "中等"
  },
  {
    id: "allusion_illusion",
    wordA: "allusion", wordB: "illusion",
    meaningA: "典故；暗指（名词）", meaningB: "幻觉；错觉（名词）",
    exampleA: "The poem contains an allusion to Greek myth.", exampleB: "The mirror creates an illusion of space.",
    tip: "allusion 有 a = reference（暗指/典故），illusion 有 i = imaginary（幻觉/想象）",
    tags: ["拼写易混"], difficulty: "困难"
  },
  {
    id: "amoral_immoral",
    wordA: "amoral", wordB: "immoral",
    meaningA: "与道德无关的；非道德的（形容词）", meaningB: "不道德的；邪恶的（形容词）",
    exampleA: "Science is amoral, neither good nor bad.", exampleB: "Stealing is immoral.",
    tip: "amoral 有 a = absence（没有道德观念），immoral 有 im = not moral（不道德）",
    tags: ["拼写易混", "用法易混"], difficulty: "困难"
  },
  {
    id: "canvas_canvass",
    wordA: "canvas", wordB: "canvass",
    meaningA: "画布；帆布（名词）", meaningB: "拉选票；调查意见（动词）",
    exampleA: "The artist painted on canvas.", exampleB: "They canvassed the neighborhood for votes.",
    tip: "canvas 一个 s = 画布（一张布），canvass 两个 s = 拉票要走街串巷（两个s像两条腿）",
    tags: ["拼写易混"], difficulty: "中等"
  },
  {
    id: "censor_censure",
    wordA: "censor", wordB: "censure",
    meaningA: "审查；删改（动词/名词）", meaningB: "谴责；严厉批评（动词/名词）",
    exampleA: "The government censored the news.", exampleB: "The judge censured the lawyer's behavior.",
    tip: "censor 有 o = cut out（审查删除），censure 有 ure = blame（谴责）",
    tags: ["拼写易混"], difficulty: "困难"
  },
  {
    id: "climactic_climatic",
    wordA: "climactic", wordB: "climatic",
    meaningA: "高潮的；顶点的（形容词）", meaningB: "气候的（形容词）",
    exampleA: "This is the climactic scene of the movie.", exampleB: "Climatic changes affect agriculture.",
    tip: "climactic 有 act = climax（高潮=动作场景），climatic 有 at = climate（气候）",
    tags: ["拼写易混"], difficulty: "困难"
  },
  {
    id: "continual_continuous",
    wordA: "continual", wordB: "continuous",
    meaningA: "反复的；频繁的（有间隔）（形容词）", meaningB: "连续不断的（无间隔）（形容词）",
    exampleA: "I'm tired of her continual complaints.", exampleB: "The continuous rain lasted three days.",
    tip: "continual = 反复发生（有停顿），continuous = 持续不断（无停顿）",
    tags: ["用法易混"], difficulty: "困难"
  },
  {
    id: "credible_credulous",
    wordA: "credible", wordB: "credulous",
    meaningA: "可信的；可靠的（形容词）", meaningB: "轻信的；易受骗的（形容词）",
    exampleA: "She is a credible witness.", exampleB: "Only a credulous person would believe that lie.",
    tip: "credible = believable（可信的），credulous = gullible（轻信的，形容人容易相信别人）",
    tags: ["拼写易混", "用法易混"], difficulty: "困难"
  }
];
