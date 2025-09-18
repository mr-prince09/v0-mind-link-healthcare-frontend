"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Home,
  Activity,
  Brain,
  Lightbulb,
  Bell,
  User,
  Heart,
  Moon,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { mockPatientData } from "@/lib/mock-data"
import { useState } from "react"

const sidebarItems = [
  { label: "Overview", href: "/patient", icon: <Home className="mr-2 h-4 w-4" />, active: true },
  { label: "Vitals", href: "/patient/vitals", icon: <Activity className="mr-2 h-4 w-4" /> },
  { label: "ERI Score", href: "/patient/eri", icon: <Brain className="mr-2 h-4 w-4" /> },
  { label: "Recommendations", href: "/patient/recommendations", icon: <Lightbulb className="mr-2 h-4 w-4" /> },
  { label: "Alerts", href: "/patient/alerts", icon: <Bell className="mr-2 h-4 w-4" /> },
  { label: "Profile", href: "/patient/profile", icon: <User className="mr-2 h-4 w-4" /> },
]

const COLORS = ["#10b981", "#f59e0b", "#ef4444"]

export default function PatientDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const data = mockPatientData

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600"
    if (score >= 60) return "text-yellow-600"
    return "text-green-600"
  }

  const getRiskBadgeVariant = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "secondary"
    }
  }

  const pieData = [
    { name: "Good", value: 40, color: COLORS[0] },
    { name: "Fair", value: 35, color: COLORS[1] },
    { name: "Poor", value: 25, color: COLORS[2] },
  ]

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Greeting and ERI Score */}
          <div className="flex flex-col lg:flex-row gap-6">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-2xl">Hi {data.name}, here's your health snapshot</CardTitle>
                <CardDescription>Your emotional and physical health overview for today</CardDescription>
              </CardHeader>
            </Card>
            <Card className="lg:w-80">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">ERI Score</CardTitle>
                <CardDescription>Emotional Risk Intelligence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className={`text-4xl font-bold ${getRiskColor(data.eriScore)}`}>{data.eriScore}</div>
                    <Badge variant={getRiskBadgeVariant(data.riskLevel)} className="absolute -top-2 -right-8">
                      {data.riskLevel}
                    </Badge>
                  </div>
                </div>
                <Progress value={data.eriScore} className="mt-4" />
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  Your stress may impact your blood sugar levels
                </p>
              </CardContent>
            </Card>
          </div>

          {/* High-priority alert */}
          {data.alerts.some((alert) => alert.severity === "high" && !alert.read) && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="font-medium">
                Emergency Alert: Possible panic attack detected at 8:32 PM. Please contact your caregiver or doctor
                immediately.
              </AlertDescription>
            </Alert>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.vitals.heartRate} bpm</div>
                <p className="text-xs text-muted-foreground">Normal range</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">HRV</CardTitle>
                <Activity className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.vitals.hrv} ms</div>
                <p className="text-xs text-muted-foreground">Slightly low</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sleep</CardTitle>
                <Moon className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.vitals.sleepHours}h</div>
                <p className="text-xs text-muted-foreground">Below target</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
                <Zap className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.vitals.stressLevel}%</div>
                <p className="text-xs text-muted-foreground">Elevated</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Heart Rate Trend</CardTitle>
                <CardDescription>24-hour heart rate monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.chartData.heartRate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ERI Score History</CardTitle>
                <CardDescription>Weekly emotional risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.chartData.eriHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>AI-powered suggestions for your wellbeing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.recommendations.map((rec) => (
                  <div key={rec.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      {rec.type === "mindfulness" && <Brain className="h-5 w-5 text-primary" />}
                      {rec.type === "sleep" && <Moon className="h-5 w-5 text-purple-500" />}
                      {rec.type === "nutrition" && <Heart className="h-5 w-5 text-red-500" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                      <Badge variant={rec.priority === "high" ? "destructive" : "secondary"} className="mt-2">
                        {rec.priority} priority
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Important notifications and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.alerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      {alert.severity === "high" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                      {alert.severity === "medium" && <Clock className="h-5 w-5 text-yellow-500" />}
                      {alert.severity === "low" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                      {!alert.read && (
                        <Badge variant="secondary" className="mt-1">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
