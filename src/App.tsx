import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import { Home } from "./containers/Home";
import { Login } from "./containers/Login.container";
import { IRootStoreProps } from "./shared/interfaces";
// @ts-ignore
import { SemanticToastContainer } from "react-semantic-toasts";

interface IApp extends IRootStoreProps {}

@inject("rootStore")
@observer
export class App extends Component<IApp> {
  render() {
    return (
      <>
        {this.props.rootStore!.userStore.token ? <Home /> : <Login />}
        <SemanticToastContainer position="top-right" />
      </>
    );
  }
}
