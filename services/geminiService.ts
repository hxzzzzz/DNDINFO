import { GoogleGenAI, Type } from "@google/genai";
import { ModuleData } from "../types";

// Initialize Gemini
// Note: In a production app, handle the missing key gracefully in the UI.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

/**
 * Uses Gemini to recommend modules based on a natural language query.
 * We pass the entire catalog context to the model so it can reason about which modules fit best.
 */
export const getAiRecommendation = async (
  userQuery: string,
  availableModules: ModuleData[]
): Promise<string> => {
  if (!apiKey) {
    return "很抱歉，我目前没有 API 密钥，无法进行思考。请检查您的配置。";
  }

  try {
    // We strictly format the context to ensure the model understands the available data.
    const dataContext = JSON.stringify(availableModules.map(m => ({
      title: m.title,
      level: `${m.minLevel}-${m.maxLevel}`,
      tags: m.tags.join(', '),
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
      3. 如果用户要求的模组不在列表中（例如，“20级冒险”），请礼貌地解释你只有列表中的模组，并建议最接近的替代方案。
      4. 保持回答简洁（100字以内），但要具有 DND 奇幻风格的语调。
      5. 在回答中清楚地标出模组的标题。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7, // Slightly creative but grounded
      },
    });

    return response.text || "我无法找到特定的模组，但请随意浏览列表！";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "众灵沉默（API 错误）。请尝试手动搜索。";
  }
};