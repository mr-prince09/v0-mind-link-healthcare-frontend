"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, FileText, TrendingUp, User, Download, Calendar, AlertTriangle, Activity, Brain } from "lucide-react"
import { mockDoctorData } from "@/lib/mock-data"
import { useState } from "react"

const sidebarItems = [
  { label: "Patient List", href: "/doctor", icon: <Users className="mr-2 h-4 w-4" /> },
  { label: "Risk Reports", href: "/doctor/reports", icon: <TrendingUp className="mr-2 h-4 w-4" />, active: true },
  { label: "Summaries", href: "/doctor/summaries", icon: <FileText className="mr-2 h-4 w-4" /> },
  { label: "Profile", href: "/doctor/profile", icon: <User className="mr-2 h-4 w-4" /> },
]

const COLORS = ["#10b981", "#f59e0b", "#ef4444"]

export default function RiskReportsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const data = mockDoctorData

  const riskTrends = [
    { date: "Jan 1", high: 2, medium: 5, low: 3 },
    { date: "Jan 2", high: 1, medium: 6, low: 4 },
    { date: "Jan 3", high: 3, medium: 4, low: 3 },
    { date: "Jan 4", high: 2, medium: 7, low: 2 },
    { date: "Jan 5", high: 1, medium: 5, low: 5 },
    { date: "Jan 6", high: 2, medium: 6, low: 3 },
    { date: "Jan 7", high: 1, medium: 5, low: 4 },
  ]

  const eriDistribution = [
    { range: "0-30", count: 1, color: COLORS[0] },
    { range: "31-60", count: 2, color: COLORS[1] },
    { range: "61-80", count: 2, color: COLORS[1] },
    { range: "81-100", count: 1, color: COLORS[2] },
  ]

  const riskFactors = [
    { factor: "Sleep Disruption", patients: 8, percentage: 80 },
    { factor: "High Stress", patients: 6, percentage: 60 },
    { factor: "Poor HRV", patients: 5, percentage: 50 },
    { factor: "Irregular Heart Rate", patients: 3, percentage: 30 },
    { factor: "Anxiety Episodes", patients: 4, percentage: 40 },
  ]

  const pieData = [
    { name: "Low Risk", value: data.patients.filter((p) => p.riskStatus === "Low").length, color: COLORS[0] },
    { name: "Medium Risk", value: data.patients.filter((p) => p.riskStatus === "Medium").length, color: COLORS[1] },
    { name: "High Risk", value: data.patients.filter((p) => p.riskStatus === "High").length, color: COLORS[2] },
  ]

  return (
    <ProtectedRoute allowedRoles={["doctor"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Risk Reports & Analytics</h1>
              <p className="text-muted-foreground">Comprehensive analysis of patient risk patterns and trends</p>
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
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk Patients</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {data.patients.filter((p) => p.riskStatus === "High").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round(
                    (data.patients.filter((p) => p.riskStatus === "High").length / data.patients.length) * 100,
                  )}
                  % of total patients
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average ERI Score</CardTitle>
                <Brain className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(data.patients.reduce((sum, p) => sum + p.eriScore, 0) / data.patients.length)}
                </div>
                <p className="text-xs text-muted-foreground">Across all patients</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Alerts</CardTitle>
                <Activity className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">+15% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Intervention Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">Successful interventions</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Level Trends</CardTitle>
                <CardDescription>Daily risk distribution over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={riskTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={2} name="High Risk" />
                    <Line type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2} name="Medium Risk" />
                    <Line type="monotone" dataKey="low" stroke="#10b981" strokeWidth={2} name="Low Risk" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Risk Distribution</CardTitle>
                <CardDescription>Patient risk level breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* ERI Score Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>ERI Score Distribution</CardTitle>
              <CardDescription>Patient distribution across ERI score ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={eriDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Factors Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Common Risk Factors</CardTitle>
              <CardDescription>Most prevalent risk factors among your patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{factor.factor}</span>
                        <span className="text-sm text-muted-foreground">
                          {factor.patients} patients ({factor.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${factor.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* High-Risk Patient List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                High-Risk Patients Requiring Attention
              </CardTitle>
              <CardDescription>Patients with elevated risk scores needing immediate review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.patients
                  .filter((p) => p.riskStatus === "High")
                  .map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ERI Score: {patient.eriScore} • Last check-in:{" "}
                            {new Date(patient.lastCheckIn).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">High Risk</Badge>
                        <Button variant="destructive" size="sm">
                          Review Patient
                        </Button>
                      </div>
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
