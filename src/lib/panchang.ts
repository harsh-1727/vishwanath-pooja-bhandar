import {
  Observer,
  Body,
  SearchRiseSet,
  Equator,
  Ecliptic
} from "astronomy-engine";
import { festivalDatesConfig } from "@/config";

const TITHIS = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
];

const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha",
  "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
  "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati",
  "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
  "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

const YOGAS = [
  "Vishkumbha", "Priti", "Ayushman", "Saubhagya", "Shobhana", 
  "Atiganda", "Sukarma", "Dhriti", "Shula", "Ganda", 
  "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", 
  "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva", 
  "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", 
  "Indra", "Vaidhriti"
];

const KARANAS = [
  "Bava", "Balava", "Kaulava", "Taitila", 
  "Gara", "Vanija", "Vishti", "Shakuni", 
  "Chatushpada", "Naga", "Kintughna"
];

const RASHIS = [
  "Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", 
  "Karka (Cancer)", "Simha (Leo)", "Kanya (Virgo)", 
  "Tula (Libra)", "Vrishchika (Scorpio)", "Dhanu (Sagittarius)", 
  "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"
];

// Reference coordinates: New Delhi, India
const LATITUDE = 28.6139;
const LONGITUDE = 77.2090;

export interface PanchangData {
  date: string;
  dayOfWeek: string;
  tithi: string;
  tithiPaksha: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  moonSign: string;
  sunrise: string;
  sunset: string;
  rahuKaal: string;
  festival: string;
  paksha: string;
  abhijitMuhurat: string | null;
  specialOccasion: string | null;
  upcomingFestivals: { name: string; date: string }[];
}

/**
 * Helper to format time consistently (works in both Node.js and browser).
 */
