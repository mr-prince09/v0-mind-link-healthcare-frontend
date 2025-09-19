"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, BarChart3, Activity, Settings, CheckCircle, AlertTriangle, XCircle, RefreshCw } from "lucide-react"
import { db } from "@/firebase"
import { collection, getDocs } from "firebase/firestore"

export default function AdminSystemHealth() {
  const [systemStatus, setSystemStatus] = useState({
    database: "healthy",
    api: "healthy",
    authentication: "healthy",
    storage: "healthy",
  })

  const [metrics, setMetrics] = useState({
    uptime: 99.9,
    responseTime: 120,
    activeUsers: 0,
    totalRequests: 0,
  })

  useEffect(() => {
    // Fetch system health data from Firebase or mock data
    const fetchSystemHealth = async () => {
      // For demo, using mock data; replace with real monitoring data
      setSystemStatus({
        database: "healthy",
        api: "healthy",
        authentication: "healthy",
        storage: "healthy",
      })

      setMetrics({
        uptime: 99.9,
        responseTime: 120,
        activeUsers: 42,
        totalRequests: 15420,
      })
    }

    fetchSystemHealth()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "healthy":
        return "default"
      case "warning":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout sidebarItems={[
        { label: "Users", href: "/admin", icon: <Users className="mr-2 h-4 w-4" /> },
        { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="mr-2 h-4 w-4" /> },
        { label: "System Health", href: "/admin/system", icon: <Activity className="mr-2 h-4 w-4" />, active: true },
        { label: "Settings", href: "/admin/settings", icon: <Settings className="mr-2 h-4 w-4" /> },
      ]}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Health Overview</CardTitle>
              <CardDescription>Monitor the health and performance of all system components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  {getStatusIcon(systemStatus.database)}
                  <div>
                    <p className="font-medium">Database</p>
                    <Badge variant={getStatusBadgeVariant(systemStatus.database)}>{systemStatus.database}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  {getStatusIcon(systemStatus.api)}
                  <div>
                    <p className="font-medium">API</p>
                    <Badge variant={getStatusBadgeVariant(systemStatus.api)}>{systemStatus.api}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  {getStatusIcon(systemStatus.authentication)}
                  <div>
                    <p className="font-medium">Authentication</p>
                    <Badge variant={getStatusBadgeVariant(systemStatus.authentication)}>{systemStatus.authentication}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  {getStatusIcon(systemStatus.storage)}
                  <div>
                    <p className="font-medium">Storage</p>
                    <Badge variant={getStatusBadgeVariant(systemStatus.storage)}>{systemStatus.storage}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators for system monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{metrics.uptime}%</div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <Progress value={metrics.uptime} className="mt-2" />
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold">{metrics.responseTime}ms</div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold">{metrics.activeUsers}</div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold">{metrics.totalRequests.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent System Events</CardTitle>
              <CardDescription>Log of recent system activities and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">Database backup completed</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="default">Success</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="font-medium">High CPU usage detected</p>
                      <p className="text-sm text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Warning</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">Security scan completed</p>
                      <p className="text-sm text-muted-foreground">6 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="default">Success</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Actions</CardTitle>
              <CardDescription>Perform system maintenance tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh System Cache
                </Button>
                <Button variant="outline" className="justify-start">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Run Health Check
                </Button>
                <Button variant="outline" className="justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Generate System Report
                </Button>
                <Button variant="outline" className="justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Optimize Database
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
