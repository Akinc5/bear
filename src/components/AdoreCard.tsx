import { useState } from "react";
import { motion } from "framer-motion";
import { TeddyBear } from "./TeddyBear";

interface AdoreCardProps {
  text: string;
  delay?: number;
  imageSrc?: string;
}

const reactions = ["faint", "blush", "excited", "dance"] as const;

export const AdoreCard = ({
  text,
  delay = 0,
  imageSrc,
}: AdoreCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [reaction, setReaction] =
    useState<(typeof reactions)[number]>("blush");

  const handleClick = () => {
    setIsFlipped(true);
    setReaction(reactions[Math.floor(Math.random() * reactions.length)]);

    setTimeout(() => {
      setIsFlipped(false);
    }, 2000);
  };

  return (
    <motion.div
      className="perspective-1000 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full"
        animate={{
          rotate: isFlipped ? 0 : [-2, 2, -2],
        }}
        transition={{
          duration: 0.4,
          repeat: isFlipped ? 0 : Infinity,
          repeatType: "reverse",
        }}
      >
        <motion.div
          className="glass-card rounded-2xl p-6 min-h-[160px] flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
          animate={{
            rotateY: isFlipped ? 180 : 0,
            scale: isFlipped ? 1.05 : 1,
          }}
          transition={{ duration: 2 }}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* FRONT SIDE */}
          {!isFlipped ? (
            <>
              {imageSrc && (
                <motion.img
                  src={imageSrc}
                  alt={text}
                  className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-pink-300"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10 }}
                />
              )}

              <p className="text-lg font-semibold text-foreground text-center">
                {text}
              </p>

              <span className="text-xs text-muted-foreground">
                tap me!
              </span>
            </>
          ) : (
            /* BACK SIDE */
            <motion.div
              initial={{ scale: 5 }}
              animate={{ scale: 5 }}
              transition={{ type: "spring", damping: 12 }}
              className="flex flex-col items-center gap-2"
              style={{ transform: "rotateY(180deg)" }}
            >
              <TeddyBear emotion={reaction} size="lg" />

              <span className="text-sm text-muted-foreground text-center">
                {reaction === "faint" && "I fainted! 😵💕"}
                {reaction === "blush" && "You make me blush! 🥰"}
                {reaction === "excited" && "SO HAPPY! 🎉"}
                {reaction === "dance" && "Dancing for joy! 💃"}
              </span>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdoreCard;
