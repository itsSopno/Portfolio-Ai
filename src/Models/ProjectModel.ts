import { Document,model,Schema } from "mongoose";


interface IProject extends Document{
    name:string,
    image:string[],
    livelink:string,
    github:string,
description:string,
date:Date,
category:string,
techStack:string[],
featured:boolean,
}
const projectSchema = new Schema<IProject>({
    name:{
        type:String,
        required:true
    },
    image:{
        type:[String],
        required:true
    },
    livelink:{
        type:String,
        required:true
    },
    github:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    techStack:{
        type:[String],
        required:true
    },
    featured:{
        type:Boolean,
        required:true
    }
});

const Project = model<IProject>("Project", projectSchema);
export default Project;