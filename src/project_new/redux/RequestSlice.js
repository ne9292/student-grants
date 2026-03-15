import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    //הבקשה הנוכחית שעליה נעבוד
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
        //פונקציה ששומרת את חלקי הטופס בקורנט
        save: (state, action) => {
            const { group, name, value } = action.payload;
            state.current[group][name] = value;
        },

        // טעינת טיוטה שלמה
        loadDraft: (state, action) => {
            // action.payload מכיל את הטיוטה שהתקבלה מהשרת
            state.current = action.payload
        },

        setErrors: (state, action) => {
            state.current.errors = action.payload;
        },

    }
})
//יצוא הפןמקציות
export const { save, loadDraft } = RequestSlice.actions
//יצוא הסלייס
export default RequestSlice.reducer