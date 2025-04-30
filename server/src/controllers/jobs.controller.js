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