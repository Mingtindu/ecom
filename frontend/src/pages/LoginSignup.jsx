import React from "react";
import './CSS/LoginSignup.css'
const LoginSignup = ()=>{
    return(
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    <input type="text" name="" id="" placeholder="Your Name"/>
                    <input type="email" placeholder="Your Email" />
                    <input type="password" name="" id="" placeholder="Your Password" />
                </div>
                <button>Continue</button>
                <p className="loginsignup-login">
                    Already have an account?<span>Login here</span>
                </p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing ,I agree to the terms and condition of your company </p>
                </div>

            </div>
        </div>
    )
}

export default LoginSignup;