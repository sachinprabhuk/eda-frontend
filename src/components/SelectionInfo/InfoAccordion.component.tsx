import React, { Component } from "react";
import { Accordion, Transition } from "semantic-ui-react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { AllotedSlots } from "./AllotedSlots.component";
import { SelectedSlot } from "./SelectedSlot.component";

@observer
export class InfoAccordion extends Component {
  @observable selectedSlotActive: boolean = true;
  @observable allotedSlotActive: boolean = false;

  handleClick = (e: any, { index }: any) => {
    if (index === 0) this.selectedSlotActive = !this.selectedSlotActive;
    else this.allotedSlotActive = !this.allotedSlotActive;
  };

  render() {
    console.log("Render => InfoAccordion");

    return (
      <Accordion fluid styled>
        <SelectedSlot
          clickHandler={this.handleClick}
          // activeArray={this.activeIndices}
          active={this.selectedSlotActive}
          index={0}
        />
        <AllotedSlots
          clickHandler={this.handleClick}
          // activeArray={this.activeIndices}
          active={this.allotedSlotActive}
          index={1}
        />
      </Accordion>
    );
  }
}
