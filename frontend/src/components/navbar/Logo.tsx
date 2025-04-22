// components/navbar/Logo.tsx
import Link from "next/link";
import { ActivityIcon, BadgeCheck, BoxIcon } from "lucide-react";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 font-medium text-2xl text-primary"
    >
      <ActivityIcon className="w-6 h-6 text-primary" />
      <span>Kaaryo</span>
    </Link>
  );
}
