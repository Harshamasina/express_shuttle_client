import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthContextProvider } from './Context/AuthContext.jsx';
import { AccountDetailsProvider } from './Context/AccountContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
      <AccountDetailsProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </AccountDetailsProvider>
  </AuthContextProvider>
);
