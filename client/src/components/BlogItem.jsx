import React from "react";

const BlogItem = ({blog, author}) => {
  return (
    <div className="card" style={{width: "100%", margin: "25px"}}>
        <div className="card-body">
          <h5 className="card-title">{blog.title}</h5>
          <p className="card-title">Author: {author.name}</p>
          <p className="card-text">Published: {blog.createdAt.substring(0, 10)}</p>
          <p className="card-text">{blog.content}</p>
          {/* <a href="/" className="btn btn-primary">Read more</a> */}
        </div>
    </div>
  )
}

export default BlogItem;