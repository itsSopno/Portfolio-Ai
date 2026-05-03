import { Request, Response } from "express";
import { gerGenAi } from "../Gemini/gemini";
import Project from "../Models/ProjectModel";
import UserModel from "../Models/userModel";

/**
 * @name Project Helper 
 * @description Controller for ai 
 * 
 */

export const ProjectDetailController = async(req:Request,res:Response) => {
    try {
        const { userPrompt } = req.body;
        
        if (!userPrompt) {
            return res.status(400).json({ message: "Please provide a userPrompt in the request body." });
        }

        // Fetch portfolio owner details (assuming there's only one user in the DB representing the owner)
        const owner = await UserModel.findOne();
        
        // Fetch all projects
        const projects = await Project.find();
        
        // Prepare the context about the portfolio owner
        let ownerContext = "This is a portfolio website. The owner has not provided detailed information yet.";
        if (owner) {
            ownerContext = `
            You are an AI assistant for a personal portfolio website. Your purpose is to answer visitors' questions about the portfolio owner.
            Here is the information about the portfolio owner:
            - Name: ${owner.name}
            - Email: ${owner.email}
            - Bio: ${owner.bio}
            - Skills: ${owner.skills.join(", ")}
            - Experience: ${owner.experience}
            - Social Links: GitHub: ${owner.socialLinks?.github || "N/A"}, LinkedIn: ${owner.socialLinks?.linkedin || "N/A"}, Twitter: ${owner.socialLinks?.twitter || "N/A"}
            `;
        }

        // Prepare the context about the projects
        let projectsContext = "No projects are currently available.";
        if (projects && projects.length > 0) {
            projectsContext = "Here are the projects the owner has worked on:\n";
            projects.forEach((p, index) => {
                projectsContext += `${index + 1}. ${p.name}: ${p.description}. Tech Stack: ${p.techStack.join(", ")}. Live Link: ${p.livelink}, GitHub: ${p.github}\n`;
            });
        }

        const systemPrompt = `
        ${ownerContext}
        
        ${projectsContext}
        
        Instructions:
        1. Always be polite, professional, and helpful.
        2. Use the provided context to answer the user's question accurately.
        3. If the user asks something completely unrelated to the portfolio owner, their skills, or their projects, politely let them know that you are here to answer questions specifically about the portfolio owner.
        4. Keep your responses concise and engaging.
        `;

        // Initialize Gemini AI
        const ai = gerGenAi();
        
        // Generate content
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemPrompt,
            }
        });

        const responseText = result.text;

        return res.status(200).json({ 
            success: true, 
            response: responseText 
        });

    } catch(e) {
        console.error("Error in AI Controller:", e); 
        return res.status(500).json({ 
            success: false, 
            message: "Failed to generate AI response. Please try again later." 
        });
    } 
};
