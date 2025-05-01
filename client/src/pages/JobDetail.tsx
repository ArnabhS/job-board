import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClerkAuthFetch } from "../lib/clerkAuthFetch";

interface Job {
  id: string;
  job_title: string;
  company: string;
  job_location: string;
  salary: string;
  full_description: string;
}

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const authFetch = useClerkAuthFetch();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL
  useEffect(() => {
    const fetchJob = async () => {
      const res = await authFetch(`${BASE_URL}/api/jobs/${id}`);
      const data: Job = await res.json();
      setJob(data);
    };

    fetchJob();
  }, [id]);

  const saveJob = async () => {
    await authFetch(`${BASE_URL}/api/users/save-job/${id}`, { method: "POST" });
    alert("Job saved!");
  };

  const applyJob = async () => {
    await authFetch(`${BASE_URL}/api/users/apply/${id}`, { method: "POST" });
    alert("Applied!");
  };

  if (!job) return <p className="p-4">Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{job.job_title}</h1>
      <p className="text-sm text-gray-500">
        {job.company} • {job.job_location}
      </p>
      <p className="my-4">{job.full_description}</p>

      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={saveJob}
        >
          Save
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={applyJob}
        >
          Apply
        </button>
      </div>
    </main>
  );
}
