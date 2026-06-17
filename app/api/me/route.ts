import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { getCurrentUser } from "@/app/services/session"
import { headers } from 'next/headers'
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { users, blogs } from "@/db/schema"

export const GET = async () => {
  const headersList = await headers()
  
  const tokenWithBearerString = headersList.get('Authorization')

  if (!tokenWithBearerString) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = tokenWithBearerString.replace('Bearer ','')
  console.log('token', token)
  // const session = await auth()
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }
  const currentUser = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true },
  })
  
  console.log("currentUser:", currentUser)
  return NextResponse.json(currentUser)
} 