import { REVIEWS } from '../data/hotelData';

export function ReviewsSection() {
  return (
    <section className="mt-12 sm:mt-20" data-purpose="guest-reviews">
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#ded9ce]/70 backdrop-blur-sm text-xs font-semibold text-neutral-800 shadow-sm mb-2.5 sm:mb-3">
          <span className="text-orange-500">★</span>
          <span>4.95 / 5.0 from 1,200+ verified stays</span>
        </div>
        <h2 className="font-bold text-xl md:text-2xl text-neutral-900 text-title-smooth tracking-tight">
          Real stories from dream stays
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 sm:mt-1.5 max-w-md px-2">
          Discover why discerning travelers choose our sanctuary for unforgettable moments and warm hospitality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
        {REVIEWS.map((review) => (
          <article
            key={review.id}
            id={`review-card-${review.id}`}
            className="bg-[#f5f4ef] rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-neutral-200/60 h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-orange-500 text-xs">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Verified Guest
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                {review.quote}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-neutral-200/60">
              <div
                className={`w-9 h-9 rounded-full ${review.avatarBg} ${review.avatarTextColor} font-bold text-xs flex items-center justify-center shrink-0`}
              >
                {review.initials}
              </div>
              <div className="text-left truncate">
                <h4 className="font-bold text-xs text-neutral-900 leading-tight truncate">
                  {review.author}
                </h4>
                <p className="text-[10px] text-neutral-500 truncate">
                  {review.stayDate}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
