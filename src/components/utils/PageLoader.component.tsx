import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

export function PageLoader(props: { msg: string }) {
  console.log(`Render => PageLoader(${props.msg})`);
  return (
    <div className="fullPage">
      <Dimmer active>
        <Loader size="big">{props.msg}</Loader>
      </Dimmer>
    </div>
  );
}
