export function formatDateTime(timestamp: Date, timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: timezone,
    timeZoneName: "short",
  }).format(new Date(timestamp));
}
