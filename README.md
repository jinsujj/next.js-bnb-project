# next.js-bnb-project
> 해당 Repository는 '클론 코딩으로 시작하는 Next.js' 의 서적의 BNB 프로젝트를 
직접 구현해본 프로젝트입니다.  
해당 책과 라이브러리 버전명과 다르게 최신버전 위주로 개발하여, 버전에 따른 코드 수정 및 책의 오타, 누락 부분도 같이 수정하였습니다.


### 모달 생성 with react-portal
```typescript
리액트 포털
- https://reactjs.org/docs/portals.html
부모 컴포넌트의 DOM 계층 외부에 있는 DOM 노드로 자식을 렌더링 하는 방법 <div className=""></div>
엘리먼트를 다른 엘리먼트에서 렌더링을 하게 하는 방법

1) React.createPortal(child, container);
 첫번째 인자(child) : 리액트 컴포넌트
 두번째 인자(container) : 실제 엘리먼트에 넣어줄 DOM 위치(id)

```
### 회원가입 및 단방향 암호화
```typescript
비밀번호를 안전하게 저장하기 위해 단방향 암호화를 진행합니다.

bcryptjs 라이브러리를 사용
yarn add bcryptjs
yarn addd @types/bcryptjs -D

[Encrypt password]
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("my_password", salt);
-- Store hash in your password in DB

[To check a password]

-- Load hash from your password DB
bcrypt.compareSync("my_password", hash);   //true
bcrypt.compareSync("somone_password, hash);  // false

[Auto-gen salt and hash ]
var hash = bcrypt.hashSync("my_password", 8)
```

### JWT 토큰 
```typescript
JWT 토큰을 사용하여 서버와 클라이언트 간 통신할 수 있는, 사용자 인증 토큰을 만들도록 합니다.
yarn add jsonwebtoken
yarn add @types/jsonwebtoken

jwt.sign 으로 생성한 토큰은 브라우저의 쿠키에 저장할 수 있도록 res 헤더에 'Set-Cookie' 를 설정합니다.

const jwt = require('jsonwebtoken');
var userInfo = {id: 1, username: 'inyong'};
var secretKey = 'SeCrEtKeYfOrHaShInG';

[JWT 토큰 생성]
const token = jwt.sign(userInfo, secretKey);

[Cookie 세팅]
var expires = new Date();
const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
expires.setTime(expires.getTime() + koreaTimeDiff + 30 * 60 * 1000);
res.setHeader("Set-Cookie",`access_token=${token}; path=/; expires=${expires.toUTCString()}); httponly`);

[JWT 토큰 검증]
const userId = jwt.verify(token, screctKey);

[.net core Version 처리]
https://docs.microsoft.com/ko-kr/aspnet/web-api/overview/advanced/http-cookies
```

### 리덕스 - reduxjs/toolkit, react-redux, next-redux-wrapper, 
> - store/common.ts   (Common 전역변수(redux) 처리)
> ```typescript
> import { createSlice, PayloadAction } from "@reduxjs/toolkit";
> import { CommonState } from "../types/reduxState";
>
>// 초기상태
>const initialState: CommonState = {
>    validateMode: false,
>}
>
>const common = createSlice({
>    name: "common",
>    initialState,
>    reducers: {
>        // validateMode 변경하기
>        setValidateMode(state, action: PayloadAction<boolean>) {
>            state.validateMode = action.payload;
>        },
>    },
>});
>
>export const commonAction = {...common.actions};
>
>export default common; 
>```
>- store/index.ts  (redux 전체 묶음)
>```typescript
>import { configureStore } from "@reduxjs/toolkit";
>import { HYDRATE, createWrapper, MakeStore } from "next-redux-wrapper";
>import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
>import { combineReducers } from "redux";
>import common from "./common";
>import user from "./user";
>
>
>const rootRedux = combineReducers({
>    user: user.reducer,
>    common: common.reducer,
>})
>
>
>// 스토어 타입
>export type RootState = ReturnType<typeof rootRedux>;
>
>
>let initialRootState: RootState;
>
>const reducer = (state: any, action:any) =>{
>    if(action.type === HYDRATE){
>        if(state === initialRootState){
>            return {
>                ...state,
>                ...action.payload,
>            }
>        }
>        return state
>    };
>    return rootRedux(state, action);
>};
>
>
>// 타입 지원되는 커스텀 useSelector 만들기
>export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
>
>const initStore = () => {
>    const store = configureStore({
>      reducer,
>      devTools: true,
>    });
>    initialRootState = store.getState();
>    return store;
>  };
>
>  export const wrapper = createWrapper(initStore);
>
>```
>- pages/_app.tsx   (wrapper 로 묶어서 redux 사용 선언)
>```typescript
>import { AppProps} from "next/app";
>import { wrapper } from "../store";
>
>const app ({Component, pageProps}: AppProps) => {
>  return (
>    <>
>      <Component {...pageProps} />
>      <div id="root-modal"/>
>    <>
>  )
>};
>
>export default wrapper.withRedux(app);
>```
 
