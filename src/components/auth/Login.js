import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../features/user/userSlice";


const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function Login() {
  const dispatch = useDispatch()
  const error = useSelector(state => state.user.loginUser.error)
  const isLoading = useSelector(state => state.user.loginUser.loading)
  const {
    register,
    handleSubmit
    } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => handleUserLogin(data);

  function handleUserLogin(userData){  
    dispatch(signInUser(userData))
  }

  return (
    <div className="auth-container">
      <div id="overlay"></div>
        <div className="main-login">
        <h1 className="signIn">Sign In</h1>
          <form className="user" onSubmit={handleSubmit(onSubmit)}>
            
          {!isLoading && error ? <p className='error-message'>Invalid username or password</p> : null}
            <div className="userInput">
              <label className="Label">Username</label>
              <input
                id="username"
                {...register("username")}
                className="form-control my-2"
                type="text"
                placeholder="eg. john_doe"
              />
            </div>
            <div className="passwordInput mb-4">
              <div className="Input">
                <label className="Label">Password</label>
                <input
                  id="password"
                  {...register("password")}
                  className="form-control my-2"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <button className="btn" type="submit">
              {
                isLoading ? 
                <div className="d-flex flex-row align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: "auto", background: "none", display: "block", shapeRendering: "auto", animationPlayState: "running", animationDelay: "0s"}} width="25px" height="25px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#3b88fc" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" style={{animationPlayState: "running", animationDelay: "0s"}}>
                  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" style={{animationPlayState: "running", animationDelay: "0s"}}></animateTransform>
                </circle>
                </svg> 
                <span style={{textTransform: "capitalize"}}> Signing in...</span>
                </div>
                :
                <>
                  Sign In{" "}
                  <span className="svg">
                <svg
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </span>
                </>
              }
            </button>
            <div className="linkDetails">
              <div className="loginContainer">
              </div>
              <div className="recover">
                <p className="mt-4">
                Don't have a Nairobnb account? <Link className="create" to="/register"> Register here!</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
    </div>

 
  );
}