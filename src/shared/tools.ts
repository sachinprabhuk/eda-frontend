import { Slot } from "./interfaces";

export const readableDate = (date: Date) => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day} / ${month} / ${year}`;
};

// temp function

export const getSlots = (name: string) => {
  return new Promise<Slot[]>((resolve: any, reject: any) => {
    setTimeout(() => {
      if (name === "morning")
        resolve([
          { id: "1", date: new Date(2018, 6, 5), total: 10, remaining: 4 },
          { id: "2", date: new Date(2018, 6, 6), total: 10, remaining: 4 },
          { id: "3", date: new Date(2018, 6, 7), total: 10, remaining: 4 },
          { id: "4", date: new Date(2018, 6, 8), total: 10, remaining: 4 },
          { id: "5", date: new Date(2018, 6, 9), total: 10, remaining: 4 }
        ]);
      else
        resolve([
          { id: "6", date: new Date(2018, 6, 6), total: 10, remaining: 4 },
          { id: "7", date: new Date(2018, 6, 7), total: 10, remaining: 4 },
          { id: "8", date: new Date(2018, 6, 8), total: 10, remaining: 4 },
          { id: "9", date: new Date(2018, 6, 9), total: 10, remaining: 4 },
          { id: "10", date: new Date(2018, 6, 10), total: 10, remaining: 4 }
        ]);
    }, 200);
  });
};
