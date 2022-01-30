// 사용자 인증에 관련된 api
import {UserType} from "../../types/user";

import axios from ".";
import { AxiosResponse } from "axios";

// 회원가입 body
interface SignUpAPIBody{
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    birthday: string;
}

// 회원가입 api
// 보안상 password 를 생략해서 보낸다.
export const signupAPI = (body: SignUpAPIBody) => {
    return axios.post<SignUpAPIBody, AxiosResponse<UserType>>("/api/auth/signup",body);
}
    



    
