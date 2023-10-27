
const express=require ('express')
const app=express()
const cors= require('cors')
const path=require('path')
const mongoose=require ('mongoose')
require('dotenv').config();
const fs = require('fs');
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const User= require('./models/users')
const route=require('./routes/routes')


mongoose.connect(process.env.MONGO_URL).then(()=>console.log('mongoDb connected')).catch((e)=>console.log(e.message))





app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use(cookieParser());

app.use(
  "/images",
  express.static(path.join(__dirname, "../back/public/images"))
);

app.use('/',route)




const PORT=8008

app.listen(PORT,()=>{
    console.log(`Server connected at http://localhost:${PORT}`)
})