"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user" — otomatis matikan animasi non-esensial kalau pengunjung
// punya preferensi prefers-reduced-motion aktif di OS/browser-nya.
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
