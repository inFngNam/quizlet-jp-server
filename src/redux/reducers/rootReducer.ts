import {combineReducers} from "redux";
import demoReducer from "./demoReducer";
import userReducer from "./userReducer";
import moduleReducer from "./moduleReducer";
import folderReducer from "./folderReducer";
import classReducer from "./classReducer";
import joinClassReducer from './joinClassReducer';
import termReducer from "./termReducer";
import membersReducer from "./membersReducer";
import testReducer from "./testReducer";

const rootReducer = combineReducers({
    demo: demoReducer,
    user: userReducer,
    module: moduleReducer,
    folders: folderReducer,
    classes: classReducer,
    joined: joinClassReducer,
    terms: termReducer,
    members: membersReducer,
    test: testReducer,
})
export default rootReducer;
