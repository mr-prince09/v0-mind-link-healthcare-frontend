"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import {
  Home,
  Activity,
  Brain,
  Lightbulb,
  Bell,
  User,
  Heart,
  Thermometer,
  Droplets,
  Zap,
  Moon,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import { mockPatientData } from "@/lib/mock-data"
import { useState } from "react"

const sidebarItems = [
  { label: "Overview", href: "/patient", icon: <Home className="mr-2 h-4 w-4" /> },
  { label: "Vitals", href: "/patient/vitals", icon: <Activity className="mr-2 h-4 w-4" />, active: true },
  { label: "ERI Score", href: "/patient/eri", icon: <Brain className="mr-2 h-4 w-4" /> },
  { label: "Recommendations", href: "/patient/recommendations", icon: <Lightbulb className="mr-2 h-4 w-4" /> },
  { label: "Alerts", href: "/patient/alerts", icon: <Bell className="mr-2 h-4 w-4" /> },
  { label: "Profile", href: "/patient/profile", icon: <User className="mr-2 h-4 w-4" /> },
]

export default function PatientVitals() {
  const [timeRange, setTimeRange] = useState("24h")
  const data = mockPatientData

  const vitalsData = [
    { time: "00:00", heartRate: 68, bloodPressure: 120, temperature: 98.6, oxygenSat: 98 },
    { time: "04:00", heartRate: 65, bloodPressure: 118, temperature: 98.4, oxygenSat: 99 },
    { time: "08:00", heartRate: 72, bloodPressure: 125, temperature: 98.8, oxygenSat: 97 },
    { time: "12:00", heartRate: 78, bloodPressure: 130, temperature: 99.1, oxygenSat: 98 },
    { time: "16:00", heartRate: 82, bloodPressure: 135, temperature: 99.2, oxygenSat: 96 },
    { time: "20:00", heartRate: 75, bloodPressure: 128, temperature: 98.9, oxygenSat: 98 },
  ]

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-red-500" />
    if (current < previous) return <TrendingDown className="h-4 w-4 text-green-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  const getVitalStatus = (vital: string, value: number) => {
    switch (vital) {
      case "heartRate":
        if (value < 60 || value > 100) return "warning"
        return "normal"
      case "bloodPressure":
        if (value > 140 || value < 90) return "warning"
        return "normal"
      case "temperature":
        if (value > 100.4 || value < 97) return "warning"
        return "normal"
      case "oxygenSat":
        if (value < 95) return "warning"
        return "normal"
      default:
        return "normal"
    }
  }

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Vital Signs Monitoring</h1>
              <p className="text-muted-foreground">Track your health metrics in real-time</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Current Vitals Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{data.vitals.heartRate} bpm</div>
                  {getTrendIcon(75, 72)}
                </div>
                <Badge
                  variant={getVitalStatus("heartRate", data.vitals.heartRate) === "normal" ? "default" : "destructive"}
                >
                  {getVitalStatus("heartRate", data.vitals.heartRate) === "normal" ? "Normal" : "Attention"}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                <Droplets className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">128/82</div>
                  {getTrendIcon(128, 125)}
                </div>
                <Badge variant="default">Normal</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                <Thermometer className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">98.9°F</div>
                  {getTrendIcon(98.9, 98.6)}
                </div>
                <Badge variant="default">Normal</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Oxygen Saturation</CardTitle>
                <Activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">98%</div>
                  {getTrendIcon(98, 97)}
                </div>
                <Badge variant="default">Normal</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Heart Rate Trend</CardTitle>
                <CardDescription>24-hour heart rate monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={vitalsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blood Pressure</CardTitle>
                <CardDescription>Systolic pressure over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={vitalsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="bloodPressure" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sleep & Recovery</CardTitle>
                <CardDescription>Sleep quality and recovery metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-purple-500" />
                    <span>Sleep Duration</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{data.vitals.sleepHours}h</div>
                    <Badge variant="secondary">Below Target</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <span>HRV</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{data.vitals.hrv} ms</div>
                    <Badge variant="secondary">Slightly Low</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-500" />
                    <span>Stress Level</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{data.vitals.stressLevel}%</div>
                    <Badge variant="destructive">Elevated</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Insights</CardTitle>
                <CardDescription>AI-powered analysis of your vitals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-green-600">✓ Heart Rate Stable</h4>
                  <p className="text-sm text-muted-foreground">
                    Your heart rate has been within normal range for the past 24 hours.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-yellow-600">⚠ Sleep Quality</h4>
                  <p className="text-sm text-muted-foreground">
                    Consider improving sleep hygiene. Target 7-9 hours per night.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-blue-600">ℹ Stress Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Try deep breathing exercises to help reduce stress levels.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
