var orders = require('./orders')
var users = require('./users')
var drivers = require('./drivers')
const dbObj = require('./database')
var express = require('express')
var app = express()

//port
const port = 3001;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

//routing
app.use("/orders", orders);
app.use("/users", users);
app.use("/drivers", drivers);

//initializing DB and start listening to port
dbObj.initDb(() => {
        app.listen(port, function (err) {
        if (err) {
            throw err; //
        }
        console.log("API Up and running on port: " + port);
    });
});
