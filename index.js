const express = require("express")
const usersLogRouter = require('./routes/kursovaya.routes')
const app = express()
app.use(express.json())
app.use('/', usersLogRouter)

app.listen(3001,()=> console.log(`server started on port 3001`))