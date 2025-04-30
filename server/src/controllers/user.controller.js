import prisma from '../config/db.js';

export const saveJob = async (req,res)=>{
    try {
        const userId = req.auth.userId;
        const jobId = req.params.jobId;
        
        await prisma.savedJob.create({
            data: {
              userId,
              jobId,
            }
        });
        return res.status(201).json({ success:true, message: 'Job saved successfully' });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false, message: 'Internal server error',  });
    }
}

export const applyJob = async(req,res)=>{
    try {
        const userId = req.auth.userId;
        const jobId = req.params.jobId;
    
        await prisma.appliedJob.create({
          data: {
            userId,
            jobId,
          }
        });
    
        return res.status(201).json({ success:true , message:"Job applied successfully" });
      } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false , message:"Internal server error" });
      }
}

export const getSavedJobs = async (req,res)=>{
    try {
        const userId = req.auth.userId;
    
        const savedJobs = await prisma.savedJob.findMany({
          where: { userId },
          include: { job: true },
        });
    
        return res.status(200).json({ success:true , jobs: savedJobs});
      } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false , message: 'Internal server error'  });
      }
};

export const getAppliedJobs = async (req,res) => {
    try {
      const userId = req.auth.userId;
  
      const appliedJobs = await prisma.appliedJob.findMany({
        where: { userId },
        include: { job: true },
      });
  
      return res.status(200).json(appliedJobs);
    } catch (error) {
        console.log(error.message)    
        return res.status(500).json({  success:false , message: 'Internal server error'  });
    }
};