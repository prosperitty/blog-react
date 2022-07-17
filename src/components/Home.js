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
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.apiResponse.message}</p>
      </div>
    );
  }
}

export default Home;