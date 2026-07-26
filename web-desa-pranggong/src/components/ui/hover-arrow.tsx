import { ArrowRight, ArrowUp } from "lucide-react";

// Panah yang bergeser saat parent-nya (harus punya class "group") di-hover.
// CSS murni (bukan Framer Motion) — supaya bisa dipakai langsung di Server
// Component tanpa perlu "use client".
export default function HoverArrow({
  direction = "right",
  className = "",
}: {
  direction?: "right" | "up";
  className?: string;
}) {
  const Icon = direction === "up" ? ArrowUp : ArrowRight;
  const travel =
    direction === "up" ? "group-hover:-translate-y-1" : "group-hover:translate-x-1";

  return (
    <Icon
      aria-hidden="true"
      className={`inline-block size-4 transition-transform duration-300 ease-out ${travel} ${className}`}
    />
  );
}
