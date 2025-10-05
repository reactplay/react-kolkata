const isEventExpired = (end: string) => new Date(end).getTime() < Date.now();

const formatEventDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const formatEventTime = (date: string) =>
  new Date(date).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });

const DATE_UTILS = {
  isEventExpired,
  formatEventDate,
  formatEventTime,
};

export default DATE_UTILS;
