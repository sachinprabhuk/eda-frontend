import React, { Component } from "react";
import { Menu, MenuItem, MenuItemProps } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

import { ISlotStore } from "../stores/Slot.store";

interface ISlotTypeMenu {
  slotStore?: ISlotStore;
}
@inject("slotStore")
@observer
export class SlotTypeMenu extends Component<ISlotTypeMenu> {
  itemClickHandler = (e: any, { name }: MenuItemProps) => {
    const type = name === "morning" ? "morn" : "aft";
    this.props.slotStore!.setSlotsType(type);
  };

  render() {
    console.log("Render => Menu");
    return (
      <Menu pointing secondary>
        <MenuItem
          color="violet"
          name="morning"
          active={this.props.slotStore!.currentSlotsType === "morn"}
          onClick={this.itemClickHandler}
        />
        <MenuItem
          color="violet"
          name="afternoon"
          active={this.props.slotStore!.currentSlotsType === "aft"}
          onClick={this.itemClickHandler}
        />
      </Menu>
    );
  }
}
