import { AMENITIES } from '../data/hotelData';

export function AmenitiesSection() {
  const renderIcon = (iconName: string, isBack: boolean = false) => {
    const className = isBack 
      ? "w-6 h-6 sm:w-8 sm:h-8 text-white opacity-90" 
      : "w-6 h-6 sm:w-7 sm:h-7 text-orange-500";
      
    switch (iconName) {
      case 'wifi':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" x2="12.01" y1="20" y2="20" />
          </svg>
        );
      case 'parking':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect height="18" rx="2" width="18" x="3" y="3" />
            <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
          </svg>
        );
      case 'cctv':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        );
      case 'lift':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M12 8l-3 3h6z" />
            <path d="M12 16l-3-3h6z" />
            <path d="M12 11v5" />
          </svg>
        );
      case 'accessible':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="12" cy="4" r="1.5" />
            <path d="M18 19l-4-4h-3v-5a2 2 0 0 0-2-2H8" />
            <path d="M13 15v5" />
            <circle cx="9" cy="18" r="3" />
          </svg>
        );
      case 'pool':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          </svg>
        );
      case 'climate':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M8 16a3 3 0 0 1-3-3 3 3 0 0 1 3-3h12" />
            <path d="M5 19a2 2 0 0 1-2-2 2 2 0 0 1 2-2h14" />
            <path d="M11 6a3 3 0 0 1-3 3H2" />
          </svg>
        );
      case 'business':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect height="14" rx="2" width="20" x="2" y="7" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        );
      case 'room-service':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <circle cx="12" cy="3" r="1" />
          </svg>
        );
      case 'shuttle':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
          </svg>
        );
      case 'fitness':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="m6.5 6.5 11 11" />
            <path d="m21 21-1-1" />
            <path d="m3 3 1 1" />
            <path d="m18 22 4-4" />
            <path d="m2 6 4-4" />
            <path d="m3 10 7-7" />
            <path d="m14 21 7-7" />
          </svg>
        );
      case 'smoke-free':
      default:
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <line x1="18" x2="22" y1="12" y2="12" />
            <line x1="18" x2="22" y1="16" y2="16" />
            <path d="M2 12h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2v-4z" />
            <line x1="2" x2="22" y1="2" y2="22" />
          </svg>
        );
    }
  };

  return (
    <section className="mt-12 sm:mt-24 max-w-[1400px] mx-auto px-4" data-purpose="amenities-and-comforts">
      {/* Title Section (Restored to Light Theme) */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold text-orange-600 uppercase tracking-widest shadow-sm mb-6">
          <span className="text-orange-500">✦</span>
          <span>Thoughtful comforts</span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight leading-tight mb-4">
          Designed for <span className="text-orange-500">effortless living</span>
        </h2>
        <p className="text-sm sm:text-base font-medium text-neutral-600 max-w-xl px-2">
          Experience seamless hospitality with premium amenities tailored for relaxation, prayer, and comfort.
        </p>
      </div>

      {/* 3D Flip Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 perspective-1000">
        {AMENITIES.map((amenity) => (
          <div
            key={amenity.id}
            className="group w-full h-[140px] sm:h-[180px] perspective-1000 cursor-pointer"
          >
            {/* The 3D Flip Container */}
            <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
              
              {/* Front of Card */}
              <div className="absolute w-full h-full backface-hidden bg-[#f5f4ef] rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center text-center border border-neutral-200/80 shadow-md">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white shadow-sm border border-neutral-100 flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110">
                  {renderIcon(amenity.iconName)}
                </div>
                <h3 className="font-bold text-[13px] sm:text-sm text-neutral-900 leading-tight">
                  {amenity.title}
                </h3>
              </div>

              {/* Back of Card */}
              <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-4 flex flex-col items-center justify-center text-center shadow-xl rotate-y-180 border border-orange-400">
                <div className="mb-2">
                  {renderIcon(amenity.iconName, true)}
                </div>
                <h3 className="font-bold text-xs text-white mb-2 uppercase tracking-widest border-b border-white/30 pb-1 inline-block">
                  {amenity.subtitle}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-white/90 font-medium leading-relaxed">
                  {amenity.description}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
      
      {/* Required CSS for 3D Flips since Tailwind doesn't have it built-in perfectly */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .group:hover .group-hover\\:rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
