declare global {
  var blogsStore: { id: number; title: string; author: string; url: string; likes: number }[] | undefined
  var nextBlogId: number | undefined
}

const blogs = global.blogsStore ?? (global.blogsStore = [
  { id: 1, title: "next.js utilizes React Server Components", author: "Dan", url: "https://example.com", likes: 5 },
  { id: 2, title: "next.js is built on top of React", author: "Bob", url: "https://example.com", likes: 3 },
  { id: 3, title: "next.js supports both static and dynamic rendering", author: "Alice", url: "https://example.com", likes: 1 },
])

let nextId = global.nextBlogId ?? (global.nextBlogId = 4)

export const getBlogs = () => blogs

export const getBlogById = (id: number) => blogs.find((blog) => blog.id === id)

export const addBlog = (title: string, author: string, url: string, likes: number) => {
  blogs.push({ id: global.nextBlogId!++, title, author, url, likes })
}

export const addLikes = (blogId: number) => {
  const blog = getBlogById(blogId)
  if (blog) blog.likes += 1
}