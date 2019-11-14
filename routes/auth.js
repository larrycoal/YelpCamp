var express = require('express')
var router = express.Router()
var passport = require('passport')
const User = require('../models/user')



router.get('/', (req, res) => {
    res.render('home');
});
router.get('/register',(req,res)=>{
    res.render('register')
})
router.post('/register',(req,res)=>{
    User.register(new User({username:req.body.username}),req.body.password, (err,user)=>{
        if(err){
            req.flash('error', err.message)
           return res.redirect('/register')
        }
        passport.authenticate('local')(req,res,()=>{
            req.flash('Success',"You are now logged in"),
            res.redirect('/campgrounds')
        })
    })
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login',passport.authenticate('local',{
    successRedirect:'/campgrounds',
    failureRedirect:'/login'
}),(req,res)=>{
})
router.get('/logout',(req,res)=>{
    req.logOut()
    req.flash('success',"You Logged out")
    res.redirect('/')
})

module.exports=router