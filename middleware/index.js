const campground = require('../models/campground')
const comment =require('../models/comment')

var middleware = {}

middleware.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        campground.findById(req.params.id, (err, foundCampground) => {
            if (foundCampground.author.id.equals(req.user._id)) {
                next()
            } else {
                req.flash('error',"You are not permitted to do that"),
                res.redirect('back')
            }
        })
    } else {
        req.flash('error',"Please login or create a user"),
        res.redirect('back')
    }
}
middleware.isloggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error',"Please Login First")
    res.redirect('/login')
}
middleware.checkCommentOwnership=function(req, res, next) {
    if (req.isAuthenticated()) {
        comment.findById(req.params.comment_id, (err, foundComment) => {
            if (foundComment.author.id.equals(req.user._id)) {
                next()
            } else {

                req.flash('error',"You are not permitted to do that"),
                res.redirect('back')
            }
        })
    } else {
        req.flash('error',"Please login or create a user"),
        res.redirect('back')
    }
}
module.exports = middleware