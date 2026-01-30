
import { GoogleGenAI } from "@google/genai";
import { Language } from "../translations";

const API_KEY = process.env.API_KEY;

export const analyzePoopPost = async (note: string, bristolType: number, lang: Language, imageData?: string) => {
  if (!API_KEY) return "AI analysis unavailable (Missing API Key)";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const model = 'gemini-3-flash-preview';
    
    const langInstructions = lang === 'zh' 
      ? "Respond strictly in Cantonese (Hong Kong style, casual and witty)." 
      : "Respond in English (witty and encouraging).";

    let contents: any = `A user just logged a bowel movement. 
    Bristol Scale Type: ${bristolType}. 
    User Note: "${note || 'No notes provided'}".
    ${langInstructions}
    Provide a witty, encouraging, and slightly humorous social media comment for their feed. 
    Keep it short (max 2 sentences). If the Bristol scale is 4, call it a masterpiece. If it's 1 or 7, give some gentle dietary 'hydration' or 'fiber' advice.`;

    if (imageData) {
      const imagePart = {
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageData.split(',')[1],
        },
      };
      contents = { parts: [imagePart, { text: contents }] };
    }

    const response = await ai.models.generateContent({
      model,
      contents: typeof contents === 'string' ? contents : [contents],
    });

    return response.text || (lang === 'zh' ? "做得好，繼續努力！" : "Nature calls, and you answered beautifully!");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return lang === 'zh' ? "AI 被你嘅作品震懾到無語！" : "The AI is speechless at your productivity!";
  }
};
