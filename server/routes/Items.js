const express = require('express')
const Router = express.Router()
const connection = require('../connection')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

Router.get('/read', (req, res) => {
  connection.query(
    `SELECT * from db_items ORDER BY created_at`,
    (err, rows, fields) => {
      if (err) {
        return console.error('error: ' + err.message)
      }
      res.send(rows)
    },
  )
})

//route untuk ambil data berdasarkan id
Router.get('/read/:itemId', jsonParser, (req, res) => {
  const id = req.params.itemId
  connection.query(
    'SELECT * FROM db_items WHERE id = ?',
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
    id_package: req.body.id_package,
    question: req.body.question,
    option_a: req.body.option_a,
    option_b: req.body.option_b,
    option_c: req.body.option_c,
    option_d: req.body.option_d,
    option_e: req.body.option_e,
    answer_key: req.body.answer_key,
  }
  connection.query('INSERT INTO db_items SET ?', data, (err) => {
    if (err) throw err
  })
  connection.query(
    'SELECT * FROM db_items WHERE id = ?',
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
Router.put('/update/:itemId', jsonParser, (req, res) => {
  const id = req.params.itemId
  const id_package = req.body.id_package
  const question = req.body.question
  const option_a = req.body.option_a
  const option_b = req.body.option_b
  const option_c = req.body.option_c
  const option_d = req.body.option_d
  const option_e = req.body.option_e
  const answer_key = req.body.answer_key

  connection.query(
    'UPDATE db_items SET , id_package = ?, question = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, option_e = ?, answer_key = ? WHERE id = ?',
    [
      id_package,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      option_e,
      answer_key,
      id,
    ],
    (err, results) => {
      if (err) throw err
    },
  )
  connection.query(
    'SELECT * FROM db_items WHERE id = ?',
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
  connection.query(`DELETE FROM db_items WHERE id = "${id}"`, (err, fields) => {
    if (err) throw err
    res.send(id)
  })
})

module.exports = Router
