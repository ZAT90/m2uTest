import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = { loading: false, hasErrors: false, profiles: [] }

const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        getProfiles: state => {
            state.loading = true
        },
        getProfilesSuccess: (state, { payload }) => {
            state.profiles = payload
            state.loading = false
            state.hasErrors = false
        },
        getProfilesFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
        addNewProfile: (state, { payload }) => {
            state.profiles.push(payload);
        }
    }
})

// 3 actions generated
export const { getProfiles, getProfilesSuccess, getProfilesFailure, addNewProfile } = profilesSlice.actions

// selector
export const profilesSelector = state => state.profiles

// the reducer
export default profilesSlice.reducer

// call this function to load the profile list
export function fetchProfiles() {
    return async dispatch => {
        dispatch(getProfiles())
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            //console.log('api response: ', response.data);
            dispatch(getProfilesSuccess(response.data))


        } catch (error) {
            dispatch(getProfilesFailure())

        }

    }
}