export interface Slot {
  id: string
  date: Date;
  total: number;
  remaining: number;
  selected?: boolean 
  type?: string
}

export interface Faculty {
  id: string
  name: string
  selections: Slot[]
  slotLim: {
    mornMax: number, aftMax: number
  }
}
