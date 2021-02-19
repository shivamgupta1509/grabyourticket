require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/users")
const LocalStrategy = require("passport-local")
const cors = require("cors");
const passport = require("passport");
var unirest = require("unirest");
const session = require("express-session");
<<<<<<< HEAD
var unirest = require("unirest");
=======
>>>>>>> b9213a9a67a523dfef27e6a7a7d5e643a88af6d7
const app = express();
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

var PORT = 5000;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);

app.use(session({
    secret: "Option",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


app.post("/search-train", (req, res) => {
    var d = new Date(req.body.date)
    console.log(d.getDate());
    // This is for train api
    var request = unirest("POST", "https://trains.p.rapidapi.com/");

    request.headers({
        "content-type": "application/json",
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": "trains.p.rapidapi.com",
        "useQueryString": true
    });

    request.type("json");
    request.send({
        "search": req.body.searchTrain
    });

    request.end(function (response) {
        if (response.error) throw new Error(response.error);
        console.log(req.body);
        console.log(response.body);
        var searchTrains = response.body;
        var matchedTrains = searchTrains.filter((element) => element.train_from == req.body.sourceTrainCode && element.train_to == req.body.destinationTrainCode)
        return res.send({ trainData: matchedTrains });
    });
    // Train api ended here
});


app.post('/search_flight', (request, response) => {
    var sourceCode = request.body.sourceCode;
    var destinationCode = request.body.destinationCode;
    var date = request.body.date;

    var req = unirest("GET", `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/IN/INR/en-IN/${sourceCode}-sky/${destinationCode}-sky/${date}`);

    req.headers({
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);
        response.send({ flightData: res.body });
    });
})

app.post("/search_hotel", (req, res) => {
    var request = unirest("GET", "https://leejaew-hotels-in-singapore-v1.p.rapidapi.com/hotels");
    request.query({
        "country": req.body.location
    });

    request.headers({
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": "leejaew-hotels-in-singapore-v1.p.rapidapi.com",
        "useQueryString": true
    });

    request.end(function (response) {
        if (response.error) throw new Error(response.error);
        op = response.body
        console.log(op[0]);
        res.send({ hotel: op });
    });
});


app.post("/register", (req, res) => {
    var fullname = req.body.name;
    var username = req.body.email;
    var password = req.body.password1;
    var password2 = req.body.password2;
    if (password != password2) {
        console.log("Password does not match!");
    } else if (fullname != "", username != "", password != "") {
        var newUser = new User({ fullname: fullname, username: username });
        User.register(newUser, password, function (err, user) {
            if (err) {
                console.log(err);
                return res.json({ error: err });
            } else {
                return res.json({ "register": true, user: user });

            }
        });
    }
});

app.post("/login", (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.logIn(newUser, (err) => {
        if (err) {
            return res.json({ error: err });
        } else {
            passport.authenticate("local")(req, res, () => {
                req.session.user = req.user;
                res.send({ login: true, user: req.session.user.username });
            })
        }
    })
});

app.get("/logout", function (req, res) {
    req.logout();
    res.json({ logout: true });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});