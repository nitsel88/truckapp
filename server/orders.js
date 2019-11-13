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

router.get('/:userId', (req, res) => {
  dbObj.getOrdersForUser(req.params.userId).then((docs)=> {
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

router.delete('/', (req, res) => {   
  dbObj.deleteAllOrders().then((dbres) => {
      console.log(dbres)
      res.json(dbres)
  }).catch ((err) => {
      errobj = {errcode: 500, error: err}
      res.json(errobj)
  })
})

router.put('/', (req, res) => {  
  orderObj = req.body  
  dbObj.updateOrder(orderObj).then((dbres) => {
      console.log(dbres)
      res.json(dbres)
  }).catch ((err) => {
      errobj = {errcode: 500, error: err}
      res.json(errobj)
  })
})

module.exports = router