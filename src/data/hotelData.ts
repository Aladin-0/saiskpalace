import { AmenityItem, ExperienceItem, ReviewItem, SacredPlace } from '../types';

export const EXPERIENCES_DATA: Record<string, ExperienceItem[]> = {
  'Happy Customer': [
    { id: 'hc-1', title: 'Happy Guest', location: 'Sai Sk Palace', price: 0, rating: 5, image: '/images/groupfoto.jpeg', category: 'Happy Customer' },
    { id: 'hc-2', title: 'Group Visit', location: 'Sai Sk Palace', price: 0, rating: 5, image: '/images/groupfoto2.jpeg', category: 'Happy Customer' },
    { id: 'hc-3', title: 'Happy Family', location: 'Sai Sk Palace', price: 0, rating: 5, image: '/images/groupfoto3.jpeg', category: 'Happy Customer' },
    { id: 'hc-4', title: 'Guest Group', location: 'Sai Sk Palace', price: 0, rating: 5, image: '/images/group photos.jpeg', category: 'Happy Customer' },
    { id: 'hc-5', title: 'Pilgrimage Group', location: 'Sai Sk Palace', price: 0, rating: 5, image: '/images/groupfotos.jpeg', category: 'Happy Customer' },
    { id: 'hc-6', title: 'Happy Devotees', location: 'Sai Sk Palace', price: 0, rating: 5, image: '/images/groupfotos3.jpeg', category: 'Happy Customer' },
    { id: 'hc-7', title: 'Special Visit', location: 'Sai Sk Palace', price: 0, rating: 5, image: '/images/groupfotos4.jpeg', category: 'Happy Customer' },
    { id: 'hc-8', title: 'Family Stay', location: 'Sai Sk Palace', price: 0, rating: 5, image: '/images/groupfotos5.jpeg', category: 'Happy Customer' },
    { id: 'hc-9', title: 'Group Tour', location: 'Sai Sk Palace', price: 0, rating: 5, image: '/images/groupfotos6.jpeg', category: 'Happy Customer' },
    { id: 'hc-10', title: 'Our Guests', location: 'Sai Sk Palace', price: 0, rating: 5, image: '/images/groupfots4.jpeg', category: 'Happy Customer' },
  ],
  'Our Rooms': [
    { id: 'rm-1', title: 'Double Bed Non AC', location: 'Main Wing', price: 1299, rating: 5, image: '/images/room3.jpeg', category: 'Our Rooms' },
    { id: 'rm-2', title: 'Double Bed Deluxe AC', location: 'Deluxe Category', price: 1499, rating: 5, image: '/images/room4.jpeg', category: 'Our Rooms' },
    { id: 'rm-3', title: 'Triple Bed Non AC', location: 'Main Wing', price: 1699, rating: 5, image: '/images/room5.jpeg', category: 'Our Rooms' },
    { id: 'rm-4', title: 'Classic Triple Bed AC', location: 'Deluxe Category', price: 2000, rating: 5, image: '/images/room6.jpeg', category: 'Our Rooms' },
    { id: 'rm-5', title: 'Family 4 Bed Non AC', location: 'Main Wing', price: 2199, rating: 5, image: '/images/rooms.jpeg', category: 'Our Rooms' },
    { id: 'rm-6', title: 'Family 4 Bed Deluxe AC', location: 'Deluxe Category', price: 2499, rating: 5, image: '/images/rooms2.jpeg', category: 'Our Rooms' },
  ],
  'Hotel Exteriors/Lobby': [
    { id: 'ht-1', title: 'Hotel Exterior', location: 'Main Entrance', price: 0, rating: 5, image: '/images/hotel.jpeg', category: 'Hotel Exteriors/Lobby' },
    { id: 'ht-2', title: 'Lobby & Reception', location: 'Ground Floor', price: 0, rating: 5, image: '/images/hotel2.jpeg', category: 'Hotel Exteriors/Lobby' },
    { id: 'ht-3', title: 'Entrance View', location: 'Main Entrance', price: 0, rating: 5, image: '/images/hotel3.jpeg', category: 'Hotel Exteriors/Lobby' },
    { id: 'ht-4', title: 'Property View', location: 'Exterior', price: 0, rating: 5, image: '/images/hotel4.jpeg', category: 'Hotel Exteriors/Lobby' },
  ]
};

