"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Brain, Shield, Users, Activity, Bell } from "lucide-react"

export default function LandingPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      // Redirect authenticated users to their dashboard
      switch (user.role) {
        case "patient":
          router.push("/patient")
          break
        case "doctor":
          router.push("/doctor")
          break
        case "caregiver":
          router.push("/caregiver")
          break
        case "admin":
          router.push("/admin")
          break
      }
    }
  }, [user, router])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            MindLink – AI-Powered Emotional Digital Twin for Patient Care
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Bridging emotional and physical health through AI-driven digital twins that provide comprehensive patient
            monitoring and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => router.push("/signup")} className="text-lg px-8 py-3">
              Sign Up
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push("/login")} className="text-lg px-8 py-3">
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-balance">Healthcare Challenges We Address</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-destructive mx-auto mb-4" />
                <CardTitle>Emotional Health Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Traditional healthcare often misses the emotional factors that impact physical health outcomes.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Activity className="h-12 w-12 text-destructive mx-auto mb-4" />
                <CardTitle>Missed Early Warning Signs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Critical health changes go unnoticed until they become serious medical emergencies.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-destructive mx-auto mb-4" />
                <CardTitle>Fragmented Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Poor communication between patients, caregivers, and healthcare providers leads to suboptimal care.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/ai-healthcare-digital-twin-illustration.jpg" alt="AI Healthcare Digital Twin" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-balance">Our AI-Powered Solution</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Brain className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Emotional Risk Intelligence (ERI)</h3>
                    <p className="text-muted-foreground">
                      AI analyzes emotional patterns to predict health risks before they manifest physically.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Continuous Monitoring</h3>
                    <p className="text-muted-foreground">
                      Real-time tracking of vital signs, sleep patterns, and emotional states through wearable
                      integration.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Bell className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Proactive Alerts</h3>
                    <p className="text-muted-foreground">
                      Intelligent notifications to caregivers and healthcare providers when intervention is needed.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Coordinated Care</h3>
                    <p className="text-muted-foreground">
                      Seamless communication platform connecting patients, caregivers, and medical professionals.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-balance">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Brain className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">ERI Score</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Real-time emotional risk assessment with predictive analytics.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Activity className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">AI Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  24/7 intelligent monitoring of physical and emotional health indicators.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Bell className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Caregiver Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Instant notifications to family members and caregivers when needed.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Doctor Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AI-powered insights and summaries to support clinical decision-making.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-balance">Built with Modern Technology</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <span className="font-bold text-primary">R</span>
              </div>
              <p className="text-sm">React</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <span className="font-bold text-primary">D</span>
              </div>
              <p className="text-sm">Django</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <span className="font-bold text-primary">F</span>
              </div>
              <p className="text-sm">FastAPI</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <span className="font-bold text-primary">M</span>
              </div>
              <p className="text-sm">MongoDB</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <span className="font-bold text-primary">AI</span>
              </div>
              <p className="text-sm">AI/ML</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <Button variant="link" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button variant="link" onClick={() => router.push("/about")}>
              About
            </Button>
            <Button variant="link" onClick={() => router.push("/contact")}>
              Contact
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 MindLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
