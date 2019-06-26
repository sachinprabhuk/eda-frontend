import React, { Component, createContext } from 'react'
import { Slot } from '../utils/interfaces';
import { getSlots } from '../utils/tools';

export interface ISlotContext {
	type: string
	slots: Array<Slot>
	selectedSlotIndices: Array<number>
	fetching: boolean
	setTypeAndFetchSlots(type: string): void
}

export const SlotContext = createContext<ISlotContext>({
	type: "morning", slots: [], selectedSlotIndices: [], fetching: false,
	setTypeAndFetchSlots: () => {}
});

export class SlotProvider extends Component {
	state = {
		type: "morning",
		slots: [],
		selectedSlotIndices: [],
		fetching: true
	}

	async componentDidMount() {
		// TODO: error handling....

		const slots = await getSlots(this.state.type)
		this.setState({ fetching: false, slots })
	}

	setTypeAndFetchSlots = async (type: string) => {
		// TODO: error handling....

		this.setState({ type, fetching: true })
		const slots: Slot[] = await getSlots(type);
		this.setState({ slots, fetching: false });
	}
	
	render() {
		return (
			<SlotContext.Provider value={{
				...this.state,
				setTypeAndFetchSlots: this.setTypeAndFetchSlots
			}}>
				{this.props.children}
			</SlotContext.Provider>
		)
	}
}
