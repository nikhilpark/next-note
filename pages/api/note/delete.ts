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
        const {noteId} = req.body;
        const del = await NoteModel.deleteOne({_id:noteId}).lean();
        if(del){
        res.status(200).json({"success":"Note deleted"});
    }   else{
        res.status(200).json({"error":"error ocuured"});

    }
      } catch (err) {
        console.log(err);
        res.status(500).json("error");
      }
  }
}
