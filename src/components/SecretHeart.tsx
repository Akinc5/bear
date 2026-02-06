import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SecretHeart = () => {
  const [tapCount, setTapCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const handleTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    
    if (newCount >= 3) {
      setShowSecret(true);
      setTapCount(0);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 opacity-20 hover:opacity-40 transition-opacity z-40"
        onClick={handleTap}
        whileTap={{ scale: 0.9 }}
        aria-label="Secret heart"
      >
        <span className="text-2xl">💝</span>
      </motion.button>

      <AnimatePresence>
        {showSecret && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSecret(false)}
          >
            <motion.div
              className="glass-card rounded-3xl p-8 max-w-sm text-center relative"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🧸💋
              </motion.div>
              
              <p className="text-lg font-romantic text-foreground leading-relaxed mb-4">
                "You're my favorite notification, my safest place, and my forever 🥹🐻❤️"
              </p>
              
              <motion.div
                className="flex justify-center items-center gap-2 text-4xl"
                animate={{ 
                  x: [0, 5, 0, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>🧸</span>
                <motion.span
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💖
                </motion.span>
              </motion.div>

              <motion.p
                className="text-sm text-muted-foreground mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                (tap outside to close)
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SecretHeart;
