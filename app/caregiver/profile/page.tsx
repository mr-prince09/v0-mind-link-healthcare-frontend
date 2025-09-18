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
import { Home, Clock, Bell, User, Edit, Save, Mail, Phone, Heart, Users } from "lucide-react"
import { useState } from "react"

const sidebarItems = [
  { label: "Overview", href: "/caregiver", icon: <Home className="mr-2 h-4 w-4" /> },
  { label: "Patient Timeline", href: "/caregiver/timeline", icon: <Clock className="mr-2 h-4 w-4" /> },
  { label: "Alerts", href: "/caregiver/alerts", icon: <Bell className="mr-2 h-4 w-4" /> },
  { label: "Profile", href: "/caregiver/profile", icon: <User className="mr-2 h-4 w-4" />, active: true },
]

export default function CaregiverProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Jane Wilson",
    email: "caregiver@demo.com",
    phone: "+1 (555) 987-6543",
    relationship: "Daughter",
    emergencyContact: true,
    address: "123 Main St, Anytown, ST 12345",
    bio: "Dedicated daughter providing care and support for my father. Committed to ensuring his health and wellbeing through the MindLink platform.",
    yearsOfCare: 3,
    certifications: ["CPR Certified", "First Aid"],
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    emergencyAlerts: true,
    dailyUpdates: true,
    weeklyReports: false,
  })

  const [preferences, setPreferences] = useState({
    alertThreshold: "medium",
    autoCallDoctor: false,
    shareWithFamily: true,
    receiveEducationalContent: true,
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Profile saved:", { profile, notifications, preferences })
  }

  const careStats = {
    daysOfCare: 1095, // 3 years
    alertsResponded: 234,
    emergencyContacts: 12,
    avgResponseTime: "8 minutes",
    patientSatisfaction: 4.9,
    healthImprovement: "+15%",
  }

  return (
    <ProtectedRoute allowedRoles={["caregiver"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Caregiver Profile</h1>
              <p className="text-muted-foreground">Manage your caregiving information and preferences</p>
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
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your contact information and caregiving details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/caregiver-avatar.jpg" alt={profile.name} />
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
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="default">{profile.relationship}</Badge>
                      {profile.emergencyContact && <Badge variant="destructive">Emergency Contact</Badge>}
                    </div>
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
                    <Label htmlFor="relationship">Relationship to Patient</Label>
                    {isEditing ? (
                      <Input
                        id="relationship"
                        value={profile.relationship}
                        onChange={(e) => setProfile({ ...profile, relationship: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.relationship}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="years">Years of Caregiving</Label>
                    {isEditing ? (
                      <Input
                        id="years"
                        type="number"
                        value={profile.yearsOfCare}
                        onChange={(e) => setProfile({ ...profile, yearsOfCare: Number.parseInt(e.target.value) })}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.yearsOfCare} years</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profile.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">About Me</Label>
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

                <div className="space-y-2">
                  <Label>Certifications</Label>
                  <div className="flex flex-wrap gap-2">
                    {profile.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Caregiving Statistics</CardTitle>
                <CardDescription>Your caregiving journey metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{careStats.daysOfCare}</div>
                  <p className="text-sm text-muted-foreground">Days of Care</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{careStats.alertsResponded}</div>
                  <p className="text-sm text-muted-foreground">Alerts Responded</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{careStats.emergencyContacts}</div>
                  <p className="text-sm text-muted-foreground">Emergency Contacts</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{careStats.avgResponseTime}</div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{careStats.patientSatisfaction}</div>
                  <p className="text-sm text-muted-foreground">Patient Rating</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-teal-600">{careStats.healthImprovement}</div>
                  <p className="text-sm text-muted-foreground">Health Improvement</p>
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
              <CardDescription>Configure how you receive alerts and updates about your patient</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-alerts">Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive patient updates via email</p>
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
                      <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
                      <p className="text-sm text-muted-foreground">Immediate notifications for emergencies</p>
                    </div>
                    <Switch
                      id="emergency-alerts"
                      checked={notifications.emergencyAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emergencyAlerts: checked })}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="daily-updates">Daily Updates</Label>
                      <p className="text-sm text-muted-foreground">Daily health summary reports</p>
                    </div>
                    <Switch
                      id="daily-updates"
                      checked={notifications.dailyUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, dailyUpdates: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-reports">Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Comprehensive weekly health reports</p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Care Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Care Preferences</CardTitle>
              <CardDescription>Customize your caregiving experience and emergency protocols</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-call">Auto-Call Doctor</Label>
                      <p className="text-sm text-muted-foreground">Automatically contact doctor for high-risk alerts</p>
                    </div>
                    <Switch
                      id="auto-call"
                      checked={preferences.autoCallDoctor}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, autoCallDoctor: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="share-family">Share with Family</Label>
                      <p className="text-sm text-muted-foreground">Share health updates with other family members</p>
                    </div>
                    <Switch
                      id="share-family"
                      checked={preferences.shareWithFamily}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, shareWithFamily: checked })}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="educational">Educational Content</Label>
                      <p className="text-sm text-muted-foreground">Receive caregiving tips and educational materials</p>
                    </div>
                    <Switch
                      id="educational"
                      checked={preferences.receiveEducationalContent}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, receiveEducationalContent: checked })
                      }
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
