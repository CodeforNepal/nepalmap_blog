import nextConnect from 'next-connect';
import { getAllBlogs, createBlog } from "../../../lib/helpers/blogs";
import middleware from '../../../middleware/database';

const handler = nextConnect();
handler.use(middleware);

handler.get(getAllBlogs)
handler.post(createBlog)

export default handler
