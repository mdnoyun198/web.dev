"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

type LoginResult = { ok: true } | { ok: false; error: string };

export async function useLoginAction(email: string, password: string): Promise<LoginResult> {
  try {
    await signIn("credentials", { email, password, redirect: false });
    return { ok: true };
  } catch (error) {
    // Only AuthError instances come from a failed authorize().
    // Anything else (e.g. NEXT_REDIRECT) must be re-thrown.
    if (error instanceof AuthError) {
      // Auth.js wraps the original thrown error as error.cause.err.
      // That original error still has our custom `code` intact.
      const cause = (error.cause as { err?: { code?: string } } | undefined)?.err;
      const code = cause?.code ?? error.type;
      return { ok: false, error: code };
    }
    throw error;
  }
}