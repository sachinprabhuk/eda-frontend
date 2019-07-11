import React, { MouseEvent } from "react";
import { Loader } from "semantic-ui-react";
import { observer } from "mobx-react";
import "./index.css";

interface IDarkButton {
  children: string;

  fluid?: boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => {};
  disabled?: boolean;
  type?: "submit" | "button";
}

export const DarkButton = observer(
  ({ fluid, loading, children, ...rest }: IDarkButton) => {
    console.log("Dark => button");
    let classList = ["dark-button"];
    if (fluid) classList.push("fluid");

    return (
      <button className={classList.join(" ")} {...rest}>
        {loading ? (
          <Loader size="tiny" inverted active inline="centered" />
        ) : (
          children
        )}
      </button>
    );
  }
);
