const express = require("express")
const dotenv = require('dotenv')
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const multer = require("multer")
const route = require("./routes/route")
const app = express()
const password = process.env.PASSWORD
const port = process.env.PORT

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(multer().any())

mongoose.connect(`mongodb+srv://BiswajitSwain:${password}@cluster0.xf1eq.mongodb.net/pinterest`,{usenewUrlParser : true})
.then(()=>console.log("MongoDB is connected"))
.catch((err)=>console.log(err.message))

app.use("/",route)

app.listen(port,() => {
    console.log("Server is running on port "+ port + '...')
})

