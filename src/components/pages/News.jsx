import React, { Component } from "react";
import HeaderNews from "../news/HeaderNews";
import Content from "../news/content";

export default class AboutPage extends Component {
  render() {
    return (
      <div>
        <HeaderNews />
        <Content />
      </div>
    );
  }
}
