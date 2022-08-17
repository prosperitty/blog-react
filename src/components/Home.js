import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {
        isLoading: true,
        articles: undefined,
        title: undefined,
      },
    };
  }

  callAPI() {
    fetch('http://localhost:8080/')
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    if (this.state.apiResponse.isLoading) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Loading...</p>
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header>
            <p>image</p>
            <p>title</p>
            <p>summary</p>
          </header>
          <main>
            <section>discover section</section>
            <section>finance section</section>
            <section>tech section</section>
            <section>politics section</section>
          </main>
        </div>
      );
    }
  }
}

export default Home;
