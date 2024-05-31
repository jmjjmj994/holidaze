import { z } from 'zod';
export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter your email address')
    .regex(/^[^\s@]+@stud\.noroff\.no$/, {
      message:
        ' Your email address must be a valid NOROFF student email ending with "@stud.noroff.no"',
    }),
  password: z.string().min(8, 'Please enter your password'),
});

export const ResultsSchema = z.object({
  accessToken: z.string(),
  avatar: z.object({
    url: z.string(),
    alt: z.string(),
  }),
  banner: z.object({
    url: z.string(),
    alt: z.string(),
  }),

  bio: z.string(),
  email: z.string(),
  name: z.string(),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;
export type Results = z.infer<typeof ResultsSchema>;
