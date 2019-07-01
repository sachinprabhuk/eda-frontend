import React, { Component } from "react";
import { Menu, MenuItem, MenuItemProps } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

import { IRootStoreProps } from "../../shared/interfaces";

interface ISlotTypeMenu extends IRootStoreProps {}
@inject("rootStore")
@observer
export class SlotTypeMenu extends Component<ISlotTypeMenu> {
  itemClickHandler = (e: any, { name }: MenuItemProps) => {
    const type = name === "morning" ? "morn" : "aft";
    this.props.rootStore!.slotStore.setSlotsType(type);
  };

  render() {
    console.log("Render => Menu");
    return (
      <Menu pointing secondary>
        <MenuItem
          color="violet"
          name="morning"
          active={this.props.rootStore!.slotStore.currentSlotsType === "morn"}
          onClick={this.itemClickHandler}
        />
        <MenuItem
          color="violet"
          name="afternoon"
          active={this.props.rootStore!.slotStore.currentSlotsType === "aft"}
          onClick={this.itemClickHandler}
        />
      </Menu>
    );
  }
}
