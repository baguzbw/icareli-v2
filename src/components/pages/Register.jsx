import React, { Component } from "react";
import DescRegister from "../register/DescRegister";
import Header from "../register/Register";

export default class ProgramPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <DescRegister />
      </div>
    );
  }
}
