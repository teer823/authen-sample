import { combineReducers } from "redux";
import session from "./session";
import data from "./data";

export default combineReducers({ session, data });
