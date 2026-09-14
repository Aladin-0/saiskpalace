export interface Amenity {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  icon: string; // SVG path string
}

export const AMENITIES: Amenity[] = [
  {
    id: 'parking',
    title: 'Free Car Parking',
    shortDesc: 'Secure on-site',
    description: 'Ample and secure free car parking space for all our guests.',
    icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' // simplified icon
  },
  {
    id: 'hotwater',
    title: '24 Hrs Hot Water',
    shortDesc: 'Continuous supply',
    description: '24 hours hot and cold water available in all rooms.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z' // lightning/energy or water drop
  },
  {
    id: 'generator',
    title: 'Generator Facility',
    shortDesc: 'Uninterrupted power',
    description: '100% power backup with generator facility.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z' 
  },
  {
    id: 'cctv',
    title: 'CCTV Camera',
    shortDesc: 'All areas covered',
    description: '24/7 CCTV surveillance across the entire property for your safety.',
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
  },
  {
    id: 'solar',
    title: 'Solar Plant',
    shortDesc: 'Eco-friendly',
    description: 'All systems powered by an electric and water solar plant.',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
  },
  {
    id: 'lift',
    title: 'Lift Service',
    shortDesc: 'Easy access',
    description: 'Elevator access available to all floors.',
    icon: 'M8 9l4-4 4 4m0 6l-4 4-4-4m4-10v14' // up/down arrows
  },
  {
    id: 'tv',
    title: 'TV Channels',
    shortDesc: 'Entertainment',
    description: 'Cable TV channel service available in every room.',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    id: 'wifi',
    title: 'Free Wi-Fi',
    shortDesc: 'High-speed internet',
    description: 'Complimentary high-speed Wi-Fi access throughout the hotel.',
    icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0'
  },
  {
    id: 'gym',
    title: 'Gym Service',
    shortDesc: 'Stay fit',
    description: 'Fully equipped modern gym service for your daily workouts.',
    icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
  },
  {
    id: 'spa',
    title: 'Spa Facility',
    shortDesc: 'Relaxation',
    description: 'Rejuvenate yourself with our premium spa facility.',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' // sparkles
  },
  {
    id: 'conference',
    title: 'Conference Hall',
    shortDesc: 'Marriage & events',
    description: 'Spacious conference and marriage hall for your special events.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    id: 'garden',
    title: 'Garden Area',
    shortDesc: 'Peaceful',
    description: 'Lush green garden area and playground for children.',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  {
    id: 'traveldesk',
    title: 'Travel Desk',
    shortDesc: 'Tours & cabs',
    description: '24 hours travel desk for all your transportation needs.',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' // map/house
  },
  {
    id: 'kits',
    title: 'Complimentary Kits',
    shortDesc: 'Essentials provided',
    description: 'Free towel, soap, soft shampoo, Colgate, brush, and mineral water bottle.',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
  }
];
