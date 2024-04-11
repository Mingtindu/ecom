const port = 4000;
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const path = require('path');
const cors = require('cors');
const { type } = require('os');

app.use(express.json());
app.use(cors());


//Database connection with mongodb atlas

 mongoose.connect("mongodb+srv://mingtindu:sherpa123@cluster0.tmhjkd7.mongodb.net/e-commerce")

//API creation 

app.get('/register',(req,res)=>{
    res.send("This is register  app is Running");

})
//Image storage engine
const storage =  multer.diskStorage({
    destination:'./uploa/image',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});

app.use('/images',express.static('upload/images'))
app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })

})

app.listen(port,(error)=>{
    if(!error){
        console.log(`Server is running on port ${port}`);
    }else{
        console.log(`Error: ${error}`);
    }

})
//schema for creating product:
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        require:true
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,

    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})