import { createSlice } from "@reduxjs/toolkit";

const updateProfileSlice = createSlice({
    name: "updateProfile",
    initialState: {
        loading: false,
        error: null,
        isUpdated: false
    },
    reducers: {
    updateProfileRequest(state, action) {
        state.loading = true;
    },
    updateProfileSuccess(state, action) {
        state.error = null;
        state.loading = false;
        state.isUpdated = true;

    },
    updateProfilefailed(state, action) {
        state.error = action.payload;
        state.loading = false;
        state.isUpdated = false;
    },
    updatePasswordRequest(state, action) {
        state.loading = true;
    },
    updatePasswordSuccess(state, action) {
        state.error = null;
        state.loading = false;
        state.isUpdated = true;
    },
    updatePasswordfailed(state, action) {
        state.error = action.payload;
        state.loading = false;
        state.isUpdated = false;
    },
    profileResetAfterUpdate(state, action) {
        state.error = null;
        state.isUpdated = true;
        state.loading = false;
        state.isUpdated = false;
    },
}
})

export const updateProfile = (data) => async (dispatch) => {
    dispatch(updateProfileSlice.actions.updateProfileRequest())
    try {
        const response = await fetch("/api/v1/user/update/profile", {
            method: "PUT",
            credentials: "include", // Equivalent to `withCredentials: true`
            body: data, // `data` should be a FormData object
        });

        if (!response.ok) {
            // Handle HTTP errors
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong!");
        }

        const result = await response.json(); // Assuming the response is JSON
        dispatch(updateProfileSlice.actions.updateProfileSuccess(result.user));

    } catch (error) {
        console.error(error.message);
        dispatch(updateProfileSlice.actions.updateProfilefailed(error.message || "Failed to update profile"));
    }

}


export const updatePassword = (data) => async (dispatch) => {
    dispatch(updateProfileSlice.actions.updatePasswordRequest())
    try {
        const response = await fetch("/api/v1/user/update/password", {
            method: "PUT",
            credentials: "include", // Equivalent to `withCredentials: true`
            body: data, // `data` should be a FormData object
        });

        if (!response.ok) {
            // Handle HTTP errors
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong!");
        }

        const result = await response.json(); // Assuming the response is JSON
        dispatch(updateProfileSlice.actions.updatePasswordSuccess(result.user));

    } catch (error) {
        console.error(error.message);
        dispatch(updateProfileSlice.actions.updatePasswordfailed(error.message));
    }

}



export const clearAllUpdateProfileErrors = () => (dispatch) => {
    dispatch(updateProfileSlice.actions.profileResetAfterUpdate());
};

export default updateProfileSlice.reducer
