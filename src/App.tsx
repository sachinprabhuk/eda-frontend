import React, { useContext } from "react";

import { AuthContext } from "./contexts/Auth.context";
import Home from "./containers/Home.container";
import Login from "./containers/Login.container";

const App: React.FC = () => {
  const authContext = useContext(AuthContext);
  return (
    authContext && authContext.authenticated ? (
      <Home />
    ): (
      <Login />
    )
  )
};

export default App;
