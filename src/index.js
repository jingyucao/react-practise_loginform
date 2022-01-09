import React from 'react';
import ReactDOM from 'react-dom';
import {AuthContextProvider} from './components/store/auth-context'
// AuthContextProvider is not the default export, so we need {  } here

import './index.css';
import App from './App';

ReactDOM.render(<AuthContextProvider> <App/> </AuthContextProvider>, document.getElementById('root'));
