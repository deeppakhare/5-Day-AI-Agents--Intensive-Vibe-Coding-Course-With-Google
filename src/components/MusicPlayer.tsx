import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  // We use an empty audio object, users would typically supply a valid audio source url.
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // audioRef.current.play(); // commented out since no actual source
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <audio ref={audioRef} loop src="#" />
      
      <AnimatePresence>
        {showControls && (
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center gap-2 glass-panel rounded-full px-4 py-2"
          >
            <button onClick={togglePlay} className="text-white hover:text-[#9d4edd] transition-colors" id="btn-play">
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button onClick={toggleMute} className="text-white hover:text-[#9d4edd] transition-colors" id="btn-mute">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#9d4edd]" 
                animate={{ width: isPlaying && !isMuted ? ['20%', '80%', '40%', '90%', '30%'] : '0%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setShowControls(!showControls)}
        className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white hover:border-[#9d4edd] transition-all"
        id="btn-music-toggle"
      >
        <motion.div animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
          <div className="w-6 h-6 rounded-full border-2 border-white/50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#9d4edd]" />
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}
