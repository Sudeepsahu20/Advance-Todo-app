import mongoose, { mongo } from "mongoose";
import { boolean, maxLength } from "zod";


const TodoSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim:true,
    maxlength:100

  },
  description:{
    type:String,
    trim:true,
    maxlength:1000

  },
  completed:{
    type:Boolean,
   default:false,

  },
   priority:{
    type:String,
    enum:['low','medium','high'],
    default:'medium',

  }
},
{timestamps:true});

export default mongoose.models.Todo || mongoose.model('Todo',TodoSchema);