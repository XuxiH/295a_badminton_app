let mongoose = require("mongoose");

const matchHistorySchema = mongoose.Schema({
    user:{ //coming from the user schema
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    history:[{
        user:{ //coming from the user schema
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        otherPlayerName: {type: String, required: true},
        matchDuration:{type: Number, required: true},
        format:{type: String, required: true},
        score:{type: String, required: true}
    }]
},{
    timestamps:true
})

const MatchHistory = mongoose.model("MatchHistory", matchHistorySchema);

module.exports = MatchHistory;