### 로그인 상태 유지 JWT, Redux, SSR 
getInitialProps 를 이용해 접속하는 순간에, 쿠키를 읽어와, DB 에서 유저정보 확인.
- pages/_app.tsx
```typescript
// 참조
//https://github.com/kirill-konshin/next-redux-wrapper#app
app.getInitialProps = wrapper.getInitialAppProps(store => async context => {
    const appInitalProps = await App.getInitialProps(context);
    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
    console.log(store);
    try{
        if(cookieObject.access_token){
            axios.defaults.headers.common['cookie'] = cookieObject.access_token;
            const {data} = await meAPI();
            console.log(data);
            store.dispatch(userActions.setLoggedUser(data));
        }
    }
    catch(e){
         console.log(e);
    }
    return {...appInitalProps};
})

```
### Outsider Click Handler
해당 컴포넌트 기준으로 아웃사이더 부분의 클릭여부 체크
```typescript
yarn add react-outside-click-handler
yarn add @types/react-outside-click-handler

import OutsideClickHandler from 'react-outside-click-handler';

function MyComponent() {
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        alert('You clicked outside of this component!!!');
      }}
    >
      Hello World
    </OutsideClickHandler>
  );
}
```
### loadash
array, collection date 등 데이터의 필수적인 구조를 쉽게 다룰 수 있게끔 하는데 사용하는 라이브러리
- 브라우저에서 지원하지 않는 성능이 보장되어있는 다양한 메소드를 가지고 있음
- 퍼포먼스 측면에서 native 보다 더 나은 성능을 가짐
- npm 이나 기타 패키지 매니저를 통해 쉽게 사용 가능.
```typescript 
 yarn add lodash
 
 import isEmpty from "lodash/isEmpty";
 
  {isEmpty(photos) && (
                <div className="register-room-upload-photo-wrapper">
                    <>
                    <Input type="file" accept="image/*" onChange={uploadImage}/>
                    <Button icon={<UploadIcon/>} color="bittersweet" width="167px">
                        사진 업로드
                    </Button>
                    </>
                </div>
            )}

```

### aws-sdk 파일 업로드
```typescript
yarn add aws-sdk
yarn add formidable
yarn add @typeps/formidable
yarn add uuid
yarn add @types/uuid
 
import formidable from "formidable";
import formidable, { FileJSON } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

import aws from "aws-sdk";
import { createReadStream } from "fs";
import { rejects } from "assert";
import {v4 as uuidv4} from "uuid";

export const config = {
    api: {
        bodyParser: false,
    }
};


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                console.log(files);

            const url = await new Promise((resolve, reject) => {
                form.parse(req, async (err, fields, files) => {
                    const s3 = new aws.S3({
                        accessKeyId: process.env.ACCESSSKEY_ID,
                        secretAccessKey: process.env.SECRET_ACCESSKEY_ID,
                    });
                    var formidableFile:any = files.file;
                    const stream = createReadStream(formidableFile.filepath);

                    // 파일 이름
                    const originalFileName = formidableFile.originalFilename.split(".").shift();
                    // 확장자
                    const fileExtension = formidableFile.originalFilename.split(".").pop();

                    await s3.upload({
                        Bucket: process.env.S3_BUCKET_NAME!,
                        Key: `${originalFileName}__${uuidv4()}.${fileExtension}`,
                        ACL: "public-read",
                        Body: stream,
                    })
                        .promise()
                        .then((res) => resolve(res.Location))
                        .catch((e) => rejects(e));
                });
            });
        } catch(e){
            res.statusCode = 201;
            res.send(url);
        } catch (e) {
            console.log(e);
            res.end();
        }
    }
    res.statusCode = 405;
        res.statusCode = 405;

    return res.end();
        return res.end();
    }
} 
```
 
## Ubuntu Server Setting
```
sudo apt-get install build-essential
sudo apt install curl -y
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install nodejs
# node -v
# npm -v

JavaScript heap out of memory


```
