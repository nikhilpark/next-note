import dbConnect from "../../lib/dbConnect";
import { NoteModel } from "../../models/Note.model";
import { NextApiRequest, NextApiResponse } from "next";

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
        console.log("hit",req.body)
        const {title,content,uid} = req.body;
        const Note = await NoteModel.updateOne({uid},{title,content},{upsert:true});
        res.status(200).json(Note);
      } catch (err) {
        console.log(err);
        res.status(500).json("error");
      }
  }
}
