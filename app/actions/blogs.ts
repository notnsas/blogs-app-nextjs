"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, addLikes, getBlogById, getBlogs } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const likes = 0
  addBlog(title, author, url, likes)
  console.log('blog is added')
  revalidatePath("/blogs")
  redirect("/blogs")
}

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