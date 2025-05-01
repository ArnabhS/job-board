import { useEffect, useState } from "react";
import { useClerkAuthFetch } from "../lib/clerkAuthFetch";
import SavedJobs from "../components/Dashboard/SavedJobs";
import AppliedJobs from "../components/Dashboard/AppliedJobs";
import Loader from "../components/common/Loader";
import { Job } from "../types/index";
import { useAuth, RedirectToSignIn } from "@clerk/clerk-react"; 

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function DashboardPage() {
  const authFetch = useClerkAuthFetch();
  const { isSignedIn, isLoaded } = useAuth();
  const [saved, setSaved] = useState<Job[]>([]);
  const [applied, setApplied] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"saved" | "applied">("saved");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedRes, appliedRes] = await Promise.all([
          authFetch(`${BASE_URL}/api/users/saved-jobs`),
          authFetch(`${BASE_URL}/api/users/applied-jobs`),
        ]);

        const savedJson = await savedRes.json();
        const appliedJson = await appliedRes.json();

        const savedJobs: Job[] = savedJson.savedJobs.map(
          (item: any) => item.job
        );
        const appliedJobs: Job[] = appliedJson.appliedJobs.map(
          (item: any) => item.job
        );

        setSaved(savedJobs);
        setApplied(appliedJobs);
      } catch (err) {
        console.error("Error loading jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isSignedIn) loadData();
  }, [isSignedIn]);

  
  if (isLoaded && !isSignedIn) return <RedirectToSignIn />;

  if (loading) return <Loader />;

  return (
    <main className="p-6 font-poppins">
      <h2 className="text-2xl font-bold mb-6">Your Dashboard</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("saved")}
          className={`px-4 py-2 rounded-full ${
            tab === "saved" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Saved Jobs
        </button>
        <button
          onClick={() => setTab("applied")}
          className={`px-4 py-2 rounded-full ${
            tab === "applied" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Applied Jobs
        </button>
      </div>

      {tab === "saved" ? (
        saved.length === 0 ? (
          <p>No saved jobs yet.</p>
        ) : (
          <SavedJobs jobs={saved} />
        )
      ) : applied.length === 0 ? (
        <p>No applied jobs yet.</p>
      ) : (
        <AppliedJobs jobs={applied} />
      )}
    </main>
  );
}
