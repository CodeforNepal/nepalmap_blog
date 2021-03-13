import mongoose from "mongoose";
import { AnyType } from "../../../@types";
import { BLOG_MODEL, COMMENT_MODEL } from "../../constants/model";
import { Author, authorSchema } from "../author";
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug)
export interface BlogsAttr {
  title: string;
  author: Author;
  contents: string;
  createdAt: string;
  updatedAt: string;
  banner: string;
  slug: string;
  excerpt: string;
}

interface BlogsDocument extends mongoose.Document, BlogsAttr {}
interface BlogsQueryHelper {
  bySlug(slug:string): mongoose.QueryWithHelpers<BlogsAttr,BlogsDocument>
}
interface BlogsModelType extends mongoose.Model<BlogsDocument,BlogsQueryHelper>{
  // findOneBySlug(slug:string):BlogsDocument
}

export const blogsSchema = new mongoose.Schema<
  BlogsDocument,
  BlogsModelType,
  AnyType<BlogsAttr>
>(
  {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
        type: String,
        required: true,
      },
    author: {
      type: authorSchema,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
    },
    slug: {
      type: String,
      slug: "title", slugPaddingSize: 4,  unique: true 
    },
  },
  {
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
  }
);
blogsSchema.virtual("comments", {
  ref: COMMENT_MODEL,
  localField: "_id",
  foreignField: "blog",
  justOne: false,
});

blogsSchema.query.bySlug = function (slug:string) {
  return this.where({slug})
}
// fix for model already defined in development mode because of hot reload
let BlogsModel: BlogsModelType;
try {
  BlogsModel = mongoose.model(BLOG_MODEL) as BlogsModelType;
} catch (err) {
  BlogsModel = mongoose.model(BLOG_MODEL, blogsSchema);
}

export { BlogsModel };

export interface CommentsAttr {
    blog: BlogsAttr;
    comment: string;
    rating?: number;
    author?: Author;
    createdAt: string;
    updatedAt: string;
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