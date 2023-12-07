let mongoose = require("mongoose");

const matchHistorySchema = mongoose.Schema({
    email:{ //coming from the MatchHistory schema
        type: String,
        required: [true, "Email is a required field"]
    },
    date:{
        type: Date
    },
    playFormat:{
        type: String
    },
    matchingPartners:{
        type: String
    },
    matchingOpponents:{
        type: Array
    },
    yourScore:{
        type: Number
    },
    opponentScore:{
        type: Number
    }
},{
    timestamps:true
})

const MatchHistory = mongoose.model("MatchHistory", matchHistorySchema);

module.exports = MatchHistory;