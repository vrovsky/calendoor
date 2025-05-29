export function formatEventDescription(duration_in_minutes: number) {
  const hours = Math.floor(duration_in_minutes / 60);
  const minutes = duration_in_minutes % 60;
  const minutesString = `${minutes} ${minutes > 1 ? "mins" : "min"}`;
  const hoursString = `${hours} ${hours > 1 ? "hrs" : "hr"}`;
  return `${hoursString} ${minutesString}`;
}
