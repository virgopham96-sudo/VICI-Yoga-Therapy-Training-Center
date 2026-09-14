/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Vercel Serverless Function: /api/chat
 * Provides dynamic Gemini AI advisory for VICI Yoga Therapy on Vercel.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { processChatConsultation } from '../src/services/aiAdvisorService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Setup CORS headers for cross-origin or preview deployments
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-Type'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (_) {}
    }

    const message = body?.message;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'Tin nhắn không được để trống' });
    }

    const conversationHistory = body?.conversationHistory || body?.history || [];
    const result = await processChatConsultation(message, conversationHistory);

    return res.status(200).json({
      success: true,
      reply: result.reply,
      source: result.source,
      model: result.model,
      isAiActive: result.isAiActive,
      notice: result.notice
    });
  } catch (err: any) {
    console.error('Error handling /api/chat on Vercel:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Lỗi nội bộ khi kết nối AI',
      source: 'serverless_error'
    });
  }
}
