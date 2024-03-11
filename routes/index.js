var express = require('express');
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
// router.get('/', function(req, res) {
//   res.render("index");
 // });

// SESSIONS
// Once a session is created, it can be checked from any route
// Restarting the server deletes the session

router.get("/", function(req, res){
  req.session.ban = true;
  res.render("index");
});

router.get("/checkban", function(req, res){
  if(req.session.ban === true)
  {
    res.send("You are BANNED!");
  }
});

router.get("/removeban", function(req, res){
  req.session.destroy(function (err){
    if(err) throw err;
    res.send("Ban removed!");

  //   else
  // {
  //   res.send("Not banned!");
  // }
  })  
});

// Cookies

router.get("/cookie", function(req, res){
  res.cookie("age", 25);
  res.send("Set");
});

router.get("/read", function(req, res){
  console.log(req.cookies.age);
  res.send("Check");
});

router.get("/delete", function(req, res){
  res.clearCookie("age");
  res.send("Clear ho gayi");
});


// userModel.create() is async and thus will be executed 
//after sync code.
// To alllow it to be async and execute before sync code, 
// we use await
// await is always used before async
// userModel.create() return an object, stored in a variable
// create adds a document (entity) to the collection

router.get("/create",async function(req, res){
  const createdUser = await userModel.create({
    username : "vs",
    age : 25,
    name : "VS"
  });
  res.send(createdUser);
});

//find() displays all the users
//returns an array
router.get("/allusers", async function(req, res){
  let allusers = await userModel.find();
  res.send(allusers);
});

// To find a single user
// returns null if no user found

// router.get("/allusers", async function(req, res){
//   let allusers = await userModel.findOne({username: "vs"});
//   res.send(allusers);
// });

// To find and delete a user
router.get("/delete", async function(req, res){
  let deleteduser = await userModel.findOneAndDelete({
    username : "vs"
  });
  res.send(deleteduser);
});


module.exports = router;
