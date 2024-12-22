"use client"

import { useState, useEffect } from "react"
import { Shuffle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Word {
  id: string;
  text: string;
  language: 'english' | 'spanish';
  pairId: string;
}

interface Unit {
  id: number;
  title: string;
  pairs: { english: string; spanish: string }[];
}

const mockUnits: Unit[] = [
  {
    id: 1,
    title: "Basic Vocabulary",
    pairs: [
      { english: "House", spanish: "Casa" },
      { english: "Dog", spanish: "Perro" },
      { english: "Cat", spanish: "Gato" },
    ]
  },
  {
    id: 2,
    title: "Advanced Vocabulary",
    pairs: [
      { english: "Democracy", spanish: "Democracia" },
      { english: "Philosophy", spanish: "Filosofía" },
      { english: "Science", spanish: "Ciencia" },
    ]
  },
  {
    id: 3,
    title: "Common Phrases",
    pairs: [
      { english: "Good morning", spanish: "Buenos días" },
      { english: "How are you?", spanish: "¿Cómo estás?" },
      { english: "Thank you", spanish: "Gracias" },
    ]
  }
]

export function CombineGame() {
  const [selectedUnit, setSelectedUnit] = useState<string>("")
  const [words, setWords] = useState<Word[]>([])
  const [selectedWord, setSelectedWord] = useState<Word | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [isShaking, setIsShaking] = useState<string | null>(null)

  useEffect(() => {
    if (selectedUnit) {
      const unit = mockUnits.find(u => u.id.toString() === selectedUnit)
      if (unit) {
        const newWords: Word[] = unit.pairs.flatMap((pair, index) => [
          { id: `en-${index}`, text: pair.english, language: 'english', pairId: `pair-${index}` },
          { id: `es-${index}`, text: pair.spanish, language: 'spanish', pairId: `pair-${index}` }
        ])
        setWords(newWords.sort(() => Math.random() - 0.5))
        setMatchedPairs([])
        setScore(0)
        setSelectedWord(null)
      }
    }
  }, [selectedUnit])

  const handleWordClick = (word: Word) => {
    if (matchedPairs.includes(word.pairId) || isShaking) return

    if (!selectedWord) {
      setSelectedWord(word)
    } else {
      if (selectedWord.pairId === word.pairId && selectedWord.language !== word.language) {
        setMatchedPairs(prev => [...prev, word.pairId])
        setScore(prev => prev + 1)
        setSelectedWord(null)
      } else {
        setIsShaking(word.id)
        setTimeout(() => {
          setIsShaking(null)
          setSelectedWord(null)
        }, 500)
      }
    }
  }

  const shuffleWords = () => {
    setWords(prev => [...prev].sort(() => Math.random() - 0.5))
    setSelectedWord(null)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1c375b]">Match the Words</h1>
            <div className="mt-4">
              <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a unit to practice" />
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
          {selectedUnit && (
            <div className="text-right">
              <div className="text-2xl font-bold text-[#1c375b]">Score: {score}</div>
              <Button
                onClick={shuffleWords}
                className="mt-2 bg-[#1c375b] hover:bg-[#1c375b]/90"
              >
                <Shuffle className="mr-2 h-4 w-4" />
                Shuffle Words
              </Button>
            </div>
          )}
        </div>

        {selectedUnit ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {words.map((word) => (
              <button
                key={word.id}
                onClick={() => handleWordClick(word)}
                className={`h-24 rounded-lg p-4 text-lg font-medium shadow-md transition-all duration-300 ${
                  matchedPairs.includes(word.pairId)
                    ? "opacity-0 pointer-events-none"
                    : selectedWord?.id === word.id
                    ? "bg-[#1c375b] text-white"
                    : isShaking === word.id
                    ? "bg-red-100 text-red-700 animate-shake"
                    : "bg-white text-[#1c375b] hover:bg-[#1c375b]/10"
                }`}
                disabled={matchedPairs.includes(word.pairId)}
              >
                {word.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex h-[400px] items-center justify-center rounded-lg border bg-white p-8 shadow-lg">
            <p className="text-lg text-[#6f8197]">Please select a unit to start matching words</p>
          </div>
        )}
      </div>
    </div>
  )
}

