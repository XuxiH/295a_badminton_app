let mongoose = require("mongoose");

const aiModelSchema = mongoose.Schema({
    email:{ //coming from the MatchHistory schema
        type: String,
        required: [true, "Email is a required field"]
    },
    choices:{
        type: Array,
        required: [true, "Choices is a required field"]
    }
},{
    timestamps:true
})

const AImodel = mongoose.model("AImodel", aiModelSchema);

module.exports = AImodel;