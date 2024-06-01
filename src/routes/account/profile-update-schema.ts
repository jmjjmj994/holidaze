import { z } from 'zod';
import { checkUrlValid } from 'src/utilities/utilities';
export const ValidUrlSchema = z.string().refine(
  async (url) => {
    return await checkUrlValid(url);
  },
  { message: 'Invalid image URL' }
);

export const ProfileUpdateSchema = z.object({
  avatar: z.object({
    url: ValidUrlSchema.optional(),
    alt: z.string().optional().default('image'),
  }),
  venueManager: z.boolean().optional(),
});

export type ProfileUpdate = z.infer<typeof ProfileUpdateSchema>;
