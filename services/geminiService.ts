import { GoogleGenAI } from "@google/genai";
import { ModuleData } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses Gemini to recommend modules based on a natural language query.
 */
export const getAiRecommendation = async (
  userQuery: string,
  availableModules: ModuleData[]
): Promise<string> => {
  try {
    // Enhanced context with new fields
    const dataContext = JSON.stringify(availableModules.map(m => ({
      title: m.title,
      level: `${m.minLevel}-${m.maxLevel}`,
      setting: m.setting,
      style: m.styleLabel,
      scores: {
        dmFriendly: `${m.dmFriendlyScore}/5`,
        story: `${m.storyScore}/5`
      },
      fvtt: m.fvtt ? 'Yes' : 'No',
      summary: m.summary
    })));

    const systemPrompt = `
      你是一位名叫“档案馆员”的智能地下城主助手（Dungeon Master assistant）。
      
      以下是 JSON 格式的可用模组列表：
      ${dataContext}

      你的目标是根据用户的请求，从列表中推荐最合适的模组。
      
      规则：
      1. **必须使用中文**回答。
      2. 仅推荐列表中存在的模组。
      3. 你现在可以参考模组的“风格（style）”、“DM友好度（dmFriendly）”和“世设（setting）”来提供更精准的建议。
      4. 如果用户询问“适合新手的模组”，优先寻找低等级且DM友好度高的模组。
      5. 保持回答简洁（150字以内），语气要像一位博学的老法师。
      6. 每次回答最后，请列出推荐模组的确切名称。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    return response.text || "我无法找到特定的模组，但请随意浏览列表！";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "众灵沉默（API 错误）。请尝试手动搜索。";
  }
};