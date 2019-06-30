import { observable, action, runInAction, computed } from "mobx";
import { Slot } from "../shared/interfaces";
import { axios } from "../shared/axios";
import { IRootStore } from "./Root.store";
import { showToast } from "../shared/tools";

export interface ISlotStore {
  rootStore: IRootStore;
  currentSlotsType: string;
  morningSlots: Slot[];
  afternoonSlots: Slot[];
  currentSlots: Slot[];
  fetchingSlots: boolean;
  selectedSlots: Slot[];
  mornSelectionCount: number;
  aftSelectionCount: number;
  mornSelectable: number;
  aftSelectable: number;

  setSlotsType(slotsType: string): void;
  // setSlots(slots: Slot[]): void;
  setFetchingSlots(fetching: boolean): void;
  updateSlot(slotID: string, selectSlot: boolean, type?: string): void;

  fetchSlots(type: string): void;
  submitSelectedSlots(): void;
}

export class SlotStore implements ISlotStore {
  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  rootStore: IRootStore;

  @observable currentSlotsType: string = "morn";
  @observable morningSlots: Slot[] = [];
  @observable afternoonSlots: Slot[] = [];
  @observable fetchingSlots: boolean = false;

  @computed get currentSlots(): Slot[] {
    if (this.currentSlotsType === "morn") return this.morningSlots;
    return this.afternoonSlots;
  }

  @computed get selectedSlots(): Slot[] {
    return this.morningSlots
      .filter(slot => slot.selected)
      .concat(this.afternoonSlots.filter(slot => slot.selected));
  }

  @computed get mornSelectionCount() {
    return this.selectedSlots.filter((slot: Slot) => slot.type === "morn")
      .length;
  }

  @computed get aftSelectionCount() {
    return this.selectedSlots.filter((slot: Slot) => slot.type === "aft")
      .length;
  }

  @computed get mornSelectable() {
    const { mornMax } = this.rootStore.userStore.currentUser!.slotLim;
    const { mornAllotedSlotCount } = this.rootStore.userStore!;

    const morn = mornMax - mornAllotedSlotCount - this.mornSelectionCount;
    return morn;
  }

  @computed get aftSelectable() {
    const { aftMax } = this.rootStore.userStore.currentUser!.slotLim;
    const { aftAllotedSlotCount } = this.rootStore.userStore!;

    const aft = aftMax - aftAllotedSlotCount - this.aftSelectionCount;
    return aft;
  }

  @action setSlotsType(slotsType: string) {
    this.currentSlotsType = slotsType;
    // this.fetchSlots(slotsType);
  }

  @action setFetchingSlots(value: boolean) {
    this.fetchingSlots = value;
  }

  // @action setSlots(slots: Slot[]) {
  //   this.currentSlots = slots;
  // }

  @action updateSlot(slotID: string, selectSlot: boolean, type?: string) {
    // check if u can select (exceeded slot lim)
    console.log("hey");
    if (selectSlot) {
      if (this.currentSlotsType === "morn" && this.mornSelectable <= 0) {
        showToast("error", "Cant select this slot", "Morning quota reached");
        return;
      } else if (this.currentSlotsType === "aft" && this.aftSelectable <= 0) {
        showToast("error", "Cant select this slot", "Afternoon quota reached");
        return;
      }
    }

    // finding the seleced slot.
    let slots;
    if (type) {
      if (type === "morn") slots = this.morningSlots;
      else slots = this.afternoonSlots;
    } else slots = this.currentSlots;

    const currSlot: Slot | undefined = slots.find(
      (slt: Slot) => slt.id === slotID
    );

    if (currSlot) {
      if (selectSlot) {
        // check if the date is already selected
        if (this.selectedSlots.find(slt => slt.date === currSlot.date)) {
          // error handling...
          showToast(
            "error",
            "cant select slot",
            "You have already selected a slot on this date\n uncheck it to select the current one."
          );
          console.log("cant select bitchhh");
          return;
        }
      }
      console.log("updateeeeeeeeeee");
      currSlot.type = type || this.currentSlotsType;
      currSlot.selected = selectSlot;
    }
  }

  async fetchSlots(type?: string) {
    runInAction(() => (this.fetchingSlots = true));
    try {
      // const { data } = await axios.get("/faculty/all-slots", {
      //   params: { type }
      // });
      const { data } = await axios.get("/faculty/all-slots");
      console.log("Slots fetched", data);
      runInAction(() => {
        this.fetchingSlots = false;
        const [mornSlots, aftSlots] = data.reduce(
          (acc: any, curr: any) => {
            if (curr.type === "morn") acc[0].push(curr);
            else acc[1].push(curr);
            return acc;
          },
          [[], []]
        );
        this.morningSlots = observable(mornSlots);
        this.afternoonSlots = observable(aftSlots);
      });
    } catch (e) {
      console.log(e);
      runInAction(() => (this.fetchingSlots = false));
    }
  }

  async submitSelectedSlots() {
    try {
      const { data } = await axios.post("/faculty/select-slots", {
        slotIDs: this.selectedSlots.map((slot: Slot) => slot.id)
      });
      const { allotedSlots, errors } = data;
      console.log("Submit done!");
      console.log("Alloted ", allotedSlots);
      console.log("errors", errors);
      if (errors.length > 0) {
        // some logic to show errors
        console.log(errors);
      }
      runInAction(() =>
        this.rootStore.userStore.updateAllotedSlots(allotedSlots)
      );
      await this.fetchSlots();
    } catch (e) {
      // some logic to show errors
      console.log(e);
    }
  }
}
