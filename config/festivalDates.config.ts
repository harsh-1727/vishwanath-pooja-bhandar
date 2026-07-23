export interface FestivalDateConfig {
  date: string; // YYYY-MM-DD
  name: string;
}

// These are accurate Hindu festival dates for upcoming years.
// Update this list annually.
export const festivalDatesConfig: FestivalDateConfig[] = [
  { date: "2026-08-15", name: "Hariyali Teej" },
  { date: "2026-08-17", name: "Nag Panchami" },
  { date: "2026-08-28", name: "Raksha Bandhan" },
  { date: "2026-09-04", name: "Janmashtami" },
  { date: "2026-09-14", name: "Ganesh Chaturthi" },
  { date: "2026-10-11", name: "Navratri" },
  { date: "2026-10-20", name: "Dussehra" },
  { date: "2026-10-29", name: "Karva Chauth" },
  { date: "2026-11-08", name: "Diwali" },
  { date: "2026-11-20", name: "Tulsi Vivah" },
  { date: "2027-01-14", name: "Makar Sankranti" },
  { date: "2027-03-06", name: "Mahashivratri" },
  { date: "2027-03-22", name: "Holi" }
];
