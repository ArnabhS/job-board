import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClerkAuthFetch } from "../lib/clerkAuthFetch";
import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/common/Loader";
import {
  getJobById,
  saveJobById,
  checkIfJobSaved,
  checkIfJobApplied,
  applyJobById,
} from "../services/api";
import { Job } from "../types/index";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const authFetch = useClerkAuthFetch();
  const { isSignedIn } = useAuth();
  const [saving, setSaving] = useState(false);
  const [applying, setApplying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const jobData = await getJobById(id!, authFetch);
        setJob(jobData);
        if (isSignedIn) {
          const [savedStatus, appliedStatus] = await Promise.all([
            checkIfJobSaved(id!, authFetch),
            checkIfJobApplied(id!, authFetch),
          ]);
          setIsSaved(savedStatus);
          setIsApplied(appliedStatus);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, isSignedIn]);

  const saveJob = async () => {
    if (!isSignedIn) {
      toast("Please login to save jobs.");
      return <RedirectToSignIn />;
    }

    try {
      setSaving(true);
      await saveJobById(id!, authFetch);
      setIsSaved(true);
      toast.success("Job saved successfully!");
    } catch {
      toast.error("Failed to save job.");
    } finally {
      setSaving(false);
    }
  };

  const applyJob = async () => {
    if (!isSignedIn) {
      toast("Please login to apply.");
      return <RedirectToSignIn />;
    }

    try {
      setApplying(true);
      await applyJobById(id!, authFetch);
      setIsApplied(true);
      toast.success("Job marked as applied!");

      if (job?.job_link) {
        window.open(job.job_link, "_blank");
      }
    } catch {
      toast.error("Failed to apply to the job.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <Loader />;
  if (!job) return <p className="p-6 text-gray-600">Job not found.</p>;

  const descriptionPreview = showMore
    ? job.full_description
    : job.full_description.slice(0, 300) +
      (job.full_description.length > 300 ? "..." : "");

  return (
    <main className="mt-10 max-w-[90%] mx-auto bg-white font-poppins">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.job_title}</h1>
      <p className="text-md text-gray-600 mb-1">
        {job.company} • {job.job_location}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        💼 {job.job_type || "N/A"} | 📈 {job.experience || "N/A"} | 🏷️{" "}
        {job.experience_level || "N/A"}
      </p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={saveJob}
          disabled={saving || isSaved}
          className={`flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-full transition ${
            saving || isSaved
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-slate-900"
          }`}
        >
          {saving ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Saving...
            </>
          ) : isSaved ? (
            "Saved"
          ) : (
            "Save Job"
          )}
        </button>

        <button
  onClick={applyJob}
  disabled={applying || isApplied}
  className={`text-gray-800 border-2 border-slate-900 px-6 py-2 rounded-full transition ${
    applying || isApplied ? "opacity-70 cursor-not-allowed" : "hover:bg-slate-800 hover:text-white"
  }`}
>
  {applying ? (
    <svg className="animate-spin h-4 w-4 text-gray-800 bg-white" />
  ) : isApplied ? (
    "Already Applied"
  ) : (
    "Apply Now"
  )}
</button>

      </div>

      <hr className="my-4" />

      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Job Description
      </h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
        {descriptionPreview}
      </p>

      {job.full_description.length > 300 && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-2 text-blue-600 hover:underline text-sm"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}

      {job.salary && (
        <p className="mt-6 text-sm text-gray-600">
          💰 <strong>Salary:</strong> {job.salary}
        </p>
      )}
    </main>
  );
}
