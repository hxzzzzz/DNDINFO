import { ModuleData } from './types';

// INSTRUCTIONS FOR USER:
// Please replace the data below with the information from your spreadsheet (https://docs.qq.com/sheet/DQXJmZWhrSkNKUXR6).
// Keep the structure (id, title, author, levels, summary, tags, link).

export const MOCK_MODULES: ModuleData[] = [
  {
    id: '1',
    title: '低语墓穴 (The Whispering Crypt)',
    author: '大魔法师瓦伦',
    minLevel: 1,
    maxLevel: 3,
    summary: '适合新手的经典地牢探险。当地的墓园变得躁动不安，村民们报告说墓穴深处传来了奇怪的吟唱声。',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    tags: ['亡灵', '地牢', '新手'],
    link: 'https://example.com/whispering-crypt.pdf'
  },
  {
    id: '2',
    title: '镀金尖塔的劫案 (Heist at the Gilded Spire)',
    author: '暗影公会',
    minLevel: 4,
    maxLevel: 6,
    summary: '一场高风险的城市冒险。玩家必须在晚宴期间潜入巫师塔，窃取一件被诅咒的神器。',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    tags: ['城市', '劫案', '角色扮演', '潜行'],
    link: 'https://example.com/gilded-spire'
  },
  {
    id: '3',
    title: '沉没海岸的诅咒 (Curse of the Sunken Coast)',
    author: '布里格船长',
    minLevel: 5,
    maxLevel: 8,
    summary: '海盗、海怪以及波涛之下的古老神庙。需要水下战斗规则支持。',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    tags: ['航海', '探索', '战斗'],
    link: 'https://example.com/sunken-coast'
  },
  {
    id: '4',
    title: '龙王之谷 (Valley of the Dragon Lords)',
    author: '长老派拉',
    minLevel: 10,
    maxLevel: 12,
    summary: '深入群山，与远古红龙进行谈判的史诗旅程。致死率极高。',
    imageUrl: 'https://picsum.photos/400/300?random=4',
    tags: ['龙', '社交', 'Boss战'],
    link: 'https://example.com/dragon-lords'
  },
  {
    id: '5',
    title: '月港庄园谋杀案 (Murder at Moonhaven Manor)',
    author: '希尔弗女士',
    minLevel: 2,
    maxLevel: 4,
    summary: '暴风雪中偏远庄园内发生的悬疑案件。侧重于调查和寻找线索。',
    imageUrl: 'https://picsum.photos/400/300?random=5',
    tags: ['悬疑', '恐怖', '解谜'],
    link: 'https://example.com/moonhaven'
  },
  {
    id: '6',
    title: '发条迷宫 (The Clockwork Labyrinth)',
    author: '侏儒工匠协会',
    minLevel: 7,
    maxLevel: 9,
    summary: '由疯狂AI构造体控制的不断变化的地牢。充满了陷阱和谜题。',
    imageUrl: 'https://picsum.photos/400/300?random=6',
    tags: ['构造体', '谜题', '陷阱'],
    link: 'https://example.com/clockwork'
  }
];