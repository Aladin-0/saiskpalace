export type TravelTab = 'Flights' | 'Trains' | 'Bus & Travel' | 'Activity';

export interface ExperienceItem {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  category: TravelTab;
  tag?: string;
  description?: string;
}

export interface AmenityItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  stayDate: string;
  initials: string;
  avatarBg: string;
  avatarTextColor: string;
  rating: number;
}

export interface SacredPlace {
  id: string;
  name: string;
  badge: string;
  image: string;
  description: string;
  timingHighlight?: {
    morning: string;
    evening: string;
  };
  significance?: string;
}

export interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  rooms: number;
  children: number;
}
