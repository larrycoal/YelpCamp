var express = require('express')
var router = express.Router()
var campground = require('../models/campground')
var middleware = require('../middleware/index')
const multer = require('multer')
const cloudinary = require('cloudinary')
var storage = multer.diskStorage({
   filename: (req,file,callback)=>{
       callback(null,Date.now()+file.originalname)
   } 
})

var imageFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
        return cb(new Error('only image files are allowed'), false)
    }
    cb(null,true)
}

var upload = multer({storage:storage,fileFilter:imageFilter})

cloudinary.config({
    cloud_name:'dbdrtuscd',
    api_key:process.env.Api_Key,
    api_secret:process.env.Api_Secret

})



router.get('/', (req, res) => {
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search),'gi')
        campground.find({name:regex}, (err, campground) => {
            res.render('campground/campgrounds', { campground: campground, currentuser: req.user })
        })
    }else{
    campground.find({}, (err, campground) => {
        res.render('campground/campgrounds', { campground: campground, currentuser: req.user })
    })
}
})


router.get('/new', middleware.isloggedin, (req, res) => {
    res.render('campground/new');
})
router.post('/', middleware.isloggedin, upload.single('image'),async(req, res) => {
    await cloudinary.uploader.upload(req.file.path,(result)=>{
        req.body.campground.image=result.secure_url;
    })
    req.body.campground.author = {
        id: req.user._id,
        username: req.user.username
    }
    campground.create(req.body.campground, function (err, campground) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.redirect('/campgrounds')
        }
    })

})

router.get('/:id', (req, res) => {

    campground.findById(req.params.id).populate('comment').exec((err, campground) => {

        if (err) {
            console.log("something went wrong")
        } else {
            res.render('campground/show', { campground: campground })

        }
    })
});
//Edit route
router.get('/:id/edit',middleware.checkCampgroundOwnership, (req, res) => {
    campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
            res.redirect('/campgorunds')
        } else {
            res.render('campground/edit', { campground: campground })
        }
    })

})

//Edit campground
router.put('/:id',middleware.checkCampgroundOwnership, (req, res) => {
    campground.findByIdAndUpdate(req.params.id, req.body.Edit, (err, campground) => {
        if (err) {
            console.log(err)
            res.redirect('/campgrounds')
        } else {
            res.redirect('/campgrounds/' + campground._id)
        }
    })
});
//Delete route
router.delete('/:id/delete', middleware.checkCampgroundOwnership, (req, res) => {
    campground.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log('something went wrong')
        } else {
            res.redirect('/campgrounds')
        }
    })
})
function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}



module.exports = router;
