const mongoose = require('mongoose');

const db = async()=>{
  try {

    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("connecting with the mongodb Atlas")
    
  } catch (error) {
    console.log("Failed connecting with database ")
  }
}

module.exports = db;