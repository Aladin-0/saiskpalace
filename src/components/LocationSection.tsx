export function LocationSection() {
  return (
    <section className="mt-12 sm:mt-20 px-2 sm:px-6 max-w-[1400px] mx-auto" data-purpose="hotel-location">
      <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
        <span className="block text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-1.5">
          Location & Access
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-tight mb-4">
          Heart of Shirdi
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 auto-rows-[200px] sm:auto-rows-[220px]">
        
        {/* The Map Box - Large */}
        <div className="md:col-span-2 lg:col-span-2 md:row-span-2 rounded-[2rem] overflow-hidden relative shadow-md group border border-neutral-200/60">
          <iframe
            title="Hotel Sai SK Palace Location"
            src="https://www.google.com/maps?q=Hotel+Sai+SK+Palace,+Shirdi,+Maharashtra&output=embed"
            className="w-full h-full border-0 grayscale-[15%] opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2.5 pointer-events-none">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span className="text-[10px] font-bold text-neutral-800 uppercase tracking-widest">Live Map</span>
          </div>
        </div>

        {/* Address Box */}
        <div className="bg-[#f5f4ef] rounded-[2rem] p-6 sm:p-8 flex flex-col justify-center border border-neutral-200/80 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-5 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h4 className="font-bold text-neutral-900 text-lg mb-2">Address</h4>
          <p className="text-neutral-900 text-base sm:text-lg font-semibold leading-snug max-w-[280px]">
            Shirdi Yog Marg, Near Neeta Bus Parking, Pimple Wadi Road, Maharashtra 423109
          </p>
        </div>

        {/* Contact Info Box */}
        <div className="bg-neutral-900 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-center border border-neutral-800 shadow-xl hover:shadow-2xl transition-shadow group text-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-10 -mb-10 pointer-events-none"></div>
          <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mb-5 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-inner border border-neutral-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">Reach Out</p>
          <div className="flex flex-col gap-0.5 mb-2">
            <a href="tel:+917350049191" className="font-display font-bold text-xl sm:text-2xl text-white hover:text-orange-400 transition-colors tracking-tight">+91 7350049191</a>
            <a href="tel:+919511669191" className="font-display font-bold text-xl sm:text-2xl text-white hover:text-orange-400 transition-colors tracking-tight">+91 9511669191</a>
          </div>
          <a href="mailto:Saiskpalace@gmail.com" className="text-neutral-400 text-xs hover:text-white transition-colors font-medium">Saiskpalace@gmail.com</a>
        </div>

        {/* Proximity / Distance Box */}
        <div className="md:col-span-2 lg:col-span-1 bg-[#ded9ce] rounded-[2rem] p-6 flex flex-col justify-center items-center text-center border border-neutral-300/50 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/20 group-hover:bg-white/40 transition-colors pointer-events-none"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-orange-300/40 rounded-full blur-2xl pointer-events-none"></div>
          <span className="font-display font-bold text-3xl sm:text-4xl text-orange-600 mb-1 tracking-tighter text-center leading-none">Just Walking <span className="text-xl sm:text-2xl text-orange-500/80">Distance</span></span>
          <p className="font-bold text-neutral-800 text-xs sm:text-sm uppercase tracking-widest mt-2 text-center">From Temple</p>
        </div>

        {/* Action Button Box */}
        <div className="md:col-span-2 lg:col-span-2 bg-orange-500 rounded-[2rem] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between shadow-lg hover:shadow-orange-500/30 transition-all group relative overflow-hidden">
          {/* Abstract decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
          
          <div className="relative z-10 text-center sm:text-left mb-6 sm:mb-0">
            <h4 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2 tracking-tight">Get Directions</h4>
            <p className="text-orange-100 text-sm font-medium">Navigate instantly using Google Maps</p>
          </div>

          <a
            href="https://maps.app.goo.gl/mbuHLWhQZaNUAdwd9"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 bg-white text-orange-600 hover:bg-neutral-50 hover:text-orange-700 hover:scale-105 active:scale-95 font-bold py-4 px-8 rounded-full shadow-xl transition-all flex items-center gap-4 shrink-0"
          >
            <span className="text-sm uppercase tracking-wider">Open Maps</span>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
