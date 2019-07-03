import React, { Component } from "react";
import {
  Segment,
  Form,
  Button,
  InputOnChangeData,
  Message
} from "semantic-ui-react";
import { observable, action, flow } from "mobx";
import { observer, inject } from "mobx-react";
import { AdminInts } from "../../shared/interfaces";
import { axios } from "../../shared/axios";

interface ILogin extends AdminInts.IRootStoreProps {}

@inject("rootStore")
@observer
export class Login extends Component<ILogin> {
  @observable username: string = "";
  @observable password: string = "";
  @observable loading: boolean = false;
  @observable error: string = "";

  @action usernameInput = (e: any, { value }: InputOnChangeData) =>
    (this.username = value);

  @action passwordInput = (e: any, { value }: InputOnChangeData) =>
    (this.password = value);

  handleSubmit = flow(function*(this: Login) {
    try {
      this.loading = true;
      const { data } = yield axios.post("/auth/login", {
        username: this.username,
        password: this.password,
        admin: true
      });
      this.props.rootStore!.authStore.setToken(data);
    } catch (e) {
      this.error =
        e && e.response
          ? e.response.data.message
          : "Ooops!something went wrongg!";
      this.loading = false;
    }
  });

  render() {
    console.log("Render => LoginForm");
    return (
      <Segment inverted style={{ maxWidth: "420px" }} floated="right">
        <h1 color="blue">Admin login</h1>
        <Form inverted error={!!this.error}>
          <Form.Input
            value={this.username}
            label="username"
            onChange={this.usernameInput}
            icon="user"
            iconPosition="left"
            fluid
            required
            placeholder="Username"
            error={!!this.error}
          />
          <Form.Input
            value={this.password}
            label="password"
            onChange={this.passwordInput}
            icon="lock"
            iconPosition="left"
            fluid
            required
            placeholder="Password"
            error={!!this.error}
          />
          <Message error content={this.error} />
          <Button
            type="submit"
            color="blue"
            fluid
            onClick={this.handleSubmit.bind(this)}
            disabled={this.loading}
            loading={this.loading}
          >
            Login
          </Button>
        </Form>
      </Segment>
    );
  }
}
