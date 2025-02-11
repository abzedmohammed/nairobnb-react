import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    bnbs: [],
    singleBnb: {},
    error: ''

}

export const fetchBnbs = createAsyncThunk('bnbs/fetchBnbs', () => {
    return axios.get("http://35.196.117.225:3000/bnb_rooms")
    .then(res => res.data)
})

export const addBnb = createAsyncThunk('bnbs/addBnb', (data) => {
    return axios.post("http://35.196.117.225:3000/bnb_rooms", data)
    .then(res => res.data)
})

export const fetchBnbById = createAsyncThunk('bnbs/fetchBnbById', id => {
    return axios.get(`http://35.196.117.225:3000/bnb_rooms/${id}`)
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

    builder.addCase(addBnb.pending, (state) => {
        state.loading = true
    })

    builder.addCase(addBnb.fulfilled, (state, action) => {
        state.loading = false
        state.bnbs.push(action.payload)
        state.error = ''
    })

    builder.addCase(addBnb.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })


  }
})

export default bnbSlice.reducer