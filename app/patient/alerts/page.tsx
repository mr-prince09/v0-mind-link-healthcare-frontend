"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Home,
  Activity,
  Brain,
  Lightbulb,
  Bell,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Moon,
  Zap,
  Phone,
  MessageCircle,
  X,
} from "lucide-react"
import { mockPatientData } from "@/lib/mock-data"
import { useState } from "react"

const sidebarItems = [
  { label: "Overview", href: "/patient", icon: <Home className="mr-2 h-4 w-4" /> },
  { label: "Vitals", href: "/patient/vitals", icon: <Activity className="mr-2 h-4 w-4" /> },
  { label: "ERI Score", href: "/patient/eri", icon: <Brain className="mr-2 h-4 w-4" /> },
  { label: "Recommendations", href: "/patient/recommendations", icon: <Lightbulb className="mr-2 h-4 w-4" /> },
  { label: "Alerts", href: "/patient/alerts", icon: <Bell className="mr-2 h-4 w-4" />, active: true },
  { label: "Profile", href: "/patient/profile", icon: <User className="mr-2 h-4 w-4" /> },
]

export default function PatientAlerts() {
  const [filter, setFilter] = useState("all")
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])
  const data = mockPatientData

  const allAlerts = [
    {
      id: "1",
      type: "emergency",
      severity: "high",
      title: "Possible Panic Attack Detected",
      message:
        "Elevated heart rate (105 bpm) and stress indicators detected at 8:32 PM. Consider contacting your caregiver.",
      timestamp: "2024-01-15T20:32:00Z",
      read: false,
      actionRequired: true,
      category: "mental_health",
    },
    {
      id: "2",
      type: "health",
      severity: "medium",
      title: "Sleep Pattern Alert",
      message: "Poor sleep quality detected for 3 consecutive nights. Average sleep duration: 5.2 hours.",
      timestamp: "2024-01-15T08:00:00Z",
      read: false,
      actionRequired: false,
      category: "sleep",
    },
    {
      id: "3",
      type: "medication",
      severity: "medium",
      title: "Medication Reminder",
      message: "Time to take your evening medication. Don't forget your blood pressure medication.",
      timestamp: "2024-01-15T19:00:00Z",
      read: true,
      actionRequired: true,
      category: "medication",
    },
    {
      id: "4",
      type: "vitals",
      severity: "low",
      title: "Heart Rate Variability Low",
      message: "Your HRV has been below average for the past 2 days. Consider stress reduction techniques.",
      timestamp: "2024-01-15T12:15:00Z",
      read: true,
      actionRequired: false,
      category: "vitals",
    },
    {
      id: "5",
      type: "appointment",
      severity: "low",
      title: "Upcoming Appointment",
      message: "Reminder: You have a check-up with Dr. Smith tomorrow at 2:00 PM.",
      timestamp: "2024-01-14T16:00:00Z",
      read: false,
      actionRequired: false,
      category: "appointment",
    },
    {
      id: "6",
      type: "achievement",
      severity: "low",
      title: "Wellness Goal Achieved",
      message: "Congratulations! You've completed 7 days of meditation practice.",
      timestamp: "2024-01-14T09:00:00Z",
      read: true,
      actionRequired: false,
      category: "achievement",
    },
  ]

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "medium":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mental_health":
        return <Brain className="h-4 w-4" />
      case "sleep":
        return <Moon className="h-4 w-4" />
      case "vitals":
        return <Heart className="h-4 w-4" />
      case "medication":
        return <Zap className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "secondary"
    }
  }

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => [...prev, alertId])
  }

  const filteredAlerts = allAlerts
    .filter((alert) => !dismissedAlerts.includes(alert.id))
    .filter((alert) => {
      if (filter === "all") return true
      if (filter === "unread") return !alert.read
      if (filter === "high") return alert.severity === "high"
      if (filter === "action") return alert.actionRequired
      return true
    })

  const alertStats = {
    total: allAlerts.filter((alert) => !dismissedAlerts.includes(alert.id)).length,
    unread: allAlerts.filter((alert) => !alert.read && !dismissedAlerts.includes(alert.id)).length,
    high: allAlerts.filter((alert) => alert.severity === "high" && !dismissedAlerts.includes(alert.id)).length,
    actionRequired: allAlerts.filter((alert) => alert.actionRequired && !dismissedAlerts.includes(alert.id)).length,
  }

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Health Alerts & Notifications</h1>
              <p className="text-muted-foreground">Stay informed about your health status and important updates</p>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Alerts</SelectItem>
                <SelectItem value="unread">Unread Only</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="action">Action Required</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Alert Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
                <Bell className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{alertStats.total}</div>
                <p className="text-xs text-muted-foreground">Active notifications</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unread</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{alertStats.unread}</div>
                <p className="text-xs text-muted-foreground">Need your attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{alertStats.high}</div>
                <p className="text-xs text-muted-foreground">Urgent alerts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Action Required</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{alertStats.actionRequired}</div>
                <p className="text-xs text-muted-foreground">Need response</p>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Actions */}
          {alertStats.high > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Actions Available
                </CardTitle>
                <CardDescription className="text-red-700">
                  High priority alerts detected. Quick actions are available below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button variant="destructive" size="sm">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Emergency Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message Caregiver
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="mr-2 h-4 w-4" />
                    Contact Doctor
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Alerts List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>
                {filteredAlerts.length} of {alertStats.total} alerts
                {filter !== "all" && ` (filtered by ${filter})`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAlerts.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No alerts to show</h3>
                    <p className="text-muted-foreground">
                      {filter === "all"
                        ? "You're all caught up! No active alerts at this time."
                        : `No alerts match the current filter: ${filter}`}
                    </p>
                  </div>
                ) : (
                  filteredAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`border rounded-lg p-4 ${
                        alert.severity === "high"
                          ? "border-red-200 bg-red-50"
                          : alert.severity === "medium"
                            ? "border-yellow-200 bg-yellow-50"
                            : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getSeverityIcon(alert.severity)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{alert.title}</h4>
                              {!alert.read && (
                                <Badge variant="secondary" className="text-xs">
                                  New
                                </Badge>
                              )}
                              <Badge variant={getSeverityBadgeVariant(alert.severity)}>{alert.severity} priority</Badge>
                              {alert.actionRequired && <Badge variant="outline">Action Required</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                {getCategoryIcon(alert.category)}
                                <span className="capitalize">{alert.category.replace("_", " ")}</span>
                              </div>
                              <div>{new Date(alert.timestamp).toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => dismissAlert(alert.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {alert.actionRequired && (
                        <div className="mt-3 pt-3 border-t flex gap-2">
                          {alert.severity === "high" && (
                            <>
                              <Button size="sm" variant="destructive">
                                Take Action
                              </Button>
                              <Button size="sm" variant="outline">
                                Contact Support
                              </Button>
                            </>
                          )}
                          {alert.type === "medication" && <Button size="sm">Mark as Taken</Button>}
                          {alert.severity !== "high" && alert.type !== "medication" && (
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
