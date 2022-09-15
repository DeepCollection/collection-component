import * as React from "react";
import { Component } from "react";
import { render } from "react-dom";
import Upload from "./upload";
// import Upload from "../lib/upload.js";
interface AppProps {}
interface AppState {
  name: string;
}

export class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "React Name",
    };
  }

  render() {
    return (
      <div>
        <Upload></Upload>
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));
