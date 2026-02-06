import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const heartEmojis = ["💖", "💕", "💗", "💓", "💞", "🩷", "❤️", "✨", "🌸"];

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const createHeart = () => {
      const newHeart: Heart = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 2,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      };
      setHearts((prev) => [...prev.slice(-15), newHeart]);
    };

    const interval = setInterval(createHeart, 800);
    
    // Create initial hearts
    for (let i = 0; i < 8; i++) {
      setTimeout(createHeart, i * 200);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.x}%`,
              fontSize: `${heart.size}rem`,
            }}
            initial={{ y: "100vh", opacity: 0, scale: 0 }}
            animate={{
              y: "-20vh",
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.5],
              rotate: [0, 15, -15, 30],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              setHearts((prev) => prev.filter((h) => h.id !== heart.id));
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
