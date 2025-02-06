export function getHour(timezone: string) {
  const partsTime = timezone.split(" ");
  return partsTime[0]
}

export function getTimeZone(timezone: string) {
  const partsTime = timezone.split(" ");
  return partsTime[1]
}
