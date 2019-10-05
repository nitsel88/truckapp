const express = require('express')
const router = express.Router()
const dbObj = require('./database')


router.get('/', (req, res) => {
   
   dbObj.getUsers().then((users)=> {
      respobj = {respCode: 0, response : users}
      res.json(respobj)
   }).catch((err)=> {
      respobj = {respCode: -1, error: err}
    res.json(respobj)
   })
})

router.get('/:userId', (req, res) => {
   
   dbObj.getOrdersForUser(req.params.id).then((user)=> {
      respobj = {respCode: 0, response : user}
      res.json(respobj)
   }).catch((err)=> {
      respobj = {respCode: -1, error: err}
    res.json(respobj)
   })
})

router.post('/', (req, res) => {
   
   dbObj.insertUser(req.body).then((status) => {
       console.log(stat)
       respobj = {respCode: 0, status:stat}
       res.json(respobj)
   }).catch((err)=> {
      respobj = {respCode: -1, error: err}
      res.json(respobj)
   })
})


module.exports = router