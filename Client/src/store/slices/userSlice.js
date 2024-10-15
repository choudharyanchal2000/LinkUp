import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";



const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: null,
        message: null,
    },
    reducers: {
        registerRequest(state, action) {
            state.loading = true,
                state.isAuthenticated = false,
                state.error = null,
                state.message = null,
                state.user = {}

        },
        registerSuccess(state, action) {
            state.loading = false,
                state.isAuthenticated = true,
                state.error = null,
                state.message = action.payload.message,
                state.user = action.payload.user

        },
        registerFailed(state, action) {
            state.loading = false,
                state.isAuthenticated = false,
                state.error = action.payload,
                state.message = null,
                state.user = {}

        },
        loginRequest(state, action) {
          state.loading = true;
          state.isAuthenticated = false;
          state.user = {};
          state.error = null;
          state.message = null;
        },
        loginSuccess(state, action) {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
          state.error = null;
          state.message = action.payload;
        },
        loginFailed(state, action) {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = {};
          state.error = action.payload;
          state.message = null;
        },
        fetchUserRequest(state, action) {
          state.loading = true;
          state.isAuthenticated = false;
          state.user = {};
          state.error = null;
        },
        fetchUserSuccess(state, action) {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
          state.error = null;
        },
        fetchUserFailed(state, action) {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = {};
          state.error = action.payload;
        },

        logoutSuccess(state, action) {
          state.isAuthenticated = false;
          state.user = {};
          state.error = null;
        },
        logoutFailed(state, action) {
          state.isAuthenticated = state.isAuthenticated;
          state.user = state.user;
          state.error = action.payload;
        },
        clearAllErrors(state,action){
            state.error=null;
            state.user=state.user
        },

    }
})

export const register = (data) => async (dispatch) => {
    dispatch(userSlice.actions.registerRequest());
    try {
      const response = await fetch("/api/v1/user/register", {
        method: "POST",
        credentials: "include", // Equivalent to `withCredentials: true`
        body: data, // `data` should be a FormData object
      });
    
      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }
    
      const result = await response.json(); // Assuming the response is JSON
      dispatch(userSlice.actions.registerSuccess(result));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      console.error(error.message);
      dispatch(userSlice.actions.registerFailed(error.message));
    }
    
  };

export const login=(data)=>async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await fetch("/api/v1/user/login", {
      method: "POST",
      credentials: "include", // Equivalent to `withCredentials: true`
      body: data, // `data` should be a FormData object
    });
  
    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong!");
    }
  
    const result = await response.json(); // Assuming the response is JSON
    dispatch(userSlice.actions.loginSuccess(result.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    //console.error(error.message);
      dispatch(userSlice.actions.loginFailed(error.message));
  }
}



export const getUser=()=>async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await fetch("/api/v1/user/getuser", {
      method: "GET",
      credentials: "include", // Equivalent to `withCredentials: true`
      
    });
  
    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong!");
    }

    const result = await response.json(); // Assuming the response is JSON
   
    dispatch(userSlice.actions.fetchUserSuccess(result.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    console.error(error.message);
      dispatch(userSlice.actions.fetchUserFailed(error.message));
  }
}

export const logout=()=>async (dispatch) => {

  try {
    const response = await fetch("/api/v1/user/logout", {
      method: "GET",
      credentials: "include", // Equivalent to `withCredentials: true`
      
    });
  
    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong!");
    }
  
     // Assuming the response is JSON
    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    console.error(error.message);
      dispatch(userSlice.actions.logoutFailed(error.message));
  }
}



export const clearAllUserErrors=()=>(dispatch)=>{
dispatch(userSlice.actions.clearAllErrors())
}
export default userSlice.reducer