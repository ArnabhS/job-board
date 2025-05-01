import React, { useState } from "react";
import { FiltersType } from "../../types/index";

interface FilterSidebarProps {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  clearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  clearFilters,
}) => {
  const [showModal, setShowModal] = useState(false);

  const FilterForm = (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">🔎 Filters</h2>
        <button
          onClick={clearFilters}
          className="text-green-600 hover:underline text-sm"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Search by title or company"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Search by location"
          value={filters.job_location}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, job_location: e.target.value }))
          }
        />

        <select
          className="border p-2 rounded w-full"
          value={filters.job_type}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, job_type: e.target.value }))
          }
        >
          <option value="">All Job Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
        </select>

        <select
          className="border p-2 rounded w-full"
          value={filters.experience}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, experience: e.target.value }))
          }
        >
          <option value="">All Experience</option>
          <option value="1+ years">1+ years</option>
          <option value="2+ years">2+ years</option>
          <option value="5+ years">5+ years</option>
        </select>

        <select
          className="border p-2 rounded w-full"
          value={filters.experience_level}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              experience_level: e.target.value,
            }))
          }
        >
          <option value="">All Levels</option>
          <option value="Entry level">Entry level</option>
          <option value="Mid senior">Mid senior</option>
          <option value="Associate">Associate</option>
        </select>

        <select
          className="border p-2 rounded w-full"
          value={filters.work_setting}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, work_setting: e.target.value }))
          }
        >
          <option value="">All Work Settings</option>
          <option value="Remote">Remote</option>
          <option value="Onsite">On-site</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <input
          className="border p-2 rounded w-full"
          placeholder="Min Salary"
          type="number"
          value={filters.salary_min}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, salary_min: e.target.value }))
          }
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Max Salary"
          type="number"
          value={filters.salary_max}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, salary_max: e.target.value }))
          }
        />

        <select
          className="border p-2 rounded w-full"
          value={filters.h1Type}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, h1Type: e.target.value }))
          }
        >
          <option value="">All H1B Types</option>
          <option value="H-1B">H1B</option>
          <option value="Non-H1B">Non-H1B</option>
        </select>

        <select
          className="border p-2 rounded w-full"
          value={filters.job_category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, job_category: e.target.value }))
          }
        >
          <option value="">All Categories</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
          <option value="Sales">Sales</option>
        </select>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-full md:w-1/4 p-4 border rounded-lg shadow bg-white h-fit">
        {FilterForm}
      </aside>

      {/* Mobile Filter Button */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded-full text-sm"
        >
          Filter 
        </button>
      </div>

      {/* Mobile Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-sm relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>
            {FilterForm}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
