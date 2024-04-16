import React, { useState } from "react";
import './CSS/LoginSignup.css'
const LoginSignup = ()=>{
    const [state,changeState]=useState("Login");
    const [formData,setFormData] = useState({
        username:"",
        email:"",
        password:"",
    });
    const changeHandler= (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})

    }

    const login = async ()=>{
         console.log("login executed",formData);
         let responseData;
          await fetch('http://localhost:4000/login',{
            method:"POST",
            headers:{
                Accept:'application/formData',
                'Content-Type':'application/json'
            },
            body:json.stringify(formData)
         }).then((response)=>response.json()).then((data)=>responseData=data);
         if(responseData.success){
            localStorage.setItem('auth-token',responseData.token)
            window.location.replace('/');
         }else{
            alert(responseData.error);
         }

    }
    const signUp = async ()=>{
        console.log("signup executed",formData);
        let responseData;
        await fetch('http://localhost:4000/signup',{
          method:"POST",
          headers:{
              Accept:'application/formData',
              'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
       }).then((response)=>response.json()).then((data)=>responseData=data);
       if(responseData.success){
          localStorage.setItem('auth-token',responseData.token)
          window.location.replace('/');
       }else{
          alert(responseData.errors);
       }
        
    }
    return(
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                   {state==="Sign Up"?<input type="text" name="username" value={formData.username} onChange={changeHandler} id="" placeholder="Your Name"/>:<></>} 
                    <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder="Your Email" />
                    <input type="password"  name="password" value={formData.password} onChange={changeHandler} id="" placeholder="Your Password" />
                </div>
                <button onClick={()=>{state==="Login"?login():signUp()}}>Continue</button>
                {state==="Sign Up"?<p className="loginsignup-login">
                    Already have an account?<span onClick={()=>{changeState("Login")}}>Login here</span>
                   
                </p>:<p className="loginsignup-login">
                    Create an account?<span onClick={()=>{changeState("Sign Up")}}>Click here</span>
                   
                </p>}
                
                
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing ,I agree to the terms and condition of your company </p>
                </div>

            </div>
        </div>
    )
}

export default LoginSignup;