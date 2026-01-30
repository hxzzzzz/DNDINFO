export interface ModuleData {
  id: string;
  title: string;
  author: string;
  minLevel: number;
  maxLevel: number;
  summary: string;
  imageUrl: string;
  tags: string[];
  link: string; // The link provided by the user
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
