require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/users")
const Ticket = require("./models/tickets")
const LocalStrategy = require("passport-local")
const cors = require("cors");
const passport = require("passport");
var unirest = require("unirest");
const session = require("express-session");
var unirest = require("unirest");
const destinationId = require("./hotelDestinationId.json");

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
    console.log(sourceCode, destinationCode, date);
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
    var destinationName = req.body.location;
    for (let i = 0; i < destinationId.length; i++) {
        const element = destinationId[i];
        if (element.location == destinationName) {
            var id = element.destinationId;
            break
        }
    }

    var request = unirest("GET", "https://hotels4.p.rapidapi.com/properties/list");

    request.query({
        "destinationId": id,
        "pageNumber": "1",
        "checkIn": req.body.checkIn,
        "checkOut": req.body.checkOut,
        "pageSize": "25",
        "adults1": "1",
        "currency": "INR",
        "locale": "en_IN",
        "sortOrder": "PRICE"
    });

    request.headers({
        "x-rapidapi-key": "c639e3c3b0msh4b52d4bb9e0cf90p1219c5jsn177926434628",
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "useQueryString": true
    });


    request.end(function (response) {
        if (response.error) throw new Error(response.error);

        console.log(response.body);
        res.send({ hotelData: response.body });
    });
});

app.post("/book_ticket", (req, res) => {
    var booking_type = req.body.booking_type;
    var Full_name = req.body.FullName;
    var Phone_number = req.body.PhoneNumber;
    var email = req.body.Email;
    var from = req.body.from;
    var to = req.body.to;
    var Departure_date = req.body.DepartureDate;
    var Departure_time = req.body.DepartureTime;
    var Arrival_date = req.body.ArrivalDate;
    var Arrival_time = req.body.ArrivalTime;
    var Train_name = req.body.TrainName;
    var Hotel_name = req.body.HotelName;
    var Airline_name = req.body.AirlineName;
    var Class = req.body.Class;
    var Room_type = req.body.RoomType;
    var no_of_adults = req.body.Adult;
    var no_of_childrens = req.body.Children;
    var no_of_infants = req.body.Infant

    var TicketData = new Ticket({
        Train_name : Train_name,
        from : from,
        to : to,
        Departure_date : Departure_date,
        Departure_time : Departure_time,
        Class : Class,
        Full_name : Full_name,
        Phone_number : Phone_number,
        email : email,
        Hotel_name : Hotel_name,
        Arrival_date : Arrival_date,
        Arrival_time : Arrival_time,
        Room_type : Room_type,
        Airline_name : Airline_name,
        booking_type: booking_type,
        no_of_adults : no_of_adults,
        no_of_childrens : no_of_childrens,
        no_of_infants : no_of_infants
    });

});

app.post("/book_flight_ticket",(req, res)=>{
    console.log("Inside route...");
    var Departure_time = req.body.departureTime;
    var Class = req.body.class;
    var no_of_adults = req.body.adult;
    var no_of_childrens = req.body.children;
    var no_of_infants = req.body.infant;
    var Phone_number = req.body.phoneNo;;
    var message = req.body.message;

    console.log(".........................", Departure_time);

    var FlightTicketData = new Ticket({
        Departure_time : Departure_time,
        Class : Class,
        no_of_adults : no_of_adults,
        no_of_childrens : no_of_childrens,
        no_of_infants : no_of_infants,
        message : message,
        Phone_number : Phone_number
    });

    console.log(FlightTicketData);

    Ticket.create(FlightTicketData, (err, bookingRequest) => {
        if(err){
            console.log(FlightTicketData);

            console.log("Oops! Something went wrong...");
            console.log(err);
        }
        else{
            // console.log("Successfully booked your ticket...");
            res.send({data : bookingRequest});
        }
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
                res.send({ login: true, user: req.session.user.username, fullName: req.session.user.fullname });
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