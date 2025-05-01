import { useEffect, useState } from "react";
import JobCard from "../components/common/JobCard";
import { useClerkAuthFetch } from "../lib/clerkAuthFetch";
import FilterSidebar from "../components/Home/FilterSidebar";
import Hero from "../components/Home/Hero";
import Loader from "../components/common/Loader";
import { Job,FiltersType } from "../types/index";


export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({
    search: "",
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
      search: "",
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
      setLoading(true);
      try {
        const params = new URLSearchParams({ ...filters });
        const res = await authFetch(
          `${BASE_URL}/api/jobs?${params.toString()}`
        );
        const json = await res.json();
        setJobs(json.jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  return (
    <div>
      <Hero />
      <main className="flex mx-auto gap-6 p-6 bg-gray-50 min-h-screen w-full max-w-[90%] font-poppins">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
        />

        <section className="flex-1 space-y-4">
          {loading ? (
            <Loader />
          ) : jobs.length === 0 ? (
            <p className="text-gray-500 mt-4">
              No jobs found with current filters.
            </p>
          ) : (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </section>
      </main>
    </div>
  );
}
