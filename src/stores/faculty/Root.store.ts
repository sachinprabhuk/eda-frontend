import { SlotStore, ISlotStore } from "./Slot.store";
import { IUserStore, UserStore } from "./User.store";

export interface IRootStore {
  userStore: IUserStore;
  slotStore: ISlotStore;
  activateSlotStore: () => void;
}

export class RootStore {
  userStore: IUserStore;
  slotStore: ISlotStore;
  constructor() {
    console.log("%c Root store initialized...", "color: green;font-size: 18px");
    this.userStore = new UserStore(this);
    // @ts-ignore
    this.slotStore = null;
  }

  activateSlotStore = () => {
    this.slotStore = new SlotStore(this);
  };
}
