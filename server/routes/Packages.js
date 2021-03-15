const express = require('express')
const Router = express.Router()
const connection = require('../connection')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

Router.get('/read', (req, res) => {
  connection.query(
    `SELECT * from db_packages ORDER BY number`,
    (err, rows, fields) => {
      if (err) {
        return console.error('error: ' + err.message)
      }
      res.send(rows)
    },
  )
})

//route untuk ambil data berdasarkan id
Router.get('/read/:packageId', jsonParser, (req, res) => {
  const id = req.params.packageId
  connection.query(
    'SELECT * FROM db_packages WHERE id = ?',
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
  }
  connection.query('INSERT INTO db_packages SET ?', data, (err) => {
    if (err) throw err
  })
  connection.query(
    'SELECT * FROM db_packages WHERE id = ?',
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
Router.put('/update/:packageId', jsonParser, (req, res) => {
  const id = req.params.packageId
  const id_customer = req.body.id_customer
  const name = req.body.name

  connection.query(
    'UPDATE db_packages SET , id_customer = ?, name = ? WHERE id = ?',
    [id_customer, name, id],
    (err, results) => {
      if (err) throw err
    },
  )
  connection.query(
    'SELECT * FROM db_packages WHERE id = ?',
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
Router.delete('/delete/:packageId', jsonParser, (req, res) => {
  const id = req.params.packageId
  connection.query(
    `DELETE FROM db_packages WHERE id = "${id}"`,
    (err, fields) => {
      if (err) throw err
      res.send(id)
    },
  )
})

module.exports = Router
