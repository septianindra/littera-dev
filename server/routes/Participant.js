const express = require('express')
const Router = express.Router()
const connection = require('../connection')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

Router.get('/read', (req, res) => {
  connection.query(
    `SELECT * from db_participant ORDER BY created_at`,
    (err, rows, fields) => {
      if (err) {
        return console.error('error: ' + err.message)
      }
      res.send(rows)
    },
  )
})

//route untuk ambil data berdasarkan id
Router.get('/read/:participantId', jsonParser, (req, res) => {
  const id = req.params.participantId
  connection.query(
    'SELECT * FROM db_participant WHERE id = ?',
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
    id_customer: req.body.id_customer,
    name: req.body.name,
    nik: req.body.nik,
    dob: req.body.dob,
    address: req.body.address,
    photo: req.body.photo,
    username: req.body.username,
    password: req.body.password,
  }
  connection.query('INSERT INTO db_participant SET ?', data, (err) => {
    if (err) throw err
  })
  connection.query(
    'SELECT * FROM db_participant WHERE id = ?',
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
Router.put('/update/:participantId', jsonParser, (req, res) => {
  const id = req.params.participantId
  const id_customer = req.body.id_customer
  const name = req.body.name
  const nik = req.body.nik
  const dob = req.body.dob
  const address = req.body.address
  const photo = req.body.photo
  const username = req.body.username
  const password = req.body.password

  connection.query(
    'UPDATE db_participant SET , id_customer = ?, name = ?, nik = ?, dob = ?, address = ?, photo = ?, username = ?, password = ? WHERE id = ?',
    [id_customer, name, nik, dob, address, photo, username, password, id],
    (err, results) => {
      if (err) throw err
    },
  )
  connection.query(
    'SELECT * FROM db_participant WHERE id = ?',
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
Router.delete('/delete/:participantId', jsonParser, (req, res) => {
  const id = req.params.participantId
  connection.query(
    `DELETE FROM db_participant WHERE id = "${id}"`,
    (err, fields) => {
      if (err) throw err
      res.send(id)
    },
  )
})

module.exports = Router
