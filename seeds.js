var mongoose     = require("mongoose");
var Campground  = require("./models/campground");
var Comment      = require("./models/comment");
var data = [
    {name: "Cloud's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRTn6wnB_RAVCSRNdpMthOHoqn2UzIXliPsWfKg_vnYcAtZ0G2&s", description: "Spending time in the open air, gazing out at the stars, just taking in every bit of the tranquillity that comes with being so close to nature. Are you someone who picture your holidays like this? If yes, then camping in India is your thing! Be it an adventurous holiday or a peaceful one, camping is the new “it” thing because staying in a resort or a hotel is so passé. Who doesn’t love spending their holiday in some grand hotel but let’s admit that sometimes being away from it all, in the middle of nowhere is even more exciting? The recent situation of camping in India has changed completely to emerge as into a luxurious experience. With more and more people preferring this type of stay, numerous camps have come up to cater to all the needs."},
    {name: "Desert paradise", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokDgWcMMcltNkIk8IQDcF7ecMFOz_0kHJ0789exVLNU5XgzjreQ&s", description: "Spending time in the open air, gazing out at the stars, just taking in every bit of the tranquillity that comes with being so close to nature. Are you someone who picture your holidays like this? If yes, then camping in India is your thing! Be it an adventurous holiday or a peaceful one, camping is the new “it” thing because staying in a resort or a hotel is so passé. Who doesn’t love spending their holiday in some grand hotel but let’s admit that sometimes being away from it all, in the middle of nowhere is even more exciting? The recent situation of camping in India has changed completely to emerge as into a luxurious experience. With more and more people preferring this type of stay, numerous camps have come up to cater to all the needs."},
    {name: "Canyon Floor", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIYEyuHzEpgX0ko56chmCAv33rVTI2odfmhJZHypDN5DeGHiSlCQ&s", description: "Spending time in the open air, gazing out at the stars, just taking in every bit of the tranquillity that comes with being so close to nature. Are you someone who picture your holidays like this? If yes, then camping in India is your thing! Be it an adventurous holiday or a peaceful one, camping is the new “it” thing because staying in a resort or a hotel is so passé. Who doesn’t love spending their holiday in some grand hotel but let’s admit that sometimes being away from it all, in the middle of nowhere is even more exciting? The recent situation of camping in India has changed completely to emerge as into a luxurious experience. With more and more people preferring this type of stay, numerous camps have come up to cater to all the needs."}
];

function seedDB(){
    //REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
        if(err)
            console.log(err);
            console.log("Removed Campground");
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err)
                        console.log(err);
                    else {
                        console.log("Added a campground");
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was Internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err)
                                    console.log(err);
                                else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created New Comment");
                                }
                            });
                    }
                });
            });
    });
}
module.exports = seedDB;
