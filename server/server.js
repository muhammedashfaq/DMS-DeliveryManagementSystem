const express =require('express')
const app=express()
const cors = require("cors");
const mongodb = require('./config/auth')
 mongodb.mongoDB()
require('dotenv').config()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const adminroute=require('./routes/adminRoutes')
app.use('/admin',adminroute)
const driverroute=require('./routes/driverRoutes')
app.use('/driver',driverroute)
const userroute=require('./routes/userRoutes')
app.use('/',userroute)





const port = process.env.PORT || 5000

app.listen(port,()=>{console.log(`serve listening port no ${port}`)}) 