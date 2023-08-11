import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { JournalApp } from './JournalApp.jsx';
import { store } from './store';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
    <Provider store={ store } > {/* Redux */}
      <BrowserRouter > {/* Rutas  */}

        <JournalApp /> {/* App */}

      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
