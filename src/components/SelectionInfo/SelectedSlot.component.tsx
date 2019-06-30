import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Label, Icon, Accordion, Button } from "semantic-ui-react";
import { ISlotStoreProps, Slot } from "../../shared/interfaces";
import { readableDate } from "../../shared/tools";
import { NoSlots } from "./NoSlots.component";

interface ISelectedSlot extends ISlotStoreProps {
  // activeArray: number[];
  active: boolean;
  clickHandler(e: any, data: any): void;
  index: number;
}

@inject("slotStore")
@observer
export class SelectedSlot extends Component<ISelectedSlot> {
  cancelSlot = (e: any, { value }: any) => {
    this.props.slotStore!.updateSlot(value.id as string, false, value.type);
  };
  render() {
    console.log("Render => Selected slots");
    // const active = this.props.activeArray.includes(this.props.index);
    const slots = this.props.slotStore!.selectedSlots;
    const message =
      slots.length === 0
        ? "The slots you select will appear here."
        : "Your selections";
    const content =
      slots.length === 0 ? (
        <NoSlots
          message={"You have not selected any slots yet!"}
          icon="calendar times outline"
        />
      ) : (
        slots.map((slot: Slot) => {
          return (
            <Label
              key={slot.id}
              size="large"
              style={{ margin: "6px 6px 6px 0px" }}
              color={slot.type === "morn" ? "orange" : "violet"}
            >
              {readableDate(slot.date)} ({slot.type!.substr(0, 1).toUpperCase()}
              )
              <Icon
                name="close"
                style={{ marginLeft: "10px" }}
                value={{ id: slot.id, type: slot.type }}
                onClick={this.cancelSlot}
              />
            </Label>
          );
        })
      );

    return (
      <>
        <Accordion.Title
          active={this.props.active}
          index={0}
          onClick={this.props.clickHandler}
        >
          <Icon name="dropdown" />
          {message}
        </Accordion.Title>
        <Accordion.Content active={this.props.active}>
          {content}
          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
              display:
                this.props.slotStore!.selectedSlots.length > 0
                  ? "block"
                  : "none"
            }}
          >
            <Button
              icon
              labelPosition="right"
              positive
              as="button"
              disabled={this.props.slotStore!.selectedSlots.length === 0}
            >
              Submit
              <Icon name="arrow right" />
            </Button>
          </div>
        </Accordion.Content>
      </>
    );
  }
}

// return (
//   <Card fluid as="div" color="violet">
//     <Card.Content>
//       <Card.Header>{message}</Card.Header>
//       <Card.Description>
//         {slots.map((slot: Slot) => {
//           return (
//             <Label
//               key={slot.id}
//               size="large"
//               style={{ margin: "6px 6px 6px 0px" }}
//               color={slot.type === "morn" ? "orange" : "violet"}
//             >
//               {readableDate(slot.date)} (
//               {slot.type!.substr(0, 1).toUpperCase()}
//               )
//               <Icon
//                 name="close"
//                 style={{ marginLeft: "10px" }}
//                 value={{ id: slot.id, type: slot.type }}
//                 onClick={this.cancelSlot}
//               />
//             </Label>
//           );
//         })}
//       </Card.Description>
//     </Card.Content>
//     <Card.Content extra>
//       <Button color="violet" disabled={slots.length === 0}>
//         Submit
//       </Button>
//     </Card.Content>
//   </Card>
