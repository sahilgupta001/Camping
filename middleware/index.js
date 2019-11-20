var Campground = require("../models/campground");
var Comment = require("../models/comment");
// all the middleware goes here
var middleware = {};

middleware.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        //console.log("Inside Is authenticated");
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                //console.log("inside first error statement");
                req.flash("error", "Campgrounds not found");
                res.redirect("back");
            }
            else {
                if(foundCampground.author.id.equals(req.user._id)){
                    console.log(foundCampground.author.id);
                    next();
                }
                else{
                    console.log("Hi Bye");
                    req.flash("error", "You don't have permission to do that !!!");
                    res.redirect("back");
                }
            }
        });
    }
    else
        req.flash("error", "You need to be logged in to do that!!");
        res.redirect("back");
};

middleware.checkCommentsOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err)
                res.redirect("/back")
            else {
                if(foundComment.author.id.equals(req.user._id))
                    next();
                else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that !!");
        res.redirect("back");
    }
};

middleware.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated())
        return next();
    req.flash("error", "You need to be logged in to do that !!");
    res.redirect("/login");
};


module.exports = middleware;