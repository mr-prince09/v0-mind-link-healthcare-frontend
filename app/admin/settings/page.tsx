"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, BarChart3, Activity, Settings, Save, Shield, Bell, Globe, Server } from "lucide-react"
import { useState } from "react"

const sidebarItems = [
  { label: "Users", href: "/admin", icon: <Users className="mr-2 h-4 w-4" /> },
  { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="mr-2 h-4 w-4" /> },
  { label: "System Health", href: "/admin/system", icon: <Activity className="mr-2 h-4 w-4" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="mr-2 h-4 w-4" />, active: true },
]

export default function AdminSettings() {
  const [hasChanges, setHasChanges] = useState(false)

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "MindLink Healthcare",
    siteDescription: "Emotional Digital Twin for Patient Care",
    supportEmail: "support@mindlink.health",
    maintenanceMode: false,
    registrationEnabled: true,
    maxUsersPerDoctor: 50,
  })

  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireTwoFactor: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    enableAuditLog: true,
    dataRetentionDays: 365,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    emergencyAlerts: true,
    systemAlerts: true,
    maintenanceNotifications: true,
  })

  const [integrationSettings, setIntegrationSettings] = useState({
    aiProcessingEnabled: true,
    externalApiEnabled: true,
    dataExportEnabled: true,
    analyticsEnabled: true,
    backupEnabled: true,
    backupFrequency: "daily",
  })

  const handleSave = () => {
    // Here you would typically save to backend
    console.log("Settings saved:", {
      generalSettings,
      securitySettings,
      notificationSettings,
      integrationSettings,
    })
    setHasChanges(false)
  }

  const updateGeneralSettings = (key: string, value: any) => {
    setGeneralSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const updateSecuritySettings = (key: string, value: any) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const updateNotificationSettings = (key: string, value: any) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const updateIntegrationSettings = (key: string, value: any) => {
    setIntegrationSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">System Settings</h1>
              <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
            </div>
            <Button onClick={handleSave} disabled={!hasChanges}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>

          {hasChanges && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">You have unsaved changes. Don't forget to save your settings.</p>
            </div>
          )}

          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic system configuration and site information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => updateGeneralSettings("siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) => updateGeneralSettings("supportEmail", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) => updateGeneralSettings("siteDescription", e.target.value)}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable site access</p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) => updateGeneralSettings("maintenanceMode", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="registrationEnabled">User Registration</Label>
                    <p className="text-sm text-muted-foreground">Allow new user registrations</p>
                  </div>
                  <Switch
                    id="registrationEnabled"
                    checked={generalSettings.registrationEnabled}
                    onCheckedChange={(checked) => updateGeneralSettings("registrationEnabled", checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxUsers">Max Patients per Doctor</Label>
                <Input
                  id="maxUsers"
                  type="number"
                  value={generalSettings.maxUsersPerDoctor}
                  onChange={(e) => updateGeneralSettings("maxUsersPerDoctor", Number.parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security policies and authentication requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordLength">Minimum Password Length</Label>
                  <Input
                    id="passwordLength"
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => updateSecuritySettings("passwordMinLength", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => updateSecuritySettings("sessionTimeout", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxAttempts"
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => updateSecuritySettings("maxLoginAttempts", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention (days)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={securitySettings.dataRetentionDays}
                    onChange={(e) => updateSecuritySettings("dataRetentionDays", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactor">Require Two-Factor Auth</Label>
                    <p className="text-sm text-muted-foreground">Mandatory 2FA for all users</p>
                  </div>
                  <Switch
                    id="twoFactor"
                    checked={securitySettings.requireTwoFactor}
                    onCheckedChange={(checked) => updateSecuritySettings("requireTwoFactor", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auditLog">Enable Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all user actions</p>
                  </div>
                  <Switch
                    id="auditLog"
                    checked={securitySettings.enableAuditLog}
                    onCheckedChange={(checked) => updateSecuritySettings("enableAuditLog", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure system-wide notification preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifs">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Enable email notifications</p>
                    </div>
                    <Switch
                      id="emailNotifs"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => updateNotificationSettings("emailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifs">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Enable SMS notifications</p>
                    </div>
                    <Switch
                      id="smsNotifs"
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => updateNotificationSettings("smsNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifs">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Enable push notifications</p>
                    </div>
                    <Switch
                      id="pushNotifs"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => updateNotificationSettings("pushNotifications", checked)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emergencyAlerts">Emergency Alerts</Label>
                      <p className="text-sm text-muted-foreground">Critical health alerts</p>
                    </div>
                    <Switch
                      id="emergencyAlerts"
                      checked={notificationSettings.emergencyAlerts}
                      onCheckedChange={(checked) => updateNotificationSettings("emergencyAlerts", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="systemAlerts">System Alerts</Label>
                      <p className="text-sm text-muted-foreground">System status notifications</p>
                    </div>
                    <Switch
                      id="systemAlerts"
                      checked={notificationSettings.systemAlerts}
                      onCheckedChange={(checked) => updateNotificationSettings("systemAlerts", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceNotifs">Maintenance Notifications</Label>
                      <p className="text-sm text-muted-foreground">Scheduled maintenance alerts</p>
                    </div>
                    <Switch
                      id="maintenanceNotifs"
                      checked={notificationSettings.maintenanceNotifications}
                      onCheckedChange={(checked) => updateNotificationSettings("maintenanceNotifications", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integration Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Integration Settings
              </CardTitle>
              <CardDescription>Configure external integrations and data processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="aiProcessing">AI Processing</Label>
                      <p className="text-sm text-muted-foreground">Enable AI-powered analysis</p>
                    </div>
                    <Switch
                      id="aiProcessing"
                      checked={integrationSettings.aiProcessingEnabled}
                      onCheckedChange={(checked) => updateIntegrationSettings("aiProcessingEnabled", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="externalApi">External API Access</Label>
                      <p className="text-sm text-muted-foreground">Allow external API integrations</p>
                    </div>
                    <Switch
                      id="externalApi"
                      checked={integrationSettings.externalApiEnabled}
                      onCheckedChange={(checked) => updateIntegrationSettings("externalApiEnabled", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dataExport">Data Export</Label>
                      <p className="text-sm text-muted-foreground">Enable data export functionality</p>
                    </div>
                    <Switch
                      id="dataExport"
                      checked={integrationSettings.dataExportEnabled}
                      onCheckedChange={(checked) => updateIntegrationSettings("dataExportEnabled", checked)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics">Analytics</Label>
                      <p className="text-sm text-muted-foreground">Enable usage analytics</p>
                    </div>
                    <Switch
                      id="analytics"
                      checked={integrationSettings.analyticsEnabled}
                      onCheckedChange={(checked) => updateIntegrationSettings("analyticsEnabled", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="backup">Automated Backups</Label>
                      <p className="text-sm text-muted-foreground">Enable automatic data backups</p>
                    </div>
                    <Switch
                      id="backup"
                      checked={integrationSettings.backupEnabled}
                      onCheckedChange={(checked) => updateIntegrationSettings("backupEnabled", checked)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backupFreq">Backup Frequency</Label>
                    <Select
                      value={integrationSettings.backupFrequency}
                      onValueChange={(value) => updateIntegrationSettings("backupFrequency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
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
