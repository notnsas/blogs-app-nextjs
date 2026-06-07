import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { handleLike } from "@/app/actions/blogs"
// import { toggleNoteImportance } from "../../actions/blogs"

const NotePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const note = getBlogById(Number(id))

  if (!note) {
    notFound()
  }

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.author}</p>
      <p>{note.url}</p>
      <p>Likes: {note.likes}</p>
      <form action={handleLike}>
      {/* <form> */}
        <input type="hidden" name="id" value={note.id} />
        <button type="submit">
          Add Like
        </button>
      </form>
    </div>
  )
}

export default NotePage