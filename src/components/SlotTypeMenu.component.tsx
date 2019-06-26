import React, { useContext } from "react";
import { Menu, MenuItem, MenuItemProps } from "semantic-ui-react";
import { SlotContext } from "../contexts/Slot.context";


export function SlotTypeMenu() {
  console.log("render -----> Menu");

	const slotContext = useContext(SlotContext);
	
  const itemClickHandler = (e: any, { name }: MenuItemProps) => {
		slotContext.setTypeAndFetchSlots(name as string);
	};
	
  return (
    <Menu pointing secondary>
			<MenuItem
				name="morning"
				active={slotContext.type === "morning"}
				onClick={itemClickHandler}
			/>
			<MenuItem
				name="afternoon"
				active={slotContext.type === "afternoon"}
				onClick={itemClickHandler}
			/>
    </Menu>
  );
}
