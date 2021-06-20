import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import { reducer, StateProvider } from "./state";
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) throw result.error;


ReactDOM.render(
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
);
