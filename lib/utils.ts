//* "token=value" 를 {token:"value"}로 바꾸는 함수
export const cookieStringToObject = (cookieString: string | undefined) => {
    const cookies: { [key: string]: string } = {};
    if (cookieString) {
      //* "token=value"
      const itemString = cookieString?.split(/\s*;\s*/);
      itemString.forEach((pairs) => {
        //* ["token","value"]
        const pair = pairs.split(/\s*=\s*/);
        cookies[pair[0]] = pair.splice(1).join("=");
      });
    }
    return cookies;
  };
  

  // string 에서 number 만 빼내는 함수
  export const getNumber = (string:string) =>{
    const numbers = string.match(/\d/g)?.join("");
    if(numbers){
      return Number(numbers);
    }
    return null;
  }