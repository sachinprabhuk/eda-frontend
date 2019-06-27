import React, { Component, createContext } from "react";
import { Slot } from "../utils/interfaces";
import { axios } from "../utils/axios";

export interface ISlotContext {
  type: string;
  slots: Array<Slot>;
  fetching: boolean;
  setTypeAndFetchSlots(type: string): void;
}

export const SlotContext = createContext<ISlotContext>({
  type: "morn",
  slots: [],
  fetching: false,
  setTypeAndFetchSlots: () => {}
});

export class SlotProvider extends Component {
  state = {
    type: "morn",
    slots: [],
    fetching: true
  };

  fetchSlots = async (type: string) => {
    try {
      const { data: slots } = await axios.get("/faculty/slots", {
        params: { type }
      })
      console.log(slots);
      this.setState({ fetching:false, slots })
    }catch(e) {
      this.setState({ fetching: false })
      console.log(e);
    }
  }

  async componentDidMount() {
    await this.fetchSlots('morn')
  }

  setTypeAndFetchSlots = async (type: string) => {
    this.setState({ type, fetching: true });
    await this.fetchSlots(type);
  };

  render() {
    return (
      <SlotContext.Provider
        value={{
          ...this.state,
          setTypeAndFetchSlots: this.setTypeAndFetchSlots
        }}
      >
        {this.props.children}
      </SlotContext.Provider>
    );
  }
}

