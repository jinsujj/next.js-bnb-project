import palette from "./palette";
import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";

const globalStyle = css`
    ${reset};
    *{
        box-sizing: border-box;
    }
    body{
        font-family: Noto Sans, Noto Sans KR;
        line-height: 1.2;
        color: ${palette.black};
    }
    a {
        text-decoration: none;
        color: ${palette.black}
    }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle};
`;

export default GlobalStyle;