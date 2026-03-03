import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        isLoading: true
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUserData, setLoading } = userSlice.actions

export default userSlice.reducer