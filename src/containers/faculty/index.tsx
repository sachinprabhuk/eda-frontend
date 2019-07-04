import React from "react";
import { Provider, observer, inject } from "mobx-react";
import { Home } from "./Home";
import { Login } from "./Login.container";
import { RootStore } from "../../stores/faculty/Root.store";
import { IRootStoreProps } from "../../shared/interfaces";

const FacultyAuthCheck = inject("rootStore")(
  observer((props: IRootStoreProps) => {
    console.log("Render => FacultyAuthCheck", props.rootStore!.userStore.token);
    return props.rootStore!.userStore.token ? <Home /> : <Login />;
  })
);

export function FacultyIndex() {
  console.log("Render => FacultyIndex");
  return (
    <Provider rootStore={new RootStore()}>
      <FacultyAuthCheck />
    </Provider>
  );
}
