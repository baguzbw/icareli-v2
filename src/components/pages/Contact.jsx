import React, { Component } from "react";
import ContactDesc from "../contact/Contact";
import Header from "../contact/HeaderContact";

export default class AboutPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <ContactDesc />
      </div>
    );
  }
}
