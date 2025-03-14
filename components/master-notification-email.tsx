import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { Mail, User, Calendar, BookOpen } from "lucide-react"

interface AttendanceRecord {
  id: string
  date: Date
  timestamp: string
  studentName: string
  email: string
  subject: string
}

interface MasterNotificationEmailProps {
  record: AttendanceRecord
  adminEmail: string
}

export function MasterNotificationEmail({ record, adminEmail }: MasterNotificationEmailProps) {
  const subjectFormatted = record.subject.charAt(0).toUpperCase() + record.subject.slice(1).replace("-", " ")

  return (
    <Card className="mx-4 mb-4 border-primary/30 bg-black text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <CardTitle className="text-primary">Master Attendance Notification</CardTitle>
        </div>
        <CardDescription className="text-white/70">This notification was sent to {adminEmail}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 text-sm">
          <div className="border-b border-white/20 pb-2">
            <div>
              <strong>From:</strong> attendance-system@school.edu
            </div>
            <div>
              <strong>To:</strong> {adminEmail}
            </div>
            <div>
              <strong>Subject:</strong> Student Attendance Record - {record.studentName}
            </div>
          </div>

          <div className="space-y-3">
            <p>Dear Administrator,</p>

            <p>This is to notify you that a student has marked their attendance:</p>

            <div className="bg-secondary p-4 rounded border border-primary/30 space-y-3">
              <div className="flex items-start gap-2">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-white">Student Information</p>
                  <p>Name: {record.studentName}</p>
                  <p>Email: {record.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-white">Class Information</p>
                  <p>Subject: {subjectFormatted}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-white">Attendance Details</p>
                  <p>Date: {formatDate(new Date(record.date))}</p>
                  <p>Time: {record.timestamp}</p>
                </div>
              </div>
            </div>

            <p>
              This information has been recorded in the attendance system. A confirmation email has also been sent to
              the student.
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
        This is a simulated master notification email. In a production environment, this would be sent via an email
        service to the school administration.
      </CardFooter>
    </Card>
  )
}

