import { combineReducers } from "redux";
import { countriesReducer } from "./countries";

export const rootReducer = combineReducers({
    countries:countriesReducer
})