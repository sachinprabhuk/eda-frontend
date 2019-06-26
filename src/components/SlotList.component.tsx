import React from "react";
import { Table, Checkbox } from "semantic-ui-react";
import { Slot } from '../utils/interfaces';
import { readableDate } from '../utils/tools';

interface ISlotListProps {
  slots: Array<Slot>;
}

export const SlotListTable = (props: ISlotListProps) => {
  return (
    <Table compact celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
          <Table.HeaderCell>Available</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.slots.map((slot: Slot) => {
          return (
            <Table.Row key={slot.id}>
              <Table.Cell>{readableDate(slot.date)}</Table.Cell>
              <Table.Cell>{slot.total}</Table.Cell>
              <Table.Cell>{slot.remaining}</Table.Cell>
              <Table.Cell collapsing>
                <Checkbox />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
