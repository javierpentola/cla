"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const mockUnits = [
  { id: 1, title: "Basic Math" },
  { id: 2, title: "Advanced Math" },
  { id: 3, title: "Physics" },
  { id: 4, title: "Chemistry" },
  { id: 5, title: "Biology" },
]

export function LearnChat() {
  const [selectedUnit, setSelectedUnit] = useState<string>("")
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([])
  const [input, setInput] = useState("")

  const handleUnitChange = (unitId: string) => {
    setSelectedUnit(unitId)
    const unit = mockUnits.find(u => u.id.toString() === unitId)
    if (unit) {
      setMessages([
        { 
          text: `Hello! I'm your AI tutor for ${unit.title}. What would you like to learn about?`, 
          isUser: false 
        }
      ])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !selectedUnit) return

    setMessages(prev => [...prev, { text: input, isUser: true }])
    setInput("")
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: `[AI response for ${mockUnits.find(u => u.id.toString() === selectedUnit)?.title} - Not yet implemented]`, 
        isUser: false 
      }])
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1c375b]">AI Tutor</h1>
          <div className="mt-4">
            <Select value={selectedUnit} onValueChange={handleUnitChange}>
              <SelectTrigger className="w-[280px]">
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
        
        <div className="relative min-h-[600px] rounded-lg border bg-white p-6 shadow-lg">
          {selectedUnit ? (
            <>
              <div className="mb-4 space-y-4 pb-20">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.isUser
                          ? 'bg-[#1c375b] text-white'
                          : 'bg-gray-100 text-[#1c375b]'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              <form
                onSubmit={handleSubmit}
                className="absolute bottom-0 left-0 right-0 bg-white p-4"
              >
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-[#1c375b] hover:bg-[#1c375b]/90">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex h-[600px] items-center justify-center">
              <p className="text-lg text-[#6f8197]">Please select a unit to start learning</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

