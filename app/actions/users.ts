"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { getUserWithUsername } from "../services/users"
import { getCurrentUser } from "../services/session"
import { eq } from "drizzle-orm/sql/expressions/conditions"
import { revalidatePath } from "next/cache"

export const registerUser = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  if (!username || username.length < 5) {
    return { error: "username length must be at least 5 characters long", success: false, values: { username, name, password, passwordConfirm } }
  } else if (!name || name.length < 5) {
    return { error: "Name must be at least 5 characters long", success: false, values: { username, name, password, passwordConfirm } }
  } else if (!password || password.length < 5) {
    return { error: "Password must be at least 5 characters long", success: false, values: { username, name, password, passwordConfirm } }
  } else if (password !== passwordConfirm) {
    return { error: "Passwords do not match", success: false, values: { username, name, password, passwordConfirm } }
  }

  const existingUser = await getUserWithUsername(username)
  if (existingUser) {
    return { error: "Username already exists", success: false, values: { username, name, password, passwordConfirm } }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  console.log("passwordHash:", passwordHash)
  await db.insert(users).values({ username, name, passwordHash })
  console.log("User registered:", passwordHash)
  revalidatePath("/users")

  return { error: "", success: true, values: { username, name, password, passwordConfirm } }
}

export const createToken = async () => {
  const token = crypto.randomUUID()
  
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    revalidatePath("/login")
    return
  }
  // console.log('current token:', token)
  // console.log('current user:', currentUser)
  // console.log('users.username:', users.username)
  await db.update(users)
    .set({ token: token })  
    .where(eq(users.username, currentUser.username))

  // revalidatePath("/me")
  return
}
  
