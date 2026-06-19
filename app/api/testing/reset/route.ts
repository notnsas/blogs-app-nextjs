import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { users, blogs, readingLists } from "@/db/schema"
import { productionGuard } from "../utils"
// import { auth } from "@/auth"

export const DELETE = async () => {
  console.log("Received request to reset database")
  productionGuard()
  // const session = await auth()
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  await db.delete(readingLists)
  await db.delete(blogs)
  await db.delete(users)

  await db.execute('ALTER SEQUENCE reading_lists_id_seq RESTART WITH 1;')
  await db.execute('ALTER SEQUENCE blogs_id_seq RESTART WITH 1;')
  await db.execute('ALTER SEQUENCE users_id_seq RESTART WITH 1;')

  revalidatePath("/blogs")
  revalidatePath("/users")
  
  return NextResponse.json({ success: true }, { status: 200 })
}
