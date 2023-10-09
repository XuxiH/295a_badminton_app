const config = {
    localhost: "http://localhost:3000",
    mongo: {
      secret: "cmpe295_secret_key_2023", //DB pw, invalid for now
      mongoDBURL:
      //mongo DB creation, invalid for now
        "mongodb+srv://xuxihuang:oszjVqctYeVKF4xM@cluster0.i0v6ges.mongodb.net/cmpe295",
    },
    //awsRDS: {
    //host: "database-1.cmp17zmn4nqy.us-east-1.rds.amazonaws.com",
    //user: "admin",
    //password: "cmpe295project",
    //database: "stack-overflow-db",
    //},
    remoteURL: "localhost",
  };
  
  module.exports = config;
  