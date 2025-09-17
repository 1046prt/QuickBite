import { NextResponse } from "next/server"

// Mock user database (in a real app, this would be a proper database)
const users: any[] = []

export async function POST(request: Request) {
  try {
    const { action, email, password, name } = await request.json()

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    switch (action) {
      case "login":
        // Find user by email
        const user = users.find(u => u.email === email)
        
        if (!user) {
          return NextResponse.json(
            { success: false, message: "User not found. Please check your email." },
            { status: 404 }
          )
        }

        // In a real app, you would hash and compare passwords
        if (user.password !== password) {
          return NextResponse.json(
            { success: false, message: "Incorrect password. Please try again." },
            { status: 401 }
          )
        }

        // Return user data without password
        const { password: _, ...userWithoutPassword } = user
        return NextResponse.json({
          success: true,
          user: userWithoutPassword,
          message: "Login successful!",
        })

      case "signup":
        // Check if user already exists
        const existingUser = users.find(u => u.email === email)
        
        if (existingUser) {
          return NextResponse.json(
            { success: false, message: "Email already registered. Please login instead." },
            { status: 409 }
          )
        }

        // Create new user
        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          password, // In a real app, this would be hashed
          createdAt: new Date().toISOString(),
        }

        users.push(newUser)

        // Return user data without password
        const { password: __, ...newUserWithoutPassword } = newUser
        return NextResponse.json({
          success: true,
          user: newUserWithoutPassword,
          message: "Account created successfully!",
        })

      default:
        return NextResponse.json(
          { success: false, message: "Invalid action specified." },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error("Auth API error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again." },
      { status: 500 }
    )
  }
}