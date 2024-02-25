let express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
let User =  require("../models/users");
let Admin = require("../models/adminUser");
let Invitation = require("../models/invitation");
let MatchHistory = require("../models/matchHistory");
let AImodel = require("../models/aiTrainingModel");
const bcrypt = require('bcrypt');
const _ = require('underscore');
let isEmpty = _.isEmpty;
let without = _.without;
//api to fetch one user by his email
router.get('/email/:email', asyncHandler(async(req, res) =>{
  const {email} = req.params;
    let user = await User.findOne({ email: email });
    if(user){
      user.password = undefined;
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
    let playFormat = req.body.playFormat;
    let matchingDistance = req.body.matchingDistance;
    let yourStory = req.body.yourStory;
    user.gender = gender;
    user.age = age;
    user.zipCode = zipCode;
    user.yearsOfExpereince = userYOE;
    user.playStyle = playStyle;
    user.playFormat = playFormat;
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
  //console.log("Current user, ", user);

  if (!user || !user.length) {
    return res.status(404).json({ statusCode: 404,message: "User Not Found" });
  }

  let playFormat = req.body.playFormat;
  let date = req.body.date;
  let yourScore = req.body.yourScore;
  let opponentScore = req.body.opponentScore;

  let partnerEmail = req.body.partnerEmail; 
  let opponentEmail = req.body.opponentEmail; //Pleae passed in array format
  let oppUser;
  let oppUser1;
  let oppUser2;

  //Make sure partner, opponents are valid users in the system
  if(playFormat.toLowerCase() === 'single'){
    //1. no opponent email
    if( opponentEmail.length <1){
      return res.status(404).json({ statusCode: 404,message: "Missing your opponent's email." });
    }
    //2. opponent does not exist in the DB
    oppUser = await User.find({email: opponentEmail[0]});
    if (!oppUser || !oppUser.length) {
      return res.status(404).json({ statusCode: 404,message: "Opponent user Not Found! No this user found in the system." });
    }
     
  }
  if((playFormat.toLowerCase() === 'double' || playFormat.toLowerCase() === 'mix')){
    //1. Missing opponent emails
    if(opponentEmail.length !=2){
      return res.status(404).json({ statusCode: 404,message: "Missing your opponent's email." });
    }
    //2. Opponents do not exsit in DB
    oppUser1 = await User.find({email: opponentEmail[0]});
    oppUser2 = await User.find({email: opponentEmail[1]});
    if(!oppUser1 || !oppUser1.length || !oppUser2 || !oppUser2.length){
      return res.status(404).json({ statusCode: 404,message: "Opponent user Not Found! No these users found in the system." });
    }

  }

  if((playFormat.toLowerCase() === 'double' || playFormat.toLowerCase() === 'mix')){
    if(!partnerEmail){
      return res.status(404).json({ statusCode: 404,message: "Missing your partner's email." });   
    }
    const partnerUser = await User.find({email: partnerEmail});
    if(!partnerUser || !partnerUser.length){
      return res.status(404).json({ statusCode: 404,message: "Partner user Not Found! No this user found in the system." });
    
    }
  }

  //TODO: if it is single match, store opponent email
  if(playFormat.toLowerCase() === 'single'){
    //TODO: update the skill rating
    let yourOldSkillRating = user[0].skillRating;
    console.log("Your old score rating is, ", yourOldSkillRating);
    let opponentOldSkillRating = oppUser[0].skillRating;
    console.log("Your opponent old score rating is, ", opponentOldSkillRating);
    let MLscoreRatingResponse;
    await singlePlayerSkillRatingUpdate(yourOldSkillRating,opponentOldSkillRating,yourScore,opponentScore)
    .then(responseBody => {
      MLscoreRatingResponse = responseBody;
          return MLscoreRatingResponse;
      })
      .catch(error => {
          console.error(error);
      });
    
    console.log("Returning Skill rating res, ", MLscoreRatingResponse);
    let MLscoreRatingResponseJsonObj = JSON.parse(MLscoreRatingResponse)

    if(!MLscoreRatingResponse){
      return res.status(400).json({ statusCode: 400,message: "Can not update the skill rating." });  
    }

     //update this user's skill rating    
      let skillRating =MLscoreRatingResponseJsonObj["p1EloNew"];
      console.log("user1's new skill rating, ", skillRating);
      try{
        console.log("user1's email, ", user[0].email);
        await User.findOneAndUpdate(
          { email: user[0].email }, // Filter criteria
          { skillRating: skillRating } // Update
   
      );
      }catch(e){
        console.log("Unable to update user's skill rating record");
        return res.status(404).json({statusCode: 404,message: "Unable to update user's skill rating record"});
      }   
      
      //update this user's opponent skill rating    
      let OppSkillRating =MLscoreRatingResponseJsonObj.p2EloNew;
      console.log("user2's new skill rating, ", OppSkillRating);
      try{
        await User.findOneAndUpdate(
          { email: oppUser[0].email }, // Filter criteria
          { skillRating: OppSkillRating } // Update
   
      );
      }catch(e){
        console.log('Unable to update user ', oppUser[0].email, ' skill rating record');
        return res.status(404).json({statusCode: 404,message: e});
      } 
    //save match history for user 1
    let userMatchHistoryObj = new MatchHistory({
      "email": req.body.email,
      "date": date,
      "playFormat": playFormat,
      "matchingPartners" : undefined,
      "matchingOpponents":opponentEmail[0],
      "yourScore": yourScore,
      "opponentScore":opponentScore,
    });
    userMatchHistoryObj.save();
    console.log("Finish uodate user1's match history");

    //save match history for user 2
    let user2MatchHistoryObj = new MatchHistory({
      "email": opponentEmail[0],//req.body.email,
      "date": date,
      "playFormat": playFormat,
      "matchingPartners" : undefined,
      "matchingOpponents":req.body.email,
      "yourScore": opponentScore,//yourScore,
      "opponentScore":yourScore//opponentScore,
    });
    user2MatchHistoryObj.save();
    console.log("Finish update user2's match history");
   
    return res.status(200).json({ statusCode: 200,message: "Match history created for your single player format game." });
  }
  //TODO: if it is double players match, store, partner emial, two other opponents emails
  if(playFormat.toLowerCase() === 'double' || playFormat.toLowerCase() === 'mix'){
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
    //TODO: update the skill rating
    return res.status(200).json({ statusCode: 200,message: "Match history created for your "+ playFormat +" player format game." });
  }
    
  return res.status(404).json({ statusCode: 404,message: "Unknow error to save user's match history." });
}));

//api fetch a user's match history
router.get('/getMatchHistory/:email', asyncHandler(async(req, res) =>{

  const {email} = req.params;
  let user = await MatchHistory.find({email: email});
  if (!user || !user.length) {
    return res.status(404).json({ statusCode: 404,message: "User Not Found" });
  }
   
  return res.status(200).json({ 
    statusCode: 200,
    message: "Match history found.",
    body: user});
        
}));


//api for getting AI training data 
router.post('/addAImodelData', asyncHandler(async(req, res) =>{
  let userEmail = req.body.email;
  const user = await User.find({email: userEmail});

  if (!user || !user.length) {
    return res.status(404).json({ statusCode: 404,message: "User Not Found" });
  }

  let choices = req.body.choices;
  let weights = req.body.weights; //it will need ML backend to pass the weights into it
  
  let createAImodel = new AImodel({
    "email": userEmail,
    "choices":choices,
    "weights":weights
  })
  createAImodel.save();

  const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: 8000,
  path: '/trainml?userEmail='+userEmail, //localhost:8000/trainml?userEmail=bruceoconnor@sjsu.edu 
  method: 'GET',
};

const request = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

request.on('error', (error) => {
  console.error(error);
});

request.end();


  return res.status(200).json({ 
    statusCode: 200,
    message: "Successfully created AI training data for user, " + userEmail
  });

}));

