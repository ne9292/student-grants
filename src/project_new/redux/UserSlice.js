// const { useReducer } = require("react")
// const { createSlice } = require("@reduxjs/toolkit");
import {createSlice} from '@reduxjs/toolkit'

const initialState={
    // מערך של משתמשים
    // UsersList:
    // [
    //     {tz:"216370734",firstName:"נחמי",lastName:"הלפר",password:"1234"},
    //     {tz:"21637734",firstName:"Yosi",lastName:"Levi",password:" "},
    //     {tz:"216734",firstName:"Yosi",lastName:"Levi",password:"12564634"},
    //     {tz:"21637734",firstName:"Yosi",lastName:"Levi",password:"174531234"}
    // ]
    //,
    //המשתמש האחרון שנכנס למערכת
    current :{}

}
const UsersSlice=createSlice({
    name:'Users',
    initialState,
    reducers:{
        //הוספת משתמש למערך
        // add:(state,action)=>{
        //     //לא צריכה כי בודקת בכניסה
        //     // const exists = state.UsersList.some(user => user.tz === action.payload.tz);
        //     // if(!exists)
        //     state.UsersList.push(action.payload)
        // },
        //הצבת המשתמש שנכנס לתוך הכורנט
        setCurrent:(state,action)=>{
            state.current=action.payload
        },
        //כשהמשתמש יוצא מההרשמה
        // מנקה את המשתמש הנוכחי
        logout: (state) => {
            state.current = {}; 
        },
    }
})
//יצוא הפעולות 
export const {setCurrent,logout}=UsersSlice.actions
//יצוא הסלייס
export default UsersSlice.reducer