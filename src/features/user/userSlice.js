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
        error: ""
    }    
}

export const fetchLoggedInUser = createAsyncThunk("user/fetchUser", (user_id) => {
    return axios.get(`https://nairobnb-api.onrender.com/bnb_users/${user_id}`)
    .then(res => res.data)
})

export const signInUser = createAsyncThunk('user/signInUser', (userData) => {
    return axios.post('https://nairobnb-api.onrender.com/login', userData)
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
            sessionStorage.setItem("user_id", JSON.stringify(action.payload.id))
        })

        builder.addCase(signInUser.rejected, (state, action) => {
            state.loginUser.loading = false
            state.isLoggedIn = false
            state.loginUser.error = action.error.message
            state.user = {}
        })


        
    }
})

export default userSlice.reducer
export const { logout } = userSlice.actions