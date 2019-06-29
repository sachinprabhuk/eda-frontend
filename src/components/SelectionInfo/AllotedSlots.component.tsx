import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import { IUserStoreProps } from "../../shared/interfaces";
import { observer } from "mobx-react";
import { NoSlots } from "./NoSlots.component";

interface IAllotedSlotsProps extends IUserStoreProps {
  // activeArray: number[];
  active: boolean;
  clickHandler(e: any, data: any): void;
  index: number;
}

@observer
export class AllotedSlots extends Component<IAllotedSlotsProps> {
  render() {
    let arr = [];
    let content =
      arr.length === 0 ? (
        <NoSlots
          message="No slots have been allocated to you yet!"
          icon="calendar times outline"
        />
      ) : (
        <h1>Yet to implement!</h1>
      );
    console.log("Render => Alloted slots");
    // const active = this.props.activeArray.includes(this.props.index);
    return (
      <>
        <Accordion.Title
          // active={active}
          active={this.props.active}
          index={this.props.index}
          onClick={this.props.clickHandler}
        >
          <Icon name="dropdown" />
          View Alloted slots
        </Accordion.Title>
        <Accordion.Content active={this.props.active}>
          {content}
        </Accordion.Content>
      </>
    );
  }
}
