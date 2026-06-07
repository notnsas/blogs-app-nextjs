import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { handleLike } from "@/app/actions/blogs"
// import { toggleNoteImportance } from "../../actions/blogs"

const NotePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <form action={handleLike}>
      {/* <form> */}
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">
          Add Like
        </button>
      </form>
    </div>
  )
}

export default NotePage