"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Users, FileText, TrendingUp, User, Search, Filter, AlertTriangle, Clock, Eye, Brain } from "lucide-react"
import { mockDoctorData } from "@/lib/mock-data"
import { useState } from "react"
import { useRouter } from "next/navigation"

const sidebarItems = [
  { label: "Patient List", href: "/doctor", icon: <Users className="mr-2 h-4 w-4" />, active: true },
  { label: "Risk Reports", href: "/doctor/reports", icon: <TrendingUp className="mr-2 h-4 w-4" /> },
  { label: "Summaries", href: "/doctor/summaries", icon: <FileText className="mr-2 h-4 w-4" /> },
  { label: "Profile", href: "/doctor/profile", icon: <User className="mr-2 h-4 w-4" /> },
]

export default function DoctorDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const router = useRouter()
  const data = mockDoctorData

  const getRiskBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
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

  const getRiskColor = (status: string) => {
    switch (status.toLowerCase()) {
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

  const filteredPatients = data.patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === "all" || patient.riskStatus.toLowerCase() === riskFilter.toLowerCase()
    return matchesSearch && matchesRisk
  })

  const riskDistribution = [
    { name: "Low Risk", count: data.patients.filter((p) => p.riskStatus === "Low").length, color: "#10b981" },
    { name: "Medium Risk", count: data.patients.filter((p) => p.riskStatus === "Medium").length, color: "#f59e0b" },
    { name: "High Risk", count: data.patients.filter((p) => p.riskStatus === "High").length, color: "#ef4444" },
  ]

  const weeklyTrends = [
    { day: "Mon", alerts: 3, patients: 8 },
    { day: "Tue", alerts: 5, patients: 12 },
    { day: "Wed", alerts: 2, patients: 6 },
    { day: "Thu", alerts: 7, patients: 15 },
    { day: "Fri", alerts: 4, patients: 10 },
    { day: "Sat", alerts: 1, patients: 3 },
    { day: "Sun", alerts: 2, patients: 5 },
  ]

  return (
    <ProtectedRoute allowedRoles={["doctor"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header with Search */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Patient Management</h1>
              <p className="text-muted-foreground">Monitor and manage your patients' emotional and physical health</p>
            </div>
            <div className="flex gap-2 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.patients.length}</div>
                <p className="text-xs text-muted-foreground">Active patients</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {data.patients.filter((p) => p.riskStatus === "High").length}
                </div>
                <p className="text-xs text-muted-foreground">Require immediate attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Check-ins</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    data.patients.filter((p) => {
                      const checkIn = new Date(p.lastCheckIn)
                      const today = new Date()
                      return today.getTime() - checkIn.getTime() < 24 * 60 * 60 * 1000
                    }).length
                  }
                </div>
                <p className="text-xs text-muted-foreground">In the last 24 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg ERI Score</CardTitle>
                <Brain className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(data.patients.reduce((sum, p) => sum + p.eriScore, 0) / data.patients.length)}
                </div>
                <p className="text-xs text-muted-foreground">Across all patients</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Patient risk level breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Alerts and patient interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="alerts" stroke="#ef4444" strokeWidth={2} name="Alerts" />
                    <Line type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={2} name="Patient Visits" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Patient List Table */}
          <Card>
            <CardHeader>
              <CardTitle>Patient List</CardTitle>
              <CardDescription>
                {filteredPatients.length} of {data.patients.length} patients
                {searchTerm && ` matching "${searchTerm}"`}
                {riskFilter !== "all" && ` with ${riskFilter} risk`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>ERI Score</TableHead>
                    <TableHead>Risk Status</TableHead>
                    <TableHead>Last Check-in</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${getRiskColor(patient.riskStatus)}`}>{patient.eriScore}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRiskBadgeVariant(patient.riskStatus)}>{patient.riskStatus}</Badge>
                      </TableCell>
                      <TableCell>{new Date(patient.lastCheckIn).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/doctor/patient/${patient.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* High Priority Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                High Priority Alerts
              </CardTitle>
              <CardDescription>Patients requiring immediate attention</CardDescription>
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
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ERI Score: {patient.eriScore} - Last check-in:{" "}
                            {new Date(patient.lastCheckIn).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => router.push(`/doctor/patient/${patient.id}`)}
                      >
                        Review Now
                      </Button>
                    </div>
                  ))}
                {data.patients.filter((p) => p.riskStatus === "High").length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No high-priority alerts at this time</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
