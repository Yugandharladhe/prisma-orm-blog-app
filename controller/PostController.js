import prisma from "../DB/db.config.js"
const createPost=async(req,res)=>{
    const { email,id } = req.userDetails
    const {title,content}=req.body
    try{
       const createdPost=await prisma.post.create({
        data:{
            userId:id,
            title,content
        }
       })
       if(createPost)
       {
            return res.json({message:"success",post:createdPost})
       }           

       res.json({message:"filed",post:null})

    }catch(err){
        res.json({message:"something went wrong",err})
    }
}

const getAllPost=async(req,res)=>{
    const { id } = req.userDetails
    try{
       const posts=await prisma.user.findUnique({
        select:{
            post:{
                select:{
                    title:true,
                    content:true,
                    created_at:true
                }
            }
        },
        where:{
            id
        }
       })

       res.json({message:"success",posts})
    }catch(err){
        res.json({message:"something went wrong",err})
    }
}


export { createPost, getAllPost }

