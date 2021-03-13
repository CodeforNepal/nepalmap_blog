import nextConnect from 'next-connect';
import { getBlogBySlug } from "../../../lib/helpers/blogs";
import middleware from '../../../middleware/database';

const handler = nextConnect();
handler.use(middleware);

handler.get(getBlogBySlug)

export default handler
