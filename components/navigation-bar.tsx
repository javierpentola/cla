"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Brain, FileQuestion, Combine, LogOut } from 'lucide-react'

interface NavigationBarProps {
  userType: "none" | "student" | "teacher"
  onNavigate: (game: string) => void
}

export function NavigationBar({ userType, onNavigate }: NavigationBarProps) {
  if (userType !== "student") return null;

  return (
    <div className="fixed bottom-4 right-4 flex gap-2 transition-all duration-300">
      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-white group relative"
        onClick={() => onNavigate("flashcards")}
        title="Flashcards"
      >
        <BookOpen className="h-6 w-6" />
        <span className="sr-only">Flashcards</span>
        <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 transition-opacity duration-300">
          Flashcards
        </span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-white group relative"
        onClick={() => onNavigate("learn")}
        title="Learn"
      >
        <Brain className="h-6 w-6" />
        <span className="sr-only">Learn</span>
        <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 transition-opacity duration-300">
          Learn
        </span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-white group relative"
        onClick={() => onNavigate("exam")}
        title="Exam"
      >
        <FileQuestion className="h-6 w-6" />
        <span className="sr-only">Exam</span>
        <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 transition-opacity duration-300">
          Exam
        </span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-white group relative"
        onClick={() => onNavigate("combine")}
        title="Combine"
      >
        <Combine className="h-6 w-6" />
        <span className="sr-only">Combine</span>
        <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 transition-opacity duration-300">
          Combine
        </span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-white group relative"
        onClick={() => onNavigate("none")}
        title="Go Back"
      >
        <LogOut className="h-6 w-6" />
        <span className="sr-only">Go Back</span>
        <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 transition-opacity duration-300">
          Go Back
        </span>
      </Button>
    </div>
  )
}