//api to fetch a user's AI training data
router.get('/getAImodelData/:userEmail', asyncHandler(async(req, res) =>{
  const {userEmail} = req.params;
  const user = await AImodel.find({email: userEmail});

  if (!user || !user.length) {
    return res.status(404).json({ statusCode: 404,message: "User Not Found" });
  }

  return res.status(200).json({ 
    statusCode: 200,
    message: "Successfully get AI training data for user, " + userEmail,
    body: user[0]
  });

}));

const singlePlayerSkillRatingUpdate = function(p1Elo,p2Elo,s1,s2){
  console.log("Calling ML backend to get new skill rating.");

  const http = require('http');
  let response;

  const options = {
    hostname: '127.0.0.1',
    port: 8000,
    path: '/1p?p1Elo='+p1Elo+'&p2Elo='+p2Elo+'&s1='+s1+'&s2='+s2, //http://localhost:8000/1p?p1Elo=2000&p2Elo=1000&s1=3&s2=21 
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
        let responseBody = '';

        res.on('data', (chunk) => {
            responseBody += chunk;
        });

        res.on('end', () => {
            resolve(responseBody);
        });
    });

    req.on('error', (error) => {
        reject(error);
    });

    req.end();
});
  
  // makeRequestForSkillRating(options,http)
  // .then(responseBody => {
  //   response = responseBody;
  //     console.log("line 419",response);
  //     return responseBody;
  // })
  // .catch(error => {
  //     console.error(error);
  // });

  return response;

}

function makeRequestForSkillRating(options, http) {
  return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
          let responseBody = '';

          res.on('data', (chunk) => {
              responseBody += chunk;
          });

          res.on('end', () => {
              resolve(responseBody);
          });
      });

      req.on('error', (error) => {
          reject(error);
      });

      req.end();
  });
}


module.exports = router;