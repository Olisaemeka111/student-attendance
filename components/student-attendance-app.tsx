"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { AttendanceTracker } from "@/components/attendance-tracker"

export function StudentAttendanceApp() {
  const [loggedInStudent, setLoggedInStudent] = useState<{
    name: string
    email: string
    subject: string
  } | null>(null)

  const handleLogin = (name: string, email: string, subject: string) => {
    setLoggedInStudent({ name, email, subject })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!loggedInStudent ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <AttendanceTracker
          studentName={loggedInStudent.name}
          email={loggedInStudent.email}
          subject={loggedInStudent.subject}
          onLogout={() => setLoggedInStudent(null)}
        />
      )}
    </div>
  )
}

