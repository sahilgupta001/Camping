    var express     = require("express");
    var router      = express.Router();
    var Campground  = require("../models/campground");
    var middleware  = require("../middleware");

    router.get("/", function(req, res){
        //ALL THE CAMPGROUNDS ARE TO BE FETCHED FROM THE DATABASE
        Campground.find({}, function(err, allCampgrounds){
            if(err)
                console.log(err);
            else
                res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        });
    });

    router.post("/", middleware.isLoggedIn, function(req, res){
        //console.log("You are inside of the campgrounds page");
        var name = req.body.name;
        var image = req.body.image;
        var price = req.body.price;
        var description = req.body.description;
        var author = {
            id: req.user._id,
            username: req.user.username
        }
        var newCampground = {name: name, price: price, image: image, description: description, author: author};
        // Create a new campground and save it to the database
        Campground.create(newCampground, function(err, campground){
            if(err) {
                console.log(err);
            }
            else {
                //console.log(campground);
                res.redirect("/campgrounds");
            }
        });
    });


    router.get("/new", middleware.isLoggedIn, function(req, res){
        res.render("campgrounds/new");
    });


    router.get("/:id", function(req, res){
        Campground.findById(req.params.id).populate("comments").exec(function(err, findCampground){
            if(err)
                console.log(err);
            else {
                //console.log(findCampground);
                res.render("campgrounds/show", {campground: findCampground});
            }
        });
    });

    //EDIT CAMPGROUND ROUTE

    router.get("/:id/edit", function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
        });
    });

    //UPDATE CAMPGROUND ROUTE
    router.put("/:id", function(req, res){
        Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground ){
            if(err){
                //console.log("Inside of the campgrounds first error statement(POST)");
                res.redirect("/campgrounds");
            }
            else {
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    });

//DESTROY CAMPGROUND ROUTE

    router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findByIdAndRemove(req.params.id, function(err){
            if(err)
                res.redirect("/campgrounds");
            else
                res.redirect("/campgrounds");
        });
    });

    module.exports = router;