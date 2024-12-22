"use client"

import { motion } from "framer-motion"

export function LoadingAnimation() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1c375b] to-[#2c4a7c]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative flex flex-col items-center justify-center"
      >
        <motion.div
          className="relative h-32 w-32"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="absolute h-16 w-16 rounded-lg bg-white"
              style={{
                top: index < 2 ? 0 : "50%",
                left: index % 2 === 0 ? 0 : "50%",
              }}
              animate={{
                scale: [1, 0.8, 1],
                rotate: [0, 90, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.span
            className="text-3xl font-bold text-white"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            CLA.app
          </motion.span>
          <motion.p
            className="mt-2 text-lg text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            Loading your learning experience...
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

