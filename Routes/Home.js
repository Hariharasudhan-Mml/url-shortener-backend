const router=require('express').Router();
const User=require('../Models/Usermodel');


router.get('/',async(req,res)=>{
    try{
    const id=req.id
    const user=await User.findById(id).select('data').populate('data');
    console.log(user.data);
    res.json({data:user.data})
    }catch(error){
        console.log(error.message)
        res.json({msg:error.message})
    }
})


module.exports=router