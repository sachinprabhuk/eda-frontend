import React, { useContext } from "react";
import { Menu, MenuItem, MenuItemProps } from "semantic-ui-react";
import { SlotContext } from "../contexts/Slot.context";


export function SlotTypeMenu() {
	console.log("Render => menu")
	const slotContext = useContext(SlotContext);
	
  const itemClickHandler = (e: any, { name }: MenuItemProps) => {
		let type = name === 'morning' ? 'morn' : 'aft';
		slotContext.setTypeAndFetchSlots(type);
	};
	
  return (
    <Menu pointing secondary>
			<MenuItem
				name="morning"
				active={slotContext.type === "morn"}
				onClick={itemClickHandler}
			/>
			<MenuItem
				name="afternoon"
				active={slotContext.type === "aft"}
				onClick={itemClickHandler}
			/>
    </Menu>
  );
}
