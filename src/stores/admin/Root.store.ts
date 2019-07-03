import { AuthStore, IAuthStore } from "./Auth.store";

export interface IRootStore {
  authStore: IAuthStore;
}

export class RootStore implements IRootStore {
  authStore: IAuthStore;

  constructor() {
    console.log("%c Root store initialized", "color: green;font-size: 18px");
    this.authStore = new AuthStore();
  }
}
