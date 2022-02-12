import mongoose, {Document, Schema, model} from 'mongoose';

mongoose.Promise = global.Promise;

const NoteSchema = new Schema({
    title:String,
    content:String,
    uid:String,
})



export const NoteModel = mongoose.models.Note || model('Note', NoteSchema);