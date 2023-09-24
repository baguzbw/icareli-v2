import React, { Component } from "react";
import CountdownHitung from "../home/Countdown";
import Date from "../home/Dates";
import Desc from "../home/Desc";
import Landing from "../home/Landing";
import Speakers from "../home/Speakers";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Landing />
        <CountdownHitung />
        <Desc />
        <Speakers />
        <Date />
      </div>
    );
  }
}
