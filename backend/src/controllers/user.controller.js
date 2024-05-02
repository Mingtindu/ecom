import User from "../models/user.model";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const login = async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
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
    

}

const register =async(req,res)=>{
    let check = await User.findOne({email:req.body.email});
    if(check){
        res.status(400).json({success:false,errors:"existing user found with same email "});
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user = new User({
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
}

export {register,login}

