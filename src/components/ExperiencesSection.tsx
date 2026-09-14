import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EXPERIENCES_DATA } from '../data/hotelData';
import { ExperienceItem, TravelTab } from '../types';

interface ExperiencesSectionProps {
  onSelectExperience: (item: ExperienceItem) => void;
  onOpenCuratedTours: (tab: TravelTab) => void;
}

export function ExperiencesSection({
  onSelectExperience,
  onOpenCuratedTours
}: ExperiencesSectionProps) {
  const [activeTab, setActiveTab] = useState<TravelTab>('Our Rooms');
  const [realRooms, setRealRooms] = useState<ExperienceItem[]>([]);
  const tabs: TravelTab[] = ['Happy Customer', 'Our Rooms', 'Hotel Exteriors/Lobby'];
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then((data: any[]) => {
        const mappedRooms = data.slice(0, 7).map(room => ({
          id: room.id || room._id,
          title: room.title,
          location: room.location || room.bedType || 'Sai Sk Palace',
          price: room.price,
          rating: 5,
          image: (room.images && room.images.length > 0) ? room.images[0] : (room.image || '/images/room3.jpeg'),
          category: 'Our Rooms',
          description: room.description || room.features
        }));
        setRealRooms(mappedRooms);
      })
      .catch(err => console.error('Error fetching rooms:', err));
  }, []);

  let currentItems = EXPERIENCES_DATA[activeTab] || EXPERIENCES_DATA['Happy Customer'];
  if (activeTab === 'Our Rooms') {
    currentItems = realRooms;
  }

  return (
    <section className="mt-12 sm:mt-20" data-purpose="activities-and-tours">
      {/* Section Title */}
      <h2 className="text-center font-bold text-xl md:text-2xl text-neutral-900 text-title-smooth tracking-tight mb-4 sm:mb-5">
        Discover Sai Sk Palace
      </h2>

      {/* Segmented Category Pill Tabs */}
      <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto no-scrollbar px-2">
        <nav className="inline-flex bg-[#ded9ce]/70 backdrop-blur-sm p-1 rounded-full text-xs font-semibold text-neutral-600 border border-neutral-200/50 shrink-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`tab-${tab.toLowerCase().replace(/[^a-z]/g, '-')}`}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-neutral-900 shadow-sm font-bold'
                    : 'hover:text-neutral-900 text-neutral-600'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content Grid: 3 Cards + 1 Orange Promo Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {currentItems.map((item) => (
          <article
            key={item.id}
            id={`experience-card-${item.id}`}
            onClick={() => {
              if (activeTab === 'Our Rooms') {
                navigate(`/room/${item.id}`);
              } else {
                onSelectExperience(item);
              }
            }}
            className="bg-[#f5f4ef] rounded-3xl p-3.5 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-neutral-200/60 h-full group cursor-pointer"
          >
            <div>
              <div className="h-44 sm:h-48 w-full rounded-2xl overflow-hidden mb-3 relative bg-neutral-200">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.image}
                  loading="lazy"
                />
                <span className="absolute top-2.5 right-2.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                  Verified Stay
                </span>
              </div>
              <h3 className="font-bold text-base text-neutral-900 leading-tight group-hover:text-orange-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1 font-medium">
                <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    clipRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    fillRule="evenodd"
                  />
                </svg>
                <span>{item.location}</span>
              </p>
              {item.description && (
                <p className="text-[11px] text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 mt-3 border-t border-neutral-200/50">
              <div className="flex items-center gap-0.5 text-orange-500 text-xs">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              {item.price > 0 && (
                <div className="font-display font-bold text-base text-neutral-900">
                  ₹{item.price} <span className="text-[10px] text-neutral-500 font-normal">/ night</span>
                </div>
              )}
            </div>
          </article>
        ))}

        {/* Card: Orange Call-to-Action Card */}
        <div
          id="btn-curated-tours-card"
          onClick={() => {
            if (activeTab === 'Our Rooms') {
              navigate('/rooms');
            } else {
              onOpenCuratedTours(activeTab);
            }
          }}
          className="bg-orange-500 text-white rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-lg group cursor-pointer hover:bg-orange-600 transition-colors h-full border border-orange-400/40 min-h-[260px] sm:min-h-[300px]"
        >
          {/* Background Abstract Decorative Shape */}
          <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-orange-400/40 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
              Curated Tours
            </span>
            <h3 className="font-bold text-2xl tracking-tight text-white mb-2">
              {activeTab}
            </h3>
            <p className="text-xs text-orange-100/90 leading-relaxed max-w-[200px]">
              Adventure awaits, book your next pilgrimage experience &amp; temple tours.
            </p>
          </div>

          {/* Circular Arrow Button */}
          <div className="flex justify-end pt-6 sm:pt-8 relative z-10">
            <div className="w-11 h-11 rounded-full bg-white text-orange-500 flex items-center justify-center shadow-md transform group-hover:rotate-45 transition-transform duration-300">
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
