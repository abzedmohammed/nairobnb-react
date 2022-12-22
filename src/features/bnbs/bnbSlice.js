import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    bnbs: [],
    singleBnb: {},
    error: ''

}

export const fetchBnbs = createAsyncThunk('bnbs/fetchBnbs', () => {
    return axios.get("https://nairobnb-api.onrender.com/bnb_rooms")
    .then(res => res.data)
})

export const fetchBnbById = createAsyncThunk('bnbs/fetchBnbById', id => {
    return axios.get(`https://nairobnb-api.onrender.com/bnb_rooms/${id}`)
    .then(res => res.data)
})

const bnbSlice = createSlice({
  name: 'bnbs',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchBnbs.pending, state => {
        state.loading = true
    })

    builder.addCase(fetchBnbs.fulfilled, (state, action) => {
        state.loading = false
        state.bnbs = action.payload
        state.error = ''
    })

    builder.addCase(fetchBnbs.rejected, (state, action) => {
        state.loading = false
        state.bnbs = []
        state.error = action.error.message
    })

    builder.addCase(fetchBnbById.fulfilled, (state, action) => {
        state.singleBnb = action.payload
    })
  }
})

export default bnbSlice.reducer