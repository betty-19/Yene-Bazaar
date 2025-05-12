import React, { useState,useRef } from "react";
import "../assets/Signup.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { baseUrl } from "../util/constants";


function Signup() {
  const [login, setLogin] = useState(false);
  const [signupValues, setSignupValues] = useState({
    fullName: "",
    username: "",
    password:"",
    confirmPassword:"",
  });
  const nav = useNavigate();
  const [loginValues,setLoginValues] = useState({
    username:"",
    password:"",
  });

  const handleSignUpClick = () => setLogin(false);
  const handleLoginClick = () => setLogin(true);
  const closeSignUp = () =>{
           nav('/')
  }

  const handleSignup = async () =>{ 
    const nameErrorMessage = document.getElementById("name-error");
    const usernameErrorMessage = document.getElementById("username-error");
    const passwordErrorMessage = document.getElementById("password-error");
    const usernameApi = await axios.get(`${baseUrl}/api/usernames`);
    const existingUsernames = usernameApi.data.map(user => user.username);
    if(signupValues.password !== signupValues.confirmPassword)
    {
      alert("Password do not match!");
      return;
    }
    else if (/[^a-zA-Z\s]/.test(signupValues.fullName)) {
     
      nameErrorMessage.innerText = "Name should only contain letters";
      passwordErrorMessage.innerText= " ";
      usernameErrorMessage.innerText=" ";
      return;
    }
    else if (signupValues.password.length < 8){
      passwordErrorMessage.innerText="Password must be atleast 8 characters long";
      nameErrorMessage.innerText=" ";
      usernameErrorMessage.innerText=" ";
      return;
    }
    else if (existingUsernames.includes(signupValues.username)){
      usernameErrorMessage.innerText="This username is already taken Please change it";
      nameErrorMessage.innerText=" ";
      passwordErrorMessage.innerText=" ";
      return;
    }
    
    console.log(signupValues)
    try{


      const response = await axios.post(`${baseUrl}/api/signup`, signupValues);
      alert(response.data.message);
      if(response.status === 201){
          setSignupValues ({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: ""
      })
      nameErrorMessage.innerText=" ";
      passwordErrorMessage.innerText= " ";
      usernameErrorMessage.innerText = " ";
      }
      else{
        alert("Faild to register")
      }
    
    } catch(error){
      console.error("Signup error:", error);
      alert("Signup failed");
    }
  };

  const handleLogin = async () =>{ 
    console.log(loginValues);
    try{
      
      const response = await axios.post(`${baseUrl}/api/login`, loginValues);
      const userRole = response.data.role;
      const username = response.data.username;
      const userId= response.data.user_id;


      if(response.status === 200){
        
        localStorage.setItem("userRole",userRole);
        localStorage.setItem("username", username);
        localStorage.setItem("userId",userId);
        nav('/sidebar');
     }
  
      alert(response.data.message);
      
    } catch(error){
      console.error("Login error:",error);
      alert("Login failed!");
    }
  };
 
  
  
  return (
    <div className="sl-wrapper">
      <div className="signup-login">   
        <div className="title">
        <h1 onClick={handleSignUpClick}>SignUp</h1>
        <p>/</p>
        <h1 onClick={handleLoginClick}>Login</h1>
      </div>
      {login ? (
        <div className="login-wrapper">
          <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              onChange={(e) =>
                setLoginValues({ ...loginValues, username: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="LoginPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="LoginPassword"
              placeholder="Enter Password"
              onChange={(e) =>
                setLoginValues({ ...loginValues, password: e.target.value })
              }
              required
            />
          </div>
          <div className="buttons">
            <button
              type="button"
            //   className="btn btn-outline-danger"
              onClick={closeSignUp}
            >
              Cancel
            </button>
            <button type="button" 
            // className="btn btn-outline-success"
             onClick={handleLogin}>
              Login
            </button>
          </div>
          </form></div>
      ) : (
        <div className="signup-wrapper">
        <form>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Enter Full Name"
              value={signupValues.fullName}
              onChange={(e) => setSignupValues({ ...signupValues, fullName: e.target.value })}
              required
            />
            <p id="name-error"></p>
          </div>
          <div className="mb-3">
            <label htmlFor="usernameSignup" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="usernameSignup"
              placeholder="Enter Username"
              value={signupValues.username}
              onChange={(e) => setSignupValues({ ...signupValues, username: e.target.value })}
              required
            />
            <p id="username-error"></p>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value = {signupValues.password}
              onChange={(e) => setSignupValues({ ...signupValues, password: e.target.value })}
              required
            />
            <p id="password-error"></p>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={signupValues.confirmPassword}
              onChange={(e) => setSignupValues({ ...signupValues, confirmPassword: e.target.value })}
              required
            />
          </div>
          <div className="buttons">
            <button
              type="button"
            
              onClick={closeSignUp}
            >
              Cancel
            </button>
            <button type="button" 
                  onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>
          </form>
          </div>
      )}</div>
   
    </div>
  );
}

export default Signup;
