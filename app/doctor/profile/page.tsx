"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, FileText, TrendingUp, User, Edit, Save, Bell, Shield, Calendar, Mail, Phone } from "lucide-react"
import { useState } from "react"

const sidebarItems = [
  { label: "Patient List", href: "/doctor", icon: <Users className="mr-2 h-4 w-4" /> },
  { label: "Risk Reports", href: "/doctor/reports", icon: <TrendingUp className="mr-2 h-4 w-4" /> },
  { label: "Summaries", href: "/doctor/summaries", icon: <FileText className="mr-2 h-4 w-4" /> },
  { label: "Profile", href: "/doctor/profile", icon: <User className="mr-2 h-4 w-4" />, active: true },
]

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Smith",
    email: "doctor@demo.com",
    phone: "+1 (555) 123-4567",
    specialization: "Psychiatry",
    licenseNumber: "MD123456789",
    hospital: "General Hospital",
    department: "Mental Health",
    bio: "Experienced psychiatrist specializing in anxiety disorders and digital therapeutics. Passionate about integrating technology with traditional mental health care.",
    yearsExperience: 12,
    education: "MD from Harvard Medical School, Residency at Johns Hopkins",
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    highRiskPatients: true,
    weeklyReports: true,
    systemUpdates: false,
  })

  const [preferences, setPreferences] = useState({
    defaultView: "patient-list",
    alertThreshold: "medium",
    autoGenerateReports: true,
    shareDataForResearch: false,
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Profile saved:", { profile, notifications, preferences })
  }

  const stats = {
    totalPatients: 47,
    activePatients: 42,
    highRiskPatients: 8,
    reportsGenerated: 156,
    avgResponseTime: "2.3 hours",
    patientSatisfaction: 4.8,
  }

  return (
    <ProtectedRoute allowedRoles={["doctor"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Doctor Profile</h1>
              <p className="text-muted-foreground">Manage your professional information and preferences</p>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Profile Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>Your medical credentials and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/doctor-avatar.png" alt={profile.name} />
                    <AvatarFallback>
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    {isEditing ? (
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="text-lg font-semibold"
                      />
                    ) : (
                      <h3 className="text-lg font-semibold">{profile.name}</h3>
                    )}
                    <Badge variant="default" className="mt-1">
                      {profile.specialization}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.email}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.phone}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">Medical License</Label>
                    {isEditing ? (
                      <Input
                        id="license"
                        value={profile.licenseNumber}
                        onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.licenseNumber}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    {isEditing ? (
                      <Input
                        id="experience"
                        type="number"
                        value={profile.yearsExperience}
                        onChange={(e) => setProfile({ ...profile, yearsExperience: Number.parseInt(e.target.value) })}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.yearsExperience} years</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profile.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Practice Statistics</CardTitle>
                <CardDescription>Your performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{stats.totalPatients}</div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.activePatients}</div>
                  <p className="text-sm text-muted-foreground">Active Patients</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{stats.highRiskPatients}</div>
                  <p className="text-sm text-muted-foreground">High Risk</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.reportsGenerated}</div>
                  <p className="text-sm text-muted-foreground">Reports Generated</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{stats.patientSatisfaction}</div>
                  <p className="text-sm text-muted-foreground">Patient Rating</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how you receive alerts and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-alerts">Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive patient alerts via email</p>
                    </div>
                    <Switch
                      id="email-alerts"
                      checked={notifications.emailAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-alerts">SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive urgent alerts via SMS</p>
                    </div>
                    <Switch
                      id="sms-alerts"
                      checked={notifications.smsAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="high-risk">High Risk Patient Alerts</Label>
                      <p className="text-sm text-muted-foreground">Immediate notifications for high-risk patients</p>
                    </div>
                    <Switch
                      id="high-risk"
                      checked={notifications.highRiskPatients}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, highRiskPatients: checked })}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-reports">Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Receive weekly patient summaries</p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="system-updates">System Updates</Label>
                      <p className="text-sm text-muted-foreground">Platform updates and maintenance notices</p>
                    </div>
                    <Switch
                      id="system-updates"
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Customize your MindLink experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-reports">Auto-Generate Reports</Label>
                      <p className="text-sm text-muted-foreground">Automatically create weekly patient reports</p>
                    </div>
                    <Switch
                      id="auto-reports"
                      checked={preferences.autoGenerateReports}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, autoGenerateReports: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="research-data">Share Data for Research</Label>
                      <p className="text-sm text-muted-foreground">Contribute anonymized data to medical research</p>
                    </div>
                    <Switch
                      id="research-data"
                      checked={preferences.shareDataForResearch}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, shareDataForResearch: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
