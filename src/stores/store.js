import {configureStore} from '@reduxjs/toolkit';
import crumbReducer from "./crumb";

const store = configureStore({
    reducer: {crumbs: crumbReducer}
});

export default store;
