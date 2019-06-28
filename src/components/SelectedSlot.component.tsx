import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Label, Icon, Card, Button } from "semantic-ui-react";
import { ISlotStoreProps, Slot } from "../shared/interfaces";
import { readableDate } from "../shared/tools";

interface ISelectedSlot extends ISlotStoreProps {}

@inject("slotStore")
@observer
export class SelectedSlot extends Component<ISelectedSlot> {
  cancelSlot = (e: any, { value }: any) => {
    this.props.slotStore!.updateSlot(value.id as string, false, value.type);
  };
  render() {
    const slots = this.props.slotStore!.selectedSlots;
    const message =
      slots.length === 0
        ? "The slots you select will appear here."
        : "Your selections";

    return (
      <Card fluid as="div" color="violet">
        <Card.Content>
          <Card.Header>{message}</Card.Header>
          <Card.Description>
            {slots.map((slot: Slot) => {
              return (
                <Label
                  key={slot.id}
                  size="large"
                  style={{ margin: "6px 6px 6px 0px" }}
                  color={slot.type === "morn" ? "orange" : "violet"}
                >
                  {readableDate(slot.date)} (
                  {slot.type!.substr(0, 1).toUpperCase()}
                  )
                  <Icon
                    name="close"
                    style={{ marginLeft: "10px" }}
                    value={{ id: slot.id, type: slot.type }}
                    onClick={this.cancelSlot}
                  />
                </Label>
              );
            })}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button color="violet" disabled={slots.length === 0}>
            Submit
          </Button>
        </Card.Content>
      </Card>
    );
  }
}
