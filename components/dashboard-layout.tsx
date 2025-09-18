"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  sidebarItems: Array<{
    label: string
    href: string
    icon: React.ReactNode
    active?: boolean
  }>
}

export function DashboardLayout({ children, sidebarItems }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border">
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold text-sidebar-foreground">MindLink</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="p-4 space-y-2">
              {sidebarItems.map((item) => (
                <Button
                  key={item.href}
                  variant={item.active ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    router.push(item.href)
                    setSidebarOpen(false)
                  }}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:bg-sidebar lg:border-r lg:border-sidebar-border lg:block">
        <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-bold text-sidebar-foreground">MindLink</span>
        </div>
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant={item.active ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => router.push(item.href)}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navbar */}
        <header className="bg-background border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-4 w-4" />
              </Button>
              <h1 className="text-lg font-semibold text-foreground">Welcome back, {user.name}</h1>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
