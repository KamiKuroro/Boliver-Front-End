import React, { Component } from 'react';
import { TopBar } from './TopBar';

import { Main } from './Main';
import { TOKEN_KEY } from '../constants';

class App extends Component {

  state = {
    isLoggedIn: !!localStorage.getItem(TOKEN_KEY) 
  }

  //callback function 1
  handleLogin = (token) => {
    this.setState({ isLoggedIn: true });
    console.log(token);
    
    console.log(token);
    localStorage.setItem(TOKEN_KEY, token)
  }

  //callback function 2
  handleLogout = () => {
    this.setState({ isLoggedIn: false })
    localStorage.removeItem(TOKEN_KEY)
  }


  render() {
    return (
      <div className="App">
        {/* {this.state.isLoggedIn ? 'login': 'logout'}
        <button onClick={this.state.isLoggedIn ? this.handleLogout : this.handleLogin}>flip</button> */}
        <TopBar 
          isLoggedIn={this.state.isLoggedIn}
          handleLogout={this.handleLogout}
        />
        
        <Main 
          isLoggedIn={this.state.isLoggedIn}
          handleLogin={this.handleLogin}
        />
      </div>
    );
  }
}

export default App;
