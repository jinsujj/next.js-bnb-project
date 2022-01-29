import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";
import bcrypt, { hash } from "bcryptjs";
import { StoredUserType } from "../../../types/user";

/*
회원가입 api 는 다음의 순서를 거쳐 유저를 만들게 됩니다.
1. api method 가 POST 인지 확인
2. req.body 에 필요한 값이 전부 들어가 있는지 확인.
3. email 이 중복인지 확인.
4. 패스워드를 암호화 합니다
5. 유저 정보를 추가합니다
6. 추가된 유저의 정보와 token 을 전달합니다. 
*/

/*
 비밀번호를 안전하게 저장하기 위해 단방향 암호화를 진행합니다.
 bcryptjs 라이브러리를 사용

 var bcrypt = require('bcrypt');
 var salt = bcrypt.genSaltSync(10);
 var hash  = bcrypt.hashSync("B4c0/\/", salt);
 --Store hash in your password DB

 To check a password;

 -- Load hash from your password DB.
 bcrypt.compareSync("B4c0/|/", hash);   // true
 bcrypt.compareSync("not_bacon", hash); // false


 Auto-gen a salt and hash:
 var hash = bcrypt.hashSync('bacon',8);
*/


export default async (req:NextApiRequest, res: NextApiResponse) => {
    if(req.method ==="POST"){
        const {email, firstname, lastname , password, birthday} = req.body;
        
        if(!email || !firstname || !lastname || !password || !birthday){
            res.statusCode = 400;
            return res.send("필수 데이터가 없습니다");
        }

        const userExist = Data.user.exist({email});
        if(userExist){
            res.statusCode = 409;
            res.send("이미 가입된 이메일 입니다");
        }

        const hashedPassword = bcrypt.hashSync(password,"Sasim");
        const users = Data.user.getList();
        let userId;
        if(users.length == 0){
            userId =1;
        }else{
            userId = users[users.length -1].id +1;
        }

        const newUser: StoredUserType = {
            id: userId,
            email,
            firstname,
            lastname,
            passsword: hashedPassword,
            birthday,
            profileImage: "/public/static/image/user/default_user_profile_image.jpg",
        };

        Data.user.write([...users,newUser]);

        return res.end();
    }
    res.statusCode = 405;

    return res.end();
};



