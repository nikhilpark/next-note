import dbConnect from "../../lib/dbConnect";
import { NoteModel } from "../../models/Note.model";
import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../models/User.model";

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
        const {title,content,uid,userUid} = req.body;
        const User = await UserModel.findOne({uid:userUid}).lean()
        const Note = await NoteModel.findOneAndUpdate({uid},{$set:{title,content:content.replaceAll("&new",""),user:User["_id"]}},{upsert:true,lean:true,new:true});
        if(User.notes.includes(Note["_id"])){
        } else {
        await UserModel.updateOne({_id:User["_id"]},{$addToSet:{notes:Note["_id"]}})
        }
        
        res.status(200).json(Note);
      } catch (err) {
        console.log(err);
        res.status(500).json({err:"error",error:JSON.stringify(err)});
      }
  }
}
