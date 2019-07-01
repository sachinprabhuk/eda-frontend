import React, { Component } from "react";
import { Table, Checkbox, CheckboxProps } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

import { Slot, IRootStoreProps } from "../../../shared/interfaces";
import { readableDate } from "../../../shared/tools";

interface ISlotTableRow extends IRootStoreProps {
  slot: Slot;
}

@inject("rootStore")
@observer
export class SlotTableRow extends Component<ISlotTableRow> {
  checkBoxClickHandler = (e: any, { value, checked }: CheckboxProps) => {
    this.props.rootStore!.slotStore.updateSlot(
      value as string,
      checked as boolean
    );
  };
  render() {
    console.log("Render => Row");
    return (
      <Table.Row key={this.props.slot.id}>
        <Table.Cell>{readableDate(new Date(this.props.slot.date))}</Table.Cell>
        <Table.Cell>{this.props.slot.total}</Table.Cell>
        <Table.Cell>{this.props.slot.remaining}</Table.Cell>
        <Table.Cell collapsing textAlign="center">
          <Checkbox
            value={this.props.slot.id}
            onChange={this.checkBoxClickHandler}
            checked={!!this.props.slot.selected}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}
