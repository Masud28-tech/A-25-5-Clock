import React, { useEffect, useState } from "react";
import "./App.css";

function Timer({ session, isTimerRunning, isReset }) {
  const [minutes, setMinutes] = useState(session);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setMinutes(session);
    setSeconds(0);
  }, [isReset]);

  useEffect(() => {
    setMinutes(session);
  }, [session]);

  useEffect(() => {
    if (minutes > 0 && isTimerRunning) {
      if (minutes === session) {
        // this will do the first time timer start
        setMinutes(session - 1);
      }
      const mintueTimerId = setTimeout(() => {
        setMinutes(minutes - 1);
      }, 60000);

      return () => clearTimeout(mintueTimerId);
    }
  }, [minutes, isTimerRunning]);

  useEffect(() => {
    if (isTimerRunning) {
      if (seconds > 0) {
        const secondsTimerId = setTimeout(() => {
          setSeconds(seconds - 1);
        }, 1000);

        return () => clearTimeout(secondsTimerId);
      } else {
        setSeconds(59);
      }
    }
  }, [seconds, isTimerRunning]);

  return (
    <div>
      {minutes >= 10 ? minutes : `0${minutes}`} :{" "}
      {seconds >= 10 ? seconds : `0${seconds}`}
    </div>
  );
}
class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      break: 5,
      session: 25,
      isTimerRunning: false,
      isReset: false,
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleBreak = this.handleBreak.bind(this);
    this.handleSession = this.handleSession.bind(this);
    this.handleTimerStartStop = this.handleTimerStartStop.bind(this);
  }

  handleTimerStartStop() {
    this.setState((prev) => ({
      isTimerRunning: !prev.isTimerRunning,
    }));
  }

  handleReset() {
    this.setState({
      break: 5,
      session: 25,
      isTimerRunning: false,
    });

    this.setState((prev) => ({
      isReset: !prev.isReset,
    }));
  }

  handleBreak(e, type) {
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
            <Timer
              session={this.state.session}
              isTimerRunning={this.state.isTimerRunning}
              isReset={this.state.isReset}
            />
          </div>

          <button id="start_stop" onClick={this.handleTimerStartStop}>
            Start/Stop
          </button>
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
