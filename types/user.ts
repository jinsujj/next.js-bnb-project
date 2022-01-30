// users.json 에 저장된 유저 타입
export type StoredUserType = {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    birthday: string;
    profileImage: string;
};

export type UserType = {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    birthday: string;
    profileImage: string;
  };
  