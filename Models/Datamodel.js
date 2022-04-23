const mongoose=require('mongoose');


const schema=mongoose.Schema({
    longURL:{
        type:String,
        required:true,
    },
    shortURL:{
        type:String,
        required:true,

    },
    clicks:{
        type:Number,
        default:0
    }
})

const Data=mongoose.model('data',schema);
module.exports=Data