import React, { Component } from "react";
import { Grid, GridColumn, Container } from "semantic-ui-react";
import { LoginForm } from "../components/LoginForm.component";

interface stateType {
  username: string;
  password: string;
  loading: boolean;
  loginError: string;
}

export default class Login extends Component<any, stateType> {
  render() {
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
