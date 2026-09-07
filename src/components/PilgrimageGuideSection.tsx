import { SACRED_PLACES } from '../data/hotelData';

interface PilgrimageGuideSectionProps {
  onOpenTempleSchedule: () => void;
  onOpenSiteDetail: (siteName: string) => void;
}

export function PilgrimageGuideSection({
  onOpenTempleSchedule,
  onOpenSiteDetail
}: PilgrimageGuideSectionProps) {
  const featured = SACRED_PLACES.slice(0, 2);
  const secondary = SACRED_PLACES.slice(2);

  return (
    <section className="mt-12 sm:mt-20" data-purpose="pilgrimage-darshan-guide">
      {/* Header with Overline, Title, and Sansthan Trust Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <span className="block text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-1 sm:mb-1.5">
            Pilgrim Companion
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-neutral-900 tracking-tight leading-tight">
            The Sacred Footsteps of Sai Baba
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
            Shirdi Darshan Guide: Holy sacred places located within easy walking distance from Sai Sk Palace.
          </p>
        </div>
        <div className="shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#ded9ce]/70 backdrop-blur-sm text-[11px] font-semibold text-neutral-800 shadow-sm border border-neutral-200/60">
            <span>Updated with Shri Saibaba Sansthan Trust Timings (2025)</span>
          </div>
        </div>
      </div>

      {/* Two Featured Large Hero Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 items-stretch">
        {featured.map((place) => (
          <article
            key={place.id}
            id={`sacred-${place.id}`}
            onClick={() => onOpenSiteDetail(place.name)}
            className="bg-[#f5f4ef] rounded-3xl p-4 flex flex-col justify-between border border-neutral-200/60 shadow-sm hover:shadow-lg transition-all duration-300 h-full group cursor-pointer"
          >
            <div>
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden mb-4">
                <img
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src={place.image}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full mb-2 shadow-sm">
                    {place.badge}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                    {place.name}
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed px-1">
                {place.description}
              </p>
            </div>

            {place.timingHighlight ? (
              <div className="mt-4 pt-3 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 text-xs text-neutral-700 bg-[#dedad0]/40 rounded-xl">
                <div>
                  <span className="font-bold text-neutral-900">Morning Darshan:</span>{' '}
                  {place.timingHighlight.morning}
                </div>
                <div>
                  <span className="font-bold text-neutral-900">Evening Darshan:</span>{' '}
                  {place.timingHighlight.evening}
                </div>
              </div>
            ) : place.significance ? (
              <div className="mt-4 pt-3 border-t border-neutral-200/80 flex items-center gap-2 px-3 py-2.5 text-xs text-neutral-700 bg-[#dedad0]/40 rounded-xl">
                <div>
                  <span className="font-bold text-neutral-900">Spiritual Significance:</span>{' '}
                  {place.significance}
                </div>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      {/* Three Secondary Destination Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-stretch">
        {secondary.map((place) => (
          <article
            key={place.id}
            id={`sacred-secondary-${place.id}`}
            onClick={() => onOpenSiteDetail(place.name)}
            className="bg-[#f5f4ef] rounded-3xl p-3.5 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-neutral-200/60 h-full group cursor-pointer"
          >
            <div>
              <div className="h-48 w-full rounded-2xl overflow-hidden mb-3">
                <img
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={place.image}
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-bold text-sm text-neutral-900 leading-tight group-hover:text-orange-600 transition-colors">
                  {place.name}
                </h3>
                <span className="text-[11px] font-bold text-orange-500 shrink-0 bg-orange-500/10 px-2.5 py-0.5 rounded-full">
                  {place.badge}
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {place.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Etiquette & Logistics Callout Bar */}
      <div className="bg-[#f5f4ef] rounded-3xl p-4 sm:p-6 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5">
        <div className="flex items-start gap-3 sm:gap-4 flex-1">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="16" y2="12" />
              <line x1="12" x2="12.01" y1="8" y2="8" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-neutral-900 mb-1">
              Important Darshan Etiquette &amp; Logistics
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-3xl">
              Mobile phones and cameras are prohibited inside Samadhi Mandir and Dwarkamai. Complimentary secure cloakrooms and shoe stands are available at Gate 2 and Gate 4. Sai Sk Palace provides early morning Aarti alarm calls and direct battery cart assistance for senior citizens.
            </p>
          </div>
        </div>
        <button
          id="btn-download-temple-schedule"
          type="button"
          onClick={onOpenTempleSchedule}
          className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-[#181818] hover:bg-black text-white text-xs font-semibold px-5 py-3 rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <span>Download Temple Map &amp; Schedule</span>
          <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
