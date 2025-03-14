import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { Check, Clock, BookOpen, Mail } from "lucide-react"

interface AttendanceRecord {
  id: string
  date: Date
  timestamp: string
  studentName: string
  email: string
  subject: string
}

interface AttendanceHistoryProps {
  records: AttendanceRecord[]
}

export function AttendanceHistory({ records }: AttendanceHistoryProps) {
  // Sort records by date (newest first)
  const sortedRecords = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getSubjectLabel = (subject: string) => {
    return subject.charAt(0).toUpperCase() + subject.slice(1).replace("-", " ")
  }

  return (
    <Card className="border-primary/30">
      <CardHeader className="bg-secondary">
        <CardTitle className="text-foreground">Attendance History</CardTitle>
        <CardDescription className="text-muted-foreground">Your past attendance records</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {sortedRecords.length === 0 ? (
          <p className="text-muted-foreground p-6">No attendance records found.</p>
        ) : (
          <div className="divide-y divide-border">
            {sortedRecords.map((record) => (
              <div key={record.id} className="flex flex-col p-4 hover:bg-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium text-foreground">{formatDate(new Date(record.date))}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{record.timestamp}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-foreground">Subject: {getSubjectLabel(record.subject)}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-foreground">Notification sent to: {record.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

