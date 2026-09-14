interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenSchedule: () => void;
  onOpenBooking: () => void;
}

export function MenuDrawer({
  isOpen,
  onClose,
  onNavigate,
  onOpenSchedule,
  onOpenBooking
}: MenuDrawerProps) {
  if (!isOpen) return null;

  const menuLinks = [
    { label: 'Sanctuary & Stays', target: 'hero-header' },
    { label: 'Travel & Experiences', target: 'activities-and-tours' },
    { label: 'Designed for Living (Amenities)', target: 'amenities-and-comforts' },
    { label: 'Verified Guest Stories', target: 'guest-reviews' },
    { label: 'The Sacred Footsteps of Sai Baba', target: 'pilgrimage-darshan-guide' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-start transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-[#ebe8e1] w-full max-w-sm h-full p-6 sm:p-8 flex flex-col justify-between shadow-2xl border-r border-neutral-300 relative text-neutral-900 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-neutral-300/80 mb-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 shadow-sm text-white">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 22h20L12 2z" />
                </svg>
              </span>
              <span className="font-display font-bold text-base tracking-tight text-neutral-900">
                Sai Sk Palace
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#dedad0] hover:bg-[#d4cfc3] text-neutral-700 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600 mb-3">
            Quick Navigation
          </p>

          <nav className="space-y-1">
            {menuLinks.map((link) => (
              <button
                key={link.target}
                type="button"
                onClick={() => {
                  onNavigate(link.target);
                  onClose();
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-2xl hover:bg-[#dedad0]/80 text-sm font-semibold text-neutral-800 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <span>{link.label}</span>
                <span className="text-neutral-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </button>
            ))}
          </nav>

          <div className="pt-6 mt-6 border-t border-neutral-300/80 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Pilgrim Resources
            </p>
            <button
              type="button"
              onClick={() => {
                onOpenSchedule();
                onClose();
              }}
              className="w-full text-left px-3.5 py-2 rounded-xl bg-white/70 hover:bg-white text-xs font-semibold text-neutral-800 border border-neutral-200/80 transition-all flex items-center gap-2"
            >
              <span className="text-orange-500">✦</span>
              <span>Aarti Timetable (Shirdi Trust)</span>
            </button>
            <a
              href="tel:+917350049191"
              onClick={onClose}
              className="w-full py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.053 15.053 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 3.99c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
              </svg>
              Call: +91 7350049191
            </a>
          </div>
        </div>

        {/* Bottom Contact */}
        <div className="pt-6 border-t border-neutral-300/80 mt-6">
          <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-1">
            Direct Concierge Assistance
          </p>
          <a
            href="tel:+917350049191"
            className="text-sm font-bold text-neutral-900 hover:text-orange-600 transition-colors block"
          >
            +91 7350049191
          </a>
          <p className="text-[11px] text-neutral-500 mt-1">
            Shirdi Yog Marg Near Neeta Bus Parking Pimple Wadi Road, Maharashtra 423109
          </p>
        </div>
      </div>
    </div>
  );
}
