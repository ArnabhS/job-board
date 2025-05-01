import { Link } from "react-router-dom";
import { Briefcase, MapPin, DollarSign, BarChart } from "lucide-react"; 
import { Job } from "../../types/index";
export default function JobCard({ job }: { job: Job }) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className=" flex flex-col p-6 border rounded-xl shadow-sm bg-white hover:shadow-xl transition duration-300 ease-in-out"
    >
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition">
        {job.job_title}
      </h3>

      <div className="mt-1 text-sm text-gray-700 flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-gray-500" />
        <span>{job.company}</span>
      </div>

      <div className="mt-1 text-sm text-gray-700 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-500" />
        <span>{job.job_location}</span>
      </div>

      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-green-600" />
          {job.salary} USD
        </span>
        <span className="flex items-center gap-1">
          <BarChart className="w-4 h-4 text-blue-600" />
          {job.experience}
        </span>
        <span className="flex items-center gap-1">
          🏷️ {job.experience_level}
        </span>
      </div>
    </Link>
  );
}
