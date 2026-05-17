// Dashboard page logic
// Includes daily rotating 考研 (postgraduate entrance exam) vocabulary

// ==========================================
// 红宝书考研高频词组库 (524 phrases for daily rotation)
// ==========================================
const KAOYAN_VOCAB = [
  { word: "abide by", meaning: "遵守，信守", example: "We must abide by the rules." },
  { word: "account for", meaning: "解释；占……比例", example: "How do you account for the decline in sales?" },
  { word: "accuse sb. of", meaning: "指控某人……", example: "He was accused of stealing." },
  { word: "adapt to", meaning: "适应", example: "We need to adapt to the new environment." },
  { word: "add up to", meaning: "总计达；意味着", example: "All these efforts add up to significant progress." },
  { word: "a great deal of", meaning: "大量的", example: "A great deal of work remains to be done." },
  { word: "a host of", meaning: "许多，大量", example: "The proposal faces a host of challenges." },
  { word: "a matter of", meaning: "……的问题；大约", example: "It's just a matter of time." },
  { word: "a series of", meaning: "一系列", example: "A series of lectures was scheduled." },
  { word: "a variety of", meaning: "各种各样的", example: "The course covers a variety of topics." },
  { word: "above all", meaning: "最重要的是，首先", example: "Above all, we must remain honest." },
  { word: "according to", meaning: "根据，按照", example: "According to the report, sales increased." },
  { word: "after all", meaning: "毕竟；终究", example: "After all, he is only a child." },
  { word: "agree on", meaning: "就……达成一致", example: "They agreed on the plan." },
  { word: "aim at", meaning: "旨在；瞄准", example: "The policy aims at reducing unemployment." },
  { word: "all at once", meaning: "突然；同时", example: "All at once, the lights went out." },
  { word: "all but", meaning: "几乎，差不多", example: "The game was all but over by halftime." },
  { word: "all in all", meaning: "总的来说", example: "All in all, it was a successful event." },
  { word: "allow for", meaning: "考虑到；允许", example: "We must allow for delays in transit." },
  { word: "along with", meaning: "连同……一起", example: "She came along with her brother." },
  { word: "amount to", meaning: "等于；意味着；总计达", example: "His words amount to a refusal." },
  { word: "answer for", meaning: "对……负责", example: "You will answer for your actions." },
  { word: "apart from", meaning: "除……之外", example: "Apart from the cost, it is a good plan." },
  { word: "appeal to", meaning: "吸引；呼吁；上诉", example: "This design appeals to young consumers." },
  { word: "apply to", meaning: "适用于；应用于", example: "The rule applies to all employees." },
  { word: "approve of", meaning: "赞成，同意", example: "I don't approve of his behavior." },
  { word: "as a result", meaning: "结果，因此", example: "He studied hard. As a result, he passed." },
  { word: "as a whole", meaning: "总体上", example: "The project, as a whole, was a success." },
  { word: "as far as", meaning: "就……而言；远至", example: "As far as I know, he has left." },
  { word: "as follows", meaning: "如下", example: "The reasons are as follows." },
  { word: "as for", meaning: "至于，关于", example: "As for me, I prefer coffee." },
  { word: "as long as", meaning: "只要", example: "As long as you try, you will succeed." },
  { word: "as regards", meaning: "关于，至于", example: "As regards the budget, we need more data." },
  { word: "as soon as", meaning: "一……就……", example: "Call me as soon as you arrive." },
  { word: "as to", meaning: "关于，至于", example: "He was uncertain as to what to do next." },
  { word: "as usual", meaning: "像往常一样", example: "As usual, he arrived late." },
  { word: "as well", meaning: "也，还", example: "She speaks French as well." },
  { word: "as well as", meaning: "以及，和……一样", example: "She sings as well as plays piano." },
  { word: "aside from", meaning: "除……之外", example: "Aside from English, he speaks Japanese." },
  { word: "associate with", meaning: "与……联系；与……交往", example: "Risks are associated with the investment." },
  { word: "at a loss", meaning: "困惑，不知所措", example: "I was at a loss for words." },
  { word: "at all costs", meaning: "不惜一切代价", example: "The truth must be found at all costs." },
  { word: "at all events", meaning: "无论如何", example: "At all events, we must finish on time." },
  { word: "at all times", meaning: "随时；总是", example: "Keep your passport handy at all times." },
  { word: "at any rate", meaning: "无论如何", example: "At any rate, we should give it a try." },
  { word: "at best", meaning: "最多，充其量", example: "The plan is risky at best." },
  { word: "at ease", meaning: "舒适；自在", example: "He felt at ease with his colleagues." },
  { word: "at first", meaning: "起初", example: "At first, I found the work difficult." },
  { word: "at hand", meaning: "在手边；即将到来", example: "Help is close at hand." },
  { word: "at home", meaning: "在家；在国内；舒适", example: "Make yourself at home." },
  { word: "at large", meaning: "一般说来；在逃", example: "The public at large supports the measure." },
  { word: "at last", meaning: "终于", example: "At last, we reached our destination." },
  { word: "at least", meaning: "至少", example: "You should at least try." },
  { word: "at length", meaning: "最终；详细地", example: "He explained the plan at length." },
  { word: "at most", meaning: "最多", example: "It will cost $20 at most." },
  { word: "at once", meaning: "立刻；同时", example: "You must leave at once." },
  { word: "at present", meaning: "目前，现在", example: "At present, we have no vacancies." },
  { word: "at risk", meaning: "处于危险中", example: "Thousands of jobs are at risk." },
  { word: "at stake", meaning: "处于危险中；利害攸关", example: "Too much is at stake to give up now." },
  { word: "at the cost of", meaning: "以……为代价", example: "Success came at the cost of health." },
  { word: "at the expense of", meaning: "以……为代价", example: "Growth at the expense of environment." },
  { word: "at the mercy of", meaning: "任凭……摆布", example: "The ship was at the mercy of the storm." },
  { word: "at the moment", meaning: "此刻", example: "He's busy at the moment." },
  { word: "at times", meaning: "有时", example: "At times, I wonder if it's worth it." },
  { word: "attach importance to", meaning: "重视", example: "We attach great importance to education." },
  { word: "attribute to", meaning: "归因于", example: "Success is attributed to hard work." },
  { word: "back up", meaning: "支持；备份；后退", example: "The evidence backs up his claim." },
  { word: "base on", meaning: "基于，以……为基础", example: "The movie is based on a true story." },
  { word: "be absorbed in", meaning: "全神贯注于", example: "She was absorbed in her book." },
  { word: "be abundant in", meaning: "富有，富于", example: "The region is abundant in natural resources." },
  { word: "be accustomed to", meaning: "习惯于", example: "He is accustomed to hard work." },
  { word: "be applied to", meaning: "应用于", example: "The technology can be applied to medicine." },
  { word: "be bound to", meaning: "必定，一定会", example: "You are bound to succeed if you persist." },
  { word: "be capable of", meaning: "有能力做……", example: "She is capable of handling the task." },
  { word: "be characterized by", meaning: "以……为特征", example: "The era was characterized by rapid change." },
  { word: "be concerned about", meaning: "关心，担忧", example: "People are concerned about climate change." },
  { word: "be concerned with", meaning: "涉及；关心", example: "The book is concerned with social issues." },
  { word: "be consistent with", meaning: "与……一致", example: "His actions are consistent with his words." },
  { word: "be critical of", meaning: "对……持批评态度", example: "The report was critical of the government." },
  { word: "be dedicated to", meaning: "致力于；献身于", example: "She is dedicated to her career." },
  { word: "be dependent on", meaning: "依赖于", example: "The economy is dependent on exports." },
  { word: "be deprived of", meaning: "被剥夺……", example: "Children were deprived of education." },
  { word: "be derived from", meaning: "源自于", example: "Many English words are derived from Latin." },
  { word: "be exposed to", meaning: "接触；暴露于", example: "Children should be exposed to books early." },
  { word: "be faced with", meaning: "面临", example: "We are faced with a difficult decision." },
  { word: "be familiar with", meaning: "熟悉……", example: "Are you familiar with this software?" },
  { word: "be fed up with", meaning: "厌倦了……", example: "I'm fed up with his complaints." },
  { word: "be fond of", meaning: "喜欢", example: "She is fond of classical music." },
  { word: "be relevant to", meaning: "与……相关", example: "The evidence is relevant to the case." },
  { word: "be resistant to", meaning: "对……有抵抗力；抗拒", example: "Some bacteria are resistant to antibiotics." },
  { word: "be responsible for", meaning: "对……负责", example: "He is responsible for the project." },
  { word: "be satisfied with", meaning: "对……满意", example: "Are you satisfied with the results?" },
  { word: "be subjected to", meaning: "遭受；服从于", example: "The plan was subjected to criticism." },
  { word: "be superior to", meaning: "优于", example: "This model is superior to that one." },
  { word: "be supposed to", meaning: "应该；被期望", example: "You are supposed to arrive on time." },
  { word: "bear in mind", meaning: "记住", example: "Bear in mind that time is limited." },
  { word: "because of", meaning: "因为，由于", example: "The flight was delayed because of weather." },
  { word: "before long", meaning: "不久以后", example: "Before long, they became friends." },
  { word: "benefit from", meaning: "从……中受益", example: "Students benefit from small class sizes." },
  { word: "boil down to", meaning: "归结为", example: "It all boils down to money." },
  { word: "break away from", meaning: "脱离；摆脱", example: "The company broke away from tradition." },
  { word: "break down", meaning: "分解；出故障；崩溃", example: "The negotiations broke down." },
  { word: "break into", meaning: "闯入；突然开始", example: "Thieves broke into the house." },
  { word: "break out", meaning: "爆发；逃脱", example: "War broke out in 1939." },
  { word: "break through", meaning: "突破；冲破", example: "Scientists broke through the barrier." },
  { word: "break up", meaning: "分手；解散；破碎", example: "The couple broke up last month." },
  { word: "bring about", meaning: "带来，引起", example: "What brought about this change?" },
  { word: "bring down", meaning: "降低；打倒", example: "We need to bring down costs." },
  { word: "bring forward", meaning: "提出；提前", example: "She brought forward a new proposal." },
  { word: "bring out", meaning: "出版；使显现；激发", example: "The book brings out hidden truths." },
  { word: "bring up", meaning: "抚养；提出", example: "She brought up three children alone." },
  { word: "build up", meaning: "建立；增强；积累", example: "We need to build up our reputation." },
  { word: "by accident", meaning: "偶然，意外地", example: "We met by accident at the airport." },
  { word: "by all means", meaning: "尽一切办法；当然可以", example: "By all means, go ahead." },
  { word: "by chance", meaning: "偶然，碰巧", example: "I found the letter by chance." },
  { word: "by comparison", meaning: "相比之下", example: "By comparison, this plan is much simpler." },
  { word: "by contrast", meaning: "相比之下", example: "By contrast, the second approach worked." },
  { word: "by far", meaning: "显然；最……", example: "This is by far the best option." },
  { word: "by hand", meaning: "用手工", example: "The furniture was made by hand." },
  { word: "by means of", meaning: "通过……方式", example: "They communicated by means of gestures." },
  { word: "by nature", meaning: "天生，本性上", example: "He is generous by nature." },
  { word: "by no means", meaning: "绝不，决不", example: "It is by no means an easy task." },
  { word: "by oneself", meaning: "独自地", example: "He likes to work by himself." },
  { word: "by the way", meaning: "顺便说一下", example: "By the way, have you seen the news?" },
  { word: "call for", meaning: "需要；号召；去接", example: "This situation calls for immediate action." },
  { word: "call off", meaning: "取消", example: "The meeting was called off." },
  { word: "call on", meaning: "拜访；号召", example: "The president called on citizens to vote." },
  { word: "calm down", meaning: "冷静下来", example: "Let's calm down and think clearly." },
  { word: "care about", meaning: "关心；在乎", example: "Do you really care about me?" },
  { word: "care for", meaning: "照顾；喜欢", example: "Who will care for the elderly?" },
  { word: "carry on", meaning: "继续；进行", example: "Let's carry on with our work." },
  { word: "carry out", meaning: "执行，实施", example: "The plan was carried out successfully." },
  { word: "catch up with", meaning: "赶上", example: "I need to catch up with my studies." },
  { word: "check in", meaning: "登记入住；报到", example: "We checked in at the hotel." },
  { word: "check out", meaning: "退房；检查；借书", example: "They checked out at noon." },
  { word: "cheer up", meaning: "振作起来；高兴起来", example: "Cheer up! Things will get better." },
  { word: "come about", meaning: "发生；产生", example: "How did this situation come about?" },
  { word: "come across", meaning: "偶遇；给人印象", example: "I came across an old friend yesterday." },
  { word: "come down to", meaning: "归结为", example: "It comes down to whether we can afford it." },
  { word: "come into effect", meaning: "开始生效", example: "The new law comes into effect next month." },
  { word: "come to", meaning: "总计；达到；苏醒", example: "The bill comes to $15." },
  { word: "come up with", meaning: "想出；提出", example: "She came up with a brilliant idea." },
  { word: "comment on", meaning: "对……发表评论", example: "He refused to comment on the rumors." },
  { word: "compare to", meaning: "把……比作", example: "Life is often compared to a journey." },
  { word: "compare with", meaning: "与……相比", example: "This year's sales compare well with last year's." },
  { word: "compensate for", meaning: "补偿；弥补", example: "Nothing can compensate for lost time." },
  { word: "comply with", meaning: "遵守；服从", example: "You must comply with the regulations." },
  { word: "concentrate on", meaning: "集中精力于", example: "Let's concentrate on the main issue." },
  { word: "consist of", meaning: "由……组成", example: "The team consists of five members." },
  { word: "contribute to", meaning: "有助于；贡献；导致", example: "Smoking contributes to many diseases." },
  { word: "cope with", meaning: "应对，处理", example: "How do you cope with stress?" },
  { word: "count on", meaning: "依赖，指望", example: "You can count on my support." },
  { word: "cut back on", meaning: "削减，减少", example: "The company cut back on spending." },
  { word: "cut down", meaning: "削减；砍倒", example: "We must cut down on waste." },
  { word: "cut off", meaning: "切断；中断", example: "The storm cut off the power supply." },
  { word: "date back to", meaning: "追溯到", example: "The temple dates back to the 12th century." },
  { word: "deal with", meaning: "处理；涉及；交易", example: "How should we deal with this problem?" },
  { word: "depend on", meaning: "依赖；取决于", example: "Success depends on many factors." },
  { word: "devote to", meaning: "致力于，奉献于", example: "She devoted her life to charity work." },
  { word: "die out", meaning: "灭绝；消失", example: "Many species have died out." },
  { word: "differ from", meaning: "不同于", example: "His approach differs from the traditional one." },
  { word: "distinguish from", meaning: "区分，辨别", example: "How do you distinguish fact from fiction?" },
  { word: "divide into", meaning: "把……分成", example: "The book is divided into six chapters." },
  { word: "do away with", meaning: "废除；去掉", example: "The practice should be done away with." },
  { word: "do one's best", meaning: "尽力而为", example: "I'll do my best to help." },
  { word: "draw a conclusion", meaning: "得出结论", example: "It's too early to draw a conclusion." },
  { word: "draw up", meaning: "起草；制定", example: "They drew up a contract." },
  { word: "drop out", meaning: "辍学；退出", example: "He dropped out of college." },
  { word: "due to", meaning: "由于，因为", example: "The delay was due to bad weather." },
  { word: "economize on", meaning: "节约", example: "We need to economize on fuel." },
  { word: "end up", meaning: "最终成为；结果……", example: "He ended up in prison." },
  { word: "engage in", meaning: "从事；参与", example: "They engage in various activities." },
  { word: "even if", meaning: "即使", example: "Even if it rains, we'll go." },
  { word: "even though", meaning: "虽然，尽管", example: "Even though he was tired, he kept working." },
  { word: "ever since", meaning: "从那时起", example: "He has been happy ever since." },
  { word: "excel at", meaning: "擅长", example: "She excels at mathematics." },
  { word: "except for", meaning: "除了", example: "The essay is good except for a few errors." },
  { word: "exert influence on", meaning: "对……施加影响", example: "Parents exert great influence on children." },
  { word: "fall behind", meaning: "落后；拖欠", example: "He fell behind with his homework." },
  { word: "far from", meaning: "远非；一点也不", example: "The situation is far from satisfactory." },
  { word: "figure out", meaning: "弄清楚，理解", example: "Can you figure out the answer?" },
  { word: "fill in", meaning: "填写；替代", example: "Please fill in this form." },
  { word: "find fault with", meaning: "挑剔；找茬", example: "He always finds fault with others." },
  { word: "focus on", meaning: "专注于，聚焦于", example: "Let's focus on the main issue." },
  { word: "for all", meaning: "尽管", example: "For all his wealth, he is not happy." },
  { word: "for good", meaning: "永久地", example: "He left the city for good." },
  { word: "for instance", meaning: "例如", example: "For instance, consider the following case." },
  { word: "for lack of", meaning: "因为缺少", example: "The project failed for lack of funding." },
  { word: "for the most part", meaning: "大部分，多半", example: "The work, for the most part, is done." },
  { word: "for the purpose of", meaning: "为了……的目的", example: "The meeting was for the purpose of negotiation." },
  { word: "for the sake of", meaning: "为了……起见", example: "He sacrificed himself for the sake of his country." },
  { word: "from time to time", meaning: "有时，偶尔", example: "We meet from time to time." },
  { word: "get across", meaning: "使理解；穿越", example: "The message got across clearly." },
  { word: "get along with", meaning: "与……相处；进展", example: "She gets along well with her colleagues." },
  { word: "get over", meaning: "克服；康复", example: "It took months to get over the illness." },
  { word: "get rid of", meaning: "摆脱；去掉", example: "We must get rid of bad habits." },
  { word: "give in", meaning: "屈服；让步；提交", example: "Don't give in to pressure." },
  { word: "give off", meaning: "发出（光、气味等）", example: "The flowers give off a sweet scent." },
  { word: "give out", meaning: "分发；用完；宣布", example: "The teacher gave out the exam papers." },
  { word: "give rise to", meaning: "引起，导致", example: "The decision gave rise to controversy." },
  { word: "give up", meaning: "放弃；停止", example: "Don't give up on your dreams." },
  { word: "go ahead", meaning: "继续；进行", example: "Go ahead. I'll catch up later." },
  { word: "go by", meaning: "经过；依照（时间流逝）", example: "As time went by, things improved." },
  { word: "go in for", meaning: "参加；爱好", example: "I go in for photography." },
  { word: "go into", meaning: "研究；进入；详述", example: "Let's go into the details." },
  { word: "go on", meaning: "继续；发生", example: "What's going on here?" },
  { word: "go over", meaning: "复习；仔细检查", example: "Let's go over the plan once more." },
  { word: "go through", meaning: "经历；通过；仔细阅读", example: "She's going through a difficult time." },
  { word: "hand down", meaning: "传下来；宣布", example: "The tradition was handed down through generations." },
  { word: "hand in", meaning: "提交，上交", example: "Please hand in your assignments." },
  { word: "hand out", meaning: "分发", example: "They handed out free samples." },
  { word: "hang on", meaning: "坚持下去；别挂断", example: "Hang on! I'm almost there." },
  { word: "have access to", meaning: "可以使用；有……的途径", example: "Students have access to the library." },
  { word: "have an advantage over", meaning: "比……有优势", example: "This system has advantages over the old one." },
  { word: "have an impact on", meaning: "对……产生影响", example: "Technology has a huge impact on society." },
  { word: "have faith in", meaning: "信任；相信", example: "I have faith in your ability." },
  { word: "have nothing to do with", meaning: "与……无关", example: "This has nothing to do with you." },
  { word: "head for", meaning: "前往；朝……方向前进", example: "We are heading for the airport." },
  { word: "hold back", meaning: "抑制；阻碍；隐瞒", example: "She couldn't hold back her tears." },
  { word: "hold on", meaning: "坚持；稍等", example: "Hold on a moment please." },
  { word: "hold up", meaning: "举起；耽搁；支撑", example: "Traffic was held up by the accident." },
  { word: "impose on", meaning: "强加于；利用", example: "Don't impose your views on others." },
  { word: "in a hurry", meaning: "匆忙地", example: "He left in a hurry." },
  { word: "in a sense", meaning: "从某种意义上说", example: "In a sense, he was right." },
  { word: "in a way", meaning: "在某种程度上", example: "In a way, I agree with you." },
  { word: "in accordance with", meaning: "根据；按照", example: "In accordance with the rules, you must leave." },
  { word: "in addition to", meaning: "除……之外", example: "In addition to English, she speaks French." },
  { word: "in advance", meaning: "提前", example: "You need to book in advance." },
  { word: "in all", meaning: "总共", example: "There were 50 people in all." },
  { word: "in brief", meaning: "简而言之", example: "In brief, the plan was a failure." },
  { word: "in case of", meaning: "万一；以防", example: "In case of fire, use the stairs." },
  { word: "in charge of", meaning: "负责；管理", example: "She is in charge of the department." },
  { word: "in common with", meaning: "与……有共同之处", example: "In common with many teenagers, he loves gaming." },
  { word: "in comparison with", meaning: "与……相比", example: "This car is smaller in comparison with that one." },
  { word: "in conclusion", meaning: "总之，最后", example: "In conclusion, I want to thank you all." },
  { word: "in connection with", meaning: "关于；与……有关", example: "He was questioned in connection with the crime." },
  { word: "in consequence of", meaning: "由于……的结果", example: "In consequence of the storm, flights were canceled." },
  { word: "in contrast to", meaning: "与……形成对比", example: "In contrast to his brother, he is outgoing." },
  { word: "in detail", meaning: "详细地", example: "The plan was explained in detail." },
  { word: "in effect", meaning: "实际上；实质上", example: "The tax, in effect, reduces our income." },
  { word: "in essence", meaning: "本质上", example: "In essence, the two theories are similar." },
  { word: "in excess of", meaning: "超过", example: "The project cost in excess of $1 million." },
  { word: "in favor of", meaning: "支持；有利于", example: "The court ruled in favor of the plaintiff." },
  { word: "in general", meaning: "一般说来", example: "In general, the weather here is mild." },
  { word: "in honor of", meaning: "为了纪念；为了表示敬意", example: "A dinner was held in honor of the guests." },
  { word: "in line with", meaning: "与……一致；符合", example: "The policy is in line with public opinion." },
  { word: "in need of", meaning: "需要", example: "The house is in need of repair." },
  { word: "in no case", meaning: "绝不", example: "In no case should you lie." },
  { word: "in no time", meaning: "立刻，马上", example: "She finished the work in no time." },
  { word: "in one's opinion", meaning: "在某人看来", example: "In my opinion, this is a mistake." },
  { word: "in order to", meaning: "为了……", example: "We need more data in order to decide." },
  { word: "in other words", meaning: "换句话说", example: "He's economical. In other words, he's cheap." },
  { word: "in particular", meaning: "特别是，尤其", example: "He likes classical music in particular." },
  { word: "in person", meaning: "亲自", example: "You must apply in person." },
  { word: "in place of", meaning: "代替", example: "Use yogurt in place of cream." },
  { word: "in practice", meaning: "实际上；在实践中", example: "The theory doesn't work well in practice." },
  { word: "in proportion to", meaning: "与……成比例", example: "Cost rises in proportion to complexity." },
  { word: "in pursuit of", meaning: "追求；追逐", example: "He traveled the world in pursuit of adventure." },
  { word: "in question", meaning: "正在讨论的；有疑问的", example: "The person in question has been identified." },
  { word: "in regard to", meaning: "关于，至于", example: "In regard to your request, we need more time." },
  { word: "in relation to", meaning: "关于，涉及", example: "The document outlines policies in relation to privacy." },
  { word: "in return for", meaning: "作为……的回报", example: "He gave me a gift in return for my help." },
  { word: "in short", meaning: "简而言之", example: "In short, the plan won't work." },
  { word: "in spite of", meaning: "尽管，虽然", example: "In spite of the rain, we went out." },
  { word: "in terms of", meaning: "就……而言；在……方面", example: "In terms of quality, this is the best." },
  { word: "in that", meaning: "因为，由于", example: "This approach is better in that it saves time." },
  { word: "in the course of", meaning: "在……过程中", example: "In the course of the investigation, new facts emerged." },
  { word: "in the distance", meaning: "在远处", example: "I saw a ship in the distance." },
  { word: "in the end", meaning: "最后，终于", example: "In the end, everything worked out fine." },
  { word: "in the face of", meaning: "面对；面临", example: "She showed courage in the face of danger." },
  { word: "in the first place", meaning: "首先；一开始", example: "Why did you invite him in the first place?" },
  { word: "in the light of", meaning: "根据；考虑到", example: "In the light of recent events, we need to act." },
  { word: "in the long run", meaning: "从长远来看", example: "This strategy will pay off in the long run." },
  { word: "in the meantime", meaning: "与此同时", example: "The doctor will see you; in the meantime, wait here." },
  { word: "in the name of", meaning: "以……的名义", example: "They acted in the name of freedom." },
  { word: "in the process of", meaning: "在……过程中", example: "We're in the process of restructuring." },
  { word: "in the wake of", meaning: "紧随……之后", example: "In the wake of the scandal, he resigned." },
  { word: "in the way", meaning: "挡道；妨碍", example: "Don't stand in the way." },
  { word: "in theory", meaning: "理论上", example: "In theory, it should work." },
  { word: "in time", meaning: "及时；最终", example: "We arrived just in time." },
  { word: "in touch with", meaning: "与……保持联系", example: "Keep in touch with your friends." },
  { word: "in turn", meaning: "反过来；依次", example: "This, in turn, leads to higher costs." },
  { word: "in vain", meaning: "徒劳地", example: "All our efforts were in vain." },
  { word: "in view of", meaning: "考虑到，由于", example: "In view of the weather, we postponed the trip." },
  { word: "insist on", meaning: "坚持；强调", example: "He insisted on his innocence." },
  { word: "instead of", meaning: "代替；而不是", example: "Let's walk instead of driving." },
  { word: "interfere with", meaning: "干涉；干扰", example: "Don't interfere with their plans." },
  { word: "invest in", meaning: "投资于", example: "We should invest more in education." },
  { word: "keep an eye on", meaning: "留意；照看", example: "Keep an eye on the kids." },
  { word: "keep in touch", meaning: "保持联系", example: "We kept in touch after graduation." },
  { word: "keep on", meaning: "继续", example: "Keep on trying and you'll succeed." },
  { word: "keep pace with", meaning: "跟上……的步伐", example: "Wages haven't kept pace with inflation." },
  { word: "keep track of", meaning: "跟踪；记录", example: "It's hard to keep track of all the changes." },
  { word: "keep up with", meaning: "跟上；保持同步", example: "Can you keep up with the latest trends?" },
  { word: "lay emphasis on", meaning: "强调", example: "The school lays emphasis on creativity." },
  { word: "lay off", meaning: "解雇；停止", example: "The factory laid off 200 workers." },
  { word: "lead to", meaning: "导致；通往", example: "Stress can lead to health problems." },
  { word: "learn from", meaning: "向……学习；从……学会", example: "We should learn from our mistakes." },
  { word: "leave behind", meaning: "留下；超过", example: "Don't leave your bag behind." },
  { word: "let alone", meaning: "更不用说", example: "He can't walk, let alone run." },
  { word: "live up to", meaning: "不辜负；达到", example: "He failed to live up to expectations." },
  { word: "long for", meaning: "渴望", example: "She longed for a chance to travel." },
  { word: "look after", meaning: "照顾；照料", example: "Who will look after the dog?" },
  { word: "look back on", meaning: "回顾；回忆", example: "Looking back on my childhood, I feel grateful." },
  { word: "look down on", meaning: "轻视，看不起", example: "Don't look down on others." },
  { word: "look for", meaning: "寻找", example: "What are you looking for?" },
  { word: "look forward to", meaning: "期待，盼望", example: "I look forward to hearing from you." },
  { word: "look into", meaning: "调查；研究", example: "The police are looking into the matter." },
  { word: "look on", meaning: "旁观；看待", example: "She looked on the project as a challenge." },
  { word: "look out", meaning: "当心，注意", example: "Look out! There's a car coming." },
  { word: "look through", meaning: "仔细查看；浏览", example: "I looked through the report quickly." },
  { word: "look up", meaning: "查（词典）；查阅；向上看", example: "You should look up this word in the dictionary." },
  { word: "look up to", meaning: "尊敬，敬仰", example: "He looks up to his father." },
  { word: "lose sight of", meaning: "忽略；看不见", example: "Don't lose sight of your goals." },
  { word: "make a difference", meaning: "有影响；起作用", example: "Your support makes a difference." },
  { word: "make an effort", meaning: "努力", example: "We must make an effort to improve." },
  { word: "make full use of", meaning: "充分利用", example: "Make full use of your time." },
  { word: "make fun of", meaning: "取笑；嘲笑", example: "Don't make fun of others." },
  { word: "make progress", meaning: "取得进步", example: "He is making good progress in English." },
  { word: "make room for", meaning: "为……腾出空间", example: "Make room for the new furniture." },
  { word: "make sense", meaning: "有意义；讲得通", example: "Does that make sense to you?" },
  { word: "make sure", meaning: "确保；查明", example: "Make sure the door is locked." },
  { word: "make the best of", meaning: "充分利用", example: "We should make the best of this opportunity." },
  { word: "make the most of", meaning: "充分利用", example: "Make the most of your time at college." },
  { word: "make up", meaning: "组成；编造；弥补；化妆", example: "Women make up 60% of the workforce." },
  { word: "make up for", meaning: "弥补，补偿", example: "Nothing can make up for lost time." },
  { word: "make use of", meaning: "利用，使用", example: "We should make use of available resources." },
  { word: "meet the needs of", meaning: "满足……的需求", example: "The product meets the needs of consumers." },
  { word: "no less than", meaning: "不少于；不亚于", example: "No less than 500 people attended." },
  { word: "no longer", meaning: "不再", example: "He no longer works here." },
  { word: "no matter how", meaning: "无论怎样", example: "No matter how hard it is, keep going." },
  { word: "no more than", meaning: "最多；只不过", example: "It's no more than a rumor." },
  { word: "no sooner...than", meaning: "一……就……", example: "No sooner had I left than it began to rain." },
  { word: "not at all", meaning: "一点也不；别客气", example: "I'm not at all tired." },
  { word: "now that", meaning: "既然", example: "Now that you're here, let's start." },
  { word: "object to", meaning: "反对", example: "I object to the proposal." },
  { word: "occur to", meaning: "想到；发生", example: "It never occurred to me to ask." },
  { word: "of course", meaning: "当然", example: "Of course, you are right." },
  { word: "off and on", meaning: "断断续续地", example: "I've been learning Japanese off and on." },
  { word: "on account of", meaning: "因为，由于", example: "The picnic was canceled on account of rain." },
  { word: "on a large scale", meaning: "大规模地", example: "The experiment was done on a large scale." },
  { word: "on average", meaning: "平均", example: "On average, men earn more than women." },
  { word: "on behalf of", meaning: "代表；为了", example: "I'm speaking on behalf of the team." },
  { word: "on board", meaning: "在船/飞机上；加入", example: "Welcome on board!" },
  { word: "on business", meaning: "因公出差", example: "He's in London on business." },
  { word: "on duty", meaning: "值班；上班", example: "Who's on duty tonight?" },
  { word: "on earth", meaning: "究竟；到底；地球上", example: "What on earth are you doing?" },
  { word: "on occasion", meaning: "有时，偶尔", example: "On occasion, we eat out." },
  { word: "on one's own", meaning: "独自地；独立地", example: "He started the business on his own." },
  { word: "on purpose", meaning: "故意地", example: "He didn't do it on purpose." },
  { word: "on the basis of", meaning: "在……的基础上", example: "Decisions are made on the basis of evidence." },
  { word: "on the contrary", meaning: "正相反", example: "He's not lazy. On the contrary, he's very hardworking." },
  { word: "on the grounds of", meaning: "基于……的理由", example: "He refused on the grounds of principle." },
  { word: "on the other hand", meaning: "另一方面", example: "On the other hand, it could be risky." },
  { word: "on the part of", meaning: "就……而言", example: "There was no effort on the part of the government." },
  { word: "on the point of", meaning: "正要……的时候", example: "I was on the point of leaving when he called." },
  { word: "on the rise", meaning: "在上升，在增加", example: "Crime is on the rise." },
  { word: "on the spot", meaning: "当场；在现场", example: "He was arrested on the spot." },
  { word: "on the whole", meaning: "总的来说", example: "On the whole, the project was a success." },
  { word: "once again", meaning: "再一次", example: "Once again, you've impressed me." },
  { word: "once in a while", meaning: "偶尔", example: "We go to the cinema once in a while." },
  { word: "once upon a time", meaning: "从前，很久以前", example: "Once upon a time, there lived a king." },
  { word: "originate in", meaning: "起源于", example: "The custom originated in ancient China." },
  { word: "other than", meaning: "除了；不同于", example: "There's nothing we can do other than wait." },
  { word: "out of breath", meaning: "上气不接下气", example: "I was out of breath after running." },
  { word: "out of control", meaning: "失去控制", example: "The situation got out of control." },
  { word: "out of date", meaning: "过时的", example: "This technology is out of date." },
  { word: "out of order", meaning: "出故障；混乱", example: "The elevator is out of order." },
  { word: "out of place", meaning: "不适当；不合适", example: "His joke seemed out of place." },
  { word: "out of sight", meaning: "看不见；在视野外", example: "The ship disappeared out of sight." },
  { word: "out of the question", meaning: "不可能的", example: "A trip abroad is out of the question now." },
  { word: "over and over again", meaning: "反复地", example: "She practiced the piece over and over again." },
  { word: "owe to", meaning: "归功于；欠", example: "He owes his success to hard work." },
  { word: "participate in", meaning: "参加，参与", example: "Everyone is encouraged to participate in discussions." },
  { word: "pass away", meaning: "去世", example: "His grandfather passed away last year." },
  { word: "pass by", meaning: "经过；路过", example: "Time passed by quickly." },
  { word: "pass on", meaning: "传递；传下去", example: "Pass on the message to others." },
  { word: "pave the way for", meaning: "为……铺平道路", example: "His research paved the way for modern medicine." },
  { word: "pay attention to", meaning: "注意，重视", example: "Pay attention to detail." },
  { word: "pay off", meaning: "还清；取得成功", example: "Hard work pays off in the end." },
  { word: "persist in", meaning: "坚持", example: "He persisted in his opinion." },
  { word: "pick out", meaning: "挑选出；辨认出", example: "Can you pick out the differences?" },
  { word: "pick up", meaning: "捡起；学会；接人", example: "I picked up some Spanish during the trip." },
  { word: "play a role in", meaning: "在……中起作用", example: "Parents play a crucial role in education." },
  { word: "point out", meaning: "指出", example: "He pointed out several mistakes." },
  { word: "prefer to", meaning: "更喜欢；宁愿", example: "I prefer walking to cycling." },
  { word: "prepare for", meaning: "为……做准备", example: "It's time to prepare for the exam." },
  { word: "prevail over", meaning: "胜过；压倒", example: "Truth will prevail over falsehood." },
  { word: "prevent from", meaning: "阻止；防止", example: "The storm prevented us from leaving." },
  { word: "prior to", meaning: "在……之前", example: "Prior to the meeting, we reviewed the documents." },
  { word: "protect from", meaning: "保护……免受", example: "Sunscreen protects your skin from damage." },
  { word: "provide with", meaning: "为……提供", example: "The hotel provides guests with free breakfast." },
  { word: "put aside", meaning: "放在一边；储存", example: "Let's put aside our differences." },
  { word: "put away", meaning: "收起来；存钱", example: "Put away your toys." },
  { word: "put down", meaning: "放下；记下；镇压", example: "Let me put down your number." },
  { word: "put forward", meaning: "提出；提议", example: "He put forward a bold theory." },
  { word: "put into practice", meaning: "付诸实践", example: "Now let's put our plan into practice." },
  { word: "put off", meaning: "推迟；拖延", example: "Don't put off your homework." },
  { word: "put out", meaning: "熄灭；伸出；发布", example: "Firefighters put out the fire." },
  { word: "put up", meaning: "搭建；张贴；住宿", example: "We put up a tent by the lake." },
  { word: "put up with", meaning: "忍受，容忍", example: "How do you put up with the noise?" },
  { word: "range from...to", meaning: "范围从……到……", example: "Prices range from $10 to $100." },
  { word: "rather than", meaning: "而不是", example: "I'd like tea rather than coffee." },
  { word: "react to", meaning: "对……做出反应", example: "How did she react to the news?" },
  { word: "refer to", meaning: "参考；指的是；涉及", example: "The report refers to several studies." },
  { word: "reflect on", meaning: "反思；思考", example: "Take time to reflect on what you've learned." },
  { word: "regardless of", meaning: "不管，不顾", example: "He continued regardless of the danger." },
  { word: "relate to", meaning: "与……有关；涉及", example: "This issue relates to everyone." },
  { word: "rely on", meaning: "依赖；依靠", example: "Don't rely on luck." },
  { word: "remind of", meaning: "提醒；使想起", example: "This song reminds me of my childhood." },
  { word: "replace with", meaning: "用……替换", example: "We replaced the old system with a new one." },
  { word: "respond to", meaning: "回应；响应", example: "How did the market respond to the news?" },
  { word: "result from", meaning: "由……引起", example: "Many problems result from poor planning." },
  { word: "result in", meaning: "导致；结果是", example: "The accident resulted in two deaths." },
  { word: "root in", meaning: "根植于；源于", example: "The problem is rooted in misunderstanding." },
  { word: "rule out", meaning: "排除；不考虑", example: "We can't rule out the possibility." },
  { word: "run across", meaning: "偶然遇到", example: "I ran across an interesting article." },
  { word: "run down", meaning: "耗尽；贬低；撞倒", example: "The battery has run down." },
  { word: "run into", meaning: "偶遇；撞上；遭遇（困难）", example: "We ran into unexpected problems." },
  { word: "run out of", meaning: "用完，耗尽", example: "We're running out of time." },
  { word: "run over", meaning: "碾过；溢出；快速浏览", example: "Let me run over the main points." },
  { word: "see off", meaning: "给……送行", example: "We went to the station to see her off." },
  { word: "seek after", meaning: "寻求；追求", example: "His advice was much sought after." },
  { word: "serve as", meaning: "作为；充当", example: "This room serves as a study." },
  { word: "set about", meaning: "着手；开始做", example: "They set about solving the problem." },
  { word: "set aside", meaning: "留出；拨出；搁置", example: "Set aside some time for exercise." },
  { word: "set off", meaning: "出发；引起；引爆", example: "We set off early in the morning." },
  { word: "set out", meaning: "出发；开始；阐述", example: "She set out to prove her theory." },
  { word: "set up", meaning: "建立；设立；安排", example: "They set up a new company." },
  { word: "settle down", meaning: "定居；安定下来；专心", example: "After years of travel, he finally settled down." },
  { word: "show off", meaning: "炫耀；展示", example: "He likes to show off his knowledge." },
  { word: "show up", meaning: "出现；露面", example: "Only a few people showed up." },
  { word: "side with", meaning: "支持；站在……一边", example: "He sided with the opposition." },
  { word: "since then", meaning: "从那时起", example: "Since then, things have improved." },
  { word: "slow down", meaning: "慢下来；减速", example: "Slow down! You're driving too fast." },
  { word: "so far", meaning: "到目前为止", example: "So far, so good." },
  { word: "so that", meaning: "以便；所以", example: "Speak louder so that everyone can hear." },
  { word: "sooner or later", meaning: "迟早，总有一天", example: "Sooner or later, the truth will come out." },
  { word: "specialize in", meaning: "专门从事；专攻", example: "The company specializes in software development." },
  { word: "speed up", meaning: "加速，加快", example: "We need to speed up the process." },
  { word: "stand by", meaning: "支持；袖手旁观；准备", example: "I'll stand by you no matter what." },
  { word: "stand for", meaning: "代表；支持；容忍", example: "What does CEO stand for?" },
  { word: "stand out", meaning: "突出，显眼", example: "Her talent makes her stand out from the crowd." },
  { word: "stand up for", meaning: "支持；维护", example: "Stand up for what you believe in." },
  { word: "stem from", meaning: "源于，来自", example: "The problem stems from poor communication." },
  { word: "stick to", meaning: "坚持；粘住", example: "Stick to your principles." },
  { word: "subject to", meaning: "使遭受；受……支配", example: "The schedule is subject to change." },
  { word: "substitute for", meaning: "代替；替代", example: "Nothing can substitute for experience." },
  { word: "succeed in", meaning: "在……方面成功", example: "He succeeded in passing the exam." },
  { word: "suffer from", meaning: "遭受；患病", example: "Many people suffer from allergies." },
  { word: "sum up", meaning: "总结；概括", example: "To sum up, we need more research." },
  { word: "superior to", meaning: "优于；高于", example: "This model is superior to the previous one." },
  { word: "switch off", meaning: "关掉（电器）；失去兴趣", example: "Don't forget to switch off the lights." },
  { word: "switch on", meaning: "打开（电器）", example: "He switched on the TV." },
  { word: "take...for granted", meaning: "认为……理所当然", example: "Don't take your health for granted." },
  { word: "take account of", meaning: "考虑到", example: "We must take account of their opinions." },
  { word: "take advantage of", meaning: "利用；占便宜", example: "Take advantage of this opportunity." },
  { word: "take after", meaning: "与……相像", example: "She takes after her mother." },
  { word: "take care of", meaning: "照顾；处理", example: "Who will take care of the kids?" },
  { word: "take charge of", meaning: "负责；接管", example: "She took charge of the project." },
  { word: "take effect", meaning: "生效；起作用", example: "The medicine takes effect within an hour." },
  { word: "take for", meaning: "把……当作；误认为", example: "I took him for a doctor." },
  { word: "take in", meaning: "吸收；理解；欺骗", example: "I couldn't take in all the information." },
  { word: "take into account", meaning: "考虑到, 顾及", example: "We must take all factors into account." },
  { word: "take measures", meaning: "采取措施", example: "The government took measures to control inflation." },
  { word: "take off", meaning: "起飞；脱下；成功", example: "The plane took off on time." },
  { word: "take on", meaning: "承担；呈现；雇佣", example: "She took on too much responsibility." },
  { word: "take over", meaning: "接管；接手", example: "The company was taken over by a larger firm." },
  { word: "take part in", meaning: "参加，参与", example: "Thousands took part in the demonstration." },
  { word: "take place", meaning: "发生；举行", example: "The event takes place every year." },
  { word: "take pride in", meaning: "以……为自豪", example: "He takes pride in his work." },
  { word: "take the place of", meaning: "代替", example: "Computers cannot take the place of teachers." },
  { word: "take turns", meaning: "轮流", example: "We take turns cooking dinner." },
  { word: "take up", meaning: "开始从事；占据；接受", example: "She took up painting as a hobby." },
  { word: "talk over", meaning: "讨论；商量", example: "Let's talk it over before deciding." },
  { word: "tell apart", meaning: "区分，辨别", example: "I can't tell the twins apart." },
  { word: "thanks to", meaning: "由于，因为；多亏", example: "Thanks to his help, we finished on time." },
  { word: "think highly of", meaning: "高度评价", example: "The boss thinks highly of her." },
  { word: "think of", meaning: "想到；认为；考虑", example: "What do you think of the plan?" },
  { word: "think over", meaning: "仔细考虑", example: "I need time to think it over." },
  { word: "throw away", meaning: "扔掉；浪费", example: "Don't throw away this opportunity." },
  { word: "throw light on", meaning: "阐明；为……提供解释", example: "This discovery throws light on the issue." },
  { word: "to a certain extent", meaning: "在一定程度上", example: "To a certain extent, I agree." },
  { word: "to begin with", meaning: "首先；起初", example: "To begin with, let's review the facts." },
  { word: "to be exact", meaning: "确切地说", example: "It weighs 3.5 kg, to be exact." },
  { word: "to conclude", meaning: "总而言之", example: "To conclude, all of us need to work together." },
  { word: "to date", meaning: "到目前为止", example: "This is the best solution to date." },
  { word: "to one's surprise", meaning: "令某人惊讶的是", example: "To my surprise, he agreed immediately." },
  { word: "to some extent", meaning: "在某种程度上", example: "To some extent, the plan works." },
  { word: "to start with", meaning: "首先；起初", example: "To start with, we need a clear goal." },
  { word: "to sum up", meaning: "总结一下", example: "To sum up, we're on the right track." },
  { word: "to the contrary", meaning: "相反地", example: "Despite evidence to the contrary, she persisted." },
  { word: "to the point", meaning: "切题，中肯", example: "His speech was brief and to the point." },
  { word: "touch on", meaning: "提及；涉及", example: "The report touched on several issues." },
  { word: "trace back to", meaning: "追溯到", example: "The tradition can be traced back to ancient times." },
  { word: "try on", meaning: "试穿", example: "Can I try on this dress?" },
  { word: "try out", meaning: "试验；尝试", example: "They're trying out a new method." },
  { word: "turn down", meaning: "拒绝；调低（音量）", example: "He turned down the job offer." },
  { word: "turn into", meaning: "变成；转变为", example: "The caterpillar turned into a butterfly." },
  { word: "turn off", meaning: "关掉", example: "Please turn off the light." },
  { word: "turn on", meaning: "打开", example: "Turn on the computer." },
  { word: "turn out", meaning: "结果是；生产；证明是", example: "It turned out to be a great success." },
  { word: "turn to", meaning: "求助于；转向", example: "He turned to his friend for advice." },
  { word: "turn up", meaning: "出现；调高（音量）", example: "He didn't turn up for the meeting." },
  { word: "under control", meaning: "处于控制之下", example: "The fire is now under control." },
  { word: "under discussion", meaning: "在讨论中", example: "The proposal is still under discussion." },
  { word: "under no circumstances", meaning: "决不", example: "Under no circumstances should you lie." },
  { word: "under pressure", meaning: "在压力下", example: "He works well under pressure." },
  { word: "under way", meaning: "在进行中", example: "The project is already under way." },
  { word: "up to date", meaning: "最新的；现代的", example: "Keep your knowledge up to date." },
  { word: "vary from...to", meaning: "因……而异", example: "Tastes vary from person to person." },
  { word: "warn of", meaning: "警告；提醒", example: "They warned us of the danger." },
  { word: "wear out", meaning: "磨损；耗尽；使疲劳", example: "The shoes are worn out." },
  { word: "wipe out", meaning: "消灭；擦去；抹掉", example: "The disease was wiped out." },
  { word: "with a view to", meaning: "为了……；着眼于", example: "We work with a view to improving efficiency." },
  { word: "with regard to", meaning: "关于，至于", example: "With regard to your question, here is my answer." },
  { word: "with respect to", meaning: "关于；就……而言", example: "With respect to cost, this option is best." },
  { word: "with the exception of", meaning: "除了……之外", example: "All students passed, with the exception of Tom." },
  { word: "work on", meaning: "致力于；从事于；影响", example: "We're working on a new project." },
  { word: "work out", meaning: "解决；锻炼；结果是", example: "Let's work out a plan." },
  { word: "worry about", meaning: "担心，担忧", example: "Don't worry about the future." },
  { word: "worth doing", meaning: "值得做", example: "This book is worth reading." },
  { word: "write down", meaning: "写下，记下", example: "Write down your ideas before you forget." },
  { word: "yield to", meaning: "屈服于；让步于", example: "Don't yield to temptation." }
];

