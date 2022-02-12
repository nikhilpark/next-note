import dbConnect from "../../../lib/dbConnect";
import { NoteModel } from "../../../models/Note.model";
import {UserModel} from "../../../models/User.model";
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
        // const note = await NoteModel.find({});
        // if (note.length === 0) {
        //   await NoteModel.create({
        //     title: "Hello",
        //     content: "Hello World",
        //   });
        //   res.status(200).json("not created");
        // } else {
        //   res.status(200).json(note);
        // }
      } catch (err) {
        console.log(err);
        res.status(500).json("error");
      }
      break;
    case "POST":
      try {
        const {uid} = req.body;
        const User = await UserModel.findOne({uid});
        if(User){
        res.status(200).json({verified:true,uid});
        } else {
            res.status(200).json({verified:false});
        }
      } catch (err) {
        console.log(err);
        res.status(500).json("error");
      }
  }
}
