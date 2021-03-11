import type { NextApiRequest, NextApiResponse } from "next";

import jwt from 'next-auth/jwt'

import nextConnect, { RequestHandler } from "next-connect";

const secret = process.env.JWT_SECRET || ''


const verifyJWT: RequestHandler<NextApiRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
   try{
    const token = await jwt.getToken({ req, secret })
    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }
    return next()
   }catch(err){
       return res.status(401).json(JSON.stringify(err))
   }
    
};

const middleware = nextConnect();
middleware.use(verifyJWT);
export default middleware;
