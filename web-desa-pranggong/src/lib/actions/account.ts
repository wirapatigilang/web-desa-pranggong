"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/actions/require-session";

export type AccountFormState = { error?: string; success?: boolean };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function updateAdminEmail(
  _prevState: AccountFormState,
  formData: FormData,
): Promise<AccountFormState> {
  const session = await requireSession();

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email || !EMAIL_REGEX.test(email)) {
    return { error: "Email tidak valid." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && existing.id !== session.user.id) {
    return { error: "Email tersebut sudah dipakai akun lain." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { email },
  });

  revalidatePath("/admin/pengaturan");
  return { success: true };
}
