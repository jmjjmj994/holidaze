import { z } from 'zod';
import { checkUrlValid } from 'src/utilities/utilities';
export const ValidUrlSchema = z.string().refine(
  async (url) => {
    return await checkUrlValid(url);
  },
  { message: 'Invalid image URL' }
);

export const AccountUpdateSchema = z.object({
  avatar: z
    .object({
      url: ValidUrlSchema.optional(),
      alt: z.string().optional().default('image'),
    })
    .optional(),
  bio: z
    .string()
    .max(160, { message: 'Maximal character count 160' })
    .optional(),
  venueManager: z.boolean().optional(),
});

export type AccountUpdate = z.infer<typeof AccountUpdateSchema>;
