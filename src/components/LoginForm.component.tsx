import React, { useState, FormEvent, useContext } from "react";
import { Form, FormField, Button, Message, FormInput } from "semantic-ui-react";
import { axios } from "../utils/axios";
import { AuthContext } from "../contexts/Auth.context";

export interface ILoginFormProps {}

export function LoginForm(props: ILoginFormProps) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [submitState, setSubmitState] = useState({
    loading: false,
    error: ""
  });
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitState({ ...submitState, loading: true });
    try {
      if (!username || !password) throw new Error("All fields are mandatory");
      const { data: token } = await axios.post("/auth/login", {
        username,
        password,
        admin: false
      });
      authContext && authContext.setAuthStatus(true, token);
    } catch (e) {
      setSubmitState({
        ...submitState,
        loading: false,
        error: e.response ? e.response.data.message : e.message
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit} error={!!submitState.error}>
      <h2>Login</h2>
      <FormField required>
        <label>First Name</label>
        <FormInput
          error={!!submitState.error}
          value={username}
          required
          onChange={(e, { value }) => setusername(value)}
        />
      </FormField>
      <FormField required>
        <label>Last Name</label>
        <FormInput
          error={!!submitState.error}
          value={password}
          required
          onChange={(e, { value }) => setpassword(value)}
        />
      </FormField>
      <Message error content={submitState.error} />
      <Button
        type="submit"
        fluid
        onClick={handleSubmit}
        loading={submitState.loading}
        positive
      >
        Submit
      </Button>
    </Form>
  );
}
