import { readFileSync, writeFileSync } from "fs"
import { json } from "stream/consumers";
import { StoredUserType } from "../../types/user";


// 유저 리스트 불러오기
const getList =() =>{
    const usersBuffer = readFileSync("data/users/json");
    const usersString = usersBuffer.toString();
    if(!usersString){
        return [];
    }

    const users: StoredUserType[] = JSON.parse(usersString);
    return users;
}

// email 의 유저가 있는지 확인하기
const exist = ({email}: {email: string}) => {
    const users = getList();
    return users.some((user) => user.email === email);
}

// 유저 리스트 저장하기
const write = (users: StoredUserType[]) => {
    writeFileSync("data/users.json", JSON.stringify(users));
};


export default {getList, exist, write};