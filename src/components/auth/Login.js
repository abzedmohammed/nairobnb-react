import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import signupLogo from "../../assets/auth.jpg"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';


const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function Login({getUserData}) {
  const [serverErrors, setserverErrors] = useState(false);
  const [hasLoggedIn, sethasLoggedIn] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => handleUserLogin(data);

  function handleUserLogin(userData){     
    fetch("https://nairobnb-api.onrender.com/login", {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
          sethasLoggedIn(false)
          setserverErrors(true)
          toast.error(`${data.error}`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
          });
        }
        else{
          getUserData(data)
          setserverErrors(false)
          toast.success(`Welcome back ${data.username}`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
          });
          sessionStorage.setItem("user_id", JSON.stringify(data.id))
          sethasLoggedIn(true)
        }
      })    
    }
  if (hasLoggedIn) {
    return <Navigate to="/home" />
  }  

  return (
    <div className="auth-container">
        <ToastContainer />
        <div className="main-login">
          <form className="user" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="signIn">Sign In</h1>
            {serverErrors ? <p className='error-message'>Invalid username or password</p> : false}
            <div className="userInput">
              <label className="Label">Username</label>
              <input
                id="username"
                {...register("username")}
                className="form-control my-2"
                type="text"
                placeholder="eg. john_doe"
              />
              <p className="error-message">
                {errors.username?.message}
              </p>
            </div>
            <div className="passwordInput">
              <div className="Input">
                <label className="Label">Password</label>
                <input
                  id="password"
                  {...register("password")}
                  className="form-control my-2"
                  type="password"
                  placeholder="Password"
                />
                <p className="error-message">
                  {errors.password?.message}
                </p>
              </div>
            </div>
            <button className="btn" type="submit">
              Sign In{" "}
              <span className="svg">
                <svg
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </span>
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