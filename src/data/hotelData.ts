import { AmenityItem, ExperienceItem, ReviewItem, SacredPlace } from '../types';

export const EXPERIENCES_DATA: Record<string, ExperienceItem[]> = {
  Activity: [
    {
      id: 'act-1',
      title: 'Oxford Artisan',
      location: 'Old Depot',
      price: 21,
      rating: 5,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1VS74Tyn-wpoFYRES4hy0c3mTG7g0T9sP0i_HFfFex-dub4d8HvVzAJGcy0xQvEVlt3tFloD8hgbDQG0KQDZST6ky4pX2yIVdHG54RsqB6ZNzrJmAa3nCn3HxY4E9HcLm1RecdinIp-ekuUXKCtRymYfZ5JDZXkz5NAUz9CNjBYbamCg9Ni8Nf4nUcHrDmaWAyr420OKSooYufhzhrvYgG90gOr7cT90JeKUnkFAfWaUlh_kP9RpyDwNL0',
      category: 'Activity',
      description: 'Handcrafted local heritage tour showcasing historic handicraft studios and artisanal workshops.'
    },
    {
      id: 'act-2',
      title: 'Oxford Walking Tour',
      location: 'City Center',
      price: 25,
      rating: 5,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1Uaknq58MK_RA-Oi8CnDe5L-TSQuSALgqe4tI1_lXL6jxUVJkXK_huCUnTssRtpIqgGKOWMQyRXmclF7lyrhW6soGDZFj7gbYQIcy4rCTnwcEVODg1S3Y4nsN5TwtvdTXFLd7NdCu9qQT5FzoA3Bi83rRfixvhN4u5gCTxo-2HvSTjj_HfGowldkvuveGEzxb7_L86zURukYsbt7mimQy0AxllMydBFVDg04ui82VdICk1C1X5GFwnX4KU',
      category: 'Activity',
      description: 'Guided architectural walk exploring stone alleyways, storied libraries, and historic towers.'
    },
    {
      id: 'act-3',
      title: 'Malmaison Oxford',
      location: 'Oxford Castle',
      price: 211,
      rating: 5,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1VS74Tyn-wpoFYRES4hy0c3mTG7g0T9sP0i_HFfFex-dub4d8HvVzAJGcy0xQvEVlt3tFloD8hgbDQG0KQDZST6ky4pX2yIVdHG54RsqB6ZNzrJmAa3nCn3HxY4E9HcLm1RecdinIp-ekuUXKCtRymYfZ5JDZXkz5NAUz9CNjBYbamCg9Ni8Nf4nUcHrDmaWAyr420OKSooYufhzhrvYgG90gOr7cT90JeKUnkFAfWaUlh_kP9RpyDwNL0',
      category: 'Activity',
      description: 'Exclusive heritage stay suite combining historic fortress masonry with contemporary luxury hospitality.'
    }
  ],
  Flights: [
    {
      id: 'fl-1',
      title: 'Mumbai - Shirdi Express (SAG)',
      location: 'Shirdi International Airport',
      price: 48,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
      category: 'Flights',
      description: 'Direct 45-minute daily regional shuttle flights connecting Mumbai (BOM) to Shirdi (SAG).'
    },
    {
      id: 'fl-2',
      title: 'Delhi - Shirdi Non-stop',
      location: 'Shirdi International Airport',
      price: 72,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80',
      category: 'Flights',
      description: 'Early morning direct flights ideal for same-day darshan and evening return pilgrimage.'
    },
    {
      id: 'fl-3',
      title: 'Hyderabad - Shirdi Jet',
      location: 'Shirdi International Airport',
      price: 54,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80',
      category: 'Flights',
      description: 'Convenient morning arrival flight with hotel airport shuttle pickup included.'
    }
  ],
  Trains: [
    {
      id: 'tr-1',
      title: 'Vande Bharat Express (Mumbai)',
      location: 'Sainagar Shirdi (SNSI)',
      price: 18,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
      category: 'Trains',
      description: 'High-speed executive chair car express connecting CSMT Mumbai to Sainagar Shirdi in under 5 hours.'
    },
    {
      id: 'tr-2',
      title: 'Sainagar Superfast Express',
      location: 'Sainagar Shirdi Station',
      price: 14,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=800&q=80',
      category: 'Trains',
      description: 'Comfortable 1st & 2nd AC sleeper train arriving directly within 8 minutes of Sai Sk Palace.'
    },
    {
      id: 'tr-3',
      title: 'Dadar Shirdi Overnight Special',
      location: 'Sainagar Shirdi Station',
      price: 16,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=800&q=80',
      category: 'Trains',
      description: 'Overnight rest coaches timing perfectly for Kakad Aarti 5:30 AM entry.'
    }
  ],
  'Bus & Travel': [
    {
      id: 'bus-1',
      title: 'Volvo Multi-Axle AC Sleeper',
      location: 'Private Fleet Gate Drop',
      price: 15,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      category: 'Bus & Travel',
      description: 'Luxury air-suspension sleeper coaches from Pune, Nashik, and Mumbai directly to hotel gates.'
    },
    {
      id: 'bus-2',
      title: 'Private Chauffeur Sedan',
      location: 'Doorstep Pickup',
      price: 65,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      category: 'Bus & Travel',
      description: 'Dedicated air-conditioned luxury sedan for Shani Shingnapur & Trimbakeshwar pilgrimage excursions.'
    },
    {
      id: 'bus-3',
      title: 'Executive Pilgrim Minivan',
      location: 'Family Group Travel',
      price: 95,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
      category: 'Bus & Travel',
      description: 'Spacious 9-12 passenger van customized for multi-generational families with luggage.'
    }
  ]
};

