import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { processChatConsultation } from './src/services/aiAdvisorService';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

// In-memory lead store with default sample leads
let leadsStore = [
  {
    id: 'VICI-LEAD-101',
    createdAt: '2026-09-12 14:35',
    name: 'Nguyễn Thị Mai Lan',
    phone: '0912 345 678',
    email: 'mailan.nguyen@gmail.com',
    source: 'VICI AI Advisor',
    interest: 'Trị liệu Cơ - Vai - Cổ - Gáy',
    category: 'THERAPY_INTEREST',
    experience: 'Dưới 6 tháng',
    goals: ['Giảm đau vai gáy', 'Cải thiện giấc ngủ', 'Chỉnh dáng ngồi văn phòng'],
    preferredTime: 'Tối (17:45 - 19:00)',
    preferredFormat: 'Trực tiếp tại Studio',
    recommendedCourse: 'Scan Trị Liệu Cơ - Vai - Cổ - Gáy + Gói 3 Tháng',
    leadScore: 'HOT',
    status: 'New',
    assignedTo: 'Master Mỹ Kiều',
    conversationSummary: 'Khách hàng làm lập trình viên, đau mỏi bả vai và cổ nhiều tháng nay do ngồi máy tính liên tục. Muốn đặt lịch Scan cơ ban đầu và tham gia lớp tối.',
    conversationHistory: [
      { sender: 'user', text: 'Chào VICI, mình bị đau cổ vai gáy mấy tháng nay rất khó chịu, nhờ tư vấn giúp', time: '14:30' },
      { sender: 'ai', text: 'Xin chào chị Mai Lan. VICI rất đồng cảm với tình trạng căng cứng cổ vai gáy của chị. Chị đã từng kiểm tra hoặc tập Yoga trước đây chưa ạ?', time: '14:31' },
      { sender: 'user', text: 'Mình chưa tập bao giờ, muốn được kiểm tra trước khi tập lớp', time: '14:32' },
      { sender: 'ai', text: 'Dạ, VICI gợi ý chị đặt 1 buổi Scan Trị liệu Cơ - Vai - Cổ - Gáy (45-60 phút) để Master tầm soát điểm đau và hướng dẫn lộ trình phù hợp ạ!', time: '14:33' }
    ],
    staffNotes: 'Khách có dấu hiệu mỏi cơ bả vai do ngồi máy tính nhiều. Đã đặt lịch sơ bộ chiều Thứ 3.',
    nextAction: 'Gọi xác nhận lịch hẹn Scan 1-1 lúc 18:00 Thứ 3',
    isSampleData: true
  },
  {
    id: 'VICI-LEAD-102',
    createdAt: '2026-09-12 11:20',
    name: 'Trần Minh Quang',
    phone: '0988 765 432',
    email: 'quang.tran@techcorp.vn',
    source: 'Website Form',
    interest: 'Khóa Yoga Nâng Cao Ashtanga (10 chuyên đề)',
    category: 'ADVANCED',
    experience: 'Trên 1 năm',
    goals: ['Chinh phục Handstand an toàn', 'Mở khớp hông và lưng trên', 'Cân bằng thể lực'],
    preferredTime: 'Chiều Thứ 3 - Thứ 5 (14:00 - 15:30)',
    preferredFormat: 'Trực tiếp tại Studio',
    recommendedCourse: 'Yoga Nâng Cao Ashtanga & Năng Lượng Cột Sống (10 buổi)',
    leadScore: 'HOT',
    status: 'Contacted',
    assignedTo: 'Master Henry Phan',
    conversationSummary: 'Đã tập Yoga được 2 năm, muốn theo học trực tiếp cùng Thầy Henry để căn chỉnh kỹ thuật uốn lưng và chuối đầu an toàn.',
    staffNotes: 'Đã gọi điện trao đổi, khách rất hào hứng với 10 chuyên đề của Thầy Henry. Chờ chuyển khoản ưu đãi Early Bird 1.290.000đ.',
    nextAction: 'Gửi thông tin xác nhận chuyển khoản và vị trí phòng tập Opal Boulevard',
    isSampleData: true
  },
  {
    id: 'VICI-LEAD-103',
    createdAt: '2026-09-11 16:45',
    name: 'Lê Hoàng Yến',
    phone: '0903 214 567',
    email: 'hoangyen.le@gmail.com',
    source: 'VICI AI Advisor',
    interest: 'Đào tạo Huấn Luyện Viên Yoga Quốc Tế',
    category: 'TRAINER_EDUCATION',
    experience: 'Trên 1 năm',
    goals: ['Trở thành HLV Yoga trị liệu', 'Lấy chứng chỉ quốc tế Yoga Alliance', 'Mở lớp riêng'],
    preferredTime: 'Sáng Thứ 2 - 4 - 6 (09:00 - 12:00)',
    preferredFormat: 'Trực tiếp tại Studio & Thực tập',
    recommendedCourse: 'Đào Tạo Huấn Luyện Viên Yoga Quốc Tế (E-RYT 500 / YACEP)',
    leadScore: 'WARM',
    status: 'Consulting',
    assignedTo: 'Master Henry Phan',
    conversationSummary: 'Khách hàng có định hướng chuyển đổi nghề nghiệp sang HLV Yoga Trị liệu, quan tâm bằng cấp và cơ hội thực tập tại VICI.',
    staffNotes: 'Đang xem xét thời gian biểu sáng 2-4-6. Hẹn gửi brochure chi tiết khung 200h/500h.',
    nextAction: 'Gửi tài liệu chương trình đào tạo HLV và xếp lịch gặp trực tiếp Thầy Henry',
    isSampleData: true
  }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const hasGeminiKey = !!apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '';

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiAvailable: hasGeminiKey,
    hasApiKeyConfigured: hasGeminiKey,
    environment: 'node_server'
  });
});

