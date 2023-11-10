import prisma from "../DB/db.config.js"
const createProfile=async(req,res)=>{
    const { id } = req.userDetails
    const { bio,profession,skills}=req.body
    try{
       const createdProfile=await prisma.profile.create({
        data:{
            userId:Number(id),
            bio,profession,skills
        }
       })
       if(createdProfile)
       {
            return res.json({message:"success",profile:createdProfile})
       }           

       res.json({message:"filed",profile:null})

    }catch(err){
        res.json({message:"something went wrong",err})
    }
}

const getAllProfile=async(req,res)=>{
    try{
       const allProfiles=await prisma.user.findMany({
        select:{
            name:true,
            email:true,
            profile:{
                select:{
                    bio:true,
                    profession:true,
                    skills:true
                }
            }
            
        }
       })
       
       res.json({message:"success",allProfiles})

    }catch(err){
        res.json({message:"something went wrong",err})
    }
}

export { createProfile, getAllProfile }
