import './index.css';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from './store/index.tsx';

createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <App />
    </StoreProvider>
);
