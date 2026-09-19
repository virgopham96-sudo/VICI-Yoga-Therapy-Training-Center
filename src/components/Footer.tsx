import { Phone, Mail, MapPin, Award, Heart, Shield } from 'lucide-react';
import ViciLogo from './ViciLogo';
import { VICI_INFO } from '../data/viciData';

interface FooterProps {
  onOpenRegister: (courseName?: string) => void;
  onOpenAIChat: () => void;
}

export default function Footer({ onOpenRegister, onOpenAIChat }: FooterProps) {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#21241E] text-amber-50/80 pt-16 pb-12 border-t border-[#3A3E34]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3A3E34]/80">
          {/* Col 1: Brand story & Logo */}
          <div className="lg:col-span-4 space-y-4">
            <ViciLogo light className="scale-105 origin-left" />
            
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm pt-2">
              Trung tâm Đào tạo & Trị liệu Yoga VICI — Đồng hành cùng bạn trên hành trình thấu hiểu cơ thể, phục hồi tự nhiên và chuyển hóa thân tâm bền vững theo phương pháp khoa học.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-300">
              <Award className="w-4 h-4 text-[#D69A2D]" />
              <span>Tiêu chuẩn Yoga Alliance Hoa Kỳ (E-RYT 500)</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5B25D]">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('#hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Về VICI & Triết lý
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#trainers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Đội ngũ Master
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#courses')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Khóa học & Học phí
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#therapy-sop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Quy trình Trị liệu SOP
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#schedule')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Thời khóa biểu tuần
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5B25D]">
              Chương Trình Đào Tạo
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>• Scan Trị Liệu Vai Cổ Gáy (650k)</li>
              <li>• Gói Yoga Cá Nhân Hóa 3 - 6 - 12 Tháng</li>
              <li>• Yoga Nâng Cao Ashtanga & Cột Sống</li>
              <li>• Đào Tạo Huấn Luyện Viên Quốc Tế</li>
              <li>• Workshop Liệu Pháp Chuông Xoay</li>
              <li>• Yoga English & Ayurveda Movement</li>
              <li>• Yoga Doanh Nghiệp (Corporate Wellness)</li>
            </ul>

            <div className="pt-2">
              <button
                id="footer-ai-chat-btn"
                onClick={onOpenAIChat}
                className="text-xs text-[#E5B25D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Hỏi Vici Care để chọn khóa phù hợp →</span>
              </button>
            </div>
          </div>

          {/* Col 4: Contact & Locations */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5B25D]">
              Thông Tin Liên Hệ
            </h4>

            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D69A2D] shrink-0 mt-0.5" />
                <span>{VICI_INFO.mainAddress}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D69A2D] shrink-0" />
                <a
                  href={`tel:${VICI_INFO.hotline.replace(/\s/g, '')}`}
                  className="hover:text-white"
                >
                  Hotline / Zalo: {VICI_INFO.hotline}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D69A2D] shrink-0" />
                <span>{VICI_INFO.email}</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                id="footer-register-btn"
                onClick={() => onOpenRegister()}
                className="w-full py-2.5 px-4 rounded-xl bg-[#D69A2D] text-white text-xs font-bold hover:bg-[#B87A14] transition-all cursor-pointer shadow-xs"
              >
                Đăng ký tư vấn trực tiếp
              </button>
            </div>
          </div>
        </div>

        {/* Bottom micro notice & copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>© {new Date().getFullYear()} VICI Yoga Therapy Training Center. All rights reserved.</p>
          
          <div className="flex items-center gap-1 text-center md:text-right">
            <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Cam kết đồng hành và phụng sự vì sức khỏe cộng đồng.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
