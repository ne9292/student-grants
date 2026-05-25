import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    current: {}
}

const UsersSlice = createSlice({
    name: 'Users',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            state.current = action.payload
        },
        logout: (state) => {
            state.current = {}
        },
    }
})

export const { setCurrent, logout } = UsersSlice.actions
export default UsersSlice.reducer
