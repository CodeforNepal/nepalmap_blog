import {Schema} from 'mongoose';

export const blogsSchema = new Schema({
    title: String,
    author: String,
    contents: String,
});

