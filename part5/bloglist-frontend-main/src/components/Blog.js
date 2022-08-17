const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author} ({blog.user.username})
  </div>  
)

export default Blog