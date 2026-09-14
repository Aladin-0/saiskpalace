import { useState, useRef, useEffect } from 'react';
import { SearchParams } from '../types';

interface HeroSectionProps {
  searchParams: SearchParams;
  onUpdateParams: (params: Partial<SearchParams>) => void;
  onSearch: () => void;
}

export function HeroSection({
  searchParams,
  onUpdateParams,
  onSearch
}: HeroSectionProps) {
  const [activeDropdown, setActiveDropdown] = useState<'destination' | 'dates' | 'guests' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
  };

  const calculateNights = (inDate: string, outDate: string) => {
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 1;
    const diff = d2.getTime() - d1.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  };

  const whatsappMsg = encodeURIComponent(
    `Hi, I would like to check availability for a booking.\n` +
    `Destination: ${searchParams.destination}\n` +
    `Dates: ${searchParams.checkIn} - ${searchParams.checkOut}\n` +
    `Guests: ${searchParams.adults} Adults${searchParams.children > 0 ? `, ${searchParams.children} Children` : ''}\n` +
    `Rooms: ${searchParams.rooms}`
  );

  const destinations = [
    { name: 'Shirdi, Maharashtra', note: 'Opposite Gate 2, Temple Walk' },
    { name: 'Dwarkamai Precinct, Shirdi', note: '3 Min walk to Sacred Fire' },
    { name: 'Sainagar Station Road', note: 'Quiet suburban retreat' },
    { name: 'Pimpalwadi Road, Shirdi', note: 'Direct highway bypass access' }
  ];

  return (
    <section className="mt-4 sm:mt-6 mb-10 sm:mb-16 text-center relative" data-purpose="hero-header">
      {/* Pre-headline caption */}
      <p className="text-xs sm:text-sm font-medium text-neutral-700 tracking-tight mb-1.5 sm:mb-2">
        Unforgettable stays await on
      </p>

      {/* Editorial Headline */}
      <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-8xl lg:text-[104px] text-neutral-900 font-hero tracking-tighter leading-[1.05] sm:leading-none mb-5 sm:mb-8 select-none">
        Sai Sk Palace
      </h1>

      {/* Hero Visual Banner Container */}
      <div className="relative w-full">
        <div className="relative w-full rounded-2xl sm:rounded-3xl md:rounded-[36px] overflow-hidden shadow-xl sm:shadow-2xl h-[260px] xs:h-[300px] sm:h-[440px] md:h-[480px]">
          {/* Hero Background Image */}
          <img
            alt="Luxury Hotel Suite Bedroom at Sai Sk Palace"
            className="w-full h-full object-cover object-center sm:object-[center_60%] lg:object-[center_60%] transform hover:scale-105 transition-transform duration-700 ease-out"
            src="/images/hotel.jpeg"
            loading="eager"
          />
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Quick status pill inside hero */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10 flex items-center gap-2 bg-black/50 backdrop-blur-md text-white px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium border border-white/20 max-w-[90%] truncate">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
            <span className="truncate">Accepting Pilgrim Reservations for 2025/2026</span>
          </div>
        </div>

        {/* Floating Search Console - Overlaps slightly on mobile and sits half-floating on desktop */}
        <div
          ref={dropdownRef}
          className="relative -mt-10 sm:-mt-0 sm:absolute sm:-bottom-7 md:-bottom-8 sm:inset-x-8 max-w-4xl mx-auto z-20 px-2 sm:px-0"
          data-purpose="floating-search"
        >
          <div className="bg-white/95 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl sm:rounded-full shadow-2xl border border-white/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1 sm:gap-2 relative divide-y divide-neutral-100 sm:divide-y-0">
            
            {/* 1. Destination Field */}
            <div className="relative flex-1">
              <button
                id="search-dest-btn"
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'destination' ? null : 'destination')}
                className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 text-left hover:bg-neutral-50 rounded-xl sm:rounded-full transition cursor-pointer"
              >
                <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <div className="min-w-0">
                  <span className="block text-[9px] uppercase tracking-wider text-neutral-400 font-bold">
                    City or Destination
                  </span>
                  <span className="text-xs font-bold text-neutral-900 truncate block">
                    {searchParams.destination}
                  </span>
                </div>
              </button>

              {/* Destination Dropdown */}
              {activeDropdown === 'destination' && (
                <div className="absolute top-full left-0 right-0 sm:right-auto sm:w-72 mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-3 z-50 text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Select Sanctuary Location</p>
                  <div className="space-y-1">
                    {destinations.map((d) => (
                      <button
                        key={d.name}
                        type="button"
                        onClick={() => {
                          onUpdateParams({ destination: d.name });
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex flex-col ${
                          searchParams.destination === d.name ? 'bg-orange-50 text-orange-600 font-bold' : 'hover:bg-neutral-50 text-neutral-800'
                        }`}
                      >
                        <span>{d.name}</span>
                        <span className="text-[10px] text-neutral-400 font-normal">{d.note}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Booking Dates Field */}
            <div className="relative flex-1 sm:border-x sm:border-neutral-200">
              <button
                id="search-dates-btn"
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'dates' ? null : 'dates')}
                className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 text-left hover:bg-neutral-50 rounded-xl sm:rounded-full transition cursor-pointer"
              >
                <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <div className="min-w-0">
                  <span className="block text-[9px] uppercase tracking-wider text-neutral-400 font-bold">
                    Booking Dates
                  </span>
                  <span className="text-xs font-bold text-neutral-900 truncate block">
                    {formatDate(searchParams.checkIn)} – {formatDate(searchParams.checkOut)}
                  </span>
                </div>
              </button>

              {/* Dates Popover */}
              {activeDropdown === 'dates' && (
                <div className="absolute top-full left-0 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-80 mt-3 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-neutral-100/80 p-5 z-50 text-left backdrop-blur-xl animate-in fade-in zoom-in duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-400">Select Dates</p>
                    <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-full">
                      {calculateNights(searchParams.checkIn, searchParams.checkOut)} Night{calculateNights(searchParams.checkIn, searchParams.checkOut) > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="flex gap-3 mb-5">
                    <div className="flex-1 bg-neutral-50 rounded-2xl p-3 border border-neutral-100 transition-colors focus-within:border-orange-300 focus-within:bg-orange-50/30">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide block mb-1.5">Check-in</label>
                      <input
                        type="date"
                        value={searchParams.checkIn}
                        onChange={(e) => onUpdateParams({ checkIn: e.target.value })}
                        onClick={(e) => {
                          try {
                            (e.target as HTMLInputElement).showPicker();
                          } catch (err) {}
                        }}
                        className="w-full text-sm font-bold text-neutral-900 bg-transparent focus:outline-none cursor-pointer"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div className="flex-1 bg-neutral-50 rounded-2xl p-3 border border-neutral-100 transition-colors focus-within:border-orange-300 focus-within:bg-orange-50/30">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide block mb-1.5">Check-out</label>
                      <input
                        type="date"
                        value={searchParams.checkOut}
                        onChange={(e) => onUpdateParams({ checkOut: e.target.value })}
                        onClick={(e) => {
                          try {
                            (e.target as HTMLInputElement).showPicker();
                          } catch (err) {}
                        }}
                        className="w-full text-sm font-bold text-neutral-900 bg-transparent focus:outline-none cursor-pointer"
                        min={searchParams.checkIn || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(null)}
                    className="w-full py-3 bg-orange-500 text-white rounded-2xl text-sm font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 active:scale-[0.98]"
                  >
                    Confirm Dates
                  </button>
                </div>
              )}
            </div>

            {/* 3. Guests & Rooms Field */}
            <div className="relative flex-1">
              <button
                id="search-guests-btn"
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'guests' ? null : 'guests')}
                className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 text-left hover:bg-neutral-50 rounded-xl sm:rounded-full transition cursor-pointer"
              >
                <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <div className="min-w-0">
                  <span className="block text-[9px] uppercase tracking-wider text-neutral-400 font-bold">
                    Guest &amp; Rooms
                  </span>
                  <span className="text-xs font-bold text-neutral-900 truncate block">
                    {searchParams.adults} Adults, {searchParams.rooms} Room{searchParams.rooms > 1 ? 's' : ''}
                    {searchParams.children > 0 ? `, ${searchParams.children} Child` : ''}
                  </span>
                </div>
              </button>

              {/* Guests Dropdown */}
              {activeDropdown === 'guests' && (
                <div className="absolute top-full left-0 right-0 sm:left-auto sm:right-0 sm:w-64 mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-4 z-50 text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-3">Guests &amp; Suites</p>
                  
                  {/* Adults */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xs font-bold text-neutral-800 block">Adults</span>
                      <span className="text-[10px] text-neutral-400">Ages 13 or above</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={searchParams.adults <= 1}
                        onClick={() => onUpdateParams({ adults: Math.max(1, searchParams.adults - 1) })}
                        className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center text-xs disabled:opacity-30 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{searchParams.adults}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateParams({ adults: searchParams.adults + 1 })}
                        className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center text-xs cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xs font-bold text-neutral-800 block">Rooms</span>
                      <span className="text-[10px] text-neutral-400">Suites / deluxe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={searchParams.rooms <= 1}
                        onClick={() => onUpdateParams({ rooms: Math.max(1, searchParams.rooms - 1) })}
                        className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center text-xs disabled:opacity-30 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{searchParams.rooms}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateParams({ rooms: searchParams.rooms + 1 })}
                        className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center text-xs cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(null)}
                      className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-semibold hover:bg-orange-600 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit CTA Button */}
            <a
              id="search-submit-btn"
              href={`https://wa.me/917350049191?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book Now"
              className="w-full sm:w-11 h-11 rounded-xl sm:rounded-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white flex items-center justify-center shrink-0 transition-all shadow-md mt-1 sm:mt-0 cursor-pointer gap-2"
            >
              <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <span className="sm:hidden font-bold text-xs">Book Now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
