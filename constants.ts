import { ModuleData, Review } from './types';

// INSTRUCTIONS FOR USER:
// This data simulates the content from your spreadsheet.
// You can copy-paste more entries following this exact format.

export const MOCK_MODULES: ModuleData[] = [
  {
    id: '1',
    title: '凡达林的失落矿坑 (LMoP)',
    author: 'Wizards of the Coast',
    minLevel: 1,
    maxLevel: 5,
    duration: '4~6次',
    setting: '费伦，凡达林',
    styleLabel: '新人模组，战斗居多，事件驱动，传统英雄故事，线性',
    summary: '最经典的DND 5E入门模组。玩家受雇护送物资前往凡达林，却卷入了一场寻找失落魔法矿坑的冒险。非常适合新手DM和玩家学习规则。',
    imageUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=600&auto=format&fit=crop', // Mine/Cave theme
    tags: ['新人模组', '战斗居多', '事件驱动', '传统英雄故事', '线性'],
    
    artScore: 2,
    storyScore: 5,
    dmFriendlyScore: 4,
    complexityScore: 1,
    
    link: 'https://pan.quark.cn/s/42f76e84cf9f',
    qqGroup: '570879430',
    fvtt: true,
    hasMusic: true
  },
  {
    id: '9',
    title: '冰塔峰之龙 (Dragon of Icespire Peak)',
    author: 'Wizards of the Coast',
    minLevel: 1,
    maxLevel: 6,
    duration: '6~8次',
    setting: '费伦，凡达林',
    styleLabel: '新人模组，战斗居多，事件驱动，传统英雄故事，沙盒',
    summary: '凡达林矿坑的优秀继任者，包含任务板机制的沙盒冒险。玩家将在凡达林周边地区完成各种任务，最终面对盘踞在冰塔峰的白龙。',
    imageUrl: 'https://images.unsplash.com/photo-1456428746267-a1756408f782?q=80&w=600&auto=format&fit=crop', // Snowy Mountain
    tags: ['新人模组', '战斗居多', '事件驱动', '传统英雄故事', '沙盒'],
    
    artScore: 3,
    storyScore: 3,
    dmFriendlyScore: 3,
    complexityScore: 2,
    
    link: 'https://pan.quark.cn/s/8bddf3e61019',
    qqGroup: '570879430',
    fvtt: true,
    hasMusic: true
  },
  {
    id: '3',
    title: '深水城：龙金劫 (Dragon Heist)',
    author: 'Wizards of the Coast',
    minLevel: 1,
    maxLevel: 5,
    duration: '5~7次',
    setting: '费伦，深水城',
    styleLabel: '模拟经营，事件驱动，交涉居多，深水城资源书，派系争纷，线性',
    summary: '一场发生在辉煌都市深水城内的寻宝竞赛。玩家需要在大反派（四个季节对应不同反派）的眼皮底下找到传说中的五十万金龙币。包含酒馆经营要素。',
    imageUrl: 'https://images.unsplash.com/photo-1542256851-967886915152?q=80&w=600&auto=format&fit=crop', // City theme
    tags: ['模拟经营', '事件驱动', '交涉居多', '深水城资源书', '派系争纷', '线性'],
    
    artScore: 4,
    storyScore: 2,
    dmFriendlyScore: 3,
    complexityScore: 4,
    
    link: 'https://pan.quark.cn/s/47022bb5f022',
    qqGroup: '947826784',
    fvtt: true,
    hasMusic: true
  },
  {
    id: '10',
    title: '风骇岛之龙 (Dragons of Stormwreck Isle)',
    author: 'Wizards of the Coast',
    minLevel: 1,
    maxLevel: 3,
    duration: '3~4次',
    setting: '费伦，宝剑海风骇岛',
    styleLabel: '新人模组，三要素均衡，人物驱动，线性',
    summary: '官方最新的新手入门套装。位于宝剑海的风骇岛曾是龙族战场。玩家将探索岛屿秘密，非常适合从未接触过DND的纯萌新。',
    imageUrl: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=600&auto=format&fit=crop', // Island/Sea
    tags: ['新人模组', '三要素均衡', '人物驱动', '线性'],
    
    artScore: 3,
    storyScore: 5,
    dmFriendlyScore: 5,
    complexityScore: 1,
    
    link: 'https://pan.quark.cn/s/c22aeaccec3f',
    qqGroup: '570879430',
    fvtt: true,
    hasMusic: true
  },
  {
    id: '11',
    title: '怪奇物语：欢迎来到地狱火俱乐部',
    author: 'Wizards of the Coast / Netflix',
    minLevel: 1,
    maxLevel: 3,
    duration: '4次',
    setting: '霍金斯',
    styleLabel: 'DND设定下的前四季故事，粉丝向作品',
    summary: '基于热门剧集《怪奇物语》改编的D&D冒险。扮演麦克、达斯汀等主角团成员，或是作为地狱火俱乐部的一员，体验剧集中的惊悚氛围。',
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=600&auto=format&fit=crop', // Retro/Dark
    tags: ['DND设定下的前四季故事', '粉丝向作品'],
    
    artScore: 5,
    storyScore: 3,
    dmFriendlyScore: 5,
    complexityScore: 1,
    
    link: 'https://pan.quark.cn/s/b2064db58c6a',
    qqGroup: '',
    fvtt: false,
    hasMusic: false
  },
  {
    id: '2',
    title: '斯特拉德的诅咒 (Curse of Strahd)',
    author: 'WotC / Hickman',
    minLevel: 1,
    maxLevel: 10,
    duration: '20~30次',
    setting: '鸦阁魔域，巴洛维亚',
    styleLabel: '哥特恐怖，沙盒，高难度，沉浸式体验，角色扮演',
    summary: '公认的5E巅峰之作。玩家被迷雾卷入吸血鬼领主斯特拉德的领地。这里的每一寸土地都充满了绝望与恶意。含有塔罗牌占卜机制，重玩性极高。',
    imageUrl: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=600&auto=format&fit=crop', // Gothic/Dark theme
    tags: ['恐怖', '沙盒', '吸血鬼', '高难度'],
    
    artScore: 5,
    storyScore: 5,
    dmFriendlyScore: 2,
    complexityScore: 5,
    
    link: 'https://pan.quark.cn/s/example2',
    fvtt: true,
    hasMusic: true
  },
  {
    id: '4',
    title: '湮灭之墓 (Tomb of Annihilation)',
    author: 'Wizards of the Coast',
    minLevel: 1,
    maxLevel: 11,
    duration: '25~35次',
    setting: '楚尔特丛林',
    styleLabel: '六角格探索，地牢爬行，高致死率，生存，陷阱',
    summary: '死亡诅咒正在蔓延，死者无法复活。玩家必须深入充满恐龙和丧尸的原始丛林，寻找名为“魂冢”的邪恶神器。经典的“绞肉机”风格地牢。',
    imageUrl: 'https://images.unsplash.com/photo-1550757750-4ce187a65014?q=80&w=600&auto=format&fit=crop', // Jungle theme
    tags: ['探索', '生存', '高难度', '地牢'],
    
    artScore: 4,
    storyScore: 3,
    dmFriendlyScore: 3,
    complexityScore: 5,
    
    link: 'https://pan.quark.cn/s/example4',
    hasMusic: false
  },
  {
    id: '5',
    title: '冰风谷：霜大妈 (Rime of the Frostmaiden)',
    author: 'Wizards of the Coast',
    minLevel: 1,
    maxLevel: 12,
    duration: '25~35次',
    setting: '冰风谷，十镇',
    styleLabel: '生存恐怖，沙盒，极地，克苏鲁元素，阴暗',
    summary: '冰风谷已经被无尽的黑夜笼罩了两年。玩家需要在严寒、饥饿和疯狂中生存下来，揭开冰霜少女奥吕尔的秘密，并探索埋藏在冰川下的古老城市。',
    imageUrl: 'https://images.unsplash.com/photo-1518182170546-0766aaef31df?q=80&w=600&auto=format&fit=crop', // Snow/Ice theme
    tags: ['恐怖', '生存', '沙盒', '极地'],
    
    artScore: 5,
    storyScore: 4,
    dmFriendlyScore: 3,
    complexityScore: 4,
    
    link: 'https://pan.quark.cn/s/example5',
    fvtt: true,
    hasMusic: true
  },
  {
    id: '6',
    title: '坠入阿佛纳斯 (Descent into Avernus)',
    author: 'Wizards of the Coast',
    minLevel: 1,
    maxLevel: 13,
    duration: '20~30次',
    setting: '博德之门，九层地狱',
    styleLabel: '史诗，位面旅行，载具战斗，道德抉择，线性',
    summary: '从博德之门的腐败街道开始，一路杀入九层地狱的第一层——阿佛纳斯。这不仅是关于救赎一座城市，更是关于救赎堕落天使扎瑞尔的史诗战役。包含“地狱摩托”战车玩法。',
    imageUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=600&auto=format&fit=crop', // Fire/Hell theme
    tags: ['地狱', '史诗', '战斗', '线性'],
    
    artScore: 5,
    storyScore: 3,
    dmFriendlyScore: 2,
    complexityScore: 3,
    
    link: 'https://pan.quark.cn/s/example6',
    fvtt: true
  },
  {
    id: '7',
    title: '烛堡谜团 (Candlekeep Mysteries)',
    author: 'Various',
    minLevel: 1,
    maxLevel: 16,
    duration: '单团 1~2次',
    setting: '烛堡，多元宇宙',
    styleLabel: '短篇合集，解谜，调查，轻松，单元剧',
    summary: '包含17个独立的短篇冒险，每个都围绕一本神秘的书籍展开。非常适合插入现有战役或作为单次团（One-shot）游玩。风格各异，从幽默到惊悚应有尽有。',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop', // Library/Book theme
    tags: ['短篇', '解谜', '合集', '灵活'],
    
    artScore: 4,
    storyScore: 4,
    dmFriendlyScore: 5,
    complexityScore: 2,
    
    link: 'https://pan.quark.cn/s/example7',
    hasMusic: false
  },
  {
    id: '8',
    title: '雷霆风暴 (Storm King\'s Thunder)',
    author: 'Wizards of the Coast',
    minLevel: 1,
    maxLevel: 11,
    duration: '20~30次',
    setting: '费伦北地',
    styleLabel: '广阔沙盒，巨人，旅行，史诗战斗，无论是谁',
    summary: '巨人的秩序被打破，他们开始肆虐北地。玩家需要周游广阔的费伦大陆，寻找对抗巨人的力量。典型的“公路片”式冒险，拥有极其庞大的地图探索空间。',
    imageUrl: 'https://images.unsplash.com/photo-1465153690352-10c1b29cf3a7?q=80&w=600&auto=format&fit=crop', // Mountain theme
    tags: ['沙盒', '巨人', '旅行', '战斗'],
    
    artScore: 3,
    storyScore: 3,
    dmFriendlyScore: 3,
    complexityScore: 3,
    
    link: 'https://pan.quark.cn/s/example8',
    fvtt: false
  }

  // === 复制下方代码块来添加新模组 (请确保 ID 唯一) ===
  // ,{
  //   id: 'new-001', 
  //   title: '新模组名称',
  //   author: '作者',
  //   minLevel: 1,
  //   maxLevel: 3,
  //   duration: '预计耗时',
  //   setting: '世界观',
  //   styleLabel: '标签1，标签2',
  //   summary: '简介',
  //   imageUrl: 'https://images.unsplash.com/photo-1518182170546-0766aaef31df',
  //   tags: ['标签1', '标签2'],
  //   artScore: 3,
  //   storyScore: 3,
  //   dmFriendlyScore: 3,
  //   complexityScore: 3,
  //   link: 'https://链接',
  //   fvtt: false
  // }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    moduleId: '1',
    username: '老DM',
    rating: 5,
    content: '永远的经典！第一次带团就是这个，第一章的地精伏击简直是新人杀手，哈哈哈。',
    date: '2023-10-15'
  },
  {
    id: 'r2',
    moduleId: '1',
    username: '新手玩家A',
    rating: 4,
    content: '故事很棒，但是红袍法师那个支线有点摸不着头脑。',
    date: '2023-11-02'
  },
  {
    id: 'r3',
    moduleId: '2',
    username: '吸血鬼猎人',
    rating: 5,
    content: '氛围感无敌！建议配合恐怖音乐游玩。不过对DM要求很高，准备工作量巨大。',
    date: '2024-01-20'
  }
];

