import { useState } from 'react';
import { AMENITIES } from '../data/hotelData';
import { AmenityItem } from '../types';

export function AmenitiesSection() {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityItem | null>(null);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'wifi':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" x2="12.01" y1="20" y2="20" />
          </svg>
        );
      case 'breakfast':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            <line x1="6" x2="6" y1="2" y2="4" />
            <line x1="10" x2="10" y1="2" y2="4" />
            <line x1="14" x2="14" y1="2" y2="4" />
          </svg>
        );
      case 'parking':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <rect height="18" rx="2" width="18" x="3" y="3" />
            <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
          </svg>
        );
      case 'accessible':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="4" r="1.5" />
            <path d="M18 19l-4-4h-3v-5a2 2 0 0 0-2-2H8" />
            <path d="M13 15v5" />
            <circle cx="9" cy="18" r="3" />
          </svg>
        );
      case 'pool':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          </svg>
        );
      case 'climate':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 16a3 3 0 0 1-3-3 3 3 0 0 1 3-3h12" />
            <path d="M5 19a2 2 0 0 1-2-2 2 2 0 0 1 2-2h14" />
            <path d="M11 6a3 3 0 0 1-3 3H2" />
          </svg>
        );
      case 'laundry':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <rect height="18" rx="2" width="16" x="4" y="3" />
            <circle cx="12" cy="13" r="4" />
            <circle cx="8" cy="6" r="1" />
            <circle cx="11" cy="6" r="1" />
          </svg>
        );
      case 'business':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <rect height="14" rx="2" width="20" x="2" y="7" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        );
      case 'pets':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <ellipse cx="8.5" cy="6" rx="2" ry="2.5" />
            <ellipse cx="15.5" cy="6" rx="2" ry="2.5" />
            <ellipse cx="4.5" cy="11" rx="2" ry="2.5" />
            <ellipse cx="19.5" cy="11" rx="2" ry="2.5" />
            <path d="M12 11c-2.6 0-5 1.7-5 4.5 0 2.3 2.1 4.5 5 4.5s5-2.2 5-4.5c0-2.8-2.4-4.5-5-4.5z" />
          </svg>
        );
      case 'room-service':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <circle cx="12" cy="3" r="1" />
          </svg>
        );
      case 'restaurant':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 2v20" />
            <path d="M18 8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v2h15V8Z" />
            <path d="M6 2v6" />
          </svg>
        );
      case 'shuttle':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
          </svg>
        );
      case 'fitness':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" x2="22" y1="12" y2="12" />
            <line x1="18" x2="22" y1="16" y2="16" />
            <path d="M2 12h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2v-4z" />
            <line x1="2" x2="22" y1="2" y2="22" />
          </svg>
        );
    }
  };

  return (
    <section className="mt-12 sm:mt-20" data-purpose="amenities-and-comforts">
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#ded9ce]/70 backdrop-blur-sm text-xs font-semibold text-neutral-800 shadow-sm mb-2.5 sm:mb-3">
          <span className="text-orange-500">✦</span>
          <span>Thoughtful comforts</span>
        </div>
        <h2 className="font-bold text-xl md:text-2xl text-neutral-900 text-title-smooth tracking-tight">
          Designed for effortless living
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 sm:mt-1.5 max-w-md px-2">
          Experience seamless hospitality with premium amenities tailored for relaxation, prayer, and comfort.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
        {AMENITIES.map((amenity) => (
          <div
            key={amenity.id}
            id={`amenity-${amenity.id}`}
            onClick={() => setSelectedAmenity(amenity)}
            className="bg-[#f5f4ef] hover:bg-white active:scale-95 p-3 sm:p-4 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:shadow-md group border border-neutral-200/60 justify-center min-h-[110px] sm:min-h-[118px] cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#dedad0] group-hover:bg-orange-500 text-neutral-800 group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-1.5 sm:mb-2 shrink-0">
              {renderIcon(amenity.iconName)}
            </div>
            <h3 className="font-bold text-xs text-neutral-900 leading-tight">
              {amenity.title}
            </h3>
            <p className="text-[10px] text-neutral-500 mt-0.5 leading-snug">
              {amenity.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Amenity Detail Modal */}
      {selectedAmenity && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedAmenity(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-neutral-200 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedAmenity(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center text-sm cursor-pointer"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 mx-auto flex items-center justify-center mb-3">
              {renderIcon(selectedAmenity.iconName)}
            </div>
            <h4 className="font-bold text-lg text-neutral-900 mb-1">{selectedAmenity.title}</h4>
            <span className="inline-block text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full mb-3">
              {selectedAmenity.subtitle}
            </span>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {selectedAmenity.description}
            </p>
            <button
              type="button"
              onClick={() => setSelectedAmenity(null)}
              className="mt-5 w-full py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
