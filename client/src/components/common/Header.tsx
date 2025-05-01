import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white font-poppins">
      <Link to="/" className="text-xl font-bold">
        JobBoard
      </Link>
      <nav className="flex items-center gap-4">
        <SignedIn>
          <Link to="/dashboard" className="font-medium hover:font-semibold">
            Dashboard
          </Link>
        </SignedIn>
        
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-full transition text-sm font-medium shadow">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
