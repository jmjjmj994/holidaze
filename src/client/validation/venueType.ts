export type Welcome = {
  data: VenueResponse;
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
    media: MediaObject;
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: DataMeta;
    location: Location;
    owner: {
      name: string;
      avatar: MediaObject;
      banner: MediaObject;
      bio: string;
      email: string;
    };
  };
};
