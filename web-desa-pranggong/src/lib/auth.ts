import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";

// Auth admin sederhana: hanya email+password, TANPA sign-up publik.
// Akun admin dibuat lewat `prisma/seed.ts`, bukan lewat form pendaftaran.
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  // nextCookies HARUS jadi plugin terakhir (lihat docs better-auth).
  plugins: [nextCookies()],
});
