import React, { useEffect } from "react";
import "./App.css";

function Timer({session}){
  let minues = session;
  useEffect({
    
  },[]);
  return (
    <div></div>
  );
}
class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      break: 5,
      session: 25,
      timer: {
        minutes: 0,
        seconds: 0,
      },
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleBreak = this.handleBreak.bind(this);
    this.handleSession = this.handleSession.bind(this);
  }

  handleReset() {
    this.setState({
      break: 5,
      session: 25,
      timer: {
        minutes: 0,
        seconds: 0,
      },
    });
  }

  handleBreak(e, type) {
    switch (type) {
      case "decrement":
        this.setState((prev) => ({
          break: prev.break > 1 ? prev.break - 1 : prev.break,
        }));
        break;
      case "increment":
        this.setState((prev) => ({
          break: prev.break < 60 ? prev.break + 1 : prev.break,
        }));
        break;
    }
  }

  handleSession(e, type) {
    switch (type) {
      case "decrement":
        this.setState((prev) => ({
          session: prev.session > 1 ? prev.session - 1 : prev.session,
        }));
        break;
      case "increment":
        this.setState((prev) => ({
          session: prev.session < 60 ? prev.session + 1 : prev.session,
        }));
        break;
    }
  }

  render() {
    return (
      <div className="container">
        <div id="header">
          <h1>The 25 + 5 Clock</h1>
        </div>

        <div className="clock-container">
          <span id="timer-label">Session</span>
          <div id="time-left">
            <Timer session={this.state.session} />
          </div>

          <button id="start_stop">Start/Stop</button>
          <button id="reset" onClick={this.handleReset}>
            Reset
          </button>
        </div>

        <div className="action-container">
          <div className="break-block">
            <span id="break-label">Break Length</span>
            <div id="break-length">{this.state.break}</div>
            <button
              id="break-decrenent"
              onClick={(e) => this.handleBreak(e, "decrement")}
            >
              (-)
            </button>
            <button
              id="break-increment"
              onClick={(e) => this.handleBreak(e, "increment")}
            >
              (+)
            </button>
          </div>
          <div className="session-label">
            <span id="session-label">Session Length</span>
            <div id="session-length">{this.state.session}</div>
            <button
              id="session-decrenent"
              onClick={(e) => this.handleSession(e, "decrement")}
            >
              [-]
            </button>
            <button
              id="session-increment"
              onClick={(e) => this.handleSession(e, "increment")}
            >
              [+]
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Clock />
    </div>
  );
}

export default App;
