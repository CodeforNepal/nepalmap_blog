import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query
  switch (req.method) {
    case "GET":
      res.status(200).json({ message: `Get blog by id ${id}` });
      break;
    case "PATCH":
      res.status(200).json({ message: `Update blog by id ${id}` });
      break;
    default:
      res.status(400).json({ message: "Not Allowed" });
      break;
  }
}
