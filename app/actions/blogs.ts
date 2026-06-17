"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, addLikes, getBlogById, getBlogs } from "../services/blogs"
import { auth } from "@/auth"

export const createBlog = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const likes = 0
  
  if (!title || title.length < 5) {
    return { 
      error: "Blog title must be at least 5 characters long",
      success: false,
      values: { title, author, url }
    }
  } else if (!author || author.length < 5) {
    return { 
      error: "Author name must be at least 5 characters long", 
      success: false,
      values: { title, author, url } 
    }
  } else if (!url || url.length < 5) {
    return { 
      error: "URL must be at least 5 characters long", 
      success: false,
      values: { title, author, url } 
    }
  }
  await addBlog(title, author, url, likes)

  revalidatePath("/blogs")
  return { error: "", success: true }
}

// export const createBlog = async (formData: FormData) => {
//   const session = await auth()
//   if (!session) {
//     redirect("/login")
//   }

//   const title = formData.get("title") as string
//   const author = formData.get("author") as string
//   const url = formData.get("url") as string
//   const likes = 0
//   await addBlog(title, author, url, likes)
//   console.log('blog is added')
//   revalidatePath("/blogs")
//   redirect("/blogs")
// }

export const handleLike = async (formData: FormData) => {
  const id = Number(formData.get("id")) as number
  await addLikes(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
  console.log('blogs', getBlogs())
}

export const handleFilter = async (formData: FormData) => {
  const filter = (formData.get("filter")) as string

  redirect(`/blogs?filter=${filter}`)
}