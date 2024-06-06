type Media = {
  url: string;
  alt: string;
};

type VenueMeta = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};

type LocationType = {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
};

type Venue = {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: LocationType;
};

type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
};

type Count = {
  venues: number;
  bookings: number;
};

/* type UserData = {
  name: string;
  email: string;
  bio: string;
  avatar: Image;
  banner: Image;
  venueManager: boolean;
  venues: Venue[];
  bookings: Booking[];
  _count: Count;
}; */

export type ProfileResponse = {
  data: {
    name: string;
    email: string;
    bio: string;
    avatar: Media;
    banner: Media;
    bookings: Booking[];
    venueManager: boolean;
    _count: Count;
  };
};

type Meta = {};
