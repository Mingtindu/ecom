const port = 4000;
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());


//Database connection with mongodb atlas

mongoose.connect("mongodb+srv://mingtindu:sherpa123@cluster0.tmhjkd7.mongodb.net/e-commerce")

//API creation 

app.get('/register',(req,res)=>{
    res.send("This is register  app is Running");

})

app.listen(port,(error)=>{
    if(!error){
        console.log(`Server is running on port ${port}`);
    }else{
        console.log(`Error: ${error}`);
    }

})