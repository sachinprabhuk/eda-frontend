import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import { IUserStore } from "./stores/User.store";
import { Home } from './containers/Home'
import { Login } from './containers/Login.container';

interface IApp {
  userStore?: IUserStore
}

@inject("userStore")
@observer
export class App extends Component<IApp> {
  render() {
    console.log("Render => App");    
    return this.props.userStore!.token ? (
      <Home />
    ) : (
      <Login />
    )
  }
}

