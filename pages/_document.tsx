import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";


export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originRenderPage = ctx.renderPage;

        try{
            ctx.renderPage = () => 
                originRenderPage({
                    enhanceApp: (App) => (props) => 
                        sheet.collectStyles(<App {...props}/>),
                });
            
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles : (
                    <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                    </>
                )
            }
        }
        catch(e){
            console.log(e);
        }
        finally{
            sheet.seal();
        }
    }
}