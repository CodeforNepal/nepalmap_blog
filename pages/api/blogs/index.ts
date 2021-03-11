import nextConnect from 'next-connect';
import verifyJWT  from '../../../middleware/verifyJWT';
import { getAllBlogs, createBlog } from "../../../lib/helpers/blogs";
import middleware from '../../../middleware/database';

const handler = nextConnect();
handler.use(middleware);

handler.get(getAllBlogs)

handler.use(verifyJWT)

handler.post(createBlog)

export default handler
