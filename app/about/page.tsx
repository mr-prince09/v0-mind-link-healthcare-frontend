"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Brain, Users, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MindLink</span>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">About MindLink</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Revolutionizing healthcare through AI-powered emotional digital twins that bridge the gap between mental and
            physical wellbeing.
          </p>
        </div>

        {/* Mission */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-muted-foreground">
            <p>
              At MindLink, we believe that emotional health is inseparable from physical health. Our mission is to
              create a comprehensive healthcare platform that uses artificial intelligence to monitor, analyze, and
              predict health outcomes by considering both emotional and physical factors.
            </p>
          </CardContent>
        </Card>

        {/* What We Do */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Brain className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Emotional Risk Intelligence</CardTitle>
                <CardDescription>
                  Our proprietary ERI system analyzes emotional patterns to predict potential health risks before they
                  manifest physically.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Heart className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Continuous Monitoring</CardTitle>
                <CardDescription>
                  24/7 health monitoring through wearable device integration, tracking vital signs, sleep patterns, and
                  stress levels.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Care Coordination</CardTitle>
                <CardDescription>
                  Seamless communication between patients, caregivers, and healthcare providers for coordinated care.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Proactive Intervention</CardTitle>
                <CardDescription>
                  AI-powered alerts and recommendations enable early intervention and prevent health crises.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Technology */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Our Technology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              MindLink leverages cutting-edge artificial intelligence and machine learning algorithms to create digital
              twins of patients' emotional and physical states. Our platform integrates:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Advanced biometric analysis from wearable devices</li>
              <li>Natural language processing for mood and sentiment analysis</li>
              <li>Predictive modeling for health risk assessment</li>
              <li>Real-time data processing and alert systems</li>
              <li>Secure, HIPAA-compliant data handling and storage</li>
            </ul>
          </CardContent>
        </Card>

        {/* Team */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Our Team</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            MindLink was founded by a team of healthcare professionals, AI researchers, and technology experts united by
            the vision of transforming healthcare through emotional intelligence.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">JS</span>
                </div>
                <h3 className="font-semibold">Dr. Jane Smith</h3>
                <p className="text-sm text-muted-foreground">Chief Medical Officer</p>
                <p className="text-xs text-muted-foreground mt-2">20+ years in cardiology and digital health</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">MJ</span>
                </div>
                <h3 className="font-semibold">Michael Johnson</h3>
                <p className="text-sm text-muted-foreground">Chief Technology Officer</p>
                <p className="text-xs text-muted-foreground mt-2">AI/ML expert, former Google researcher</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">ED</span>
                </div>
                <h3 className="font-semibold">Dr. Emily Davis</h3>
                <p className="text-sm text-muted-foreground">Head of Research</p>
                <p className="text-xs text-muted-foreground mt-2">PhD in Psychology, specialist in emotional health</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Interested in learning more about MindLink or partnering with us? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/signup">Try MindLink</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
