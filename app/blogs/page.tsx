import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const blogs = await getBlogs(filter);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-white">Blogs</h1>

      <form className="flex gap-2">
        <Link href={filter ? `/blogs?filter=${filter}` : "/blogs"}>
          <input
            name="filter"
            placeholder="Filter blogs..."
            className="flex-1 p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-green-500"
          />
        </Link>
        
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-500"
        >
          Submit
        </button>
      </form>

      {/* Blog list */}
      <div className="space-y-3">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.id}`}
            className="block p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-green-500 transition-all shadow-sm hover:shadow-md"
          >
            <div className="text-white font-semibold">{blog.title}</div>

            <div className="text-sm text-gray-400 mt-1">
              {blog.author} • Likes: {blog.likes}
            </div>

            <div className="text-sm text-gray-500 mt-1 truncate">
              {blog.url}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blogs