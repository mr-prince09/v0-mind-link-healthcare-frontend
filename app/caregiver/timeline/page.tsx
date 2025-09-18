"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Home, Clock, Bell, User, Calendar, Filter, TrendingDown, TrendingUp, Minus } from "lucide-react"
import { mockCaregiverData } from "@/lib/mock-data"
import { useState } from "react"

const sidebarItems = [
  { label: "Overview", href: "/caregiver", icon: <Home className="mr-2 h-4 w-4" /> },
  { label: "Patient Timeline", href: "/caregiver/timeline", icon: <Clock className="mr-2 h-4 w-4" />, active: true },
  { label: "Alerts", href: "/caregiver/alerts", icon: <Bell className="mr-2 h-4 w-4" /> },
  { label: "Profile", href: "/caregiver/profile", icon: <User className="mr-2 h-4 w-4" /> },
]

export default function TimelinePage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [filterType, setFilterType] = useState("all")
  const data = mockCaregiverData

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

  const getMoodBadgeVariant = (mood: string) => {
    switch (mood.toLowerCase()) {
      case "happy":
      case "good":
        return "default"
      case "neutral":
      case "okay":
        return "secondary"
      case "anxious":
      case "stressed":
        return "secondary"
      case "sad":
      case "depressed":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  const extendedTimeline = [
    ...data.timeline,
    {
      id: "4",
      date: "2024-01-12",
      mood: "Good",
      sleep: 7.5,
      vitals: { hr: 72, bp: "130/85" },
      notes: "Feeling much better, completed morning walk",
    },
    {
      id: "5",
      date: "2024-01-11",
      mood: "Neutral",
      sleep: 6.5,
      vitals: { hr: 75, bp: "135/88" },
      notes: "Regular day, took medications on time",
    },
    {
      id: "6",
      date: "2024-01-10",
      mood: "Anxious",
      sleep: 5.8,
      vitals: { hr: 85, bp: "142/92" },
      notes: "Worried about upcoming appointment",
    },
    {
      id: "7",
      date: "2024-01-09",
      mood: "Stressed",
      sleep: 4.5,
      vitals: { hr: 90, bp: "148/95" },
      notes: "Work stress affecting sleep and mood",
    },
  ]

  const chartData = extendedTimeline.reverse().map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    mood: entry.mood === "Good" ? 8 : entry.mood === "Neutral" ? 6 : entry.mood === "Anxious" ? 4 : 3,
    sleep: entry.sleep,
    heartRate: entry.vitals.hr,
  }))

  return (
    <ProtectedRoute allowedRoles={["caregiver"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Patient Timeline</h1>
              <p className="text-muted-foreground">Interactive timeline of {data.patient.name}'s health journey</p>
            </div>
            <div className="flex gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="mood">Mood Changes</SelectItem>
                  <SelectItem value="vitals">Vital Signs</SelectItem>
                  <SelectItem value="sleep">Sleep Patterns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Trend Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mood & Sleep Trends</CardTitle>
                <CardDescription>Daily mood and sleep quality over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2} name="Mood Score" />
                    <Line type="monotone" dataKey="sleep" stroke="#3b82f6" strokeWidth={2} name="Sleep Hours" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Heart Rate Trends</CardTitle>
                <CardDescription>Daily heart rate patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} name="Heart Rate" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Health Timeline</CardTitle>
              <CardDescription>Chronological view of health events and observations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {extendedTimeline.map((entry, index) => {
                  const previousEntry = extendedTimeline[index + 1]
                  return (
                    <div key={entry.id} className="relative">
                      {/* Timeline connector */}
                      {index < extendedTimeline.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
                      )}

                      <div className="flex gap-4">
                        {/* Timeline dot */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">
                              {new Date(entry.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </h3>
                            <Badge variant={getMoodBadgeVariant(entry.mood)} className={getMoodColor(entry.mood)}>
                              {entry.mood}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <Card className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-muted-foreground">Sleep</p>
                                  <p className="text-xl font-bold">{entry.sleep}h</p>
                                </div>
                                {previousEntry && getTrendIcon(entry.sleep, previousEntry.sleep)}
                              </div>
                            </Card>

                            <Card className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-muted-foreground">Heart Rate</p>
                                  <p className="text-xl font-bold">{entry.vitals.hr} bpm</p>
                                </div>
                                {previousEntry && getTrendIcon(previousEntry.vitals.hr, entry.vitals.hr)}
                              </div>
                            </Card>

                            <Card className="p-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Blood Pressure</p>
                                <p className="text-xl font-bold">{entry.vitals.bp}</p>
                              </div>
                            </Card>
                          </div>

                          <div className="bg-muted/50 p-4 rounded-lg">
                            <p className="text-sm font-medium mb-1">Notes:</p>
                            <p className="text-sm text-muted-foreground">{entry.notes}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Sleep</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(extendedTimeline.reduce((sum, entry) => sum + entry.sleep, 0) / extendedTimeline.length).toFixed(1)}
                  h
                </div>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Heart Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    extendedTimeline.reduce((sum, entry) => sum + entry.vitals.hr, 0) / extendedTimeline.length,
                  )}{" "}
                  bpm
                </div>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Good Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {extendedTimeline.filter((entry) => entry.mood === "Good" || entry.mood === "Neutral").length}
                </div>
                <p className="text-xs text-muted-foreground">Out of {extendedTimeline.length} days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Concerning Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {extendedTimeline.filter((entry) => entry.mood === "Anxious" || entry.mood === "Stressed").length}
                </div>
                <p className="text-xs text-muted-foreground">Requiring attention</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
