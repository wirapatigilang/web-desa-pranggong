"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "admin-theme";

export default function ThemeToggle() {
  function toggle() {
    const shell = document.getElementById("admin-shell");
    if (!shell) return;
    const next = !shell.classList.contains("dark");
    shell.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggle}
      aria-label="Ganti mode terang/gelap"
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </Button>
  );
}
