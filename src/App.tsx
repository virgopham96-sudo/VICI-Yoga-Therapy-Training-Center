/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import TherapySOP from './components/TherapySOP';
import Trainers from './components/Trainers';
import Courses from './components/Courses';
import Outcomes from './components/Outcomes';
import Schedule from './components/Schedule';
import Activities from './components/Activities';
import AIAdvisorCTA from './components/AIAdvisorCTA';
import LeadForm from './components/LeadForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import AIChatModal from './components/AIChatModal';
import AdminDashboard from './components/admin/AdminDashboard';
import { Lead } from './types';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiInitialTopic, setAiInitialTopic] = useState<string | undefined>(undefined);
  const [prefilledCourse, setPrefilledCourse] = useState<string>('');
  const [isAdminView, setIsAdminView] = useState(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Trigger AI Chat modal with optional prompt
  const handleOpenAIChat = (initialTopic?: string) => {
    setAiInitialTopic(initialTopic);
    setIsAIChatOpen(true);
  };

  // Trigger consultation form scroll with prefilled course
  const handleOpenRegister = (courseName?: string) => {
    if (courseName) {
      setPrefilledCourse(courseName);
    }
    const formElement = document.querySelector('#contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Lead captured from form or chat
  const handleLeadCaptured = (lead: Lead) => {
    setToastNotification(`Đã lưu thông tin tư vấn của ${lead.name} (${lead.phone}) vào hệ thống VICI CRM!`);
    setTimeout(() => {
      setToastNotification(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#252822] font-sans antialiased selection:bg-[#D69A2D]/20 selection:text-[#8A6437]">
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed top-20 right-4 z-50 bg-[#252822] text-amber-50 px-4 py-3 rounded-2xl shadow-xl border border-amber-400/30 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 max-w-md text-xs sm:text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="flex-1 leading-snug">{toastNotification}</div>
          <button
            onClick={() => setToastNotification(null)}
            className="text-stone-400 hover:text-white text-xs px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header Navigation */}
      <Header
        onOpenAIChat={handleOpenAIChat}
        onOpenRegister={handleOpenRegister}
        isAdminView={isAdminView}
        onToggleAdminView={(val) => setIsAdminView(val !== undefined ? val : !isAdminView)}
      />

      {/* Main Page Content or Admin View */}
      {isAdminView ? (
        <AdminDashboard onClose={() => setIsAdminView(false)} />
      ) : (
        <main>
          {/* Hero Section */}
          <Hero
            onOpenAIChat={() => handleOpenAIChat()}
            onOpenRegister={() => handleOpenRegister()}
          />

          {/* Stats & Verified Credentials */}
          <Stats />

          {/* Brand Story & Philosophy */}
          <About />

          {/* 4-Step Standard Operating Procedure for Therapy */}
          <TherapySOP onOpenRegister={handleOpenRegister} />

          {/* Master Henry Phan & Trainers */}
          <Trainers onOpenRegister={handleOpenRegister} />

          {/* Courses & Training Ecosystem */}
          <Courses onOpenRegister={handleOpenRegister} />

          {/* Program Outcomes & Benefits */}
          <Outcomes />

          {/* Timetable & Schedule */}
          <Schedule onOpenRegister={handleOpenRegister} />

          {/* Spaces & Healing Activities */}
          <Activities />

          {/* Pre-FAQ AI Advisor CTA Banner */}
          <AIAdvisorCTA onOpenAIChat={handleOpenAIChat} />

          {/* Consultation Lead Form */}
          <LeadForm
            prefilledCourse={prefilledCourse}
            onLeadSubmitted={handleLeadCaptured}
          />

          {/* Frequently Asked Questions */}
          <FAQ onOpenAIChat={handleOpenAIChat} />

          {/* Floating Floating AI Advisor Bubble on Desktop */}
          <div className="hidden lg:block fixed bottom-6 right-6 z-40">
            <button
              id="desktop-floating-ai-btn"
              onClick={() => handleOpenAIChat()}
              className="group flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#8A6437] text-white font-semibold text-xs shadow-xl hover:bg-[#6F4E27] hover:shadow-2xl transition-all cursor-pointer border border-amber-300/30"
              aria-label="VICI AI Advisor"
            >
              <div className="relative">
                <Sparkles className="w-4 h-4 text-[#E5B25D] group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span>Hỏi MY VICI</span>
            </button>
          </div>
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenRegister={handleOpenRegister}
        onOpenAIChat={() => handleOpenAIChat()}
      />

      {/* Mobile Sticky Bottom CTA Bar */}
      {!isAdminView && (
        <MobileBottomBar
          onOpenAIChat={() => handleOpenAIChat()}
          onOpenRegister={() => handleOpenRegister()}
        />
      )}

      {/* AI Chatbot Modal */}
      <AIChatModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        initialTopic={aiInitialTopic}
        onLeadCaptured={handleLeadCaptured}
        onOpenRegisterForm={handleOpenRegister}
      />
    </div>
  );
}
