import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link to="/" className="text-xl font-bold">
        JobBoard
      </Link>
      <nav className="flex items-center gap-4">
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          Dashboard
        </Link>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
