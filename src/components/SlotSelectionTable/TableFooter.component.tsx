import React, { useContext } from "react";
import { Table, Label, Icon, Button } from "semantic-ui-react";
import { SelectedSlotContext } from "../../contexts/SelectedSlots.context";
import { readableDate } from "../../utils/tools";

export const SlotTableFooter = () => {
  console.log("render => Footer");

  const { selectedSlots, updateSelectedSlots } = useContext(SelectedSlotContext);
	
	const removeSlot = (e: any, { value }: any) => {
		updateSelectedSlots(value, selectedSlots[value])
	}
	
	const labels = Object.keys(selectedSlots).map((key, index) => {
    let [type, date] = [
      selectedSlots[key].type.substr(0, 1).toUpperCase(),
      readableDate(selectedSlots[key].date)
    ];
    return (
      <Label size="medium" key={index} color={type === 'M' ? 'orange' : 'violet'}>
        {date} ({type})
        <Icon name="close" onClick={removeSlot} value={key} />
      </Label>
    );
  });
  return (
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell colSpan="3">{labels}</Table.HeaderCell>
				<Table.HeaderCell>
					<Button color="violet" size="small">Submit</Button>
				</Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};
