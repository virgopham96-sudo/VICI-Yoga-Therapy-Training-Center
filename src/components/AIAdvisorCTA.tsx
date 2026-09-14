import { Sparkles, MessageSquare, ArrowRight, Bot } from 'lucide-react';

interface AIAdvisorCTAProps {
  onOpenAIChat: (promptTopic?: string) => void;
}

export default function AIAdvisorCTA({ onOpenAIChat }: AIAdvisorCTAProps) {
  const quickPills = [
    'Tôi mới bắt đầu Yoga',
    'Tôi quan tâm Yoga Therapy vai gáy',
    'Tôi muốn học Ashtanga nâng cao',
    'Tôi muốn trở thành HLV Yoga',
    'Tôi muốn xem học phí & lịch học',
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#FFFDF8] relative overflow-hidden border-t border-[#E8DFC8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#8A6437] to-[#6A4B27] p-8 sm:p-12 text-white shadow-xl overflow-hidden">
          {/* Subtle background decorative shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#D69A2D]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
                <Bot className="w-3.5 h-3.5" />
                <span>MY VICI AI • Trợ lý tư vấn thông minh</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-serif-display text-white mb-3">
                Chưa biết chương trình nào phù hợp với bạn?
              </h3>

              <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed mb-6">
                Chỉ cần 1 phút trò chuyện, MY VICI sẽ lắng nghe mục tiêu, tình trạng cơ xương khớp của bạn và gợi ý chính xác lớp học tối ưu nhất.
              </p>

              {/* Quick Prompt Pills */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {quickPills.map((pill, i) => (
                  <button
                    key={i}
                    onClick={() => onOpenAIChat(pill)}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-amber-100 transition-all cursor-pointer"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="shrink-0">
              <button
                id="ai-advisor-section-cta-btn"
                onClick={() => onOpenAIChat()}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#D69A2D] text-white font-bold text-sm sm:text-base hover:bg-[#B87A14] shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span>Bắt đầu trò chuyện cùng MY VICI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
