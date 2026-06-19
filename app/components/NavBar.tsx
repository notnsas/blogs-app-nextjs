"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
export default function NavBar() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow-md">
      {/* Left side */}
      <div className="flex items-center gap-4 text-sm">
        <Link className="hover:text-blue-400 transition" href="/">
          home
        </Link>

        <Link className="hover:text-blue-400 transition" href="/blogs">
          blogs
        </Link>

        <Link className="hover:text-blue-400 transition" href="/users">
          users
        </Link>

        {session && (
          <>
          <Link
            className="hover:text-blue-400 transition"
            href="/blogs/new"
          >
            Create New
          </Link>
          <Link
            className="hover:text-blue-400 transition"
            href="/me"
          >
            me
          </Link>
          </>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 text-sm">
        {session ? (
          <>
            <span className="text-gray-300">
              {session.user?.name} logged in
            </span>

            <button
              onClick={async () => {
                // await signOut({
                //   callbackUrl: "/login",
                // })
                await signOut()
              }}
              className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 transition"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <Link className="hover:text-blue-400 transition" href="/login">
              login
            </Link>

            <Link className="hover:text-blue-400 transition" href="/register">
              register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}