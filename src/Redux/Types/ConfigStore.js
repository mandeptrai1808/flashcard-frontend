import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { TestReducer } from "../Reducers/TestReducer";
import { DrawerReducer } from "../Reducers/DrawerReducer";
import { MenuItemReducer } from "../Reducers/MenuItemReducer";
import { SubMenuReducer } from "../Reducers/SubMenuReducer";
import { LoginReducer } from "../Reducers/LoginReducer";
import { ModalReducer } from "../Reducers/ModalReducer";
import { DesksReducer } from "../Reducers/DesksReducer";
const rootReducer = combineReducers({
    TestReducer,
    DrawerReducer,
    MenuItemReducer,
    SubMenuReducer,
    LoginReducer,
    ModalReducer,
    DesksReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));