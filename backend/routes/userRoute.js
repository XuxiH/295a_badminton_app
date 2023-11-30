let express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
let User =  require("../models/users");
let Admin = require("../models/adminUser");
const bcrypt = require('bcrypt');

//api to fetch one user by his email
router.get('/email', asyncHandler(async(req, res) =>{
    const user = await User.findOne({ email: req.body.email });;
    if(user){
      let userInfor = {
        "email":user.email,
        "name":user.name,
        "zipCode": user.zipCode,
        "yearsOfExpereince": user.yearsOfExpereince,
        "skillRating":user.skillRating,
        "onlineStatus": user.onlineStatus,
        "matchStaus": user.matchStaus
      };
        return res.status(200).json({statusCode: 200,message: 'Found user!',body:userInfor});
    }
    
    res.status(404).json({statusCode: 404,message: 'user not found'});

}));

//api to update one user's online status
router.put('/updateUserOnlineStaus', asyncHandler(async(req, res) =>{
  const user = await User.findOne({ email: req.body.email });;
  if(user){
    user.onlineStatus = true;
    try{
      await user.save();
    }catch(e){
      return res.status(404).json({statusCode: 404,message: e});
    }
    
    return res.status(200).json({statusCode: 200,message: 'Update user infor successfully.'});
  }else{
    return res.status(404).json({statusCode: 404,message: 'Unkonw error to update user infor.'});
  }
   
}));

//api to update one user's match status
router.put('/updateUserMatchStaus', asyncHandler(async(req, res) =>{
  const user = await User.findOne({ email: req.body.email });;
  if(user){
    user.matchStaus = true;
    try{
      await user.save();
    }catch(e){
      return res.status(404).json({statusCode: 404,message: e});
    }
    
    return res.status(200).json({statusCode: 200,message: 'Update user infor successfully.'});
  }else{
    return res.status(404).json({statusCode: 404,message: 'Unkonw error to update user infor.'});
  }
   
}));

//api to update one user's basic information
router.put('/updateUserInfo', asyncHandler(async(req, res) =>{
  const user = await User.findOne({ email: req.body.email });;
  if(user){
    let userName = req.body.name;
    let userZipCode = req.body.zipCode;
    let userYOE = req.body.yearsOfExpereince;
    let userSkillRating =  req.body.skillRating;
    user.name = userName? userName:user.name;
    user.zipCode = userZipCode? userZipCode:user.zipCode;
    user.yearsOfExpereince = userYOE? userYOE:user.yearsOfExpereince;
    user.skillRating = userSkillRating? userSkillRating:user.skillRating;
    try{
      await user.save();
    }catch(e){
      return res.status(404).json({statusCode: 404,message: e});
    }
    
    return res.status(200).json({statusCode: 200,message: 'Update user infor successfully.'});
  }else{
    return res.status(404).json({statusCode: 404,message: 'Unkonw error to update user infor.'});
  }
   
}));

//api to login
router.post('/login', asyncHandler(async(req, res) =>{
  let user1 = await User.find({email: req.body.email});
  if (!user1 || !user1.length) {
    return res.status(404).json({ statusCode: 404,message: "User Not Found" });
  };
  let userName;
  let error;
  await bcrypt
      .compare(req.body.password, user1[0].password)
      .then(res => {
        console.log(res);
        if(res){
          userName = user1[0].name;
        }   
  })
  .catch(err =>     
    {error = err;}
  );

  if(!error && userName){
    return res.status(200).json({  statusCode: 200, message: "Welcome "+userName});
  }else{
    return res.status(404).json({ statusCode: 404,message: "Invalid email/password!" });
  }
   
}));


  //api to register a new user
router.post('/register', asyncHandler(async(req, res) =>{
  //console.log(req.body);
  const user = await User.find({email: req.body.email});
    //console.log("register information ", user);
    if (!user || !user.length) {
      //account not found, create new user
      const createUser = new User({
        name: req.body.name,
        zipCode: req.body.zipCode,
        yearsOfExpereince: req.body.yearsOfExpereince,
        email: req.body.email,
        password: req.body.password
      });       
        
        createUser.save();      
        return res.status(200).json({ statusCode: 200, message: "Account Created" });
      }   

        return res.status(404).json({ statusCode: 404,message: "Please provide required information to register an account." });
}));

//api for Admin login
router.post('/AdminLogin', asyncHandler(async(req, res) =>{
    let admin = await Admin.find({
        email: req.body.email,
        password: req.body.password,
      });
      console.log(admin);

      if (!admin || !admin.length) {
        return res.status(404).json({ statusCode: 404,message: "User Not Found" });
      }

      //res.send(admin);
      res.status(200).json({ statusCode: 200,message: "Admin Signed In." });

}));



module.exports = router;