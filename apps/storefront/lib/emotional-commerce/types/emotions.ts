export type EmotionId = 
  | 'restless' 
  | 'hopeful' 
  | 'grounded' 
  | 'curious'
  | 'overwhelmed'
  | 'inspired'
  | 'nostalgic'
  | 'adventurous';

export interface Emotion {
  id: EmotionId;
  label: string;
  icon: string; // emoji or icon name
  color: {
    primary: string;
    gradient: [string, string];
  };
  description: string;
  keywords: string[]; // For product matching
  oppositeEmotion?: EmotionId;
}

export interface EmotionalState {
  currentEmotion: EmotionId | null;
  intensity: number; // 0-100
  timestamp: Date;
  previousEmotions: EmotionId[];
}
