import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import reportWebVitals from './reportWebVitals';
import ContextWrapper from './contexts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextWrapper>
      <Root />
    </ContextWrapper>
  </React.StrictMode>
);

reportWebVitals();
