"use client";

import { useEffect, useState } from "react";

export default function PanchangTestPage() {
  const [result, setResult] = useState<string>("Loading...");

  useEffect(() => {
    const run = async () => {
      const lines: string[] = [];
      
      try {
        lines.push("Step 1: Importing astronomy-engine...");
        const astro = await import("astronomy-engine");
        lines.push("  ✅ Import succeeded. Keys: " + Object.keys(astro).slice(0, 10).join(", "));
        
        lines.push("\nStep 2: Creating Observer...");
        const obs = new astro.Observer(28.6139, 77.2090, 0);
        lines.push("  ✅ Observer: " + JSON.stringify(obs));
        
        lines.push("\nStep 3: SearchRiseSet (sunrise)...");
        const checkTime = new Date();
        checkTime.setHours(6, 30, 0, 0);
        const sunrise = astro.SearchRiseSet(astro.Body.Sun, obs, +1, checkTime, 1);
        lines.push("  ✅ Sunrise result: " + (sunrise ? sunrise.date.toISOString() : "null"));
        
        lines.push("\nStep 4: SearchRiseSet (sunset)...");
        const sunset = astro.SearchRiseSet(astro.Body.Sun, obs, -1, checkTime, 1);
        lines.push("  ✅ Sunset result: " + (sunset ? sunset.date.toISOString() : "null"));
        
        lines.push("\nStep 5: Equator (Sun)...");
        const eqSun = astro.Equator(astro.Body.Sun, checkTime, obs, true, true);
        lines.push("  ✅ eqSun.ra=" + eqSun.ra + " dec=" + eqSun.dec);
        
        lines.push("\nStep 6: Equator (Moon)...");
        const eqMoon = astro.Equator(astro.Body.Moon, checkTime, obs, true, true);
        lines.push("  ✅ eqMoon.ra=" + eqMoon.ra + " dec=" + eqMoon.dec);
        
        lines.push("\nStep 7: Ecliptic (Sun)...");
        const eclipSun = astro.Ecliptic(eqSun.vec);
        lines.push("  ✅ eclipSun.elon=" + eclipSun.elon);
        
        lines.push("\nStep 8: Ecliptic (Moon)...");
        const eclipMoon = astro.Ecliptic(eqMoon.vec);
        lines.push("  ✅ eclipMoon.elon=" + eclipMoon.elon);
        
        lines.push("\nStep 9: Tithi calculation...");
        const AYANAMSA = 24.15;
        let siderealSun = eclipSun.elon - AYANAMSA;
        if (siderealSun < 0) siderealSun += 360;
        let siderealMoon = eclipMoon.elon - AYANAMSA;
        if (siderealMoon < 0) siderealMoon += 360;
        let diff = siderealMoon - siderealSun;
        if (diff < 0) diff += 360;
        const tithiIndex = Math.floor(diff / 12);
        const TITHIS = ["Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Purnima","Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Amavasya"];
        lines.push("  ✅ Tithi: " + (TITHIS[tithiIndex] || "unknown") + " (index=" + tithiIndex + ")");
        lines.push("  siderealSun=" + siderealSun + " siderealMoon=" + siderealMoon + " diff=" + diff);
        
        lines.push("\nStep 10: getDailyPanchang...");
        const { getDailyPanchang } = await import("@/lib/panchang");
        const panchang = getDailyPanchang();
        lines.push("  ✅ Full result:");
        lines.push(JSON.stringify(panchang, null, 2));
        
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        const stack = err instanceof Error ? err.stack : "";
        lines.push("\n❌ ERROR: " + msg);
        lines.push("Stack: " + stack);
      }
      
      setResult(lines.join("\n"));
    };
    
    run();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace", whiteSpace: "pre-wrap", fontSize: "13px", backgroundColor: "#1a1a1a", color: "#00ff00", minHeight: "100vh" }}>
      <h1 style={{ color: "#ffcc00", marginBottom: "1rem" }}>Panchang Debug Page</h1>
      {result}
    </div>
  );
}
