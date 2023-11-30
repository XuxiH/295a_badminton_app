let mongoose = require("mongoose");
let validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is a required field"],
        unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter a valid E-mail!");
        }
      }
    },
    password: {
        type: String, 
        required: [true, "Password is a required field"],
    },
    name: {
        type: String,
        required: [true, "User name is a required field"],
    },
    zipCode:{
        type: String
    },
    yearsOfExpereince:{
        type: Number
    },
    skillRating:{
        type: Number,
        default: 1500
    },
    onlineStatus:{
        type:Boolean,
        default: false
    },
    matchStaus:{
        type:Boolean,
        default: false
    }
    
},{
    timestamps:true
});

//schema middleware to apply before saving
userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
      next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;