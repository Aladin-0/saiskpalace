import { useState } from 'react';

const faqs = [
  {
    question: "How far is Hotel Sai SK Palace from the Shirdi Sai Baba Mandir?",
    answer: "Hotel Sai SK Palace is just a short walking distance from the Shri Sai Baba Samadhi Mandir in Shirdi, making it extremely convenient for early morning Kakad Aarti and darshan."
  },
  {
    question: "Does Hotel Sai SK Palace have secure car parking?",
    answer: "Yes! We offer ample, secure on-site free car parking for all our guests, ensuring your vehicle is safe throughout your stay."
  },
  {
    question: "Are the rooms at Hotel Sai SK Palace air-conditioned?",
    answer: "Absolutely. We offer premium AC rooms including Deluxe Double and Classic Triple Bed AC rooms, providing ultimate comfort during Shirdi's hot summers."
  },
  {
    question: "Is 24-hour hot water available?",
    answer: "Yes, we provide 24 hours of hot and cold water in all our rooms, powered by our eco-friendly solar plant system."
  },
  {
    question: "Do you offer family rooms?",
    answer: "Yes, we have spacious family rooms (up to 4 beds) designed specifically for groups and families visiting Shirdi on a pilgrimage."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Generate JSON-LD for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-[1000px] mx-auto" data-purpose="seo-faq">
      {/* Inject Schema for Answer Engine Optimization */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="text-center mb-10 sm:mb-16">
        <span className="text-[#c25a1b] font-bold text-xs uppercase tracking-widest mb-2 block">Common Questions</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`border border-neutral-200 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white shadow-lg shadow-orange-900/5 border-orange-200' : 'bg-neutral-50 hover:bg-white'}`}
            >
              <button
                className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <h3 className={`font-bold text-base sm:text-lg transition-colors ${isOpen ? 'text-[#c25a1b]' : 'text-neutral-800'}`}>
                  {faq.question}
                </h3>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-orange-100 text-[#c25a1b] rotate-180' : 'bg-neutral-200 text-neutral-500'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="px-6 pb-6 sm:px-8 sm:pb-8 text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
