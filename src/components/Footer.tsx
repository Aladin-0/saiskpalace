

interface FooterProps {
  onOpenSchedule: () => void;
  onOpenRoomInquiry: (roomType: string) => void;
  onOpenPolicyModal: (title: string, content: string) => void;
}

export function Footer({
  onOpenPolicyModal
}: FooterProps) {

  return (
    <footer className="mt-12 sm:mt-20 pt-10 sm:pt-16 pb-24 md:pb-8 border-t border-neutral-300/80" data-purpose="page-footer">
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
              Your serene sanctuary in the holy land of Shirdi. Dedicated to mindful hospitality, comforting stays, and seamless pilgrim journeys just a <strong className="text-orange-600 font-bold">5 min walkable distance</strong> from Shri Sai Baba Samadhi Mandir.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <a
                id="footer-btn-call"
                className="inline-flex items-center justify-center gap-2 bg-[#dedad0] hover:bg-[#d4cfc3] text-[#1e1e1e] text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm w-fit"
                href="tel:+917350049191"
              >
                <svg className="w-3.5 h-3.5 text-neutral-700" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 7350049191</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 bg-[#dedad0] hover:bg-[#d4cfc3] text-[#1e1e1e] text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm w-fit"
                href="tel:+919511669191"
              >
                <svg className="w-3.5 h-3.5 text-neutral-700" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 9511669191</span>
              </a>
              <a
                href="mailto:Saiskpalace@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-[#dedad0] hover:bg-[#d4cfc3] text-[#1e1e1e] text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm w-fit"
              >
                <svg className="w-3.5 h-3.5 text-neutral-700" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Saiskpalace@gmail.com</span>
              </a>
              <p className="text-[11px] text-neutral-600 mt-1">
                Owner: Kiran S Gondkar
              </p>
            </div>
          </div>

          {/* Social & Location Icons */}
          <div className="flex items-center gap-2.5 pt-6">
            <a
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-[#dedad0]/60 hover:bg-orange-500 hover:text-white text-neutral-700 flex items-center justify-center transition-all duration-300 border border-neutral-200/80"
              href="https://www.instagram.com/sai_sk_palace_shirdi?utm_source=qr&stkn=MXhlZTl5bnFxdDU4OQ=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              aria-label="Location Map"
              className="w-9 h-9 rounded-full bg-[#dedad0]/60 hover:bg-orange-500 hover:text-white text-neutral-700 flex items-center justify-center transition-all duration-300 border border-neutral-200/80"
              href="https://maps.app.goo.gl/mbuHLWhQZaNUAdwd9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Col 3: What We Provide */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-3.5">
            What We Provide
          </h4>
          <ul className="space-y-2 text-xs text-neutral-600 font-medium">
            <li>Free Car Parking</li>
            <li>24 Hrs Hot Water</li>
            <li>CCTV Surveillance</li>
            <li>Lift Service</li>
            <li>Free Wi-Fi</li>
            <li>Conference & Marriage Hall</li>
            <li>Travel Desk</li>
            <li>Gym & Spa Facility</li>
            <li className="pt-2">
              <a href="/admin" className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors">
                <span>Admin Login</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4 & 5: Spiritual Quote */}
        <div className="lg:col-span-2 bg-[#ded9ce]/40 rounded-3xl p-6 border border-neutral-200/60 flex flex-col items-center justify-center text-center">
          <h4 className="font-display font-bold text-xl sm:text-2xl text-orange-600 mb-2">
            "Sabka Malik Ek"
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed italic max-w-[200px] sm:max-w-[250px] mb-5">
            Embrace peace, spirituality, and comfort at the holy land of Shirdi.
          </p>
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md border-2 border-white">
            <img src="/images/saidev.jpeg" alt="Sai Baba" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="pt-8 border-t border-neutral-300/80 flex flex-col items-center justify-center gap-4 text-xs text-neutral-500">
        <div className="text-center space-y-1">
          <p>
            © {new Date().getFullYear()} Sai Sk Palace Shirdi. All rights reserved. Designed for effortless living &amp; peaceful pilgrimages.
          </p>
          <p className="font-semibold text-neutral-600 flex items-center justify-center gap-1.5 pt-1">
            Created by 
            <a 
              href="https://zaikron.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative group inline-flex items-center justify-center transition-transform hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-500 rounded-full" />
              <span className="relative bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent font-extrabold tracking-widest uppercase text-[11px] ml-0.5">
                Zaikron
              </span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
