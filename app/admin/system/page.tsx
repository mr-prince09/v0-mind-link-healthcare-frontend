"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import {
  Users,
  BarChart3,
  Activity,
  Settings,
  Server,
  Database,
  HardDrive,
  Cpu,
  MemoryStick,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
} from "lucide-react"
import { useState } from "react"

const sidebarItems = [
  { label: "Users", href: "/admin", icon: <Users className="mr-2 h-4 w-4" /> },
  { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="mr-2 h-4 w-4" /> },
  { label: "System Health", href: "/admin/system", icon: <Activity className="mr-2 h-4 w-4" />, active: true },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="mr-2 h-4 w-4" /> },
]

export default function AdminSystemHealth() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const systemMetrics = {
    uptime: "99.97%",
    responseTime: "145ms",
    activeUsers: 1247,
    totalRequests: 45678,
    errorRate: "0.03%",
    dataProcessed: "2.4TB",
  }

  const serverStatus = [
    { name: "Web Server 1", status: "healthy", cpu: 45, memory: 62, disk: 78, uptime: "15 days" },
    { name: "Web Server 2", status: "healthy", cpu: 38, memory: 55, disk: 82, uptime: "15 days" },
    { name: "Database Primary", status: "healthy", cpu: 72, memory: 84, disk: 65, uptime: "30 days" },
    { name: "Database Replica", status: "warning", cpu: 89, memory: 91, disk: 88, uptime: "12 days" },
    { name: "AI Processing", status: "healthy", cpu: 56, memory: 67, disk: 45, uptime: "8 days" },
    { name: "File Storage", status: "healthy", cpu: 23, memory: 34, disk: 92, uptime: "45 days" },
  ]

  const performanceData = [
    { time: "00:00", responseTime: 120, requests: 450, errors: 2 },
    { time: "04:00", responseTime: 110, requests: 320, errors: 1 },
    { time: "08:00", responseTime: 180, requests: 890, errors: 5 },
    { time: "12:00", responseTime: 165, requests: 1200, errors: 8 },
    { time: "16:00", responseTime: 145, requests: 1100, errors: 3 },
    { time: "20:00", responseTime: 135, requests: 780, errors: 2 },
  ]

  const systemAlerts = [
    {
      id: "1",
      severity: "warning",
      title: "High Memory Usage",
      description: "Database Replica server memory usage at 91%",
      timestamp: "2024-01-15T14:30:00Z",
      resolved: false,
    },
    {
      id: "2",
      severity: "info",
      title: "Scheduled Maintenance",
      description: "System maintenance scheduled for tonight at 2:00 AM",
      timestamp: "2024-01-15T12:00:00Z",
      resolved: false,
    },
    {
      id: "3",
      severity: "resolved",
      title: "API Rate Limit Exceeded",
      description: "Rate limit exceeded for external API calls - now resolved",
      timestamp: "2024-01-15T10:15:00Z",
      resolved: true,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return "default"
      case "warning":
        return "secondary"
      case "critical":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "info":
        return <Activity className="h-4 w-4 text-blue-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">System Health Monitor</h1>
              <p className="text-muted-foreground">Real-time monitoring of system performance and health</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</div>
              <Button onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* System Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <Server className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{systemMetrics.uptime}</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                <Activity className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemMetrics.responseTime}</div>
                <p className="text-xs text-muted-foreground">Average response time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemMetrics.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Currently online</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <BarChart3 className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemMetrics.totalRequests.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{systemMetrics.errorRate}</div>
                <p className="text-xs text-muted-foreground">Very low error rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Processed</CardTitle>
                <Database className="h-4 w-4 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemMetrics.dataProcessed}</div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Trend</CardTitle>
                <CardDescription>Average response time over the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Volume</CardTitle>
                <CardDescription>Number of requests processed over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="requests" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Server Status */}
          <Card>
            <CardHeader>
              <CardTitle>Server Status</CardTitle>
              <CardDescription>Real-time status of all system components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {serverStatus.map((server, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{server.name}</h4>
                      <Badge variant={getStatusBadge(server.status) as any}>{server.status}</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-4 w-4" />
                          <span>CPU</span>
                        </div>
                        <span>{server.cpu}%</span>
                      </div>
                      <Progress value={server.cpu} className="h-2" />

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <MemoryStick className="h-4 w-4" />
                          <span>Memory</span>
                        </div>
                        <span>{server.memory}%</span>
                      </div>
                      <Progress value={server.memory} className="h-2" />

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4" />
                          <span>Disk</span>
                        </div>
                        <span>{server.disk}%</span>
                      </div>
                      <Progress value={server.disk} className="h-2" />

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Uptime</span>
                        <span>{server.uptime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge
                          variant={
                            alert.resolved ? "default" : alert.severity === "warning" ? "secondary" : "destructive"
                          }
                        >
                          {alert.resolved ? "Resolved" : alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                    </div>
                    {!alert.resolved && (
                      <Button variant="outline" size="sm">
                        Resolve
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
