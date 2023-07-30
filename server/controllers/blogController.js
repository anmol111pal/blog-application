const Blog = require("../models/BlogModel.js");
const User = require("../models/UserModel.js");
const loggedInUsers = require("./login.js");

const getBlog = async (req, res) => {
    const _id = req.params.id;
    try {
        const blog = await Blog.findOne({_id}, {_id: 0, title: 1, content: 1, author: 1, likes: 1, createdAt: 1, updatedAt: 1});
        res.status(200).send({
            code: 200,
            blog
        });
    } catch(err) {
        res.status(500).send({
            code: 500,
            message: "Could not fetch the requested blog."
        });
    }
}

const getAllBlogs = async (req, res) => {
    if(req.cookies.user_id) {
        let blogs = await Blog.find({}, {_id: 1, title: 1, content: 1, author: 1, likes: 1, createdAt: 1}); // all blogs
        
        const blog_ids = [];
        const authors = [];

        for(const blog of blogs) {
            blog_ids.push(blog._id.toString());
        }
        for(const blog_id of blog_ids) {
            const author_doc = await User.findOne({ posts: blog_id }, {name: 1});
            authors.push(author_doc);
        }

        res.status(200).send({
            code: 200,
            blogs,
            authors
        });

    } else {
        console.log("No cookie found in req");
        res.status(401).send({
            code: 401,
            message: "Auth error"
        });
    }
}

const getMyBlogs = async (req, res) => {
    if(req.cookies.user_id) {
        const user_id = req.cookies.user_id;
        const userPosts = await User.findOne({_id: user_id}, {_id: 0, posts: 1});
        const blogIDs = userPosts.posts;

        // fetch the blogs using the blog IDs
        const blogs = [];
        for(let blogID of blogIDs) {
            blogID = blogID.toString();
            const resp = await Blog.findOne({_id: blogID});
            blogs.push(resp);
        }

        res.status(200).send({
            code: 200,
            blogs
        });

    } else {
        res.status(401).send({
            code: 401,
            message: "Auth error"
        });
    }
}

const write = async (req, res) => {
    if(req.cookies.user_id) {
        const {title, content} = req.body;
        const user_id = req.cookies.user_id;
        
        let blog = null;
        try {
            // create a blog
            blog = await Blog.create({title, content, author: user_id});
            console.log("Blog published!");
            // update the user doc with the id of the blog's id
            const result = await User.updateOne({ _id: user_id }, { $push: { posts: blog._id } });
            if(result.modifiedCount !== 1) {
                throw new Error("Error while updating user-doc with blog-id.");
            }
            //? Implement the above feature using aggregation

            res.status(201).send({
                blog
            });

        } catch(err) {
            console.log("Error while publishing blog:", err);
            res.status(401).send({
                code: 401,
                message: "Could not publish the blog."
            });
        }
    } else {
        res.status(401).send({
            code: 401,
            message: "Auth error"
        });
    }
}

module.exports = {
    getBlog,
    getAllBlogs,
    getMyBlogs,
    write
}