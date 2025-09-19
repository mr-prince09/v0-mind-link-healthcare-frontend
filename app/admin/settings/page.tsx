"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Users, BarChart3, Activity, Settings, Save, RefreshCw } from "lucide-react"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    systemName: "MindLink Healthcare",
    supportEmail: "support@mindlink.com",
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    dataRetentionDays: 365,
    maxFileSize: 10,
    backupFrequency: "daily",
    securityLevel: "high",
    apiRateLimit: 1000,
    sessionTimeout: 30,
    twoFactorAuth: true,
    auditLogging: true,
    systemMessage: "",
  })

  const handleSave = () => {
    // Here you would save settings to backend
    console.log("Settings saved:", settings)
    alert("Settings saved successfully!")
  }

  const handleReset = () => {
    // Reset to default settings
    setSettings({
      systemName: "MindLink Healthcare",
      supportEmail: "support@mindlink.com",
      maintenanceMode: false,
      emailNotifications: true,
      smsNotifications: false,
      dataRetentionDays: 365,
      maxFileSize: 10,
      backupFrequency: "daily",
      securityLevel: "high",
      apiRateLimit: 1000,
      sessionTimeout: 30,
      twoFactorAuth: true,
      auditLogging: true,
      systemMessage: "",
    })
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout sidebarItems={[
        { label: "Users", href: "/admin", icon: <Users className="mr-2 h-4 w-4" /> },
        { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="mr-2 h-4 w-4" /> },
        { label: "System Health", href: "/admin/system", icon: <Activity className="mr-2 h-4 w-4" /> },
        { label: "Settings", href: "/admin/settings", icon: <Settings className="mr-2 h-4 w-4" />, active: true },
      ]}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Configure system-wide settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input
                    id="systemName"
                    value={settings.systemName}
                    onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention (Days)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetentionDays}
                    onChange={(e) => setSettings({ ...settings, dataRetentionDays: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => setSettings({ ...settings, maxFileSize: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={settings.backupFrequency}
                    onValueChange={(value) => setSettings({ ...settings, backupFrequency: value })}
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
                <div className="space-y-2">
                  <Label htmlFor="securityLevel">Security Level</Label>
                  <Select
                    value={settings.securityLevel}
                    onValueChange={(value) => setSettings({ ...settings, securityLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiRateLimit">API Rate Limit (requests/min)</Label>
                  <Input
                    id="apiRateLimit"
                    type="number"
                    value={settings.apiRateLimit}
                    onChange={(e) => setSettings({ ...settings, apiRateLimit: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({ ...settings, sessionTimeout: Number(e.target.value) })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Toggles</CardTitle>
              <CardDescription>Enable or disable system features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Put system in maintenance mode</p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send email notifications</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send SMS notifications</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auditLogging">Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all user actions</p>
                  </div>
                  <Switch
                    id="auditLogging"
                    checked={settings.auditLogging}
                    onCheckedChange={(checked) => setSettings({ ...settings, auditLogging: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Message</CardTitle>
              <CardDescription>Display a message to all users (leave empty to hide)</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={settings.systemMessage}
                onChange={(e) => setSettings({ ...settings, systemMessage: e.target.value })}
                placeholder="Enter system-wide message..."
                rows={3}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Save or reset configuration changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
