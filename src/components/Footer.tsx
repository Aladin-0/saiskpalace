import { useState, type FormEvent } from 'react';

interface FooterProps {
  onOpenSchedule: () => void;
  onOpenRoomInquiry: (roomType: string) => void;
  onOpenPolicyModal: (title: string, content: string) => void;
}

export function Footer({
  onOpenSchedule,
  onOpenRoomInquiry,
  onOpenPolicyModal
}: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const staysLinks = [
    'Deluxe Rooms',
    'Family Pilgrim Suites',
    'Executive Balcony',
    'Accessible Rooms',
    'Special Darshan Packages',
    'Group Bookings'
  ];

  const pilgrimLinks = [
    { name: 'Aarti Schedule & Timings', action: () => onOpenSchedule() },
    {
      name: 'Complimentary Buggy Shuttle',
      action: () =>
        onOpenPolicyModal(
          'Complimentary Buggy Shuttle',
          'Sai Sk Palace operates silent, zero-emission electric battery carts running every 15 minutes between the hotel porch and Temple Gate 2 / Gate 4, priority reserved for seniors and young children.'
        )
    },
    {
      name: 'Temple Cloakroom Assistance',
      action: () =>
        onOpenPolicyModal(
          'Temple Cloakroom Assistance',
          'Leave electronic devices, luggage, and cameras in our tamper-sealed, CCTV-monitored front desk lockers free of charge before proceeding for Darshan.'
        )
    },
    {
      name: 'Priest / Pooja Inquiries',
      action: () =>
        onOpenPolicyModal(
          'Priest & Special Pooja Guidance',
          'Our resident pilgrimage coordinators assist devotees with Abhishek registration, Satyanarayan Pooja tokens, and genuine Sansthan trust counters.'
        )
    },
    {
      name: 'Local Sightseeing Itinerary',
      action: () =>
        onOpenPolicyModal(
          'Local Sightseeing Itinerary',
          'Explore curated half-day trips to Shani Shingnapur (72km), Trimbakeshwar Jyotirlinga, and Nashik Godavari ghats with verified hotel drivers.'
        )
    },
    {
      name: 'Divine Udi & Prasad Guide',
      action: () =>
        onOpenPolicyModal(
          'Divine Udi & Prasad Guide',
          'Learn the history and significance of the sacred Udi distributed from Dhuni Maa in Dwarkamai, and where to collect authentic Sansthan laddu prasad.'
        )
    }
  ];

  return (
    <footer className="mt-12 sm:mt-20 pt-10 sm:pt-16 border-t border-neutral-300/80" data-purpose="page-footer">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 mb-10 sm:mb-14">
        {/* Col 1 & 2: Branding */}
        <div className="lg:col-span-2 flex flex-col justify-between pr-0 lg:pr-6">
          <div className="space-y-4">
            <a
              id="footer-brand-logo"
              aria-label="Sai Sk Palace Home"
              className="flex items-center gap-2 text-[#121212] font-bold text-base tracking-tight cursor-pointer"
              href="#"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 shadow-sm shrink-0">
                <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 22h20L12 2z" />
                </svg>
              </span>
              <span className="font-sans font-bold">Sai Sk Palace</span>
            </a>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm">
              Your serene sanctuary in the holy land of Shirdi. Dedicated to mindful hospitality, comforting stays, and seamless pilgrim journeys just steps from Shri Sai Baba Samadhi Mandir.
            </p>

            <div className="pt-2">
              <a
                id="footer-btn-call"
                className="inline-flex items-center gap-2 bg-[#dedad0] hover:bg-[#d4cfc3] text-[#1e1e1e] text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm"
                href="tel:+919730416763"
              >
                <svg className="w-3.5 h-3.5 text-neutral-700" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call: +91 9730416763</span>
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5 pt-6">
            <a
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-[#dedad0]/60 hover:bg-orange-500 hover:text-white text-neutral-700 flex items-center justify-center transition-all duration-300 border border-neutral-200/80 text-xs font-semibold"
              href="#instagram"
              onClick={(e) => {
                e.preventDefault();
                onOpenPolicyModal('Sai Sk Palace Instagram', 'Follow @saiskpalace on Instagram for daily Darshan morning photos and holy updates from Shirdi.');
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-[#dedad0]/60 hover:bg-orange-500 hover:text-white text-neutral-700 flex items-center justify-center transition-all duration-300 border border-neutral-200/80 text-xs font-semibold"
              href="#facebook"
              onClick={(e) => {
                e.preventDefault();
                onOpenPolicyModal('Sai Sk Palace Facebook', 'Connect with fellow devotees on our official community page.');
              }}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-[#dedad0]/60 hover:bg-orange-500 hover:text-white text-neutral-700 flex items-center justify-center transition-all duration-300 border border-neutral-200/80 text-xs font-semibold"
              href="#youtube"
              onClick={(e) => {
                e.preventDefault();
                onOpenPolicyModal('Live Aarti Stream', 'Watch official Shri Saibaba Sansthan live darshan and aarti streams directly.');
              }}
            >
              <svg className="w-4 h-4 fill-none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <polygon points="10 15 15 12 10 9 10 15" />
              </svg>
            </a>
            <a
              aria-label="TripAdvisor"
              className="w-9 h-9 rounded-full bg-[#dedad0]/60 hover:bg-orange-500 hover:text-white text-neutral-700 flex items-center justify-center transition-all duration-300 border border-neutral-200/80 text-xs font-semibold"
              href="#tripadvisor"
              onClick={(e) => {
                e.preventDefault();
                onOpenPolicyModal('TripAdvisor Certificate of Excellence', 'Rated 4.95 / 5.0 stars with over 1,200+ verified pilgrim reviews.');
              }}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4.5 12a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm9 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Col 3: Stays & Suites */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-3.5">
            Stays &amp; Suites
          </h4>
          <ul className="space-y-2 text-xs text-neutral-600 font-medium">
            {staysLinks.map((suite) => (
              <li key={suite}>
                <button
                  type="button"
                  onClick={() => onOpenRoomInquiry(suite)}
                  className="hover:text-neutral-900 transition-colors text-left cursor-pointer"
                >
                  {suite}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Pilgrim Companion */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-3.5">
            Pilgrim Companion
          </h4>
          <ul className="space-y-2 text-xs text-neutral-600 font-medium">
            {pilgrimLinks.map((item) => (
              <li key={item.name}>
                <button
                  type="button"
                  onClick={item.action}
                  className="hover:text-neutral-900 transition-colors text-left cursor-pointer"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 5: Stay Connected */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-3.5">
            Stay Connected
          </h4>
          <p className="text-xs text-neutral-600 leading-relaxed mb-3.5">
            Receive Shirdi trust darshan updates, festive aarti timings, and exclusive stay privileges.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex items-center bg-white rounded-full p-1 border border-neutral-200/80 shadow-sm focus-within:border-neutral-400">
              <input
                id="footer-email-input"
                className="w-full bg-transparent px-3 py-1.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none border-none"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                id="footer-btn-subscribe"
                aria-label="Subscribe"
                className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shrink-0 transition-colors shadow-sm cursor-pointer"
                type="submit"
              >
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            {subscribed && (
              <p className="text-[11px] text-green-700 font-semibold px-2 animate-fade-in">
                ✓ Thank you! You will receive holy darshan updates.
              </p>
            )}
          </form>

          <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-[#ded9ce]/70 backdrop-blur-sm text-[10px] font-semibold text-neutral-700">
            <span className="text-orange-500">✦</span>
            <span>24/7 Pilgrim Concierge on-site</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="pt-8 border-t border-neutral-300/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <p className="text-center md:text-left">
          © 2025 Sai Sk Palace Shirdi. All rights reserved. Designed for effortless living &amp; peaceful pilgrimages.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5 text-neutral-600 font-medium">
          <button
            type="button"
            onClick={() =>
              onOpenPolicyModal(
                'Privacy Policy',
                'Sai Sk Palace values guest confidentiality. Your personal information, contact numbers, and payment details are encrypted with TLS 1.3 and never shared.'
              )
            }
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() =>
              onOpenPolicyModal(
                'Terms of Service',
                'Check-in time is 12:00 PM; Check-out time is 11:00 AM. Early check-in is subject to availability for pilgrims arriving on dawn express trains.'
              )
            }
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            type="button"
            onClick={() =>
              onOpenPolicyModal(
                'Darshan Guidelines',
                'Traditional modest Indian dress is encouraged by Shri Saibaba Sansthan Trust. Mobile phones must be placed in cloakrooms prior to entering Samadhi Mandir.'
              )
            }
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Darshan Guidelines
          </button>
          <button
            type="button"
            onClick={() =>
              onOpenPolicyModal(
                'Site Map',
                'Hotel Floor Plan & Campus Map: Ground Floor (Concierge, Restaurant, Valet), 1st to 4th Floor (Deluxe & Pilgrim Suites), 5th Floor (Prayer Terrace & Sunset View of Temple Shikhara).'
              )
            }
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Site Map
          </button>
        </div>
      </div>
    </footer>
  );
}
