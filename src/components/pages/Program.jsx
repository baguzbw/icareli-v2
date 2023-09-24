import React, { Component } from "react";
import Header from "../program/HeaderProgram";
import Program from "../program/Program";

export default class ProgramPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Program />
      </div>
    );
  }
}
