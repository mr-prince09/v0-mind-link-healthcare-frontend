"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Home, Activity, Brain, Lightbulb, Bell, User, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { mockPatientData } from "@/lib/mock-data"

const sidebarItems = [
  { label: "Overview", href: "/patient", icon: <Home className="mr-2 h-4 w-4" /> },
  { label: "Vitals", href: "/patient/vitals", icon: <Activity className="mr-2 h-4 w-4" /> },
  { label: "ERI Score", href: "/patient/eri", icon: <Brain className="mr-2 h-4 w-4" />, active: true },
  { label: "Recommendations", href: "/patient/recommendations", icon: <Lightbulb className="mr-2 h-4 w-4" /> },
  { label: "Alerts", href: "/patient/alerts", icon: <Bell className="mr-2 h-4 w-4" /> },
  { label: "Profile", href: "/patient/profile", icon: <User className="mr-2 h-4 w-4" /> },
]

export default function PatientERI() {
  const data = mockPatientData

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600"
    if (score >= 60) return "text-yellow-600"
    return "text-green-600"
  }

  const getRiskLevel = (score: number) => {
    if (score >= 80) return "High"
    if (score >= 60) return "Medium"
    return "Low"
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

  const eriComponents = [
    { name: "Stress Level", value: 75, max: 100, color: "#ef4444" },
    { name: "Sleep Quality", value: 45, max: 100, color: "#f59e0b" },
    { name: "Heart Rate Variability", value: 60, max: 100, color: "#3b82f6" },
    { name: "Mood Stability", value: 55, max: 100, color: "#8b5cf6" },
    { name: "Social Connection", value: 70, max: 100, color: "#10b981" },
  ]

  const weeklyERI = [
    { date: "Mon", score: 68, factors: { stress: 70, sleep: 50, mood: 60 } },
    { date: "Tue", score: 72, factors: { stress: 75, sleep: 45, mood: 55 } },
    { date: "Wed", score: 75, factors: { stress: 80, sleep: 40, mood: 50 } },
    { date: "Thu", score: 78, factors: { stress: 85, sleep: 35, mood: 45 } },
    { date: "Fri", score: 74, factors: { stress: 80, sleep: 45, mood: 50 } },
    { date: "Sat", score: 70, factors: { stress: 75, sleep: 55, mood: 60 } },
    { date: "Sun", score: 69, factors: { stress: 70, sleep: 60, mood: 65 } },
  ]

  const riskFactors = [
    {
      factor: "Chronic Stress",
      impact: "High",
      description: "Elevated cortisol levels detected consistently over the past week",
      recommendation: "Practice mindfulness meditation for 10 minutes daily",
    },
    {
      factor: "Sleep Deprivation",
      impact: "High",
      description: "Average sleep duration below 6 hours for 4 consecutive nights",
      recommendation: "Establish a consistent bedtime routine and limit screen time before bed",
    },
    {
      factor: "Social Isolation",
      impact: "Medium",
      description: "Reduced social interactions and support network engagement",
      recommendation: "Schedule regular check-ins with friends or family members",
    },
    {
      factor: "Physical Inactivity",
      impact: "Medium",
      description: "Below recommended daily activity levels",
      recommendation: "Aim for 30 minutes of moderate exercise 3-4 times per week",
    },
  ]

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Emotional Risk Intelligence</h1>
              <p className="text-muted-foreground">Your comprehensive emotional and mental health assessment</p>
            </div>
          </div>

          {/* Current ERI Score */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Current ERI Score</CardTitle>
                <CardDescription>
                  Your overall emotional risk assessment based on multiple health factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className={`text-6xl font-bold ${getRiskColor(data.eriScore)}`}>{data.eriScore}</div>
                    <Badge
                      variant={getRiskBadgeVariant(getRiskLevel(data.eriScore))}
                      className="absolute -top-2 -right-12"
                    >
                      {getRiskLevel(data.eriScore)} Risk
                    </Badge>
                  </div>
                </div>
                <Progress value={data.eriScore} className="mb-4" />
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Your ERI score indicates {getRiskLevel(data.eriScore).toLowerCase()} emotional risk.
                    {data.eriScore >= 70 && " Consider speaking with your healthcare provider."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Breakdown</CardTitle>
                <CardDescription>Contributing factors to your ERI score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {eriComponents.map((component) => (
                  <div key={component.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{component.name}</span>
                      <span className="font-medium">{component.value}%</span>
                    </div>
                    <Progress value={component.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* ERI Trend */}
          <Card>
            <CardHeader>
              <CardTitle>ERI Score Trend</CardTitle>
              <CardDescription>Your emotional risk intelligence over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyERI}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Factors Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Factors Analysis</CardTitle>
              <CardDescription>Detailed breakdown of factors contributing to your ERI score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.map((factor, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {factor.impact === "High" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                        {factor.impact === "Medium" && <Info className="h-5 w-5 text-yellow-500" />}
                        {factor.impact === "Low" && <CheckCircle className="h-5 w-5 text-green-500" />}
                        <h4 className="font-medium">{factor.factor}</h4>
                      </div>
                      <Badge
                        variant={
                          factor.impact === "High"
                            ? "destructive"
                            : factor.impact === "Medium"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {factor.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{factor.description}</p>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm font-medium text-primary">Recommendation:</p>
                      <p className="text-sm">{factor.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Understanding ERI */}
          <Card>
            <CardHeader>
              <CardTitle>Understanding Your ERI Score</CardTitle>
              <CardDescription>What your Emotional Risk Intelligence score means</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">0-59</div>
                  <h4 className="font-medium text-green-600 mb-2">Low Risk</h4>
                  <p className="text-sm text-muted-foreground">
                    Your emotional and mental health indicators are within healthy ranges. Continue your current
                    wellness practices.
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">60-79</div>
                  <h4 className="font-medium text-yellow-600 mb-2">Medium Risk</h4>
                  <p className="text-sm text-muted-foreground">
                    Some risk factors are present. Consider implementing stress management techniques and lifestyle
                    changes.
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600 mb-2">80-100</div>
                  <h4 className="font-medium text-red-600 mb-2">High Risk</h4>
                  <p className="text-sm text-muted-foreground">
                    Multiple risk factors detected. We recommend consulting with your healthcare provider for
                    personalized support.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
