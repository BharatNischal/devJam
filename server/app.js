const          express = require('express'),
              passport = require("passport"),
         localStrategy = require("passport-local"),
        GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
        GitHubStrategy = require('passport-github').Strategy,
 passportLocalMongoose = require("passport-local-mongoose"),
                    db = require("./models/index"),
               session = require("express-session"),
            bodyParser = require("body-parser"),
                  cors = require("cors"),
                   app = express(),
                  path = require("path"),
           VideoRoutes = require("./routes/content/video"),
     DeliverableRoutes = require("./routes/content/deliverables"),
           TopicRoutes = require("./routes/content/topic"),
         ContentRoutes = require("./routes/content/content"),
         ProfileRoutes = require("./routes/profile"),
         CommentRoutes = require("./routes/comments"),
         SubmissionRoutes = require("./routes/submission"),
         TestRoutes = require("./routes/test"),
         QuestionRoutes = require("./routes/questions"),
            AuthRoutes = require("./routes/auth"),
            codingRoutes = require("./routes/codingtest"),
            CourseRoutes = require("./routes/course");

require("./timedAlert");

// Setting Up Dotenv for .env files environment variable
const dotenv = require('dotenv');
dotenv.config();


// Session setup
app.use(session({
  secret:"JS is cool",
  resave:false,
  saveUninitialized:false
}));


//passport Auth setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(db.User.authenticate()));
passport.serializeUser(function(user,done){
  done(null,user._id);
});
passport.deserializeUser(function(id, done) {
  db.User.findById(id)
  .populate([
    {path:"notifications.notification",model:"notification"}
  ]).then(user=>{
      done(null, user);
  }).catch(err=>{
    done(err);
  })
});



// Use the GoogleStrategy within Passport.
passport.use(new GoogleStrategy({
    clientID: process.env.mail_client_id,
    clientSecret: process.env.mail_client_secret,
    callbackURL: process.env.NODE_ENV === 'production'?"http://devjam-code-swat.herokuapp.com/auth/google/redirect":`http://localhost:8080/auth/google/redirect`
  },
  
  function(accessToken, refreshToken, profile, done) {
       db.User.findOne({googleId:profile.id})
       .then(async function(foundUser){
         if(!foundUser){
           db.User.create({
             username:profile._json.email,
             name:profile._json.name,
             profilePic:profile._json.picture,
             googleId:profile.id,
             student:true
           }).then(async (createdUser)=>{
            await db.Deliverable.find({})
              .then(foundDeliverables=>{
                foundDeliverables.forEach(foundDel=>{
                  foundDel.submissions.push({userId:createdUser._id});
                  foundDel.save();
                })
              });
             done(null,createdUser);
           }).catch(err=>{done(err);});
         }else{
           foundUser.profilePic=profile._json.picture;
           console.log(profile._json.picture);
           await foundUser.save();
           done(null,foundUser);
         }
       })
       .catch(Err=>{
         done(Err);
       })
  }
));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production'?"http://devjam-code-swat.herokuapp.com/auth/github/callback":`http://localhost:8080/auth/github/callback`
},
function(accessToken, refreshToken, profile, done) {
  db.User.findOne({githubId:profile._json.id})
       .then(foundUser=>{
         if(!foundUser){
           db.User.create({
             name:profile._json.name,
             profilePic:profile._json.avatar_url,
             githubId:profile._json.id,
             student:true
           }).then(async (createdUser)=>{
              await db.Deliverable.find({})
              .then(foundDeliverables=>{
                foundDeliverables.forEach(foundDel=>{
                  foundDel.submissions.push({userId:createdUser._id});
                  foundDel.save();
                })
              });
             done(null,createdUser);
           }).catch(err=>{done(err);});
         }else{
           done(null,foundUser);
         }
       })
       .catch(Err=>{
         done(Err);
       })
  }
));

// Cors setup
app.use(cors({
  origin:['http://localhost:3000'],
  methods:['GET','POST','PUT','DELETE'],
  credentials: true // enable set cookie
}));

// bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// Routes

// Profile Routes
app.use("/",ProfileRoutes);

//Authentication routes
app.use("/",AuthRoutes);

// Content Page routes
app.use("/", ContentRoutes);

// Topic routes
app.use("/",TopicRoutes);

// Video Routes
app.use("/",VideoRoutes);

// Deliverable Routes
app.use("/",DeliverableRoutes);

// Comments Routes
app.use("/",CommentRoutes);

// Submissions Routes
app.use("/",SubmissionRoutes);

// Test Routes
app.use("/",TestRoutes);

// Question Routes
app.use("/",QuestionRoutes);

// Courses Routes
app.use("/",CourseRoutes);

// Coding Routes
app.use("/",codingRoutes);

const redirectHost=process.env.NODE_ENV === 'production'?"":"http://localhost:3000";

// GET /auth/google Google Authentication initiated
app.get('/auth/google',
  passport.authenticate('google', { scope: ["profile","email"] }));

// GET /auth/google/callback
//   Google authentication will be completed in this route
app.get('/auth/google/redirect',
  passport.authenticate('google', { failureRedirect: `${redirectHost}/login` }),
  function(req, res) {
    console.log(req.user);
    if(req.user.student){
      res.redirect(`${redirectHost}/studDash`);
    }else{
      res.redirect(`${redirectHost}/profiles`);
    }
  });

// Github authentication will initiate in this route
app.get('/auth/github',
  passport.authenticate('github'));

//Github authentication will complete in this route
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: `${redirectHost}/login` }),
  function(req, res) {
    // Successful authentication, redirect home.
    if(req.user.student){
      res.redirect(`${redirectHost}/studDash`);
    }else{
      res.redirect(`${redirectHost}/profiles`);
    }
  });

  app.get("/fail",(req,res)=>{
    res.json({success:"false"});
  });

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(__dirname+'/../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..' , 'client', 'build', 'index.html'));
  });
}



const port = process.env.PORT || 8080;
app.listen(port,()=>{
  console.log("Listening on port ",port);
});
