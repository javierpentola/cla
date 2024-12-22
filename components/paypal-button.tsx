"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from 'lucide-react'
import { SupportUsView } from "./support-us-view"

export function PayPalButton() {
  const [showSupport, setShowSupport] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        className="h-8 gap-2 px-3"
        onClick={() => setShowSupport(true)}
      >
        <Heart className="h-4 w-4" />
        <span className="text-sm">Support Us</span>
      </Button>
      {showSupport && <SupportUsView onClose={() => setShowSupport(false)} />}
    </>
  )
}

