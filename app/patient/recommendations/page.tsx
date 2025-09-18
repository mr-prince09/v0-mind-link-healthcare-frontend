"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Home,
  Activity,
  Brain,
  Lightbulb,
  Bell,
  User,
  Moon,
  Utensils,
  Dumbbell,
  Users,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react"
import { mockPatientData } from "@/lib/mock-data"
import { useState } from "react"

const sidebarItems = [
  { label: "Overview", href: "/patient", icon: <Home className="mr-2 h-4 w-4" /> },
  { label: "Vitals", href: "/patient/vitals", icon: <Activity className="mr-2 h-4 w-4" /> },
  { label: "ERI Score", href: "/patient/eri", icon: <Brain className="mr-2 h-4 w-4" /> },
  {
    label: "Recommendations",
    href: "/patient/recommendations",
    icon: <Lightbulb className="mr-2 h-4 w-4" />,
    active: true,
  },
  { label: "Alerts", href: "/patient/alerts", icon: <Bell className="mr-2 h-4 w-4" /> },
  { label: "Profile", href: "/patient/profile", icon: <User className="mr-2 h-4 w-4" /> },
]

export default function PatientRecommendations() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const data = mockPatientData

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const allRecommendations = [
    {
      id: "1",
      category: "mindfulness",
      title: "Daily Meditation Practice",
      description:
        "Practice 10 minutes of guided meditation each morning to reduce stress and improve emotional regulation.",
      priority: "high",
      duration: "10 min",
      frequency: "Daily",
      benefits: ["Reduces stress", "Improves focus", "Better sleep quality"],
      steps: [
        "Find a quiet, comfortable space",
        "Use a meditation app or guided audio",
        "Focus on your breathing",
        "Start with 5 minutes and gradually increase",
      ],
    },
    {
      id: "2",
      category: "sleep",
      title: "Sleep Hygiene Routine",
      description: "Establish a consistent bedtime routine to improve sleep quality and duration.",
      priority: "high",
      duration: "30 min",
      frequency: "Nightly",
      benefits: ["Better sleep quality", "Improved mood", "Enhanced recovery"],
      steps: [
        "Set a consistent bedtime",
        "Avoid screens 1 hour before bed",
        "Create a relaxing environment",
        "Practice deep breathing exercises",
      ],
    },
    {
      id: "3",
      category: "nutrition",
      title: "Heart-Healthy Diet",
      description: "Incorporate more omega-3 rich foods and reduce processed foods to support cardiovascular health.",
      priority: "medium",
      duration: "Ongoing",
      frequency: "Daily",
      benefits: ["Better heart health", "Stable energy", "Improved mood"],
      steps: [
        "Add fatty fish twice per week",
        "Include nuts and seeds daily",
        "Reduce sodium intake",
        "Increase vegetable portions",
      ],
    },
    {
      id: "4",
      category: "exercise",
      title: "Gentle Exercise Routine",
      description: "Start with light physical activity to improve cardiovascular health and reduce stress.",
      priority: "medium",
      duration: "20-30 min",
      frequency: "3x per week",
      benefits: ["Improved fitness", "Stress relief", "Better sleep"],
      steps: [
        "Start with 10-minute walks",
        "Add stretching exercises",
        "Gradually increase intensity",
        "Track your progress",
      ],
    },
    {
      id: "5",
      category: "social",
      title: "Social Connection",
      description: "Schedule regular social activities to combat isolation and improve mental wellbeing.",
      priority: "medium",
      duration: "1-2 hours",
      frequency: "2x per week",
      benefits: ["Reduced isolation", "Improved mood", "Better support system"],
      steps: [
        "Call a friend or family member",
        "Join a community group",
        "Schedule regular meetups",
        "Participate in group activities",
      ],
    },
    {
      id: "6",
      category: "learning",
      title: "Stress Management Education",
      description: "Learn new coping strategies and stress management techniques through educational resources.",
      priority: "low",
      duration: "15-20 min",
      frequency: "Weekly",
      benefits: ["Better coping skills", "Increased awareness", "Long-term resilience"],
      steps: [
        "Read stress management articles",
        "Watch educational videos",
        "Practice new techniques",
        "Keep a stress journal",
      ],
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mindfulness":
        return <Brain className="h-5 w-5 text-purple-500" />
      case "sleep":
        return <Moon className="h-5 w-5 text-blue-500" />
      case "nutrition":
        return <Utensils className="h-5 w-5 text-green-500" />
      case "exercise":
        return <Dumbbell className="h-5 w-5 text-orange-500" />
      case "social":
        return <Users className="h-5 w-5 text-pink-500" />
      case "learning":
        return <BookOpen className="h-5 w-5 text-indigo-500" />
      default:
        return <Lightbulb className="h-5 w-5 text-yellow-500" />
    }
  }

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "secondary"
    }
  }

  const highPriorityRecs = allRecommendations.filter((rec) => rec.priority === "high")
  const otherRecs = allRecommendations.filter((rec) => rec.priority !== "high")

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Personalized Recommendations</h1>
              <p className="text-muted-foreground">AI-powered suggestions tailored to your health profile</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm text-muted-foreground">
                {completedTasks.length} of {allRecommendations.length} completed
              </span>
            </div>
          </div>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your wellness journey with personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">{completedTasks.length}</div>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-500 mb-2">
                    {highPriorityRecs.filter((rec) => completedTasks.includes(rec.id)).length}
                  </div>
                  <p className="text-sm text-muted-foreground">High Priority Done</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-500 mb-2">
                    {Math.round((completedTasks.length / allRecommendations.length) * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* High Priority Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                High Priority Recommendations
              </CardTitle>
              <CardDescription>Focus on these recommendations for maximum impact on your wellbeing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {highPriorityRecs.map((rec) => (
                  <div key={rec.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={completedTasks.includes(rec.id)}
                          onCheckedChange={() => toggleTask(rec.id)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(rec.category)}
                            <h4 className="font-medium">{rec.title}</h4>
                            <Badge variant={getPriorityBadgeVariant(rec.priority)}>{rec.priority} priority</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {rec.duration}
                            </div>
                            <div>{rec.frequency}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Benefits:</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {rec.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Getting Started:</h5>
                        <ol className="text-sm text-muted-foreground space-y-1">
                          {rec.steps.map((step, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="flex-shrink-0 w-4 h-4 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center mt-0.5">
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm">Start Now</Button>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Other Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Recommendations</CardTitle>
              <CardDescription>More ways to improve your overall wellbeing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {otherRecs.map((rec) => (
                  <div key={rec.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Checkbox checked={completedTasks.includes(rec.id)} onCheckedChange={() => toggleTask(rec.id)} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getCategoryIcon(rec.category)}
                          <h4 className="font-medium">{rec.title}</h4>
                          <Badge variant={getPriorityBadgeVariant(rec.priority)}>{rec.priority}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {rec.duration}
                          </div>
                          <div>{rec.frequency}</div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
