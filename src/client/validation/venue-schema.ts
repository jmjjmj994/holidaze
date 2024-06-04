import { z } from 'zod';

const MediaSchema = z.object({
  url: z.string().default(''),
  alt: z.string().default(''),
});

// Venue schema
export const venueSchema = z.object({
  id: z.string().default(''),
  name: z.string().default(''),
  description: z.string().default(''),
  _count: z
    .object({
      bookings: z.number().default(0),
    })
    .optional(),
  owner: z
    .object({
      avatar: MediaSchema,
      banner: MediaSchema,
      name: z.string().default('').optional(),
      email: z.string().optional().default(''),
      bio: z.string().nullable().default(null),
    })
    .optional(),
  media: z
    .array(
      z.object({
        url: z.string().default(''),
        alt: z.string().default(''),
      })
    )
    .default([]),
  price: z.number().default(0),
  maxGuests: z.number().default(0),
  rating: z.number().default(0),
  meta: z
    .object({
      wifi: z.boolean().default(false),
      parking: z.boolean().default(false),
      breakfast: z.boolean().default(false),
      pets: z.boolean().default(false),
    })
    .default({
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    }),
  created: z.string().optional(),
  updated: z.string().optional(),
  bookings: z
    .array(
      z.object({
        id: z.string().default(''),
        dateFrom: z.string().default(''),
        dateTo: z.string().default(''),
        guests: z.number().default(0),
        created: z.string().default(''),
        updated: z.string().default(''),
        customer: z.object({
          name: z.string().default(''),
          email: z.string().default(''),
          bio: z.string().nullable().default(null),
          avatar: z.object({
            url: z.string().default(''),
            alt: z.string().default(''),
          }),

          banner: MediaSchema,
        }),
      })
    )
    .default([]),
  location: z
    .object({
      address: z.string().nullable().default(null),
      city: z.string().nullable().default(null),
      zip: z.string().nullable().default(null),
      country: z.string().nullable().default(null),
      continent: z.string().nullable().default(null),
      lat: z.number().nullable().default(null),
      lng: z.number().nullable().default(null),
    })
    .default({
      address: null,
      city: null,
      zip: null,
      country: null,
      continent: null,
      lat: null,
      lng: null,
    }),
});

// Bookings schema
export const BookingSchema = z
  .array(
    z.object({
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
    })
  )
  .default([]);

// Location schema
export const LocationSchema = z
  .object({
    address: z.string().nullable().default(null),
    city: z.string().nullable().default(null),
    zip: z.string().nullable().default(null),
    country: z.string().nullable().default(null),
    continent: z.string().nullable().default(null),
    lat: z.number().nullable().default(null),
    lng: z.number().nullable().default(null),
  })
  .optional();

export type Location = z.infer<typeof LocationSchema>;
export type Booking = z.infer<typeof BookingSchema>;
export type VenueType = z.infer<typeof venueSchema>;
export type PartialVenueType = Partial<VenueType>;
