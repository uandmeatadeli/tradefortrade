const path = require('path');

//Page Listeners 
var router = function(app) {
    console.log("in Router");

    app.get('/', function(req, res) {
        console.log("Get Home Page");
        res.status(200).sendFile(path.join(__dirname + "/../client/login-page.html"));
    });

    app.get("/register-Page", function(req, res){
        console.log("Get register Page");
        res.status(200).sendFile(path.join(__dirname + "/../client/register-page.html"));
    });

    app.get("/login-page", function(req, res){
        console.log("Get login Page");
        res.status(200).sendFile(path.join(__dirname + "/../client/login-page.html"));
    });

    app.get("/account-page", function(req, res){
        console.log("Get Account Page");
        res.status(200).sendFile(path.join(__dirname + "/../client/account-page.html"));
    });

    app.get("/feed-page", function(req, res){
        console.log("Get Feed Page");
        res.status(200).sendFile(path.join(__dirname + "/../client/feed-page.html"));
    });

};

module.exports = router;