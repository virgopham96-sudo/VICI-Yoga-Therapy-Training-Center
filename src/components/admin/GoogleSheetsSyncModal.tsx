/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Google Sheets Integration & Synchronization Panel for VICI Admin CRM.
 */

import { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Check,
  Copy,
  ExternalLink,
  RefreshCw,
  Download,
  AlertCircle,
  X,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Lead } from '../../types';
import {
  getGoogleSheetWebhookUrl,
  setGoogleSheetWebhookUrl,
  syncLeadToGoogleSheet,
  batchSyncLeadsToGoogleSheet,
  exportLeadsToCSV,
  SAMPLE_APPS_SCRIPT_CODE,
  getSyncLogs,
  getLastSyncTime,
} from '../../services/googleSheetsService';

interface GoogleSheetsSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onLeadsUpdated?: () => void;
}

export default function GoogleSheetsSyncModal({
  isOpen,
  onClose,
  leads,
}: GoogleSheetsSyncModalProps) {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [logs, setLogs] = useState<Array<{ time: string; count: number; status: 'success' | 'error'; message: string }>>([]);

  useEffect(() => {
    if (isOpen) {
      const url = getGoogleSheetWebhookUrl();
      setWebhookUrl(url);
      setLastSync(getLastSyncTime());
      setLogs(getSyncLogs());
      setStatusMessage(null);
      setIsSaved(false);
    }
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSaveUrl = () => {
    setGoogleSheetWebhookUrl(webhookUrl);
    setIsSaved(true);
    setStatusMessage({
      type: 'success',
      text: webhookUrl.trim()
        ? 'Đã lưu cấu hình Google Sheets Webhook! Mọi đơn đăng ký mới sẽ tự động lưu lên Sheet.'
        : 'Đã xóa Webhook URL.',
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SAMPLE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleTestSync = async () => {
    if (!webhookUrl.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Vui lòng dán Webhook URL trước khi bấm thử nghiệm!',
      });
      return;
    }

    setIsTesting(true);
    setStatusMessage(null);

    const sampleLead: Lead = {
      id: `TEST-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toLocaleString('vi-VN'),
      name: 'Kiểm Tra Đồng Bộ Sheet',
      phone: '0900000000',
      email: 'test.sheet@vici.vn',
      interest: 'Kiểm tra đường truyền Google Sheet',
      category: 'GENERAL_INQUIRY',
      experience: 'Đang kết nối',
      goals: ['Kiểm tra Webhook Apps Script'],
      preferredTime: 'Hiện tại',
      preferredFormat: 'Trực tiếp tại Studio',
      recommendedCourse: 'Tự động kiểm tra',
      source: 'Website Form',
      leadScore: 'WARM',
      status: 'New',
      staffNotes: 'Dòng dữ liệu thử nghiệm từ VICI CRM Admin',
      nextAction: 'Xác nhận kết nối thành công',
    };

    const res = await syncLeadToGoogleSheet(sampleLead, webhookUrl);
    setIsTesting(false);

    if (res.success) {
      setStatusMessage({
        type: 'success',
        text: 'Gửi dữ liệu thử nghiệm thành công! Hãy mở Google Sheet của bạn để xem dòng mới xuất hiện.',
      });
      setLastSync(new Date().toLocaleString('vi-VN'));
      setLogs(getSyncLogs());
    } else {
      setStatusMessage({
        type: 'error',
        text: res.message,
      });
    }
  };

  const handleBatchSync = async () => {
    if (!webhookUrl.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Vui lòng nhập Webhook URL của Google Sheet trước khi đồng bộ!',
      });
      return;
    }

    if (leads.length === 0) {
      setStatusMessage({
        type: 'info',
        text: 'Chưa có lead nào trong hệ thống để đồng bộ.',
      });
      return;
    }

    setIsSyncing(true);
    setStatusMessage(null);

    const res = await batchSyncLeadsToGoogleSheet(leads, webhookUrl);
    setIsSyncing(false);

    if (res.success) {
      setStatusMessage({
        type: 'success',
        text: res.message,
      });
      setLastSync(new Date().toLocaleString('vi-VN'));
      setLogs(getSyncLogs());
    } else {
      setStatusMessage({
        type: 'error',
        text: res.message,
      });
    }
  };

  const handleExportCSV = () => {
    exportLeadsToCSV(leads);
    setStatusMessage({
      type: 'success',
      text: 'Đã xuất file CSV chuẩn tiếng Việt (UTF-8) thành công!',
    });
  };

  const isConnected = !!webhookUrl.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-[#FFFDF8] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E8DFC8] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-emerald-200 shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg font-serif-display">
                  Đồng Bộ Google Sheets
                </h3>
                {isConnected ? (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-950/40 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Tự động lưu
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-amber-950/40 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/30">
                    Chưa cấu hình
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-100/80">
                Tự động đẩy thông tin đăng ký nhận tư vấn từ học viên vào Google Sheet của bạn
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-emerald-200 transition-colors cursor-pointer"
            aria-label="Đóng (Phím Esc)"
            title="Đóng (Phím Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#252822]">
          {/* Status Message Notification */}
          {statusMessage && (
            <div
              className={`p-3.5 rounded-2xl border flex items-start gap-2.5 text-xs animate-in fade-in ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : statusMessage.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : 'bg-blue-50 border-blue-200 text-blue-900'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 leading-relaxed">{statusMessage.text}</div>
            </div>
          )}

          {/* Webhook Configuration Section */}
          <div className="bg-[#FAF7F0] p-4 sm:p-5 rounded-2xl border border-[#E2D8C3] space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#4A3B22] text-xs sm:text-sm flex items-center gap-2">
                <span>Google Apps Script Webhook URL</span>
              </label>
              <button
                type="button"
                onClick={() => setShowGuide(!showGuide)}
                className="text-xs text-[#8A6437] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showGuide ? 'Ẩn hướng dẫn cài đặt' : 'Xem cách lấy URL này (1 phút)'}</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C7AA] focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] outline-none text-xs font-mono"
              />
              <button
                type="button"
                onClick={handleSaveUrl}
                className="px-4 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSaved ? <Check className="w-4 h-4" /> : null}
                <span>{isSaved ? 'Đã Lưu!' : 'Lưu Cấu Hình'}</span>
              </button>
            </div>

            <p className="text-[11px] text-gray-500 leading-relaxed">
              💡 <strong>Cơ chế tự động:</strong> Khi người dùng gửi form tư vấn hoặc để lại SĐT cho AI, hệ thống sẽ gửi một lệnh ghi trực tiếp vào Google Sheet của bạn mà không cần phải truy cập thủ công.
            </p>
          </div>

          {/* Setup Guide (Collapsible) */}
          {showGuide && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-4 animate-in fade-in text-xs text-emerald-950">
              <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                <h4 className="font-bold flex items-center gap-2 text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>3 Bước Kết Nối Với Bất Kỳ Google Sheet Nào:</span>
                </h4>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-1 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Đã copy mã!' : 'Copy Mã Apps Script'}</span>
                </button>
              </div>

              <ol className="list-decimal list-inside space-y-2 leading-relaxed text-[12px]">
                <li>
                  Mở một Google Sheet mới trên Google Drive của bạn (ví dụ đặt tên <em>VICI Yoga Leads 2026</em>).
                </li>
                <li>
                  Trên menu trang tính, bấm vào <strong>Tiện ích mở rộng (Extensions)</strong> &rarr; chọn <strong>Apps Script</strong>.
                </li>
                <li>
                  Xóa toàn bộ mã mặc định có sẵn trong đó, bấm nút <strong>"Copy Mã Apps Script"</strong> ở góc trên và dán vào.
                </li>
                <li>
                  Bấm biểu tượng <strong>Lưu (Save)</strong>, sau đó nhấn nút <strong>Triển khai (Deploy)</strong> màu xanh &rarr; chọn <strong>Triển khai mới (New deployment)</strong>.
                </li>
                <li>
                  Tại bánh răng cấu hình, chọn loại <strong>Ứng dụng web (Web app)</strong>. Chú ý chọn mục <strong>"Ai có quyền truy cập" = "Bất kỳ ai (Anyone)"</strong> để website gửi đơn được!
                </li>
                <li>
                  Bấm <strong>Triển khai</strong> &rarr; cấp quyền &rarr; <strong>Copy đường dẫn URL</strong> (kết thúc bằng <code className="bg-emerald-200/60 px-1 rounded font-mono">/exec</code>) và dán vào ô Webhook ở trên rồi bấm <strong>Lưu Cấu Hình</strong>.
                </li>
              </ol>
            </div>
          )}

          {/* Action Operations Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Test connection */}
            <button
              type="button"
              onClick={handleTestSync}
              disabled={isTesting}
              className="p-3.5 rounded-2xl bg-white border border-[#E2D8C3] hover:border-[#2E7D32] hover:bg-emerald-50/40 text-[#252822] text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-4 h-4 text-[#2E7D32] ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Đang gửi test...' : 'Gửi Thử 1 Lead Kiểm Tra'}</span>
              <span className="text-[10px] text-gray-500 font-normal">Xác nhận Sheet nhận dữ liệu</span>
            </button>

            {/* Sync all existing leads */}
            <button
              type="button"
              onClick={handleBatchSync}
              disabled={isSyncing}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:from-[#256628] hover:to-[#144717] text-white text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <FileSpreadsheet className={`w-4 h-4 text-emerald-200 ${isSyncing ? 'animate-pulse' : ''}`} />
              <span>{isSyncing ? 'Đang đẩy dữ liệu...' : `Đồng Bộ Tất Cả (${leads.length}) Lead`}</span>
              <span className="text-[10px] text-emerald-200/80 font-normal">Đẩy danh sách hiện có sang Sheet</span>
            </button>

            {/* Direct CSV / Excel Export */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="p-3.5 rounded-2xl bg-white border border-[#E2D8C3] hover:border-[#8A6437] hover:bg-[#FAF5EB] text-[#252822] text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4 text-[#8A6437]" />
              <span>Tải File Excel / CSV</span>
              <span className="text-[10px] text-gray-500 font-normal">Mở ngay trên máy tính (UTF-8)</span>
            </button>
          </div>

          {/* Sync History / Status Overview */}
          <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#E2D8C3] space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#4A3B22] font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Nhật ký đồng bộ gần nhất</span>
              </span>
              <span className="text-[11px] text-gray-500 font-normal">
                {lastSync ? `Lần cuối: ${lastSync}` : 'Chưa có lượt đồng bộ'}
              </span>
            </div>

            {logs.length > 0 ? (
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {logs.slice(0, 5).map((log, idx) => (
                  <div
                    key={idx}
                    className="text-[11px] flex items-center justify-between p-2 rounded-xl bg-white border border-[#EBE3D3]"
                  >
                    <span className="truncate max-w-[70%] text-stone-700">{log.message}</span>
                    <span className="text-gray-400 font-mono text-[10px] shrink-0">{log.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-gray-500 italic">
                Khi học viên để lại thông tin trên trang web, nhật ký truyền tải sẽ tự động xuất hiện tại đây.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
