"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Home,
  Clock,
  Bell,
  User,
  Heart,
  Activity,
  Moon,
  Phone,
  MessageCircle,
  AlertTriangle,
  Shield,
  CheckCircle,
} from "lucide-react"
import { mockCaregiverData } from "@/lib/mock-data"
import { useState } from "react"

const sidebarItems = [
  { label: "Overview", href: "/caregiver", icon: <Home className="mr-2 h-4 w-4" />, active: true },
  { label: "Patient Timeline", href: "/caregiver/timeline", icon: <Clock className="mr-2 h-4 w-4" /> },
  { label: "Alerts", href: "/caregiver/alerts", icon: <Bell className="mr-2 h-4 w-4" /> },
  { label: "Profile", href: "/caregiver/profile", icon: <User className="mr-2 h-4 w-4" /> },
]

export default function CaregiverDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d")
  const data = mockCaregiverData

  const getSafetyStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "safe":
        return "text-green-600"
      case "at risk":
        return "text-red-600"
      case "monitoring":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getSafetyBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "safe":
        return "default"
      case "at risk":
        return "destructive"
      case "monitoring":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case "happy":
      case "good":
        return "text-green-600"
      case "neutral":
      case "okay":
        return "text-blue-600"
      case "anxious":
      case "stressed":
        return "text-yellow-600"
      case "sad":
      case "depressed":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const weeklyMoodData = [
    { day: "Mon", mood: 6, sleep: 7.2, stress: 4 },
    { day: "Tue", mood: 5, sleep: 6.8, stress: 6 },
    { day: "Wed", mood: 4, sleep: 5.5, stress: 7 },
    { day: "Thu", mood: 3, sleep: 4.2, stress: 8 },
    { day: "Fri", mood: 4, sleep: 6.0, stress: 7 },
    { day: "Sat", mood: 5, sleep: 7.5, stress: 5 },
    { day: "Sun", mood: 6, sleep: 8.0, stress: 4 },
  ]

  const handleEmergencyCall = (contact: any) => {
    window.open(`tel:${contact.phone}`, "_self")
  }

  const handleSendMessage = (contact: any) => {
    window.open(`sms:${contact.phone}`, "_self")
  }

  return (
    <ProtectedRoute allowedRoles={["caregiver"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Caregiver Dashboard</h1>
              <p className="text-muted-foreground">Monitor and support {data.patient.name}'s wellbeing</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
            </div>
          </div>

          {/* Safety Alert */}
          {data.patient.safetyStatus === "At Risk" && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="font-medium">
                {data.patient.name} is currently at risk. Elevated stress levels and poor sleep detected. Consider
                immediate intervention.
              </AlertDescription>
            </Alert>
          )}

          {/* Patient Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{data.patient.name}'s Current Status</span>
                  <Badge variant={getSafetyBadgeVariant(data.patient.safetyStatus)} className="text-sm">
                    {data.patient.safetyStatus}
                  </Badge>
                </CardTitle>
                <CardDescription>Real-time health and emotional status overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className={`text-2xl font-bold ${getMoodColor(data.patient.currentMood)}`}>
                      {data.patient.currentMood}
                    </div>
                    <p className="text-sm text-muted-foreground">Current Mood</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{data.patient.vitals.heartRate}</div>
                    <p className="text-sm text-muted-foreground">Heart Rate (bpm)</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{data.patient.vitals.bloodPressure}</div>
                    <p className="text-sm text-muted-foreground">Blood Pressure</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Safety Status
                </CardTitle>
                <CardDescription>Current risk assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getSafetyStatusColor(data.patient.safetyStatus)}`}>
                    {data.patient.safetyStatus}
                  </div>
                  {data.patient.safetyStatus === "At Risk" && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Multiple risk factors detected. Monitoring closely.
                    </p>
                  )}
                  {data.patient.safetyStatus === "Safe" && (
                    <p className="text-sm text-muted-foreground mt-2">All indicators within normal range.</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Sleep Quality</span>
                    <Badge variant="secondary">Poor</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Stress Level</span>
                    <Badge variant="destructive">High</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Heart Rate</span>
                    <Badge variant="default">Normal</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Health Trends</CardTitle>
              <CardDescription>Mood, sleep, and stress patterns over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyMoodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2} name="Mood (1-10)" />
                  <Line type="monotone" dataKey="sleep" stroke="#3b82f6" strokeWidth={2} name="Sleep Hours" />
                  <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name="Stress Level" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Timeline and Emergency Contacts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity Timeline</CardTitle>
                <CardDescription>Latest health events and mood changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.timeline.slice(0, 3).map((entry) => (
                    <div key={entry.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-primary mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{entry.date}</span>
                          <Badge variant="outline" className={getMoodColor(entry.mood)}>
                            {entry.mood}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>
                            Sleep: {entry.sleep}h • HR: {entry.vitals.hr} bpm • BP: {entry.vitals.bp}
                          </div>
                          <div>{entry.notes}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View Full Timeline
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>Quick access to important contacts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.type}</p>
                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleEmergencyCall(contact)}>
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleSendMessage(contact)}>
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Alerts & Notifications
              </CardTitle>
              <CardDescription>Important updates and health alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 border border-red-200 rounded-lg bg-red-50">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-red-800">High Stress Alert</p>
                    <p className="text-sm text-red-700">
                      Elevated stress levels detected at 8:32 PM. Heart rate increased to 95 bpm.
                    </p>
                    <p className="text-xs text-red-600 mt-1">2 hours ago</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Respond
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <Moon className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-yellow-800">Sleep Pattern Alert</p>
                    <p className="text-sm text-yellow-700">
                      Poor sleep quality for 3 consecutive nights. Average sleep: 5.2 hours.
                    </p>
                    <p className="text-xs text-yellow-600 mt-1">This morning</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-4 border border-green-200 rounded-lg bg-green-50">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-green-800">Medication Reminder Completed</p>
                    <p className="text-sm text-green-700">Morning medications taken on time at 8:00 AM.</p>
                    <p className="text-xs text-green-600 mt-1">Today</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button size="lg" className="h-16">
              <MessageCircle className="mr-2 h-5 w-5" />
              Send Check-in Message
            </Button>
            <Button variant="outline" size="lg" className="h-16 bg-transparent">
              <Phone className="mr-2 h-5 w-5" />
              Schedule Call
            </Button>
            <Button variant="outline" size="lg" className="h-16 bg-transparent">
              <Bell className="mr-2 h-5 w-5" />
              Set Reminder
            </Button>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
