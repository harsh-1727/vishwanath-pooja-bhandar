const { Observer, Body, SearchRiseSet, Equator, Ecliptic } = require("astronomy-engine");

const date = new Date();
date.setHours(6, 30, 0, 0);

const LATITUDE = 28.6139;
const LONGITUDE = 77.2090;
const obs = new Observer(LATITUDE, LONGITUDE, 0);

const eqSun = Equator(Body.Sun, date, obs, true, true);
const eqMoon = Equator(Body.Moon, date, obs, true, true);

const eclipSun = Ecliptic(eqSun.vec);
const eclipMoon = Ecliptic(eqMoon.vec);

const AYANAMSA = 24.15; // rough estimate for now

let siderealSun = eclipSun.elon - AYANAMSA;
if (siderealSun < 0) siderealSun += 360;

let siderealMoon = eclipMoon.elon - AYANAMSA;
if (siderealMoon < 0) siderealMoon += 360;

// Tithi: (Moon - Sun) / 12
let diff = siderealMoon - siderealSun;
if (diff < 0) diff += 360;
const tithi = diff / 12;

// Karana: (Moon - Sun) / 6
const karana = diff / 6;

// Yoga: (Moon + Sun) / 13.333
let sum = siderealMoon + siderealSun;
if (sum >= 360) sum -= 360;
const yoga = sum / (13 + 1/3);

// Moon Sign (Rashi): Moon / 30
const rashi = siderealMoon / 30;

console.log("Tithi index", tithi);
console.log("Karana index", karana);
console.log("Yoga index", yoga);
console.log("Moon Sign index", rashi);
