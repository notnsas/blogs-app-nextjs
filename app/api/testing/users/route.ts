import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { users } from "@/db/schema"
import { productionGuard } from "../utils"
import bcrypt from "bcryptjs"
// import { auth } from "@/auth"

export const POST = async (req: NextRequest) => {
  console.log("Received request to post database")
  // const session = await auth()
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }
  productionGuard()
  
  const body = await req.json()
  const { username, name, password } = body
  const newUser = {
    username,
    name
  }
  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ ...newUser, passwordHash })

  revalidatePath("/users")
  console.log("User created:", username)
  return NextResponse.json({ success: true }, { status: 200 })
}