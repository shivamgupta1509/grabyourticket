require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/users")
const LocalStrategy = require("passport-local")
const cors = require("cors");
const passport = require("passport");

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

app.use(require("express-session")({
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

app.get("/", (req, res) => {
    res.send("this is get route of /")
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
                console.log("Req User: ", req.user);
                res.send({ login: true });
            })
        }
    })
});

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});