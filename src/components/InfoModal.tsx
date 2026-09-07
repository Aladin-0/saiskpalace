interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export function InfoModal({ isOpen, onClose, title, content }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#f5f4ef] rounded-3xl max-w-md w-full shadow-2xl border border-neutral-300 p-6 sm:p-7 relative text-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 flex items-center justify-center text-xs transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
            Sai Sk Palace Information
          </span>
        </div>

        <h3 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 mb-3 leading-snug">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-6">
          {content}
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-neutral-900 hover:bg-black text-white rounded-full text-xs font-semibold cursor-pointer transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
