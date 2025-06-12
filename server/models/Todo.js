const mongoose = require('mongoose');

const SchemaDefine = mongoose.Schema({
    name:{
      type:String,
      required:true  
    },
    date:{
      type:String,
      required:true
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    }
},{timestamps:true})


const model = mongoose.model('Todo',SchemaDefine);

module.exports = model;