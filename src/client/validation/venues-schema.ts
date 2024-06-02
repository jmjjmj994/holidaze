import { z } from 'zod';

const MediaSchema = z.object({
  url: z.string().default(''),
  alt: z.string().default(''),
});

const LocationSchema = z.object({
  address: z.string().nullable().default(null),
  city: z.string().nullable().default(null),
  zip: z.string().nullable().default(null),
  country: z.string().nullable().default(null),
  continent: z.string().nullable().default(null),
  lat: z
    .number()
    .nullable()
    .transform((val) => val ?? 0)
    .default(null)
    .optional(),
  lng: z
    .number()
    .nullable()
    .transform((val) => val ?? 0)
    .default(null)
    .optional(),
});

const MetaSchema = z.object({
  wifi: z.boolean(),
  parking: z.boolean(),
  breakfast: z.boolean(),
  pets: z.boolean(),
});

const OwnerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  bio: z.string().nullable().default(null),
  avatar: MediaSchema,
  banner: MediaSchema,
});

const BookingSchema = z.object({
  id: z.string(),
  dateFrom: z.string(),
  dateTo: z.string(),
  guests: z.number(),
  created: z.string(),
  updated: z.string(),
  customer: z.object({
    name: z.string(),
    email: z.string(),
    bio: z.string().nullable().default(null),
    avatar: MediaSchema,
    banner: MediaSchema,
  }),
});

export const VenueSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  media: z.array(MediaSchema).optional().default([]),
  price: z.number().default(0),
  maxGuests: z.number(),
  rating: z.number().default(0),
  created: z.string(),
  updated: z.string(),
  meta: MetaSchema,
  location: LocationSchema,
  owner: OwnerSchema.optional(),
  bookings: z.array(BookingSchema).default([]),
});

export const VenuesSchema = z.object({
  data: z.array(VenueSchema),
  meta: z.object({
    nextPage: z.number().nullable().optional(),
  }),
});

export type VenuesResponse = z.infer<typeof VenuesSchema>;
export type Venue = z.infer<typeof VenueSchema>;
