const express = require('express')
const customersRoutes = require('./routes/Customers')
const itemsRoutes = require('./routes/Items')
const packagesRoutes = require('./routes/Packages')
const participantRoutes = require('./routes/Participant')
const reportsRoutes = require('./routes/Reports')

const app = express()

app.use('/customers', customersRoutes)
app.use('/items', itemsRoutes)
app.use('/packages', packagesRoutes)
app.use('/participant', participantRoutes)
app.use('/reports', reportsRoutes)

app.listen(4000)
