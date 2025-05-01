

export interface Job {
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


export interface FiltersType {
  search: string;
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

