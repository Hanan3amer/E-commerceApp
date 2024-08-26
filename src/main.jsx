import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AuthContextProvider from './Context/AuthContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'react-toastify/dist/ReactToastify.css'
let queryclinet = new QueryClient()
createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryclinet}>
        <AuthContextProvider>
            {/* <ReactQueryDevtools initialIsOpen={false}> */}
            <ToastContainer></ToastContainer>
            <App />
            {/* </ReactQueryDevtools> */}
        </AuthContextProvider>
    </QueryClientProvider>
)
