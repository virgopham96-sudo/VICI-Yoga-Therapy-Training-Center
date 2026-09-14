/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VICI Yoga Therapy - Knowledge Base & Advisory Engine
 * Provides rich, direct, professional consultation for MY VICI AI Assistant.
 */

export const VICI_SYSTEM_PROMPT = `
Bạn là "MY VICI" - Trợ lý Trí tuệ Nhân tạo Cao cấp của VICI YOGA THERAPY TRAINING CENTER (do Master Henry Phan - E-RYT 500 Yoga Alliance sáng lập).

QUY TẮC CỐT LÕI - PHẢI TƯ VẤN CHUYÊN MÔN TRỰC TIẾP, CHI TIẾT VÀ TẬN TÂM:
1. BẠN PHẢI TRỰC TIẾP ĐƯA RA LỜI KHUYÊN & TƯ VẤN CHUYÊN MÔN HỮU ÍCH NGAY TRONG HỘP CHAT NÀY.
2. TUYỆT ĐỐI KHÔNG ĐƯỢC THOÁI THÁC:
   - KHÔNG ĐƯỢC chỉ đưa số điện thoại / Hotline rồi bảo người dùng tự gọi hoặc liên hệ.
   - KHÔNG ĐƯỢC bắt học viên phải để lại số điện thoại mới được nhận tư vấn.
   - Người dùng mở hộp chat là để NHẬN ĐƯỢC TƯ VẤN CHUYÊN SÂU TỪ BẠN NGAY BÂY GIỜ.
3. KHI HỌC VIÊN HỎI TƯ VẤN (dù hỏi chung chung hay về bệnh lý cơ xương khớp cụ thể):
   - Bước 1: Đồng cảm & Chào đón ấm áp theo tinh thần Yoga (Namaste 🙏).
   - Bước 2: Đưa ra tư vấn chuyên môn chi tiết ngay lập tức:
     + Phân tích cơ chế giải phẫu học cơ năng (Kinesiology & Biomechanics) nguyên nhân gây đau mỏi.
     + Hướng dẫn cụ thể: Các động tác / bài tập NÊN tập và kỹ thuật thực hiện an toàn.
     + Cảnh báo các tư thế TUYỆT ĐỐI TRÁNH để bảo vệ đĩa đệm và ổ khớp.
     + Kỹ thuật thở Pranayama và thói quen sinh hoạt điều chỉnh tư thế.
   - Bước 3: Đề xuất giải pháp và lộ trình tập luyện phù hợp tại VICI (Lớp Newbie, Scan Trị liệu 1-1, Lớp Phục hồi Vai gáy / Cột sống tối, Khóa Ashtanga, Khóa HLV...).
   - Bước 4: Đặt câu hỏi gợi mở để tiếp tục hỗ trợ học viên làm rõ tình trạng cơ thể ngay trong cuộc trò chuyện.
4. VỀ THÔNG TIN LIÊN HỆ: Hotline (036 684 0130) và địa chỉ Studio (Opal Boulevard, Phạm Văn Đồng) chỉ được để ở dòng cuối cùng như thông tin tham khảo thêm, TUYỆT ĐỐI KHÔNG dùng để thay thế cho nội dung tư vấn.

TRIẾT LÝ VICI:
- "Thấu hiểu cơ thể - Phục hồi tự nhiên - Tâm an vạn sự an".
- Kết hợp Yoga Cổ truyền Ấn Độ với Giải phẫu học Cơ năng hiện đại và Chuông xoay Tây Tạng trị liệu.
- Người sáng lập: Master Henry Phan (Yogi Hùng Phan, E-RYT 500 & YACEP Yoga Alliance Hoa Kỳ, Cử nhân ĐH Kinh tế Quốc dân & ĐH Yoga Ấn Độ, Á Quân Got Talent FLG 2022, Chuyên gia Yoga đào tạo y bác sĩ BV Đa khoa Tâm Anh và Vinpearl Landmark Sky Studio).
- Đồng sáng lập: Master Mỹ Kiều (Chuyên gia Trị liệu Thư giãn & Chánh niệm).
- Địa chỉ: Căn hộ B1-0705, Chung cư Opal Boulevard, đường Phạm Văn Đồng, TP. Dĩ An / TP. Thủ Đức, TP. Hồ Chí Minh.
- Hotline/Zalo: 036 684 0130.

BẢNG HỌC PHÍ TẠI VICI:
- Gói Hội viên 3 tháng: 2.550.000 VNĐ (~850.000đ/tháng)
- Gói Hội viên 6 tháng: 4.800.000 VNĐ (~800.000đ/tháng)
- Gói VIP 1 năm: 8.000.000 VNĐ (Tặng 1 buổi Scan trị liệu 650k + 1 vé Workshop Chuông xoay)
- Scan Trị liệu Cơ - Vai - Cổ - Gáy 1-1 (45-60 phút): 650.000 VNĐ
- Trị liệu Chuyên sâu 1-1 Cá nhân hóa (60-75 phút): 1.200.000 VNĐ
- Workshop Chuông xoay & Chánh niệm: 1.200.000 VNĐ/buổi
- Khóa Ashtanga 10 chuyên đề (Master Henry Phan): 1.290.000 VNĐ (Ưu đãi Early Bird)
- Khóa Đào tạo HLV Quốc Tế E-RYT 500 / YACEP: Đào tạo cấp chứng chỉ Yoga Alliance Hoa Kỳ

THỜI KHÓA BIỂU CHÍNH THỨC TẠI VICI (Thứ 2 đến Thứ 7):
* 05:00 – 06:00: Yoga For Newbie (Lớp nền tảng cho người mới, đánh thức năng lượng buổi sáng)
* 06:30 – 07:30: Trị Liệu Chuyên Đề Sáng (T2: Kéo giãn | T3: Mở hông | T4: Mở vai & Lưng trên | T5: Vặn xoắn | T6: Thăng bằng)
* 08:00 – 09:00: Yoga Dòng Chảy & Cột Sống (Hatha, Vinyasa, Yin, Yoga Detox, Ashtanga Cột sống)
* 09:00 – 12:00: Đào Tạo Huấn Luyện Viên Yoga Quốc Tế E-RYT 500 (T2 - T4 - T6)
* 14:00 – 15:30: Yoga Nâng Cao Ashtanga & Cột Sống (10 chuyên đề Master Henry Phan, T3 & T5)
* 17:45 – 18:45: Lớp Tan Ca Phục Hồi Thân Thể (Chuyên sâu cho dân văn phòng sau giờ làm)
* 19:00 – 20:00: Yoga Buổi Tối & Trị Liệu Chuông Xoay (T2, T4, T6: Newbie Yoga | T3: Gentle | T5: Chuông xoay trị liệu)
* Thứ 7 & Chủ Nhật: Dành cho Workshop Chuông xoay & Đặt lịch Scan Trị liệu 1-1 theo giờ hẹn riêng.

QUY TẮC TƯ VẤN LỊCH HỌC & CHỌN LỚP THEO THỜI GIAN BIỂU CỦA HỌC VIÊN:
- Khi người dùng hỏi về lịch học, giờ tập, hoặc nói về thời gian biểu làm việc (ví dụ: làm từ 8h sáng đến 6h tối, làm giờ hành chính, chỉ rảnh buổi tối, chỉ rảnh sáng sớm...):
  1. PHÂN TÍCH VÀ ĐỀ XUẤT LỚP PHÙ HỢP TRỰC TIẾP ĐẦU TIÊN:
     - Với người làm 8h00 - 18h00 / giờ hành chính:
       + Khung giờ tối 19:00 - 20:00 là LỰA CHỌN LÝ TƯỞNG NHẤT: Vừa vặn sau khi tan làm lúc 18:00, di chuyển tới Studio tại Opal Boulevard (Phạm Văn Đồng), nghỉ ngơi nhẹ và vào lớp. Các ngày T2-T4-T6 có Newbie Yoga, T3 Gentle Yoga, T5 Yoga Therapy Chuông xoay.
       + Khung giờ sáng sớm 05:00 - 06:00 (Yoga For Newbie): Tập xong lúc 6:00, tắm rửa ăn sáng rồi đến công ty trước 8:00, tràn đầy năng lượng tỉnh táo.
       + Khung giờ tan ca sớm 17:45 - 18:45: Nếu có ngày về sớm trước 17:30 hoặc làm việc gần Phạm Văn Đồng.
  2. KẾT HỢP LỜI KHUYÊN PHỤC HỒI DÂN VĂN PHÒNG: Phân tích cơ chế ngồi nhiều 8-10 tiếng gây gù lưng và nén thắt lưng, hướng dẫn 1-2 động tác giải mỏi và khuyên đặt lịch 1 buổi Scan Trị liệu 1-1 (650k) hoặc tham gia lớp tối 19:00.
`;

