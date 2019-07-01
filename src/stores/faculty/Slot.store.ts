import { observable, action, computed, flow } from "mobx";
import { Slot } from "../../shared/interfaces";
import { axios } from "../../shared/axios";
import { IRootStore } from "./Root.store";
import { showToast } from "../../shared/tools";

export interface ISlotStore {
  rootStore: IRootStore;
  currentSlotsType: string;
  morningSlots: Slot[];
  afternoonSlots: Slot[];
  currentSlots: Slot[];
  selectedSlots: Slot[];
  mornSelectionCount: number;
  aftSelectionCount: number;
  mornSelectable: number;
  aftSelectable: number;

  fetchingSlots: boolean;
  submittingSlots: boolean;

  setSlotsType(slotsType: string): void;
  setFetchingSlots(fetching: boolean): void;
  updateSlot(slotID: string, selectSlot: boolean, type?: string): void;

  fetchSlots(): void;
  submitSelectedSlots(): void;
}

export class SlotStore implements ISlotStore {
  constructor(rootStore: IRootStore) {
    console.log("%c slot store initialized...", "color: green;font-size: 18px");
    this.rootStore = rootStore;
  }

  rootStore: IRootStore;

  @observable currentSlotsType: string = "morn";
  @observable morningSlots: Slot[] = [];
  @observable afternoonSlots: Slot[] = [];
  @observable fetchingSlots: boolean = false;
  @observable submittingSlots = false;

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
  }

  @action setFetchingSlots(value: boolean) {
    this.fetchingSlots = value;
  }

  @action updateSlot(slotID: string, selectSlot: boolean, type?: string) {
    // check if u can select (exceeded slot lim)
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
          showToast(
            "error",
            "cant select slot",
            "You have already selected a slot on this date\n uncheck it to select the current one."
          );
          return;
        }
      }
      console.log("updateeeeeeeeeee");
      currSlot.type = type || this.currentSlotsType;
      currSlot.selected = selectSlot;
    }
  }

  fetchSlots = flow(function*(this: SlotStore) {
    this.fetchingSlots = true;
    try {
      const { data } = yield axios.get("/faculty/slots");
      console.log("Slots fetched", data);
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
    } catch (e) {
      showToast(
        "error",
        "Ooop! something went wrong!!",
        "Error while fetching slot data..Try refreshing!"
      );
      console.log(e);
    }
    this.fetchingSlots = false;
  });

  submitSelectedSlots = flow(function*(this: SlotStore) {
    this.submittingSlots = true;
    try {
      const { data } = yield axios.post("/faculty/select-slots", {
        slotIDs: this.selectedSlots.map((slot: Slot) => slot.id)
      });
      const { allotedSlots, errors } = data;
      console.log("Submit done!");
      console.log("Alloted ", allotedSlots);
      console.log("errors", errors);
      if (errors.length > 0) {
        showToast(
          "error",
          "Sorry some slots couldnt be selected",
          "",
          errors.map((el: any) => `${el.message} ${el.data}`)
        );
      }

      this.rootStore.userStore.updateAllotedSlots(allotedSlots);

      yield this.fetchSlots();
    } catch (e) {
      showToast(
        "error",
        "Error while selecting slots",
        "Couldn't select some slots..."
      );
      console.log(e);
    }
    this.submittingSlots = false;
  });
}
