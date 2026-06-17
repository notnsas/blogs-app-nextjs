import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithUsername } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserWithUsername(username)

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage