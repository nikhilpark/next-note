import mongoose, {Document, Schema, model} from 'mongoose';

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    name:String,
    uid:String,
    isRegistered:{
        type:Boolean,
        default:false
    },
    joinedOn:{
        type:Date,
        default:Date.now
    },
    notes:[
        {
            _id:false,
            note:{
                type:Schema.Types.ObjectId,
                ref:'Note'
            }
        }
    ]
})



export const UserModel = mongoose.models.User || model('User', UserSchema);