export const STATIC_CONTENT = {
  intro: {
    title: '使用须知 & 评分标准',
    content: `
      ### 欢迎来到 DND5E资源不全集

      本库数据整理自 B站UP主 倒霉的戈蓝。
      [点击观看模组评测合集视频](https://www.bilibili.com/video/BV1qX4y1e7j5/?share_source=copy_web&vd_source=5e503c1c5b02e2d930fb14397340ae93)

      #### 免责声明
      1. 模组评分仅代表整理者个人观点，链接分享仅供学习交流使用。
      2. 商用请联系版权方。本站推荐模组均为已翻译且详细了解过的作品。
      3. 目前已翻译模组绝大多数为免费分享，请勿上当受骗购买电子版。

      #### 评分指标说明
      故事连贯性：原剧情前后逻辑是否通畅，以及需要DM修改填补漏洞的程度。
      DM友好度：模组提供的资料相对于剧情需求是否充足，以及带出预期效果的难度。
      故事复杂度：故事背景涵盖元素、势力和信息的丰富程度。

      #### 分级标准 (Tiers)
      T1: 1~4级
      T2: 5~10级
      T3: 11~16级
      T4: 17~20级
      DDAL: 冒险者联盟系列
      短故事集: 特定等级的单次或几次的冒险

      关于战斗难度的注脚：
      5E官模战斗设计假设：正常Build（体质14，主属性16），四人小队（战法牧贼），无专长，无兼职，三宝书资源+无额外魔法物品，一天2~3短休，5~7战。
      现实情况中DM普遍开放更多资源，且战斗频率较低。因此官方模组在2级以后的战斗基本无难度，不纳入考量标准。
    `
  },
  modulesNote: '所有一级开卡的模组均建议二级开卡。',
  dmResources: {
    title: '带团资源 (DM Tools)',
    items: [
      { name: '5E.TOOLS', desc: '最全的 DND 5E 规则查询网站', url: 'https://5e.kiwee.top/index.html' },
      { name: '纯美苹果园', desc: '国内最大的 TRPG 论坛，拥有大量中文翻译规则', url: 'http://www.goddessfantasy.net/bbs/index.php' }
    ]
  },
  playerResources: {
    title: '玩家资源 (Player Tools)',
    items: [
      { name: '法术查询', desc: '快速查找法术效果、成分和环阶', url: 'https://5e.kiwee.top/spells.html#%e4%ba%a1%e8%80%85%e4%b8%a7%e9%92%9f_xge' },
      { name: '27buy计算器', desc: '在线进行DND 5E人物属性购点计算', url: '#point-buy' },
      { name: '骰子模拟器', desc: '忘记带骰子了？在线掷骰', url: '#dice-roller' }
    ]
  }
};