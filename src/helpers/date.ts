import { format } from "date-fns/format";

export const dateToDateString = (bookedDate: Date) =>
  `${bookedDate.getFullYear()}-${bookedDate.getMonth() + 1}-${bookedDate.getDate().toString().padStart(2, "0")}`;

export const dateStringToDate = (dateString: string) =>
  new Date(`${dateString}T00:00:00`);

export const formatDate = (date: Date) => format(date, "do MMMM yyyy");
