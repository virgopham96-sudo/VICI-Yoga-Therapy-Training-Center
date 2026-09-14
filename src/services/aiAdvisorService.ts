/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Shared AI Advisory Service for both Express server and Vercel Serverless Functions.
 */

import { GoogleGenAI } from '@google/genai';
import { VICI_SYSTEM_PROMPT, getViciConsultation } from '../data/viciAdvisor';

let geminiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          'User-Agent': 'vici-yoga-aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

export interface ChatHistoryItem {
  role?: string;
  sender?: string;
  text?: string;
  content?: string;
}

export interface ChatResponseResult {
  reply: string;
  source: 'gemini' | 'local_expert';
  model?: string;
  isAiActive: boolean;
  notice?: string;
}

export async function processChatConsultation(
  message: string,
  rawHistory: ChatHistoryItem[] = []
): Promise<ChatResponseResult> {
  const trimmedMessage = (message || '').trim();
  if (!trimmedMessage) {
    return {
      reply: 'Xin chào! VICI có thể hỗ trợ tư vấn lộ trình tập luyện hoặc giải đáp câu hỏi nào giúp bạn?',
      source: 'local_expert',
      isAiActive: false
    };
  }

  const ai = getGeminiClient();

  if (ai) {
    // Verified working models for Google GenAI v2.4+
    const candidateModels = [
      'gemini-3.6-flash',
      'gemini-3.5-flash-lite',
      'gemini-3.1-flash-lite'
    ];

    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // Map conversation history to Gemini structure
    for (const item of rawHistory.slice(-8)) {
      const isUser = item.role === 'user' || item.sender === 'user';
      const isModel = item.role === 'model' || item.role === 'assistant' || item.sender === 'ai';
      const text = (item.text || item.content || '').trim();

      if (text) {
        if (isUser) {
          if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
            contents[contents.length - 1].parts[0].text += `\n${text}`;
          } else {
            contents.push({ role: 'user', parts: [{ text }] });
          }
        } else if (isModel && contents.length > 0) {
          if (contents[contents.length - 1].role === 'model') {
            contents[contents.length - 1].parts[0].text += `\n${text}`;
          } else {
            contents.push({ role: 'model', parts: [{ text }] });
          }
        }
      }
    }

    // Append current user message
    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents[contents.length - 1].parts[0].text += `\n${trimmedMessage}`;
    } else {
      contents.push({ role: 'user', parts: [{ text: trimmedMessage }] });
    }

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: VICI_SYSTEM_PROMPT,
            temperature: 0.65
          }
        });

        const replyText = response.text?.trim();
        if (replyText) {
          return {
            reply: replyText,
            source: 'gemini',
            model: modelName,
            isAiActive: true
          };
        }
      } catch (err: any) {
        console.warn(`[AI Service] Model ${modelName} call notice:`, err?.status || err?.message || err);
      }
    }
  }

  // Fallback to VICI Expert Engine
  const localReply = getViciConsultation(trimmedMessage);
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY';

  return {
    reply: localReply,
    source: 'local_expert',
    isAiActive: false,
    notice: hasKey
      ? undefined
      : 'Vercel Notice: Chưa cấu hình biến GEMINI_API_KEY trong Vercel Environment Variables. Hệ thống đang sử dụng kho tri thức trị liệu tích hợp của VICI.'
  };
}
