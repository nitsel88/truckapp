// Retrieve
const assert = require("assert");
var MongoClient = require('mongodb').MongoClient

let dbInstance

//initialize DB connec  tion
function initDb(callback) {
   if (dbInstance) {
        console.warn("Trying to init DB again!")
        return callback()
   }

// Connect to the db
MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true,  useUnifiedTopology: true },  function(err, client) {
    if (err) throw err;
    
    db = client.db("truckdb");
    console.log("We are connected")
    dbInstance = db;
    return callback();

  })
}


//Get DB instance
function getDb() {
    assert.ok(dbInstance, "Db has not been initialized. Please called init first.");
    return dbInstance;
}

//insert order details into orders collection
function insertOrders (ordDtl, callback) {
  db = getDb()
  db.collection("orders").insertOne(ordDtl, function(err, res) {
  return callback(err)
 });
}

//get all the orders from orders collection
function getAllOrders () {
  return new Promise((resolve, reject)=> {
  db = getDb()
  db.collection("orders").find({}).toArray(function(err, docs) {
    if (err) { 
      reject (err)
    }
     console.log("Found the following records");
     console.log(docs)
     resolve(docs)
    })
  })
}

//get the list of orders for user
function getOrdersForUser (userid) {
    return new Promise((resolve, reject)=> {
  db = getDb()
  db.collection("orders").find({userId: userid}).toArray(function(err, docs) {
    if (err) { 
      reject (err)
    }
     console.log("Found the record:");
     console.log(docs)
     resolve(docs)
    })
  })
}

//get orders for a driver
function getOrdersForDriver (driverid) {
  return new Promise((resolve, reject)=> {
db = getDb()
db.collection("orders").find({driverId: driverid}).toArray(function(err, docs) {
  if (err) { 
    reject (err)
  }
   console.log("Found the record:");
   console.log(docs)
   resolve(docs)
  })
})
}

//delete orders for a user
function deleteOrder(userid) {
  return new Promise((resolve, reject)=> {
    db = getDb()
    db.collection("orders").deleteOne({userId: userid}, (err) => {
        if (err) { 
          reject (err)
        }
        resolve({status: deleted})
      })
  }) 
}


//insert user details
function insertUser (user) {
    return new Promise((resolve, reject)=> {
    db = getDb()
    db.collection("users").insertOne(user, function(err, res) {
    if (err) { 
      reject (err)
    }
    console.log("user inserted: " + user);
    resolve({status: "registered" }) 
    })
  })
}

//get list of users
function getUsers () {
  return new Promise((resolve, reject)=> {
  db = getDb()
  db.collection("users").find({}).toArray(function(err, users) {
    if (err) { 
      reject (err)
    }
  console.log("Found the following users");
  console.log(users)

  resolve(users);
  });
 })
}


//insert driver details
function insertDriver (driver) {
  return new Promise((resolve, reject)=> {
  db = getDb()
  db.collection("truckdrivers").insertOne(driver, function(err, res) {
  if (err) { 
    reject (err)
  }
  console.log("driver inserted: " + driver);
  resolve({status: "registered" }) 
  })
})
}

//get list of drivers
function getDrivers () {
return new Promise((resolve, reject)=> {
db = getDb()
db.collection("drivers").find({}).toArray(function(err, drivers) {
  if (err) { 
    reject (err)
  }
console.log("Found the following drivers");
console.log(drivers)

resolve(drivers);
});
})
}

module.exports = {
    getDb,
    initDb,
    insertOrders,
    getAllOrders,
    getOrdersForUser,
    deleteOrder,
    insertDriver,
    getOrdersForDriver,
    getDrivers,
    insertUser,
    getUsers 
};