export const AMENITIES: AmenityItem[] = [
  {
    id: 'wifi',
    title: 'Free Wi-Fi',
    subtitle: 'High-speed fiber',
    iconName: 'wifi',
    description: 'Dedicated gigabit mesh connectivity throughout all suites, dining terraces, and prayer areas.'
  },
  {
    id: 'breakfast',
    title: 'Breakfast',
    subtitle: 'Artisan buffet',
    iconName: 'coffee',
    description: 'Satvik vegetarian breakfast spread with fresh South Indian delicacies, herbal teas, and regional fresh fruits.'
  },
  {
    id: 'parking',
    title: 'Free Parking',
    subtitle: 'Secure on-site',
    iconName: 'parking',
    description: 'CCTV monitored covered valet parking with EV charging stations for peace of mind.'
  },
  {
    id: 'accessible',
    title: 'Accessible',
    subtitle: 'Step-free access',
    iconName: 'accessible',
    description: 'Complete wheelchair accessibility, elevator access to all floors, and ramped temple entry pathways.'
  },
  {
    id: 'pool',
    title: 'Pool',
    subtitle: 'Heated outdoor',
    iconName: 'pool',
    description: 'Serene temperature-regulated courtyard plunge pool surrounded by fragrant jasmine and stone pavers.'
  },
  {
    id: 'climate',
    title: 'Climate Control',
    subtitle: 'Air-conditioned',
    iconName: 'climate',
    description: 'Individual multi-zone silent inverter climate control in each suite.'
  },
  {
    id: 'laundry',
    title: 'Laundry',
    subtitle: 'Express service',
    iconName: 'laundry',
    description: 'Same-day steam pressing and organic laundry care for traditional pilgrimage attire.'
  },
  {
    id: 'business',
    title: 'Business Centre',
    subtitle: 'Workspaces & pods',
    iconName: 'business',
    description: 'Quiet work pods equipped with ergonomic seating, printers, and meeting facilities.'
  },
  {
    id: 'pets',
    title: 'Pet-Friendly',
    subtitle: 'Welcome treats',
    iconName: 'pets',
    description: 'Dedicated pet suites, organic treats, and mindful garden walking paths.'
  },
  {
    id: 'room-service',
    title: 'Room Service',
    subtitle: '24/7 in-suite',
    iconName: 'room-service',
    description: 'Around-the-clock satvik dining and herbal beverage delivery right to your door.'
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    subtitle: 'Chef-curated',
    iconName: 'restaurant',
    description: 'Authentic Maharashtrian and multi-cuisine pure-vegetarian dining prepared with pure ghee.'
  },
  {
    id: 'shuttle',
    title: 'Airport Shuttle',
    subtitle: 'Direct transfers',
    iconName: 'shuttle',
    description: 'Chauffeured pickup from Shirdi Airport (SAG) and Sainagar Railway Station.'
  },
  {
    id: 'fitness',
    title: 'Fitness Centre',
    subtitle: 'Modern gym',
    iconName: 'fitness',
    description: 'Cardio equipment, yoga mats, meditation room, and guided morning pranayama sessions.'
  },
  {
    id: 'smoke-free',
    title: 'Smoke-Free',
    subtitle: 'Clean air rooms',
    iconName: 'smoke-free',
    description: '100% smoke-free property with HEPA air filtration for a pristine and sacred atmosphere.'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    quote: '"An absolute gem. The attention to detail, warm ambient aesthetic, and effortless check-in made our Shirdi pilgrimage and weekend getaway truly magical."',
    author: 'Aarav & Lea Sharma',
    stayDate: 'Stayed at Sai Sk Palace • Oct 2024',
    initials: 'AL',
    avatarBg: 'bg-orange-500',
    avatarTextColor: 'text-white',
    rating: 5
  },
  {
    id: 'rev-2',
    quote: '"The rooms exceeded all expectations. Crisp linens, exquisite design, and immediate responses whenever we needed temple aarti schedule recommendations."',
    author: 'Elena Chen',
    stayDate: 'Stayed at Sai Sk Palace • Sep 2024',
    initials: 'EC',
    avatarBg: 'bg-[#181818]',
    avatarTextColor: 'text-white',
    rating: 5
  },
  {
    id: 'rev-3',
    quote: '"Booking with Sai Sk Palace was frictionless. Our room felt like a luxury editorial spread and the proximity to Gate 2 made our early morning Kakad Aarti visit effortless."',
    author: 'Marcus Reed',
    stayDate: 'Stayed at Sai Sk Palace • Oct 2024',
    initials: 'MR',
    avatarBg: 'bg-[#dedad0]',
    avatarTextColor: 'text-neutral-900',
    rating: 5
  }
];

