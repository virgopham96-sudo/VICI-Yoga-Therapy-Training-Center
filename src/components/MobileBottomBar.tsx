import { Sparkles, Send, Phone } from 'lucide-react';
import { VICI_INFO } from '../data/viciData';

interface MobileBottomBarProps {
  onOpenAIChat: () => void;
  onOpenRegister: () => void;
}

export default function MobileBottomBar({ onOpenAIChat, onOpenRegister }: MobileBottomBarProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-t border-[#E8DFC8] p-2.5 shadow-lg">
      <div className="max-w-md mx-auto flex items-center gap-2">
        {/* Quick Phone Call */}
        <a
          href={`tel:${VICI_INFO.hotline.replace(/\s/g, '')}`}
          className="p-2.5 rounded-xl bg-[#F4EADA] text-[#8A6437] hover:bg-[#EFE7D5] shrink-0"
          aria-label="Gọi hotline"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* AI Advisor Button */}
        <button
          id="mobile-bottom-ai-btn"
          onClick={onOpenAIChat}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#D69A2D]/15 text-[#9E6910] text-xs font-bold border border-[#D69A2D]/30 active:scale-98 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#D69A2D]" />
          <span>Hỏi Vici Care</span>
        </button>

        {/* Register Button */}
        <button
          id="mobile-bottom-register-btn"
          onClick={onOpenRegister}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#D69A2D] text-white text-xs font-bold shadow-xs active:scale-98 transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Đăng ký học</span>
        </button>
      </div>
    </div>
  );
}
