import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, signInUser } from '../../features/user/userSlice';

const schema = yup.object({
    full_name: yup.string().min(4, "Full names be atleast 4 characters long").required(),
    username: yup.string().min(4, "Username be atleast 4 characters long").required(),
    email: yup.string().email().required(),
    avatar: yup.string().required(),
    account_type: yup.string().required().oneOf(["Host", "Guest"], "Select account type").required("Select account type"),
    password: yup.string().min(5, 'Password must contain 5 or more characters').required(),
    password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required()
  }).required();

export default function Register({getUserData}){
    const dispatch = useDispatch()
    const error = useSelector(state => state.user.registerUser.error)
    const isLoading = useSelector(state => state.user.registerUser.loading)
    const registerSuccess = useSelector(state => state.user.registerUser.registerSuccess)

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
    const onSubmit = (data) => handleUserRegistration(data);

    async function handleUserRegistration(userData){
        delete userData.password_confirmation 
        await dispatch(registerUser(userData))
        dispatch(signInUser({
            username: userData.username,
            password: userData.password
        }))        
    }

    return(
        <>
        <div className="register-bg">
            <div className="register-container">
            
                <div className="main-register">
                <div className="register-info">
                <h3 className="register-heading text-left mt-3">Create Account</h3>
                <p className='text-muted'>Welcome to NairoBNB. Get started
                today by providing your details.</p>
                </div>
                    
                        
                        {!isLoading && error ? <p className='error-message'>Error: Username or email already in use. Please try a different one</p> : null}
                        {!isLoading && !error && registerSuccess ? 
                        <div className="d-flex flex-column-reverse align-items-center justify-content-center mt-5">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: "auto", background: "none", display: "block", shapeRendering: "auto", animationPlayState: "running", animationDelay: "0s"}} width="55px" height="55px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" fill="none" stroke="#5cb85c" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" style={{animationPlayState: "running", animationDelay: "0s"}}>
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" style={{animationPlayState: "running", animationDelay: "0s"}}></animateTransform>
                            </circle>
                            </svg> 
                            <p className='success-message'>Your account has been successfully created. Please wait while we sign you in...</p>
                        </div>
                         : null}
                         {
                            registerSuccess ?
                            null
                            :
                         <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="">
                            <div className="input-group">
                                <div className="mb-2">
                                    <label htmlFor="full_name">Full Name</label>
                                    <input id='full_name' {...register("full_name")} className="form-control " 
                                    type="text" placeholder="eg. john" />
                                    {errors.full_name ? <p className='error-message'>{errors.full_name?.message}</p> : false}
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="email" className='input-left'>Email</label>
                                    <input id='email' {...register("email")} className="form-control  input-left" 
                                    type="email" placeholder="eg. john.doe@mail.com" />
                                    {errors.email ? <p className='error-message input-left'>{errors.email?.message}</p> : false}
                                </div>

                            </div>

                            <div className="input-group">
                                <div className="mb-2">
                                    <label htmlFor="username">Username</label>
                                    <input id='username' {...register("username")} className="form-control " 
                                    type="text" placeholder="eg. john_doe" />
                                    {errors.username ? <p className='error-message'>{errors.username?.message}</p> : false}
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="avatar" className='input-left'>Profile Image URL</label>
                                    <input id='avatar' {...register("avatar")} className="form-control  input-left" 
                                    type="url" placeholder="eg. john.doe@mail.com" />
                                    {errors.avatar ? <p className='error-message input-left'>{errors.avatar?.message}</p> : false}
                                </div>
                                
                                
                            </div>

                            <div className="input-group">
                                <div className='h-100 mb-3'>
                                    <label htmlFor="password">Password</label>
                                    <input id='password' {...register("password")} className="form-control " 
                                    type="password" placeholder="Password" />
                                    {errors.password ? <p className='error-message'>{errors.password?.message}</p> : false}
                                </div>

                                <div className='h-100 mb-3'>
                                    <label htmlFor="password_confirmation" className='input-left'>Confirm Password</label>
                                    <input id='password_confirmation' {...register("password_confirmation")} className="form-control  input-left" 
                                    type="password" placeholder="Confirm your password" />
                                    {errors.password_confirmation ? <p className='error-message input-left'>{errors.password_confirmation?.message}</p> : false}
                                </div>
                            </div>

                            <div className="input-group">
                                <div>
                                    <select className="form-control" {...register("account_type")}>
                                        <option disabled selected value={null}>Account type</option>
                                        <option value="Guest">Guest</option>
                                        <option value="Host">Host</option>
                                    </select>
                                    {errors.account_type ? <p className='error-message'>{errors.account_type?.message}</p> : false}
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
                                    <span style={{textTransform: "capitalize"}}> Creating account...</span>
                                    </div>
                                    :
                                    <>
                                    Register{" "}
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
                                </div>

                            <p className="mt-2">Already have an account? <Link className='login-here' to="/login">Login here</Link></p>
                        </div>
                    </form>
}
                </div>
            </div>
        </div>
    </>
)
}