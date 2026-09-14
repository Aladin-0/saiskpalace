import { useState, type FormEvent } from 'react';
import { SearchParams } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItemName?: string;
  initialPrice?: number;
  searchParams: SearchParams;
}

export function BookingModal({
  isOpen,
  onClose,
  initialItemName,
  initialPrice,
  searchParams
}: BookingModalProps) {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedSuite, setSelectedSuite] = useState(initialItemName || 'Deluxe Room');
  const [needWakeup, setNeedWakeup] = useState(true);
  const [needWheelchair, setNeedWheelchair] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (guestName.trim() && phone.trim()) {
      setIsSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-[#f5f4ef] rounded-3xl max-w-lg w-full shadow-2xl border border-neutral-300 p-6 sm:p-8 my-6 relative text-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 flex items-center justify-center text-sm transition-colors cursor-pointer"
        >
          ✕
        </button>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-2xl">
              ✓
            </div>
            <h3 className="font-display font-bold text-2xl text-neutral-900 mb-2">
              Reservation Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed max-w-sm mx-auto">
              Blessed wishes, <span className="font-bold text-neutral-900">{guestName}</span>. Your stay for <span className="font-bold">{selectedSuite}</span> ({searchParams.checkIn} – {searchParams.checkOut}) has been recorded. Our pilgrimage concierge will contact you at <span className="font-bold">{phone}</span> with Gate 2 pickup instructions.
            </p>
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 text-left text-xs space-y-1.5 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-500">Sanctuary:</span>
                <span className="font-bold">Sai Sk Palace, Shirdi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Dates:</span>
                <span className="font-bold">{searchParams.checkIn} to {searchParams.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Guests &amp; Rooms:</span>
                <span className="font-bold">{searchParams.adults} Adults, {searchParams.rooms} Room</span>
              </div>
              {needWakeup && (
                <div className="flex justify-between text-orange-600 font-semibold">
                  <span>Kakad Aarti Alert:</span>
                  <span>03:45 AM Wake-up call scheduled</span>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block mb-1">
                Sai Sk Palace Sanctuary
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                Reserve Your Stay
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Advance booking ₹1000 Compulsory. Final rate, no bargaining please. No GST, No Service Tax.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Suite / Tour */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                  Accommodation / Experience
                </label>
                <select
                  value={selectedSuite}
                  onChange={(e) => setSelectedSuite(e.target.value)}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 font-semibold focus:outline-none focus:border-orange-500"
                >
                  <option value="Double Bed Non AC - ₹1299">Double Bed Non AC - ₹1299</option>
                  <option value="Double Bed Deluxe AC - ₹1499">Double Bed Deluxe AC - ₹1499</option>
                  <option value="Triple Bed Non AC - ₹1699">Triple Bed Non AC - ₹1699</option>
                  <option value="Classic Triple Bed AC - ₹2000">Classic Triple Bed AC - ₹2000</option>
                  <option value="Family 4 Bed Non AC - ₹2199">Family 4 Bed Non AC - ₹2199</option>
                  <option value="Family 4 Bed Deluxe AC - ₹2499">Family 4 Bed Deluxe AC - ₹2499</option>
                </select>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Primary Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kulkarni"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Dates & Guests Display */}
              <div className="bg-white/80 p-3 rounded-xl border border-neutral-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-neutral-500 block text-[10px]">Dates:</span>
                  <span className="font-bold text-neutral-800">{searchParams.checkIn} – {searchParams.checkOut}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">Guests:</span>
                  <span className="font-bold text-neutral-800">{searchParams.adults} Adults, {searchParams.rooms} Room</span>
                </div>
                {initialPrice && (
                  <div className="text-right">
                    <span className="text-neutral-500 block text-[10px]">Rate:</span>
                    <span className="font-bold text-orange-600 text-sm">${initialPrice}/night</span>
                  </div>
                )}
              </div>

              {/* Pilgrim Complimentary Services */}
              <div className="pt-2 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Complimentary Pilgrim Perks
                </p>
                <label className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needWakeup}
                    onChange={(e) => setNeedWakeup(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-orange-400"
                  />
                  <span>03:45 AM Wake-up alarm call for early Kakad Aarti</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needWheelchair}
                    onChange={(e) => setNeedWheelchair(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-orange-400"
                  />
                  <span>Complimentary battery cart buggy shuttle for senior pilgrims</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-neutral-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs font-bold shadow-md transition-colors cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
