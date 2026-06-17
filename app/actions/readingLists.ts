"use server"

import { getCurrentUser } from "../services/session"
import { createReadingList, markAsRead } from "../services/readingLists"
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema"
import { db } from "@/db"

export const handleCreateReadingList = async (formData: FormData) => {
  const blogId = (formData.get("blogId") as string)?.trim()
  
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    revalidatePath("/login")
    return
  }

  await createReadingList(currentUser.id, parseInt(blogId), false)

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