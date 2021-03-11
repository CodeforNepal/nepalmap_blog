import {Model, model, Document} from 'mongoose'
import { blogsSchema } from '../../schemas/blogs';


// fix for model already defined in development mode because of hot reload
let Blogs:Model<Document>
try{
    Blogs = model('Blogs');
}catch(err){
    Blogs = model('Blogs', blogsSchema);
}

export {Blogs}