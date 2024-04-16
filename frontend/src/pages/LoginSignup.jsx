import React, { useState } from "react";
import './CSS/LoginSignup.css'
const LoginSignup = ()=>{
    const [state,changeState]=useState("Login");

    const login = async ()=>{
        // console.log("login executed");
    }
    const signUp = async ()=>{
        console.log("signup executed");
        
    }
    return(
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                   {state==="Sign Up"?<input type="text" name="" id="" placeholder="Your Name"/>:<></>} 
                    <input type="email" placeholder="Your Email" />
                    <input type="password" name="" id="" placeholder="Your Password" />
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