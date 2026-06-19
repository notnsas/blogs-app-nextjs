"use server"

import { getCurrentUser } from "../services/session"
import { createReadingList, markAsRead } from "../services/readingLists"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema"
import { db } from "@/db"
import { auth } from "@/auth"

export const handleCreateReadingList = async (formData: FormData) => {
  const blogId = (formData.get("blogId") as string)?.trim()
  console.log("Received blogId:", blogId)
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    revalidatePath("/login")
    return
  }

  const session = await auth()

  console.log("session user", session?.user?.email)
  console.log("creating reading list for", currentUser.id)

  await createReadingList(currentUser.id, parseInt(blogId), false)
  revalidatePath("/", "layout")
  return
}
  

export const handleMarkAsRead = async (formData: FormData) => {
  const blogId = (formData.get("blogId") as string)?.trim()
  
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    revalidatePath("/login")
    return
  }

  await markAsRead(currentUser.id, parseInt(blogId))
  revalidatePath("/me")
  return
}