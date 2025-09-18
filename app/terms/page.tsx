"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TermsPage() {
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-muted-foreground">Last updated: January 15, 2024</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                By accessing and using MindLink ("the Service"), you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Medical Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                MindLink is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the
                advice of your physician or other qualified health provider with any questions you may have regarding a
                medical condition. Never disregard professional medical advice or delay in seeking it because of
                something you have read on MindLink.
              </p>
              <p>
                In case of a medical emergency, immediately call your doctor or 911. MindLink does not recommend or
                endorse any specific tests, physicians, products, procedures, opinions, or other information that may be
                mentioned on the Service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your
                information when you use our Service. By using our Service, you agree to the collection and use of
                information in accordance with our Privacy Policy.
              </p>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. All health data is encrypted and stored in compliance
                with HIPAA regulations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>You agree to:</p>
              <ul>
                <li>Provide accurate and complete information when creating your account</li>
                <li>Maintain the security of your password and identification</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Use the Service only for lawful purposes and in accordance with these Terms</li>
                <li>Not interfere with or disrupt the Service or servers connected to the Service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                In no event shall MindLink, its officers, directors, employees, or agents, be liable to you for any
                direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any:
              </p>
              <ul>
                <li>Errors, mistakes, or inaccuracies of content</li>
                <li>Personal injury or property damage resulting from your use of the Service</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                <li>Any interruption or cessation of transmission to or from the Service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material, we will try to provide at least 30 days notice prior to any new terms taking
                effect.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:
                <br />
                Email: legal@mindlink.health
                <br />
                Phone: +1 (555) 123-4567
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