// GET all leads
app.get('/api/leads', (req, res) => {
  res.json({
    success: true,
    leads: leadsStore,
    total: leadsStore.length
  });
});

// POST create new lead
app.post('/api/leads', (req, res) => {
  const {
    name,
    phone,
    email,
    source,
    interest,
    category,
    experience,
    goals,
    preferredTime,
    preferredFormat,
    recommendedCourse,
    leadScore,
    conversationSummary,
    conversationHistory,
    staffNotes,
    nextAction
  } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, error: 'Họ tên và Số điện thoại là bắt buộc' });
  }

  const newLead = {
    id: `VICI-LEAD-${Date.now().toString().slice(-4)}`,
    createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    name: name.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : undefined,
    source: source || 'Website Form',
    interest: interest || 'Chưa xác định',
    category: category || 'GENERAL_INQUIRY',
    experience: experience || 'Chưa xác định',
    goals: Array.isArray(goals) ? goals : [],
    preferredTime: preferredTime || 'Linh hoạt',
    preferredFormat: preferredFormat || 'Trực tiếp tại Studio',
    recommendedCourse: recommendedCourse || interest || 'Gói Yoga Cá Nhân Hóa',
    leadScore: leadScore || 'WARM',
    status: 'New',
    assignedTo: interest?.toLowerCase().includes('hlv') ? 'Master Henry Phan' : 'Master Mỹ Kiều',
    conversationSummary: conversationSummary || `Đăng ký quan tâm: ${interest}`,
    conversationHistory: Array.isArray(conversationHistory) ? conversationHistory : [],
    staffNotes: staffNotes || 'Lead mới đăng ký, cần liên hệ xác nhận tư vấn.',
    nextAction: nextAction || 'Gọi điện tư vấn và xếp lịch hẹn',
    isSampleData: false
  };

  leadsStore = [newLead, ...leadsStore];

  res.status(201).json({
    success: true,
    lead: newLead,
    message: 'Tạo Lead thành công'
  });
});

// PATCH update lead status or staff notes
app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status, staffNotes, nextAction, assignedTo, leadScore } = req.body;

  const leadIndex = leadsStore.findIndex((l) => l.id === id);
  if (leadIndex === -1) {
    return res.status(404).json({ success: false, error: 'Lead không tồn tại' });
  }

  leadsStore[leadIndex] = {
    ...leadsStore[leadIndex],
    ...(status ? { status } : {}),
    ...(staffNotes !== undefined ? { staffNotes } : {}),
    ...(nextAction !== undefined ? { nextAction } : {}),
    ...(assignedTo ? { assignedTo } : {}),
    ...(leadScore ? { leadScore } : {})
  };

  res.json({
    success: true,
    lead: leadsStore[leadIndex]
  });
});

// POST Chatbot endpoint with multi-model resilience and deep expert fallback
app.post('/api/chat', async (req, res) => {
  const { message, history, conversationHistory } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, error: 'Tin nhắn không được để trống' });
  }

  try {
    const rawHistory = Array.isArray(conversationHistory)
      ? conversationHistory
      : Array.isArray(history)
      ? history
      : [];

    const result = await processChatConsultation(message, rawHistory);
    res.json({
      success: true,
      reply: result.reply,
      source: result.source,
      model: result.model,
      isAiActive: result.isAiActive,
      notice: result.notice
    });
  } catch (err: any) {
    console.error('Lỗi API /api/chat trên server:', err);
    res.status(500).json({
      success: false,
      error: err?.message || 'Lỗi xử lý tư vấn',
      source: 'error'
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VICI Yoga Therapy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
