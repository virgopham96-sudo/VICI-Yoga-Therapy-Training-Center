/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Shared AI Advisory Service for both Express server and Vercel Serverless Functions.
 */

import { GoogleGenAI } from '@google/genai';
import { VICI_CARE_SYSTEM_PROMPT, VICI_CARE_TOOL, getViciConsultation, extractLeadFromText, type ExtractedLead } from '../data/viciAdvisor';

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
          'User-Agent': 'vici-care-therapy-ai'
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
  capturedLead?: ExtractedLead;
}

export async function processChatConsultation(
  message: string,
  rawHistory: ChatHistoryItem[] = []
): Promise<ChatResponseResult> {
  const trimmedMessage = (message || '').trim();
  if (!trimmedMessage) {
    return {
      reply: 'Namaste! Vici Care có thể hỗ trợ tư vấn lộ trình phục hồi, giải phẫu học cơ thể hoặc giải đáp câu hỏi trị liệu nào giúp bạn?',
      source: 'local_expert',
      isAiActive: false
    };
  }

  const ai = getGeminiClient();

  if (ai) {
    // Prioritize gemini-2.5 for cost optimization, with low-cost Flash-Lite fallbacks
    const configuredModel = process.env.GEMINI_MODEL?.trim();
    const candidateModels = [
      ...(configuredModel ? [configuredModel] : []),
      'gemini-2.5-flash',
      'gemini-2.5-flash-lite',
      'gemini-flash-lite-latest',
      'gemini-3.1-flash-lite',
      'gemini-3.5-flash-lite',
      'gemini-flash-latest',
      'gemini-3.6-flash'
    ].filter((m, idx, arr) => arr.indexOf(m) === idx);

    const contents: Array<{ role: 'user' | 'model'; parts: Array<any> }> = [];

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
            systemInstruction: VICI_CARE_SYSTEM_PROMPT,
            temperature: 0.35,
            maxOutputTokens: 650,
            tools: [VICI_CARE_TOOL as any]
          }
        });

        let capturedLead: ExtractedLead | undefined;

        // Check if Gemini invoked save_contact_lead tool
        if (response.functionCalls && response.functionCalls.length > 0) {
          for (const call of response.functionCalls) {
            if (call.name === 'save_contact_lead') {
              capturedLead = call.args as any;
              console.log('[Vici Care] Đã ghi nhận Lead từ Function Calling:', capturedLead);

              // Provide functionResponse back to continue natural empathetic conversation
              const candidateContent = response.candidates?.[0]?.content;
              const followUpContents = [
                ...contents,
                candidateContent || {
                  role: 'model',
                  parts: [{ functionCall: call }]
                },
                {
                  role: 'user',
                  parts: [
                    {
                      functionResponse: {
                        name: 'save_contact_lead',
                        response: {
                          status: 'success',
                          message: 'Đã lưu trữ thông tin khách hàng vào CRM và lên lịch hẹn kiểm tra tầm vận động ROM test thành công.'
                        }
                      }
                    }
                  ]
                }
              ];

              const followUpResponse = await ai.models.generateContent({
                model: modelName,
                contents: followUpContents,
                config: {
                  systemInstruction: VICI_CARE_SYSTEM_PROMPT,
                  temperature: 0.35,
                  maxOutputTokens: 650
                }
              });

              const followUpText = followUpResponse.text?.trim();
              if (followUpText) {
                return {
                  reply: followUpText,
                  source: 'gemini',
                  model: modelName,
                  isAiActive: true,
                  capturedLead
                };
              }
            }
          }
        }

        const replyText = response.text?.trim();
        if (replyText) {
          // Fallback text parser in case Gemini answered with text instead of tool call when phone was given
          if (!capturedLead) {
            const fallbackExtracted = extractLeadFromText(trimmedMessage);
            if (fallbackExtracted) {
              capturedLead = fallbackExtracted;
            }
          }

          return {
            reply: replyText,
            source: 'gemini',
            model: modelName,
            isAiActive: true,
            capturedLead
          };
        }
      } catch (err: any) {
        console.warn(`[AI Service] Model ${modelName} call notice:`, err?.status || err?.message || err);
      }
    }
  }

  // Fallback to Vici Care Expert Engine
  const localReply = getViciConsultation(trimmedMessage);
  const fallbackLead = extractLeadFromText(trimmedMessage);
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY';

  return {
    reply: localReply,
    source: 'local_expert',
    isAiActive: false,
    capturedLead: fallbackLead || undefined,
    notice: hasKey
      ? undefined
      : 'Thông báo: Hệ thống Vici Care đang vận hành ở chế độ Trị Liệu Trực Tiếp với kho tri thức chuyên sâu chuẩn hóa.'
  };
}