export const SACRED_PLACES: SacredPlace[] = [
  {
    id: 'samadhi-mandir',
    name: 'Shri Sai Baba Samadhi Mandir',
    badge: '400m (4 Min Walk via Gate 2)',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1VnByZZSXqIFtM4cOYOFch91UixtuwItP55qClfYjNOrS7Uj6GdLiuMCREd2YRmdDb5QoDlbNaBfbmIFOSreoRGlKImQlyEkfgJrWRk_Z5xJbp27rn9EIH3OctmxbDLIFU0E1qGs64fX0dWn9-sxKucIe9rZ2qVfy8Jl4IAwkEh5Pa7acPZbazUnPJNFRQm-UwMF7mqNmdFBteowjR9yX63_v8rUyLleFfzdwLncFNHxmUuXmyc76tE4Ww',
    description: "The sanctum sanctorum housing Sai Baba's divine marble Samadhi, where morning Kakad Aarti and evening Shej Aarti draw thousands of seekers daily.",
    timingHighlight: {
      morning: '05:30 AM – 11:30 AM',
      evening: '04:00 PM – 09:45 PM'
    }
  },
  {
    id: 'dwarkamai',
    name: 'Dwarkamai Masjid',
    badge: '600m (6 Min Walk)',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1XXoU3VyV8WJhHM07XhWtOMTMSaBkOub0e1kspH-XOzqIvMB0evyJut-JiDnB27iIdc9Bbb7ILP_5THh9rwWKx9d_qBeAbVesrCHJxis0196wj7XbP3G7TRC8euMmfXYItYhgtF8tTKyEUUzF53NGmkH_H4ViB35xWRUk-uUWvpd5oSZWCPtkLOC6s0tE2zDu4FBC_CqfPs7BFf9hxEPfPOuMsLSOZIrpM9o6x3FghwTLrzZ8nEoa96fg',
    description: 'The sacred historic mosque where Baba resided for 60 uninterrupted years, maintaining the perpetual holy fire (Dhuni Maa).',
    significance: 'Sacred home of Dhuni Maa and holy Udi ash.'
  },
  {
    id: 'chavadi',
    name: 'Chavadi',
    badge: '550m Walk',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1WpfpAS1rJVedW1Z1r280IBWFm7hS3opZX-mOGZMS9-HkX-v7MfZlYE7bMH_VRTHXn4SrXm4b9XL0y9iYm4ld2QGsgUcUVtjWan3VN3TwHy-8_A8iw9Qf83L_uWq56S_EeJV-jLSK_3OIGyHcQkYz0D9cSQHaWyjvXFzolc17mQjpHBrWRLDmoGjIY5p3kjTeaJdtkoQ2mP7tpIblqd9-kJbuSZ-qVIvetOrkarqqslzaFOQi0blzW6Qk0',
    description: 'Baba slept here every alternate night. The traditional Palki procession moves from Dwarkamai to Chavadi with joyous devotional chants.'
  },
  {
    id: 'lendibaug',
    name: 'Lendibaug Garden',
    badge: '700m Walk',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1XfaI5QHMiSsP0fjFY7T_IbSmmMXdtIo8DzISjQIT-EDTPg8Q6AurTnCoroyaiAgYdwMKGzH077WSO4S8b9Co97nUEaqXfFcWCXmHT6EoAvCppmHbWJSENkczT_BCFXn-3BV4UlRIWWqezXsgSNTudKTeEXjhzUDYZoU-zVwTbzACRylg2v26MLaol2Ugtx8qkRgO20DSsHvS625h_zX8hPSMsT6Jl3OcWJg3lV3Rvm0__lUkmxC-QH6w',
    description: 'Serene garden nurtured by Baba with his own hands. Houses the perpetually glowing Nanda Deep enclosed within marble grills.'
  },
  {
    id: 'khandoba',
    name: 'Khandoba Temple',
    badge: '1.2 km Buggy',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1VWnv5VBYANDMDRzkqs2W4XzblYtswh7glAiB_8yNHInMfHixprRzbkfMxgRmeNft-m5tweRLmnu4tJHVA1mpTYEb5xFbsD_8C9Gw1ZG1oqpju50IRfOIV0AlLp_4TF_07Zv4IufGvDli6bPhJdNBto1QBtU9hj5aN2-cBceDJb2pmfN091nyb_3X_bC3fPO2tSPAMRQVCbXJsQftqazCDMs5ruVMQDi5foxPYAZLPffgmapX19oPLAyA',
    description: "Ancient stone threshold of Shirdi where devotee priest Mhalsapati first welcomed the young nameless ascetic with the blessed greeting: 'Aao, Sai!'"
  }
];

export const TEMPLE_TIMINGS = [
  { aarti: 'Kakad Aarti (Morning)', time: '04:30 AM – 05:00 AM', notes: 'Early morning holy awakening. Line queue opens at Gate 3 at 03:30 AM.' },
  { aarti: 'Holy Snan & Abhishek', time: '05:05 AM – 05:40 AM', notes: 'Sacred bath of Shri Sai Baba marble deity.' },
  { aarti: 'Darshan Starts', time: '05:40 AM – 11:30 AM', notes: 'General and VIP pass darshan available via Gate 2.' },
  { aarti: 'Madhyan Aarti (Noon)', time: '12:00 PM – 12:30 PM', notes: 'Midday prayer chant. Large devotion gathering.' },
  { aarti: 'Dhoop Aarti (Sunset)', time: 'Sunset (approx. 06:15 PM)', notes: 'Evening incense ritual and devotional hymns.' },
  { aarti: 'Shej Aarti (Night)', time: '10:00 PM – 10:30 PM', notes: 'Final bedtime hymn. Temple sanctum closes at 11:15 PM.' }
];
