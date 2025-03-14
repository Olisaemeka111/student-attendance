"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AttendanceHistory } from "@/components/attendance-history"
import { formatDate } from "@/lib/utils"
import { LogOut, UserCheck } from "lucide-react"
import { NotificationEmail } from "@/components/notification-email"
import { useToast } from "@/hooks/use-toast"

interface AttendanceRecord {
  id: string
  date: Date
  timestamp: string
  studentName: string
  email: string
  subject: string
}

interface AttendanceTrackerProps {
  studentName: string
  email: string
  subject: string
  onLogout: () => void
}

export function AttendanceTracker({ studentName, email, subject, onLogout }: AttendanceTrackerProps) {
  const { toast } = useToast()
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    // Load from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`attendance-${email}`)
      return saved
        ? JSON.parse(saved).map((record: any) => ({
            ...record,
            date: new Date(record.date),
          }))
        : []
    }
    return []
  })

  const [currentDate] = useState(new Date())
  const [marked, setMarked] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [adminEmail, setAdminEmail] = useState<string>("")

  // Load admin email from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("admin-email") || ""
      setAdminEmail(email)
    }
  }, [])

  // Check if attendance already marked for today
  useEffect(() => {
    const today = new Date()
    const alreadyMarked = attendanceRecords.some(
      (record) =>
        record.date.getDate() === today.getDate() &&
        record.date.getMonth() === today.getMonth() &&
        record.date.getFullYear() === today.getFullYear() &&
        record.subject === subject,
    )

    setMarked(alreadyMarked)
  }, [attendanceRecords, subject])

  // Save to localStorage when records change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`attendance-${email}`, JSON.stringify(attendanceRecords))
    }
  }, [attendanceRecords, email])

  const markAttendance = () => {
    const now = new Date()
    const timestamp = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })

    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      date: now,
      timestamp,
      studentName,
      email,
      subject,
    }

    setAttendanceRecords((prev) => [...prev, newRecord])
    setMarked(true)
    setShowNotification(true)

    const notificationMessage = adminEmail
      ? `Attendance for ${subject} has been recorded. Notifications sent to you and school admin.`
      : `Attendance for ${subject} has been recorded. A notification email has been sent.`

    toast({
      title: "Attendance Marked",
      description: notificationMessage,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Welcome, {studentName}</h2>
          <p className="text-muted-foreground">{email}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="border-primary/50 text-foreground hover:bg-primary/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <Card className="border-primary/30 bg-black/40 backdrop-blur-sm">
        <CardHeader className="bg-black/60">
          <CardTitle className="text-foreground">Today's Attendance</CardTitle>
          <CardDescription className="text-muted-foreground">
            <div className="flex flex-col gap-1">
              <span>Date: {formatDate(currentDate)}</span>
              <span>Subject: {subject.charAt(0).toUpperCase() + subject.slice(1)}</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {marked ? (
            <div className="flex items-center text-primary">
              <UserCheck className="mr-2 h-5 w-5" />
              <span>Attendance marked for today</span>
            </div>
          ) : (
            <p className="text-foreground">You haven't marked your attendance for today's {subject} class.</p>
          )}
        </CardContent>
        <CardFooter className="bg-black/40">
          <Button
            onClick={markAttendance}
            disabled={marked}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Mark Attendance
          </Button>
        </CardFooter>
      </Card>

      {showNotification && (
        <NotificationEmail
          studentName={studentName}
          email={email}
          subject={subject}
          date={formatDate(currentDate)}
          timestamp={new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
          adminEmail={adminEmail}
          onClose={() => setShowNotification(false)}
        />
      )}

      <AttendanceHistory records={attendanceRecords} />
    </div>
  )
}

