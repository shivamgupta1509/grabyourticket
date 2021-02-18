const mongoose = require("mongoose")
      passport = require("passport")
      passportLocalMongoose = require("passport-local-mongoose")

UserSchema = new mongoose.Schema({
    fullname : String,
    username : String,
    password : String
})

UserSchema.plugin(passportLocalMongoose)

module.exports= mongoose.model("User", UserSchema)