// 로그인 모달 생성

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// 초기상태
const initialState : {authMode: "signup" |"login"} ={
    authMode : "signup",
}

const auth = createSlice({
    name:"auth",
    initialState,
    reducers: {
        // 인증 팝업 변경하기
        setAuthMode(state, action: PayloadAction<"signup"|"login">){
            state.authMode = action.payload;
        }
    }
});

export const authAction = {...auth.actions};
export default auth;