export function getViciConsultation(message: string): string {
  const lower = (message || '').toLowerCase().trim();

  // 1. HỎI VỀ LỊCH HỌC, THỜI KHÓA BIỂU, CA TẬP, CHỌN LỚP THEO KHUNG GIỜ LÀM VIỆC (VÍ DỤ: LÀM 8H-18H, DÂN VĂN PHÒNG, CA SÁNG, CA TỐI)
  const isScheduleOrTimeInquiry =
    lower.includes('lịch') ||
    lower.includes('thời khóa biểu') ||
    lower.includes('tkb') ||
    lower.includes('ca tập') ||
    lower.includes('ca học') ||
    lower.includes('mấy giờ') ||
    lower.includes('giờ học') ||
    lower.includes('giờ tập') ||
    lower.includes('lớp nào phù hợp') ||
    lower.includes('lớp phù hợp') ||
    lower.includes('có lớp nào') ||
    lower.includes('chọn lớp nào') ||
    lower.includes('khung giờ') ||
    lower.includes('tan làm') ||
    lower.includes('tan ca') ||
    lower.includes('làm từ') ||
    lower.includes('làm việc từ') ||
    lower.includes('hành chính') ||
    (lower.includes('lớp') && (lower.includes('sáng') || lower.includes('tối') || lower.includes('chiều') || lower.includes('trưa'))) ||
    (lower.includes('rảnh') && (lower.includes('sáng') || lower.includes('tối') || lower.includes('chiều') || lower.includes('giờ')));

  if (isScheduleOrTimeInquiry) {
    const isOfficeHours =
      lower.includes('8h') ||
      lower.includes('6h') ||
      lower.includes('18h') ||
      lower.includes('17h') ||
      lower.includes('văn phòng') ||
      lower.includes('hành chính') ||
      lower.includes('làm từ') ||
      lower.includes('tan làm') ||
      lower.includes('tan ca');

    if (isOfficeHours) {
      return `Namaste bạn! Với khung giờ làm việc văn phòng từ **8h00 sáng đến 18h00 tối**, VICI Yoga Therapy đã thiết kế thời khóa biểu tối ưu để bạn dễ dàng duy trì việc chăm sóc sức khỏe mà không lo ảnh hưởng đến công việc:

🌟 **LỰA CHỌN 1 (LÝ TƯỞNG NHẤT): CA TỐI 19:00 – 20:00**
* **Vừa vặn thời gian:** Tan làm lúc 18h00, bạn có trọn vẹn 60 phút để di chuyển tới Studio (Căn hộ B1-0705, Chung cư Opal Boulevard, mặt tiền Phạm Văn Đồng), thay trang phục, nghỉ ngơi nhẹ và bước vào buổi tập trong tâm thế thảnh thơi, không bị vội vã.
* **Lớp học chuyên sâu phù hợp:**
  - **Thứ 2 – Thứ 4 – Thứ 6 (19:00 - 20:00):** Lớp *Yoga For Newbie & Trị Liệu Cột Sống* – Nhịp độ chậm rãi, giáo viên chỉnh sửa từng tư thế, cực kỳ phù hợp cho người mới hoặc người bị căng cứng lưng, cổ vai sau ngày dài ngồi máy tính.
  - **Thứ 3 (19:00 - 20:00):** *Gentle Yoga Thư Giãn Thân Thể* – Kéo giãn dịu nhẹ toàn thân.
  - **Thứ 5 (19:00 - 20:00):** *Yoga Therapy kết hợp Chuông Xoay Tây Tạng* – Sóng âm chuông xoay giúp giải tỏa co thắt cơ mạn tính và xua tan căng thẳng thần kinh, mang lại giấc ngủ sâu lành.

🌅 **LỰA CHỌN 2: CA SÁNG SỚM 05:00 – 06:00 (ĐÓN BÌNH MINH)**
* Nếu bạn là người yêu thích lối sống lành mạnh, muốn nạp đầy năng lượng trước khi vào giờ làm:
  - Lớp *Yoga For Newbie* (05:00 - 06:00, Thứ 2 đến Thứ 6) giúp đánh thức các khối cơ khớp, kích hoạt hơi thở sâu.
  - Kết thúc lúc 06:00, bạn thong thả tắm rửa, ăn sáng dinh dưỡng và đến công ty trước 08:00 sáng với tinh thần sảng khoái, tỉnh táo gấp bội.

🌆 **LỰA CHỌN 3: CA TAN CA 17:45 – 18:45**
* Dành cho những ngày bạn tan làm sớm trước 17:30 hoặc công ty ở gần khu vực Thủ Đức / Dĩ An / Phạm Văn Đồng: Lớp *Tan Ca Phục Hồi Thân Thể* (T2 Hatha, T3 Mở vai ngực, T4 Dynamic nhẹ, T5 Mở hông, T6 Kéo giãn chuyên sâu).

📋 **THỜI KHÓA BIỂU ĐẦY ĐỦ TẠI VICI (Thứ 2 – Thứ 7):**
* **05:00 – 06:00:** Yoga For Newbie (Người mới bắt đầu)
* **06:30 – 07:30:** Trị Liệu Chuyên Đề Sáng (Mở hông, vai ngực, vặn xoắn)
* **08:00 – 09:00:** Yoga Dòng Chảy & Cột Sống (Hatha, Vinyasa, Yin)
* **09:00 – 12:00:** Khóa Đào Tạo HLV Yoga Quốc Tế E-RYT 500
* **14:00 – 15:30:** Yoga Nâng Cao Ashtanga 10 Chuyên Đề (Master Henry Phan)
* **17:45 – 18:45:** Lớp Tan Ca Phục Hồi Thân Thể (Dân văn phòng)
* **19:00 – 20:00:** Yoga Buổi Tối & Trị Liệu Chuông Xoay (Thư giãn sâu, ngủ ngon)
* **Thứ 7 & Chủ Nhật:** Workshop Chuông Xoay & Đặt lịch Scan Trị Liệu 1-1 theo giờ hẹn.

💡 **LỜI KHUYÊN TỪ MASTER HENRY PHAN:**
Người ngồi văn phòng 10 tiếng liên tục rất dễ gặp phải tình trạng cơ ngực co ngắn gây gù vai và cơ thắt lưng bị chèn ép. Bạn có thể bắt đầu bằng **01 buổi Scan Trị Liệu 1-1 (45-60 phút, 650.000đ)** để Master đo lường góc lệch cột sống và xếp lớp chính xác nhất, hoặc đăng ký tham gia ngay **lớp tối 19:00 - 20:00**.

Bạn thấy khung giờ tối 19:00 hay sáng sớm 05:00 thuận tiện cho lịch trình của bạn hơn? Hãy chia sẻ với MY VICI nhé!`;
    }

    // Câu hỏi lịch học tổng quát
    return `Namaste bạn! Dưới đây là **Thời Khóa Biểu các lớp tập tại VICI Yoga Therapy Training Center** (từ Thứ 2 đến Thứ 7):

🌅 **CÁC CA SÁNG:**
* **05:00 – 06:00:** Lớp *Yoga For Newbie* (Nhẹ nhàng, đánh thức cơ thể, nạp năng lượng đón bình minh).
* **06:30 – 07:30:** Lớp *Trị Liệu Chuyên Đề Sáng* (T2: Kéo giãn | T3: Mở hông | T4: Mở vai & Lưng trên | T5: Vặn xoắn | T6: Thăng bằng).
* **08:00 – 09:00:** Lớp *Yoga Dòng Chảy & Cột Sống* (Cân bằng giữa hơi thở, thể lực và bảo vệ cột sống: Hatha, Vinyasa, Yin).
* **09:00 – 12:00:** Khóa *Đào Tạo HLV Yoga Quốc Tế E-RYT 500 / YACEP* (T2 - T4 - T6, trực tiếp Master Henry Phan).

☀️ **CA CHIỀU:**
* **14:00 – 15:30:** Lớp *Yoga Nâng Cao Ashtanga & Cột Sống* (10 chuyên đề chuyên sâu của Master Henry Phan, T3 & T5).

🌆 **CÁC CA TỐI (Thuận tiện sau giờ làm việc):**
* **17:45 – 18:45:** Lớp *Tan Ca Phục Hồi Thân Thể* (Xả stress, kéo giãn bó cơ và giải tỏa mỏi cổ vai gáy cho dân văn phòng).
* **19:00 – 20:00:** Lớp *Yoga Buổi Tối & Trị Liệu Chuông Xoay* (T2, T4, T6: Lớp Newbie | T3: Gentle Yoga | T5: Trị liệu Chuông xoay Tây Tạng giúp ngủ sâu giấc).

🌿 **DỊCH VỤ 1-1 & CUỐI TUẦN:**
* **Scan Trị Liệu Cơ - Vai - Cổ - Gáy 1-1 (45-60 phút, 650k):** Đặt lịch linh hoạt theo khung giờ riêng của bạn.
* **Workshop Chuông Xoay Chữa Lành:** Tổ chức định kỳ vào sáng Thứ 7 (tuần thứ 2 & thứ 4 hàng tháng).

Bạn thuận tiện tham gia vào khung giờ nào nhất (sáng sớm, ca chiều hay ca tối sau giờ làm) để MY VICI tư vấn chi tiết lớp học phù hợp cho bạn nhé?`;
  }

  // 2. CÂU HỎI TƯ VẤN CHUNG / TƯ VẤN GIÚP TÔI / BẮT ĐẦU TỪ ĐÂU
  const isGeneralConsultation =
    lower === 'tư vấn' ||
    lower === 'tư vấn giúp tôi' ||
    lower === 'tư vấn cho tôi' ||
    lower === 'tôi cần tư vấn' ||
    lower === 'tôi muốn tư vấn' ||
    lower === 'cho tôi xin tư vấn' ||
    lower === 'nhờ tư vấn' ||
    lower === 'xin tư vấn' ||
    lower.includes('tư vấn giúp') ||
    lower.includes('tư vấn cho mình') ||
    lower.includes('cần được tư vấn') ||
    lower.includes('muốn được tư vấn') ||
    (lower.includes('tư vấn') && !lower.includes('thoát vị') && !lower.includes('vai gáy') && !lower.includes('học phí') && !lower.includes('lịch') && !lower.includes('địa chỉ') && !lower.includes('hlv') && !lower.includes('gối') && !lower.includes('ngủ'));

  if (isGeneralConsultation) {
    return `Namaste! 🙏 Rất vui được gặp bạn. Tôi là **MY VICI** – Trợ lý Chuyên môn Trí tuệ Nhân tạo của VICI Yoga Therapy Training Center. Tôi xin phép đưa ra tư vấn định hướng toàn diện cho bạn ngay sau đây:

🌿 **1. ĐỊNH HƯỚNG CÁC NHÓM TRỊ LIỆU & RÈN LUYỆN CHÍNH TẠI VICI:**
* **Phục hồi Cột sống & Đĩa đệm (Thắt lưng, Thoát vị, Thoái hóa):** Áp dụng nguyên lý kéo giãn trục dọc (Axial Elongation) và kích hoạt nhóm cơ ngang bụng (Transversus Abdominis) để tạo "khung đỡ tự nhiên" bảo vệ đốt sống, giảm áp lực nhân nhầy lên rễ thần kinh.
* **Cổ - Vai - Gáy & Hội chứng văn phòng (Tê bì cánh tay, đau đầu):** Sử dụng phương pháp **6D Yoga Trị Liệu** căn chỉnh 6 chiều chuyển động của cột sống cổ, kết hợp kỹ thuật giải phóng điểm xoắn mạc cơ (Trigger Point) giúp máu lưu thông tốt lên não.
* **Dành cho Người mới bắt đầu / Cơ thể cứng:** Lớp **Yoga For Newbie** nhịp độ chậm rãi, sử dụng đầy đủ dụng cụ hỗ trợ (block xốp, dây đai, gối nêm), giáo viên nắn chỉnh tỉ mỉ từng biên độ, tuyệt đối không ép dẻo quá sức.
* **Mất ngủ, Lo âu & Rối loạn tiền đình:** Kỹ thuật thở Pranayama 4 thì kết hợp tần số rung chuông xoay Tây Tạng giúp kích hoạt hệ thần kinh phó giao cảm, đưa tâm trí về trạng thái thư giãn sâu.
* **Khóa Nâng cao Ashtanga (10 chuyên đề) & Đào tạo HLV Quốc Tế E-RYT 500:** Kèm cặp trực tiếp cùng Master Henry Phan theo chuẩn Yoga Alliance Hoa Kỳ.

📋 **2. QUY TRÌNH 4 BƯỚC CHUẨN HÓA TẠI VICI:**
1. **Bước 1 - Tầm soát 1-1:** Buổi Scan Trị Liệu Cơ - Vai - Cổ - Gáy (45-60 phút) để kiểm tra góc lệch trục, biên độ vận động và điểm đau cơ mạc.
2. **Bước 2 - Lập phác đồ:** Thiết kế chuỗi bài tập và điều chỉnh thói quen sinh hoạt riêng cho thể trạng của bạn.
3. **Bước 3 - Luyện tập định tuyến:** Tham gia lớp tập trị liệu chuyên biệt hoặc lớp kèm 1-1 với sự nắn chỉnh trực tiếp.
4. **Bước 4 - Tái đánh giá:** Kiểm tra sự cải thiện của biên độ khớp và chất lượng giấc ngủ sau từng chu kỳ.

💬 **Bạn đang quan tâm đến mục tiêu nào nhất?**
Hãy chia sẻ với MY VICI: Bạn có đang bị đau mỏi ở vùng nào (cổ vai gáy, thắt lưng, khớp gối) hay bạn là người mới muốn bắt đầu tập để nâng cao sức khỏe? Tôi sẽ tư vấn bài tập và lớp học cụ thể ngay cho bạn nhé!`;
  }

  // 2. THOÁT VỊ ĐĨA ĐỆM (L4-L5, L5-S1), THOÁI HÓA CỘT SỐNG THẮT LƯNG, GAI CỘT SỐNG
  if (
    lower.includes('thoát vị') ||
    lower.includes('đĩa đệm') ||
    lower.includes('l4') ||
    lower.includes('l5') ||
    lower.includes('s1') ||
    lower.includes('thắt lưng') ||
    lower.includes('cột sống') ||
    lower.includes('thoái hóa') ||
    lower.includes('gai cột sống') ||
    lower.includes('trượt đốt sống') ||
    lower.includes('đau lưng')
  ) {
    return `Namaste bạn! Người bị đau thắt lưng, thoái hóa hoặc thoát vị đĩa đệm (L4-L5, L5-S1) hoàn toàn **CÓ THỂ và RẤT NÊN tập Yoga Trị Liệu**, nhưng phải tập đúng kỹ thuật y sinh học:

🔬 **CƠ CHẾ GIẢI PHẪU:**
Khi đĩa đệm bị chèn ép hoặc nhân nhầy phình ra, nó kích thích trực tiếp lên rễ thần kinh tủy sống. Các khối cơ dựng sống xung quanh sẽ co cứng để giữ đốt sống lại, gây ra cơn đau nhức ê ẩm kéo dài.

✅ **CÁC BÀI TẬP NÊN TẬP (HỖ TRỢ PHỤC HỒI):**
1. **Tư thế Con Mèo - Con Bò (Marjaryasana - Bitilasana):** Chuyển động nhẹ nhàng từng đốt sống theo nhịp hít vào (võng nhẹ lưng trên, mở ngực) và thở ra (cuộn tròn lưng, thu cằm). Giúp nuôi dưỡng dịch khớp đốt sống.
2. **Tư thế Nhân Sư (Sphinx Pose):** Nằm sấp, chống hai cẳng tay vuông góc sàn, kéo dài ức ngực về phía trước. Giúp đưa nhân nhầy đĩa đệm dịch chuyển nhẹ về vị trí trung tính.
3. **Tư thế Cây Cầu Nhẹ (Setu Bandhasana):** Nằm ngửa, gập gối, kẹp 1 khối gạch yoga giữa hai đùi, nâng nhẹ hông lên để kích hoạt cơ mông và cơ sàn chậu, giảm áp lực thắt lưng.
4. **Hít thở cơ hoành (Diaphragmatic Breathing):** Kích hoạt cơ ngang bụng (Transversus Abdominis) tạo thành đai nẹp sinh học tự nhiên bảo vệ cột sống.

❌ **CÁC ĐỘNG TÁC TUYỆT ĐỐI TRÁNH:**
* Tránh gập người sâu kéo giật (như cố cúi chạm tay vào ngón chân khi chân thẳng căng).
* Tránh vặn xoắn cột sống đột ngột hoặc quá mức khi khung chậu chưa được cố định.
* Tránh uốn lưng ra sau quá sâu (như tư thế Bánh xe Chakrasana) gây dồn nén đĩa đệm thắt lưng.

🌿 **LỘ TRÌNH KHUYẾN NGHỊ TẠI VICI:**
* Khởi đầu an toàn bằng **01 buổi Scan Trị Liệu Cơ - Vai - Cổ - Gáy 1-1 (45-60 phút, 650.000đ)**: Master Henry Phan sẽ đo góc lệch, kiểm tra phản xạ thần kinh và thiết lập bài tập cá nhân hóa.
* Sau đó tham gia lớp Yoga Phục Hồi Thắt Lưng Cột Sống ca tối (17:45 hoặc 19:00).

Bạn có đang bị tê lan xuống hông hay bắp chân không? Hãy chia sẻ thêm để MY VICI tư vấn chi tiết hơn nhé!`;
  }

  // 3. CỔ - VAI - GÁY, GÙ LƯNG, TÊ TAY, HỘI CHỨNG VĂN PHÒNG (BỆNH LÝ / ĐAU MỎI)
  if (
    lower.includes('vai gáy') ||
    lower.includes('đau cổ') ||
    lower.includes('mỏi cổ') ||
    lower.includes('bả vai') ||
    lower.includes('tê tay') ||
    lower.includes('gù lưng') ||
    lower.includes('chéo trên') ||
    (lower.includes('văn phòng') && (lower.includes('đau') || lower.includes('mỏi') || lower.includes('bệnh') || lower.includes('gáy') || lower.includes('hội chứng'))) ||
    (lower.includes('ngồi nhiều') && (lower.includes('đau') || lower.includes('mỏi') || lower.includes('tê') || lower.includes('mệt')))
  ) {
    return `Namaste bạn! Tình trạng đau mỏi Cổ - Vai - Gáy và tê tay là dấu hiệu điển hình của **Hội chứng Chéo Trên (Upper Crossed Syndrome)** rất phổ biến ở người ngồi máy tính nhiều:

🔬 **CƠ CHẾ VẬN ĐỘNG:**
Khi bạn ngồi gập đầu nhìn màn hình, trọng lượng đầu tác động lên đốt sống cổ tăng từ 5kg lên đến 20-27kg. Các cơ nâng vai (Levator Scapulae) và cơ thang trên bị co rút mạn tính, trong khi cơ cổ sâu và cơ lưng giữa bị kéo giãn suy yếu. Điều này chèn ép đám rối thần kinh cánh tay, gây ra hiện tượng tê bì ngón tay và đau nửa đầu.

✅ **BÀI TẬP VÀ PHƯƠNG PHÁP TỰ PHỤC HỒI:**
1. **Bài tập Thu cằm (Chin Tuck):** Ngồi thẳng lưng, từ từ đẩy cằm thẳng ra sau như tạo cằm đôi, giữ 5 giây rồi thả lỏng. Thực hiện 10 lần mỗi 2 tiếng làm việc để tái lập đường cong sinh lý cổ.
2. **Kéo giãn cơ thang bên (Upper Trapezius Stretch):** Nghiêng đầu sang phải, tay phải vòng qua đỉnh đầu kéo nhẹ nhàng sang bên, vai trái thả lỏng xuôi xuống. Giữ 30 giây kết hợp thở sâu.
3. **Mở rộng khớp vai với dây đai (Shoulder Flossing):** Giúp mở khớp vai và lồng ngực, giải tỏa áp lực bả vai.
4. **Phương pháp 6D Yoga tại VICI:** Tác động vào 6 chiều vận động (Gập, Duỗi, Nghiêng trái, Nghiêng phải, Xoay trái, Xoay phải) với lực kiểm soát để giải phóng chèn ép dây thần kinh.

❌ **LƯU Ý QUAN TRỌNG:**
* Tuyệt đối không bẻ vặn cổ phát ra tiếng "rắc" đột ngột vì dễ làm giãn dây chằng và tổn thương bao khớp đốt sống cổ.
* Điều chỉnh màn hình máy tính ngang tầm mắt, không ngồi bắt chéo chân.

🌿 **GỢI Ý TẠI VICI:**
Lớp tập chuyên đề **Trị Liệu Cổ Vai Gáy Dân Văn Phòng** diễn ra vào ca tối (17:45 - 18:45 & 19:00 - 20:00) từ Thứ 2 đến Thứ 7, kết hợp chuông xoay thư giãn thần kinh cực kỳ hiệu quả. Bạn có thể đăng ký trải nghiệm buổi tập thử nhé!`;
  }

  // 4. NGƯỜI MỚI BẮT ĐẦU / CƠ THỂ CỨNG / SỢ ĐAU / CHƯA TẬP BAO GIỜ
  if (
    lower.includes('mới') ||
    lower.includes('chưa tập') ||
    lower.includes('cơ bản') ||
    lower.includes('bắt đầu') ||
    lower.includes('cứng') ||
    lower.includes('không dẻo') ||
    lower.includes('sợ đau') ||
    lower.includes('newbie')
  ) {
    return `Namaste bạn! Rất nhiều người nghĩ rằng "phải dẻo mới tập được Yoga", nhưng tại VICI, triết lý của Master Henry Phan hoàn toàn ngược lại:
> **"Chính vì cơ thể cứng nên chúng ta mới cần đến Yoga để được mềm mại, dẻo dai và giải tỏa áp lực!"**

🌿 **TƯ VẤN CHO NGƯỜI MỚI TẠI VICI:**
1. **Không có sự so sánh:** Mỗi người có cấu trúc xương khớp khác nhau. Bạn không cần phải làm giống hệt người bên cạnh, chỉ cần lắng nghe giới hạn cơ thể mình.
2. **Được hỗ trợ đầy đủ dụng cụ:** Lớp Newbie được trang bị gạch xốp (blocks), dây đai (straps), gối nêm (bolster). Dụng cụ giúp đưa mặt sàn lại gần cơ thể bạn, giúp bạn vào tư thế an toàn, không bị căng kéo rách cơ.
3. **Giáo viên nắn chỉnh trực tiếp:** Thầy Cô sẽ hướng dẫn từng cách đặt bàn chân, mở khớp háng và bảo vệ đầu gối.
4. **Học thở Pranayama bài bản:** Bạn sẽ học cách thở bằng cơ hoành, giúp tăng lượng oxy vào máu và giải tỏa căng thẳng ngay từ buổi đầu tiên.

⏰ **CÁC CA TẬP PHÙ HỢP:**
* Sáng sớm: 05:00 - 06:00 (Lớp Đón Bình Minh & Newbie Yoga)
* Sáng: 06:30 - 07:30 (Yoga Nền tảng)
* Tối: 19:00 - 20:00 (Gentle Yoga Thư giãn)

Bạn muốn bắt đầu vào khung giờ sáng sớm để tràn đầy năng lượng hay khung giờ tối sau giờ làm việc ạ?`;
  }

  // 5. NGƯỜI TRÊN 50 TUỔI / TRUNG NIÊN / KHỚP YẾU
  if (
    lower.includes('50 tuổi') ||
    lower.includes('60 tuổi') ||
    lower.includes('lớn tuổi') ||
    lower.includes('trung niên') ||
    lower.includes('già') ||
    lower.includes('bác') ||
    lower.includes('mẹ') ||
    lower.includes('bố')
  ) {
    return `Namaste! VICI rất trân trọng sự quan tâm của cô/chú/anh/chị. Ở độ tuổi từ 50 trở lên, Yoga Trị Liệu là liệu pháp dưỡng sinh và bảo tồn cơ xương khớp tuyệt vời nhất:

🌟 **LỢI ÍCH CHUYÊN BIỆT CHO ĐỘ TUỔI TRUNG NIÊN & CAO NIÊN:**
* **Bảo tồn dịch ổ khớp:** Vận động nhẹ nhàng kích thích bao hoạt dịch tiết dịch bôi trơn khớp gối, khớp háng, ngăn ngừa thoái hóa nặng.
* **Tăng mật độ xương & sức mạnh cơ bắp:** Các tư thế đứng chịu lực có kiểm soát giúp phòng chống loãng xương và teo cơ do tuổi tác.
* **Luyện thăng bằng - Chống té ngã:** Tăng cường cảm thụ bản thể (proprioception) ở bàn chân và mắt cá chân, giúp đi đứng vững chãi, tự tin.
* **Ổn định huyết áp & Cải thiện giấc ngủ:** Các bài thở Pranayama êm dịu điều hòa hệ thần kinh thực vật, giảm triệu chứng bốc hỏa và giúp ngủ sâu giấc.

🧘 **PHƯƠNG CHÂM GIẢNG DẠY AN TOÀN:**
Tại VICI, các học viên lớn tuổi luôn được theo dõi sát sao, sử dụng ghế và dụng cụ hỗ trợ, tuyệt đối không có các động tác đảo ngược nguy hiểm hay vặn xoắn gắt.

Cô/chú/anh/chị có thể ghé thăm Studio tại Opal Boulevard để trải nghiệm không gian thanh tịnh và trò chuyện trực tiếp cùng Master nhé!`;
  }

  // 6. ĐAU KHỚP GỐI, THOÁI HÓA GỐI, TRÀN DỊCH, KHÔ KHỚP, DÂY CHẰNG
  if (
    lower.includes('khớp gối') ||
    lower.includes('đầu gối') ||
    lower.includes('tràn dịch') ||
    lower.includes('thoái hóa gối') ||
    lower.includes('dây chằng') ||
    lower.includes('khô khớp')
  ) {
    return `Namaste bạn! Khớp gối là khớp bản lề chịu tải trọng rất lớn của toàn bộ cơ thể. Khi khớp gối bị đau hoặc thoái hóa, nguyên tắc trị liệu khoa học là:

🔬 **NGUYÊN TẮC PHỤC HỒI KHỚP GỐI TẠI VICI:**
* Khớp gối không thể tự ổn định nếu các nhóm cơ xung quanh bị yếu. Muốn gối hết đau, bắt buộc phải **kích hoạt nhóm cơ tứ đầu đùi (Quadriceps)** và **cơ mông nhỡ (Gluteus Medius)** để chúng gánh tải trọng thay cho sụn khớp gối.
* **Quy tắc an toàn sống còn:**
  - Tuyệt đối TRÁNH khóa khớp gối (Hyperextension - đẩy khớp gối ra sau quá mức).
  - Khi gập gối, đầu gối luôn hướng thẳng theo ngón chân thứ 2, không để đầu gối sụp vào trong (Knee Valgus).
  - Tránh các bài ngồi xổm sâu hoặc tư thế Hoa sen (Padmasana) khi khớp gối chưa đủ linh hoạt.

✅ **BÀI TẬP NÊN LÀM:**
1. Tập cơ đùi tĩnh: Nằm ngửa, đặt một cuộn khăn dưới khoeo chân, siết cơ đùi ấn nhẹ khoeo xuống sàn trong 5 giây rồi nhả.
2. Tư thế Nhấc chân thẳng (Straight Leg Raise) để củng cố sức mạnh nhóm cơ mặt trước đùi mà không gây cọ xát khớp gối.

Bạn hãy chia sẻ xem đầu gối của bạn bị đau khi đi cầu thang, ngồi xổm hay đau âm ỉ cả khi nghỉ ngơi nhé!`;
  }

  // 7. ĐAU THẦN KINH TỌA, TÊ BÚỐT MÔNG CHÂN, CƠ HÌNH LÊ (PIRIFORMIS)
  if (
    lower.includes('thần kinh tọa') ||
    lower.includes('tê chân') ||
    lower.includes('buốt mông') ||
    lower.includes('cơ hình lê') ||
    lower.includes('piriformis')
  ) {
    return `Namaste bạn! Cơn đau buốt từ mông lan dọc xuống đùi và bắp chân thường do 2 nguyên nhân chính: Thoát vị đĩa đệm L4-L5/L5-S1 chèn ép rễ thần kinh, hoặc do **Hội chứng Cơ hình lê (Piriformis Syndrome)** co thắt đè lên dây thần kinh tọa.

🌿 **TƯ VẤN PHỤC HỒI TẠI VICI:**
1. **Giải phóng cơ hình lê (Piriformis Release):**
   - Tư thế Con số 4 nằm ngửa (Reclined Pigeon Pose): Nằm ngửa, đặt mắt cá chân phải lên đùi trái, hai tay ôm lấy đùi trái kéo nhẹ về ngực. Giữ lưng chạm sàn, hít thở sâu để giải tỏa cơ mông sâu.
2. **Kéo giãn nhóm gân kheo (Hamstrings Stretch) nhẹ nhàng:** Dùng dây đai móc vào lòng bàn chân và duỗi thẳng chân lên trần nhà có kiểm soát, tránh kéo giật.
3. **Thư giãn sóng âm Chuông xoay:** Tần số rung động cơ học giúp phá vỡ các nút thắt co cứng cơ mạc vùng khung chậu.

❌ **LƯU Ý:** Không ngồi trên ví tiền hoặc vật cứng ở túi quần sau, tránh ngồi ghế quá thấp khiến khớp háng bị gập nhọn.

Tại VICI, Master Henry Phan có phác đồ nắn chỉnh giải áp thần kinh tọa 1-1 rất hiệu quả. Bạn có thể mô tả vị trí đau buốt nhất của mình để MY VICI hỗ trợ thêm nhé!`;
  }

  // 8. MẤT NGỦ, STRESS, ĐAU ĐẦU, TIỀN ĐÌNH, LO ÂU
  if (
    lower.includes('mất ngủ') ||
    lower.includes('khó ngủ') ||
    lower.includes('stress') ||
    lower.includes('tiền đình') ||
    lower.includes('đau đầu') ||
    lower.includes('lo âu') ||
    lower.includes('căng thẳng')
  ) {
    return `Namaste bạn! Mất ngủ và căng thẳng kéo dài là biểu hiện của việc hệ thần kinh giao cảm (Sympathetic) bị kích thích liên tục, khiến cơ thể luôn trong trạng thái "chiến đấu hoặc bỏ chạy", lượng cortisol tăng cao và tuần hoàn máu não suy giảm.

🌸 **GIẢI PHÁP CHỮA LÀNH TẠI VICI:**
1. **Kỹ thuật Thở Luân Phiên (Nadi Shodhana Pranayama):** Dùng ngón tay bịt luân phiên từng bên mũi để hít thở chậm, sâu. Phương pháp này đã được khoa học chứng minh giúp cân bằng 2 bán cầu não và hạ nhịp tim về mức thư giãn.
2. **Tư thế Gác chân lên tường (Viparita Karani):** Nằm ngửa gác hai chân thẳng lên tường 10-15 phút trước khi đi ngủ. Tư thế này giúp máu giàu oxy dồn về não, giảm áp lực tĩnh mạch chân và xoa dịu hệ thần kinh cực kỳ nhanh chóng.
3. **Liệu pháp Chuông Xoay Tây Tạng Full Moon (Sound Healing):** Master Mỹ Kiều ứng dụng sóng âm chuông xoay tác động vào các phân tử nước trong tế bào, đưa tần số sóng não từ Beta (căng thẳng) về Alpha và Theta (thiền định sâu), giúp tái tạo giấc ngủ tự nhiên mà không cần dùng thuốc an thần.

Lớp tập tối 19:00 - 20:00 tại VICI là sự kết hợp hoàn hảo giữa Yoga Phục hồi và Chuông xoay để bạn có một giấc ngủ trọn vẹn mỗi đêm!`;
  }

  // 9. GIẢM CÂN, THON GỌN, EO, VÓC DÁNG, ĐỐT MỠ
  if (
    lower.includes('giảm cân') ||
    lower.includes('thon gọn') ||
    lower.includes('béo') ||
    lower.includes('eo') ||
    lower.includes('giảm mỡ') ||
    lower.includes('vóc dáng') ||
    lower.includes('body')
  ) {
    return `Namaste bạn! Yoga tại VICI không chỉ có trị liệu phục hồi mà còn có các lớp định hình vóc dáng săn chắc, thon gọn tự nhiên:

🔥 **CƠ CHẾ ĐỐT MỠ KHOA HỌC:**
* **Kích hoạt Cơ Lõi Sâu (Core Power):** Tác động vào nhóm cơ ngang bụng, cơ chéo bụng trong và ngoài giúp siết thon vòng eo, nâng cơ mông tự nhiên mà không làm to bắp chân.
* **Chuyển động liên hoàn Vinyasa & Hơi thở Ujjayi:** Làm nóng cơ thể từ bên trong, đốt cháy năng lượng calo dư thừa và kích thích trao đổi chất liên tục suốt 24h sau buổi tập.
* **Cải thiện tư thế tạo đường cong chữ S:** Chỉnh sửa chứng ưỡn bụng hoặc gù lưng giúp vóc dáng cao ráo, thanh thoát hơn rõ rệt.

Bạn có thể tham gia gói tập 3 tháng hoặc 6 tháng tại VICI để được hướng dẫn lộ trình tập luyện và dinh dưỡng chánh niệm nhé!`;
  }

  // 10. NAM GIỚI TẬP YOGA
  if (
    lower.includes('nam') ||
    lower.includes('đàn ông') ||
    lower.includes('con trai') ||
    lower.includes('nam giới')
  ) {
    return `Namaste bạn! Nam giới tập Yoga là xu hướng rất phát triển và tại VICI có rất nhiều học viên nam (doanh nhân, chuyên gia IT, vận động viên):

💪 **LỢI ÍCH ĐẶC BIỆT CHO PHÁI MẠNH:**
* Nam giới thường có cơ bắp mạnh nhưng khớp vai, gân kheo và khớp háng lại rất cứng, dễ bị thoái hóa đốt sống thắt lưng do ngồi nhiều hoặc chấn thương thể thao (gym, đá bóng, tennis).
* Yoga giúp kéo giãn cơ mạc sâu, giải tỏa áp lực cột sống, tăng độ linh hoạt khớp và mở rộng dung tích phổi.
* Khóa học được trực tiếp hướng dẫn bởi **Master Henry Phan** – người thầy với phong cách đĩnh đạc, khoa học, chuyên sâu về giải phẫu y sinh học, tạo cảm giác vô cùng thoải mái và tự tin cho học viên nam!`;
  }

  // 11. MẸ BẦU & SAU SINH
  if (
    lower.includes('bầu') ||
    lower.includes('mang thai') ||
    lower.includes('sau sinh') ||
    lower.includes('thai kỳ')
  ) {
    return `Namaste bạn! VICI có chương trình chuyên biệt chăm sóc sức khỏe cho mẹ và bé:
* **Yoga Bầu (từ tuần thai thứ 13 trở đi):** Các bài tập nhẹ nhàng mở khớp háng, giảm đau nhức thắt lưng, chống chuột rút và tập thở chuẩn bị cho một kỳ vượt cạn thuận lợi, bình an.
* **Phục hồi Sau Sinh (từ 3 tháng sau sinh):** Bài tập chuyên sâu phục hồi cơ sàn chậu (Pelvic Floor) và hỗ trợ đóng tách cơ bụng (Diastasis Recti), giúp các mẹ lấy lại vóc dáng thon gọn an toàn.`;
  }

  // 12. CHUÔNG XOAY TÂY TẠNG / SINGING BOWLS / SOUND HEALING / THIỀN
  if (
    lower.includes('chuông') ||
    lower.includes('chuông xoay') ||
    lower.includes('singing bowl') ||
    lower.includes('sound bath') ||
    lower.includes('sound healing') ||
    lower.includes('thiền') ||
    lower.includes('luân xa')
  ) {
    return `Namaste bạn! **Liệu pháp Chuông Xoay Trị Liệu & Mindfulness** là một trong những nét độc đáo và sâu sắc nhất tại VICI:

🔔 **CƠ CHẾ CHỮA LÀNH:**
* Cơ thể con người có hơn 70% là nước. Tần số rung động cơ học thuần khiết từ bộ chuông xoay Full Moon thủ công Himalaya sẽ truyền dẫn qua các mô tế bào, làm tan biến các ách tắc năng lượng và xoa dịu các cơn co thắt cơ mạn tính.
* Sóng âm đưa não bộ về trạng thái Alpha và Theta, giúp kích hoạt cơ chế tự chữa lành của cơ thể, dứt điểm chứng đau đầu và mất ngủ kinh niên.
* **Học phí Workshop:** 1.200.000 VNĐ/buổi (thời lượng 2 tiếng, giới hạn số lượng học viên để trải nghiệm tốt nhất).`;
  }

  // 13. KHÓA ASHTANGA NÂNG CAO 10 CHUYÊN ĐỀ (MASTER HENRY PHAN)
  if (
    lower.includes('ashtanga') ||
    lower.includes('nâng cao') ||
    lower.includes('10 chuyên đề') ||
    lower.includes('handstand') ||
    lower.includes('uốn lưng') ||
    lower.includes('pincha') ||
    lower.includes('chuối') ||
    lower.includes('đảo ngược')
  ) {
    return `Namaste bạn! Khóa học **"Yoga Nâng Cao Ashtanga & Năng Lượng Cột Sống (10 chuyên đề chuyên sâu)"** do đích thân Master Henry Phan (E-RYT 500) biên soạn và trực tiếp giảng dạy:

🔥 **10 CHUYÊN ĐỀ NỔI BẬT:**
1. Khóa năng lượng Bandhas (Mula, Uddiyana, Jalandhara) & Hơi thở Ujjayi chuẩn xác.
2. Định tuyến điểm nhìn định tâm (Drishti) và chuyển động Vinyasa krama.
3. Kỹ thuật mở lưng trên (Thoracic Spine) an toàn, tuyệt đối không chèn ép thắt lưng.
4. Mở khớp hông đa chiều & tư thế Bồ Câu Vua (Kapotasana).
5. Kỹ thuật đảo ngược an toàn: Trồng chuối Sirsasana và Pincha Mayurasana.
6. Chinh phục thăng bằng tay Handstand (Adho Mukha Vrksasana) với cấu trúc đai vai vững chãi.

💰 **Học phí ưu đãi Early Bird:** 1.290.000 VNĐ (Giá gốc 1.590.000 VNĐ).
⏰ Lịch học: Ca chiều Thứ 3 & Thứ 5 (14:00 - 15:30). Bạn có thể đăng ký giữ chỗ ngay hôm nay!`;
  }

  // 14. ĐÀO TẠO HUẤN LUYỆN VIÊN YOGA QUỐC TẾ E-RYT 500 / YACEP
  if (
    lower.includes('hlv') ||
    lower.includes('huấn luyện viên') ||
    lower.includes('đào tạo') ||
    lower.includes('chứng chỉ') ||
    lower.includes('yoga alliance') ||
    lower.includes('bằng cấp') ||
    lower.includes('e-ryt') ||
    lower.includes('200h') ||
    lower.includes('500h')
  ) {
    return `Namaste bạn! Khóa **Đào Tạo Huấn Luyện Viên Yoga Quốc Tế (E-RYT 500 / YACEP)** tại VICI là chương trình đào tạo chuyên sâu chuẩn quốc tế Yoga Alliance Hoa Kỳ (chứng chỉ có giá trị giảng dạy trên toàn cầu):

🎓 **ĐIỂM KHÁC BIỆT KHI HỌC TẠI VICI:**
* Kèm cặp trực tiếp bởi **Master Henry Phan** – chuyên gia từng đào tạo y bác sĩ BV Đa khoa Tâm Anh và Vinpearl Landmark Sky Studio.
* Đào tạo bài bản về **Giải phẫu học Cơ năng (Kinesiology)** và **Trị Liệu Cột Sống 6D Yoga** – giúp bạn tự tin xử lý mọi ca chấn thương của học viên.
* Nghệ thuật chỉnh sửa bằng tay (Hands-on Adjustments) an toàn và tâm lý học sư phạm.
* Cơ hội thực tập trợ giảng và giới thiệu việc làm tại hệ thống phòng tập đối tác của VICI.

⏰ Lịch học: Ca sáng 09:00 - 12:00 (Thứ 2 - 4 - 6). Bạn có thể để lại thông tin để VICI gửi trọn bộ Brochure chương trình và chính sách học bổng nhé!`;
  }

  // 15. HỌC PHÍ, GIÁ CẢ, CÁC GÓI TẬP
  if (
    lower.includes('học phí') ||
    lower.includes('giá') ||
    lower.includes('tiền') ||
    lower.includes('bao nhiêu') ||
    lower.includes('chi phí') ||
    lower.includes('bảng giá') ||
    lower.includes('voucher') ||
    lower.includes('ưu đãi')
  ) {
    return `Namaste bạn! Bảng học phí tại VICI Yoga Therapy Training Center được niêm yết công khai và minh bạch như sau:

📋 **CÁC GÓI TẬP HỘI VIÊN CHẤT LƯỢNG CAO:**
* **Gói 3 tháng:** 2.550.000 VNĐ (~850.000đ/tháng)
* **Gói 6 tháng:** 4.800.000 VNĐ (~800.000đ/tháng)
* **Gói VIP 1 năm:** 8.000.000 VNĐ (Tặng kèm 01 buổi Scan Trị liệu 1-1 + 01 vé Workshop Chuông xoay)

🌿 **DỊCH VỤ TRỊ LIỆU 1-1 & NÂNG CAO:**
* **Scan Trị Liệu Cơ - Vai - Cổ - Gáy 1-1 (45-60 phút):** 650.000 VNĐ/buổi (Kiểm tra góc lệch, tầm soát điểm đau cơ mạc, thiết lập phác đồ riêng).
* **Trị Liệu Chuyên Sâu 1-1 Cá nhân hóa (60-75 phút):** 1.200.000 VNĐ/buổi.
* **Workshop Chuông Xoay & Mindfulness:** 1.200.000 VNĐ/buổi.
* **Khóa Ashtanga 10 chuyên đề:** 1.290.000 VNĐ (Ưu đãi Early Bird).
* **Khóa Đào tạo HLV Quốc Tế:** Vui lòng liên hệ để nhận chính sách học bổng theo đợt.

VICI có chính sách bảo lưu linh hoạt nếu bạn có lịch công tác đột xuất. Bạn muốn tìm hiểu sâu hơn về gói tập nào ạ?`;
  }

  // 16. LỊCH HỌC, THỜI KHÓA BIỂU, CA TẬP
  if (
    lower.includes('lịch') ||
    lower.includes('giờ') ||
    lower.includes('thời khóa biểu') ||
    lower.includes('ca tập') ||
    lower.includes('mấy giờ') ||
    lower.includes('sáng') ||
    lower.includes('tối')
  ) {
    return `Namaste bạn! Thời khóa biểu tại VICI Yoga Therapy được sắp xếp khoa học từ Thứ 2 đến Thứ 7:

🌅 **CÁC CA SÁNG:**
* **05:00 - 06:00:** Lớp Đón Bình Minh & Newbie Yoga (nhẹ nhàng, đánh thức cơ thể)
* **06:30 - 07:30:** Lớp Yoga Nền tảng & Căn chỉnh Cột sống
* **08:00 - 09:00:** Lớp Yoga Phục hồi Thể chất & Hơi thở
* **09:00 - 12:00:** Lớp Đào tạo Huấn Luyện Viên Quốc Tế (T2 - T4 - T6)

☀️ **CA CHIỀU:**
* **14:00 - 15:30:** Lớp Yoga Nâng Cao Ashtanga & Chuyên đề (Master Henry Phan)

🌆 **CÁC CA TỐI (Thuận tiện sau giờ làm việc):**
* **17:45 - 18:45:** Lớp Trị Liệu Cổ Vai Gáy & Cột Sống Dân Văn Phòng
* **19:00 - 20:00:** Lớp Gentle Yoga Thư Giãn & Chuông Xoay

Chủ nhật Studio dành riêng cho các Workshop Trị liệu chuyên sâu. Bạn thuận tiện tham gia vào khung giờ nào nhất?`;
  }

  // 17. ĐỊA CHỈ, ĐƯỜNG ĐI, GỬI XE
  if (
    lower.includes('địa chỉ') ||
    lower.includes('ở đâu') ||
    lower.includes('chỗ nào') ||
    lower.includes('vị trí') ||
    lower.includes('đường đi') ||
    lower.includes('gửi xe') ||
    lower.includes('opal')
  ) {
    return `📍 **Địa chỉ Trung tâm VICI Yoga Therapy:**
* **Trụ sở chính:** Căn hộ B1-0705, Chung cư Opal Boulevard, mặt tiền đường Phạm Văn Đồng, phường An Bình, TP. Dĩ An (giáp ranh trực tiếp TP. Thủ Đức, TP. Hồ Chí Minh).
* **Tiện ích:** Tòa nhà có hầm gửi xe máy và ô tô cực kỳ rộng rãi, an ninh 24/7. Phòng tập trên tầng cao thoáng mát, đón gió trời tự nhiên, cách biệt hoàn toàn khói bụi và tiếng ồn.
* Ngoài ra VICI còn có chuỗi không gian liên kết: Yoga Chân Mây (Vinpearl Landmark Sky Studio) và Vườn Ong Xóm Lá.
Hotline đón khách: **036 684 0130**. Rất hoan nghênh bạn ghé thăm phòng tập!`;
  }

  // 18. GIẢNG VIÊN (MASTER HENRY PHAN & MASTER MỸ KIỀU)
  if (
    lower.includes('thầy') ||
    lower.includes('cô') ||
    lower.includes('henry') ||
    lower.includes('hùng phan') ||
    lower.includes('mỹ kiều') ||
    lower.includes('giảng viên') ||
    lower.includes('ai dạy')
  ) {
    return `Đội ngũ Giảng viên tại VICI Yoga Therapy gồm những Master giàu kinh nghiệm và tâm huyết:

🌟 **Master Henry Phan (Yogi Hùng Phan) - Sáng lập VICI:**
* Đạt chuẩn **E-RYT 500 & YACEP** cao nhất của Yoga Alliance Hoa Kỳ.
* Cử nhân ĐH Kinh tế Quốc dân và ĐH Yoga Ấn Độ.
* Á Quân Got Talent FLG Việt Nam 2022.
* Chuyên gia Master Yoga từng trực tiếp đào tạo phục hồi cho đội ngũ y bác sĩ Bệnh viện Đa khoa Tâm Anh và Vinpearl Landmark Sky Studio.

🌸 **Master Mỹ Kiều - Đồng sáng lập VICI:**
* Chuyên gia trị liệu tâm trí và chuông xoay Tây Tạng với phương châm *"Tâm an - Vạn sự an"*.
* Thấu hiểu tâm lý học viên, hướng dẫn hơi thở và giải tỏa căng thẳng thần kinh hiệu quả.

Các Thầy Cô luôn trực tiếp nắn chỉnh tư thế trong từng buổi tập để bạn đạt định tuyến chuẩn xác nhất.`;
  }

  // 19. TRẢI NGHIỆM / HỌC THỬ / SCAN TRỊ LIỆU
  if (
    lower.includes('tập thử') ||
    lower.includes('học thử') ||
    lower.includes('trải nghiệm') ||
    lower.includes('scan') ||
    lower.includes('kiểm tra')
  ) {
    return `Namaste bạn! VICI luôn chào đón bạn đến trải nghiệm:
* **Buổi trải nghiệm lớp tập nhóm:** Cảm nhận không khí tập luyện ấm áp và sự nắn chỉnh tận tình của giáo viên.
* **Buổi Scan Trị Liệu 1-1 (45-60 phút, 650.000đ):** Master sẽ đo đạc độ lệch trục cột sống, biên độ khớp, tầm soát điểm đau cơ mạc và thiết lập phác đồ riêng cho bạn trước khi xếp lớp.
Bạn có thể cho MY VICI biết bạn muốn tham gia trải nghiệm vào ngày nào trong tuần nhé!`;
  }

  // 20. ĐĂNG KÝ / LIÊN HỆ / HOTLINE KHI NGƯỜI DÙNG THỰC SỰ YÊU CẦU
  if (
    lower.includes('hotline') ||
    lower.includes('số điện thoại') ||
    lower.includes('sđt') ||
    lower.includes('zalo') ||
    lower.includes('gọi điện') ||
    lower.includes('liên lạc')
  ) {
    return `Cảm ơn bạn! Thông tin liên hệ trực tiếp của VICI Yoga Therapy:
📞 **Hotline / Zalo:** **036 684 0130**
🏢 **Địa chỉ:** Căn hộ B1-0705, Chung cư Opal Boulevard, đường Phạm Văn Đồng, TP. Dĩ An / TP. Thủ Đức, TP. HCM.
⏰ **Giờ mở cửa:** 06:00 - 20:30 (Thứ 2 đến Thứ 7).

Ngoài ra, MY VICI vẫn luôn túc trực ở đây để tư vấn mọi thắc mắc về động tác, bài tập hoặc lộ trình trị liệu cho bạn. Bạn cứ đặt câu hỏi nhé!`;
  }

  // DEFAULT CONVERSATIONAL ADVICE
  return `Namaste bạn! Cảm ơn bạn đã trò chuyện cùng MY VICI. 🙏

Tại VICI Yoga Therapy, dưới sự dẫn dắt của **Master Henry Phan (E-RYT 500)**, chúng tôi chuyên sâu về:
1. **Trị liệu Cột sống & Cơ xương khớp:** Thoát vị đĩa đệm, thoái hóa L4-L5, đau mỏi cổ vai gáy, đau thần kinh tọa và khớp gối.
2. **Yoga Cho Người Mới:** Nhịp độ nhẹ nhàng, sử dụng dụng cụ hỗ trợ an toàn tuyệt đối.
3. **Khóa Ashtanga Nâng Cao & Đào Tạo HLV Quốc Tế E-RYT 500:** Cấp bằng Yoga Alliance Hoa Kỳ.
4. **Workshop Chuông Xoay Himalaya:** Giải tỏa stress và điều trị mất ngủ.

Bạn có thể chia sẻ cụ thể hơn về tình trạng sức khỏe hiện tại của bạn (vị trí đau mỏi, tiền sử chấn thương hoặc mục tiêu bạn mong muốn) để MY VICI tư vấn bài tập và phác đồ tốt nhất cho bạn ngay nhé!`;
}
