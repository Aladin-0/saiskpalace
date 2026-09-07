import { TEMPLE_TIMINGS } from '../data/hotelData';

interface TempleScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TempleScheduleModal({ isOpen, onClose }: TempleScheduleModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#f5f4ef] rounded-3xl max-w-2xl w-full shadow-2xl border border-neutral-300 p-6 sm:p-8 my-8 relative text-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 flex items-center justify-center text-sm transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
            <span>✦ Shri Saibaba Sansthan Trust Timings (2025/2026)</span>
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
            Official Daily Darshan &amp; Aarti Timetable
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Located just 400 meters (4 minutes walk) from Sai Sk Palace via Temple Gate 2.
          </p>
        </div>

        {/* Timetable Table */}
        <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm mb-6">
          <div className="divide-y divide-neutral-100">
            {TEMPLE_TIMINGS.map((item, idx) => (
              <div
                key={item.aarti}
                className={`p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">{item.aarti}</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">{item.notes}</p>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className="inline-block font-mono font-bold text-xs sm:text-sm bg-orange-50 text-orange-700 px-2.5 py-1 rounded-lg border border-orange-200/50">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Tips */}
        <div className="bg-neutral-200/60 rounded-2xl p-4 text-xs text-neutral-700 space-y-1.5 mb-6">
          <p className="font-bold text-neutral-900">Important Pilgrim Guidelines:</p>
          <ul className="list-disc list-inside space-y-1 text-neutral-600">
            <li>Electronic gadgets, mobile phones, bags, and leather belts are prohibited inside the Samadhi Mandir.</li>
            <li>Sai Sk Palace provides free secure room lockers and early morning 03:45 AM alarm calls.</li>
            <li>Senior citizen wheelchairs and complimentary battery carts are coordinated at hotel reception.</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print Timetable</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
