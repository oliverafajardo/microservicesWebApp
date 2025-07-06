import 'bootstrap/dist/css/bootstrap.min.css';

//custom app component
export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}  
//when we navigate to a age next willl import component and wraps it in app
//banana component, or index component, or any other component will be wrapped in app component

