"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { db } from "@/firebase"
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"

interface Appointment {
  id: string
  patientName: string
  appointmentDate: string
  appointmentTime: string
  reason: string
  createdAt?: any
}

export default function DoctorBooking() {
  const [patientName, setPatientName] = useState("")
  const [appointmentDate, setAppointmentDate] = useState("")
  const [appointmentTime, setAppointmentTime] = useState("")
  const [reason, setReason] = useState("")
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const fetchAppointments = async () => {
    const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    const appts: Appointment[] = []
    querySnapshot.forEach((doc) => {
      appts.push({ id: doc.id, ...doc.data() } as Appointment)
    })
    setAppointments(appts)
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!patientName || !appointmentDate || !appointmentTime || !reason) {
      alert("Please fill in all fields")
      return
    }
    try {
      await addDoc(collection(db, "appointments"), {
        patientName,
        appointmentDate,
        appointmentTime,
        reason,
        createdAt: serverTimestamp(),
      })
      setPatientName("")
      setAppointmentDate("")
      setAppointmentTime("")
      setReason("")
      fetchAppointments()
      alert("Appointment booked successfully")
    } catch (error) {
      console.error("Error adding appointment: ", error)
      alert("Failed to book appointment")
    }
  }

  return (
    <ProtectedRoute allowedRoles={["doctor"]}>
      <DashboardLayout sidebarItems={[
        { label: "Patient List", href: "/doctor", icon: <></> },
        { label: "Risk Reports", href: "/doctor/reports", icon: <></> },
        { label: "Summaries", href: "/doctor/summaries", icon: <></> },
        { label: "Profile", href: "/doctor/profile", icon: <></> },
        { label: "Booking", href: "/doctor/booking", icon: <></>, active: true },
      ]}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Book Appointment</CardTitle>
              <CardDescription>Schedule a new consultation with your patient</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient name"
                  />
                </div>
                <div>
                  <Label htmlFor="appointmentDate">Date</Label>
                  <Input
                    id="appointmentDate"
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="appointmentTime">Time</Label>
                  <Input
                    id="appointmentTime"
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="reason">Reason for Consultation</Label>
                  <Input
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Brief description"
                  />
                </div>
                <Button type="submit">Book Appointment</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>View all scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              {appointments.length === 0 ? (
                <p>No appointments scheduled.</p>
              ) : (
                <ul className="space-y-2">
                  {appointments.map((appt) => (
                    <li key={appt.id} className="border p-3 rounded-md">
                      <p><strong>Patient:</strong> {appt.patientName}</p>
                      <p><strong>Date:</strong> {appt.appointmentDate}</p>
                      <p><strong>Time:</strong> {appt.appointmentTime}</p>
                      <p><strong>Reason:</strong> {appt.reason}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
