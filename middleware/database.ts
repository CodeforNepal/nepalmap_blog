import mongoose, { connect, connections, connection } from "mongoose";
import nextConnect, { RequestHandler } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

export const connectDatabase = async () => {
  if (!connections[0].readyState) {
    await connect(process.env.DATABASE_URL || "mongodb://localhost/nepaldata", {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
  }
};
const database: RequestHandler<NextApiRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  await connectDatabase();
  return next();
};
const db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database connected");
});
const middleware = nextConnect();
middleware.use(database);
export default middleware;
