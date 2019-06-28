import React from "react";
import {
  Menu,
  MenuItem,
  Image,
  Icon,
  Container,
  Button
} from "semantic-ui-react";

import Logo from "../shared/assets/nitte-logo.png";
import { inject } from "mobx-react";
import { IUserStore } from "../stores/User.store";

export const Navbar = inject("userStore")(
  (props: { userStore?: IUserStore }) => {
    console.log("Render => navbar");

    const handleLogout = (e: any) => {
      props.userStore!.setTokenAndUser(null, null);
    };

    const handleViewSlots = (e: any) => {
      console.log("hey");
    };

    return (
      <Menu size="small" borderless>
        <Container>
          <MenuItem name="Logo">
            <Image src={Logo} size="medium" />
          </MenuItem>

          <Menu.Menu position="right">
            <MenuItem position="right" name="Alloted slots" color="green">
              <Button
                basic
                onClick={handleViewSlots}
                color="violet"
                size="medium"
                className="AllotedSlotsButton"
              >
                Alloted slots
              </Button>
            </MenuItem>
            <MenuItem name="Logout" onClick={handleLogout}>
              <p style={{ fontSize: "20px" }}>
                <span style={{ textDecoration: "underline" }}>Logout</span>
                <Icon name="log out" style={{ marginLeft: "14px" }} />
              </p>
            </MenuItem>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
);
