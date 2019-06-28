import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Label, Icon, Segment } from "semantic-ui-react";
import { ISlotStoreProps, Slot } from "../shared/interfaces";
import { readableDate } from "../shared/tools";

interface ISelectedSlot extends ISlotStoreProps {}

@inject("slotStore")
@observer
export class SelectedSlot extends Component<ISelectedSlot> {
  cancelSlot = (e: any, { value }: any) => {
    this.props.slotStore!.updateSlot(value as string, false);
  };
  render() {
    const slots = this.props.slotStore!.selectedSlots;
    const message =
      slots.length === 0
        ? "The slots you select will appear here."
        : "Your selections";

    return (
      <Segment as="div">
        <h2>{message}</h2>
        {slots.map((slot: Slot) => {
          return (
            <Label
              key={slot.id}
              size="large"
              color={slot.type === "morn" ? "orange" : "violet"}
            >
              {readableDate(slot.date)} ({slot.type!.substr(0, 1).toUpperCase()}
              )
              <Icon
                name="close"
                style={{ marginLeft: "10px" }}
                value={slot.id}
                onClick={this.cancelSlot}
              />
            </Label>
          );
        })}
      </Segment>
    );
  }
}
