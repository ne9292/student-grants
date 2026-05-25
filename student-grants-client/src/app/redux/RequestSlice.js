import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    current: {
        personal: {
            tz: "", firstName: "", lastName: "", dateOfBirth: "", adress: "", phone: ""
        },
        family: {
            parentsNames: "", amountOfChildren: "", amountOfChildrenOver19: ""
        },
        study: {
            trend: "", tuition: "", years: ""
        },
        bank: {
            accountOwner: "", accountTz: "", bankName: "", branch: "", accountNumber: ""
        }
    }
}

const RequestSlice = createSlice({
    name: 'Request',
    initialState,
    reducers: {
        save: (state, action) => {
            const { group, name, value } = action.payload;
            state.current[group][name] = value;
        },
        loadDraft: (state, action) => {
            state.current = action.payload
        },
        setErrors: (state, action) => {
            state.current.errors = action.payload;
        },
    }
})

export const { save, loadDraft } = RequestSlice.actions
export default RequestSlice.reducer
