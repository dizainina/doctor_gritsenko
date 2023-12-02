import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App2';

import reportWebVitals from './reportWebVitals';

const popupComments = ReactDOM.createRoot(document.getElementById('popup-comments'));
const popupPosts = ReactDOM.createRoot(document.getElementById('posts'));


popupComments.render(
  <React.StrictMode>
  <App />
</React.StrictMode>,
);
popupPosts.render(
  <React.StrictMode>
  <App2 />
</React.StrictMode>,
);

reportWebVitals();
