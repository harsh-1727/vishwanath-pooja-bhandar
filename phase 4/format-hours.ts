/**
 * src/lib/utils/format-hours.ts
 *
 * Converts the structured WeeklyHours from contact.config.ts into
 * human-readable display strings. Today all seven days share the
 * same hours, so this collapses them into a single "Open daily" line
 * — but it stays fully correct if a future edit makes any day
 * different, falling back to a per-day list automatically. No
 * component should ever need to change when the owner's hours change
 * shape; only contact.config.ts does.
 */

import type { WeeklyHours, DaySchedule, DayOfWeek } from "@/config";

const DAY_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const satisfies readonly DayOfWeek[];

const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function formatTime(time: string): string {
  const [hoursStr, minutesStr] = time.split(":");
  const hours = Number(hoursStr ?? 0);
  const minutes = Number(minutesStr ?? 0);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const minuteLabel = minutes === 0 ? "" : `:${minutes.toString().padStart(2, "0")}`;
  return `${hour12}${minuteLabel} ${period}`;
}

function scheduleKey(schedule: DaySchedule): string {
  if ("closed" in schedule && schedule.closed) return "closed";
  return `${schedule.open}-${schedule.close}`;
}

export function formatWeeklyHours(hours: WeeklyHours): string {
  const keys = DAY_ORDER.map((day) => scheduleKey(hours[day]));
  const allSame = keys.every((key) => key === keys[0]);

  if (allSame) {
    const monday = hours[DAY_ORDER[0]];
    if ("closed" in monday && monday.closed) return "Closed";
    return `Open daily, ${formatTime(monday.open)} \u2013 ${formatTime(monday.close)}`;
  }

  return DAY_ORDER.map((day) => {
    const schedule = hours[day];
    const label = DAY_LABELS[day];
    if ("closed" in schedule && schedule.closed) return `${label}: Closed`;
    return `${label}: ${formatTime(schedule.open)} \u2013 ${formatTime(schedule.close)}`;
  }).join(", ");
}

/** Used by a future "Open now" badge — not yet wired into UI, but the logic is ready. */
export function isOpenNow(hours: WeeklyHours, now: Date = new Date()): boolean {
  const jsDayIndex = now.getDay(); // 0 = Sunday
  const mondayFirstIndex = (jsDayIndex + 6) % 7;
  const dayKey = DAY_ORDER[mondayFirstIndex];
  if (!dayKey) return false;

  const schedule = hours[dayKey];
  if ("closed" in schedule && schedule.closed) return false;

  const [openH, openM] = schedule.open.split(":").map(Number);
  const [closeH, closeM] = schedule.close.split(":").map(Number);
  if (
    openH === undefined ||
    openM === undefined ||
    closeH === undefined ||
    closeM === undefined
  ) {
    return false;
  }

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return nowMinutes >= openH * 60 + openM && nowMinutes <= closeH * 60 + closeM;
}
