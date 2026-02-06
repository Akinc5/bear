import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FloatingHearts from "@/components/FloatingHearts";
import TypewriterText from "@/components/TypewriterText";
import { TeddyBear, TeddyBearCouple } from "@/components/TeddyBear";
import AdoreCard from "@/components/AdoreCard";
import HeartConfetti from "@/components/HeartConfetti";
import SecretHeart from "@/components/SecretHeart";
import MusicToggle from "@/components/MusicToggle";
import VoiceNotePlayer from "@/components/VoiceNotePlayer";

type Scene = "opening" | "love-story" | "reasons" | "proposal" | "celebration";

const MIN_THINK_SCALE = 0.3;
const SCALE_STEP = 0.15;

const Index = () => {
  const [scene, setScene] = useState<Scene>("opening");
  const [showButton, setShowButton] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const [thinkScale, setThinkScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);

  const [showPSMessage, setShowPSMessage] = useState(false);
  const [showVoiceButton, setShowVoiceButton] = useState(false);
  const [showVoiceNote, setShowVoiceNote] = useState(false);
  const [voiceNoteEnded, setVoiceNoteEnded] = useState(false);

  const hideThink = thinkScale <= MIN_THINK_SCALE;

  useEffect(() => {
    if (scene === "opening") {
      const t = setTimeout(() => setShowButton(true), 3500);
      return () => clearTimeout(t);
    }
  }, [scene]);

  useEffect(() => {
    if (scene === "celebration") {
      const t = setTimeout(() => setShowPSMessage(true), 5000);
      return () => clearTimeout(t);
    }
  }, [scene]);

  const handleThink = () => {
    setThinkScale((prev) => Math.max(prev - SCALE_STEP, 0));
    setYesScale((prev) => prev + SCALE_STEP);
  };

  const handleAccept = () => {
    setShowCelebration(true);
    setScene("celebration");
  };

  const handleVoiceNoteEnd = () => {
    setVoiceNoteEnded(true);
    setShowVoiceNote(false);
  };

  const adoreReasons = [
  {
    text: "Your smile",
    imageSrc: "/images/her-smile.jpeg",
  },
  {
    text: "Your voice",
    imageSrc: "/images/her-voice.jpeg",
  },
  {
    text: "The way you laugh",
    imageSrc: "/images/her-laugh.jpeg",
  },
  {
    text: "Your hugs",
    imageSrc: "/images/her-hugs.jpeg",
  },
  {
    text: "The way you exist",
    imageSrc: "/images/her-exist.jpeg",
  },
  {
    text: "Everything about you",
    imageSrc: "/images/her-everything.jpeg",
  },
];


  return (
    <div className="min-h-screen bg-valentine-gradient overflow-x-hidden">
      <FloatingHearts />
      <MusicToggle />
      <SecretHeart />
      <HeartConfetti active={showCelebration} />

      <div className="relative z-10">
        <AnimatePresence mode="wait">

          {/* OPENING */}
          {scene === "opening" && (
            <motion.section
              key="opening"
              className="min-h-screen flex items-center justify-center px-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="space-y-8 max-w-md">
                <TypewriterText
                  text="Hi Gugu👀💖"
                  speed={90}
                  className="text-3xl font-bold"
                />

                <TypewriterText
                  text="Yes,I made something just for you."
                  delay={200}
                  speed={60}
                  className="text-xl text-muted-foreground"
                />

                <TeddyBear emotion="peek" size="xl" />

                {showButton && (
                  <motion.button
                    className="btn-valentine text-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setScene("love-story")}
                  >
                    Okay… Lets go 🐻👉
                  </motion.button>
                )}
              </div>
            </motion.section>
          )}

          {/* LOVE STORY */}
          {scene === "love-story" && (
            <motion.section
              key="love-story"
              className="min-h-screen flex items-center justify-center px-6 text-center"
            >
              <div className="space-y-10 max-w-lg">
                <p className="text-3xl font-romantic">
                  Somewhere between laughs , little moments and Small Gussa…
                </p>

                <TeddyBearCouple />

                <p className="text-3xl font-romantic">
                  You became my favorite person Gugu ji💕
                </p>

                <button
                  className="btn-valentine"
                  onClick={() => setScene("reasons")}
                >
                  wait we have more 🥹
                </button>
              </div>
            </motion.section>
          )}

          {/* REASONS */}
          {scene === "reasons" && (
            <motion.section
              key="reasons"
              className="min-h-screen px-6 py-16"
            >
              <h2 className="text-4xl font-romantic text-center mb-12">
                Reasons I Adore You 💝
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
                {adoreReasons.map((r, i) => (
                  <AdoreCard
                    key={r.text}
                    text={r.text}
                    imageSrc={r.imageSrc}
                    delay={i * 0.15}
                  />

                ))}
              </div>

              <div className="text-center">
                <button
                  className="btn-valentine"
                  onClick={() => setScene("proposal")}
                >
                  But wait… 🥹
                </button>
              </div>
            </motion.section>
          )}

          {/* PROPOSAL */}
          {scene === "proposal" && (
            <motion.section
              key="proposal"
              className="min-h-screen flex items-center justify-center px-6 text-center"
            >
              <div className="space-y-10 max-w-md">
                <p className="text-2xl">
                  I have been blessed u came into my life and it started to bloom soooooooo <strong>Gugu</strong> I have something really important to ask something really important to ask you…
                </p>

                <TeddyBear emotion="nervous" size="xl" withHeart />

                <h1 className="text-5xl font-romantic">
                  Will you be my Valentine? 💝🐻
                </h1>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="btn-valentine text-xl animate-heartbeat"
                    style={{ scale: yesScale }}
                    onClick={handleAccept}
                  >
                    YES 💖
                  </motion.button>

                  {!hideThink && (
                    <motion.button
                      className="btn-valentine text-xl"
                      style={{ scale: thinkScale }}
                      onClick={handleThink}
                    >
                      Let me think… 🤔
                    </motion.button>
                  )}
                </div>

                {thinkScale < 0.7 && !hideThink && (
                  <p className="text-black-200 text-sm">
                    the bears are getting impatient… 🐻👀
                  </p>
                )}
              </div>
            </motion.section>
          )}

          {/* CELEBRATION */}
          {scene === "celebration" && (
            <motion.section
              key="celebration"
              className="min-h-screen flex items-center justify-center px-6 text-center"
            >
              <div className="space-y-8 max-w-md">
                <h1 className="text-5xl font-romantic">YAY!!! 🎉</h1>

                <p className="text-2xl">
                  You just made me the happiest person ever 💕
                </p>

                {showPSMessage && (
                  <div className="glass-card p-6">
                    <TypewriterText
                      text="PS: I love you more than this website… and that’s saying a LOT 💖🐻"
                      speed={50}
                      onComplete={() => setShowVoiceButton(true)}
                    />
                  </div>
                )}

                {showVoiceButton && !voiceNoteEnded && (
                  <button
                    className="btn-valentine"
                    onClick={() => setShowVoiceNote(true)}
                  >
                    There’s something I want you to hear… 🥹🎧
                  </button>
                )}

                {voiceNoteEnded && (
                  <p className="text-xl font-romantic">
                    Forever yours, always 🐻❤️
                  </p>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <VoiceNotePlayer
        isOpen={showVoiceNote}
        onClose={() => setShowVoiceNote(false)}
        onAudioEnd={handleVoiceNoteEnd}
      />
    </div>
  );
};

export default Index;
