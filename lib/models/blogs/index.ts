import mongoose from "mongoose";
import { AnyType } from "../../../@types";
import { BLOG_MODEL, COMMENT_MODEL } from "../../constants/model";
import { Author, authorSchema } from "../author";

export interface BlogsAttr {
  title: string;
  author: Author;
  contents: string;
  createdAt: number;
  updatedAt: number;
  banner: string;
  slug: string;
  excerpt: string;
}

interface BlogsDocument extends mongoose.Document, BlogsAttr {}
type BlogsModelType = mongoose.Model<BlogsDocument>;

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
      required: true,
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
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
  }
);
blogsSchema.virtual("comments", {
  ref: COMMENT_MODEL,
  localField: "_id",
  foreignField: "blog",
  justOne: false,
});
// fix for model already defined in development mode because of hot reload
let BlogsModel: BlogsModelType;
try {
  BlogsModel = mongoose.model(BLOG_MODEL);
} catch (err) {
  BlogsModel = mongoose.model(BLOG_MODEL, blogsSchema);
}

export { BlogsModel };
