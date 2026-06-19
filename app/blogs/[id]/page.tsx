import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { handleLike } from "@/app/actions/blogs"
import { handleCreateReadingList } from "@/app/actions/readingLists"

const NotePage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6" data-testid="blog-detail">
      {/* Card */}
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 shadow-lg">
        <h2 data-testid="blog-title" className="text-2xl font-bold text-white">{blog.title}</h2>

        <p data-testid="blog-author" className="text-gray-400 mt-2">{blog.author}</p>

        <a
          href={blog.url}
          target="_blank"
          data-testid="blog-url"
          className="text-blue-400 hover:underline break-all"
        >
          {blog.url}
        </a>

        <div className="mt-4 text-gray-300">
          Likes: <span className="font-semibold">{blog.likes}</span>
        </div>

        {/* Like button */}
        <form action={handleLike} className="mt-6">
          <input type="hidden" name="id" value={blog.id} />

          <button
            type="submit"
            data-testid="like-button"
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-all"
          >
            Add Like
          </button>
        </form>
        
        <form action={handleCreateReadingList} className="mt-6">
          <input type="hidden" name="blogId" value={blog.id} />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 
            text-white hover:bg-blue-500 transition-all"
            data-testid="add-to-reading-list-button"
          >
            Add to Reading List
          </button>
        </form>
      </div>
    </div>
  )
}

export default NotePage