import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    isLoggedIn: false,
    getUser: {
        loading: false,
        error: ""
    },
    loginUser: {
        loading: false,
        error: ""
    },
    registerUser: {
        loading: false,
        error: "",
        registerSuccess: false,
    }    
}

export const fetchLoggedInUser = createAsyncThunk("user/fetchUser", (user_id) => {
    return axios.get(`http://35.196.117.225:3000/bnb_users/${user_id}`)
    .then(res => res.data)
})

export const signInUser = createAsyncThunk('user/signInUser', (userData) => {
    return axios.post('http://35.196.117.225:3000/login', userData)
    .then((response) => response.data)
})

export const registerUser = createAsyncThunk('user/registerUser', (userData) => {
    return axios.post('http://35.196.117.225:3000/bnb_users', userData)
    .then((response) => response.data)
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: state => {
            state.user = {}
            state.isLoggedIn = false
            sessionStorage.clear()
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchLoggedInUser.pending, state => {
            state.getUser.loading = true
        })

        builder.addCase(fetchLoggedInUser.fulfilled, (state, action) => {
            state.getUser.loading = false
            state.isLoggedIn = true
            state.getUser.error = ""
            state.user = action.payload
        })

        builder.addCase(fetchLoggedInUser.rejected, (state, action) => {
            state.getUser.loading = false
            state.isLoggedIn = false
            state.getUser.error = action.error.message
            state.user = {}
        })

        builder.addCase(signInUser.pending, state => {
            state.loginUser.loading = true
        })

        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.loginUser.loading = false
            state.isLoggedIn = true
            state.loginUser.error = ""
            state.user = action.payload
            state.registerUser.registerSuccess = false
            sessionStorage.setItem("user_id", JSON.stringify(action.payload.id))
        })

        builder.addCase(signInUser.rejected, (state, action) => {
            state.loginUser.loading = false
            state.isLoggedIn = false
            state.loginUser.error = action.error.message
            state.user = {}
        })

        builder.addCase(registerUser.pending, state => {
            state.registerUser.loading = true
        })

        builder.addCase(registerUser.fulfilled, (state) => {
            state.registerUser.loading = false
            state.registerUser.registerSuccess = true
            state.registerUser.error = ""            
        })

        builder.addCase(registerUser.rejected, (state, action) => {
            state.registerUser.loading = false
            state.registerUser.registerSuccess = false
            state.registerUser.error = action.error.message
        })


        
    }
})

export default userSlice.reducer
export const { logout } = userSlice.actions