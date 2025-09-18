"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Activity, Brain, Lightbulb, Bell, User, Save, Upload } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"

const sidebarItems = [
  { label: "Overview", href: "/patient", icon: <Home className="mr-2 h-4 w-4" /> },
  { label: "Vitals", href: "/patient/vitals", icon: <Activity className="mr-2 h-4 w-4" /> },
  { label: "ERI Score", href: "/patient/eri", icon: <Brain className="mr-2 h-4 w-4" /> },
  { label: "Recommendations", href: "/patient/recommendations", icon: <Lightbulb className="mr-2 h-4 w-4" /> },
  { label: "Alerts", href: "/patient/alerts", icon: <Bell className="mr-2 h-4 w-4" /> },
  { label: "Profile", href: "/patient/profile", icon: <User className="mr-2 h-4 w-4" />, active: true },
]

export default function PatientProfilePage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: "45",
    phone: "+1-555-0123",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+1-555-0456",
    language: "en",
    timezone: "America/New_York",
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    weeklyReports: true,
    emergencyAlerts: true,
  })

  const [wearables, setWearables] = useState({
    fitbit: true,
    appleWatch: false,
    garmin: false,
    oura: false,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }))
  }

  const handleWearableChange = (field: string, value: boolean) => {
    setWearables((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Saving profile:", { formData, notifications, wearables })
  }

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your personal information and preferences</p>
          </div>

          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile photo</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="text-lg">{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Photo
                </Button>
                <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>Person to contact in case of emergency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={formData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailAlerts">Email Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive health alerts via email</p>
                </div>
                <Switch
                  id="emailAlerts"
                  checked={notifications.emailAlerts}
                  onCheckedChange={(checked) => handleNotificationChange("emailAlerts", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smsAlerts">SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive urgent alerts via text message</p>
                </div>
                <Switch
                  id="smsAlerts"
                  checked={notifications.smsAlerts}
                  onCheckedChange={(checked) => handleNotificationChange("smsAlerts", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications in the app</p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyReports">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">Receive weekly health summaries</p>
                </div>
                <Switch
                  id="weeklyReports"
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emergencyAlerts">Emergency Alerts</Label>
                  <p className="text-sm text-muted-foreground">Critical health alerts (cannot be disabled)</p>
                </div>
                <Switch id="emergencyAlerts" checked={notifications.emergencyAlerts} disabled />
              </div>
            </CardContent>
          </Card>

          {/* Wearable Integration */}
          <Card>
            <CardHeader>
              <CardTitle>Wearable Device Integration</CardTitle>
              <CardDescription>Connect your health devices for better monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="fitbit">Fitbit</Label>
                  <p className="text-sm text-muted-foreground">Sync heart rate, sleep, and activity data</p>
                </div>
                <Switch
                  id="fitbit"
                  checked={wearables.fitbit}
                  onCheckedChange={(checked) => handleWearableChange("fitbit", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="appleWatch">Apple Watch</Label>
                  <p className="text-sm text-muted-foreground">Sync health and fitness data</p>
                </div>
                <Switch
                  id="appleWatch"
                  checked={wearables.appleWatch}
                  onCheckedChange={(checked) => handleWearableChange("appleWatch", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="garmin">Garmin</Label>
                  <p className="text-sm text-muted-foreground">Connect Garmin devices</p>
                </div>
                <Switch
                  id="garmin"
                  checked={wearables.garmin}
                  onCheckedChange={(checked) => handleWearableChange("garmin", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="oura">Oura Ring</Label>
                  <p className="text-sm text-muted-foreground">Sync sleep and recovery data</p>
                </div>
                <Switch
                  id="oura"
                  checked={wearables.oura}
                  onCheckedChange={(checked) => handleWearableChange("oura", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
