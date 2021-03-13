import type { NextApiRequest, NextApiResponse } from "next";
import {BlogsModel} from '../../models/blogs'
import { getSession } from 'next-auth/client'

export const getAllBlogs = async (req:NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    console.log(session)
    const blogs = await BlogsModel.find({})
    return res.status(200).json({ blogs });
}