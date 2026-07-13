import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  sessionOptions: { refetchOnWindowFocus: false },
});

export type Session = typeof authClient.$Infer.Session;
