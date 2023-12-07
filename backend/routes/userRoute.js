let express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
let User =  require("../models/users");
let Admin = require("../models/adminUser");
let Invitation = require("../models/invitation");
let MatchHistory = require("../models/matchHistory");
const bcrypt = require('bcrypt');
const _ = require('underscore');
let isEmpty = _.isEmpty;
let without = _.without;
//api to fetch one user by his email
router.get('/email', asyncHandler(async(req, res) =>{
    let user = await User.findOne({ email: req.body.email });;
    if(user){
      user.password = undefined;
      console.log(user);
        return res.status(200).json({statusCode: 200,message: 'Found user!',body:user});
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
    let gender = req.body.gender;
    let age = req.body.age;
    let zipCode = req.body.zipCode;
    let userYOE = req.body.yearsOfExpereince;
    let playStyle = req.body.playStyle;
    let matchingDistance = req.body.matchingDistance;
    let yourStory = req.body.yourStory;
    user.gender = gender;
    user.age = age;
    user.zipCode = zipCode;
    user.yearsOfExpereince = userYOE;
    user.playStyle = playStyle;
    user.matchingDistance = matchingDistance;
    user.yourStory = yourStory;
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

//api for finding players information from invitation history
router.get('/findPlayersRecord', asyncHandler(async(req, res) =>{
  let userEmail = req.body.email;
  const user = await Invitation.find({invitorEmail: userEmail});

  if (!user || !user.length) {
    return res.status(404).json({ statusCode: 404,message: "User Not Found" });
  }

  let date =  req.body.gamingDate;
  let time = req.body.gameStartTime;
  //get the invitation history record
  let playerRecordObj={
    invitorEmail: userEmail,
    gamingDate: date,
    gameStartTime:time

  }
  let invitationObj = await Invitation.find(playerRecordObj);

  if(isEmpty(invitationObj)){
    return res.status(404).json({ statusCode: 404,message: "No invitation record found!" });
  }

  let invitationRecord = invitationObj[0].inviteeEmail;

  let myPartner;
  let opponents;
  let returnBody;
  if(invitationRecord.length === 1){
    opponents = invitationRecord[0];
    returnBody = {
      opponent: opponents
    }
  }else{
    myPartner = invitationRecord[0];
    opponents = without(invitationRecord, myPartner);
    returnBody = {
      partner: myPartner,
      opponent: opponents
    }
  }

    //res.send(admin);
    res.status(200).json({ statusCode: 200,
      message: "Found players list.", 
      body: returnBody
    });

}));

//api for Adding match history 
router.put('/addMatchHistory', asyncHandler(async(req, res) =>{

  const user = await User.find({email: req.body.email});

  if (!user || !user.length) {
    return res.status(404).json({ statusCode: 404,message: "User Not Found" });
  }

  let playFormat = req.body.playFormat;
  let date = req.body.date;
  let yourScore = req.body.yourScore;
  let opponentScore = req.body.opponentScore;

  let partnerEmail = req.body.partnerEmail; 
  let opponentEmail = req.body.opponentEmail; //Pleae passed in array format

  if(playFormat === 'Single' && opponentEmail.length !=1){
    return res.status(404).json({ statusCode: 404,message: "Missing your opponent's email." }); 
  }
  if((playFormat === 'Double' || playFormat === 'Mix')&& opponentEmail.length !=2){
    return res.status(404).json({ statusCode: 404,message: "Missing your opponent's email." }); 
  }

  if((playFormat === 'Double' || playFormat === 'Mix')){
    if(!partnerEmail){
      return res.status(404).json({ statusCode: 404,message: "Missing your partner's email." });   
    }
  }

  //TODO: if it is single match, store opponent email
  if(playFormat === 'Single'){
    let userMatchHistoryObj = new MatchHistory({
      "email": req.body.email,
      "date": date,
      "playFormat": playFormat,
      "matchingPartners" : undefined,
      "matchingOpponents":opponentEmail[0],
      "yourScore": yourScore,
      "opponentScore":opponentScore
    });
    userMatchHistoryObj.save();
    return res.status(200).json({ statusCode: 200,message: "Match history created for your single player format game." });
  }
  //TODO: if it is double players match, store, partner emial, two other opponents emails
  if(playFormat === 'Double' || playFormat === 'Mix'){
    let userMatchHistoryObj = new MatchHistory({
      "email": req.body.email,
      "date": date,
      "playFormat": playFormat,
      "matchingPartners" : partnerEmail,
      "matchingOpponents":opponentEmail,
      "yourScore": yourScore,
      "opponentScore":opponentScore
    });
    userMatchHistoryObj.save();
    return res.status(200).json({ statusCode: 200,message: "Match history created for your "+ playFormat +" player format game." });
  }
    
  return res.status(404).json({ statusCode: 404,message: "Unknow error to save user's match history." });
}));

//api fetch a user's match history
router.get('/getMatchHistory', asyncHandler(async(req, res) =>{

  let user = await MatchHistory.find({email: req.body.email});
  if (!user || !user.length) {
    return res.status(404).json({ statusCode: 404,message: "User Not Found" });
  }
   
  return res.status(200).json({ 
    statusCode: 200,
    message: "Match history found.",
    body: user});
        
}));



module.exports = router;