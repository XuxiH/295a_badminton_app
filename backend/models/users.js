let mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    zipCode:{
        type: String
    },
    yearsOfExpereince:{
        type: Number,
        required: true
    },
    skillRating:{
        type: Number,
        required: true,
        default: 1500
    }
    
},{
    timestamps:true
});



const User = mongoose.model("User", userSchema);

module.exports = User;