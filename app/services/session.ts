import { auth } from "@/auth"
import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"

export const getCurrentUser = async () => {
  console.log('Getting current user...')
  const session = await auth()
  if (!session?.user?.email) {
    return null
  }
  console.log('session', session)
  return db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })
}