// ==========================================
// English Motivational Quotes (122 verified quotes, daily rotation)
// ==========================================
const ENGLISH_QUOTES = [
  { text: 'The only way to do great work is to love what you do.', author: "Steve Jobs" },
  { text: 'It does not matter how slowly you go as long as you do not stop.', author: "Confucius" },
  { text: 'The future belongs to those who believe in the beauty of their dreams.', author: "Eleanor Roosevelt" },
  { text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: "Winston Churchill" },
  { text: 'Believe you can and you\'re halfway there.', author: "Theodore Roosevelt" },
  { text: 'The secret of getting ahead is getting started.', author: "Mark Twain" },
  { text: 'Don\'t watch the clock; do what it does. Keep going.', author: "Sam Levenson" },
  { text: 'You are never too old to set another goal or to dream a new dream.', author: "C.S. Lewis" },
  { text: 'Act as if what you do makes a difference. It does.', author: "William James" },
  { text: 'Education is the most powerful weapon which you can use to change the world.', author: "Nelson Mandela" },
  { text: 'The beautiful thing about learning is that no one can take it away from you.', author: "B.B. King" },
  { text: 'Your time is limited, so don\'t waste it living someone else\'s life.', author: "Steve Jobs" },
  { text: 'The harder you work for something, the greater you\'ll feel when you achieve it.', author: "Anonymous" },
  { text: 'Dream big and dare to fail.', author: "Norman Vaughan" },
  { text: 'Strive not to be a success, but rather to be of value.', author: "Albert Einstein" },
  { text: 'I find that the harder I work, the more luck I seem to have.', author: "Thomas Jefferson" },
  { text: 'Don\'t be pushed around by the fears in your mind. Be led by the dreams in your heart.', author: "Roy T. Bennett" },
  { text: 'You don\'t have to be great to start, but you have to start to be great.', author: "Zig Ziglar" },
  { text: 'The expert in anything was once a beginner.', author: "Helen Hayes" },
  { text: 'Start where you are. Use what you have. Do what you can.', author: "Arthur Ashe" },
  { text: 'Perseverance is not a long race; it is many short races one after the other.', author: "Walter Elliot" },
  { text: 'Learning is a treasure that will follow its owner everywhere.', author: "Chinese Proverb" },
  { text: 'The best way to predict the future is to create it.', author: "Peter Drucker" },
  { text: 'Doubt kills more dreams than failure ever will.', author: "Suzy Kassem" },
  { text: 'Courage doesn\'t always roar. Sometimes courage is the quiet voice at the end of the day saying \'I will try again tomorrow.\'', author: "Mary Anne Radmacher" },
  { text: 'If you can dream it, you can do it.', author: "Walt Disney" },
  { text: 'It always seems impossible until it\'s done.', author: "Nelson Mandela" },
  { text: 'Small daily improvements over time lead to stunning results.', author: "Robin Sharma" },
  { text: 'Success is walking from failure to failure with no loss of enthusiasm.', author: "Winston Churchill" },
  { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: "Aristotle" },
  { text: 'You miss 100% of the shots you don\'t take.', author: "Wayne Gretzky" },
  { text: 'What we learn with pleasure we never forget.', author: "Alfred Mercier" },
  { text: 'The journey of a thousand miles begins with one step.', author: "Lao Tzu" },
  { text: 'Your attitude, not your aptitude, will determine your altitude.', author: "Zig Ziglar" },
  { text: 'Knowledge speaks, but wisdom listens.', author: "Jimi Hendrix" },
  { text: 'Hardships often prepare ordinary people for an extraordinary destiny.', author: "C.S. Lewis" },
  { text: 'The only person you should try to be better than is the person you were yesterday.', author: "Anonymous" },
  { text: 'Wake up with determination. Go to bed with satisfaction.', author: "George Horace Lorimer" },
  { text: 'Don\'t limit your challenges. Challenge your limits.', author: "Anonymous" },
  { text: 'A smooth sea never made a skilled sailor.', author: "Franklin D. Roosevelt" },
  { text: 'The difference between ordinary and extraordinary is that little extra.', author: "Jimmy Johnson" },
  { text: 'Fall seven times, stand up eight.', author: "Japanese Proverb" },
  { text: 'Reading is to the mind what exercise is to the body.', author: "Joseph Addison" },
  { text: 'In the middle of difficulty lies opportunity.', author: "Albert Einstein" },
  { text: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', author: "Mahatma Gandhi" },
  { text: 'The roots of education are bitter, but the fruit is sweet.', author: "Aristotle" },
  { text: 'An investment in knowledge pays the best interest.', author: "Benjamin Franklin" },
  { text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: "Chinese Proverb" },
  { text: 'Never give up. Today is hard, tomorrow will be worse, but the day after tomorrow will be sunshine.', author: "Jack Ma" },
  { text: 'The more that you read, the more things you will know. The more that you learn, the more places you\'ll go.', author: "Dr. Seuss" },
  { text: 'Do what you can, with what you have, where you are.', author: "Theodore Roosevelt" },
  { text: 'Success is not how high you have climbed, but how you make a positive difference to the world.', author: "Roy T. Bennett" },
  { text: 'Be not afraid of growing slowly; be afraid only of standing still.', author: "Chinese Proverb" },
  { text: 'Motivation is what gets you started. Habit is what keeps you going.', author: "Jim Ryun" },
  { text: 'The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.', author: "Brian Herbert" },
  { text: 'There is no substitute for hard work.', author: "Thomas Edison" },
  { text: 'A goal without a plan is just a wish.', author: "Antoine de Saint-Exupery" },
  { text: 'Quality is not an act, it is a habit.', author: "Aristotle" },
  { text: 'Well done is better than well said.', author: "Benjamin Franklin" },
  { text: 'Energy and persistence conquer all things.', author: "Benjamin Franklin" },
  { text: 'Try not to become a man of success, but rather try to become a man of value.', author: "Albert Einstein" },
  { text: 'Logic will get you from A to B. Imagination will take you everywhere.', author: "Albert Einstein" },
  { text: 'Life is like riding a bicycle. To keep your balance, you must keep moving.', author: "Albert Einstein" },
  { text: 'Anyone who has never made a mistake has never tried anything new.', author: "Albert Einstein" },
  { text: 'Imagination is more important than knowledge.', author: "Albert Einstein" },
  { text: 'Genius is one percent inspiration and ninety-nine percent perspiration.', author: "Thomas Edison" },
  { text: 'Many of life\'s failures are people who did not realize how close they were to success when they gave up.', author: "Thomas Edison" },
  { text: 'Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.', author: "Thomas Edison" },
  { text: 'If we did all the things we are capable of, we would literally astound ourselves.', author: "Thomas Edison" },
  { text: 'Whether you think you can or you think you can\'t, you\'re right.', author: "Henry Ford" },
  { text: 'Failure is simply the opportunity to begin again, this time more intelligently.', author: "Henry Ford" },
  { text: 'Coming together is a beginning; keeping together is progress; working together is success.', author: "Henry Ford" },
  { text: 'If everyone is moving forward together, then success takes care of itself.', author: "Henry Ford" },
  { text: 'The man who has done his level best is a success.', author: "John Wooden" },
  { text: 'Don\'t let what you cannot do interfere with what you can do.', author: "John Wooden" },
  { text: 'Things work out best for those who make the best of how things work out.', author: "John Wooden" },
  { text: 'Nothing will work unless you do.', author: "Maya Angelou" },
  { text: 'We may encounter many defeats but we must not be defeated.', author: "Maya Angelou" },
  { text: 'You can\'t use up creativity. The more you use, the more you have.', author: "Maya Angelou" },
  { text: 'Do the best you can until you know better. Then when you know better, do better.', author: "Maya Angelou" },
  { text: 'If you\'re going through hell, keep going.', author: "Winston Churchill" },
  { text: 'Courage is what it takes to stand up and speak; courage is also what it takes to sit down and listen.', author: "Winston Churchill" },
  { text: 'Success consists of going from failure to failure without loss of enthusiasm.', author: "Winston Churchill" },
  { text: 'The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.', author: "Winston Churchill" },
  { text: 'Continuous effort — not strength or intelligence — is the key to unlocking our potential.', author: "Winston Churchill" },
  { text: 'It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.', author: "Charles Darwin" },
  { text: 'A man who dares to waste one hour of time has not discovered the value of life.', author: "Charles Darwin" },
  { text: 'To improve is to change; to be perfect is to change often.', author: "Winston Churchill" },
  { text: 'The only thing we have to fear is fear itself.', author: "Franklin D. Roosevelt" },
  { text: 'Happiness lies in the joy of achievement and the thrill of creative effort.', author: "Franklin D. Roosevelt" },
  { text: 'The only limit to our realization of tomorrow will be our doubts of today.', author: "Franklin D. Roosevelt" },
  { text: 'When you reach the end of your rope, tie a knot in it and hang on.', author: "Franklin D. Roosevelt" },
  { text: 'The mind is everything. What you think you become.', author: "Buddha" },
  { text: 'What we think, we become.', author: "Buddha" },
  { text: 'Peace comes from within. Do not seek it without.', author: "Buddha" },
  { text: 'The way is not in the sky. The way is in the heart.', author: "Buddha" },
  { text: 'No one saves us but ourselves. No one can and no one may. We ourselves must walk the path.', author: "Buddha" },
  { text: 'Be the change that you wish to see in the world.', author: "Mahatma Gandhi" },
  { text: 'Strength does not come from physical capacity. It comes from an indomitable will.', author: "Mahatma Gandhi" },
  { text: 'The weak can never forgive. Forgiveness is the attribute of the strong.', author: "Mahatma Gandhi" },
  { text: 'First they ignore you, then they laugh at you, then they fight you, then you win.', author: "Mahatma Gandhi" },
  { text: 'The best preparation for tomorrow is doing your best today.', author: "H. Jackson Brown Jr." },
  { text: 'Twenty years from now you will be more disappointed by the things that you didn\'t do than by the ones you did do.', author: "Mark Twain" },
  { text: 'The two most important days in your life are the day you are born and the day you find out why.', author: "Mark Twain" },
  { text: 'Kindness is the language which the deaf can hear and the blind can see.', author: "Mark Twain" },
  { text: 'The secret of getting ahead is getting started.', author: "Mark Twain" },
  { text: 'When you fish for love, bait with your heart, not your brain.', author: "Mark Twain" },
  { text: 'Stay hungry, stay foolish.', author: "Steve Jobs" },
  { text: 'Innovation distinguishes between a leader and a follower.', author: "Steve Jobs" },
  { text: 'Don\'t let the noise of others\' opinions drown out your own inner voice.', author: "Steve Jobs" },
  { text: 'The people who are crazy enough to think they can change the world are the ones who do.', author: "Steve Jobs" },
  { text: 'Have the courage to follow your heart and intuition. They somehow already know what you truly want to become.', author: "Steve Jobs" },
  { text: 'I have not failed. I\'ve just found 10,000 ways that won\'t work.', author: "Thomas Edison" },
  { text: 'The way to get started is to quit talking and begin doing.', author: "Walt Disney" },
  { text: 'It\'s kind of fun to do the impossible.', author: "Walt Disney" },
  { text: 'All our dreams can come true, if we have the courage to pursue them.', author: "Walt Disney" },
  { text: 'The most important investment you can make is in yourself.', author: "Warren Buffett" },
  { text: 'Someone\'s sitting in the shade today because someone planted a tree a long time ago.', author: "Warren Buffett" },
  { text: 'Risk comes from not knowing what you\'re doing.', author: "Warren Buffett" },
  { text: 'It takes 20 years to build a reputation and five minutes to ruin it.', author: "Warren Buffett" },
  { text: 'In the business world, the rearview mirror is always clearer than the windshield.', author: "Warren Buffett" },
  { text: 'Honesty is a very expensive gift. Don\'t expect it from cheap people.', author: "Warren Buffett" }
];

(function() {
  const dueWords = getDueWords();
  const stats = getTotalStats();
  const streak = getStreak();
  const checkins = getCheckins();
  const today = new Date().toISOString().split("T")[0];

  // ---- Greeting ----
  const hour = new Date().getHours();
  let greeting = "👋 准备好开始了吗？";
  if (hour < 6) greeting = "🌙 夜深了，注意休息哦~";
  else if (hour < 9) greeting = "☀️ 早安！新的一天开始啦~";
  else if (hour < 12) greeting = "🌻 上午好！学习的好时光~";
  else if (hour < 14) greeting = "🍱 午安！吃完饭复习几个词吧~";
  else if (hour < 18) greeting = "🍵 下午好！来杯茶，背几个词~";
  else if (hour < 22) greeting = "🌆 晚上好！今天别忘了复习哦~";
  else greeting = "🌙 夜深了，注意休息哦~";
  document.getElementById('greeting').textContent = greeting;

  // ---- Sub greeting ----
  if (dueWords.length === 0) {
    document.getElementById('greeting-sub').textContent = '✨ 太棒了！今日任务已完成，享受你的自由时光吧~';
    const btn = document.getElementById('btn-start-review');
    btn.textContent = '🎉 今日已完成';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-success');
  } else {
    document.getElementById('greeting-sub').textContent = `还有 ${dueWords.length} 组单词等着你复习，加油！`;
  }

  // ---- Stats ----
  document.getElementById('due-count').textContent = dueWords.length;
  document.getElementById('streak-count').textContent = streak;
  document.getElementById('total-words').textContent = stats.total;
  const masteryRate = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;
  document.getElementById('mastery-rate').textContent = masteryRate + '%';

  // ---- Daily 考研 Vocab ----
  renderDailyVocab();

  // ---- English Quote ----
  renderDailyQuote();

  // ---- Calendar ----
  renderCalendar();
  updateTodayStatus();

  // ============ Functions ============

  function renderDailyVocab() {
    // Get a stable index based on the day of year
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
    const idx = dayOfYear % KAOYAN_VOCAB.length;
    const vocab = KAOYAN_VOCAB[idx];

    document.getElementById('vocab-label').textContent = '📖 红宝书高频词组  Day ' + dayOfYear;
    document.getElementById('vocab-word').textContent = vocab.word;
    document.getElementById('vocab-meaning').textContent = vocab.meaning;
    document.getElementById('vocab-example').textContent = vocab.example || '';
  }

  function renderCalendar() {
    const container = document.getElementById('calendar');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
    let html = dayNames.map(function(d) {
      return '<div style="text-align:center;font-size:0.85rem;color:var(--color-text-light);padding:4px;">' + d + '</div>';
    }).join('');

    for (let i = 0; i < firstDay; i++) {
      html += '<div class="calendar-day empty"></div>';
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      let cls = 'calendar-day';
      if (checkins[dateStr] && checkins[dateStr].completed) cls += ' checked';
      if (dateStr === today) cls += ' today';
      const checkMark = (checkins[dateStr] && checkins[dateStr].completed) ? '⭐' : d;
      html += '<div class="' + cls + '">' + checkMark + '</div>';
    }

    container.innerHTML = html;
  }

  function updateTodayStatus() {
    const statusEl = document.getElementById('today-checkin-status');
    if (checkins[today] && checkins[today].completed) {
      statusEl.textContent = '✅ 今日已打卡！复习了 ' + checkins[today].reviewedCount + ' 组单词';
    } else if (dueWords.length === 0) {
      statusEl.textContent = '📭 今天没有待复习的单词';
    } else {
      statusEl.textContent = '⏳ 今日还未打卡，快去复习吧~';
    }
  }
  function renderDailyQuote() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
    const idx = dayOfYear % ENGLISH_QUOTES.length;
    const quote = ENGLISH_QUOTES[idx];
    document.getElementById('quote-text').textContent = '“' + quote.text + '”';
    document.getElementById('quote-author').textContent = '— ' + quote.author;
  }
})();

// ==========================================
// Data Backup — Export / Import
// ==========================================

function downloadBackup() {
  const json = exportData();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const d = new Date();
  const dateStr = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  a.download = 'english-word-backup-' + dateStr + '.json';
  a.click();
  URL.revokeObjectURL(url);
  if (typeof showToast === 'function') showToast('✅ 数据已导出！保存好这个文件');
}

function uploadBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const result = importData(e.target.result);
    if (result.success) {
      if (typeof showToast === 'function') showToast('✅ ' + result.message);
      setTimeout(function() { location.reload(); }, 800);
    } else {
      alert('❌ ' + result.message);
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

