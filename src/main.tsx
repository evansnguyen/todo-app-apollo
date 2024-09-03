import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Amplify} from 'aws-amplify';
import config from './amplifyconfiguration.json';
import {AmplifyClientProvider} from './contexts/amplifyClientContext.tsx';

Amplify.configure(config);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AmplifyClientProvider>
            <App/>
        </AmplifyClientProvider>
    </StrictMode>,
)
