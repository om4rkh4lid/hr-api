export const convertToMinutes = (hours: number, minutes: number) => {
  const hoursToMinutes = hours * 60;
  return hoursToMinutes + minutes;
};
