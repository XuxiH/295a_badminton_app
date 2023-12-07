let mongoose = require("mongoose");

const matchHistorySchema = mongoose.Schema({
    date:{
        type: Date
    },
    playFormat:{
        type: String
    },
    matchingPartners:{
        type: Array
    },
    matchingOpponents:{
        type: Array
    },
    yourScore:{
        type: Number
    },
    theirScore:{
        type: Number
    }
},{
    timestamps:true
})

const MatchHistory = mongoose.model("MatchHistory", matchHistorySchema);

module.exports = MatchHistory;