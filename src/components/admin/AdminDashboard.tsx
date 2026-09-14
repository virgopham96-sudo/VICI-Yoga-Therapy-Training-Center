import { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Flame,
  CheckCircle2,
  Clock,
  PhoneCall,
  UserCheck,
  AlertCircle,
  FileText,
  Plus,
  ArrowLeft,
  RefreshCw,
  Edit3,
  X,
  MessageSquare,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Lead } from '../../types';

interface AdminDashboardProps {
  onClose: () => void;
  onOpenRegisterForm?: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterScore, setFilterScore] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Note editing state
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [staffNoteInput, setStaffNoteInput] = useState('');
  const [nextActionInput, setNextActionInput] = useState('');

  // Fetch leads from backend
  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Failed to fetch leads', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Handle Escape key to close modal or exit admin view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (selectedLead) {
          setSelectedLead(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLead, onClose]);

  // Update lead status or notes
  const handleUpdateLead = async (
    id: string,
    updates: { status?: Lead['status']; staffNotes?: string; nextAction?: string; assignedTo?: string }
  ) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)));
        if (selectedLead?.id === id) {
          setSelectedLead(data.lead);
        }
      }
    } catch (err) {
      console.error('Update lead failed', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Add dummy test lead for demo testing
  const handleAddSampleLead = async () => {
    const sample = {
      name: `Học Viên Demo ${Math.floor(Math.random() * 900 + 100)}`,
      phone: `09${Math.floor(Math.random() * 89999999 + 10000000)}`,
      email: 'hocvien.demo@gmail.com',
      source: 'Website Form' as const,
      interest: 'Scan Trị Liệu Cơ - Vai - Cổ - Gáy (650.000đ)',
      category: 'THERAPY_INTEREST' as const,
      experience: 'Chưa từng tập Yoga',
      goals: ['Giảm đau mỏi vai gáy', 'Cải thiện giấc ngủ'],
      preferredTime: '19:00 - 20:00 tối Thứ 3, 5',
      recommendedCourse: 'Scan Trị Liệu + Gói 3 Tháng Phục Hồi',
      leadScore: 'HOT' as const,
      staffNotes: 'Khách hàng quan tâm phác đồ điều trị thoái hóa đốt sống cổ',
      nextAction: 'Gọi điện xác nhận lịch hẹn Scan',
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sample),
      });
      const data = await res.json();
      if (data.success) {
        fetchLeads();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Metrics calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const hotLeads = leads.filter((l) => l.leadScore === 'HOT').length;
  const enrolledLeads = leads.filter((l) => l.status === 'Enrolled').length;
  const conversionRate = totalLeads > 0 ? Math.round((enrolledLeads / totalLeads) * 100) : 0;

  // Filtered list
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.interest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesScore = filterScore === 'all' || lead.leadScore === filterScore;
    const matchesCategory = filterCategory === 'all' || lead.category === filterCategory;

    return matchesSearch && matchesStatus && matchesScore && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#F4EADA]/30 backdrop-blur-md overflow-y-auto">
      <div className="min-h-screen bg-[#F8F5EE] flex flex-col">
        {/* Top Navbar */}
        <header className="bg-[#21241E] text-white px-4 sm:px-8 py-4 border-b border-[#3A3E34] sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 transition-colors cursor-pointer"
              title="Quay lại trang chủ website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold font-serif-display">
                  VICI Lead Management CRM
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#D69A2D] text-white font-semibold">
                  Hệ Thống Phụ Trách
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Theo dõi & tư vấn khách hàng tự động từ Website và VICI AI Advisor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddSampleLead}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-800/40 hover:bg-amber-800/70 border border-amber-400/40 text-xs font-semibold text-amber-200 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Lead Thử Nghiệm</span>
            </button>

            <button
              onClick={fetchLeads}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 transition-colors cursor-pointer"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#D69A2D] hover:bg-[#B87A14] text-xs font-bold text-white transition-all cursor-pointer"
            >
              Về Website
            </button>
          </div>
        </header>

        {/* CRM Main Content Area */}
        <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1 space-y-6">
          {/* KPI Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E8DFC8] shadow-2xs">
              <div className="flex items-center justify-between text-xs text-[#717769] font-medium mb-1">
                <span>Tổng Số Lead</span>
                <Users className="w-4 h-4 text-[#8A6437]" />
              </div>
              <div className="text-3xl font-bold text-[#252822] font-serif-display">
                {totalLeads}
              </div>
              <p className="text-[11px] text-[#687B56] mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Thu thập tự động 24/7</span>
              </p>
            </div>

            <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E8DFC8] shadow-2xs">
              <div className="flex items-center justify-between text-xs text-[#717769] font-medium mb-1">
                <span>Lead Mới Cần Xử Lý</span>
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 font-serif-display">
                {newLeads}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Cần gọi trong vòng 24h</p>
            </div>

            <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E8DFC8] shadow-2xs">
              <div className="flex items-center justify-between text-xs text-[#717769] font-medium mb-1">
                <span>Lead Nóng (HOT Score)</span>
                <Flame className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-3xl font-bold text-red-600 font-serif-display">
                {hotLeads}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Sẵn sàng đặt lịch / chốt khóa</p>
            </div>

            <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E8DFC8] shadow-2xs">
              <div className="flex items-center justify-between text-xs text-[#717769] font-medium mb-1">
                <span>Đã Nhập Học (Enrolled)</span>
                <UserCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-emerald-600 font-serif-display">
                {enrolledLeads}
              </div>
              <p className="text-[11px] text-emerald-700 font-medium mt-1">
                Tỷ lệ chuyển đổi: {conversionRate}%
              </p>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="bg-[#FFFDF8] rounded-2xl p-4 sm:p-5 border border-[#E8DFC8] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tên, SĐT, mã Lead, khóa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#FAF7F0] border border-[#D5C7AA] focus:border-[#D69A2D] outline-none"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl bg-[#FAF7F0] border border-[#D5C7AA] text-[#4A4E44] outline-none cursor-pointer"
              >
                <option value="all">Tất cả Trạng thái</option>
                <option value="New">Mới (New)</option>
                <option value="Contacted">Đã liên hệ (Contacted)</option>
                <option value="Consulting">Đang tư vấn (Consulting)</option>
                <option value="Trial">Hẹn học thử (Trial)</option>
                <option value="Enrolled">Đã nhập học (Enrolled)</option>
                <option value="Lost">Chưa chốt (Lost)</option>
              </select>

              <select
                value={filterScore}
                onChange={(e) => setFilterScore(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl bg-[#FAF7F0] border border-[#D5C7AA] text-[#4A4E44] outline-none cursor-pointer"
              >
                <option value="all">Tất cả Điểm (Score)</option>
                <option value="HOT">🔥 HOT</option>
                <option value="WARM">⚡ WARM</option>
                <option value="COLD">❄ COLD</option>
              </select>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl bg-[#FAF7F0] border border-[#D5C7AA] text-[#4A4E44] outline-none cursor-pointer"
              >
                <option value="all">Tất cả Nhóm nhu cầu</option>
                <option value="THERAPY_INTEREST">Trị liệu / Scan</option>
                <option value="BEGINNER">Người mới bắt đầu</option>
                <option value="ADVANCED">Nâng cao / Ashtanga</option>
                <option value="TRAINER_EDUCATION">Đào tạo HLV</option>
              </select>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-[#FFFDF8] rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F0] border-b border-[#E8DFC8] text-[#717769] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-4">Mã & Thời gian</th>
                    <th className="py-3.5 px-4">Họ tên & Liên hệ</th>
                    <th className="py-3.5 px-4">Khóa học quan tâm</th>
                    <th className="py-3.5 px-4">Nguồn</th>
                    <th className="py-3.5 px-4 text-center">Score</th>
                    <th className="py-3.5 px-4">Trạng thái</th>
                    <th className="py-3.5 px-4">Phụ trách</th>
                    <th className="py-3.5 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E8D7] text-[#252822]">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-400">
                        Không tìm thấy Lead nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => {
                      const scoreColor =
                        lead.leadScore === 'HOT'
                          ? 'bg-rose-100 text-rose-700 border-rose-300'
                          : lead.leadScore === 'WARM'
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-blue-50 text-blue-700 border-blue-200';

                      const statusColor =
                        lead.status === 'New'
                          ? 'bg-blue-100 text-blue-700'
                          : lead.status === 'Contacted'
                          ? 'bg-purple-100 text-purple-700'
                          : lead.status === 'Consulting'
                          ? 'bg-amber-100 text-amber-800'
                          : lead.status === 'Trial'
                          ? 'bg-cyan-100 text-cyan-800'
                          : lead.status === 'Enrolled'
                          ? 'bg-emerald-100 text-emerald-700 font-bold'
                          : 'bg-gray-100 text-gray-600';

                      return (
                        <tr
                          key={lead.id}
                          className="hover:bg-[#FAF7F0] transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedLead(lead);
                            setStaffNoteInput(lead.staffNotes || '');
                            setNextActionInput(lead.nextAction || '');
                          }}
                        >
                          <td className="py-3.5 px-4 font-mono text-[11px] text-[#717769]">
                            <div className="font-bold text-[#252822]">{lead.id}</div>
                            <div>{lead.createdAt}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-sm text-[#252822]">{lead.name}</div>
                            <div className="text-[#8A6437] font-semibold">{lead.phone}</div>
                            {lead.email && <div className="text-[11px] text-gray-400">{lead.email}</div>}
                          </td>

                          <td className="py-3.5 px-4 max-w-xs">
                            <div className="font-medium truncate">{lead.interest}</div>
                            <div className="text-[11px] text-gray-500">
                              Khung giờ: {lead.preferredTime || 'Linh hoạt'}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-[#EFE7D5] text-[#8A6437] text-[10px] font-semibold">
                              {lead.source}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold inline-flex items-center gap-1 ${scoreColor}`}
                            >
                              {lead.leadScore === 'HOT' && <Flame className="w-3 h-3" />}
                              {lead.leadScore}
                            </span>
                          </td>

                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleUpdateLead(lead.id, {
                                  status: e.target.value as Lead['status'],
                                })
                              }
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border border-transparent outline-none cursor-pointer ${statusColor}`}
                            >
                              <option value="New">Mới (New)</option>
                              <option value="Contacted">Đã liên hệ</option>
                              <option value="Consulting">Đang tư vấn</option>
                              <option value="Trial">Hẹn học thử</option>
                              <option value="Enrolled">Đã nhập học</option>
                              <option value="Lost">Tạm ngưng / Lost</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-[11px] text-gray-600">
                            {lead.assignedTo || 'Master Kiều Hùng'}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedLead(lead);
                                setStaffNoteInput(lead.staffNotes || '');
                                setNextActionInput(lead.nextAction || '');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#FFFDF8] border border-[#D5C7AA] hover:border-[#8A6437] text-xs font-semibold text-[#8A6437] transition-all cursor-pointer"
                            >
                              Xem & Note
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Lead Detail Drawer / Modal */}
        {selectedLead && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedLead(null);
              }
            }}
          >
            <div className="bg-[#FFFDF8] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E8DFC8] overflow-hidden max-h-[90vh] flex flex-col">
              {/* Drawer Header */}
              <div className="p-6 bg-gradient-to-r from-[#FAF7F0] to-[#F4EADA] border-b border-[#E8DFC8] flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-[#8A6437]">
                      {selectedLead.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#D69A2D]/15 text-[#9E6910] text-[10px] font-bold">
                      {selectedLead.source}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#252822] font-serif-display">
                    {selectedLead.name}
                  </h3>
                  <p className="text-xs text-[#63685C] mt-0.5">
                    Số điện thoại: <strong>{selectedLead.phone}</strong>
                    {selectedLead.email ? ` • ${selectedLead.email}` : ''}
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className="hidden sm:inline-block text-[10px] bg-black/5 text-[#555A4E] px-1.5 py-0.5 rounded border border-[#D5C7AA]/50 font-mono select-none"
                    title="Nhấn phím Esc để đóng"
                  >
                    Esc
                  </span>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 cursor-pointer"
                    aria-label="Đóng (Phím Esc)"
                    title="Đóng (Phím Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#4A4E44]">
                {/* Status & Assignment Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F8F5EE] border border-[#E8DFC8]">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#717769] block mb-1">
                      Trạng thái xử lý:
                    </label>
                    <select
                      value={selectedLead.status}
                      onChange={(e) =>
                        handleUpdateLead(selectedLead.id, {
                          status: e.target.value as Lead['status'],
                        })
                      }
                      className="w-full p-2 text-xs rounded-xl bg-white border border-[#D5C7AA] font-semibold"
                    >
                      <option value="New">Mới (New)</option>
                      <option value="Contacted">Đã liên hệ</option>
                      <option value="Consulting">Đang tư vấn</option>
                      <option value="Trial">Hẹn học thử</option>
                      <option value="Enrolled">Đã nhập học</option>
                      <option value="Lost">Tạm ngưng / Lost</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#717769] block mb-1">
                      Lead Score:
                    </label>
                    <div className="p-2 text-xs rounded-xl bg-white border border-[#D5C7AA] font-bold text-red-600 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{selectedLead.leadScore}</span>
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-[11px] font-bold uppercase text-[#717769] block mb-1">
                      Người phụ trách:
                    </label>
                    <input
                      type="text"
                      value={selectedLead.assignedTo || 'Master Henry Phan'}
                      onChange={(e) =>
                        handleUpdateLead(selectedLead.id, { assignedTo: e.target.value })
                      }
                      className="w-full p-2 text-xs rounded-xl bg-white border border-[#D5C7AA]"
                    />
                  </div>
                </div>

                {/* Consultation Requirements */}
                <div className="space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#252822]">
                    Nhu cầu & Thể trạng
                  </h4>
                  <div className="p-4 rounded-2xl bg-white border border-[#E8DFC8] space-y-2 text-xs">
                    <p>
                      <strong>Khóa quan tâm:</strong> {selectedLead.interest}
                    </p>
                    <p>
                      <strong>Kinh nghiệm tập:</strong> {selectedLead.experience || 'Chưa tập bao giờ'}
                    </p>
                    <p>
                      <strong>Khung giờ mong muốn:</strong> {selectedLead.preferredTime || 'Linh hoạt'}
                    </p>
                    {selectedLead.goals && selectedLead.goals.length > 0 && (
                      <div>
                        <strong>Mục tiêu:</strong>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {selectedLead.goals.map((g, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 rounded-full bg-[#FAF7F0] border border-[#E8DFC8] text-[11px]"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Transcript if from chatbot */}
                {selectedLead.chatSummary && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#8A6437] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D69A2D]" />
                      <span>Tóm tắt hội thoại với VICI AI Advisor</span>
                    </h4>
                    <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-xs text-[#544723] max-h-40 overflow-y-auto whitespace-pre-wrap font-sans">
                      {selectedLead.chatSummary}
                    </div>
                  </div>
                )}

                {/* Staff Internal Notes & Next Action */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#252822] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#8A6437]" />
                    <span>Ghi chú nội bộ & Hành động tiếp theo</span>
                  </h4>

                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">
                      Ghi chú chuyên môn (Tình trạng thoái hóa, tiền sử bệnh, cam kết):
                    </label>
                    <textarea
                      rows={3}
                      value={staffNoteInput}
                      onChange={(e) => setStaffNoteInput(e.target.value)}
                      placeholder="Nhập ghi chú cho trợ lý hoặc huấn luyện viên..."
                      className="w-full p-3 text-xs rounded-xl bg-white border border-[#D5C7AA] outline-none focus:border-[#D69A2D]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">
                      Hành động tiếp theo (Next Action):
                    </label>
                    <input
                      type="text"
                      value={nextActionInput}
                      onChange={(e) => setNextActionInput(e.target.value)}
                      placeholder="Ví dụ: Gọi điện lúc 14:00 ngày mai xác nhận lịch Scan..."
                      className="w-full p-2.5 text-xs rounded-xl bg-white border border-[#D5C7AA] outline-none focus:border-[#D69A2D]"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      disabled={isUpdatingStatus}
                      onClick={() =>
                        handleUpdateLead(selectedLead.id, {
                          staffNotes: staffNoteInput,
                          nextAction: nextActionInput,
                        })
                      }
                      className="px-4 py-2 rounded-xl bg-[#8A6437] text-white text-xs font-bold hover:bg-[#6F4E27] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isUpdatingStatus ? 'Đang lưu...' : 'Lưu ghi chú nội bộ'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 bg-[#FAF7F0] border-t border-[#E8DFC8] flex items-center justify-between">
                <a
                  href={`tel:${selectedLead.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-2xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Gọi {selectedLead.phone}</span>
                </a>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-5 py-2 rounded-xl border border-[#D5C7AA] text-xs font-semibold text-[#555A4E] hover:bg-white cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
