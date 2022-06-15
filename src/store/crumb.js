import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    crumbs: [{name: 'home', link: '/'}]
};

const crumbSlice = createSlice({
    name: 'crumbs',
    initialState: initialState,
    reducers: {
        addCrumb(state, action) {
            state.crumbs = [...state.crumbs, action.payload]
        },
    }
});

export const crumbActions = crumbSlice.actions;
export default crumbSlice.reducer;