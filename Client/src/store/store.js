import { configureStore } from "@reduxjs/toolkit"
import jobReducer from './slices/jobSlice'
import userReducer from "./slices/userSlice";
import applicationReducer from "./slices/applicationSlice";
import updateReducer from "./slices/updateProfileSlice";
const store=configureStore({
    reducer:{
        jobs:jobReducer,
        user:userReducer,
        applications:applicationReducer,
        updateProfile:updateReducer
    }
})
export default store;