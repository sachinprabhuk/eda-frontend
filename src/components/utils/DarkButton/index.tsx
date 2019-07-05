import React from "react";
import { Loader } from "semantic-ui-react";
import "./index.css";
import { observer } from "mobx-react";

interface IDarkButton {
  children: string;
  fluid?: boolean;
  loading?: boolean;
  onClick?: (event: any) => {};
  disabled?: boolean;
  type?: "submit" | "button";
}

export const DarkButton = observer(
  ({ fluid, loading, children, ...rest }: IDarkButton) => {
    console.log("Dark => button");
    console.log(loading);
    let classList = ["dark-button"];
    if (fluid) classList.push("fluid");

    return (
      <button className={classList.join(" ")} {...rest}>
        {loading ? (
          <Loader size="small" inverted active inline="centered" />
        ) : (
          children
        )}
      </button>
    );
  }
);
