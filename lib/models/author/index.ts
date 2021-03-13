import mongoose from 'mongoose'
import { AnyType } from '../../../@types';
import { AUTHOR_MODEL } from '../../constants/model';

export interface Author {
    name: string;
    email: string;
    picture: string;
}

interface AuthorDocument extends mongoose.Document, Author {}
type AuthorModelType = mongoose.Model<AuthorDocument>

export const authorSchema = new mongoose.Schema<AuthorDocument,AuthorModelType,AnyType<Author>>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
    },
});

// fix for model already defined in development mode because of hot reload
let AuthorModel:AuthorModelType
try{
    AuthorModel = mongoose.model(AUTHOR_MODEL);
}catch(err){
    AuthorModel = mongoose.model(AUTHOR_MODEL, authorSchema);
}

export {AuthorModel}