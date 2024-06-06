type Customer = {
  name: string;
  email: string;
  bio: string;
  banner: MediaObject;
  avatar: MediaObject;
};

export type Bookings = {
  id: string;
  created: string;
  customer: Customer;
  dateFrom: string;
  dateTo: string;
  guests: number;
  updated: string;
  price: number;
};

export type Location = {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
};

export type Media = {
  url: string;
  alt: string;
}[];

export type MediaObject = { url: string; alt: string };
export type DataMeta = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};


export type VenueResponse = {
  data: {
    id: string;
    name: string;
    description: string;
    media: {
      url: string;
      alt: string;
    }[];
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: DataMeta;
    location: Location;
    bookings: Bookings;
    owner: {
      name: string;
      avatar: MediaObject;
      banner: MediaObject;
      bio: string;
      email: string;
    };
  };
};
