import React from "react";
// import { Route, RouteProps, Redirect } from "react-router-dom";
// import { inject } from "mobx-react";
// import { Admin } from "../../shared/interfaces";

// interface IProtectedRoute extends Admin.IRootStoreProps, RouteProps {}

export const ProtectedRoute = () => <h1>hey</h1>;
// export const ProtectedRoute = inject("rootStore")(
//   ({ rootStore, component, ...rest }: IProtectedRoute) => {
//     return (
//       <Route
//         {...rest}
//         render={props => {
//           if (rootStore!.authStore.token) {
//             // @ts-ignore
//             return <component {...props} />;
//           }
//           return <Redirect to="/admin/login" />;
//         }}
//       />
//     );
//   }
// );
