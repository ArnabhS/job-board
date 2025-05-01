import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useClerkAuthFetch } from "../lib/clerkAuthFetch";

interface Job {
  id: string;
  job_title: string;
  company: string;
  job_location: string;
  salary: string;
  
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    job_location: "",
    salary: "",
    job_type: "",
  });

  const authFetch = useClerkAuthFetch();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL
  useEffect(() => {
    const fetchJobs = async () => {
      const params = new URLSearchParams({ q: query, ...filters });
      const res = await authFetch(`${BASE_URL}/api/jobs?${params.toString()}`);
      
      const data: Job[] = await res.json();
      
      setJobs(data.jobs);
    };

    fetchJobs();
  }, [query, filters]);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Find Your Next Job</h1>

      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search by job title or company"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Add filters (example: job location) */}
      <select
        className="border p-2 mb-4"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, job_location: e.target.value }))
        }
      >
        <option value="">All Locations</option>
        <option value="Santa Clara, CA">Santa Clara, CA</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <Link
            key={job.id}
            to={`/jobs/${job.id}`}
            className="p-4 border rounded hover:shadow"
          >
            <h3 className="text-xl font-semibold">{job.job_title}</h3>
            <p>{job.company}</p>
            <p className="text-sm">
              {job.job_location} • {job.salary} USD
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
