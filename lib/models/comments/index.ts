import mongoose from 'mongoose'
import { AnyType } from '../../../@types';
import { COMMENT_MODEL } from '../../constants/model';
import { Author, authorSchema } from '../author';
import { BlogsAttr } from '../blogs';

export interface CommentsAttr {
    blog: BlogsAttr;
    comment: string;
    rating?: number;
    author?: Author;
    createdAt: number;
    updatedAt: number;
}

interface CommentsDocument extends mongoose.Document, CommentsAttr {}
type CommentsModelType = mongoose.Model<CommentsDocument>

export const commentsSchema = new mongoose.Schema<CommentsDocument,CommentsModelType,AnyType<CommentsAttr>>({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    author: {
        type: authorSchema,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    },
},{
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  });

// fix for model already defined in development mode because of hot reload
let CommentsModel:CommentsModelType
try{
    CommentsModel = mongoose.model(COMMENT_MODEL);
}catch(err){
    CommentsModel = mongoose.model(COMMENT_MODEL, commentsSchema);
}

export {CommentsModel}