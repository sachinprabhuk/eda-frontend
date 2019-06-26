import React, { createContext, Component, ReactNode } from "react";
import { axios } from "../utils/axios";

interface IAuthContext {
  authenticated: boolean;
  token: string | null;
  setAuthStatus: (authenticated: boolean, token: string) => void;
}

interface PropType {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export class AuthProvider extends Component<PropType> {
  state = {
    authenticated: false,
    token: null
  };

  setAuthStatus = (authenticated: boolean, token: string) => {
    localStorage.setItem("eda-token", token);
    this.setState({ authenticated, token });
  };

  async componentDidMount() {
    const token = localStorage.getItem("eda-token");

    if (token) {
      try {
        await axios.get("/auth/auth-status");
        this.setState({ token: token, authenticated: true });
      } catch (e) {
        localStorage.removeItem("token");
        this.setState({ authenticated: false, token: null });
      }
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{ ...this.state, setAuthStatus: this.setAuthStatus }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
