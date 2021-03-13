import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/client'
import { BlogsModel } from "../../models/blogs";


export const createBlog = async (req:NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    const session = await getSession({ req })
    if(!session){
       return res.status(401).json({message: 'Unauthorized'})
    }
    const {user} = session
    const blog = new BlogsModel({...body,author:{
        name: user.name,
        email: user.email,
        picture: user.image,
    }})
    const createdBlog = await blog.save()
    return res.status(200).json(createdBlog);
}