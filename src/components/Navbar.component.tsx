import React, { useContext } from "react";
import { Menu, MenuItem, Image, Icon, Container } from "semantic-ui-react";

import Logo from "../utils/assets/nitte-logo.png";
import { AuthContext } from "../contexts/Auth.context";

export const Navbar = () => {

  const authContext = useContext(AuthContext);
  const handleLogout = (e: any) => {
    authContext && authContext.setAuthStatus(false, "");
  };

  return (
    <Menu size="small" borderless>
      <Container>
        <MenuItem name="Logo">
          <Image src={Logo} size="medium" />
        </MenuItem>

        <MenuItem name="Logout" onClick={handleLogout} position="right">
          <p style={{ fontSize: "18px" }}>
            <span style={{ textDecoration: "underline" }}>Logout</span>
            <Icon name="log out" style={{ marginLeft: "14px" }} />
          </p>
        </MenuItem>
      </Container>
    </Menu>
  );
}
