import type { NextApiRequest, NextApiResponse } from "next";
import {Blogs} from '../../models/blogs'
export const getAllBlogs = async (req:NextApiRequest, res: NextApiResponse) => {
    const blogs = await Blogs.find({})
    return res.status(200).json({ blogs });
}