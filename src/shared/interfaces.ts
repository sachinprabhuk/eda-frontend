import { ISlotStore } from "../stores/faculty/Slot.store";
import { IUserStore } from "../stores/faculty/User.store";
import { IRootStore } from "../stores/faculty/Root.store";

export interface Slot {
  id: string;
  date: Date;
  total: number;
  remaining: number;
  type?: string;
  selected?: boolean;
}

export interface Faculty {
  id: string;
  name: string;
  selections: Slot[];
  slotLim: {
    mornMax: number;
    aftMax: number;
  };
}

export interface ISlotStoreProps {
  slotStore?: ISlotStore;
}

export interface IUserStoreProps {
  userStore?: IUserStore;
}

export interface IRootStoreProps {
  rootStore?: IRootStore;
}
