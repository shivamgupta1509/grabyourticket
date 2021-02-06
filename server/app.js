const express = require("express");
const mongoose = require("mongoose");

const app = express();

var PORT = 3000;

mongoose.connect("mongodb+srv://admin-ritik:Ritik@21@cluster0-ase9w.mongodb.net/grabyourticketDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})