import { Route, Routes } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import JobDetailPage from "./pages/JobDetail";
import DashboardPage from "./pages/Dashboard";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/jobs/:id" element={<JobDetailPage />} />

       
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <DashboardPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

       
      </Routes>
    </>
  );
}
