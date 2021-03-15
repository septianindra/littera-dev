const express = require('express')
const Router = express.Router()
const connection = require('../connection')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

Router.get('/read', (req, res) => {
  connection.query(
    `SELECT * from db_reports ORDER BY created_at`,
    (err, rows, fields) => {
      if (err) {
        return console.error('error: ' + err.message)
      }
      res.send(rows)
    },
  )
})

//route untuk ambil data berdasarkan id
Router.get('/read/:reportId', jsonParser, (req, res) => {
  const id = req.params.reportId
  connection.query(
    'SELECT * FROM db_reports WHERE id = ?',
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
    id_participant: req.body.id_participant,
    id_item: req.body.id_item,
    answer: req.body.answer,
  }
  connection.query('INSERT INTO db_reports SET ?', data, (err) => {
    if (err) throw err
  })
  connection.query(
    'SELECT * FROM db_reports WHERE id = ?',
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
Router.put('/update/:reportId', jsonParser, (req, res) => {
  const id = req.params.reportId
  const id_participant = req.body.id_participant
  const id_item = req.body.id_item
  const answer = req.body.answer

  connection.query(
    'UPDATE db_reports SET , id_participant = ?, id_item = ?, answer = ? WHERE id = ?',
    [id_participant, id_item, answer, id],
    (err, results) => {
      if (err) throw err
    },
  )
  connection.query(
    'SELECT * FROM db_reports WHERE id = ?',
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
Router.delete('/delete/:reportId', jsonParser, (req, res) => {
  const id = req.params.reportId
  connection.query(
    `DELETE FROM db_reports WHERE id = "${id}"`,
    (err, fields) => {
      if (err) throw err
      res.send(id)
    },
  )
})

module.exports = Router
