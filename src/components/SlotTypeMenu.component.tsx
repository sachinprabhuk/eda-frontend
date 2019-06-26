import React, { useState } from "react";
import { Menu, MenuItem, MenuItemProps } from "semantic-ui-react";

interface ISlotTypeMenuProps {
  items: string[];
  onSelect: (selected: string) => void;
}

export function SlotTypeMenu(props: ISlotTypeMenuProps) {
  const [active, setActive] = useState<string>(props.items[0]);
  const itemClickHandler = (e: any, { name }: MenuItemProps) => {
    setActive(name as string);
    props.onSelect(name as string);
  };
  return (
    <Menu pointing secondary>
      {props.items.map((item: string, index: number) => {
        return (
          <MenuItem
            key={index}
            name={item}
            active={active === item}
            onClick={itemClickHandler}
          />
        );
      })}
    </Menu>
  );
}
