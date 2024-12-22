"use client"

import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  onClick?: () => void
}

export function BackButton({ onClick }: BackButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      window.history.back()
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="icon"
      className="absolute left-4 top-4 h-10 w-10 text-[#6f8197] hover:text-[#1c375b]"
    >
      <ArrowLeft className="h-6 w-6" />
      <span className="sr-only">Go back</span>
    </Button>
  )
}

