export type Welcome = {
  data: VenueResponse;
};

export type Location = {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
};

export type Media = {
  url: string;
  alt: string;
};

export type DataMeta = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};
export type VenueResponse = {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: DataMeta;
  location: Location;
};
