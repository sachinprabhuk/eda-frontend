import React from "react";
import { Loader } from "semantic-ui-react";
import "./index.css";

interface IDarkButton {
  children: string;
  fluid?: boolean;
  loading?: boolean;
  onClick?: (event: any) => {};
  disabled?: boolean;
}

export function DarkButton({ fluid, loading, children, ...rest }: IDarkButton) {
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
