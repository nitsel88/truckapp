const express = require('express')
const router = express.Router()
const dbObj = require('./database')


router.get('/', (req, res) => {
   
   dbObj.getDrivers().then((drivers)=> {
      respobj = {respCode: 0, response: drivers}
    res.json(respobj)
   }).catch((err)=> {
      respobj = {respCode: -1, error: err}
    res.json(respobj)
   })
})

router.get('/:driverId', (req, res) => {
   
   dbObj.getOrdersForDriver(req.params.driverId).then((driver)=> {
      respobj = {respCode: 0, response: driver}
    res.json(respobj)
   }).catch((err)=> {
      respobj = {respCode: -1, error: err}
    res.json(respobj)
   })
})

router.post('/', (req, res) => {
   
   dbObj.insertDriver(req.body).then((stat) => {
       console.log(stat)
       respobj = {respCode: 0, response: stat}
       res.json(respobj)
   }).catch((err)=> {
      respobj = {respCode: -1, error: err}
      res.json(respobj)
   })
})


module.exports = router