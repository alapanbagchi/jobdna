import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { AuthButton } from "./AuthButton";

export function Navbar({ style }: { style?: "auth" | "default" }) {
  return style === "auth" ? (
    <nav className="flex w-full justify-between">
      <Logo />
    </nav>
  ) : (
    <nav className="w-full flex items-center justify-between max-w-[80%] mt-4 mx-auto rounded-xl px-2 py-2 bg-accent">
      <div className="flex items-center space-x-6">
        <Logo />
        <NavLinks />
      </div>
      <AuthButton />
    </nav>
  );
}
