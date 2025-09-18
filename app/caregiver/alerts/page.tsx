"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Home,
  Clock,
  Bell,
  User,
  AlertTriangle,
  Phone,
  MessageCircle,
  Search,
  Filter,
  Moon,
  Heart,
  Activity,
  Brain,
} from "lucide-react"
import { useState } from "react"

const sidebarItems = [
  { label: "Overview", href: "/caregiver", icon: <Home className="mr-2 h-4 w-4" /> },
  { label: "Patient Timeline", href: "/caregiver/timeline", icon: <Clock className="mr-2 h-4 w-4" /> },
  { label: "Alerts", href: "/caregiver/alerts", icon: <Bell className="mr-2 h-4 w-4" />, active: true },
  { label: "Profile", href: "/caregiver/profile", icon: <User className="mr-2 h-4 w-4" /> },
]

const mockAlerts = [
  {
    id: "1",
    type: "emergency",
    title: "Possible Panic Attack Detected",
    message: "Heart rate spiked to 120 bpm with irregular pattern. Patient reported feeling overwhelmed.",
    timestamp: "2024-01-15T20:32:00Z",
    severity: "high",
    status: "unread",
    category: "mental_health",
  },
  {
    id: "2",
    type: "health",
    title: "Sleep Quality Alert",
    message: "Poor sleep quality for 3 consecutive nights. Average sleep duration: 4.8 hours.",
    timestamp: "2024-01-15T09:15:00Z",
    severity: "medium",
    status: "unread",
    category: "sleep",
  },
  {
    id: "3",
    type: "medication",
    title: "Medication Reminder",
    message: "Morning medications due in 30 minutes. Blood pressure medication included.",
    timestamp: "2024-01-15T07:30:00Z",
    severity: "low",
    status: "read",
    category: "medication",
  },
  {
    id: "4",
    type: "vitals",
    title: "Blood Pressure Elevated",
    message: "Blood pressure reading: 155/95 mmHg. Above normal range for patient.",
    timestamp: "2024-01-14T18:45:00Z",
    severity: "medium",
    status: "responded",
    category: "vitals",
  },
  {
    id: "5",
    type: "positive",
    title: "Heart Rate Variability Improved",
    message: "HRV has improved by 15% over the past week. Stress management techniques showing results.",
    timestamp: "2024-01-14T14:20:00Z",
    severity: "low",
    status: "read",
    category: "vitals",
  },
  {
    id: "6",
    type: "emergency",
    title: "Fall Detection Alert",
    message: "Sudden movement pattern detected consistent with a fall. No response to check-in.",
    timestamp: "2024-01-13T16:22:00Z",
    severity: "high",
    status: "responded",
    category: "safety",
  },
]

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const [responseText, setResponseText] = useState("")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "outline"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "unread":
        return "destructive"
      case "read":
        return "secondary"
      case "responded":
        return "default"
      default:
        return "outline"
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
      case "safety":
        return <AlertTriangle className="h-4 w-4" />
      case "medication":
        return <Activity className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const filteredAlerts = mockAlerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    return matchesSearch && matchesSeverity && matchesStatus
  })

  const handleEmergencyCall = () => {
    window.open("tel:911", "_self")
  }

  const handleContactDoctor = () => {
    window.open("tel:+1-555-0123", "_self")
  }

  const handleMarkAsRead = (alertId: string) => {
    // In a real app, this would update the alert status
    console.log("Marking alert as read:", alertId)
  }

  const handleRespond = (alertId: string) => {
    // In a real app, this would send the response
    console.log("Responding to alert:", alertId, "Response:", responseText)
    setSelectedAlert(null)
    setResponseText("")
  }

  return (
    <ProtectedRoute allowedRoles={["caregiver"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
              <p className="text-muted-foreground">Monitor and respond to important health alerts</p>
            </div>
            <div className="flex gap-2">
              <Button variant="destructive" onClick={handleEmergencyCall}>
                <Phone className="mr-2 h-4 w-4" />
                Emergency Call
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Alert Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {mockAlerts.filter((a) => a.severity === "high").length}
                </div>
                <p className="text-xs text-muted-foreground">Require immediate attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Unread</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockAlerts.filter((a) => a.status === "unread").length}</div>
                <p className="text-xs text-muted-foreground">New notifications</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockAlerts.filter((a) => new Date(a.timestamp).toDateString() === new Date().toDateString()).length}
                </div>
                <p className="text-xs text-muted-foreground">Alerts today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((mockAlerts.filter((a) => a.status === "responded").length / mockAlerts.length) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">Alerts responded to</p>
              </CardContent>
            </Card>
          </div>

          {/* Alerts List */}
          <Card>
            <CardHeader>
              <CardTitle>All Alerts</CardTitle>
              <CardDescription>
                {filteredAlerts.length} of {mockAlerts.length} alerts
                {searchTerm && ` matching "${searchTerm}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border rounded-lg ${
                      alert.severity === "high"
                        ? "border-red-200 bg-red-50"
                        : alert.severity === "medium"
                          ? "border-yellow-200 bg-yellow-50"
                          : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex-shrink-0 mt-1">{getCategoryIcon(alert.category)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{alert.title}</h3>
                            <Badge variant={getSeverityBadgeVariant(alert.severity)}>{alert.severity} priority</Badge>
                            <Badge variant={getStatusBadgeVariant(alert.status)}>{alert.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {alert.status === "unread" && (
                          <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(alert.id)}>
                            Mark Read
                          </Button>
                        )}
                        {alert.severity === "high" && (
                          <Button variant="destructive" size="sm" onClick={handleContactDoctor}>
                            <Phone className="mr-2 h-4 w-4" />
                            Call Doctor
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => setSelectedAlert(alert)}>
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Respond
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Response Modal */}
          {selectedAlert && (
            <Card className="fixed inset-4 z-50 bg-background border shadow-lg">
              <CardHeader>
                <CardTitle>Respond to Alert</CardTitle>
                <CardDescription>{selectedAlert.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">{selectedAlert.message}</p>
                </div>
                <Textarea
                  placeholder="Enter your response or action taken..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button onClick={() => handleRespond(selectedAlert.id)}>Send Response</Button>
                  <Button variant="outline" onClick={() => setSelectedAlert(null)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
