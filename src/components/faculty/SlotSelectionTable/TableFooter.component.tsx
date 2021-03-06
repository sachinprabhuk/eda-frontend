import React, { Component } from "react";
import { Table, Label, Icon, Button } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { ISlotStore } from "../../../stores/faculty/Slot.store";
import { Slot, IRootStoreProps } from "../../../shared/interfaces";
import { readableDate } from "../../../shared/tools";

interface ISlotTableFooter extends IRootStoreProps {}

@inject("rootStore")
@observer
export class SlotTableFooter extends Component<ISlotTableFooter> {
  removeSlot = (e: any, { value }: any) => {
    // this.props.rootStore!.slotStore.updateSlot()
  };
  render() {
    const labels = this.props.rootStore!.slotStore.selectedSlots.map(
      (slot: Slot, idx) => {
        let [type, date] = [
          slot.type!.substr(0, 1).toUpperCase(),
          readableDate(slot.date)
        ];
        return (
          <Label
            size="medium"
            key={idx}
            color={type === "M" ? "orange" : "violet"}
          >
            {date} ({type})
            <Icon name="close" onClick={this.removeSlot} value={slot.id} />
          </Label>
        );
      }
    );
    return (
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="3">{labels}</Table.HeaderCell>
          <Table.HeaderCell>
            <Button color="violet" size="small">
              Submit
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    );
  }
}
