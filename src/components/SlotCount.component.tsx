import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Statistic, Grid, Header } from "semantic-ui-react";
import { ISlotStoreProps, IUserStoreProps } from "../shared/interfaces";

interface ISlotCountProps extends ISlotStoreProps, IUserStoreProps {}

@inject("userStore")
@inject("slotStore")
@observer
export class SlotCount extends Component<ISlotCountProps> {
  render() {
    console.log("Render => SlotCount");
    const { mornSelectable, aftSelectable } = this.props.slotStore!;
    return (
      <div>
        <Grid.Row>
          <Header size="medium" style={{ marginBottom: "10px" }}>
            <span style={{ fontSize: "1.4em" }}>
              Hello {this.props.userStore!.currentUser!.name}
            </span>
            , You can select{" "}
          </Header>
        </Grid.Row>
        <Grid.Row>
          <Statistic.Group size="small">
            <Statistic color="orange" horizontal>
              <Statistic.Value>{mornSelectable}</Statistic.Value>
              <Statistic.Label>
                Morning slot{mornSelectable === 1 ? "" : "s"}
              </Statistic.Label>
            </Statistic>
            <Statistic color="violet" horizontal>
              <Statistic.Value>{aftSelectable}</Statistic.Value>
              <Statistic.Label>
                Afternoon slot{aftSelectable === 1 ? "" : "s"}
              </Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Grid.Row>
      </div>
    );
  }
}
