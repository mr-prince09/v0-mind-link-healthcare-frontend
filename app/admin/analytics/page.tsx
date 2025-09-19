"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts"
import { Users, BarChart3, Activity } from "lucide-react"
import { db } from "@/firebase"
import { collection, getDocs } from "firebase/firestore"

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]

export default function AdminAnalytics() {
  const [userStats, setUserStats] = useState({
    total: 0,
    active: 0,
    patients: 0,
    doctors: 0,
    caregivers: 0,
  })

  const [monthlySignups, setMonthlySignups] = useState([
    { month: "Oct", signups: 0 },
    { month: "Nov", signups: 0 },
    { month: "Dec", signups: 0 },
    { month: "Jan", signups: 0 },
  ])

  const [roleDistribution, setRoleDistribution] = useState([
    { name: "Patients", value: 0, color: COLORS[0] },
    { name: "Doctors", value: 0, color: COLORS[1] },
    { name: "Caregivers", value: 0, color: COLORS[2] },
  ])

  useEffect(() => {
    // Fetch user data from Firebase and update stats
    const fetchUserData = async () => {
      const usersCol = collection(db, "users")
      const userSnapshot = await getDocs(usersCol)
      const users = userSnapshot.docs.map(doc => doc.data())

      const total = users.length
      const active = users.filter((u: any) => u.status === "active").length
      const patients = users.filter((u: any) => u.role === "patient").length
      const doctors = users.filter((u: any) => u.role === "doctor").length
      const caregivers = users.filter((u: any) => u.role === "caregiver").length

      setUserStats({ total, active, patients, doctors, caregivers })

      setRoleDistribution([
        { name: "Patients", value: patients, color: COLORS[0] },
        { name: "Doctors", value: doctors, color: COLORS[1] },
        { name: "Caregivers", value: caregivers, color: COLORS[2] },
      ])

      // For demo, static monthly signups data; replace with real data fetch if available
      setMonthlySignups([
        { month: "Oct", signups: 12 },
        { month: "Nov", signups: 18 },
        { month: "Dec", signups: 25 },
        { month: "Jan", signups: 32 },
      ])
    }

    fetchUserData()
  }, [])

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout sidebarItems={[
        { label: "Users", href: "/admin", icon: <Users className="mr-2 h-4 w-4" /> },
        { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="mr-2 h-4 w-4" />, active: true },
        { label: "System Health", href: "/admin/system", icon: <Activity className="mr-2 h-4 w-4" /> },
        { label: "Settings", href: "/admin/settings", icon: <></> },
      ]}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
              <CardDescription>Overview of user activity and roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold">{userStats.total}</div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{userStats.active}</div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold">{userStats.patients}</div>
                  <p className="text-sm text-muted-foreground">Patients</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold">{userStats.doctors + userStats.caregivers}</div>
                  <p className="text-sm text-muted-foreground">Doctors & Caregivers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Role Distribution</CardTitle>
              <CardDescription>Breakdown of user roles in the system</CardDescription>
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
      </DashboardLayout>
    </ProtectedRoute>
  )
}