function formatTime(d: Date): string {
  const hours = d.getUTCHours() + 5; // IST offset
  const mins = d.getUTCMinutes() + 30;
  let h = hours + Math.floor(mins / 60);
  let m = mins % 60;
  if (m < 0) { m += 60; h -= 1; }
  if (h >= 24) h -= 24;
  if (h < 0) h += 24;
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

/**
 * Calculates current Panchang elements for a given date.
 * Wrapped entirely in try/catch to prevent silent failures.
 */
export function getDailyPanchang(date: Date = new Date()): PanchangData {
  // Calculate today's date string and festivals first (no external deps)
  const todayStr = date.toISOString().split("T")[0] || "";
  const upcomingFestivals = festivalDatesConfig
    .filter(f => f.date >= todayStr)
    .slice(0, 3);
  const nextFestival = upcomingFestivals.length > 0 ? upcomingFestivals[0]?.name || "" : "";

  // Default/fallback values
  let sunriseStr = "5:30 AM";
  let sunsetStr = "7:15 PM";
  let rahuStr = "1:30 PM - 3:00 PM";
  let abhijitStr: string | null = "11:50 AM - 12:38 PM";
  let tithiName = "—";
  let paksha = "—";
  let nakshatraName = "—";
  let yogaName = "—";
  let karanaName = "—";
  let moonSign = "—";
  let tithiIndex = -1;

  try {
    // Start search from midnight of the current day to ensure sunrise and sunset are on the same day
    const checkTime = new Date(date);
    checkTime.setHours(0, 0, 0, 0);

    const obs = new Observer(LATITUDE, LONGITUDE, 0);

    // 1. Calculate Sunrise & Sunset
    const sunrise = SearchRiseSet(Body.Sun, obs, +1, checkTime, 1);
    const sunset = SearchRiseSet(Body.Sun, obs, -1, checkTime, 1);
    
    if (sunrise) {
      sunriseStr = formatTime(sunrise.date);
    }
    if (sunset) {
      sunsetStr = formatTime(sunset.date);
    }

    if (sunrise && sunset) {
      const dayDurationMs = sunset.date.getTime() - sunrise.date.getTime();
      const partMs = dayDurationMs / 8;
      const dayOfWeek = checkTime.getDay();
      
      // Rahu Kaal periods: Sun=8, Mon=2, Tue=7, Wed=5, Thu=6, Fri=4, Sat=3
      const rahuPeriods = [7, 1, 6, 4, 5, 3, 2];
      
      const rahuStartMs = sunrise.date.getTime() + ((rahuPeriods[dayOfWeek] ?? 0) * partMs);
      const rahuEndMs = rahuStartMs + partMs;
      rahuStr = `${formatTime(new Date(rahuStartMs))} - ${formatTime(new Date(rahuEndMs))}`;

      // Abhijit Muhurat: ~24 min before and after local noon
      const localNoonMs = sunrise.date.getTime() + (dayDurationMs / 2);
      const abhijitStartMs = localNoonMs - (24 * 60 * 1000);
      const abhijitEndMs = localNoonMs + (24 * 60 * 1000);
      abhijitStr = `${formatTime(new Date(abhijitStartMs))} - ${formatTime(new Date(abhijitEndMs))}`;
    }

    // 2. Astronomical Longitudes calculated at Sunrise (or checkTime if sunrise not found)
    const calcTime = sunrise ? sunrise.date : checkTime;
    const eqSun = Equator(Body.Sun, calcTime, obs, true, true);
    const eqMoon = Equator(Body.Moon, calcTime, obs, true, true);
    
    const eclipSun = Ecliptic(eqSun.vec);
    const eclipMoon = Ecliptic(eqMoon.vec);
    
    // Ayanamsa (Lahiri approximation for 2026)
    const AYANAMSA = 24.15;
    
    let siderealSun = eclipSun.elon - AYANAMSA;
    if (siderealSun < 0) siderealSun += 360;
    
    let siderealMoon = eclipMoon.elon - AYANAMSA;
    if (siderealMoon < 0) siderealMoon += 360;

    // 3. Calculate Tithi
    let diff = siderealMoon - siderealSun;
    if (diff < 0) diff += 360;
    
    tithiIndex = Math.floor(diff / 12);
    tithiName = TITHIS[tithiIndex] || "Pratipada";
    paksha = tithiIndex < 15 ? "Shukla Paksha" : "Krishna Paksha";

    // 4. Calculate Nakshatra
    const nakshatraIndex = Math.floor(siderealMoon / (13 + 1/3));
    nakshatraName = NAKSHATRAS[nakshatraIndex] || "Ashwini";

    // 5. Calculate Yoga
    let sum = siderealMoon + siderealSun;
    if (sum >= 360) sum -= 360;
    const yogaIndex = Math.floor(sum / (13 + 1/3));
    yogaName = YOGAS[yogaIndex] || "Vishkumbha";

    // 6. Calculate Karana
    const karanaDiff = diff / 6;
    const karanaAbsoluteIndex = Math.floor(karanaDiff);
    if (karanaAbsoluteIndex === 0) {
      karanaName = KARANAS[10] || "";
    } else if (karanaAbsoluteIndex >= 57) {
      if (karanaAbsoluteIndex === 57) karanaName = KARANAS[7] || "";
      else if (karanaAbsoluteIndex === 58) karanaName = KARANAS[8] || "";
      else if (karanaAbsoluteIndex === 59) karanaName = KARANAS[9] || "";
    } else {
      const cycleIndex = (karanaAbsoluteIndex - 1) % 7;
      karanaName = KARANAS[cycleIndex] || "";
    }

    // 7. Calculate Moon Sign (Rashi)
    const rashiIndex = Math.floor(siderealMoon / 30);
    moonSign = RASHIS[rashiIndex] || "Mesha (Aries)";

  } catch (e) {
    console.error("[Panchang] Calculation error:", e);
  }

  // 8. Determine special occasion
  let specialOccasion: string | null = null;
  const todayFest = festivalDatesConfig.find(f => f.date === todayStr);
  
  if (todayFest) {
    specialOccasion = todayFest.name;
  } else if (tithiIndex === 14) {
    specialOccasion = "Purnima Vrat";
  } else if (tithiIndex === 29) {
    specialOccasion = "Amavasya";
  } else if (tithiIndex === 10 || tithiIndex === 25) {
    specialOccasion = "Ekadashi Vrat";
  }

  return {
    date: date.toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' }),
    dayOfWeek: date.toLocaleDateString("en-IN", { weekday: 'long' }),
    tithi: tithiName,
    tithiPaksha: paksha,
    nakshatra: nakshatraName,
    yoga: yogaName,
    karana: karanaName,
    moonSign: moonSign,
    sunrise: sunriseStr,
    sunset: sunsetStr,
    rahuKaal: rahuStr,
    festival: nextFestival,
    paksha: paksha,
    abhijitMuhurat: abhijitStr,
    specialOccasion: specialOccasion,
    upcomingFestivals: upcomingFestivals
  };
}
