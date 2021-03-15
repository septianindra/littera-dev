const express = require('express')
const Router = express.Router()
const connection = require('../connection')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

Router.get('/read', (req, res) => {
  connection.query(
    `SELECT * from db_customer ORDER BY created_at`,
    (err, rows, fields) => {
      if (err) {
        return console.error('error: ' + err.message)
      }
      res.send(rows)
    },
  )
})

//route untuk ambil data berdasarkan id
Router.get('/read/:id', jsonParser, (req, res) => {
  const id = req.params.id
  connection.query(
    'SELECT * FROM db_customer WHERE id = ?',
    [id],
    (err, rows, fields) => {
      if (err) {
        return console.error('error: ' + err.message)
      }
      res.send(rows)
    },
  )
})

//route untuk insert data
Router.post('/create', jsonParser, (req, res) => {
  let data = {
    id: req.body.id,
    company_name: req.body.companyName,
    address: req.body.address,
    pic_name: req.body.picName,
    phone: req.body.phone,
    email: req.body.email,
  }
  connection.query('INSERT INTO db_customer SET ?', data, (err) => {
    if (err) throw err
  })
  connection.query(
    'SELECT * FROM db_customer WHERE id = ?',
    [data.id],
    (err, rows, fields) => {
      if (err) {
        return console.error('error: ' + err.message)
      }
      res.send(rows)
    },
  )
})

//route untuk update data
Router.put('/update/:customerId', jsonParser, (req, res) => {
  const id = req.params.customerId
  const company_name = req.body.companyName
  const address = req.body.address
  const pic_name = req.body.picName
  const phone = req.body.phone
  const email = req.body.email

  connection.query(
    'UPDATE db_customer SET , company_name = ?, address = ?, pic_name = ?, phone = ?, email = ? WHERE id = ?',
    [company_name, address, pic_name, phone, email, id],
    (err, results) => {
      if (err) throw err
    },
  )
  connection.query(
    'SELECT * FROM db_customer WHERE id = ?',
    [id],
    (err, rows, fields) => {
      if (err) {
        return console.error('error: ' + err.message)
      }
      res.send(rows)
    },
  )
})

//route untuk delete data
Router.delete('/delete/:id', jsonParser, (req, res) => {
  const id = req.params.id
  connection.query(
    `DELETE FROM db_customer WHERE id = "${id}"`,
    (err, fields) => {
      if (err) throw err
      res.send(id)
    },
  )
})

module.exports = Router
