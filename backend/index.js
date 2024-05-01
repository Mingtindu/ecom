const port = 4000;
const express = require('express');
const bcrypt = require('bcryptjs');
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

app.use('/images',express.static('upload/image'))
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
//APi to fetch newCollection product::
app.get('/newCollection', async (req, res) => {
    try {
        // Execute the query to get all products
        let products = await Product.find({});
        
        // Apply slice to the array of products
        let newCollection =products.slice(1).slice(-1);
        
        console.log(`new collection fetched: ${newCollection}`);
        
        // Send the new collection as a response
        res.json(newCollection);
    } catch (error) {
        console.error(error);
        // Handle errors appropriately
        res.status(500).send('Internal Server Error');
    }
});

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

//Schema for creating User model:
const Users = mongoose.model('Users',{
    name:{
        type:String,
        
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//creating endpoint for registering user 
app.post('/signup',async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        res.status(400).json({success:false,errors:"existing user found with same email "});
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    bcrypt.hash('password',saltRounds,function(err, hash){
        console.log(password);
    })
    await user.save();//method to save data in database

    //jwt authentication

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');//here secret_ecom
    // is known as adding salt using this we can encrypt the data by one layer

    res.json({
        success:true,
        token
    })
})
//creting endpoint for user login::
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email})
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom')
            res.json({
                success:true,
                token
            })
        }else{
                res.json({
                    success:false,
                    errors:"Wrong Password"
                })

            }
        }else{
            res.json({
                success:false,
                errors:"Wrong Email ID"
            })
        }
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