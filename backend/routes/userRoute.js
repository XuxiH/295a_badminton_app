let express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
let User =  require("../models/users");

router.get('/', asyncHandler(async(req, res) =>{
    res.json("hello backend");

}));

router.get('/:id', asyncHandler(async(req, res) =>{
    const user = await User.findById(req.params.id);
    if(user){
        return res.json(user);
    }
    
    res.status(404).json({message: 'user not found'});

}));

module.exports = router;