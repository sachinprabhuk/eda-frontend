import React, { useContext } from "react";
import { CheckboxProps, Checkbox } from "semantic-ui-react";

import {
  SelectedSlotContext,
  ISelectedSlot
} from "../../contexts/SelectedSlots.context";

export const SlotCheckBox = (props: {
  slotID: string;
  selSlot: ISelectedSlot;
}) => {
	console.log("Render => checkbox");
	
	const context = useContext(SelectedSlotContext);
	const onSlotSelect = (e: any, { value }: CheckboxProps) => {
		context.updateSelectedSlots(value as string, props.selSlot);
	};
	return (
		<Checkbox
			onChange={onSlotSelect}
			value={props.slotID}
			checked={!!context.selectedSlots[props.slotID]}
		/>
	)
};
