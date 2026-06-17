"use client"

import { useActionState, useEffect } from "react"
import { createBlog } from "../../actions/blogs"
import { useRouter } from "next/navigation"
import { useNotification } from "@/app/components/NotificationContext"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    success: false,
    values: { title: "", author: "", url: "" },
  })

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully", "success")
      router.push("/blogs")
    } else if (state.error) {
      showNotification(state.error, "error")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">
          Create a new blog
        </h2>

        <form action={formAction} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={state.values?.title}
              required
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-green-500 outline-none"
            />
          </div>

          {/* Author */}
          <div>
            <label className="text-sm text-gray-300">Author</label>
            <input
              type="text"
              name="author"
              defaultValue={state.values?.author}
              required
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-green-500 outline-none"
            />
          </div>

          {/* URL */}
          <div>
            <label className="text-sm text-gray-300">URL</label>
            <input
              type="url"
              name="url"
              defaultValue={state.values?.url}
              required
              className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-green-500 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-green-600 text-white hover:bg-green-500 transition-all"
          >
            Create
          </button>

          {/* Error */}
          {state.error && (
            <p className="text-red-400 text-sm mt-2">
              {state.error}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default NewBlog