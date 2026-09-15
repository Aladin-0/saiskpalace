import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
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

const StarRating = () => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="text-xs font-bold text-neutral-500 ml-1">5.0 · Exceptional</span>
  </div>
);

export function RoomDetailsPage() {
  const { id } = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [suggestedRooms, setSuggestedRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const bookingCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetch(`/api/rooms/${id}`)
      .then(res => { if (!res.ok) throw new Error('Not found'); return res.json(); })
      .then(data => {
        setRoom(data);
        setActiveImage((data.images && data.images.length > 0) ? data.images[0] : (data.image || '/images/room3.jpeg'));
        fetch('/api/rooms')
          .then(res => res.json())
          .then(allRooms => {
            const others = allRooms.filter((r: Room) => r.id !== id);
            setSuggestedRooms(others.sort(() => 0.5 - Math.random()).slice(0, 3));
            setLoading(false);
          });
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-orange-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#c25a1b] animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-[#c25a1b]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        </div>
        <p className="font-bold text-sm text-neutral-500 uppercase tracking-widest">Curating Your Experience...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center py-32">
        <p className="text-6xl mb-6">🏨</p>
        <h2 className="text-3xl font-bold text-neutral-800 mb-4">Room Not Found</h2>
        <Link to="/rooms" className="inline-flex items-center gap-2 bg-[#c25a1b] text-white font-bold px-6 py-3 rounded-full hover:bg-[#a04612] transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to All Rooms
        </Link>
      </div>
    );
  }

  const roomFeatures = Array.isArray(room.features) ? room.features : (typeof room.features === 'string' ? room.features.split(',').map(f => f.trim()).filter(Boolean) : []);
  const displayAmenities = AMENITIES.filter(a => roomFeatures.includes(a.id));
  const images = (room.images && room.images.length > 0) ? room.images : [room.image || '/images/room3.jpeg'];
  const whatsappMsg = encodeURIComponent(
    `Hi, I wanted this room and I've seen it on your website at this price:\n\n` +
    `*Room:* ${room.title}\n` +
    `*Price:* ₹${room.price?.toLocaleString('en-IN')}/night\n\n` +
    `Please confirm the availability.`
  );

  return (
    <div className="font-sans text-neutral-900">

      {/* ━━━ Lightbox ━━━ */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 rounded-full p-2 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <img src={activeImage} alt={room.title} className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()} />
        </div>
      )}

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">

        {/* ━━━ Breadcrumb ━━━ */}
        <nav className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4 sm:mb-5 overflow-x-auto whitespace-nowrap pb-1 hide-scrollbar">
          <Link to="/" className="hover:text-[#c25a1b] transition-colors shrink-0">Home</Link>
          <svg className="w-3 h-3 opacity-40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          <Link to="/rooms" className="hover:text-[#c25a1b] transition-colors shrink-0">Our Rooms</Link>
          <svg className="w-3 h-3 opacity-40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          <span className="text-neutral-700 truncate max-w-[240px]">{room.title}</span>
        </nav>

        {/* ━━━ Hero Gallery ━━━ */}

        {/* MOBILE: Single column — main photo + horizontal thumb strip */}
        <div className="lg:hidden mb-6">
          <div className="h-[280px] sm:h-[360px] rounded-[2rem] overflow-hidden relative group cursor-zoom-in shadow-lg shadow-black/10 mb-4" onClick={() => setLightboxOpen(true)}>
            <img src={activeImage} alt={room.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest shadow-lg pointer-events-none">
              1 / {images.length}
            </div>
          </div>
          
          {images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-2 snap-x hide-scrollbar">
              {images.map((img, idx) => (
                <button key={idx} onClick={() => setActiveImage(img)}
                  className={`snap-start flex-shrink-0 w-[100px] h-[70px] rounded-[1rem] overflow-hidden relative transition-all ring-2 ${activeImage === img ? 'ring-[#c25a1b] shadow-md shadow-[#c25a1b]/20 scale-[0.97]' : 'ring-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DESKTOP: Original 2-column gallery with vertical thumbnail sidebar */}
        <div className="hidden lg:grid grid-cols-[1fr_320px] gap-4 mb-12 h-[580px]">
          {/* Main Photo */}
          <div className="h-full rounded-[2rem] overflow-hidden relative group cursor-zoom-in shadow-xl shadow-black/10" onClick={() => setLightboxOpen(true)}>
            <img src={activeImage} alt={room.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Sai Sk Palace · Shirdi</p>
              <h1 className="text-white font-bold text-3xl leading-snug drop-shadow-lg line-clamp-2">{room.title}</h1>
            </div>
            <div className="absolute top-5 right-5 bg-black/50 backdrop-blur-md text-white rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all pointer-events-none flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
              View Full
            </div>
          </div>
          {/* Vertical Thumbnail Stack */}
          <div className="flex flex-col gap-3 overflow-y-auto">
            {images.map((img, idx) => (
              <button key={idx} onClick={() => setActiveImage(img)}
                className={`flex-shrink-0 w-full flex-1 rounded-2xl overflow-hidden relative transition-all duration-300 ring-2 ${activeImage === img ? 'ring-[#c25a1b] shadow-lg shadow-[#c25a1b]/25 scale-[0.97]' : 'ring-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]'}`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                {activeImage === img && <div className="absolute inset-0 bg-[#c25a1b]/10 flex items-center justify-center"><div className="w-3 h-3 rounded-full bg-[#c25a1b] shadow-lg"></div></div>}
              </button>
            ))}
            {images.length === 1 && [1, 2].map(i => (
              <div key={i} className="flex-1 rounded-2xl bg-neutral-100 border-2 border-dashed border-neutral-200"></div>
            ))}
          </div>
        </div>

        {/* ━━━ Body: 2 Col on desktop, 1 col on mobile ━━━ */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">

          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0">

            {/* Title & Rating */}
            <div className="flex flex-col gap-3 mb-6">
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-4xl text-neutral-900 leading-tight">
                {room.title}
              </h1>
              <div className="flex items-center gap-3">
                 <StarRating />
                 <span className="inline-flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded border border-amber-100 text-[10px] text-amber-700 font-bold uppercase tracking-widest">Exceptional</span>
              </div>
            </div>

            {/* Tags (Bed, AC, Location) */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-8">
              <span className="inline-flex items-center gap-1.5 bg-orange-50 text-[#c25a1b] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#c25a1b]/20">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {room.location || 'Shirdi, Maharashtra'}
              </span>
              {room.bedType && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-50 text-neutral-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-neutral-200/60">
                  <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                  {room.bedType}
                </span>
              )}
              {room.acType && (
                <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-sky-100">
                  <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  {room.acType}
                </span>
              )}
            </div>

            {/* Divider Desktop Only */}
            <div className="hidden lg:flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-neutral-200"></div>
              <div className="w-2 h-2 rounded-full bg-[#c25a1b] opacity-40"></div>
              <div className="flex-1 h-px bg-neutral-200"></div>
            </div>

            {/* About Section */}
            <section className="mb-10">
              <h2 className="text-sm lg:text-lg font-black lg:font-bold text-neutral-900 lg:text-neutral-800 mb-3 lg:mb-4 uppercase tracking-widest lg:normal-case lg:tracking-normal flex items-center gap-2.5">
                <span className="hidden lg:block w-1 h-5 rounded-full bg-[#c25a1b]"></span>
                About This Room
              </h2>
              <p className="text-neutral-600 leading-[1.9] text-[15px]">
                {room.description || "Experience the pinnacle of spiritual luxury at Sai Sk Palace, Shirdi. This premium room features handcrafted furnishings and all modern comforts, designed for the discerning devotee who seeks both tranquility and elegance during their sacred stay in Shirdi."}
              </p>
            </section>

            {/* Highlights Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-10">
              {[
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Verified Clean', sub: 'Sanitized daily' },
                { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Instant Confirm', sub: 'Via WhatsApp' },
                { icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', label: 'Top-Rated', sub: '5 stars · Shirdi' },
              ].map((h, i) => (
                <div key={i} className={`bg-neutral-50 lg:bg-white rounded-2xl p-4 border border-neutral-100 shadow-none lg:shadow-sm flex flex-col items-start lg:items-center lg:text-center ${i === 2 ? 'hidden sm:flex' : ''}`}>
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-orange-100/50 lg:bg-orange-50 flex items-center justify-center text-[#c25a1b] lg:mx-auto mb-2 lg:mb-3">
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={h.icon} />
                    </svg>
                  </div>
                  <p className="font-bold text-[12px] text-neutral-900">{h.label}</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{h.sub}</p>
                </div>
              ))}
            </div>

            {/* Amenities Section */}
            {displayAmenities.length > 0 && (
              <section className="mb-10">
                <h2 className="text-sm lg:text-lg font-black lg:font-bold text-neutral-900 lg:text-neutral-800 mb-4 lg:mb-5 uppercase tracking-widest lg:normal-case lg:tracking-normal flex items-center gap-2.5">
                  <span className="hidden lg:block w-1 h-5 rounded-full bg-[#c25a1b]"></span>
                  Premium Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  {displayAmenities.map(amenity => (
                    <div key={amenity.id} className="group flex items-center gap-3 p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:border-[#c25a1b]/20 transition-all duration-300 cursor-default">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 flex items-center justify-center text-[#c25a1b] flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={amenity.icon} />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-neutral-800">{amenity.title}</p>
                        <p className="text-[10px] text-neutral-400">{amenity.shortDesc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Location Note */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50/40 rounded-3xl p-6 border border-orange-100/60 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#c25a1b] shadow-sm flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-[13px] text-neutral-800 mb-1">Ideally Located in Shirdi</p>
                <p className="text-[12px] text-neutral-600 leading-relaxed">Sai Sk Palace is perfectly situated for devotees visiting Shirdi. Our front desk provides complimentary shuttle escorts and early morning wake-up alerts so you never miss sacred darshan.</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Sticky Booking Card (hidden on mobile, shown as fixed bar instead) */}
          <div className="hidden lg:block w-full lg:w-[360px] flex-shrink-0">
            <div ref={bookingCardRef} className="sticky top-24">

              {/* Price Card */}
              <div className="bg-white rounded-[2rem] shadow-[0_24px_60px_rgba(0,0,0,0.09)] border border-neutral-100 overflow-hidden">

                {/* Card Header: Gradient Banner */}
                <div className="bg-gradient-to-br from-[#c25a1b] via-[#d9692b] to-[#e8844a] px-8 pt-8 pb-10">
                  <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">Rate per night</p>
                  <div className="flex items-end gap-2">
                    <span className="text-white font-display font-bold text-5xl leading-none">₹{room.price?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-white/80 text-[11px] font-bold">Available Now</span>
                  </div>
                </div>

                {/* Curved separator */}
                <div className="h-5 -mt-5 bg-white rounded-t-[2rem]"></div>

                <div className="px-8 pb-8">
                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-neutral-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Room Rate</span>
                      <span className="font-bold text-neutral-800">₹{room.price?.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Taxes & GST</span>
                      <span className="font-bold text-green-600">Included ✓</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Booking Fee</span>
                      <span className="font-bold text-green-600">Free ✓</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-8">
                    <span className="font-bold text-neutral-800">Total</span>
                    <span className="font-display font-bold text-xl text-[#c25a1b]">₹{room.price?.toLocaleString('en-IN')}</span>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={`https://wa.me/917350049191?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-green-500/25 transition-all hover:-translate-y-0.5 text-[15px] mb-3"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Book Now on WhatsApp
                  </a>
                  <p className="text-center text-[10px] text-neutral-400 leading-relaxed">
                    No payment now · Our team confirms instantly
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: '100% Safe Stay' },
                  { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: '24/7 Support' },
                ].map((badge, i) => (
                  <div key={i} className="bg-white rounded-2xl p-3 border border-neutral-100 flex items-center gap-2 shadow-sm">
                    <svg className="w-4 h-4 text-[#c25a1b] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.icon} />
                    </svg>
                    <span className="text-[10px] font-bold text-neutral-700">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ━━━ Mobile Fixed Bottom Booking Console ━━━ */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-[110] bg-white/95 backdrop-blur-2xl border border-white/60 p-2 pl-5 rounded-[2.5rem] shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex items-center justify-between">
          <div className="flex flex-col justify-center">
             <p className="text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest mb-0.5">Price</p>
             <p className="font-display font-bold text-[22px] text-[#c25a1b] leading-none">₹{room.price?.toLocaleString('en-IN')}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="p-2.5 text-neutral-400 hover:text-[#c25a1b] bg-neutral-50 rounded-full active:scale-95 transition-all">
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
            <a
              href={`https://wa.me/917350049191?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#25D366] to-[#20b858] text-white font-bold px-5 py-3 rounded-[2rem] shadow-[0_8px_20px_rgba(37,211,102,0.3)] text-[13px] active:scale-95 transition-transform"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Book Now
            </a>
          </div>
        </div>

        {/* ━━━ Suggested Rooms ━━━ */}
        {suggestedRooms.length > 0 && (
          <div className="mt-10 pt-8 lg:mt-12 lg:pt-10 border-t border-neutral-200">
            <div className="flex items-end justify-between mb-6 sm:mb-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#c25a1b] mb-1.5 sm:mb-2">Explore More</p>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900">You May Also Like</h2>
              </div>
              <Link to="/rooms" className="hidden md:flex items-center gap-2 text-[12px] font-bold text-neutral-500 hover:text-[#c25a1b] transition-colors">
                View All Rooms
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {suggestedRooms.map(sRoom => {
                const sImg = (sRoom.images && sRoom.images.length > 0) ? sRoom.images[0] : (sRoom.image || '/images/room3.jpeg');
                const sFeatures = Array.isArray(sRoom.features) ? sRoom.features : (typeof sRoom.features === 'string' ? sRoom.features.split(',').map(f => f.trim()).filter(Boolean) : []);
                const sAmenities = AMENITIES.filter(a => sFeatures.includes(a.id)).slice(0, 2);
                return (
                  <Link to={`/room/${sRoom.id}`} key={sRoom.id} className="snap-start flex-shrink-0 w-[260px] sm:w-auto group flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="h-[180px] sm:h-[220px] overflow-hidden relative flex-shrink-0">
                      <img src={sImg} alt={sRoom.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#c25a1b] shadow">
                        ₹{sRoom.price?.toLocaleString('en-IN')}/night
                      </div>
                      {sRoom.bedType && (
                        <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold">
                          {sRoom.bedType}
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-[14px] sm:text-[15px] text-neutral-900 group-hover:text-[#c25a1b] transition-colors line-clamp-1 mb-1.5 sm:mb-2">{sRoom.title}</h3>
                      <p className="text-[11px] sm:text-[12px] text-neutral-500 line-clamp-2 leading-relaxed mb-3 sm:mb-4 flex-1">{sRoom.description}</p>
                      {sAmenities.length > 0 && (
                        <div className="flex gap-2">
                          {sAmenities.map(a => (
                            <span key={a.id} className="text-[9px] font-bold bg-orange-50 text-[#c25a1b] px-2 py-1 rounded-full border border-orange-100">{a.title}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
