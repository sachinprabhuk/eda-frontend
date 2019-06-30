import React from "react";
import { Icon, Grid } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

interface INoSlots {
  icon: SemanticICONS;
  message: string;
}

export function NoSlots(props: INoSlots) {
  return (
    <div style={{ textAlign: "center", color: "#777" }}>
      <Grid.Row>
        <Icon name={props.icon} size="huge" />
        <h3 style={{ margin: "6px" }}>{props.message}</h3>
      </Grid.Row>
    </div>
  );
}
