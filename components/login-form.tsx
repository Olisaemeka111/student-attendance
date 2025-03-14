"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LoginFormProps {
  onLogin: (studentName: string, email: string, subject: string) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [studentName, setStudentName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
  })

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      name: !studentName.trim() ? "Please enter your name" : "",
      email: !email.trim() ? "Please enter your email" : !validateEmail(email) ? "Please enter a valid email" : "",
      subject: !subject ? "Please select a subject" : "",
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error)) {
      return
    }

    onLogin(studentName.trim(), email.trim(), subject)
  }

  return (
    <Card className="w-full max-w-md mx-auto border-primary/30 shadow-lg bg-black/40 backdrop-blur-sm">
      <CardHeader className="bg-black/60 text-white">
        <CardTitle>Student Login</CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Enter your details to mark your attendance
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-foreground">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value)
                  setErrors((prev) => ({ ...prev, name: "" }))
                }}
                className="border-border focus-visible:ring-primary bg-muted text-foreground"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setErrors((prev) => ({ ...prev, email: "" }))
                }}
                className="border-border focus-visible:ring-primary bg-muted text-foreground"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="subject" className="text-foreground">
                Subject
              </Label>
              <Select
                value={subject}
                onValueChange={(value) => {
                  setSubject(value)
                  setErrors((prev) => ({ ...prev, subject: "" }))
                }}
              >
                <SelectTrigger
                  id="subject"
                  className="border-border focus-visible:ring-primary bg-muted text-foreground"
                >
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
              {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-black/40">
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

