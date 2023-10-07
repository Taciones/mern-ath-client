import React from 'react';
//import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Routes from './Routes';


//ReactDOM.render(<Routes/>, document.getElementById('root'));

ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById('root')
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
