const e = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'remarkkr3w',
    database: 'TradeForTrade'
})

connection.connect((err) => {
    if(err) throw err;
    console.log("Connected to MySQL!")
});

var services = function(app){
    app.post('/register-page', function(req, res){
        console.log("in home page");
        var data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };

        connection.query("INSERT INTO Accounts SET ?;", data, function(err, results){
            if(err){
                return res.status(201).send(JSON.stringify({msg: "Error" + err}));
            } else{
                return res.status(201).send(JSON.stringify({msg: "SUCCESS"}));
            }
        });
    });

    app.get('/login', function(req, res){
        username = req.query.username;
        password = req.query.password;
        var data = [username, password];

        console.log(data);

        connection.query("SELECT * FROM Accounts WHERE username = ? AND password = ?;", data, function(err, results){
            //console.log(JSON.stringify(results[0].username));
            if (err){
                return res.status(201).send(JSON.stringify({msg: "Error" + err}));
            } 
            else if (results.length > 0){
                //console.log(JSON.stringify(results))
                return res.status(201).send(JSON.stringify({msg: "SUCCESS", results: results}));
            }
            else{
                return res.status(201).send(JSON.stringify({msg: "Incorrect Password or Username"}));
            }

        });
    });

    app.post('updateProfilePic', function(req,res){
        let sampleFile;
        let uplaodFile;

        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).send('No Files Were Uploaded');
        }

        // name of the input is sampleFile
        sampleFile = req.files.sampleFile;
        uplaodFile = __dirname + "/../images/" + sampleFile.name;

        console.log(sampleFile);
        return false;
    });

    app.post('/addItem', function(req, res){
        var data = {
            itemDescription: req.body.itemDescription,
            status: req.body.status,
            itemCategory: req.body.itemCategory,
            Accounts_userId: req.body.userId,
            itemName: req.body.itemName
        };

        console.log(data);

        connection.query("INSERT INTO Items SET ?;", data, function(err, results){
            if(err){
                return res.status(201).send(JSON.stringify({msg: "Error" + err}));
            } else{
                return res.status(201).send(JSON.stringify({msg: "SUCCESS"}));
            }
        });
    });

    app.get('/current-items', function(req, res){
        var userId = req.query.userId;
        // console.log(userId)
        connection.query("SELECT * FROM Items WHERE Accounts_userId = ?;", userId, function(err, results){
            if (err){
                return res.status(201).send(JSON.stringify({msg: "Error" + err}));
            } else{
                return res.status(201).send(JSON.stringify({msg: "SUCCESS", results: results}));
            }
        });
    });

    app.get('/feed-items', function(req, res){
        
        connection.query("SELECT * FROM Items ORDER BY itemId DESC;", function(err, results){
            if (err){
                return res.status(201).send(JSON.stringify({msg: "Error" + err}));
            } else{
                return res.status(201).send(JSON.stringify({msg: "SUCCESS", results: results}));
            }
        });
    });
};

module.exports = services;