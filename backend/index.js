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

try{
 mongoose.connect("mongodb+srv://mingtindu:sherpa123@cluster0.tmhjkd7.mongodb.net/e-commerce")
 console.log("successfully connected mongodb");
}catch(er){
    console.log(err);
}
//API creation 
app.get('/register',(req,res)=>{
    res.send("This is register  app is Running");
})
//Image storage engine
const storage =  multer.diskStorage({
    destination:'./upload/image',
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

//creating api for deleting product
app.post('/remove',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log(`this is id ${req.body.id}`);
    console.log("Removed");

    res.json({
        success:true,
        name:req.body.name
    })

})
//creating API for getting all product:
app.get('/allProducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("all product fethc");

    res.send(products);

})
//addProduct API 
app.use('/addProduct',async (req,res)=>{
    //code for not generating id in database:
    let products = await Product.find({})
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);//get the last product of the products array using slice method
        let last_product = last_product_array[0];//retrieve 0th index value of last product:
        id= last_product.id+1;
    }else{
        id=1;
    }
    //retrieve data from frontend through body using response
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    });
    console.log(product);
    await product.save();//product save to db
    console.log("saved");
    res.json({//send json response after success
        success:true,
        name:req.body.name,
    })

})