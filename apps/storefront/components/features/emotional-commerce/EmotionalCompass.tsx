'use client';
import { useEmotionalNavigation } from '@/hooks/use-emotional-navigation';

const EMOTIONAL_STATES = [
  {
    id: 'unstoppable-confidence',
    title: 'Unstoppable Confidence',
    description: 'For moments that demand your full presence',
    color: 'bg-red-500/20'
  },
  {
    id: 'quiet-rebellion', 
    title: 'Quiet Rebellion',
    description: 'Subtle statements that speak volumes',
    color: 'bg-blue-500/20'
  },
  {
    id: 'future-nostalgia',
    title: 'Future Nostalgia',
    description: 'Where memories meet dreams',
    color: 'bg-purple-500/20'
  },
  {
    id: 'urban-serenity',
    title: 'Urban Serenity',
    description: 'Peace in the concrete jungle', 
    color: 'bg-green-500/20'
  },
  {
    id: 'electric-vulnerability',
    title: 'Electric Vulnerability',
    description: 'Strength in opening up',
    color: 'bg-yellow-500/20'
  }
];

export function EmotionalCompass() {
  const { navigateToEmotion } = useEmotionalNavigation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center space-y-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
            How are you feeling today?
          </h1>
          <p className="text-xl text-gray-400">Where fashion meets feeling</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {EMOTIONAL_STATES.map((emotion) => (
            <button
              key={emotion.id}
              onClick={() => navigateToEmotion(emotion.id)}
              className={`${emotion.color} rounded-full w-40 h-40 flex items-center justify-center p-6 transition-all duration-700 hover:scale-110 hover:rotate-12 border border-white/10 backdrop-blur-sm`}
            >
              <div className="text-white text-center">
                <div className="text-xl font-semibold mb-2">{emotion.title}</div>
                <div className="text-xs opacity-80 leading-tight">{emotion.description}</div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-gray-400 text-lg animate-pulse">
          Not sure? Let your intuition guide you
        </p>
      </div>
    </div>
  );
}
