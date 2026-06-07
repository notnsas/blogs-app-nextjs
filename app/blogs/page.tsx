import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { handleFilter } from "../actions/blogs"
const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  // const showImportant = important === "true"
  const blogs = getBlogs()
  console.log('blogs', blogs)
  const shownBlogs = filter
    ? blogs
        .sort((a, b) => b.likes - a.likes)
        .filter(b => b.title.toLowerCase().includes(filter.toLowerCase()))
    : blogs
  
  

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {/* <Link href={showImportant ? "/blogs" : "/blogs?important=true"}> */}
          <form action={handleFilter}>
            <input type="text" name="filter"/>
            <button type="submit">submit</button>
          </form>
      </div>
      <ul>
        {shownBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              <div>{blog.title}</div>
              <div>{blog.url}</div>
              <div>{blog.author}</div>
              <div>Likes: {blog.likes}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs