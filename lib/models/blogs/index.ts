import {model} from 'mongoose'
import { blogsSchema } from '../../schemas/blogs';

export const Blogs = model('Blogs', blogsSchema);