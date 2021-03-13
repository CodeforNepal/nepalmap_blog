import type { NextApiRequest, NextApiResponse } from "next";
import {BlogsModel} from '../../models/blogs'

export const getAllBlogs = async (req:NextApiRequest, res: NextApiResponse) => {

    const blogs = await BlogsModel.find({})
    return res.status(200).json({ blogs });
}