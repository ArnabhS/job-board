import prisma from '../config/db.js';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { createUser } from '../services/createUser.js';

export const saveJob = async (req,res)=>{
    try {
        const userId = req.auth.userId;
        const jobId = req.params.jobId;
        
        const user = await clerkClient.users.getUser(userId);
        const email = user.emailAddresses[0]?.emailAddress;
       
        const userExists = await prisma.user.findUnique({
          where: { id: userId },
        });
        
        if (!userExists) {
         
          createUser(userId, email)
        }
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

        const user = await clerkClient.users.getUser(userId);
        const email = user.emailAddresses[0]?.emailAddress;

        const userExists = await prisma.user.findUnique({
          where: { id: userId },
        });
        
        if (!userExists) {
         
          createUser(userId, email)
        }
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
    
        return res.status(200).json({ success:true , savedJobs: savedJobs});
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
  
      return res.status(200).json({success:true, appliedJobs: appliedJobs});
    } catch (error) {
        console.log(error.message)    
        return res.status(500).json({  success:false , message: 'Internal server error'  });
    }
};


export const checkIfJobSaved = async (req,res)=>{
  const userId = req.auth.userId;
  const jobId = req.params.jobId;
  try {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    if(!userExists){
      return res.status(404).json({message:"User not found"})
    }
    const savedJob = await prisma.savedJob.findFirst({
      where: {
        userId,
        jobId,
      },
    });
    return res.status(200).json({ success:true ,saved: !!savedJob });
  } catch (error) {
    console.log(error.message)    
    return res.status(500).json({  success:false , message: 'Internal server error'  });
    
  }
}