"use client"

import { motion } from "framer-motion"
import { Heart, Share2, BookOpen, Coffee, Star, Github, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { BackButton } from "./back-button"

interface SupportOption {
  title: string
  description: string
  icon: React.ReactNode
  action: () => void
  color: string
}

interface SupportUsViewProps {
  onClose: () => void
}

export function SupportUsView({ onClose }: SupportUsViewProps) {
  const supportOptions: SupportOption[] = [
    {
      title: "Buy us a coffee",
      description: "Support our development with a small donation",
      icon: <Coffee className="h-6 w-6" />,
      action: () => window.open('https://paypal.com', '_blank'),
      color: "bg-[#ff9f43]"
    },
    {
      title: "Share CLA.app",
      description: "Help us grow by sharing with your network",
      icon: <Share2 className="h-6 w-6" />,
      action: () => window.open('https://twitter.com/intent/tweet?text=Check%20out%20CLA.app!', '_blank'),
      color: "bg-[#54a0ff]"
    },
    {
      title: "Contribute Content",
      description: "Create and share educational content",
      icon: <BookOpen className="h-6 w-6" />,
      action: () => window.open('https://github.com', '_blank'),
      color: "bg-[#10ac84]"
    },
    {
      title: "Star on GitHub",
      description: "Support our open source journey",
      icon: <Github className="h-6 w-6" />,
      action: () => window.open('https://github.com', '_blank'),
      color: "bg-[#222f3e]"
    },
    {
      title: "Follow on Twitter",
      description: "Stay updated with our latest news",
      icon: <Twitter className="h-6 w-6" />,
      action: () => window.open('https://twitter.com', '_blank'),
      color: "bg-[#2e86de]"
    },
    {
      title: "Become a Patron",
      description: "Get exclusive benefits and support our mission",
      icon: <Star className="h-6 w-6" />,
      action: () => window.open('https://patreon.com', '_blank'),
      color: "bg-[#ee5253]"
    }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl bg-white p-6 shadow-xl"
      >
        <BackButton onClick={onClose} />
        <div className="mb-6 mt-8 text-center">
          <div className="mb-2 flex justify-center">
            <Heart className="h-12 w-12 text-[#d2544a]" />
          </div>
          <h2 className="text-3xl font-bold text-[#1c375b]">Support CLA.app</h2>
          <p className="mt-2 text-[#6f8197]">
            Help us make education accessible to everyone
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {supportOptions.map((option) => (
            <motion.button
              key={option.title}
              onClick={option.action}
              className={`${option.color} flex flex-col items-center rounded-lg p-6 text-white transition-transform hover:scale-105`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option.icon}
              <h3 className="mt-4 font-semibold">{option.title}</h3>
              <p className="mt-2 text-sm text-white/90">{option.description}</p>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-[#6f8197]">
          Every contribution helps us improve and grow. Thank you for your support! ❤️
        </div>
      </motion.div>
    </div>
  )
}

