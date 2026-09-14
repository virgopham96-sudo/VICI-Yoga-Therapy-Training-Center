import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MessageCircle, Phone, ShieldCheck, LayoutDashboard } from 'lucide-react';
import ViciLogo from './ViciLogo';
import { VICI_INFO } from '../data/viciData';

interface HeaderProps {
  onOpenAIChat: (initialTopic?: string) => void;
  onOpenRegister: (courseName?: string) => void;
  isAdminView: boolean;
  onToggleAdminView: (value?: boolean) => void;
}

export default function Header({
  onOpenAIChat,
  onOpenRegister,
  isAdminView,
  onToggleAdminView,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Trang chủ', href: '#hero' },
    { label: 'Về VICI', href: '#about' },
    { label: 'Đội ngũ HLV', href: '#trainers' },
    { label: 'Khóa học', href: '#courses' },
    { label: 'Quy trình Trị liệu', href: '#therapy-sop' },
    { label: 'Lịch học', href: '#schedule' },
    { label: 'Không gian', href: '#activities' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (isAdminView) {
      onToggleAdminView(false);
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFDF8]/95 backdrop-blur-md shadow-xs border-b border-[#E8DFC8]'
          : 'bg-[#FFFDF8]/80 backdrop-blur-xs border-b border-[#E8DFC8]/60'
      }`}
    >
      {/* Top micro banner */}
      <div className="bg-[#8A6437] text-amber-50 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] sm:text-xs font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E5B25D]" />
              Tiêu chuẩn Yoga Alliance Hoa Kỳ (E-RYT 500 & YACEP)
            </span>
            <span className="hidden md:inline-block text-amber-200/50">|</span>
            <span className="hidden md:inline-block">Master Henry Phan trực tiếp giảng dạy</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${VICI_INFO.hotline.replace(/\s/g, '')}`}
              className="flex items-center gap-1 hover:text-[#E5B25D] transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>Hotline: {VICI_INFO.hotline}</span>
            </a>
            
            {/* Quick Switcher to Admin Demo */}
            <button
              id="header-toggle-admin-btn"
              onClick={() => onToggleAdminView(!isAdminView)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-900/40 hover:bg-amber-900/70 border border-amber-400/30 text-amber-200 text-[11px] transition-all cursor-pointer"
              title="Xem hệ thống quản lý Lead Demo"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>{isAdminView ? 'Quay lại Website' : 'Admin CRM Demo'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="focus:outline-none"
          >
            <ViciLogo />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[14px] font-medium text-[#4A4E44]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-[#D69A2D] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D69A2D] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* AI Advisor CTA Button */}
            <button
              id="header-ai-advisor-btn"
              onClick={() => onOpenAIChat()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full bg-[#D69A2D]/10 text-[#A66F17] hover:bg-[#D69A2D]/20 border border-[#D69A2D]/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D69A2D]" />
              <span>Hỏi MY VICI</span>
            </button>

            {/* Primary Consultation Registration CTA */}
            <button
              id="header-register-btn"
              onClick={() => onOpenRegister()}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-semibold rounded-full bg-[#D69A2D] text-white hover:bg-[#B87A14] shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <span>Đăng ký tư vấn</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-chat-quick-btn"
              onClick={() => onOpenAIChat()}
              className="p-2 rounded-full bg-[#D69A2D]/10 text-[#D69A2D]"
              aria-label="AI Chatbot"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#252822] hover:bg-[#F4EADA]/60 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF8] border-b border-[#E8DFC8] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-base font-medium text-[#252822] hover:text-[#D69A2D] py-2 border-b border-[#F4EADA]/60"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                id="mobile-drawer-ai-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIChat();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D69A2D]/10 text-[#A66F17] font-semibold border border-[#D69A2D]/30"
              >
                <Sparkles className="w-4 h-4 text-[#D69A2D]" />
                <span>Hỏi Trợ lý MY VICI</span>
              </button>

              <button
                id="mobile-drawer-register-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D69A2D] text-white font-semibold shadow-xs"
              >
                <span>Đăng ký tư vấn ngay</span>
              </button>

              <button
                id="mobile-drawer-admin-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleAdminView(!isAdminView);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#8A6437]/10 text-[#8A6437] font-medium text-sm border border-[#8A6437]/20"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{isAdminView ? 'Về trang chủ Website' : 'Mở Admin Lead CRM'}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
