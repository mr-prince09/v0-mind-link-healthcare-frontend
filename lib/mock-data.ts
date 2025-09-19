// Mock data for the application
export const mockPatientData = {
  id: "1",
  name: "John Doe",
  age: 45,
  eriScore: 67,
  riskLevel: "Medium" as const,
  vitals: {
    heartRate: 78,
    hrv: 42,
    sleepHours: 6.2,
    stressLevel: 65,
  },
  chartData: {
    heartRate: [
      { time: "00:00", value: 72 },
      { time: "04:00", value: 68 },
      { time: "08:00", value: 78 },
      { time: "12:00", value: 82 },
      { time: "16:00", value: 76 },
      { time: "20:00", value: 74 },
    ],
    eriHistory: [
      { date: "Mon", score: 65 },
      { date: "Tue", score: 68 },
      { date: "Wed", score: 72 },
      { date: "Thu", score: 69 },
      { date: "Fri", score: 67 },
      { date: "Sat", score: 71 },
      { date: "Sun", score: 67 },
    ],
  },
  recommendations: [
    {
      id: "1",
      title: "Mindfulness Practice",
      description: "Try 10 minutes of guided meditation to reduce stress levels",
      type: "mindfulness",
      priority: "high",
    },
    {
      id: "2",
      title: "Sleep Optimization",
      description: "Aim for 7-8 hours of sleep to improve HRV",
      type: "sleep",
      priority: "medium",
    },
    {
      id: "3",
      title: "Nutrition Check",
      description: "Monitor blood sugar levels after meals",
      type: "nutrition",
      priority: "medium",
    },
  ],
  alerts: [
    {
      id: "1",
      message: "Possible panic attack detected at 8:32 PM",
      timestamp: "2024-01-15T20:32:00Z",
      severity: "high" as const,
      read: false,
    },
    {
      id: "2",
      message: "Sleep quality below average for 3 consecutive nights",
      timestamp: "2024-01-15T09:15:00Z",
      severity: "medium" as const,
      read: false,
    },
    {
      id: "3",
      message: "Heart rate variability improved by 15%",
      timestamp: "2024-01-14T14:20:00Z",
      severity: "low" as const,
      read: true,
    },
  ],
}

export const mockDoctorData = {
  patients: [
    {
      id: "1",
      name: "John Doe",
      eriScore: 67,
      lastCheckIn: "2024-01-15T10:30:00Z",
      riskStatus: "Medium" as const,
      age: 45,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      eriScore: 85,
      lastCheckIn: "2024-01-15T08:15:00Z",
      riskStatus: "High" as const,
      age: 38,
    },
    {
      id: "3",
      name: "Mike Wilson",
      eriScore: 42,
      lastCheckIn: "2024-01-14T16:45:00Z",
      riskStatus: "Low" as const,
      age: 52,
    },
    {
      id: "4",
      name: "Emily Davis",
      eriScore: 73,
      lastCheckIn: "2024-01-15T12:20:00Z",
      riskStatus: "Medium" as const,
      age: 29,
    },
  ],
}

export const mockCaregiverData = {
  patient: {
    id: "1",
    name: "John Doe",
    currentMood: "Anxious",
    safetyStatus: "At Risk" as const,
    vitals: {
      heartRate: 78,
      bloodPressure: "140/90",
      temperature: 98.6,
    },
  },
  timeline: [
    {
      id: "1",
      date: "2024-01-15",
      mood: "Anxious",
      sleep: 5.5,
      vitals: { hr: 82, bp: "145/92" },
      notes: "Reported feeling overwhelmed at work",
    },
    {
      id: "2",
      date: "2024-01-14",
      mood: "Neutral",
      sleep: 6.8,
      vitals: { hr: 76, bp: "138/88" },
      notes: "Better day, completed meditation session",
    },
    {
      id: "3",
      date: "2024-01-13",
      mood: "Stressed",
      sleep: 4.2,
      vitals: { hr: 88, bp: "150/95" },
      notes: "Poor sleep, high stress levels detected",
    },
  ],
  emergencyContacts: [
    { name: "Dr. Sarah Smith", phone: "+1-555-0123", type: "Primary Care" },
    { name: "Emergency Services", phone: "911", type: "Emergency" },
    { name: "Jane Wilson (Daughter)", phone: "+1-555-0456", type: "Family" },
  ],
}

export const mockBookingData = [
  {
    id: "1",
    patientName: "John Doe",
    appointmentDate: "2024-01-20",
    appointmentTime: "10:00",
    reason: "Follow-up consultation for anxiety management",
    status: "confirmed" as const,
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "2",
    patientName: "Sarah Johnson",
    appointmentDate: "2024-01-22",
    appointmentTime: "14:30",
    reason: "Medication review and therapy session",
    status: "pending" as const,
    createdAt: "2024-01-14T16:45:00Z",
  },
  {
    id: "3",
    patientName: "Mike Wilson",
    appointmentDate: "2024-01-25",
    appointmentTime: "11:15",
    reason: "Sleep study results discussion",
    status: "confirmed" as const,
    createdAt: "2024-01-13T12:20:00Z",
  },
]
