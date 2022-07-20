import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: ""}
  }

  callAPI() {
    fetch("http://localhost:8080/")
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err)
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Home</h1>
        </header>
        <main>
          <p>{this.state.apiResponse.message}</p>
        </main>
      </div>
    );
  }
}

export default Home;