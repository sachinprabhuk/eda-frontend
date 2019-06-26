import React, { useState, FormEvent, useContext } from "react";
import { Form, FormField, Button, Message, FormInput } from "semantic-ui-react";
import { axios } from "../utils/axios";
import { AuthContext } from "../contexts/Auth.context";

export interface ILoginFormProps {}

export function LoginForm(props: ILoginFormProps) {
  // very inefficient code, lot of re-renders
  // must refactor.

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setloading(true);
    try {
      const { data: token } = await axios.post("/auth/login", {
        username,
        password,
        admin: false
      });
      authContext && authContext.setAuthStatus(true, token);
    } catch (e) {
      seterror(e.response.data.message);
      setloading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} error={!!error}>
      <h2>Login</h2>
      <FormField required>
        <label>First Name</label>
        <FormInput
          error={!!error}
          value={username}
          required
          onChange={(e, { value }) => setusername(value)}
        />
      </FormField>
      <FormField required>
        <label>Last Name</label>
        <FormInput
          error={!!error}
          value={password}
          required
          onChange={(e, { value }) => setpassword(value)}
        />
      </FormField>
      <Message error content={error} />
      <Button
        type="submit"
        fluid
        onClick={handleSubmit}
        loading={loading}
        positive
      >
        Submit
      </Button>
    </Form>
  );
}
