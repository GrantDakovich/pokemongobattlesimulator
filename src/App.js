import React, {Component} from 'react';
import logo from './logo.svg';
import style from './App.module.css';
import Pokemon_App from './Pokemon_App/Pokemon_App.js';


class App extends Component {
  render(){
    return (
      <div className={style.App}>
        App Wrapper
        <Pokemon_App/>
      </div>
    );
  }
}

export default App;
