let express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
let User =  require("../models/users");
let Admin = require("../models/adminUser");


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

//api to login
router.post('/login', asyncHandler(async(req, res) =>{
    const user = await User.find({
        email: req.body.email,
        password: req.body.password,
      });
      console.log(user);

      if (!user || !user.length) {
        return res.status(404).json({ message: "User Not Found" });
      }

      //res.send(user);
      let userName = user[0].name;
      res.status(200).json({ message: "Welcome "+userName});

}));


  //api to register a new user
  router.post('/register', asyncHandler(async(req, res) =>{
    console.log(req.body);
    const user = await User.find({email: req.body.email});
      console.log(user);
      if (!user || !user.length) {
        //account not found, create new user
        const createUser = new User({
          name: req.body.name,
          zipCode: req.body.zipCode,
          yearsOfExpereince: req.body.yearsOfExpereince,
          email: req.body.email,
          password: req.body.password
        });
        console.log(createUser);
        createUser.save();
        return res.status(200).json({ message: "Account Created" });
      } 
        //account found, send error
        console.log(user);
        return res.status(404).json({ message: "Unkown error to create user account. Please try again later." });
}));

//api for Admin login
router.post('/AdminLogin', asyncHandler(async(req, res) =>{
    let admin = await Admin.find({
        email: req.body.email,
        password: req.body.password,
      });
      console.log(admin);

      if (!admin || !admin.length) {
        return res.status(404).json({ message: "User Not Found" });
      }

      //res.send(admin);
      res.status(200).json({ message: "Admin Signed In." });

}));



module.exports = router;