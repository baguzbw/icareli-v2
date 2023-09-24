import React, { Component } from "react";
import DescAbout from "../about/DescAbout";
import About from "../about/HeaderAbout";
import Scope from "../about/Scope";

export default class AboutPage extends Component {
  render() {
    return (
      <div>
        <About />
        <DescAbout />
        <Scope />
      </div>
    );
  }
}
