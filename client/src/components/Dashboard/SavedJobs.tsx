import { Link } from "react-router-dom";

interface Job {
  id: string;
  job_title: string;
}

export default function SavedJobs({ jobs }: { jobs: Job[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {jobs.map((job) => (
        <Link
          to={`/jobs/${job.id}`}
          key={job.id}
          className="border p-4 rounded-lg shadow hover:shadow-lg transition"
        >
          <h4 className="text-lg font-semibold">{job.job_title}</h4>
        </Link>
      ))}
    </div>
  );
}
