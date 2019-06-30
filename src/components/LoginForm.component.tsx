import React, { FormEvent, Component } from "react";
import { Form, Button, Message, InputOnChangeData } from "semantic-ui-react";

import { axios } from "../shared/axios";
import { observer, inject } from "mobx-react";
import { observable, transaction } from "mobx";
import { TextInput } from "./shared/TextInput.component";
import { IRootStoreProps } from "../shared/interfaces";

interface ILoginFormProps extends IRootStoreProps {}

@inject("rootStore")
@observer
export class LoginForm extends Component<ILoginFormProps> {
  formInfo = observable({
    username: "",
    password: "",
    loading: false,
    error: ""
  });

  updateUsername = (e: any, { value }: InputOnChangeData) =>
    (this.formInfo.username = value);
  updatePassword = (e: any, { value }: InputOnChangeData) =>
    (this.formInfo.password = value);

  handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    this.formInfo.loading = true;
    try {
      if (!this.formInfo.username || !this.formInfo.password)
        throw new Error("All fields are mandatory");
      const {
        data: { token, faculty }
      } = await axios.post("/auth/login", {
        username: this.formInfo.username,
        password: this.formInfo.password,
        admin: false
      });
      this.props.rootStore!.userStore.setTokenAndUser(token, faculty);
    } catch (e) {
      transaction(() => {
        this.formInfo.error = e.response ? e.response.data.message : e.message;
        this.formInfo.loading = false;
      });
    }
  };

  render() {
    console.log("Render => LoginForm");
    return (
      <Form onSubmit={this.handleSubmit} error={!!this.formInfo.error}>
        <h2>Login</h2>
        <TextInput
          name="username"
          value={this.formInfo.username}
          onChange={this.updateUsername}
          error={!!this.formInfo.error}
          required
        />
        <TextInput
          name="password"
          value={this.formInfo.password}
          onChange={this.updatePassword}
          error={!!this.formInfo.error}
          required
        />
        {/* <FormField required>
        <label>First Name</label>
        <FormInput
          error={!!this.formInfo.error}
          value={this.formInfo.username}
          required
          onChange={this.updateUsername}
        />
      </FormField>
      <FormField required>
        <label>Last Name</label>
        <FormInput
          error={!!this.formInfo.error}
          value={this.formInfo.password}
          required
          onChange={this.updatePassword}
        />
      </FormField> */}
        <Message error content={this.formInfo.error} />
        <Button
          type="submit"
          fluid
          onClick={this.handleSubmit}
          loading={this.formInfo.loading}
          positive
        >
          Submit
        </Button>
      </Form>
    );
  }
}
