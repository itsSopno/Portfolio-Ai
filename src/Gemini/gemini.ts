import { GoogleGenAI } from "@google/genai";
import "dotenv";


export const gerGenAi = () => {
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
    return genAI;
}
export const testAi = async () => {
    try{
        console.log("Testing Portfolio AI");
        const ai = gerGenAi();
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Hello, how are you?",
        });
        console.log(result.text);
    }
    catch(e)
    {
        console.log(e); 
    }
}