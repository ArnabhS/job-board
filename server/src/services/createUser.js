import prisma from "../config/db.js";


export const createUser = async (userId,email)=>{
    if(!userId){
        console.log("userId not available")
        return ;
    }
    await prisma.user.create({
        data: {
          id: userId,
          email: email, 
        },
      });
}
