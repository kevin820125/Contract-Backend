const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstName :{
        type: String,
        required:true
    },
    lastName :{
        type:String,
        required:true
    },
    email : {
        type:Array
    }
})

module.exports = mongoose.model("user" , UserSchema)