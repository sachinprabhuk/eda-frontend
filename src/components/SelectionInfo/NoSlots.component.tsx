import React from "react";
import { Icon } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

interface INoSlots {
  icon: SemanticICONS;
  message: string;
}

export function NoSlots(props: INoSlots) {
  return (
    <div style={{ textAlign: "center", color: "#777" }}>
      <Icon name={props.icon} size="huge" />
      <h3>{props.message}</h3>
    </div>
  );
}
