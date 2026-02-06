import { motion } from "framer-motion";

type BearEmotion = "shy" | "happy" | "nervous" | "excited" | "faint" | "blush" | "dance" | "hug" | "peek";

interface TeddyBearProps {
  emotion?: BearEmotion;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  withHeart?: boolean;
}

const sizeClasses = {
  sm: "text-4xl",
  md: "text-6xl",
  lg: "text-8xl",
  xl: "text-9xl",
};

const emotionAnimations = {
  shy: {
    animate: { rotate: [-5, 5, -5], scale: [1, 0.95, 1] },
    transition: { duration: 2, repeat: Infinity },
  },
  happy: {
    animate: { y: [0, -10, 0], rotate: [0, 5, -5, 0] },
    transition: { duration: 0.8, repeat: Infinity },
  },
  nervous: {
    animate: { x: [-3, 3, -3], rotate: [-2, 2, -2] },
    transition: { duration: 0.3, repeat: Infinity },
  },
  excited: {
    animate: { scale: [1, 1.1, 1], rotate: [-10, 10, -10] },
    transition: { duration: 0.5, repeat: Infinity },
  },
  faint: {
    animate: { rotate: [0, 90], y: [0, 20], opacity: [1, 0.6] },
    transition: { duration: 0.5 },
  },
  blush: {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 1, repeat: Infinity },
  },
  dance: {
    animate: { y: [0, -15, 0], rotate: [-10, 10, -10, 10, 0] },
    transition: { duration: 0.6, repeat: Infinity },
  },
  hug: {
    animate: { scale: [1, 1.15, 1.1] },
    transition: { duration: 0.8 },
  },
  peek: {
    animate: { x: [-10, 0], opacity: [0.5, 1] },
    transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" as const },
  },
};

export const TeddyBear = ({ emotion = "happy", size = "md", className = "", withHeart = false }: TeddyBearProps) => {
  const animation = emotionAnimations[emotion];

  return (
    <motion.div
      className={`inline-flex items-center gap-2 ${sizeClasses[size]} ${className}`}
      {...animation}
    >
      <span role="img" aria-label="teddy bear">🧸</span>
      {withHeart && (
        <motion.span
          className="animate-heartbeat"
          role="img"
          aria-label="heart"
        >
          💖
        </motion.span>
      )}
      {emotion === "blush" && (
        <span className="absolute -right-2 -top-2 text-2xl animate-sparkle">✨</span>
      )}
    </motion.div>
  );
};

export const TeddyBearCouple = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`flex items-center justify-center gap-4 text-7xl ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.span
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🧸
      </motion.span>
      <motion.span
        className="text-5xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        💕
      </motion.span>
      <motion.span
        animate={{ x: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
      >
        🧸
      </motion.span>
    </motion.div>
  );
};

export default TeddyBear;
