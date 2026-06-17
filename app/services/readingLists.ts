import { db } from "@/db"
import { readingLists, users } from "@/db/schema"
import { and, eq } from "drizzle-orm/sql/expressions/conditions"

export const createReadingList = async (userId: number, blogId: number, read: boolean) => {
  return await db.insert(readingLists).values({ userId, blogId, read })
}

export const markAsRead = async (userId: number, blogId: number) => {
  return await db.update(readingLists).set({ read: true }).where(and(eq(readingLists.userId, userId), eq(readingLists.blogId, blogId)))
}