import { configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper, MakeStore } from "next-redux-wrapper";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { combineReducers } from "redux";
import auth from "./auth";
import common from "./common";
import user from "./user";


const rootRedux = combineReducers({
    user: user.reducer,
    common: common.reducer,
    auth: auth.reducer,
})


// 스토어 타입
export type RootState = ReturnType<typeof rootRedux>;


let initialRootState: RootState;

const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
      if (state === initialRootState) {
        return {
          ...state,
          ...action.payload,
        };
      }
      return state;
    }
    return rootRedux(state, action);
  };


// 타입 지원되는 커스텀 useSelector 만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore<any> = () => {
    const store = configureStore({
        reducer,
        devTools: true,
    });
    initialRootState = store.getState();
    return store;
};

export const wrapper = createWrapper(initStore);
