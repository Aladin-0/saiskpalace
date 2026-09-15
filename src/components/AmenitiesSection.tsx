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
            <path d="M8 9l4-4 4 4" />
            <path d="M16 15l-4 4-4-4" />
            <path d="M12 5v14" />
          </svg>
        );
      case 'water':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 22a6 6 0 0 0 6-6c0-4-6-10-6-10S6 12 6 16a6 6 0 0 0 6 6z" />
            <path d="M12 18v-4" />
          </svg>
        );
      case 'generator':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        );
      case 'solar':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.41 1.41" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M6.34 17.66l-1.41 1.41" />
            <path d="M19.07 4.93l-1.41 1.41" />
          </svg>
        );
      case 'tv':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
            <polyline points="17 2 12 7 7 2" />
          </svg>
        );
      case 'spa':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M6.5 9.5c0-3.5 2.5-6.5 5.5-6.5s5.5 3 5.5 6.5" />
            <path d="M12 3c-2.5 0-5-2-5-2s-3.5 1-3.5 4 2.5 4.5 2.5 4.5" />
            <path d="M8.5 12c0 3 1.5 5 3.5 5s3.5-2 3.5-5" />
            <path d="M9.5 11.5c.3.3.7.3 1 0" />
            <path d="M13.5 11.5c.3.3.7.3 1 0" />
            <path d="M12 13.5v1" />
            <path d="M11.5 15.5c.3.3.7.3 1 0" />
            <path d="M4 9.5c0 3 1.5 6 3 8" />
            <path d="M20 9.5c0 3-1.5 6-3 8" />
            <path d="M11 17v2c-2.5 1-5.5 1.5-7.5 1.5" />
            <path d="M13 17v2c2.5 1 5.5 1.5 7.5 1.5" />
          </svg>
        );
      case 'conference':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'garden':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
            <path d="M7 16v6" />
            <path d="M13 19v3" />
            <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />
          </svg>
        );
      case 'shuttle':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>
        );
      case 'room-service':
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect x="2" y="7" width="20" height="5" />
            <line x1="12" x2="12" y1="22" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
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
      default:
        return (
          <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
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
