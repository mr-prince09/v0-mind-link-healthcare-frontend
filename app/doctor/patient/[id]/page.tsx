"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Users,
  FileText,
  TrendingUp,
  User,
  ArrowLeft,
  Copy,
  Save,
  Brain,
  Heart,
  Activity,
  Moon,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { mockPatientData } from "@/lib/mock-data"
import { useState } from "react"
import { useRouter } from "next/navigation"

const sidebarItems = [
  { label: "Patient List", href: "/doctor", icon: <Users className="mr-2 h-4 w-4" /> },
  { label: "Risk Reports", href: "/doctor/reports", icon: <TrendingUp className="mr-2 h-4 w-4" /> },
  { label: "Summaries", href: "/doctor/summaries", icon: <FileText className="mr-2 h-4 w-4" /> },
  { label: "Profile", href: "/doctor/profile", icon: <User className="mr-2 h-4 w-4" /> },
]

export default function PatientDetailPage() {
  const [notes, setNotes] = useState(
    "Patient shows elevated stress levels. Recommend increased monitoring and stress management interventions.",
  )
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const data = mockPatientData

  const aiSummary = `Patient Summary - ${data.name}

EMOTIONAL HEALTH STATUS:
• Current ERI Score: ${data.eriScore}/100 (${data.riskLevel} Risk)
• Primary concerns: Elevated stress levels, sleep disruption
• Recent trend: Slight improvement in HRV, concerning stress patterns

PHYSICAL HEALTH INDICATORS:
• Heart Rate: ${data.vitals.heartRate} bpm (normal range)
• HRV: ${data.vitals.hrv} ms (below optimal)
• Sleep: ${data.vitals.sleepHours} hours (insufficient)
• Stress Level: ${data.vitals.stressLevel}% (elevated)

RECENT ALERTS:
• High-priority: Possible panic attack detected (8:32 PM)
• Medium-priority: Sleep quality below average (3 consecutive nights)

RECOMMENDATIONS:
1. Immediate: Stress management intervention
2. Short-term: Sleep hygiene optimization
3. Long-term: Regular mindfulness practice

CLINICAL NOTES:
Patient would benefit from integrated approach combining stress reduction techniques with sleep optimization. Consider referral to behavioral health specialist if stress levels remain elevated.`

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiSummary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ProtectedRoute allowedRoles={["doctor"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patient List
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{data.name}</h1>
              <p className="text-muted-foreground">Patient ID: {data.id} • Age: 45</p>
            </div>
          </div>

          {/* Patient Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Patient Health Summary</span>
                <Badge variant={getRiskBadgeVariant(data.riskLevel)} className="text-sm">
                  {data.riskLevel} Risk
                </Badge>
              </CardTitle>
              <CardDescription>Combined emotional and physical health overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className={`text-2xl font-bold ${getRiskColor(data.eriScore)}`}>{data.eriScore}</div>
                  <p className="text-sm text-muted-foreground">ERI Score</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{data.vitals.heartRate}</div>
                  <p className="text-sm text-muted-foreground">Heart Rate (bpm)</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{data.vitals.hrv}</div>
                  <p className="text-sm text-muted-foreground">HRV (ms)</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Moon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{data.vitals.sleepHours}h</div>
                  <p className="text-sm text-muted-foreground">Sleep Duration</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ERI Score History</CardTitle>
                <CardDescription>7-day emotional risk assessment trend</CardDescription>
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

            <Card>
              <CardHeader>
                <CardTitle>Heart Rate Monitoring</CardTitle>
                <CardDescription>24-hour heart rate pattern</CardDescription>
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
          </div>

          {/* AI Summary and Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>AI-Generated Summary</span>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </CardTitle>
                <CardDescription>Comprehensive health analysis and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap font-mono">{aiSummary}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Clinical Notes</CardTitle>
                <CardDescription>Your observations and treatment notes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter your clinical notes here..."
                  className="min-h-[200px]"
                />
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts & Events</CardTitle>
              <CardDescription>Important notifications and health events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {alert.severity === "high" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                      {alert.severity === "medium" && <Clock className="h-5 w-5 text-yellow-500" />}
                      {alert.severity === "low" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                      <Badge variant={alert.severity === "high" ? "destructive" : "secondary"} className="mt-2">
                        {alert.severity} priority
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button size="lg">Schedule Follow-up</Button>
            <Button variant="outline" size="lg">
              Send Message
            </Button>
            <Button variant="outline" size="lg">
              Update Treatment Plan
            </Button>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
