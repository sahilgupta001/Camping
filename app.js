var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Comment         = require("./models/comment"),
    Campground      = require("./models/campground"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash"),
    seedDB          = require("./seeds"),
    passport        = require("passport"),
    User            = require("./models/user"),
    LocalStrategy   = require("passport-local");

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");
//seedDB();

//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb+srv://admin:sahilsahil@cluster0-wnd4p.mongodb.net/test?retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//===================
//PASSPORT LOCAL CONFIGURATION
//====================

app.use(require("Express-session")({
    secret: "Once again Rusty wins cutest dog!!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.listen(process.env.PORT || 4000);