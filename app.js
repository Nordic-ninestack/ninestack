const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");



const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/profileDB", {useNewUrlParser: true});
const detailSchema = {
    name: String,
    location: String,
    mobile: Number,
    email: String,
    degree: String
};
const Detail = mongoose.model("Detail", detailSchema);
app.get("/details", function(req, res) {
Detail.find(function(err, foundDetails){
    if(!err) {
        res.send(foundDetails);
    } else {
        res.send(err);
    }
});
});
app.listen(3000, function() {
    console.log("server started on port 3000");

});