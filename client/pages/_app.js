import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

//custom app component
const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
    <div>
        <Header currentUser={currentUser} />
        <Component {...pageProps} />
    </div>  
    );
}  
//when we navigate to a age next willl import component and wraps it in app
//banana component, or index component, or any other component will be wrapped in app component

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx); //individual page
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
         pageProps = await appContext.Component.getInitialProps(appContext.ctx); //individual page
    }

    return {
        pageProps,
        ...data
    }
}

export default AppComponent;    