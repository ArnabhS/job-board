import prisma from '../config/db.js';


export const getJobs = async (req, res) => {
    try {
      const {
        search,
        job_location,
        salary_min,
        salary_max,
        job_type,
        experience_level,
        work_setting,
        h1Type,
        job_category,
      } = req.query;
  
      const filters = {};
  
      if (search) {
        filters.OR = [
          { job_title: { contains: search , mode: 'insensitive' } },
          { company: { contains: search , mode: 'insensitive' } },
        ];
      }
      if (job_location) filters.job_location = { contains: job_location , mode: 'insensitive' };
      if (salary_min || salary_max) {
        filters.salary = {};
        if (salary_min) filters.salary.gte = Number(salary_min);
        if (salary_max) filters.salary.lte = Number(salary_max);
      }
      if (job_type) filters.job_type = job_type;
      if (experience_level) filters.experience_level = experience_level;
      if (work_setting) filters.work_setting = work_setting;
      if (h1Type) filters.h1Type = h1Type;
      if (job_category) filters.job_category = job_category;
  
      const jobs = await prisma.job.findMany({
        where: filters,
        orderBy: { date_posted: 'desc' },
      });
  
      return res.status(200).json({ success:true , jobs:jobs});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false, message: 'Internal server error' });
    }
};


export const getJobById = async (req, res) => {
    try {
      const id = req.params.id  
      const job = await prisma.job.findUnique({
        where: { id: id },
      });
  
      if (!job) return res.status(404).json({ error: 'Job not found' });
      return res.status(200).json(job);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false, message: 'Internal server error' });
    }
};


export const uploadJobs = async(req,res)=>{
  const jobList = req.body;

  if (!Array.isArray(jobList)) {
    return res.status(400).json({ error: "Request body must be an array of jobs." });
  }

  try {
    const insertedJobs = await Promise.all(
      jobList.map(async (job) => {
        return prisma.job.create({
          data: {
            company: job.company,
            job_title: job.job_title,
            experience: job.experience,
            job_location: job.job_location,
            job_type: job.job_type,
            work_setting: job["work setting"],
            salary: job.salary,
            date_posted: new Date(job.date_posted),
            h1Type: job.h1Type,
            job_link: job.job_link,
            experience_level: job.experience_level,
            full_description: job.full_description,
            job_category: job.job_category,
          },
        });
      })
    );

    return res.status(201).json({ message: "Jobs uploaded successfully.", data: insertedJobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to upload jobs." });
  }
}