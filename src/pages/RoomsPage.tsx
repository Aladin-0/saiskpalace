import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AMENITIES } from '../constants/amenities';

interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  features: string;
  bedType?: string;
  acType?: string;
  image?: string;
  images?: string[];
}

const StarRating = ({ size = 'sm' }: { size?: 'sm' | 'xs' }) => {
  const sz = size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`${sz} text-amber-400`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterBedType, setFilterBedType] = useState('All');
  const [filterAcType, setFilterAcType] = useState('All');
  const [filterMaxPrice, setFilterMaxPrice] = useState('All');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const textQuery = searchParams.get('search') || '';

  const availableBedTypes = ['All', ...Array.from(new Set(rooms.map(r => r.bedType).filter(Boolean))) as string[]];
  const availableAcTypes = ['All', ...Array.from(new Set(rooms.map(r => r.acType).filter(Boolean))) as string[]];
  const availablePrices = ['All', ...Array.from(new Set(rooms.map(r => r.price).filter(Boolean)))].sort((a, b) => {
    if (a === 'All') return -1;
    if (b === 'All') return 1;
    return (a as number) - (b as number);
  });

  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => { setRooms(data); setLoading(false); })
      .catch(err => { console.error('Failed to fetch rooms', err); setLoading(false); });
  }, []);

  const filteredRooms = rooms.filter(room => {
    if (filterBedType !== 'All' && room.bedType !== filterBedType) return false;
    if (filterAcType !== 'All' && room.acType !== filterAcType) return false;
    if (filterMaxPrice !== 'All' && room.price > parseInt(filterMaxPrice)) return false;
    if (textQuery) {
      const q = textQuery.toLowerCase();
      const matchesTitle = room.title?.toLowerCase().includes(q);
      const matchesDesc = room.description?.toLowerCase().includes(q);
      const matchesLoc = room.location?.toLowerCase().includes(q);
      const matchesFeatures = room.features?.toLowerCase().includes(q);
      if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesFeatures) return false;
    }
    return true;
  });

  const hasActiveFilters = filterBedType !== 'All' || filterAcType !== 'All' || filterMaxPrice !== 'All';
  const clearFilters = () => { setFilterBedType('All'); setFilterAcType('All'); setFilterMaxPrice('All'); };

  // All filter pills combined for mobile single-row bar
  const mobileFilterPills = [
    ...availableBedTypes.map(t => ({ label: t === 'All' ? 'All Beds' : t, key: 'bed:' + t, active: filterBedType === t, onClick: () => setFilterBedType(t) })),
    ...availableAcTypes.filter(t => t !== 'All').map(t => ({ label: t, key: 'ac:' + t, active: filterAcType === t, onClick: () => setFilterAcType(t) })),
    ...availablePrices.filter(p => p !== 'All').map(p => ({ label: `Max ₹${p}`, key: 'price:' + p, active: filterMaxPrice === p.toString(), onClick: () => setFilterMaxPrice(p.toString()) })),
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative w-16 h-16 mb-5">
          <div className="absolute inset-0 rounded-full border-4 border-orange-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#c25a1b] animate-spin"></div>
        </div>
        <p className="font-bold text-sm text-neutral-400 uppercase tracking-widest">Curating your options...</p>
      </div>
    );
  }

  return (
    <div className="pb-28 md:pb-8 font-sans text-neutral-900">

      {/* ══════════════════════════════════════════
          MOBILE LAYOUT  (hidden on lg+)
      ══════════════════════════════════════════ */}
      <div className="lg:hidden px-2 py-5 space-y-4 max-w-md mx-auto">

        {/* ── Mobile Hero ── */}
        <section className="relative bg-neutral-900 text-white rounded-3xl p-6 overflow-hidden shadow-xl">
          {/* Warm glow orb */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(194,90,27,0.2)' }}></div>
          {/* Location tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold text-white/60 mb-4 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8844a]"></span>
            Shirdi · India
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 leading-tight">
            Find Your <br />
            <span className="text-[#e8844a]">Perfect Room.</span>
          </h1>
          <p className="text-[11px] text-white/40 mb-6 leading-relaxed">
            Premium accommodations just steps from Shri Sai Baba Samadhi Mandir.
          </p>
          <a
            href="https://wa.me/917350049191"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#c25a1b] to-[#e8844a] text-white font-bold py-3 px-4 rounded-2xl shadow-lg text-sm active:scale-[0.98] transition"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
            </svg>
            Book on WhatsApp
          </a>
        </section>

        {/* ── Mobile Quick Stats ── */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 flex flex-col justify-between">
            <div className="text-neutral-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Rooms</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-neutral-900">{rooms.length}</span>
              <span className="text-[10px] text-neutral-500 font-medium">Available</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 flex flex-col justify-between">
            <div className="text-neutral-400 text-[10px] font-bold uppercase tracking-wider mb-1">Rating</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-neutral-900">5</span>
              <svg className="w-3 h-3 text-amber-400 mb-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span className="text-[10px] text-neutral-500 font-medium">Verified</span>
            </div>
          </div>
        </section>

        {/* ── Mobile Filter Bar (single horizontal scroll row) ── */}
        <section className="relative z-10 -mt-2">
          <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-white/50">
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 px-1" style={{ scrollbarWidth: 'none' }}>
              {/* Active filters indicator */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 bg-[#c25a1b] text-white text-[11px] font-bold px-3.5 py-2 rounded-full flex-shrink-0 shadow-md shadow-[#c25a1b]/20 transition-transform active:scale-95"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                  Clear
                </button>
              )}
              {mobileFilterPills.map(pill => (
                <button
                  key={pill.key}
                  onClick={pill.onClick}
                  className={`text-[11px] font-bold px-4 py-2 rounded-full flex-shrink-0 transition-all active:scale-95 ${
                    pill.active
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'bg-[#f5f2eb] text-neutral-600 border border-transparent hover:border-neutral-200'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mobile Rooms List Header ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-0.5">
            <h2 className="font-bold text-neutral-900 text-base tracking-tight">Available Rooms</h2>
            <span className="text-[11px] text-neutral-500 font-medium">
              Showing {filteredRooms.length} of {rooms.length}
            </span>
          </div>

          {/* ── Mobile Room Cards ── */}
          <div className="flex flex-col gap-4">
            {filteredRooms.map((room, index) => {
              const roomFeatures = Array.isArray(room.features)
                ? room.features
                : (typeof room.features === 'string' ? room.features.split(',').map(f => f.trim()).filter(Boolean) : []);
              const displayAmenities = AMENITIES.filter(a => roomFeatures.includes(a.id)).slice(0, 2);
              const roomImg = (room.images && room.images.length > 0) ? room.images[0] : (room.image || '/images/room3.jpeg');

              return (
                <Link to={`/room/${room.id}`} key={room.id}>
                  <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 flex items-stretch active:scale-[0.98] transition-transform duration-150" style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.07)' }}>

                    {/* Square thumbnail — original h-20 w-20 size */}
                    <div className="relative w-[96px] h-[96px] flex-shrink-0 overflow-hidden">
                      <img
                        alt={room.title}
                        src={roomImg}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                      {/* Room index */}
                      <div className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      {/* Green availability dot */}
                      <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-green-400 border border-white shadow-sm"></div>
                    </div>

                    {/* Content — single row height */}
                    <div className="flex-1 min-w-0 px-3.5 py-3 flex flex-col justify-center gap-1.5">
                      {/* Row 1: title + price */}
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-neutral-900 text-[13px] leading-tight truncate">{room.title}</h3>
                        <span className="shrink-0 font-black text-[#c25a1b] text-[13px] leading-none">
                          ₹{room.price?.toLocaleString('en-IN')}
                          <span className="text-[8px] text-neutral-400 font-normal"> /nt</span>
                        </span>
                      </div>

                      {/* Row 2: stars */}
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-2.5 h-2.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-[9px] text-neutral-400 font-medium ml-1">5.0</span>
                      </div>

                      {/* Row 3: tags */}
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        {room.bedType && (
                          <span className="text-[9px] font-bold bg-orange-50 text-[#c25a1b] px-1.5 py-0.5 rounded-full border border-orange-100 shrink-0">
                            {room.bedType}
                          </span>
                        )}
                        {room.acType && (
                          <span className="text-[9px] font-bold bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded-full border border-sky-100 shrink-0">
                            {room.acType}
                          </span>
                        )}
                        {displayAmenities.map(a => (
                          <span key={a.id} className="text-[9px] font-bold bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded-full shrink-0">
                            {a.title}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Chevron CTA */}
                    <div className="flex items-center pr-3">
                      <div className="w-7 h-7 rounded-xl bg-neutral-900 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile No Results */}
          {rooms.length > 0 && filteredRooms.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-100">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-bold text-neutral-800 mb-1">No rooms match</p>
              <p className="text-xs text-neutral-500 mb-4">Try adjusting your filters.</p>
              <button onClick={clearFilters} className="bg-[#c25a1b] text-white font-bold px-5 py-2.5 rounded-xl text-sm">
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT  (hidden below lg)
      ══════════════════════════════════════════ */}
      <div className="hidden lg:block">

        {/* ━━━ BENTO GRID HERO ━━━ */}
        <div className="max-w-[1500px] mx-auto px-8 pt-6 pb-10">
          <div className="grid grid-cols-[1fr_1fr_320px] gap-4">

            {/* CELL 1 — Editorial Text Block */}
            <div className="bg-neutral-900 rounded-[2rem] p-10 flex flex-col justify-between relative overflow-hidden min-h-[380px]">
              <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(194,90,27,0.35) 0%, transparent 70%)' }}></div>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#c25a1b] to-transparent"></div>
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-white/60 text-[9px] font-bold uppercase tracking-[0.2em]">Shirdi · India</span>
                </div>
                <h1 className="font-display font-bold text-white leading-[1.08]">
                  <span className="block text-5xl">Find Your</span>
                  <span className="block text-5xl text-[#e8844a]">Perfect</span>
                  <span className="block text-5xl" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)', color: 'transparent' }}>Room.</span>
                </h1>
              </div>
              <div>
                <p className="text-white/40 text-xs leading-relaxed mb-6 max-w-[240px]">
                  Premium accommodations just steps from Shri Sai Baba Samadhi Mandir.
                </p>
                <a
                  href="https://wa.me/917350049191"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#c25a1b] hover:bg-[#a84717] text-white font-bold px-5 py-2.5 rounded-full text-xs shadow-lg shadow-[#c25a1b]/30 transition-all hover:-translate-y-0.5"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                  </svg>
                  Book on WhatsApp
                </a>
              </div>
            </div>

            {/* CELL 2 — Feature Room Card */}
            {rooms.length > 0 ? (
              <a
                href={`/room/${rooms[0].id}`}
                onClick={e => { e.preventDefault(); window.location.href = `/room/${rooms[0].id}`; }}
                className="group relative rounded-[2rem] overflow-hidden min-h-[380px] block"
              >
                <img
                  src={(rooms[0].images && rooms[0].images.length > 0) ? rooms[0].images[0] : (rooms[0].image || '/images/room3.jpeg')}
                  alt={rooms[0].title}
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-5 left-5 bg-[#c25a1b] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  Featured Room
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_,i) => <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                  </div>
                  <h2 className="text-white font-bold text-xl leading-snug line-clamp-2 mb-2">{rooms[0].title}</h2>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs">{rooms[0].bedType || 'Premium Suite'}</span>
                    <span className="bg-white/20 backdrop-blur-md text-white font-bold text-sm px-3 py-1 rounded-full">₹{rooms[0].price?.toLocaleString('en-IN')}/night</span>
                  </div>
                </div>
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white/20">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </div>
              </a>
            ) : (
              <div className="rounded-[2rem] bg-neutral-100 border-2 border-dashed border-neutral-200 flex items-center justify-center">
                <p className="text-neutral-400 font-bold text-sm">No rooms yet</p>
              </div>
            )}

            {/* CELL 3 — Right column */}
            <div className="flex flex-col gap-4">
              {rooms.length > 1 ? (
                <a href={`/room/${rooms[1].id}`} onClick={e => { e.preventDefault(); window.location.href=`/room/${rooms[1].id}`; }} className="group relative rounded-2xl overflow-hidden h-[210px] block flex-1">
                  <img
                    src={(rooms[1].images && rooms[1].images.length > 0) ? rooms[1].images[0] : (rooms[1].image || '/images/room3.jpeg')}
                    alt={rooms[1].title}
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-white font-bold text-sm line-clamp-1">{rooms[1].title}</p>
                    <p className="text-white/60 text-[10px] font-bold mt-0.5">₹{rooms[1].price?.toLocaleString('en-IN')}/night</p>
                  </div>
                </a>
              ) : (
                <div className="flex-1 rounded-2xl bg-neutral-100 border-2 border-dashed border-neutral-200 h-[210px]"></div>
              )}
              <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm grid grid-cols-2 gap-3">
                {[
                  { num: rooms.length, label: 'Total Rooms', color: 'text-[#c25a1b]' },
                  { num: '5★', label: 'Rating', color: 'text-amber-500' },
                  { num: '5 min', label: 'To Temple', color: 'text-neutral-900' },
                  { num: '24/7', label: 'Support', color: 'text-green-600' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className={`font-display font-bold text-xl ${s.color} leading-none`}>{s.num}</p>
                    <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="relative z-10 bg-[#ebe8e1] pt-2">
        <div className="max-w-[1500px] mx-auto px-8">

          {/* ━━━ Filter System ━━━ */}
          <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.05)] border border-neutral-100 mb-10 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#c25a1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="font-bold text-sm text-neutral-700">Refine Your Search</span>
              </div>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 hover:text-[#c25a1b] transition-colors px-3 py-1.5 rounded-full hover:bg-orange-50">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  RESET ALL
                </button>
              )}
            </div>

            <div className="px-6 py-5 grid grid-cols-3 gap-6 relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-orange-50 to-transparent rounded-full -translate-y-1/3 translate-x-1/3 opacity-70 pointer-events-none"></div>

              {/* Bed Type */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center text-[#c25a1b]">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Bed Type</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableBedTypes.map(type => (
                    <button key={type} onClick={() => setFilterBedType(type)}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 border ${filterBedType === type ? 'bg-[#c25a1b] text-white border-[#c25a1b] shadow-md shadow-[#c25a1b]/25 scale-[1.03]' : 'bg-transparent text-neutral-500 border-neutral-200 hover:border-[#c25a1b]/40 hover:text-[#c25a1b] hover:bg-orange-50/40'}`}
                    >
                      {type === 'All' ? 'Any Bed' : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* AC Status */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">AC Status</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableAcTypes.map(type => (
                    <button key={type} onClick={() => setFilterAcType(type)}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 border ${filterAcType === type ? 'bg-[#c25a1b] text-white border-[#c25a1b] shadow-md shadow-[#c25a1b]/25 scale-[1.03]' : 'bg-transparent text-neutral-500 border-neutral-200 hover:border-[#c25a1b]/40 hover:text-[#c25a1b] hover:bg-orange-50/40'}`}
                    >
                      {type === 'All' ? 'Any AC' : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Max Price</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availablePrices.map(price => (
                    <button key={price} onClick={() => setFilterMaxPrice(price.toString())}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 border ${filterMaxPrice === price.toString() ? 'bg-[#c25a1b] text-white border-[#c25a1b] shadow-md shadow-[#c25a1b]/25 scale-[1.03]' : 'bg-transparent text-neutral-500 border-neutral-200 hover:border-[#c25a1b]/40 hover:text-[#c25a1b] hover:bg-orange-50/40'}`}
                    >
                      {price === 'All' ? 'Any Price' : `Max ₹${price}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center gap-3 mb-5">
            <p className="text-sm font-bold text-neutral-500">
              Showing <span className="text-neutral-900">{filteredRooms.length}</span> of <span className="text-neutral-900">{rooms.length}</span> rooms
              {hasActiveFilters && <span className="text-[#c25a1b]"> (filtered)</span>}
            </p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-[10px] font-bold text-[#c25a1b] hover:underline">Clear filters</button>
            )}
          </div>

          {/* ━━━ Desktop Room Cards ━━━ */}
          <div className="flex flex-col gap-5">
            {filteredRooms.map((room, index) => {
              const roomFeatures = Array.isArray(room.features)
                ? room.features
                : (typeof room.features === 'string' ? room.features.split(',').map(f => f.trim()).filter(Boolean) : []);
              const displayAmenities = AMENITIES.filter(a => roomFeatures.includes(a.id)).slice(0, 5);
              const roomImg = (room.images && room.images.length > 0) ? room.images[0] : (room.image || '/images/room3.jpeg');

              return (
                <Link to={`/room/${room.id}`} key={room.id} className="group block">
                  <article className="bg-white rounded-3xl border border-neutral-100 overflow-hidden flex flex-row shadow-sm group-hover:shadow-2xl group-hover:shadow-black/[0.08] group-hover:border-neutral-200 transition-all duration-500 group-hover:-translate-y-1.5">
                    {/* Image Panel */}
                    <div className="w-[38%] min-h-full relative flex-shrink-0 overflow-hidden">
                      <img
                        alt={room.title}
                        src={roomImg}
                        loading="lazy"
                        className="w-full h-full absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 pointer-events-none"></div>
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-2xl shadow-lg">
                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-wide leading-none mb-0.5">Per night</p>
                        <p className="text-base font-display font-bold text-[#c25a1b] leading-none">₹{room.price?.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white text-[10px] font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-green-600 text-white px-3 py-1.5 rounded-full text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse"></span>
                        Available
                      </div>
                    </div>

                    {/* Content Panel */}
                    <div className="flex-1 p-7 flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            {room.location && (
                              <span className="inline-flex items-center gap-1 bg-orange-50 text-[#c25a1b] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#c25a1b]/15">
                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                {room.location}
                              </span>
                            )}
                            {room.bedType && <span className="text-[9px] font-bold bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full uppercase tracking-wider">{room.bedType}</span>}
                            {room.acType && <span className="text-[9px] font-bold bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full uppercase tracking-wider border border-sky-100">{room.acType}</span>}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100 shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                            Available
                          </div>
                        </div>
                        <h2 className="font-display font-bold text-2xl text-neutral-900 leading-snug mb-2 group-hover:text-[#c25a1b] transition-colors duration-300">
                          {room.title}
                        </h2>
                        <StarRating />
                        <p className="text-[12px] text-neutral-500 leading-relaxed mt-3 line-clamp-2">
                          {room.description || "Experience the pinnacle of spiritual luxury featuring premium amenities perfectly situated for your Shirdi darshan visit."}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-100">
                        <div className="flex flex-wrap gap-2">
                          {displayAmenities.map(amenity => (
                            <div key={amenity.id} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#f9f6f1] rounded-xl border border-neutral-200/60 text-[10px] font-bold text-neutral-600 group-hover:border-orange-200/60 transition-colors">
                              <svg className="w-3 h-3 text-[#c25a1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={amenity.icon} />
                              </svg>
                              {amenity.title}
                            </div>
                          ))}
                          {displayAmenities.length === 0 && <span className="text-[11px] text-neutral-400 italic">No amenities listed</span>}
                        </div>
                        <div className="shrink-0">
                          <div className="flex items-center gap-2 bg-[#c25a1b] group-hover:bg-[#a84717] text-white text-[11px] font-bold px-5 py-2.5 rounded-xl shadow-md shadow-[#c25a1b]/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#c25a1b]/30 group-hover:-translate-y-0.5">
                            View Details
                            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {/* No Results */}
          {rooms.length > 0 && filteredRooms.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-neutral-100 shadow-sm mt-4">
              <div className="text-5xl mb-5">🔍</div>
              <p className="font-bold text-xl text-neutral-800 mb-2">No rooms match your filters</p>
              <p className="text-sm text-neutral-500 mb-6">Try adjusting your search criteria to see more options.</p>
              <button onClick={clearFilters} className="bg-[#c25a1b] text-white font-bold px-7 py-3 rounded-xl shadow-md shadow-[#c25a1b]/25 hover:bg-[#a84717] transition-all">
                Clear All Filters
              </button>
            </div>
          )}

          {/* Trust Footer */}
          {filteredRooms.length > 0 && (
            <div className="mt-14 pt-10 border-t border-neutral-200">
              <div className="grid grid-cols-4 gap-6">
                {[
                  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Verified Clean', desc: 'Sanitized daily' },
                  { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', title: '24/7 Support', desc: 'Always available' },
                  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Near Shirdi Sai Temple', desc: '5 min walk' },
                  { icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', title: 'Instant Booking', desc: 'WhatsApp confirm' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-[#c25a1b] flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-[12px] text-neutral-800">{item.title}</p>
                      <p className="text-[11px] text-neutral-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>{/* max-w */}
        </div>{/* bg-ebe8e1 */}
      </div>{/* hidden lg:block */}
    </div>
  );
}
