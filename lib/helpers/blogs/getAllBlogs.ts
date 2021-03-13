import type { NextApiRequest, NextApiResponse } from "next";
import {BlogsModel} from '../../models/blogs'

export const getAllBlogs = async (req:NextApiRequest, res: NextApiResponse) => {
    const {query} = req
    const blogs = await getAllBlogsHelper(query)
    return res.status(200).json({ blogs });
}

export const getAllBlogsHelper = (query:any) => {
    return BlogsModel.find({})
}