"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { LoadingAnimation } from "./loading-animation"
import { StudentCode } from "./student-code"
import { TeacherLogin } from "./teacher-login"
import { StudentDashboard } from "./student-dashboard"
import { TeacherDashboard } from "./teacher-dashboard"
import { Toaster } from "./ui/toaster"
import { PayPalButton } from "./paypal-button"
import { NavigationBar } from "./navigation-bar"

type UserType = "none" | "student" | "teacher"

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [userType, setUserType] = useState<UserType>("none")
  const [currentGame, setCurrentGame] = useState("none")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = (game: string) => {
    if (game === "none") {
      setUserType("none")
      setCurrentGame("none")
    } else {
      setCurrentGame(game)
    }
  }

  if (isLoading) {
    return <LoadingAnimation />
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {userType === "none" ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid min-h-screen lg:grid-cols-2"
          >
            <TeacherLogin onLogin={() => setUserType("teacher")} />
            <StudentCode onLogin={() => setUserType("student")} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {userType === "student" ? (
              <StudentDashboard currentGame={currentGame} setCurrentGame={setCurrentGame} />
            ) : (
              <TeacherDashboard />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-4 left-4">
        <PayPalButton />
      </div>
      <NavigationBar userType={userType} onNavigate={handleNavigate} />
      <Toaster />
    </>
  )
}

