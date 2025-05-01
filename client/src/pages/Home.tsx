import { useEffect, useState } from "react";
import JobCard from "../components/common/JobCard";
import { useClerkAuthFetch } from "../lib/clerkAuthFetch";
import FilterSidebar from "../components/common/FilterSidebar";

interface Job {
  id: string;
  job_title: string;
  company: string;
  job_location: string;
  salary: string;
  experience: string;
  experience_level: string;
}
interface FiltersType {
  query: string;
  job_location: string;
  job_type: string;
  experience: string;
  experience_level: string;
  work_setting: string;
  salary_min: string;
  salary_max: string;
  h1Type: string;
  job_category: string;
}
export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<FiltersType>({
    query: "",
    job_location: "",
    job_type: "",
    experience: "",
    experience_level: "",
    work_setting: "",
    salary_min: "",
    salary_max: "",
    h1Type: "",
    job_category: "",
  });

  const clearFilters = () => {
    setFilters({
      query: "",
      job_location: "",
      job_type: "",
      experience: "",
      experience_level: "",
      work_setting: "",
      salary_min: "",
      salary_max: "",
      h1Type: "",
      job_category: "",
    });
  };

  const authFetch = useClerkAuthFetch();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchJobs = async () => {
      const params = new URLSearchParams({ ...filters });
      const res = await authFetch(`${BASE_URL}/api/jobs?${params.toString()}`);
      const json = await res.json();
      setJobs(json.jobs);
    };

    fetchJobs();
  }, [filters]);

  return (
    <main className="flex mx-auto  gap-6 p-6 bg-gray-50 min-h-screen w-full max-w-[90%]">
      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
      />

      <section className=" space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>
    </main>
  );
}
