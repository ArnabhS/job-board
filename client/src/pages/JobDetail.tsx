import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClerkAuthFetch } from "../lib/clerkAuthFetch";
import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/common/Loader";

interface Job {
  id: string;
  job_title: string;
  company: string;
  job_location: string;
  salary: string;
  full_description: string;
  experience?: string;
  experience_level?: string;
  job_type?: string;
  job_link?: string;
}

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const authFetch = useClerkAuthFetch();
  const { isSignedIn } = useAuth();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await authFetch(`${BASE_URL}/api/jobs/${id}`);
        const data: Job = await res.json();
        setJob(data);
      } catch (err) {
        console.error(err)
        toast.error("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const saveJob = async () => {
    if (!isSignedIn) {
      toast("Please login to save jobs.");
      return <RedirectToSignIn />;
    }

    try {
      await authFetch(`${BASE_URL}/api/users/save-job/${id}`, { method: "POST" });
      toast.success("Job saved successfully!");
    } catch {
      toast.error("Failed to save job.");
    }
  };

  const applyJob = () => {
    if (!isSignedIn) {
      toast("Please login to apply.");
      return <RedirectToSignIn />;
    }

    if (job?.job_link) {
      window.open(job.job_link, "_blank");
    } else {
      toast.error("No application link available.");
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
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Job
        </button>
        <button
          onClick={applyJob}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Apply Now
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
