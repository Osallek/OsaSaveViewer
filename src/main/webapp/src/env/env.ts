import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string(),
  VITE_DATA_BASE_URL: z.string(),
  VITE_WIKI_BASE_URL: z.string(),
});

// @ts-ignore
const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

// validated env vars
export const env = parsedEnv.data;
