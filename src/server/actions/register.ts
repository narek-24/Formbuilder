"use server";

import { registerSchema } from "@/lib/schemas/auth-schemas";
import { actionClient, ActionError } from "./action-client";
// import bcrypt from "bcrypt";

export const registerAction = actionClient
  .inputSchema(registerSchema)
  .action(async ({ parsedInput }) => {
    // const hashedPassword = bcrypt.hashSync(parsedInput.password, 10);

    try {
      //   Save in db

      return { email: parsedInput.email, password: parsedInput.password };
    } catch (err: any) {
      const pgError = err.cause ?? err;
      if (pgError && typeof pgError === "object" && pgError.code === "23505") {
        throw new ActionError("A user with that email already exists.");
      }

      throw err;
    }
  });
