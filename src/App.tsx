import React, { Component } from "react";

import { IRootStoreProps } from "./shared/interfaces";
// @ts-ignore
import { SemanticToastContainer } from "react-semantic-toasts";
import { Switch, Route } from "react-router";
import { FacultyIndex } from "./containers/faculty";

interface IApp extends IRootStoreProps {}

export class App extends Component<IApp> {
  render() {
    return (
      <>
        <Switch>
          <Route path="/" exact component={FacultyIndex} />
          {/* <Route path="/admin/login" exact component={} /> */}
        </Switch>
        <SemanticToastContainer position="top-right" />
      </>
    );
  }
}
