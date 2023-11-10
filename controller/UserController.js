import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import prisma from "../DB/db.config.js";
const signup=async(req,res)=>{
    const {name,email,password}=req.body
    try{
        const userGet=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!userGet){
            const encodedPass=await bcrypt.hash(password,10);
            const userCreated=await prisma.user.create({
                data:{
                    name,email,password:encodedPass
                }
            })

            return res.json({message:"success",user:userCreated})
        }
        return res.json({message:"User already exist",user:null})
        
    }catch(err){
        res.json({message:"something went wrong",err})
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const userGet=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(userGet && await bcrypt.compare(password,userGet?.password)){
            let token;
            token=await jwt.sign({email:userGet.email,id:userGet.id},process.env.APPSETTING_JWT_SECRET)
            return res.json({message:"success",token})
        }
        
        return res.json({message:"User not found or Check passworddev",user:null})
        
    }catch(err){
        res.json({message:"something went wrong",err})
    }
}


export { login, signup };
