require('dotenv').config();
const express = require('express');
const app = express()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const passport = require('passport')
const localStrategy = require('passport-local')
const session = require('express-session')
const methodOverride =require('method-override')
const flash=require('connect-flash')
const campground = require('./models/campground')
const User = require('./models/user')
const comment = require('./models/comment')
const campgroundRoutes =require('./routes/campgrounds')
const commentRoutes =require('./routes/comment')
const authRoutes =require('./routes/auth')
const seedDB = require('./seed')
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
app.use(express.static(__dirname + "/public"));
mongoose.connect('mongodb://localhost/camping_app')
app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(session({
    secret:'regular',
    resave: false,
    saveUninitialized:false
}));
app.use(flash())
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
//seedDB()
app.use((req,res,next)=>{
    res.locals.currentuser=req.user;
    res.locals.error=req.flash('error');
    res.locals.success=req.flash('success');
    next();
})
app.use(commentRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use(authRoutes)





app.listen(3000, () => {
    console.log('server Started')
})