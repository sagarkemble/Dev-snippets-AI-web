import { drizzle } from "drizzle-orm/neon-http";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL)
  throw new Error("DATABASE_URL is not defined in the environment variables");

export const db = drizzle(DATABASE_URL);
