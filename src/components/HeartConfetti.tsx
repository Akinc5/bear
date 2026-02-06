import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Confetti {
  id: number;
  x: number;
  emoji: string;
  size: number;
  rotation: number;
  duration: number;
}

const confettiEmojis = ["💖", "💕", "💗", "💓", "✨", "🌸", "💝", "🩷", "❤️", "💘"];

export const HeartConfetti = ({ active }: { active: boolean }) => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    if (active) {
      const pieces: Confetti[] = [];
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
          size: Math.random() * 2 + 1,
          rotation: Math.random() * 720 - 360,
          duration: Math.random() * 2 + 2,
        });
      }
      setConfetti(pieces);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            fontSize: `${piece.size}rem`,
            top: "-50px",
          }}
          initial={{
            y: -50,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: "110vh",
            rotate: piece.rotation,
            opacity: [1, 1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            ease: "easeIn",
            delay: Math.random() * 0.5,
          }}
        >
          {piece.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default HeartConfetti;
