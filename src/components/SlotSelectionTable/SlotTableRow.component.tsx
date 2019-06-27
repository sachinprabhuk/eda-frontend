import React from "react";
import { Table } from "semantic-ui-react";

import { readableDate } from "../../utils/tools";
import { Slot } from "../../utils/interfaces";
import { SlotCheckBox } from "./SlotCheckbox.component";


export const SlotTableRow = (props: {slot: Slot, type: string}) => {
	console.log("Render => Row");
	const selSlot = {
		date: props.slot.date, 
		type: props.type
	}
  return (
  	<Table.Row key={props.slot.id}>
  		<Table.Cell>{readableDate(new Date(props.slot.date))}</Table.Cell>
  		<Table.Cell>{props.slot.total}</Table.Cell>
  		<Table.Cell>{props.slot.remaining}</Table.Cell>
  		<Table.Cell collapsing textAlign="center">
				<SlotCheckBox slotID={props.slot.id} selSlot={selSlot} />
  		</Table.Cell>
  	</Table.Row>
  );
};
