import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenBooking: () => void;
}

export function Header({ onOpenMenu, onOpenBooking }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isRoomDetailsPage = location.pathname.startsWith('/room/');
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // All hooks MUST be called before any early return (React Rules of Hooks)
  const [searchQuery, setSearchQuery] = useState('');
  const [rooms, setRooms] = useState<any[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(console.error);

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Safe to return null after all hooks have been called
  if (isAdminPage) return null;

  const suggestions = searchQuery.trim() === '' ? [] : rooms.filter(r => 
    r.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.features?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.bedType?.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
    if (searchQuery.trim()) {
      navigate(`/rooms?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/rooms`);
    }
  };

  return (
    <>
    <header
      className="sticky top-0 z-50 bg-[#ebe8e1]/85 backdrop-blur-xl border-b border-white/40 py-2 sm:py-3 mb-4 sm:mb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10 xl:-mx-16 xl:px-16 transition-all duration-300"
      data-purpose="site-navigation"
    >
      <div className="flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center flex-shrink-0">
          <Link
            id="nav-brand-logo"
            aria-label="Sai Sk Palace Home"
            className="flex items-center gap-2 text-neutral-900 group select-none"
            to="/"
          >
            <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#c25a1b] to-orange-400 shadow-md shadow-[#c25a1b]/20 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 rounded-full border border-white/20"></div>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-current drop-shadow-sm" viewBox="0 0 24 24">
                <path d="M12 2L2 22h20L12 2z" />
              </svg>
            </div>
            <span className="font-display font-black text-sm sm:text-base text-neutral-900 tracking-tight whitespace-nowrap group-hover:text-[#c25a1b] transition-colors">
              Sai Sk Palace
            </span>
          </Link>
        </div>

        {/* Center: Search / Filter Pill (Desktop & Tablet, plus Mobile overlay) */}
        <div ref={searchRef} className={`${isMobileSearchOpen ? 'flex absolute top-[calc(100%+0.5rem)] left-4 right-4 z-[100] shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full bg-white border border-neutral-100' : 'hidden md:flex flex-1 max-w-[400px] lg:max-w-[480px] mx-auto relative'} group z-50`}>
          <form onSubmit={handleSearch} className={`w-full flex items-center justify-between ${isMobileSearchOpen ? 'bg-transparent p-1.5' : 'bg-white/70 hover:bg-white backdrop-blur-md rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-white/60 p-1.5 transition-all duration-300 ' + (isSearchFocused ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]' : 'hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]')}`}>
            <input 
              type="text" 
              placeholder="Search rooms, beds, features..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full bg-transparent border-0 border-transparent outline-none focus:outline-none focus:ring-0 focus:border-transparent shadow-none text-[12px] font-bold text-neutral-800 px-4 placeholder:font-medium placeholder:text-neutral-400"
              style={{ boxShadow: 'none' }}
            />
            <button type="submit" className="w-8 h-8 rounded-full bg-[#c25a1b] flex items-center justify-center text-white shrink-0 hover:bg-[#a84717] transition-all shadow-sm active:scale-95" aria-label="Search">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {isSearchFocused && searchQuery.trim() !== '' && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-neutral-100 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              {suggestions.length > 0 ? (
                <div>
                  <div className="px-4 py-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Suggested Rooms</div>
                  {suggestions.map(room => (
                    <div 
                      key={room.id}
                      onClick={() => {
                        setIsSearchFocused(false);
                        navigate(`/room/${room.id}`);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 cursor-pointer transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                        <img src={(room.images && room.images.length > 0) ? room.images[0] : (room.image || '/images/room3.jpeg')} alt={room.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-neutral-900 truncate">{room.title}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                          <span className="font-semibold text-[#c25a1b]">₹{room.price?.toLocaleString('en-IN')}</span>
                          <span>•</span>
                          <span className="truncate">{room.bedType || 'Room'}</span>
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-neutral-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                  <div 
                    onClick={handleSearch as any}
                    className="mt-1 px-4 py-3 border-t border-neutral-100 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition-colors group"
                  >
                    <span className="text-xs font-bold text-[#c25a1b]">See all results for "{searchQuery}"</span>
                    <svg className="w-4 h-4 text-[#c25a1b] transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm font-bold text-neutral-800">No rooms found</p>
                  <p className="text-xs text-neutral-500 mt-1">Try searching for "suite" or "AC"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
          
          {/* Mobile Search Toggle */}
          <button onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} className="md:hidden w-8 h-8 rounded-full bg-white/60 backdrop-blur-md border border-white/50 flex items-center justify-center text-neutral-700 shadow-sm active:scale-95 transition-all" aria-label="Search">
            {isMobileSearchOpen ? (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            )}
          </button>

          {/* Rooms Link (Desktop) */}
          <Link 
            to="/rooms" 
            className="hidden md:inline-flex items-center justify-center bg-[#c25a1b] hover:bg-[#a84717] text-white text-[11px] font-bold px-4 py-2.5 rounded-full transition-all shadow-sm shadow-[#c25a1b]/20 active:scale-95"
          >
            Our Rooms
          </Link>

          {/* Call CTA (Desktop) */}
          <a
            id="nav-btn-call"
            className="hidden md:inline-flex group bg-neutral-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all shadow-sm shadow-neutral-900/20 items-center gap-2 active:scale-95"
            href="tel:+917350049191"
            title="Call Hotel: +91 7350049191"
            aria-label="Call +91 7350049191"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-20"></div>
              <svg className="w-3.5 h-3.5 text-orange-400 group-hover:text-orange-300 transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.053 15.053 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 3.99c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
              </svg>
            </div>
            <span className="tracking-wide">+91 7350049191</span>
          </a>
        </div>
      </div>
    </header>

      {/* Mobile Bottom Floating Navigation Pill (Hidden on Room Details Page) */}
      {!isRoomDetailsPage && (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] z-[100] bg-white/90 backdrop-blur-2xl border border-white/60 p-2 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex items-center justify-between">
        
        {/* Home */}
        <Link to="/" className="flex-1 flex flex-col items-center justify-center gap-0.5 text-neutral-400 hover:text-[#c25a1b] transition-all active:scale-95 group">
          <div className="p-1.5 rounded-full transition-colors group-hover:bg-orange-50">
            <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 group-hover:text-[#c25a1b]">Home</span>
        </Link>
        
        {/* Call Now (Center Prominent) */}
        <a href="tel:+917350049191" className="relative flex-shrink-0 -mt-8 group active:scale-95 transition-transform z-10 px-2">
          <div className="absolute inset-0 bg-[#c25a1b]/20 rounded-full blur-md group-hover:bg-[#c25a1b]/40 transition-colors"></div>
          <div className="relative bg-gradient-to-tr from-[#c25a1b] to-[#ff7b29] w-[52px] h-[52px] rounded-full border-4 border-[#ebe8e1] flex items-center justify-center text-white shadow-xl group-hover:shadow-[#c25a1b]/30">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.053 15.053 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 3.99c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
            </svg>
          </div>
        </a>

        {/* Rooms */}
        <Link to="/rooms" className="flex-1 flex flex-col items-center justify-center gap-0.5 text-neutral-400 hover:text-[#c25a1b] transition-all active:scale-95 group">
          <div className="p-1.5 rounded-full transition-colors group-hover:bg-orange-50">
            <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 group-hover:text-[#c25a1b]">Rooms</span>
        </Link>
        
        </div>
      )}
    </>
  );
}
