import React, { createContext, Component } from 'react';

export interface ISelectedSlot {
  date: Date,
  type: string
}
interface IContextType {
  selectedSlots: { [key: string]: ISelectedSlot },
  updateSelectedSlots: (id: string, slot: ISelectedSlot) => void; 
}
export const SelectedSlotContext = createContext<IContextType>({
  selectedSlots: {}, updateSelectedSlots: () => {}
});

export class SelectedSlotProvider extends Component {
  state = {
    selectedSlots: {}, 
    updateSelectedSlots: (id: string, slot: ISelectedSlot) => {
      const copy: any = {...this.state.selectedSlots};
      if(copy[id])
        delete copy[id]
      else 
        copy[id] = slot;
      this.setState({
        selectedSlots: copy
      })
    }
  }
  render() {
    return (
      <SelectedSlotContext.Provider value={this.state}>
        {this.props.children}
      </SelectedSlotContext.Provider>
    );
  }
}
