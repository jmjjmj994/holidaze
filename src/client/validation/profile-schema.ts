import { Profile } from 'src/components/profile/Profile';
import { z } from 'zod';
import { VenueSchema } from './venues-schema';

const MediaSchema = z.object({
  url: z.string().default(''),
  alt: z.string().default(''),
});

const BookingSchema = z
  .object({
    id: z.string(),
    dateFrom: z.string(),
    dateTo: z.string(),
    guests: z.number(),
    created: z.string(),
    updated: z.string(),
    venue: VenueSchema,
  })
  .optional();

const BannerSchema = z
  .object({
    url: z.string().default(''),
    alt: z.string().default(''),
  })
  .default({ url: '', alt: '' });

const AvatarSchema = z
  .object({
    url: z.string().default(''),
    alt: z.string().default(''),
  })
  .default({ url: '', alt: '' });

const CountSchema = z
  .object({
    bookings: z.number().default(0),
    venues: z.number().default(0),
  })
  .default({ bookings: 0, venues: 0 });

export const ProfileSchema = z.object({
  name: z.string().default(''),
  email: z.string().default(''),
  bio: z.string().default(''),
  avatar: AvatarSchema,
  banner: BannerSchema,
  bookings: z.array(BookingSchema).default([]),
  venueManager: z.boolean().default(false),
  _count: CountSchema,
});

export const ProfileResponseSchema = z.object({
  data: ProfileSchema,
});

export type ProfileResponse = z.infer<typeof ProfileResponseSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
