import dbConnect from "../../../lib/dbConnect";
import { NoteModel } from "../../../models/Note.model";
import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../../models/User.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const note = await NoteModel.find({});
        if (note.length === 0) {
          await NoteModel.create({
            title: "Hello",
            content: "Hello World",
          });
          res.status(200).json("not created");
        } else {
          res.status(200).json(note);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json("error");
      }
      break;
    case "POST":
      try {
        const {uid} = req.body;
        const User = await UserModel.findOne({uid},{_id:1}).lean();
        if(User){
        const Notes = await NoteModel.find({user:User["_id"]}).lean();
        res.status(200).json({notes:Notes});
    }   else{
        res.status(200).json({"error":"User not found"});

    }
      } catch (err) {
        console.log(err);
        res.status(500).json("error");
      }
  }
}
