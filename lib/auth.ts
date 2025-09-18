export type UserRole = "patient" | "doctor" | "caregiver" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

// Mock authentication - in real app would connect to backend
export const mockUsers: Record<string, User & { password: string }> = {
  "patient@demo.com": {
    id: "1",
    name: "John Doe",
    email: "patient@demo.com",
    password: "demo123",
    role: "patient",
    avatar: "/patient-avatar.png",
  },
  "doctor@demo.com": {
    id: "2",
    name: "Dr. Sarah Smith",
    email: "doctor@demo.com",
    password: "demo123",
    role: "doctor",
    avatar: "/doctor-avatar.png",
  },
  "caregiver@demo.com": {
    id: "3",
    name: "Jane Wilson",
    email: "caregiver@demo.com",
    password: "demo123",
    role: "caregiver",
    avatar: "/caregiver-avatar.jpg",
  },
  "admin@demo.com": {
    id: "4",
    name: "Admin User",
    email: "admin@demo.com",
    password: "demo123",
    role: "admin",
    avatar: "/admin-avatar.png",
  },
}

export const authenticate = (email: string, password: string): User | null => {
  const user = mockUsers[email]
  if (user && user.password === password) {
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  return null
}
