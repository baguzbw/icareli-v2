import React, { Component } from "react";
import Advisory from "../commite/Advisory";
import Header from "../commite/HeaderCommite";
import Organizing from "../commite/Organizing";
import Scientific from "../commite/Scientific";

export default class AboutPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Advisory />
        <Scientific />
        <Organizing />
      </div>
    );
  }
}
