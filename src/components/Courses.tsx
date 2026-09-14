import { useState } from 'react';
import { Sparkles, Check, ArrowRight, Clock, Calendar, Info } from 'lucide-react';
import { VICI_COURSES } from '../data/viciData';
import { Course } from '../types';
import CourseModal from './CourseModal';

interface CoursesProps {
  onOpenRegister: (courseName?: string) => void;
}

export default function Courses({ onOpenRegister }: CoursesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalCourse, setModalCourse] = useState<Course | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả chương trình' },
    { id: 'package', label: 'Gói tập cá nhân hóa' },
    { id: 'therapy', label: 'Trị liệu & Phục hồi' },
    { id: 'training', label: 'Đào tạo HLV & Nâng cao' },
    { id: 'workshop', label: 'Workshop Chuông xoay' },
  ];

  const filteredCourses =
    selectedCategory === 'all'
      ? VICI_COURSES
      : VICI_COURSES.filter((c) => c.category === selectedCategory);

  return (
    <section id="courses" className="py-20 bg-[#F8F5EE] border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D69A2D]/15 text-[#9E6910] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hệ sinh thái đào tạo VICI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#252822] font-serif-display mb-4">
            Chương Trình Đào Tạo & Trị Liệu
          </h2>
          <p className="text-base text-[#5A5F52] leading-relaxed">
            Thiết kế theo dạng phễu khoa học: từ tầm soát điểm đau ban đầu, lớp nền tảng cho người mới đến các khóa chuyên sâu và đào tạo nghề HLV quốc tế.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#8A6437] text-white shadow-xs'
                  : 'bg-[#FFFDF8] text-[#555A4E] border border-[#E8DFC8] hover:border-[#8A6437] hover:bg-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`bg-[#FFFDF8] rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col group ${
                course.featured
                  ? 'border-[#D69A2D] shadow-md ring-1 ring-[#D69A2D]/30'
                  : 'border-[#E8DFC8] shadow-2xs hover:shadow-md hover:border-[#8A6437]'
              }`}
            >
              {/* Photo & Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE7D5]">
                <img
                  src={course.photoUrl}
                  alt={course.name}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {course.badge && (
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#FFFDF8]/90 backdrop-blur-xs text-[#8A6437] text-[11px] font-bold tracking-wide border border-white/50">
                    {course.badge}
                  </span>
                )}

                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#E5B25D]" />
                    {course.duration}
                  </span>
                  <span className="text-[11px] bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                    {course.format}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-[#252822] font-serif-display mb-2 line-clamp-2">
                  {course.name}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#555A4E] leading-relaxed mb-4 flex-grow line-clamp-3">
                  {course.shortDesc}
                </p>

                {/* Benefits snippet */}
                <div className="space-y-1.5 mb-5 pt-3 border-t border-[#F0E8D7]">
                  {course.benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#4A4E44]">
                      <Check className="w-3.5 h-3.5 text-[#687B56] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing Display */}
                <div className="pt-3 border-t border-[#F0E8D7] flex items-baseline justify-between mb-5">
                  <div>
                    <span className="text-[11px] text-[#717769] block font-medium">
                      Học phí:
                    </span>
                    <span className="text-xl font-bold text-[#8A6437] font-serif-display">
                      {course.priceDisplay}
                    </span>
                  </div>

                  {course.priceStatus === 'CONFIRMED' ? (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Niêm yết
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                      Tư vấn riêng
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    id={`course-view-detail-${course.id}-btn`}
                    onClick={() => setModalCourse(course)}
                    className="py-2.5 px-3 rounded-xl border border-[#D5C7AA] hover:bg-[#FAF7F0] text-xs font-semibold text-[#555A4E] transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Chi tiết</span>
                  </button>

                  <button
                    id={`course-register-${course.id}-btn`}
                    onClick={() => onOpenRegister(course.name)}
                    className="py-2.5 px-3 rounded-xl bg-[#D69A2D] hover:bg-[#B87A14] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>Đăng ký</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Notice on Accurate Pricing */}
        <div className="text-center text-xs text-[#717769] max-w-2xl mx-auto">
          * Toàn bộ mức học phí được cập nhật chính xác từ bảng giá niêm yết của VICI Yoga Therapy Training Center. Học viên được hỗ trợ chuyển nhượng và bảo lưu linh hoạt theo quy chế trung tâm.
        </div>
      </div>

      {/* Course Detail Modal */}
      <CourseModal
        course={modalCourse}
        onClose={() => setModalCourse(null)}
        onRegisterCourse={(cName) => onOpenRegister(cName)}
      />
    </section>
  );
}
