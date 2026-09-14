import React, { useState, useEffect, useRef } from 'react';

const videos = [
  {
    id: 'vid-1',
    title: 'Hotel Tour',
    src: '/videos/video1.mov',
    type: 'video/mp4',
    poster: '/images/hotel.jpeg'
  },
  {
    id: 'vid-2',
    title: 'Room Experience',
    src: '/videos/video2.mov',
    type: 'video/mp4',
    poster: '/images/room4.jpeg'
  },
  {
    id: 'vid-3',
    title: 'Premium Suite',
    src: '/videos/video3.mov',
    type: 'video/mp4',
    poster: '/images/room6.jpeg'
  },
  {
    id: 'vid-4',
    title: 'Temple Walkway',
    src: '/videos/video4.mp4',
    type: 'video/mp4',
    poster: '/images/saidev2.jpeg'
  }
];

export function VideoGallerySection() {
  const [activeVideoId, setActiveVideoId] = useState(videos[0].id);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [isGlobalMuted, setIsGlobalMuted] = useState(true);
  const mobileVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const sectionRef = useRef<HTMLElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Handle section visibility for desktop auto-play/pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSectionInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleMobilePlay = (playingId: string) => {
    mobileVideoRefs.current.forEach((video, id) => {
      if (id !== playingId && video && !video.paused) {
        video.pause();
      }
    });
  };

  const activeVideo = videos.find(v => v.id === activeVideoId) || videos[0];

  return (
    <section ref={sectionRef} className="mt-12 sm:mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-purpose="video-gallery">
      <div className="mb-6 sm:mb-10 text-center lg:text-left flex flex-col lg:flex-row justify-between items-end">
        <div>
          <h2 className="font-bold text-xl md:text-3xl lg:text-4xl text-neutral-900 text-title-smooth tracking-tight">
            Glimpses of Sai Sk Palace
          </h2>
          <p className="text-sm md:text-base text-neutral-600 mt-2 max-w-2xl">
            Experience our world-class hospitality and spiritual ambiance through our curated cinematic tours.
          </p>
        </div>
      </div>

      {/* --- DESKTOP LAYOUT (Hidden on mobile) - EXPANDING ACCORDION --- */}
      <div className="hidden lg:flex w-full h-[600px] gap-4 bg-[#f5f4ef] p-4 rounded-[2.5rem] border border-neutral-200/60 shadow-sm">
        {videos.map((video) => {
          const isActive = video.id === activeVideoId;
          return (
            <div
              key={video.id}
              onMouseEnter={() => setActiveVideoId(video.id)}
              className={`relative rounded-[2rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer bg-black
                ${isActive ? 'flex-[4] shadow-2xl' : 'flex-[1] opacity-80 hover:opacity-100 grayscale-[40%] hover:grayscale-0'}`}
            >
              <video
                ref={(el) => {
                  if (el) {
                    if (isActive && isSectionInView) {
                      el.play().catch(() => {});
                    } else {
                      el.pause();
                    }
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                controls={false}
                preload="metadata"
                playsInline
                muted={isGlobalMuted}
                poster={video.poster}
              >
                <source src={video.src} type={video.type} />
              </video>
              
              {/* Title overlay when Active */}
              <div className={`absolute bottom-8 left-8 right-8 transition-all duration-700 delay-100 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                <div className="bg-black/50 backdrop-blur-md text-white p-4 rounded-2xl border border-white/20 shadow-xl inline-block">
                  <h3 className="font-bold text-2xl">{video.title}</h3>
                  <p className="text-sm text-white/80 mt-1">Cinematic Experience</p>
                </div>
              </div>
              
              {/* Custom Desktop Controls (Only visible when active) */}
              <div className={`absolute bottom-8 right-8 z-20 transition-all duration-700 delay-100 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsGlobalMuted(!isGlobalMuted);
                  }}
                  className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors shadow-xl"
                >
                  {isGlobalMuted ? (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Vertical Title when Collapsed */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none bg-black/20 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                <h3 className="text-white font-bold text-xl tracking-widest whitespace-nowrap -rotate-90 drop-shadow-2xl">
                  {video.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- MOBILE LAYOUT (Hidden on desktop) --- */}
      <div 
        ref={mobileContainerRef}
        onScroll={() => {
          // Pause all videos when user scrolls horizontally
          mobileVideoRefs.current.forEach((video) => {
            if (video && !video.paused) {
              video.pause();
            }
          });
        }}
        className="lg:hidden flex overflow-x-auto gap-4 sm:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6"
      >
        {videos.map((video) => (
          <div 
            key={video.id}
            className="w-[280px] sm:w-[320px] shrink-0 snap-center relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-orange-500/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative bg-[#2a2a2a] rounded-[2rem] p-2 sm:p-2.5 border border-white/10 shadow-2xl overflow-hidden h-[500px] sm:h-[560px]">
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                <video
                  ref={(el) => {
                    if (el) {
                      mobileVideoRefs.current.set(video.id, el);
                    } else {
                      mobileVideoRefs.current.delete(video.id);
                    }
                  }}
                  data-videoid={video.id}
                  onPlay={() => handleMobilePlay(video.id)}
                  onClick={(e) => {
                    // Tap to play/pause on mobile manually
                    const videoElement = e.currentTarget;
                    if (videoElement.paused) {
                      videoElement.play().catch(()=>{});
                    } else {
                      videoElement.pause();
                    }
                  }}
                  className="w-full h-full object-cover cursor-pointer"
                  preload="metadata"
                  playsInline
                  poster={video.poster}
                >
                  <source src={video.src} type={video.type} />
                  Your browser does not support the video tag.
                </video>
                
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                  <span className="bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
                    {video.title}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shadow-lg border border-white/20">
                    <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
