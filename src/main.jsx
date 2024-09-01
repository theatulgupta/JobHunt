import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx';
import { Toaster } from './components/ui/sonner.jsx';
import store from './redux/store';
import ErrorBoundary from './utils/ErrorBoundary';

const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </PersistGate>
      <Toaster />
    </Provider>
  </StrictMode>,
);
