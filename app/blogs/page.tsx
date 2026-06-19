import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { handleCreateReadingList } from "../actions/readingLists"
import { getCurrentUser } from "../services/session"
import { getUserWithReadingLists } from "../services/users"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-gray-400">
          Please <Link href="/login" className="text-blue-400 hover:underline">log in</Link> to view blogs.
        </p>
      </div>
    )
  }

  const { filter } = await searchParams
  const blogs = await getBlogs(filter)
  const currentUserWithReadingLists = await getUserWithReadingLists(currentUser.username)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Blogs</h1>

      <form method="GET" className="flex gap-2 mb-6">
        <input
          name="filter"
          defaultValue={filter}
          data-testid="filter-input"
          placeholder="Filter blogs..."
          className="flex-1 p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-green-500"
        />

        <button
          type="submit"
          data-testid="search-button"
          className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-500"
        >
          Search
        </button>
      </form>

      <div className="space-y-4" data-testid="blogs-list">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="p-4 rounded-xl bg-gray-900 border border-gray-800 shadow-sm"
          >
            <Link
              href={`/blogs/${blog.id}`}
              className="block hover:text-green-400"
            >
              <h2 className="text-lg font-semibold text-white">
                {blog.title}
              </h2>
            </Link>

            <p className="text-sm text-gray-400 mt-1">
              {blog.author} • {blog.likes} likes
            </p>

            <p className="text-sm text-gray-500 mt-1 truncate">
              {blog.url}
            </p>

            <form
              action={handleCreateReadingList}
              className="mt-4"
            >
              <input
                type="hidden"
                name="blogId"
                value={blog.id}
              />
              {
                currentUserWithReadingLists?.readingLists.some(item => item.blogId === blog.id) ? (
                <span className="px-4 py-2 rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed">
                  Already in Reading List
                </span>
              ) : (
                <button
                  type="submit"
                  data-testid={`add-to-reading-list-button-${blog.id}`}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all"
                >
                  Add to Reading List
                </button>
              )}
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs