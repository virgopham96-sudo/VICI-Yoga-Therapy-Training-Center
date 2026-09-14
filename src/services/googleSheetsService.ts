/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Google Sheets Integration Service for VICI Yoga Therapy CRM.
 * Supports auto-syncing incoming leads via Google Apps Script Webhook
 * and 1-click CSV/Excel export with UTF-8 BOM encoding.
 */

import { Lead } from '../types';

const STORAGE_KEY_WEBHOOK = 'vici_google_sheet_webhook_url';
const STORAGE_KEY_LAST_SYNC = 'vici_google_sheet_last_sync';
const STORAGE_KEY_SYNC_LOG = 'vici_google_sheet_sync_log';

// Default / fallback sample webhook or user configured webhook
export function getGoogleSheetWebhookUrl(): string {
  if (typeof window === 'undefined') return '';
  const stored = localStorage.getItem(STORAGE_KEY_WEBHOOK);
  if (stored && stored.trim()) return stored.trim();

  // Check client-side environment variable if provided
  const envUrl = (import.meta as any).env?.VITE_GOOGLE_SHEET_WEBHOOK_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    return envUrl.trim();
  }

  return '';
}

export function setGoogleSheetWebhookUrl(url: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_WEBHOOK, url.trim());
}

export function getLastSyncTime(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY_LAST_SYNC);
}

export function getSyncLogs(): Array<{ time: string; count: number; status: 'success' | 'error'; message: string }> {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SYNC_LOG);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addSyncLog(status: 'success' | 'error', message: string, count: number = 1) {
  if (typeof window === 'undefined') return;
  try {
    const logs = getSyncLogs();
    const newLog = {
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }),
      count,
      status,
      message,
    };
    const updated = [newLog, ...logs].slice(0, 15);
    localStorage.setItem(STORAGE_KEY_SYNC_LOG, JSON.stringify(updated));
    if (status === 'success') {
      localStorage.setItem(STORAGE_KEY_LAST_SYNC, new Date().toLocaleString('vi-VN'));
    }
  } catch (e) {
    console.error('Failed to log sync', e);
  }
}

/**
 * Format a Lead record into Google Sheets payload structure
 */
export function formatLeadForSheet(lead: Lead) {
  return {
    id: lead.id,
    timestamp: lead.createdAt || new Date().toLocaleString('vi-VN'),
    name: lead.name,
    phone: lead.phone,
    email: lead.email || '',
    interest: lead.interest || '',
    category: lead.category || '',
    preferredTime: lead.preferredTime || '',
    preferredFormat: lead.preferredFormat || 'Trực tiếp tại Studio',
    experience: lead.experience || '',
    goals: Array.isArray(lead.goals) ? lead.goals.join(', ') : '',
    source: lead.source || 'Website Form',
    leadScore: lead.leadScore || 'WARM',
    status: lead.status || 'New',
    assignedTo: lead.assignedTo || 'Master Henry Phan',
    notes: lead.staffNotes || '',
    nextAction: lead.nextAction || '',
  };
}

/**
 * Synchronize a single lead directly to Google Sheet via Google Apps Script Webhook.
 * Uses mode: 'no-cors' to bypass Google's 302 redirect browser restrictions safely.
 */
export async function syncLeadToGoogleSheet(
  lead: Lead,
  customWebhookUrl?: string
): Promise<{ success: boolean; message: string }> {
  const webhookUrl = customWebhookUrl || getGoogleSheetWebhookUrl();
  const payload = formatLeadForSheet(lead);

  if (!webhookUrl) {
    // Record in local log that sheet webhook is awaiting configuration
    addSyncLog(
      'success',
      `Đã lưu tạm Lead [${lead.name} - ${lead.phone}]. Hãy dán Google Sheets Webhook URL trong Admin CRM để tự động ghi vào Sheet.`,
      1
    );
    return {
      success: true,
      message: 'Lead đã được ghi nhận. Webhook Google Sheet chưa được cấu hình, dữ liệu đã lưu trữ an toàn trong CRM.',
    };
  }

  try {
    // Google Apps Script requires text/plain or application/json.
    // We send payload string with no-cors to handle Google 302 redirects seamlessly.
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    addSyncLog('success', `Đã đồng bộ Lead [${lead.name} - ${lead.phone}] lên Google Sheet`, 1);
    return {
      success: true,
      message: 'Đã lưu và đồng bộ thành công lên Google Sheet!',
    };
  } catch (err: any) {
    console.warn('Google Sheet sync notice:', err);
    addSyncLog('error', `Lỗi kết nối khi gửi Lead [${lead.name}]: ${err.message || 'Network error'}`, 1);
    return {
      success: false,
      message: 'Không thể kết nối với Webhook Google Sheet. Dữ liệu vẫn được bảo vệ trong CRM.',
    };
  }
}

/**
 * Batch synchronize multiple leads to Google Sheet
 */
export async function batchSyncLeadsToGoogleSheet(
  leads: Lead[],
  customWebhookUrl?: string
): Promise<{ success: boolean; count: number; message: string }> {
  const webhookUrl = customWebhookUrl || getGoogleSheetWebhookUrl();

  if (!webhookUrl) {
    return {
      success: false,
      count: 0,
      message: 'Vui lòng nhập Google Sheets Webhook URL trước khi đồng bộ.',
    };
  }

  let successCount = 0;
  for (const lead of leads) {
    try {
      const payload = formatLeadForSheet(lead);
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
      successCount++;
      // Small pause between requests to prevent rate-limiting on Apps Script
      await new Promise((r) => setTimeout(r, 200));
    } catch (e) {
      console.warn('Sync failed for lead:', lead.id, e);
    }
  }

  addSyncLog('success', `Đồng bộ thủ công ${successCount}/${leads.length} leads lên Google Sheet`, successCount);

  return {
    success: successCount > 0,
    count: successCount,
    message: `Đã đồng bộ ${successCount}/${leads.length} thông tin học viên lên Google Sheet!`,
  };
}

/**
 * Export all Leads to a clean, UTF-8 encoded CSV file ready for Microsoft Excel & Google Sheets
 */
export function exportLeadsToCSV(leads: Lead[]): void {
  const headers = [
    'Mã Lead',
    'Thời Gian Tạo',
    'Họ và Tên',
    'Số Điện Thoại',
    'Email',
    'Khóa Học / Quan Tâm',
    'Phân Loại',
    'Kinh Nghiệm',
    'Mục Tiêu',
    'Thời Gian Tập Mong Muốn',
    'Hình Thức',
    'Nguồn Đăng Ký',
    'Điểm Tiềm Năng',
    'Trạng Thái',
    'Phụ Trách',
    'Ghi Chú Nhân Viên',
    'Hành Động Tiếp Theo',
  ];

  const escapeCSV = (field: any) => {
    if (field === null || field === undefined) return '""';
    const str = String(field).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = leads.map((l) => [
    escapeCSV(l.id),
    escapeCSV(l.createdAt),
    escapeCSV(l.name),
    escapeCSV(l.phone),
    escapeCSV(l.email || ''),
    escapeCSV(l.interest),
    escapeCSV(l.category),
    escapeCSV(l.experience),
    escapeCSV(Array.isArray(l.goals) ? l.goals.join('; ') : ''),
    escapeCSV(l.preferredTime),
    escapeCSV(l.preferredFormat || 'Tại Studio'),
    escapeCSV(l.source),
    escapeCSV(l.leadScore),
    escapeCSV(l.status),
    escapeCSV(l.assignedTo || 'Chưa gán'),
    escapeCSV(l.staffNotes || ''),
    escapeCSV(l.nextAction || ''),
  ]);

  // \uFEFF is UTF-8 Byte Order Mark, critical for Excel to display Vietnamese characters properly
  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `VICI_Yoga_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Standard Google Apps Script template for the user to copy & paste into their Sheet
 */
export const SAMPLE_APPS_SCRIPT_CODE = `/**
 * VICI YOGA THERAPY - GOOGLE APPS SCRIPT WEBHOOK
 * 
 * HƯỚNG DẪN CÀI ĐẶT 1 PHÚT:
 * 1. Mở Google Sheet mới hoặc hiện có của bạn.
 * 2. Đặt tên các cột ở Hàng 1 (Dòng tiêu đề):
 *    A: Thời gian | B: Mã Lead | C: Họ và Tên | D: Số điện thoại | E: Email | F: Khóa quan tâm | G: Phân loại | H: Thời gian tập | I: Mục tiêu | J: Nguồn | K: Đánh giá | L: Trạng thái | M: Ghi chú
 * 3. Trên thanh công cụ, vào: Tiện ích mở rộng (Extensions) -> Apps Script.
 * 4. Xóa hết mã cũ và dán toàn bộ đoạn mã bên dưới vào.
 * 5. Bấm icon Lưu (Save), sau đó bấm "Triển khai" (Deploy) -> "Triển khai mới" (New deployment).
 * 6. Chọn loại: "Ứng dụng web" (Web app).
 *    - Mô tả: VICI Lead Webhook
 *    - Người thực thi: "Tôi" (Me)
 *    - Ai có quyền truy cập: "Bất kỳ ai" (Anyone) -> Rất quan trọng!
 * 7. Bấm "Triển khai", cấp quyền và Copy đường link "URL của ứng dụng web".
 * 8. Dán URL vừa copy vào ô "Google Sheets Webhook URL" trong VICI Admin CRM!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Nếu trang tính trống, tự động tạo hàng tiêu đề
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời Gian Đăng Ký",
        "Mã Lead",
        "Họ và Tên",
        "Số Điện Thoại",
        "Email",
        "Khóa Học / Nhu Cầu",
        "Phân Loại",
        "Thời Gian Mong Muốn",
        "Mục Tiêu Trị Liệu",
        "Nguồn Đăng Ký",
        "Đánh Giá Lead",
        "Trạng Thái",
        "Ghi Chú Tư Vấn",
        "Hành Động Tiếp Theo"
      ]);
      sheet.getRange(1, 1, 1, 14).setBackground("#8A6437").setFontColor("#FFFFFF").setFontWeight("bold");
    }

    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("vi-VN"),
      data.id || "VICI-" + Math.floor(Math.random() * 9000 + 1000),
      data.name || "",
      data.phone ? "'" + data.phone : "", // Dấu nháy đơn để giữ số 0 ở đầu
      data.email || "",
      data.interest || "",
      data.category || "",
      data.preferredTime || "",
      data.goals || "",
      data.source || "Website Form",
      data.leadScore || "HOT",
      data.status || "New",
      data.notes || "",
      data.nextAction || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Đã ghi nhận Lead thành công" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("VICI Yoga Therapy Google Sheet Webhook is ACTIVE!");
}
`;
