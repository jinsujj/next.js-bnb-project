import App, {AppContext, AppProps} from "next/app";
import Header from "../components/Header";
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";
import { cookieStringToObject } from "../lib/utils";
import { wrapper } from "../store";
import { userActions } from "../store/user";
import GlobalStyle from "../styles/GlobalStyle";


const app = ({Component, pageProps}: AppProps) => {
    return(
        <>
        <GlobalStyle/>
        <Component {...pageProps}/>
        <div id="root-modal"/>
        </>
    )
};

// 참조
//https://github.com/kirill-konshin/next-redux-wrapper#app
app.getInitialProps = wrapper.getInitialAppProps(store => async context => {
    const appInitalProps = await App.getInitialProps(context);
    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
    try{
        if(cookieObject.access_token){
            axios.defaults.headers.common['cookie'] = cookieObject.access_token;
            const {data} = await meAPI();
            store.dispatch(userActions.setLoggedUser(data));
        }
    }
    catch(e){
         console.log(e);
    }
    return {...appInitalProps};
})


export default wrapper.withRedux(app);