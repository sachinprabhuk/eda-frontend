import React, { useContext } from "react";
import { Menu, MenuItem, Image, Icon, Container } from "semantic-ui-react";

import Logo from "../shared/assets/nitte-logo.png";
import { inject } from "mobx-react";
import { IUserStore } from "../stores/User.store";

export const Navbar = inject("userStore")(
  (props: { userStore?: IUserStore }) => {
    console.log("Render => navbar");

    const handleLogout = (e: any) => {
      props.userStore!.setTokenAndUser(null, null);
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
);
