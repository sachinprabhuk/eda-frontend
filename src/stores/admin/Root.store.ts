import { AuthStore, IAuthStore } from "./Auth.store";

export interface IRootStore {
  authStore: IAuthStore;
}

export class RootStore implements IRootStore {
  authStore: IAuthStore;

  constructor() {
    this.authStore = new AuthStore();
  }
}
