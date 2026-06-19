import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { createToken } from "../actions/users"
import { getUserWithReadingLists } from "../services/users"
import { handleMarkAsRead } from "../actions/readingLists"

// This forces Next.js to ALWAYS hit the database and never cache the HTML
export const dynamic = "force-dynamic"

const Me = async () => {
  const session = await auth()

  if (!session || !session.user?.email) {
    redirect("/login")
  }

  // Fetching the absolute newest data directly from the DB
  const currentUser = await getUserWithReadingLists(session.user.email)

  if (!currentUser) {
    redirect("/login")
  }

  // --- ADDED LOGS HERE AS REQUESTED ---
  console.log("=== DB FETCH COMPLETE ===")
  console.log("Current User fetched:", currentUser.username)
  console.log("Fresh Token from DB:", currentUser.token)
  console.log("=========================")

  const readBlogs = currentUser.readingLists.filter(item => item.read)
  const unreadBlogs = currentUser.readingLists.filter(item => !item.read)

  return (
    <div className="max-w-4xl mx-auto p-6" data-testid="user-profile">
      <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-6 space-y-8">
        <h1 className="text-3xl font-bold text-white">
          My Profile
        </h1>

        <div className="space-y-3">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Name</p>
            <p data-testid="user-name" className="text-white font-medium">
              {currentUser.name}
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Username</p>
            <p data-testid="user-username" className="text-white font-medium">
              {currentUser.username}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6" data-testid="reading-list-section">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Reading Lists
          </h2>

          {unreadBlogs.length === 0 && readBlogs.length === 0 ? (
            <div data-testid="empty-reading-list" className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400">
                Your reading list is empty
              </p>
            </div>
          ) : null}

          <div className="grid md:grid-cols-2 gap-6">
            <div data-testid="unread-section">
              <h3 data-testid="unread-blogs-title" className="text-lg font-semibold text-red-400 mb-3">
                Unread ({unreadBlogs.length})
              </h3>

              <div className="space-y-3">
                {unreadBlogs.length === 0 ? (
                  <div className="bg-gray-800/50 rounded-lg p-4" data-testid="no-unread-blogs">
                    <p className="text-gray-400">
                      No unread blogs
                    </p>
                  </div>
                ) : (
                  unreadBlogs.map(item => (
                    <div
                      key={item.id}
                      className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                    >
                      <h4 className="text-white font-medium">
                        {item.blog.title}
                      </h4>

                      <p className="text-xs text-gray-500 mt-1">
                        Blog ID: {item.blogId}
                      </p>

                      <form
                        action={handleMarkAsRead}
                        className="mt-4"
                      >
                        <input
                          type="hidden"
                          name="blogId"
                          value={item.blogId}
                        />

                        <button
                          type="submit"
                          data-testid="mark-read-button"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
                        >
                          Mark as Read
                        </button>
                      </form>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h3 data-testid="read-blogs-title" className="text-lg font-semibold text-green-400 mb-3">
                Read ({readBlogs.length})
              </h3>

              <div className="space-y-3">
                {readBlogs.length === 0 ? (
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p data-testid="no-read-blogs" className="text-gray-400">
                      No completed blogs
                    </p>
                  </div>
                ) : (
                  readBlogs.map(item => (
                    <div
                      key={item.id}
                      className="bg-gray-800/50 rounded-lg p-4 border border-green-900/50"
                    >
                      <h4 className="text-white font-medium">
                        {item.blog.title}
                      </h4>

                      <p className="text-xs text-gray-500 mt-1">
                        Blog ID: {item.blogId}
                      </p>

                      <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                        ✓ Read
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6" data-testid="api-token-section">
          <h2 className="text-xl font-semibold text-white mb-3">
            API Token
          </h2>

          <div className="bg-black/30 border border-gray-700 rounded-lg p-4 overflow-x-auto">
            {/* ✅ FIXED HYDRATION ERROR: Replaced <p> with <div> and <span> */}
            <div className="text-green-400 font-mono text-sm break-all" data-testid="token-display">
              {currentUser.token ? (
                <span data-testid="api-token">{currentUser.token}</span>
              ) : (
                <span data-testid="no-token-message" className="text-gray-400">No token generated yet</span>
              )}
            </div>
          </div>

          <form action={createToken} className="mt-4">
            <button
              type="submit"
              data-testid="generate-token-button"
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-all"
            >
              Generate New Token
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Me