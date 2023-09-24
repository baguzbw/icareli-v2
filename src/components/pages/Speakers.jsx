import React, { Component } from "react";
import Header from "../speakers/HeaderSpeakers";

import DescSpeakers from "../speakers/DescSpeaker";

export default class SpeakerPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <DescSpeakers />
      </div>
    );
  }
}
