import type { NextApiRequest, NextApiResponse } from "next";


export const createBlog = async (req:NextApiRequest, res: NextApiResponse) => {
    return res.status(200).json({ message: `Create Blog` });
}