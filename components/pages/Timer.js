import React, { Component } from "react";
// import moment from 'moment';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.count = this.count.bind(this);
    this.state = {
      days: 0,
      minutes: 0,
      hours: 0,
      secounds: 0,
      time_up: "",
    };
    this.x = null;
    this.deadline = null;
  }
  count() {
    var now = new Date().getTime();
    var t = this.deadline - now;
    var dd = Math.floor(t / (1000 * 60 * 60 * 24));
    var hh = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mm = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var ss = Math.floor((t % (1000 * 60)) / 1000);

    var days = dd < 10 ? "0" + dd : dd;
    var hours = hh < 10 ? "0" + hh : hh;
    var minutes = mm < 10 ? "0" + mm : mm;
    var seconds = ss < 10 ? "0" + ss : ss;

    this.setState({ days, minutes, hours, seconds });

    if (t < 0) {
      clearInterval(this.x);
      this.setState({
        days: 0,
        minutes: 0,
        hours: 0,
        seconds: 0,
        time_up: "TIME IS UP",
      });
    }
  }
  componentDidMount() {
    this.deadline = new Date("Nov 01, 2021").getTime();

    this.x = setInterval(this.count, 1000);
  }

  render() {
    const { days, seconds, hours, minutes } = this.state;
    return (
      <>
        <div className="container w-100" id="countdown">
          <div className="row">
            <div className="col p-0">
              <div className="box">
                <p id="day">{days}</p>
                <span className="text">Days</span>
              </div>
            </div>
            <div className="col p-0">
              <div className="box">
                <p id="hour">{hours}</p>
                <span className="text">Hours</span>
              </div>
            </div>
            <div className="col p-0">
              <div className="box">
                <p id="minute">{minutes}</p>
                <span className="text">Minutes</span>
              </div>
            </div>
            <div className="col p-0">
              <div className="box">
                <p id="second">{seconds}</p>
                <span className="text">Seconds</span>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          #countdown {
            padding: 10px;
            background-color: rgba(255, 255, 255, 0.1);
            display: inline-block;
            text-align: center;
            margin: auto;
          }
          #countdown .box {
            padding: 0px;
            border-right: solid 1px rgba(255, 255, 255, 0.2);
          }
          #countdown .col:last-child .box {
            border-right-color: transparent;
          }
          #countdown .box p {
            font-size: 20px;
            font-weight: bold;
            margin: 0;
          }
          #countdown .box .text {
            font-size: 12px;
            font-family: sans-serif;
          }

          @media (min-width: 768px) {
            .container {
              width: 1100px;
            }
            h1 {
              font-size: 58px;
            }
            #countdown {
              width: 350px;
              padding: 20px;
            }
          }
        `}</style>
      </>
    );
  }
}

export default Timer;
