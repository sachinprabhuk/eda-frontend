import React, { Component } from "react";
import { Grid, GridColumn, Container } from "semantic-ui-react";
import { LoginForm } from "../../components/faculty/LoginForm.component";
import { axios } from "../../shared/axios";
import { observer, inject } from "mobx-react";
import { IRootStoreProps } from "../../shared/interfaces";

interface ILoginProps extends IRootStoreProps {}

@inject("rootStore")
@observer
export class Login extends Component<ILoginProps> {
  async componentDidMount() {
    const token = localStorage.getItem("eda-token");

    if (token) {
      try {
        const { data: faculty } = await axios.get("/auth/auth-status", {
          params: { admin: false }
        });
        this.props.rootStore!.userStore.login(token, faculty);
      } catch (e) {
        localStorage.removeItem("token");
        this.props.rootStore!.userStore.logout();
      }
    }
  }

  render() {
    console.log("Render => Login");
    return (
      <Container>
        <Grid relaxed columns={2} style={{ height: "100vh" }}>
          <GridColumn width={6} verticalAlign="middle" floated="left">
            <LoginForm />
          </GridColumn>

          <GridColumn width={8} floated="right" verticalAlign="middle">
            <h1>Some title</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptates velit eum voluptate aspernatur inventore deleniti
              molestiae aliquam modi dolor architecto quis dicta accusantium
              dignissimos numquam est cumque, temporibus error itaque?
            </p>
          </GridColumn>
        </Grid>
      </Container>
    );
  }
}
