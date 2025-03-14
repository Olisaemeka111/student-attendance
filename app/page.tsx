"use client"

import { useState } from "react"
import { StudentAttendanceApp } from "@/components/student-attendance-app"
import { AdminPanel } from "@/components/admin-panel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserRound, School } from "lucide-react"
import { ScrollingCredit } from "@/components/scrolling-credit"

export default function Home() {
  const [activeTab, setActiveTab] = useState("student")

  return (
    <main
      className="min-h-screen relative"
      style={{
        backgroundImage:
          'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BUKXfPZy4IzNxq6bNVEQTTyMsEqS5o.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">Student Attendance System</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white/10 backdrop-blur-sm">
              <TabsTrigger
                value="student"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white"
              >
                <UserRound className="h-4 w-4" />
                <span>Student</span>
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white"
              >
                <School className="h-4 w-4" />
                <span>Admin</span>
              </TabsTrigger>
            </TabsList>

            <div className="pb-16">
              <TabsContent value="student" className="mt-0">
                <StudentAttendanceApp />
              </TabsContent>

              <TabsContent value="admin" className="mt-0">
                <AdminPanel />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <ScrollingCredit />
      </div>
    </main>
  )
}

