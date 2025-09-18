"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Users, FileText, TrendingUp, User, Search, Download, Eye, Calendar, Brain } from "lucide-react"
import { mockDoctorData } from "@/lib/mock-data"
import { useState } from "react"

const sidebarItems = [
  { label: "Patient List", href: "/doctor", icon: <Users className="mr-2 h-4 w-4" /> },
  { label: "Risk Reports", href: "/doctor/reports", icon: <TrendingUp className="mr-2 h-4 w-4" /> },
  { label: "Summaries", href: "/doctor/summaries", icon: <FileText className="mr-2 h-4 w-4" />, active: true },
  { label: "Profile", href: "/doctor/profile", icon: <User className="mr-2 h-4 w-4" /> },
]

export default function DoctorSummaries() {
  const [searchTerm, setSearchTerm] = useState("")
  const [timeFilter, setTimeFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const data = mockDoctorData

  const summaries = [
    {
      id: "1",
      patientId: "1",
      patientName: "John Doe",
      type: "weekly",
      title: "Weekly Health Summary - Week of Jan 8-14",
      generatedDate: "2024-01-15T09:00:00Z",
      keyInsights: [
        "ERI score increased from 65 to 72 over the week",
        "Sleep quality deteriorated - average 5.2 hours/night",
        "Stress levels elevated during work hours",
        "Heart rate variability below normal range",
      ],
      recommendations: [
        "Consider adjusting medication timing",
        "Recommend sleep hygiene consultation",
        "Stress management techniques needed",
      ],
      riskLevel: "Medium",
      aiConfidence: 87,
    },
    {
      id: "2",
      patientId: "2",
      patientName: "Sarah Johnson",
      type: "incident",
      title: "Panic Attack Episode Analysis",
      generatedDate: "2024-01-14T20:45:00Z",
      keyInsights: [
        "Panic attack detected at 8:32 PM on Jan 14",
        "Heart rate peaked at 105 bpm",
        "Preceded by 2 hours of elevated stress indicators",
        "Similar pattern observed 3 days prior",
      ],
      recommendations: [
        "Immediate follow-up appointment recommended",
        "Consider adjusting anxiety medication",
        "Implement crisis intervention plan",
      ],
      riskLevel: "High",
      aiConfidence: 94,
    },
    {
      id: "3",
      patientId: "3",
      patientName: "Mike Wilson",
      type: "monthly",
      title: "Monthly Progress Report - January 2024",
      generatedDate: "2024-01-15T10:30:00Z",
      keyInsights: [
        "Overall improvement in ERI scores (avg 58 vs 65 last month)",
        "Consistent medication adherence (95%)",
        "Sleep patterns stabilized",
        "Increased physical activity levels",
      ],
      recommendations: [
        "Continue current treatment plan",
        "Gradual medication reduction may be considered",
        "Maintain current lifestyle changes",
      ],
      riskLevel: "Low",
      aiConfidence: 91,
    },
    {
      id: "4",
      patientId: "4",
      patientName: "Emily Davis",
      type: "assessment",
      title: "Initial Assessment Summary",
      generatedDate: "2024-01-13T14:20:00Z",
      keyInsights: [
        "Baseline ERI score: 68 (Medium risk)",
        "History of anxiety and depression",
        "Current medications showing limited effectiveness",
        "Strong family support system identified",
      ],
      recommendations: [
        "Comprehensive psychiatric evaluation",
        "Consider therapy referral",
        "Medication review and adjustment",
      ],
      riskLevel: "Medium",
      aiConfidence: 82,
    },
    {
      id: "5",
      patientId: "1",
      patientName: "John Doe",
      type: "incident",
      title: "Sleep Disruption Pattern Analysis",
      generatedDate: "2024-01-12T08:15:00Z",
      keyInsights: [
        "Chronic sleep disruption pattern identified",
        "Average sleep duration: 4.8 hours over 5 nights",
        "Correlation with increased ERI scores",
        "Work stress appears to be primary trigger",
      ],
      recommendations: ["Sleep study referral", "Workplace stress assessment", "Sleep medication evaluation"],
      riskLevel: "Medium",
      aiConfidence: 89,
    },
  ]

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "secondary"
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "weekly":
        return { variant: "outline" as const, label: "Weekly" }
      case "monthly":
        return { variant: "default" as const, label: "Monthly" }
      case "incident":
        return { variant: "destructive" as const, label: "Incident" }
      case "assessment":
        return { variant: "secondary" as const, label: "Assessment" }
      default:
        return { variant: "outline" as const, label: type }
    }
  }

  const filteredSummaries = summaries.filter((summary) => {
    const matchesSearch =
      summary.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summary.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || summary.type === typeFilter
    const matchesTime =
      timeFilter === "all" ||
      (timeFilter === "week" && new Date(summary.generatedDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (timeFilter === "month" && new Date(summary.generatedDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    return matchesSearch && matchesType && matchesTime
  })

  return (
    <ProtectedRoute allowedRoles={["doctor"]}>
      <DashboardLayout sidebarItems={sidebarItems}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">AI-Generated Summaries</h1>
              <p className="text-muted-foreground">Comprehensive patient insights powered by artificial intelligence</p>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search summaries or patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="weekly">Weekly Reports</SelectItem>
                <SelectItem value="monthly">Monthly Reports</SelectItem>
                <SelectItem value="incident">Incident Reports</SelectItem>
                <SelectItem value="assessment">Assessments</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Summaries</CardTitle>
                <FileText className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summaries.length}</div>
                <p className="text-xs text-muted-foreground">Generated reports</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    summaries.filter((s) => new Date(s.generatedDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                      .length
                  }
                </div>
                <p className="text-xs text-muted-foreground">Recent summaries</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk</CardTitle>
                <TrendingUp className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {summaries.filter((s) => s.riskLevel === "High").length}
                </div>
                <p className="text-xs text-muted-foreground">Urgent cases</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg AI Confidence</CardTitle>
                <Brain className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(summaries.reduce((sum, s) => sum + s.aiConfidence, 0) / summaries.length)}%
                </div>
                <p className="text-xs text-muted-foreground">Analysis accuracy</p>
              </CardContent>
            </Card>
          </div>

          {/* Summaries List */}
          <div className="space-y-4">
            {filteredSummaries.map((summary) => {
              const typeBadge = getTypeBadge(summary.type)
              return (
                <Card key={summary.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{summary.title}</CardTitle>
                          <Badge variant={typeBadge.variant}>{typeBadge.label}</Badge>
                          <Badge variant={getRiskBadgeVariant(summary.riskLevel)}>{summary.riskLevel} Risk</Badge>
                        </div>
                        <CardDescription>
                          Patient: {summary.patientName} • Generated:{" "}
                          {new Date(summary.generatedDate).toLocaleDateString()} • AI Confidence: {summary.aiConfidence}
                          %
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Full
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Key Insights</h4>
                        <ul className="space-y-2">
                          {summary.keyInsights.map((insight, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">AI Recommendations</h4>
                        <ul className="space-y-2">
                          {summary.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredSummaries.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No summaries found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || typeFilter !== "all" || timeFilter !== "all"
                    ? "Try adjusting your search criteria or filters."
                    : "AI-generated summaries will appear here as they become available."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