export const AMENITIES: AmenityItem[] = [
  { id: 'parking', title: 'Free Car Parking', subtitle: 'Secure on-site', iconName: 'parking', description: 'Ample and secure free car parking space for all our guests.' },
  { id: 'water', title: '24 Hrs Hot Water', subtitle: 'Continuous supply', iconName: 'pool', description: '24 hours hot and cold water available in all rooms.' },
  { id: 'power', title: 'Generator Facility', subtitle: 'Uninterrupted power', iconName: 'business', description: '100% power backup with generator facility.' },
  { id: 'security', title: 'CCTV Camera', subtitle: 'All areas covered', iconName: 'cctv', description: '24/7 CCTV surveillance across the entire property for your safety.' },
  { id: 'solar', title: 'Solar Plant', subtitle: 'Eco-friendly', iconName: 'climate', description: 'All systems powered by an electric and water solar plant.' },
  { id: 'lift', title: 'Lift Service', subtitle: 'Easy access', iconName: 'lift', description: 'Elevator access available to all floors.' },
  { id: 'tv', title: 'TV Channels', subtitle: 'Entertainment', iconName: 'business', description: 'Cable TV channel service available in every room.' },
  { id: 'wifi', title: 'Free Wi-Fi', subtitle: 'High-speed internet', iconName: 'wifi', description: 'Complimentary high-speed Wi-Fi access throughout the hotel.' },
  { id: 'gym', title: 'Gym Service', subtitle: 'Stay fit', iconName: 'fitness', description: 'Fully equipped modern gym service for your daily workouts.' },
  { id: 'spa', title: 'Spa Facility', subtitle: 'Relaxation', iconName: 'pool', description: 'Rejuvenate yourself with our premium spa facility.' },
  { id: 'hall', title: 'Conference Hall', subtitle: 'Marriage & events', iconName: 'business', description: 'Spacious conference and marriage hall for your special events.' },
  { id: 'garden', title: 'Garden Area', subtitle: 'Peaceful', iconName: 'smoke-free', description: 'Lush green garden area and playground for children.' },
  { id: 'travel', title: 'Travel Desk', subtitle: 'Tours & cabs', iconName: 'shuttle', description: '24 hours travel desk for all your transportation needs.' },
  { id: 'room-amenities', title: 'Complimentary Kits', subtitle: 'Essentials provided', iconName: 'room-service', description: 'Free towel, soap, soft shampoo, Colgate, brush, and mineral water bottle.' }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    quote: '"An absolute gem. The attention to detail, warm ambient aesthetic, and effortless check-in made our Shirdi pilgrimage and weekend getaway truly magical."',
    author: 'Aarav & Lea Sharma',
    stayDate: 'Stayed at Sai Sk Palace • Oct 2024',
    image: '/images/groupfoto.jpeg',
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
    image: '/images/groupfoto2.jpeg',
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
    image: '/images/groupfoto3.jpeg',
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
    badge: 'Just walkable distance',
    image: '/images/samadhi-user.png',
    description: "The sanctum sanctorum housing Sai Baba's divine marble Samadhi, where morning Kakad Aarti and evening Shej Aarti draw thousands of seekers daily.",
    timingHighlight: {
      morning: '05:30 AM – 11:30 AM',
      evening: '04:00 PM – 09:45 PM'
    }
  },
  {
    id: 'dwarkamai',
    name: 'Dwarkamai Masjid',
    badge: 'Just walkable distance',
    image: '/images/dwarkamai-user.png',
    description: 'The sacred historic mosque where Baba resided for 60 uninterrupted years, maintaining the perpetual holy fire (Dhuni Maa).',
    significance: 'Sacred home of Dhuni Maa and holy Udi ash.'
  },
  {
    id: 'samadhi-mandir-carousel',
    name: 'Shri Sai Baba Samadhi Mandir',
    badge: '5 mins walkable',
    image: '/images/samadhi-user.png',
    description: 'The heart of Shirdi. Our hotel is proudly located at just a 5 minute walkable distance from the sacred Samadhi Mandir, offering unparalleled convenience for devotees.',
  },
  {
    id: 'saiteerth',
    name: 'Sai Teerth Spiritual Theme Park',
    badge: '5 mins drive',
    image: '/images/theme-park.jpg',
    description: 'India\'s first devotional theme park. Experience the life of Sai Baba through 5D shows, immersive robotic theatricals, and laser shows.',
    significance: 'A modern technological marvel celebrating devotion and faith.'
  },
  {
    id: 'wetnjoy',
    name: 'Wet N Joy Water Park',
    badge: 'Family Fun',
    image: '/images/water-park.jpg',
    description: 'Maharashtra\'s premier water park featuring thrilling water rides, a massive wave pool, and safe kids play areas. Perfect for a family day out!',
    significance: 'The ultimate recreation spot after your peaceful pilgrimage.'
  },
  {
    id: 'sainagar-station',
    name: 'Sainagar Shirdi Railway Station',
    badge: '10 mins drive',
    image: '/images/station.jpg',
    description: 'The main railway station (SNSI) connecting the holy city of Shirdi to major metropolitan cities across India. A modern and highly accessible transit hub.',
    timingHighlight: {
      morning: 'Open 24 Hours',
      evening: 'Open 24 Hours'
    }
  },
  {
    id: 'lendi-baug',
    name: 'Lendi Baug Garden',
    badge: 'Walkable',
    image: '/images/lendi-baug.jpg',
    description: 'A beautiful garden meticulously watered and nurtured by Sai Baba himself. It features the eternal lamp (Nanda Deep) and a sacred Peepal tree.',
    significance: 'Baba spent hours in meditation here daily.'
  },
  {
    id: 'dixit-wada',
    name: 'Dixit Wada Museum',
    badge: 'Within Temple Complex',
    image: '/images/museum.jpg',
    description: 'A fascinating museum showcasing vintage artifacts, original photographs, Baba\'s kafni (robes), and items used by Sai Baba during his lifetime.',
    timingHighlight: {
      morning: '10:00 AM – 06:00 PM',
      evening: 'Closed on Thursdays'
    }
  },
  {
    id: 'trimbakeshwar',
    name: 'Trimbakeshwar Shiva Temple',
    badge: 'Nashik (90km)',
    image: '/images/nashik-trimbakeshwar.png',
    description: 'An ancient Hindu temple in the town of Trimbak. It is dedicated to Lord Shiva and is one of the twelve Jyotirlingas, where the sacred Godavari river originates.',
  },
  {
    id: 'sula-vineyards',
    name: 'Sula Vineyards',
    badge: 'Nashik (90km)',
    image: '/images/nashik-sula.png',
    description: 'India\'s most famous winery. Enjoy wine tasting, vineyard tours, and beautiful sunset views across the grapevines in Nashik.',
  },
  {
    id: 'panchavati',
    name: 'Panchavati & Ramkund',
    badge: 'Nashik (85km)',
    image: '/images/nashik-panchavati.png',
    description: 'A holy land along the Godavari river. According to the Ramayana, Lord Rama, Sita, and Lakshmana stayed here during their exile.',
  },
  {
    id: 'pandavleni',
    name: 'Pandavleni Caves',
    badge: 'Nashik (95km)',
    image: '/images/nashik-pandavleni.png',
    description: 'A group of 24 ancient rock-cut caves dating back to the 3rd century BCE, representing the Hinayana Buddhist traditions with stunning carvings.',
  },
  {
    id: 'ellora-caves',
    name: 'Ellora Caves',
    badge: 'UNESCO Heritage (100km)',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
    description: 'A UNESCO World Heritage Site featuring monumental rock-cut cave temples and monasteries (Hindu, Buddhist, and Jain) showcasing ancient Indian architecture.',
  },
  {
    id: 'shani',
    name: 'Shani Shingnapur',
    badge: '70km Away',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80',
    description: 'A famous village where houses have no doors, due to the absolute faith in Lord Shani. A very popular day trip for Shirdi pilgrims.',
    significance: 'A testament to unshakable faith and security.'
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
