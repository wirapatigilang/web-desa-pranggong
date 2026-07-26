import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Ubah nomor telepon lokal (mis. "0812-xxxx-xxxx") jadi link wa.me (format 62xxx).
export function toWhatsAppLink(phone: string) {
  const digits = phone.replace(/\D/g, "")
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits
  return `https://wa.me/${normalized}`
}
