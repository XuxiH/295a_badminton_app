const express = require('express');
const path = require('path');

const app = express();
// var session = require("express-session");
// var cors = require("cors");
// var config = require("./backend/configs/config");
// var mongoose = require("mongoose");
// const fileUpload = require("express-fileupload");
// let dotenv = require("dotenv");
// dotenv.config();
// //const port = process.env.PORT;
// let userRoutes = require("./routes/userRoute");
// let gameInvitationRoutes = require("./routes/gameInvitationRoute");

// app.set("view engine", "ejs");

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

//use cors to allow cross origin resource sharing
// app.use(cors({ origin: config.localhost, credentials: true }));

// //use express session to maintain session data
// app.use(
//   session({
//     secret: "cmpe295-data-collection",
//     resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration: 30 * 24 * 60 * 60 * 1000, // Duration of Session :  1 month
//   })
// );

app.use(express.json());

//Allow Access Control
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", config.localhost);
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Cache-Control", "no-cache");
//   next();
// });

// var options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// app.use(fileUpload());

// Serve static files from the React app
//badmintonApplication\frontend\build
app.use(express.static(path.join(__dirname, 'frontend/build')));


// Serve static files from the React app
//badmintonApplication\frontend\build
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Define API routes or any other routes here

// The "catchall" handler: for any request that doesn't
// match the ones above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
