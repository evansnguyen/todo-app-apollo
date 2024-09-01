import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';


const client = new ApolloClient({
    uri: 'https://flyby-router-demo.herokuapp.com/',
    cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </StrictMode>,
)
