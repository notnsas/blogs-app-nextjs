"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow-md">
      {/* Left side */}
      <div className="flex items-center gap-4 text-sm">
        <Link className="hover:text-blue-400 transition" href="/">
          Home
        </Link>

        <Link className="hover:text-blue-400 transition" href="/blogs">
          Blogs
        </Link>

        <Link className="hover:text-blue-400 transition" href="/users">
          Users
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
            My Profile
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
              onClick={() => signOut()}
              className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="hover:text-blue-400 transition" href="/login">
              Login
            </Link>

            <Link className="hover:text-blue-400 transition" href="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}