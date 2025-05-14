// components/navbar/Logo.tsx
import Link from "next/link";
import { ActivityIcon } from "lucide-react";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 font-medium text-2xl text-primary"
    >
      <ActivityIcon className="w-6 h-6 text-primary" />
      <span>Kefali</span>
    </Link>
  );
}
