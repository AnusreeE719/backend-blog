import mongoose from "mongoose";
import Blog from "../models/blogSchema.js";


export const createBlog = async(req, res) => {
    const { title, content } = req.body;
    try{
        const newBlog = new Blog({
            title,
            content, 
            userId: req.user._id,
        })

        await newBlog.save()

        res.status(201).json({
            success: true,
            message: "Blog added successfully",
            newBlog,
        })
    }catch(error) {
        console.log("Something went wrong", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getAllBlogs = async (req, res) => {
    const userId = req.user._id;

  try {
    const blogList = await Blog.find({ userId: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All blogs retrived successfully",
      blogList,
    })
  } catch (error) {
        console.log("Something went wrong", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const getBlogById = async (req, res) => {
    const userId = req.user._id;
     const { blogId } = req.params;
     if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid blogId",
        });
    }
  try {
    // const blog = await Blog.findById(blogId);
    // if (!blog) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Blog not found",
    //     });
    // }
    // if (blog.userId.toString() !== req.user._id.toString()) {
    //      return res.status(403).json({
    //         success: false,
    //         message: "Not authorized",
    //     });
    // }
    const blog = await Blog.findOne({ _id: blogId, userId: userId });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog retrieved successfully",
      blog,
    });
  } catch (error) {
        console.log("Something went wrong", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const updateBlog = async (req, res) => {

    const { blogId } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid blogId",
        });
    }
    
    try {
        // const blog = await Blog.findById(blogId);
        // if (!blog) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Blog not found",
        //     });
        // }
        // if (blog.userId.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "Not authorized",
        //     });
        // }
        // if (title !== undefined) blog.title = title;
        // if (content !== undefined) blog.content = content;

        // await blog.save();


        const updates = {};
        if (title !== undefined) updates.title = title;
        if (content !== undefined) updates.content = content;


        const blog = await Blog.findOneAndUpdate(
            { _id: blogId, userId: req.user._id },
            updates,
            { returnDocument: "after" }
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found or not authorized",
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog
        })
        
    } catch (error) {
        console.log("Something went wrong", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const deleteBlog = async (req, res) => {
    const { blogId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid blogId",
        });
    }

  try {
    // const blog = await Blog.findById(blogId);
    // if (!blog) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Blog not found",
    //     });
    // }
    // if (blog.userId.toString() !== req.user._id.toString()) {
    //      return res.status(403).json({
    //         success: false,
    //         message: "Not authorized",
    //     });
    // }
    // await blog.deleteOne();
    const deletedBlog = await Blog.findOneAndDelete({
      _id: blogId,
      userId: req.user._id,
    });

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
        console.log("Something went wrong", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// export const getBlogs = async (req, res) => {
//   try {
//     //Extracts query params
//     const { search = "", page = 1, limit = 5 } = req.query;

//     //Query params come as strings, onvert them to numbers
//     const pageNumber = parseInt(page) || 1;
//     const limitNumber = parseInt(limit) || 5;
//     const skip = (pageNumber - 1) * limitNumber;

//     //Initializes empty object
//     const query = {};

//     //Only runs if search exists
//     if (search) {
//       query.title = { $regex: search, $options: "i" }; 
//     }

//     const blogs = await Blog.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limitNumber);

//       //calculate total docs
//     const total = await Blog.countDocuments(query);

//     //calculate total pages
//     const pages = Math.ceil(total / limitNumber);

//     res.status(200).json({
//       success: true,
//       blogs,       
//       total,
//       page: pageNumber,
//       pages,
//     });

//   } catch (error) {
//     console.log("Something went wrong:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };