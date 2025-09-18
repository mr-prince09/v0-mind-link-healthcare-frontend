"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <Shield className="h-12 w-12 text-destructive mx-auto mb-4" />
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription>You don't have permission to access this page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please contact your administrator if you believe this is an error.
          </p>
          <Button onClick={() => router.push("/")} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
