require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

var PORT = 3000;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})