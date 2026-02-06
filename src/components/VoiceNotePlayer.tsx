import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceNotePlayerProps {
  isOpen: boolean;
  onClose: () => void;
  onAudioEnd: () => void;
}

export const VoiceNotePlayer = ({
  isOpen,
  onClose,
  onAudioEnd,
}: VoiceNotePlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  // Start audio when modal opens
  useEffect(() => {
    if (isOpen && audioRef.current) {
      const audio = audioRef.current;

      audio.currentTime = 0;
      audio.volume = 1;
      audio.play();
      setIsPlaying(true);
      setHasEnded(false);

      // OPTIONAL: pause background music if you have one
      const bgMusic = document.getElementById("bg-music") as HTMLAudioElement | null;
      if (bgMusic) bgMusic.pause();

      const updateProgress = () => {
        if (!audio.duration) return;
        setProgress((audio.currentTime / audio.duration) * 100);
      };

      audio.addEventListener("timeupdate", updateProgress);

      audio.onended = () => {
        setIsPlaying(false);
        setHasEnded(true);
        setProgress(100);
        onAudioEnd();

        if (bgMusic) bgMusic.play();
      };

      return () => {
        audio.pause();
        audio.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [isOpen, onAudioEnd]);

  const handleReplay = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
    setHasEnded(false);
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 p-8"
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 15 }}
        >
          {/* AUDIO */}
          <audio ref={audioRef} src="/audio/voice-note.mp4" />

          {/* Teddy */}
          <motion.div
            className="relative"
            animate={
              isPlaying
                ? { scale: [1, 1.03, 1], rotate: [-2, 2, -2] }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-5xl">
              🎧
            </div>
            <motion.div
              className="text-9xl"
              animate={isPlaying ? { y: [0, -5, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🧸
            </motion.div>
          </motion.div>

          {/* Text */}
          <p className="text-white/90 text-lg font-romantic text-center">
            {isPlaying
              ? "Shh… listen with your heart 💖"
              : hasEnded
              ? "That was just for you 🥹💕"
              : "Something special just for you…"}
          </p>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-valentine-pink to-valentine-rose"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          {hasEnded && (
            <div className="flex gap-3 mt-4">
              <motion.button
                className="btn-valentine"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReplay}
              >
                Listen again 🔄💖
              </motion.button>
              <motion.button
                className="btn-valentine"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
              >
                Continue 🥹
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceNotePlayer;
