import { useState } from 'react';
import { AMENITIES } from '../constants/amenities';
interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  features: string;
  images?: string[];
  image?: string;
}

interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
}

export function RoomDetailsModal({ isOpen, onClose, room }: RoomDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !room) return null;

  // Normalize images (handle old rooms with single 'image' or new with 'images')
  let images = room.images || [];
  if (images.length === 0 && room.image) {
    images = [room.image];
  }
  if (images.length === 0) {
    images = ['/images/room3.jpeg'];
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const roomFeatures = Array.isArray(room.features) ? room.features : (typeof room.features === 'string' ? room.features.split(',') : []);
  const displayAmenities = AMENITIES.filter(a => roomFeatures.includes(a.id));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[80vh] md:h-[600px] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-900 hover:bg-white shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Carousel (Left side on desktop, top on mobile) */}
        <div className="w-full md:w-3/5 h-1/2 md:h-full relative bg-neutral-100 group">
          <img 
            src={images[currentImageIndex]} 
            alt={room.title} 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          
          {images.length > 1 && (
            <>
              {/* Prev/Next Buttons */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-black/30 backdrop-blur-sm rounded-full">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details (Right side on desktop, bottom on mobile) */}
        <div className="w-full md:w-2/5 h-1/2 md:h-full overflow-y-auto bg-white p-6 md:p-8 flex flex-col custom-scrollbar">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2 leading-tight">
              {room.title}
            </h2>
            <p className="text-sm text-neutral-500 flex items-center gap-1 font-medium mb-6">
              <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              {room.location}
            </p>

            <div className="prose prose-sm text-neutral-600 mb-8 leading-relaxed">
              {room.description ? room.description.split('\n').map((line, i) => (
                <p key={i} className="mb-2">{line}</p>
              )) : (
                <p>No description provided for this room.</p>
              )}
            </div>

            {displayAmenities.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-4">Premium Amenities</h4>
                <div className="grid grid-cols-1 gap-4">
                  {displayAmenities.map((amenity) => (
                    <div key={amenity.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={amenity.icon} />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-neutral-900">{amenity.title}</div>
                        <div className="text-xs text-neutral-500">{amenity.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-neutral-100 mt-auto">
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider block mb-0.5">Price</span>
                <div className="font-display font-bold text-3xl text-neutral-900">
                  ₹{room.price} <span className="text-xs text-neutral-500 font-normal">/ night</span>
                </div>
              </div>
            </div>
            
            <a 
              href="tel:+917350049191"
              className="w-full block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-full shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5"
            >
              Call to Book Now
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
