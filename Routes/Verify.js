const router=require('express').Router();
const jwt=require('jsonwebtoken');
const User=require('../Models/Usermodel')


router.get('/:token',(req,res)=>{
    try {
        const token=req.params.token;
        jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
    if(err)return res.json({err:err.message})
    else{
    const id=decoded.id;
    const updated=await User.findByIdAndUpdate(id,{verified:true},{new:true})
    console.log(updated);
     res.json({msg:"Verified Successfully , Login to use our platform"})
    
    }
    
        })
    
    } catch (error) {
        res.json({msg:error.message})
    }
  
})


module.exports=router