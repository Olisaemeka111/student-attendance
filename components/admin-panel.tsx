"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminAttendanceList } from "@/components/admin-attendance-list"
import { MasterNotificationEmail } from "@/components/master-notification-email"
import { Download, X } from "lucide-react"

interface AttendanceRecord {
  id: string
  date: Date
  timestamp: string
  studentName: string
  email: string
  subject: string
}

export function AdminPanel() {
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin-email") || ""
    }
    return ""
  })

  const [isConfigured, setIsConfigured] = useState(!!adminEmail)
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [showMasterEmail, setShowMasterEmail] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null)

  // Load all attendance records from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const allRecords: AttendanceRecord[] = []

      // Get all keys from localStorage that start with "attendance-"
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("attendance-")) {
          try {
            const records = JSON.parse(localStorage.getItem(key) || "[]")
            records.forEach((record: any) => {
              allRecords.push({
                ...record,
                date: new Date(record.date),
              })
            })
          } catch (error) {
            console.error("Error parsing attendance records:", error)
          }
        }
      })

      // Sort by date (newest first)
      allRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setAttendanceRecords(allRecords)
    }
  }, [])

  const saveAdminEmail = () => {
    if (adminEmail && typeof window !== "undefined") {
      localStorage.setItem("admin-email", adminEmail)
      setIsConfigured(true)
    }
  }

  const exportAttendanceCSV = () => {
    if (attendanceRecords.length === 0) return

    const headers = ["Student Name", "Email", "Subject", "Date", "Time"]
    const csvRows = [
      headers.join(","),
      ...attendanceRecords.map((record) =>
        [
          `"${record.studentName}"`,
          `"${record.email}"`,
          `"${record.subject}"`,
          `"${new Date(record.date).toLocaleDateString()}"`,
          `"${record.timestamp}"`,
        ].join(","),
      ),
    ]

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `attendance_records_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const viewMasterEmail = (record: AttendanceRecord) => {
    setSelectedRecord(record)
    setShowMasterEmail(true)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">School Administration Panel</h2>

      <Tabs defaultValue={isConfigured ? "records" : "settings"} className="space-y-4">
        <TabsList className="bg-white/10 backdrop-blur-sm">
          <TabsTrigger
            value="records"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Attendance Records
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          {!isConfigured ? (
            <Card className="border-primary/30 bg-black/40 backdrop-blur-sm">
              <CardContent className="pt-6">
                <p className="text-primary">Please configure the admin email in the Settings tab first.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-foreground">All Student Attendance Records</h3>
                <Button
                  variant="outline"
                  onClick={exportAttendanceCSV}
                  disabled={attendanceRecords.length === 0}
                  className="border-primary/50 text-foreground hover:bg-primary/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>

              <AdminAttendanceList records={attendanceRecords} onViewNotification={viewMasterEmail} />

              {showMasterEmail && selectedRecord && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                  <div className="bg-card rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                    <div className="p-4 flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowMasterEmail(false)}
                        className="text-foreground hover:bg-primary/10"
                      >
                        <span className="sr-only">Close</span>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <MasterNotificationEmail record={selectedRecord} adminEmail={adminEmail} />
                  </div>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="settings">
          <Card className="border-primary/30 bg-black/40 backdrop-blur-sm">
            <CardHeader className="bg-black/60">
              <CardTitle className="text-foreground">Admin Settings</CardTitle>
              <CardDescription className="text-muted-foreground">
                Configure the email address where all attendance notifications will be sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-foreground">
                  School Admin Email
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@school.edu"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="border-border focus-visible:ring-primary bg-muted text-foreground"
                  />
                  <Button onClick={saveAdminEmail} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Save
                  </Button>
                </div>
                {isConfigured && (
                  <p className="text-sm text-muted-foreground">Master notifications are being sent to: {adminEmail}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

