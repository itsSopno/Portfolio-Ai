import { Request, Response } from "express";
import { gerGenAi } from "../Gemini/gemini";
import Project from "../Models/ProjectModel";

/**
 * @name Project Helper 
 * @description Controller for ai 
 * 
 */

export const ProjectDetailController = async(req:Request,res:Response)=>{
    try{
    const {userPrompt} = req.body;
    const products = await Project.find();
    
    }
    catch(e)
    {
        console.log(e); 
    } 
}

