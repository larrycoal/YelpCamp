var express = require('express')
var router = express.Router()
var campground = require('../models/campground')
var middleware = require('../middleware/index')


router.get('/', (req, res) => {
    campground.find({}, (err, campground) => {
        res.render('campground/campgrounds', { campground: campground, currentuser: req.user })
    })
})

router.get('/new', middleware.isloggedin, (req, res) => {
    res.render('campground/new');
})
router.post('/', middleware.isloggedin, (req, res) => {
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = ({
        name: req.body.name,
        image: req.body.image,
        price:req.body.price,
        description: req.body.desc,
        author: author
    })
    console.log(req.user)
    campground.create(newCampground, function (err, campground) {
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




module.exports = router;
