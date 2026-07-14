import { createAuthClient } from "better-auth/react";

// Tanpa `baseURL` — client & server satu origin, better-auth otomatis pakai path relatif `/api/auth`.
export const authClient = createAuthClient();
