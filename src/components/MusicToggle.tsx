import { useState, useRef } from "react";
import { motion } from "framer-motion";

const songs = [
  {
    title: "I Think They Call This Love",
    file: "/music/i-think-they-call-this-love.mp3",
  },
  {
    title: "Story of My Life",
    file: "/music/story-of-my-life.mp3",
  },
];

export const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const switchSong = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    const nextIndex = (songIndex + 1) % songs.length;
    setSongIndex(nextIndex);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 200);
  };

  return (
    <>
      {/* AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        src={songs[songIndex].file}
        loop
      />

      {/* MUSIC BUTTON */}
      <motion.div
        className="fixed top-4 right-4 z-40 flex gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {/* PLAY / PAUSE */}
        <motion.button
          className="glass-card rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-transform"
          onClick={toggleMusic}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="text-xl"
            animate={isPlaying ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.6, repeat: isPlaying ? Infinity : 0 }}
          >
            {isPlaying ? "🎵" : "🎧"}
          </motion.span>

          <span className="text-sm font-medium text-foreground">
            {isPlaying ? "Playing…" : "Play our song"}
          </span>

          {isPlaying && (
            <motion.div className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-primary rounded-full"
                  animate={{ height: [4, 12, 4] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.button>

        {/* SWITCH SONG */}
        <motion.button
          className="glass-card rounded-full px-3 py-2 text-sm hover:scale-105"
          whileTap={{ scale: 0.95 }}
          onClick={switchSong}
        >
          🔁
        </motion.button>
      </motion.div>

      {/* SONG NAME */}
      {isPlaying && (
        <motion.div
          className="fixed top-20 right-4 text-xs text-foreground/80 glass-card px-3 py-1 rounded-full z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {songs[songIndex].title}
        </motion.div>
      )}
    </>
  );
};

export default MusicToggle;
