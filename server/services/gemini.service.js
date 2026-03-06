import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// export const run = async (prompt) => {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: prompt
//     });

//     return response.text;
// }

const Gemini_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

export const generateGeminiResponse = async (prompt) => {
    try {
        const response = await fetch(`${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        })

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Gemini API Error:", errorData);
            throw new Error("Gemini API request failed");
        }

        const data = await response.json()
        // return data

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text

        if (!text) {
            throw new Error("Failed to generate response")
        }
        const cleanText = text
            .replace(/```json\n?/g, "")
            .replace(/```\n?/g, "")
            .trim();

        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("No JSON found in Gemini response");
        }

        let parsedData;

        try {
            parsedData = JSON.parse(jsonMatch[0]);
        } catch (err) {
            console.error("JSON Parse Error:", err);
            console.log("Raw Gemini Response:", jsonMatch[0]);

            throw new Error("Invalid JSON returned by Gemini");
        }

        return parsedData;
    }
    catch (error) {
        console.log(error)
        throw error
    }
}