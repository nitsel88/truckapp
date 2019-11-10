const express = require('express')
const router = express.Router()
const dbObj = require('./database')


router.get('/', (req, res) => {
  dbObj.getAllOrders().then((docs)=> {
     res.json(docs) 
  }).catch((err)=> {
    respobj = {respCode: -1, error: err}
    res.json(respobj)
   })
})


router.post('/', function (req, res) {
  orderObj = req.body 
  dbObj.insertOrders(orderObj, (err) => {
    if (err) {
      respobj = {respCode: -1, error: err}
      res.json(respobj)
    }
    console.log("order inserted")
    respobj = {respCode: 0}
    res.json(respobj)
  }) 
})


module.exports = router