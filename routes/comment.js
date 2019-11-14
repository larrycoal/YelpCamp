var express = require('express')
var router = express.Router()
var campground = require('../models/campground')
var comment = require('../models/comment')
var middleware = require('../middleware/index')


router.get('/campgrounds/:id/comment/new', middleware.isloggedin, (req, res) => {
    campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
        } else {
            res.render('comment/new', { campground: campground })
        }
    })

})
router.post('/campgrounds/:id/comment', middleware.isloggedin, (req, res) => {
    campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
        } else {
            comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err)
                } else {
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save()

                    campground.comment.push(comment)
                    campground.save()
                    res.redirect('/campgrounds/' + campground._id)
                }
            })
        }
    })
});
router.get('/campgrounds/:id/comments/:comment_id/edit',middleware.checkCommentOwnership, (req, res) => {
    campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err)
        } else {
            comment.findById(req.params.comment_id, (err, comment) => {
                if (err) {
                    console.log('error')
                }else{
                    res.render('comment/edit',{campground:foundCampground,comment:comment})
                }
            })

        }
    })

});
router.put('/campgrounds/:id/comments/:comment_id',middleware.checkCommentOwnership,(req,res)=>{
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,comment)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/campgrounds/'+req.params.id)
        }
    })
});
router.delete('/campgrounds/:id/comments/:comment_id',middleware.checkCommentOwnership,(req,res)=>{
     comment.findByIdAndDelete(req.params.comment_id,(err)=>{
         if(err){
             console.log(err)
         }else{
             res.redirect('/campgrounds/'+req.params.id)
         }
     })
})


module.exports = router