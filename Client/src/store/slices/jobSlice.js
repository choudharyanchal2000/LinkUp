import { createSlice } from '@reduxjs/toolkit'


const jobSlice = createSlice({
    name: 'job',
    initialState: {
        name: "jobs",
        loading: false,
        error: null,
        message: null,
        jobs: [],
        myJobs: [],
        singleJob: {},
    },
    reducers: {
        getJobsRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        getJobsSuccess: (state, action) => {
            state.loading = false;
            state.jobs = action.payload;
            state.error = null;
        },
        getJobsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;

        },


        requestForSingleJob(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        successForSingleJob(state, action) {
            state.error = null;
            state.loading = false;
            state.singleJob = action.payload;

        },
        failureForSingleJob(state, action) {
            state.singleJob = state.singleJob;
            state.error = action.payload;
            state.loading = false
        },


        requestForPostJob(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        successForPostJob(state, action) {
            state.error = null;
            state.loading = false;
            state.message = action.payload;

        },
        failureForPostJob(state, action) {

            state.error = action.payload;
            state.loading = false;
            state.message = null;
        },

        requestForMyJobs(state, action) {
            state.loading = true;
            state.error = null;
            state.myJobs=[];
        },
        successForMyJobs(state, action) {
            state.error = null;
            state.loading = false;
            state.myJobs = action.payload;

        },
        failureForMyJobs(state, action) {
            state.myJobs = state.myJobs;
            state.error = action.payload;
            state.loading = false
        },

        clearAllError(state, action) {
            state.error = null;
            state.jobs = state.jobs
        },
        resetJobSlice(state, action) {
            state.loading = false;
            state.error = null;
            state.jobs = state.jobs;
            state.message = null;
            state.myJobs = state.myJobs;
            state.singleJob = {};

        },
        requestForDeleteJob(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null
        },
        successForDeleteJob(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        failureForDeleteJob(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null
        },

    }
})

export const fetchJobs = (city, niche, searchKeyword = '') => async (dispatch) => {
    try {
        dispatch(jobSlice.actions.getJobsRequest())
        let link = "http://localhost:4000/api/v1/job/getall?"
        let queryParams = [];
        if (searchKeyword) {
            queryParams.push(`searchKeyword=${searchKeyword}`);
        }
        if (city) {
            queryParams.push(`city=${city}`);
        }
        if (niche) {
            queryParams.push(`niche=${niche}`);
        }
        link += queryParams.join("&");
        const response = await fetch(link, {
            credentials: 'include'
        });
        // console.log(response);
        const data = await response.json()
        // console.log(data);
        dispatch(jobSlice.actions.getJobsSuccess(data.jobs))
        dispatch(jobSlice.actions.clearAllError())
    } catch (error) {
        dispatch(jobSlice.actions.getJobsFailure(error.message))
    }
}

export const fetchSingleJob = (jobId) => async (dispatch) => {
    dispatch(jobSlice.actions.requestForSingleJob())
    try {
        const response = await fetch(`http://localhost:4000/api/v1/job/get/${jobId}`, {
            method: "GET",
            credentials: "include", // Equivalent to `withCredentials: true`

        });
        if (!response.ok) {
            // Handle HTTP errors
             const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong!");
        }
        const result = await response.json(); // Assuming the response is JSON
        // console.log(result.job);
        dispatch(jobSlice.actions.successForSingleJob(result.job))

        dispatch(jobSlice.actions.clearAllError());
    } catch (error) {
        dispatch(jobSlice.actions.failureForSingleJob(error.message))

    }
}


export const getMyJobs = () => async (dispatch) => {
    dispatch(jobSlice.actions.requestForMyJobs())
    try {
        const response = await fetch(`http://localhost:4000/api/v1/job/getMyJobs`, {
            method: "GET",
            credentials: "include", // Equivalent to `withCredentials: true`

        });
        if (!response.ok) {
            // Handle HTTP errors
             const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong!");
        }
        const result = await response.json(); // Assuming the response is JSON
        // console.log(result.job);
        dispatch(jobSlice.actions.successForMyJobs(result.myJobs))

        dispatch(jobSlice.actions.clearAllError());
    } catch (error) {
        dispatch(jobSlice.actions.failureForMyJobs(error.message))

    }
}


export const postJob = (data) => async (dispatch) => {
    dispatch(jobSlice.actions.requestForPostJob())
    try {
        const response = await fetch(`http://localhost:4000/api/v1/job/post`, {
            method: "POST",
            credentials: "include", // Equivalent to `withCredentials: true`
            body: data,
        });
        if (!response.ok) {
            // Handle HTTP errors
             const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong!");
        }
        const result = await response.json(); // Assuming the response is JSON
        // console.log(result.job);
        dispatch(jobSlice.actions.successForPostJob(result.message))

        dispatch(jobSlice.actions.clearAllError());
    } catch (error) {
        dispatch(jobSlice.actions.failureForPostJob(error.message))

    }
}


export const deleteJob = (jobId) => async (dispatch) => {
    dispatch(jobSlice.actions.requestForDeleteJob())
    try {
        const response = await fetch(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
            method: "DELETE",
            credentials: "include", // Equivalent to `withCredentials: true`
          
        });
        if (!response.ok) {
            // Handle HTTP errors
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong!");
        }
        const result = await response.json(); // Assuming the response is JSON
        dispatch(jobSlice.actions.successForDeleteJob(result.message))
        dispatch(jobSlice.actions.clearAllError());
    } catch (error) {
        dispatch(jobSlice.actions.failureForDeleteJob(error.message))
    }

}

export const clearAllJobErrors = () => async (dispatch) => {
    dispatch(jobSlice.actions.clearAllError())
}

export const resetJobSlice = () => (dispatch) => {
    dispatch(jobSlice.actions.resetJobSlice)
}

export default jobSlice.reducer