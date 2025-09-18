"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Users,
  BarChart3,
  Activity,
  Settings,
  Search,
  Filter,
  Edit,
  Trash2,
  Plus,
  Shield,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"

const sidebarItems = [
  { label: "Users", href: "/admin", icon: <Users className="mr-2 h-4 w-4" />, active: true },
  { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="mr-2 h-4 w-4" /> },
  { label: "System Health", href: "/admin/system", icon: <Activity className="mr-2 h-4 w-4" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="mr-2 h-4 w-4" /> },
]

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "patient@demo.com",
    role: "patient",
    status: "active",
    lastLogin: "2024-01-15T10:30:00Z",
    joinDate: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Dr. Sarah Smith",
    email: "doctor@demo.com",
    role: "doctor",
    status: "active",
    lastLogin: "2024-01-15T08:15:00Z",
    joinDate: "2023-12-15T00:00:00Z",
  },
  {
    id: "3",
    name: "Jane Wilson",
    email: "caregiver@demo.com",
    role: "caregiver",
    status: "active",
    lastLogin: "2024-01-14T16:45:00Z",
    joinDate: "2024-01-10T00:00:00Z",
  },
  {
    id: "4",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "patient",
    status: "inactive",
    lastLogin: "2024-01-10T12:20:00Z",
    joinDate: "2023-11-20T00:00:00Z",
  },
  {
    id: "5",
    name: "Dr. Emily Davis",
    email: "emily.davis@hospital.com",
    role: "doctor",
    status: "active",
    lastLogin: "2024-01-15T14:30:00Z",
    joinDate: "2023-10-05T00:00:00Z",
  },
]

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "doctor":
        return "default"
      case "caregiver":
        return "secondary"
      case "patient":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "suspended":
        return "destructive"
      default:
        return "outline"
    }
  }

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const userStats = {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === "active").length,
    patients: mockUsers.filter((u) => u.role === "patient").length,
    doctors: mockUsers.filter((u) => u.role === "doctor").length,
    caregivers: mockUsers.filter((u) => u.role === "caregiver").length,
  }

  const roleDistribution = [
    { name: "Patients", value: userStats.patients, color: COLORS[0] },
    { name: "Doctors", value: userStats.doctors, color: COLORS[1] },
    { name: "Caregivers", value: userStats.caregivers, color: COLORS[2] },
  ]

  const monthlySignups = [
    { month: "Oct", signups: 12 },
    { month: "Nov", signups: 18 },
    { month: "Dec", signups: 25 },
    { month: "Jan", signups: 32 },
  ]

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-muted-foreground">Manage users, roles, and system access</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.total}</div>
                <p className="text-xs text-muted-foreground">Registered users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{userStats.active}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((userStats.active / userStats.total) * 100)}% of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Patients</CardTitle>
                <Shield className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.patients}</div>
                <p className="text-xs text-muted-foreground">Patient accounts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Healthcare Providers</CardTitle>
                <Activity className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.doctors + userStats.caregivers}</div>
                <p className="text-xs text-muted-foreground">Doctors & caregivers</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Role Distribution</CardTitle>
                <CardDescription>Breakdown of user types in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={roleDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {roleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Signups</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlySignups}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="signups" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="patient">Patients</SelectItem>
                <SelectItem value="doctor">Doctors</SelectItem>
                <SelectItem value="caregiver">Caregivers</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                {filteredUsers.length} of {mockUsers.length} users
                {searchTerm && ` matching "${searchTerm}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
