/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { PilgrimageGuideSection } from './components/PilgrimageGuideSection';
import { Footer } from './components/Footer';
import { MenuDrawer } from './components/MenuDrawer';
import { TempleScheduleModal } from './components/TempleScheduleModal';
import { BookingModal } from './components/BookingModal';
import { InfoModal } from './components/InfoModal';
import { ExperienceItem, SearchParams, TravelTab } from './types';

export default function App() {
  // Global search parameters
  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: 'Shirdi, Maharashtra',
    checkIn: '29 Oct 24',
    checkOut: '30 Oct 24',
    adults: 2,
    rooms: 1,
    children: 0
  });

  // Modals state
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

  // Search notification toast
  const [searchNotification, setSearchNotification] = useState<string | null>(null);

  const handleUpdateSearchParams = (params: Partial<SearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...params }));
  };

  const handleSearch = () => {
    setSearchNotification(
      `Checking availability for ${searchParams.destination} (${searchParams.checkIn} – ${searchParams.checkOut}) for ${searchParams.adults} Adults... 4 suites available!`
    );
    setTimeout(() => {
      setSearchNotification(null);
    }, 4500);
  };

  const handleSelectExperience = (item: ExperienceItem) => {
    setBookingInitialItem({ name: item.title, price: item.price });
    setIsBookingOpen(true);
  };

  const handleOpenCuratedTours = (tab: TravelTab) => {
    setInfoModal({
      isOpen: true,
      title: `Curated ${tab} & Pilgrimage Experiences`,
      content: `Sai Sk Palace provides bespoke ${tab.toLowerCase()} concierge services for devotees. From priority Aarti entry passes and private taxi transfers to Shani Shingnapur, to guided morning temple tours led by experienced local historians, our front desk coordinates every detail for your peaceful journey.`
    });
  };

  const handleOpenSiteDetail = (siteName: string) => {
    setInfoModal({
      isOpen: true,
      title: siteName,
      content: `Located within a short stroll from Sai Sk Palace. Our front desk provides free battery cart shuttle escorts and early morning wake-up alerts so you never miss sacred darshan or prasad distribution.`
    });
  };

  const handleOpenPolicyModal = (title: string, content: string) => {
    setInfoModal({
      isOpen: true,
      title,
      content
    });
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.querySelector(`[data-purpose="${sectionId}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#ebe8e1] text-[#121212] font-sans antialiased min-h-screen selection:bg-orange-500 selection:text-white">
      {/* Toast Notification */}
      {searchNotification && (
        <aside
          aria-live="polite"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#181818] text-white px-5 py-3 rounded-full shadow-2xl text-xs font-semibold flex items-center gap-3 border border-neutral-700 animate-bounce"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span>{searchNotification}</span>
          <button
            type="button"
            onClick={() => setSearchNotification(null)}
            className="text-neutral-400 hover:text-white ml-2"
          >
            ✕
          </button>
        </aside>
      )}

      {/* Main Container matching screenshot max-w-[1240px] */}
      <div className="max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 pb-16 sm:pb-20">
        {/* Navigation */}
        <Header
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenBooking={() => {
            setBookingInitialItem({ name: 'Deluxe Room' });
            setIsBookingOpen(true);
          }}
        />

        {/* Hero Section with Editorial Headline & Overlapping Floating Search */}
        <HeroSection
          searchParams={searchParams}
          onUpdateParams={handleUpdateSearchParams}
          onSearch={handleSearch}
        />

        {/* Seamless travel & experiences Section */}
        <ExperiencesSection
          onSelectExperience={handleSelectExperience}
          onOpenCuratedTours={handleOpenCuratedTours}
        />

        {/* Designed for effortless living Amenities Section */}
        <AmenitiesSection />

        {/* Real stories from dream stays Reviews Section */}
        <ReviewsSection />

        {/* The Sacred Footsteps of Sai Baba Pilgrimage Guide Section */}
        <PilgrimageGuideSection
          onOpenTempleSchedule={() => setIsScheduleOpen(true)}
          onOpenSiteDetail={handleOpenSiteDetail}
        />

        {/* Page Footer */}
        <Footer
          onOpenSchedule={() => setIsScheduleOpen(true)}
          onOpenRoomInquiry={(roomType) => {
            setBookingInitialItem({ name: roomType });
            setIsBookingOpen(true);
          }}
          onOpenPolicyModal={handleOpenPolicyModal}
        />
      </div>

      {/* Menu Drawer */}
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

      {/* Shri Saibaba Sansthan Temple Schedule Modal */}
      <TempleScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />

      {/* Reservation & Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialItemName={bookingInitialItem.name}
        initialPrice={bookingInitialItem.price}
        searchParams={searchParams}
      />

      {/* Information / Policy Modal */}
      <InfoModal
        isOpen={infoModal.isOpen}
        onClose={() => setInfoModal({ isOpen: false, title: '', content: '' })}
        title={infoModal.title}
        content={infoModal.content}
      />
    </div>
  );
}
