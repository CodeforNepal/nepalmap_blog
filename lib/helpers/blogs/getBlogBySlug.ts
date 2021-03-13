import type { NextApiRequest, NextApiResponse } from "next";
import {BlogsModel} from '../../models/blogs'

export const getBlogBySlug = async (req:NextApiRequest, res: NextApiResponse) => {
    const {slug} = req.query
    const blog = await getBlogBySlugHelper(slug as string)
    return res.status(200).json(blog);
}

export const getBlogBySlugHelper = (slug:string) => {
    return BlogsModel.findOne().bySlug(slug).populate('comments')
}