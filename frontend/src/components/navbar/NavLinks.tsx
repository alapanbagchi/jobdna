// components/navbar/NavLinks.tsx
import Link from "next/link";

const links = [
  { href: "/jobs", label: "Jobs" },
  { href: "/candidates", label: "Candidates" },
  { href: "/about", label: "About" },
];

export function NavLinks() {
  return (
    <div className="flex space-x-4 text-sm font-medium text-gray-700">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="hover:text-primary transition-colors"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
