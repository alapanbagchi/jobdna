"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function AuthButton() {
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  const handleLogin = () => {
    // Fake login logic
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Fake logout logic
    setLoggedIn(false);
  };

  // If the user is logged in, show the Logout button
  if (loggedIn) {
    return (
      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    );
  }

  // If the user is not logged in, show buttons based on the current path
  if (pathname === "/register") {
    return (
      <Link href="/login">
        <Button variant="ghost" onClick={handleLogin}>
          Login
        </Button>
      </Link>
    );
  }

  if (pathname === "/login") {
    return (
      <Link href="/register">
        <Button onClick={handleLogin}>Register</Button>
      </Link>
    );
  }

  // Default case: show both Login and Register buttons
  return (
    <div>
      <Link href="/login" className="mr-2">
        <Button variant="ghost" onClick={handleLogin}>
          Login
        </Button>
      </Link>
      <Link href="/register">
        <Button onClick={handleLogin}>Register</Button>
      </Link>
    </div>
  );
}
