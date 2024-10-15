import { createSlice } from "@reduxjs/toolkit";


const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        applications: [],
        loading: false,
        error: null,
        message: null,

    },
    reducers: {
        requestForAllApplications(state, action) {
            state.loading = true;
            state.error = null;
        },
        successForAllApplications(state, action) {
            state.loading = false;
            state.error = null;
            state.applications = action.payload;
        },
        failureForAllApplications(state, action) {
            state.loading = false;
            state.error = action.payload;
        },


        requestForMyApplications(state, action) {
            state.loading = true;
            state.error = null;
        },
        successForMyApplications(state, action) {
            state.loading = false;
            state.error = null;
            state.applications = action.payload;
        },
        failureForMyApplications(state, action) {
            state.loading = false;
            state.error = action.payload;
        },


        requestForPostApplications(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null
        },
        successForPostApplications(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        failureForPostApplications(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null
        },

        requestForDeleteApplications(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null
        },
        successForDeleteApplications(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        failureForDeleteApplications(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null
        },


        clearAllErrors(state, action) {
            state.error = null;
            state.applications = state.applications

        },
        resetApplicationSlice(state, action) {
            state.loading = false;
            state.error = null;
            state.message = null;
            state.applications = state.applications

        }
    }
})

export const fetchJobEmployerApplications = () => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForAllApplications())
    try {
        const response = await fetch(`/api/v1/application/employer/getall`, {
            method: "GET",
            credentials: "include", // Equivalent to `withCredentials: true`

        });
        if (!response.ok) {
            // Handle HTTP errors
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong!");
        }
        const result = await response.json(); // Assuming the response is JSON
        dispatch(applicationSlice.actions.successForAllApplications(result.applications))
        dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(applicationSlice.actions.failureForAllApplications(error.message))
    }
}
export const fetchJobSeekerApplications = () => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForMyApplications())
    try {
        const response = await fetch(`/api/v1/application/jobseeker/getall`, {
            method: "GET",
            credentials: "include", // Equivalent to `withCredentials: true`

        });
        if (!response.ok) {
            // Handle HTTP errors
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong!");
        }
        const result = await response.json(); // Assuming the response is JSON
        
        dispatch(applicationSlice.actions.successForMyApplications(result.applications))
      
        dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(applicationSlice.actions.failureForMyApplications(error.message))
    }
}

export const postApplication = (data, jobId) => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForPostApplications())
    try {
        const response = await fetch(`/api/v1/application/post/${jobId}`, {
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
        dispatch(applicationSlice.actions.successForPostApplications(result.message))
        dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(applicationSlice.actions.failureForPostApplications(error.message))
    }

}

export const deleteApplication = (jobId) => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForDeleteApplications())
    try {
        const response = await fetch(`/api/v1/application/delete/${jobId}`, {
            method: "DELETE",
            credentials: "include", // Equivalent to `withCredentials: true`
          
        });
        if (!response.ok) {
            // Handle HTTP errors
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong!");
        }
        const result = await response.json(); // Assuming the response is JSON
        dispatch(applicationSlice.actions.successForDeleteApplications(result.message))
        dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(applicationSlice.actions.failureForDeleteApplications(error.message))
    }

}


export const clearAllApplicationErrors = () => (dispatch) => {
    dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => (dispatch) => {
    dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;