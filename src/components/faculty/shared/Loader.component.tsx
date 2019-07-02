import React from "react";
import { Segment, Dimmer, Image, Loader as SUILoader } from "semantic-ui-react";

import LoadingBG from "../../../shared/assets/loading-bg.png";

interface ILoaderProps {
  size: number;
}

export function Loader(props: ILoaderProps) {
  return (
    <Segment>
      <Dimmer active inverted>
        <SUILoader size="large">Fetching slots...</SUILoader>
      </Dimmer>
      {Array(props.size)
        .fill(1)
        .map((_, index) => (
          <Image key={index} src={LoadingBG} alt="loading..." />
        ))}
    </Segment>
  );
}
