const express = require("express");
const jwt = require("jsonwebtoken");


const app = express();




app.get("/api", (req, res) => {
    res.json({
        message: "welcome to the API"
    });
});

app.post("/api/posts", verifyToken, (req,res) => {
   jwt.verify(req.token, "secretkey", (err, authData) => {
       if(err) {
           res.sendStatus(403);
       } else {
           res.json({
               message: "post created",
           authData
            });
       }
                
            });
        
    });
    


app.post("/api/login", (req,res) => {
    //user
const user = {
    id: 1,
    username: "Naaz",
    email: "mobassera.naaz@kilowott.com"
}

jwt.sign({user}, "secretkey", {expiresIn: "30s"}, (err, token) => {
res.json({
    token
});
});
});
//verify token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== "undefined"){

        const bearer =  bearerHeader.split("");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
app.listen(3000, () => console.log("Server Up and running"));