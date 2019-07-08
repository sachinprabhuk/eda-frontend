import React, { Component } from "react";
import { Menu, Image, Segment, Divider } from "semantic-ui-react";
import FLlogo from "../../shared/assets/finite-loop-logo.png";

import { NavLink } from "react-router-dom";

export class SideNav extends Component {
  render() {
    return (
      <Segment
        style={{
          backgroundColor: "#292929",
          height: "100vh",
          overflowY: "scroll"
        }}
        id="#sidenav"
      >
        <Menu
          vertical
          fluid
          borderless
          secondary
          inverted
          size="large"
          style={{ margin: "0px" }}
        >
          <div style={{ textAlign: "center" }}>
            <Menu.Item
              header
              as="h2"
              style={{
                paddingBottom: "5px",
                color: "var(--theme-light)",
                opacity: 0.9
              }}
            >
              NMAM institute of technology
            </Menu.Item>
            <Menu.Item header as="h3">
              Exam Duty Selection
            </Menu.Item>
          </div>
          <Divider />
          <Menu.Item as={NavLink} to="/admin/home/selections">
            Slot selections
          </Menu.Item>
          <Menu.Item as={NavLink} to="/admin/home/add-faculty">
            Add faculty
          </Menu.Item>
          <Menu.Item as={NavLink} to="/admin/home/delete-faculty">
            Delete faculty
          </Menu.Item>
          <Menu.Item as={NavLink} to="/admin/home/add-slot">
            Add slots
          </Menu.Item>
          <Menu.Item as={NavLink} to="/admin/home/delete-slot">
            Delete slots
          </Menu.Item>
          <Menu.Item as={NavLink} to="/admin/home/report">
            Report
          </Menu.Item>
          <Menu.Item as={NavLink} to="/admin/home/mail">
            Mail faculty
          </Menu.Item>
          <Divider />
          <Menu.Header style={{ display: "grid", justifyItems: "center" }}>
            <Image src={FLlogo} size="small" />
            <Menu.Item>A finite loop product</Menu.Item>
          </Menu.Header>
        </Menu>
      </Segment>
    );
  }
}
