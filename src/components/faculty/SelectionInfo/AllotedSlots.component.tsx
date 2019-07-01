import React, { Component } from "react";
import { Accordion, Icon, Segment, List } from "semantic-ui-react";
import { IRootStoreProps } from "../../../shared/interfaces";
import { observer, inject } from "mobx-react";
import { NoSlots } from "./NoSlots.component";
import { readableDate } from "../../../shared/tools";

interface IAllotedSlotsProps extends IRootStoreProps {
  // activeArray: number[];
  active: boolean;
  clickHandler(e: any, data: any): void;
  index: number;
}

@inject("rootStore")
@observer
export class AllotedSlots extends Component<IAllotedSlotsProps> {
  render() {
    const alloted = this.props.rootStore!.userStore.currentUser!.selections;
    const jsx = alloted.reduce(
      (acc: Array<Array<JSX.Element>>, curr, idx: number) => {
        if (curr.type === "morn")
          acc[0].push(
            <List.Item key={idx}>{readableDate(curr.date)}</List.Item>
          );
        else
          acc[1].push(
            <List.Item key={idx}>{readableDate(curr.date)}</List.Item>
          );
        return acc;
      },
      [[], []]
    );
    let content =
      alloted.length === 0 ? (
        <NoSlots
          message="No slots have been allocated to you yet!"
          icon="calendar times outline"
        />
      ) : (
        <div>
          <Segment.Group horizontal>
            <Segment>
              <List size="large" relaxed>
                <List.Item>
                  <List.Header style={{ color: "#F2711C" }}>
                    Morning
                  </List.Header>
                  <List>{jsx[0]}</List>
                </List.Item>
              </List>
            </Segment>
            <Segment>
              <List size="large" relaxed>
                <List.Item>
                  <List.Header style={{ color: "#6435c9" }}>
                    Afternoon
                  </List.Header>
                  <List>{jsx[1]}</List>
                </List.Item>
              </List>
            </Segment>
          </Segment.Group>
        </div>
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
