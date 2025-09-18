"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts"
import { Users, BarChart3, Activity, Settings, AlertTriangle, Brain } from "lucide-react"
import { useState } from "react"

const sidebarItems = [
  { label: "Users", href: "/admin", icon: <Users className="mr-2 h-4 w-4" /> },
  { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="mr-2 h-4 w-4" />, active: true },
  { label: "System Health", href: "/admin/system", icon: <Activity className="mr-2 h-4 w-4" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="mr-2 h-4 w-4" /> },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const userGrowth = [
    { month: "Aug", patients: 45, doctors: 8, caregivers: 12 },
    { month: "Sep", patients: 52, doctors: 10, caregivers: 15 },
    { month: "Oct", patients: 68, doctors: 12, caregivers: 18 },
    { month: "Nov", patients: 85, doctors: 15, caregivers: 22 },
    { month: "Dec", patients: 102, doctors: 18, caregivers: 28 },
    { month: "Jan", patients: 125, doctors: 22, caregivers: 35 },
  ]

  const alertsData = [
    { date: "Jan 1", high: 5, medium: 12, low: 8 },
    { date: "Jan 2", high: 3, medium: 15, low: 10 },
    { date: "Jan 3", high: 7, medium: 18, low: 12 },
    { date: "Jan 4", high: 4, medium: 14, low: 9 },
    { date: "Jan 5", high: 6, medium: 16, low: 11 },
    { date: "Jan 6", high: 2, medium: 13, low: 7 },
    { date: "Jan 7", high: 8, medium: 20, low: 15 },
  ]

  const eriScoreDistribution = [
    { range: "0-20", count: 15, percentage: 12 },
    { range: "21-40", count: 28, percentage: 23 },
    { range: "41-60", count: 45, percentage: 37 },
    { range: "61-80", count: 25, percentage: 20 },
    { range: "81-100", count: 10, percentage: 8 },
  ]

  const systemUsage = [
    { hour: "00", active: 12 },
    { hour: "04", active: 8 },
    { hour: "08", active: 45 },
    { hour: "12", active: 78 },
    { hour: "16", active: 65 },
    { hour: "20", active: 52 },
  ]

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">System Analytics</h1>
              <p className="text-muted-foreground">Comprehensive insights into platform usage and performance</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">125</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg ERI Score</CardTitle>
                <Brain className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">58</div>
                <p className="text-xs text-muted-foreground">Platform average</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <Activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth Trends</CardTitle>
              <CardDescription>Monthly growth across all user types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="patients" stackId="1" stroke="#10b981" fill="#10b981" />
                  <Area type="monotone" dataKey="doctors" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                  <Area type="monotone" dataKey="caregivers" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Distribution</CardTitle>
                <CardDescription>Daily alert volume by severity</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={alertsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="high" fill="#ef4444" name="High Priority" />
                    <Bar dataKey="medium" fill="#f59e0b" name="Medium Priority" />
                    <Bar dataKey="low" fill="#10b981" name="Low Priority" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Usage Pattern</CardTitle>
                <CardDescription>Active users throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={systemUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* ERI Score Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>ERI Score Distribution</CardTitle>
              <CardDescription>Patient risk level distribution across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={eriScoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Response Time</CardTitle>
                <CardDescription>Average API response time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">245ms</div>
                <p className="text-sm text-muted-foreground">-15ms from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Error Rate</CardTitle>
                <CardDescription>System error percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">0.02%</div>
                <p className="text-sm text-muted-foreground">Within acceptable range</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Processing</CardTitle>
                <CardDescription>Daily health data points</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2.4M</div>
                <p className="text-sm text-muted-foreground">Processed today</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
