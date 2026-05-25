import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import requestReducer from "./RequestSlice";

const Store=configureStore({
    reducer:{
        Users:userReducer,
        Request:requestReducer

    }
})
export default Store