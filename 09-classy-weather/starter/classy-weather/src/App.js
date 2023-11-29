import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { location: "lisbon" };

    // Fixing this
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  fetchWeather() {
    console.log("loading data...");
    console.log(this);
  }

  render() {
    const date = new Date("june 21 2027");

    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input
            type="text"
            placeholder="Search from location..."
            value={this.state.location}
            onChange={(e) => this.setState({ location: e.target.value })}
          />
        </div>
        <button onClick={this.fetchWeather}>Get weather</button>
      </div>
    );
  }
}
