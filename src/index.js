import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const Main = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
