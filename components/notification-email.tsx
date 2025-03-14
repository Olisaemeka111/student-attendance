"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Mail } from "lucide-react"

interface NotificationEmailProps {
  studentName: string
  email: string
  subject: string
  date: string
  timestamp: string
  adminEmail?: string
  onClose: () => void
}

export function NotificationEmail({
  studentName,
  email,
  subject,
  date,
  timestamp,
  adminEmail,
  onClose,
}: NotificationEmailProps) {
  const subjectFormatted = subject.charAt(0).toUpperCase() + subject.slice(1).replace("-", " ")

  return (
    <Card className="relative border-primary/30 bg-black text-white">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 text-white hover:bg-white/10"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>

      <CardHeader>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <CardTitle className="text-primary">Attendance Notification Email</CardTitle>
        </div>
        <CardDescription className="text-white/70">
          This email has been sent to {email}
          {adminEmail && <> and a master notification to {adminEmail}</>}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 text-sm">
          <div className="border-b border-white/20 pb-2">
            <div>
              <strong>From:</strong> attendance-system@school.edu
            </div>
            <div>
              <strong>To:</strong> {email}
            </div>
            <div>
              <strong>Subject:</strong> Attendance Confirmation - {subjectFormatted} Class
            </div>
          </div>

          <div className="space-y-3">
            <p>Dear {studentName},</p>

            <p>This email confirms that your attendance has been recorded for the following class:</p>

            <div className="bg-secondary p-3 rounded border border-primary/30">
              <p>
                <strong>Subject:</strong> {subjectFormatted}
              </p>
              <p>
                <strong>Date:</strong> {date}
              </p>
              <p>
                <strong>Time:</strong> {timestamp}
              </p>
            </div>

            <p>
              Thank you for your attendance. If you believe this is an error or have any questions, please contact your
              instructor.
            </p>

            <p>
              Best regards,
              <br />
              School Attendance System
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-white/50 border-t border-white/20 pt-4">
        This is a simulated email notification. In a production environment, this would be sent via an email service.
        {adminEmail && <> A master notification has also been sent to the school administration.</>}
      </CardFooter>
    </Card>
  )
}

