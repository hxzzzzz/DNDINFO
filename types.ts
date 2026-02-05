export interface ModuleData {
  id: string;
  title: string;
  author?: string;
  minLevel: number;
  maxLevel: number;
  summary: string;
  imageUrl: string;
  tags: string[];
  
  // Detailed Fields
  duration: string;
  setting: string;
  styleLabel: string;
  
  // Ratings (out of 5)
  artScore: number;
  storyScore: number;
  dmFriendlyScore: number;
  complexityScore: number;
  
  // Links & Resources
  link: string;
  qqGroup?: string;
  fvtt?: boolean;
  hasMusic?: boolean;
}

export interface Review {
  id: string;
  moduleId: string;
  username: string;
  rating: number;
  content: string;
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type WikiSection = 'intro' | 'modules' | 'dm-resources' | 'player-resources';