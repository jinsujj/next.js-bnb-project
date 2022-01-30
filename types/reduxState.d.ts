import { UserType } from "./user";



// 유저 redux state
export type UserStae = UserType & {
    isLogged: booolean;
}

// 공통 redux State
export type CommonState = {
    validateMode : boolean;
}