import { z } from 'zod';

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
  venueManager: z.boolean().default(false),
  _count: CountSchema,
});

export type ProfileResponse = z.infer<typeof ProfileSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
