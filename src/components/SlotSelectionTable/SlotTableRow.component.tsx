import React, { Component } from "react";
import { Table, Checkbox, CheckboxProps } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

import { Slot } from "../../shared/interfaces";
import { readableDate } from "../../shared/tools";
import { ISlotStore } from "../../stores/Slot.store";
import { autorun } from "mobx";

interface ISlotTableRow {
	slot: Slot
	slotStore?: ISlotStore
}

@inject("slotStore")
@observer
export class SlotTableRow extends Component<ISlotTableRow> {
	constructor(props: ISlotTableRow) {
		super(props);
		// autorun(() => {
		// 	console.log(this.props.slot);
		// })
	}
	checkBoxClickHandler = (e: any, { value, checked }: CheckboxProps) => {
		this.props.slotStore!.updateSlot(value as string, checked as boolean);
  };
	render() {
		console.log("Render => Row")
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

