import React, { Suspense, ComponentType } from "react";
import { PageLoader } from "./PageLoader.component";

export function lazyLoaded<T>(Component: ComponentType<T>) {
  return (props: T) => {
    return (
      <Suspense fallback={<PageLoader msg="Loading...." />}>
        <Component {...props as T} />
      </Suspense>
    );
  };
}
