"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { Mail, Search } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AttendanceRecord {
  id: string
  date: Date
  timestamp: string
  studentName: string
  email: string
  subject: string
}

interface AdminAttendanceListProps {
  records: AttendanceRecord[]
  onViewNotification: (record: AttendanceRecord) => void
}

export function AdminAttendanceList({ records, onViewNotification }: AdminAttendanceListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("")

  // Get unique subjects from records
  const subjects = Array.from(new Set(records.map((record) => record.subject)))

  // Filter records based on search term and subject filter
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      searchTerm === "" ||
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSubject = subjectFilter === "" || record.subject === subjectFilter

    return matchesSearch && matchesSubject
  })

  const getSubjectLabel = (subject: string) => {
    return subject.charAt(0).toUpperCase() + subject.slice(1).replace("-", " ")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email"
            className="pl-8 border-border focus-visible:ring-primary bg-muted text-foreground"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-full sm:w-[180px] border-border focus-visible:ring-primary bg-muted text-foreground">
            <SelectValue placeholder="All subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {getSubjectLabel(subject)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-primary/30">
        <CardContent className="p-0">
          {filteredRecords.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              {records.length === 0 ? "No attendance records found." : "No records match your search criteria."}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredRecords.map((record) => (
                <div key={record.id} className="p-4 hover:bg-secondary/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-foreground">{record.studentName}</h4>
                      <p className="text-sm text-muted-foreground">{record.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-right">
                        <div className="text-foreground">{formatDate(new Date(record.date))}</div>
                        <div className="text-muted-foreground">{record.timestamp}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewNotification(record)}
                        className="text-foreground hover:bg-primary/10"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">View notification</span>
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="inline-flex items-center rounded-full border border-primary/30 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {getSubjectLabel(record.subject)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

