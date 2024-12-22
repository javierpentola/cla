"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Flashcard {
  id: number
  question: string
  answer: string
}

interface Unit {
  id: number
  title: string
  flashcards: Flashcard[]
}

const mockUnits: Unit[] = [
  {
    id: 1,
    title: "Basic Math",
    flashcards: [
      { id: 1, question: "What is 8 × 7?", answer: "56" },
      { id: 2, question: "What is the square root of 144?", answer: "12" },
      { id: 3, question: "What is 15% of 80?", answer: "12" },
    ]
  },
  {
    id: 2,
    title: "Advanced Math",
    flashcards: [
      { id: 1, question: "What is the derivative of x²?", answer: "2x" },
      { id: 2, question: "What is sin(90°)?", answer: "1" },
      { id: 3, question: "What is log₁₀(100)?", answer: "2" },
    ]
  },
  {
    id: 3,
    title: "Physics",
    flashcards: [
      { id: 1, question: "What is Newton's First Law?", answer: "An object will remain at rest or in uniform motion unless acted upon by an external force" },
      { id: 2, question: "What is the unit of force?", answer: "Newton (N)" },
      { id: 3, question: "What is E=mc²?", answer: "Energy equals mass times speed of light squared" },
    ]
  }
]

export function Flashcards() {
  const [selectedUnit, setSelectedUnit] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState(0)

  const currentUnit = mockUnits.find(unit => unit.id.toString() === selectedUnit)
  const flashcards = currentUnit?.flashcards || []

  const handleNext = () => {
    if (!selectedUnit) return
    setIsFlipped(false)
    setDirection(1)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length)
    }, 300)
  }

  const handlePrevious = () => {
    if (!selectedUnit) return
    setIsFlipped(false)
    setDirection(-1)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1c375b]">Flashcards</h1>
          <div className="mt-4">
            <Select value={selectedUnit} onValueChange={setSelectedUnit}>
              <SelectTrigger className="w-[280px] mx-auto">
                <SelectValue placeholder="Select a unit to study" />
              </SelectTrigger>
              <SelectContent>
                {mockUnits.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id.toString()}>
                    {unit.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedUnit ? (
          <>
            <div className="relative h-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ 
                    opacity: 0,
                    x: direction * 200
                  }}
                  animate={{ 
                    opacity: 1,
                    x: 0
                  }}
                  exit={{ 
                    opacity: 0,
                    x: direction * -200
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <motion.div
                    className="flex h-full cursor-pointer flex-col items-center justify-center rounded-xl bg-white p-8 text-center shadow-lg"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    onClick={() => setIsFlipped(!isFlipped)}
                    style={{
                      perspective: "1000px",
                    }}
                  >
                    <div
                      style={{
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {isFlipped ? (
                        <div className="text-3xl font-bold text-[#d2544a]">
                          {flashcards[currentIndex].answer}
                        </div>
                      ) : (
                        <div className="text-2xl text-[#1c375b]">
                          {flashcards[currentIndex].question}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                className="h-12 w-12"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous card</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFlipped(!isFlipped)}
                className="h-12 w-12"
              >
                <RotateCw className="h-6 w-6" />
                <span className="sr-only">Flip card</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="h-12 w-12"
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next card</span>
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-[#6f8197]">
              Card {currentIndex + 1} of {flashcards.length}
            </div>
          </>
        ) : (
          <div className="flex h-80 items-center justify-center rounded-xl bg-white p-8 text-center shadow-lg">
            <p className="text-lg text-[#6f8197]">Please select a unit to start studying</p>
          </div>
        )}
      </div>
    </div>
  )
}

