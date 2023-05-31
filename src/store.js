// import {combineReducers, createStore} from "redux";
//
// const rootReducer = combineReducers({
// });
//
// const store = createStore(rootReducer);
//
// export default store;

// if we want to use @reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        // add reducers here
    },
});

export default store
