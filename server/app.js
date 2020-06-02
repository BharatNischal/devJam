const          express = require('express'),
              passport = require("passport"),
         localStrategy = require("passport-local"),
 passportLocalMongoose = require("passport-local-mongoose"),
                    db = require("./models/index"),
               session = require("express-session"),
            bodyParser = require("body-parser"),
                  cors = require("cors"),
                   app = express(),
            middleware = require("./middleware"),
           VideoRoutes = require("./routes/content/video"),
     DeliverableRoutes = require("./routes/content/deliverables"),
           TopicRoutes = require("./routes/content/topic"),
           ContentRoutes = require("./routes/content/content"),
         ProfileRoutes = require("./routes/profile"),
            AuthRoutes = require("./routes/auth");



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
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

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
app.use("/",middleware.isAdmin, ContentRoutes);

// Topic routes
app.use("/",middleware.isAdmin,TopicRoutes);

// Video Routes
app.use("/",middleware.isAdmin,VideoRoutes);

// Deliverable Routes
app.use("/",middleware.isAdmin,DeliverableRoutes);



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
