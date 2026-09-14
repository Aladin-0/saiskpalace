import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MenuDrawer } from './components/MenuDrawer';
import { TempleScheduleModal } from './components/TempleScheduleModal';
import { BookingModal } from './components/BookingModal';
import { InfoModal } from './components/InfoModal';
import { SearchParams, ExperienceItem, TravelTab } from './types';

import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { RoomDetailsPage } from './pages/RoomDetailsPage';
import { AdminPanel } from './pages/AdminPanel';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: 'Shirdi, Maharashtra',
    checkIn: '2024-10-29',
    checkOut: '2024-10-31',
    adults: 2,
    rooms: 1,
    children: 0
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialItem, setBookingInitialItem] = useState<{ name: string; price?: number }>({
    name: 'Deluxe Room'
  });

  const [infoModal, setInfoModal] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
  }>({
    isOpen: false,
    title: '',
    content: ''
  });

  const [searchNotification, setSearchNotification] = useState<string | null>(null);

  const handleUpdateSearchParams = (params: Partial<SearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...params }));
  };

  const handleSearch = () => {
    setSearchNotification(
      `Checking availability for ${searchParams.destination} (${searchParams.checkIn} – ${searchParams.checkOut}) for ${searchParams.adults} Adults... 4 suites available!`
    );
    setTimeout(() => setSearchNotification(null), 4500);
  };

  const handleSelectExperience = (item: ExperienceItem) => {
    setBookingInitialItem({ name: item.title, price: item.price });
    setIsBookingOpen(true);
  };

  const handleOpenCuratedTours = (tab: TravelTab) => {
    setInfoModal({
      isOpen: true,
      title: `Curated ${tab} & Pilgrimage Experiences`,
      content: `Sai Sk Palace provides bespoke ${tab.toLowerCase()} concierge services for devotees.`
    });
  };

  const handleOpenSiteDetail = (siteName: string) => {
    setInfoModal({
      isOpen: true,
      title: siteName,
      content: `Located within a short stroll from Sai Sk Palace. Our front desk provides free battery cart shuttle escorts and early morning wake-up alerts so you never miss sacred darshan or prasad distribution.`
    });
  };

  const handleScrollToSection = (sectionId: string) => {
    // If not on homepage, this won't scroll correctly, but we keep it simple for now
    const el = document.querySelector(`[data-purpose="${sectionId}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-[#ebe8e1] text-[#121212] font-sans antialiased min-h-screen selection:bg-orange-500 selection:text-white">
        {searchNotification && (
          <aside className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#181818] text-white px-5 py-3 rounded-full shadow-2xl text-xs font-semibold flex items-center gap-3 border border-neutral-700 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>{searchNotification}</span>
            <button onClick={() => setSearchNotification(null)} className="text-neutral-400 hover:text-white ml-2">✕</button>
          </aside>
        )}

        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 pt-3.5 sm:pt-6 pb-4">
          <Header
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenBooking={() => {
              setBookingInitialItem({ name: 'Deluxe Room' });
              setIsBookingOpen(true);
            }}
          />

          <Routes>
            <Route path="/" element={
              <HomePage
                searchParams={searchParams}
                onUpdateParams={handleUpdateSearchParams}
                onSearch={handleSearch}
                onSelectExperience={handleSelectExperience}
                onOpenCuratedTours={handleOpenCuratedTours}
                onOpenTempleSchedule={() => setIsScheduleOpen(true)}
                onOpenSiteDetail={handleOpenSiteDetail}
              />
            } />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/room/:id" element={<RoomDetailsPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>

          <Footer
            onOpenSchedule={() => setIsScheduleOpen(true)}
            onOpenRoomInquiry={(roomType) => {
              setBookingInitialItem({ name: roomType });
              setIsBookingOpen(true);
            }}
            onOpenPolicyModal={(title, content) => setInfoModal({ isOpen: true, title, content })}
          />
        </div>

        <MenuDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onNavigate={handleScrollToSection}
          onOpenSchedule={() => setIsScheduleOpen(true)}
          onOpenBooking={() => {
            setBookingInitialItem({ name: 'Deluxe Room' });
            setIsBookingOpen(true);
          }}
        />

        <TempleScheduleModal
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
        />

        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialItemName={bookingInitialItem.name}
          initialPrice={bookingInitialItem.price}
          searchParams={searchParams}
        />

        <InfoModal
          isOpen={infoModal.isOpen}
          onClose={() => setInfoModal({ isOpen: false, title: '', content: '' })}
          title={infoModal.title}
          content={infoModal.content}
        />
      </div>
    </Router>
  );
}
