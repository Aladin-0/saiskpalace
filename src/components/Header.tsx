interface HeaderProps {
  onOpenMenu: () => void;
  onOpenBooking: () => void;
}

export function Header({ onOpenMenu, onOpenBooking }: HeaderProps) {
  return (
    <header
      className="grid grid-cols-[1fr_auto_1fr] items-center py-2 sm:py-3 mb-3 sm:mb-5 gap-2"
      data-purpose="site-navigation"
    >
      {/* Left: Menu Drawer Trigger */}
      <div className="flex items-center justify-start">
        <button
          id="btn-open-menu"
          type="button"
          aria-label="Open navigation menu"
          onClick={onOpenMenu}
          className="bg-[#dedad0] hover:bg-[#d5d0c4] active:scale-95 text-[#1e1e1e] text-xs font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all shadow-xs border border-neutral-300/50 inline-flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="flex flex-col gap-1 w-3.5 shrink-0" aria-hidden="true">
            <span className="h-0.5 w-full bg-neutral-800 rounded-full transition-all group-hover:w-3" />
            <span className="h-0.5 w-2.5 bg-neutral-800 rounded-full transition-all group-hover:w-full" />
          </div>
          <span className="tracking-tight">Menu</span>
        </button>
      </div>

      {/* Center: Brand Identity Logo (strictly centered) */}
      <div className="flex items-center justify-center px-1 sm:px-3">
        <a
          id="nav-brand-logo"
          aria-label="Sai Sk Palace Home"
          className="inline-flex items-center gap-2 text-neutral-900 font-bold tracking-tight cursor-pointer hover:opacity-85 transition-opacity select-none"
          href="#"
        >
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-500 shadow-xs flex items-center justify-center shrink-0">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-current" viewBox="0 0 24 24">
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
          </span>
          <span className="font-display font-bold text-xs xs:text-sm sm:text-base text-neutral-900 tracking-tight whitespace-nowrap">
            Sai Sk Palace
          </span>
        </a>
      </div>

      {/* Right: Quick Actions (Call & Quick Reserve) */}
      <div className="flex items-center justify-end gap-1.5 sm:gap-2">
        <button
          id="btn-quick-reserve"
          type="button"
          onClick={onOpenBooking}
          className="hidden md:inline-flex bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all shadow-xs cursor-pointer shrink-0"
        >
          Book Stay
        </button>
        <a
          id="nav-btn-call"
          className="bg-[#181818] hover:bg-black text-white text-xs font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all shadow-xs whitespace-nowrap inline-flex items-center gap-1.5 sm:gap-2 shrink-0 active:scale-95"
          href="tel:+919730416763"
          title="Call Hotel: +91 9730416763"
          aria-label="Call +91 9730416763"
        >
          <svg className="w-3.5 h-3.5 text-orange-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.053 15.053 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 3.99c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
          </svg>
          {/* Mobile view: neat 'Call' pill to balance the 'Menu' button on the left */}
          <span className="sm:hidden font-semibold text-xs">Call</span>
          {/* Tablet/Desktop view: show full phone number */}
          <span className="hidden sm:inline font-normal text-xs tracking-tight">+91 9730416763</span>
        </a>
      </div>
    </header>
  );
}
