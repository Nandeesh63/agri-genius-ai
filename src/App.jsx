import { useState, useEffect, useRef } from "react";

// ============================================================
// AGRI GENIUS AI – SMART FARMER PLATFORM
// Production-Ready React Application
// ============================================================

const COLORS = {
  primary: "#1a6b2e",
  secondary: "#e8f5e9",
  accent: "#f9a825",
  accent2: "#ef6c00",
  red: "#c62828",
  blue: "#1565c0",
  teal: "#00695c",
  bg: "#f1f8e9",
  card: "#ffffff",
  dark: "#1b2e1c",
  text: "#1a2e1b",
  muted: "#5a7a5b",
  border: "#c8e6c9",
};

const TRANSLATIONS = {
  en: {
    appName: "AgriGenius AI",
    tagline: "Smart Farmer Platform",
    dashboard: "Dashboard",
    soilScanner: "Soil Scanner",
    satellite: "Satellite Monitor",
    cropAI: "Crop AI",
    mandiPrice: "Mandi Prices",
    fertilizer: "Fertilizer",
    weather: "Weather",
    pestDetection: "Pest Detection",
    profitAnalyzer: "Profit Analyzer",
    farmMap: "Farm Map",
    govSchemes: "Gov Schemes",
    voiceAssistant: "Voice Assistant",
    alerts: "Smart Alerts",
    marketplace: "Marketplace",
    greeting: "Good Morning, Farmer!",
    soilHealth: "Soil Health",
    cropHealth: "Crop Health",
    marketPrice: "Market Price",
    pestAlert: "Pest Alert",
    profit: "Est. Profit",
    uploadSoil: "Upload Soil Photo",
    analyzing: "Analyzing...",
    soilResult: "Soil Analysis Result",
    uploadCrop: "Upload Crop Photo",
    scanSoil: "Scan My Soil",
    detectPest: "Detect Pest/Disease",
    calculateProfit: "Calculate Profit",
    findSchemes: "Find Schemes",
    speakNow: "Speak Now",
    listening: "Listening...",
  },
  kn: {
    appName: "ಅಗ್ರಿಜೀನಿಯಸ್ AI",
    tagline: "ಸ್ಮಾರ್ಟ್ ರೈತ ವೇದಿಕೆ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    soilScanner: "ಮಣ್ಣು ಸ್ಕ್ಯಾನರ್",
    satellite: "ಉಪಗ್ರಹ",
    cropAI: "ಬೆಳೆ AI",
    mandiPrice: "ಮಂಡಿ ಬೆಲೆ",
    fertilizer: "ಗೊಬ್ಬರ",
    weather: "ಹವಾಮಾನ",
    pestDetection: "ಕೀಟ ಪತ್ತೆ",
    profitAnalyzer: "ಲಾಭ ವಿಶ್ಲೇಷಕ",
    farmMap: "ಜಮೀನು ನಕ್ಷೆ",
    govSchemes: "ಸರ್ಕಾರ ಯೋಜನೆ",
    voiceAssistant: "ಧ್ವನಿ ಸಹಾಯಕ",
    alerts: "ಎಚ್ಚರಿಕೆಗಳು",
    marketplace: "ಮಾರುಕಟ್ಟೆ",
    greeting: "ನಮಸ್ಕಾರ, ರೈತರೇ!",
    soilHealth: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ",
    cropHealth: "ಬೆಳೆ ಆರೋಗ್ಯ",
    marketPrice: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
    pestAlert: "ಕೀಟ ಎಚ್ಚರಿಕೆ",
    profit: "ಅಂದಾಜು ಲಾಭ",
    uploadSoil: "ಮಣ್ಣಿನ ಫೋಟೋ ಅಪ್‌ಲೋಡ್",
    analyzing: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    soilResult: "ಮಣ್ಣು ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶ",
    uploadCrop: "ಬೆಳೆ ಫೋಟೋ ಅಪ್‌ಲೋಡ್",
    scanSoil: "ಮಣ್ಣು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    detectPest: "ಕೀಟ ಪತ್ತೆಹಚ್ಚಿ",
    calculateProfit: "ಲಾಭ ಲೆಕ್ಕಿಸಿ",
    findSchemes: "ಯೋಜನೆ ಹುಡುಕಿ",
    speakNow: "ಮಾತನಾಡಿ",
    listening: "ಕೇಳುತ್ತಿದ್ದೇನೆ...",
  },
  hi: {
    appName: "एग्री जीनियस AI",
    tagline: "स्मार्ट किसान प्लेटफॉर्म",
    dashboard: "डैशबोर्ड",
    soilScanner: "मिट्टी स्कैनर",
    satellite: "उपग्रह",
    cropAI: "फसल AI",
    mandiPrice: "मंडी भाव",
    fertilizer: "उर्वरक",
    weather: "मौसम",
    pestDetection: "कीट पहचान",
    profitAnalyzer: "लाभ विश्लेषक",
    farmMap: "खेत नक्शा",
    govSchemes: "सरकारी योजना",
    voiceAssistant: "आवाज़ सहायक",
    alerts: "अलर्ट",
    marketplace: "बाज़ार",
    greeting: "नमस्ते, किसान भाई!",
    soilHealth: "मिट्टी स्वास्थ्य",
    cropHealth: "फसल स्वास्थ्य",
    marketPrice: "बाज़ार भाव",
    pestAlert: "कीट चेतावनी",
    profit: "अनुमानित लाभ",
    uploadSoil: "मिट्टी फोटो अपलोड",
    analyzing: "विश्लेषण हो रहा है...",
    soilResult: "मिट्टी विश्लेषण परिणाम",
    uploadCrop: "फसल फोटो अपलोड",
    scanSoil: "मिट्टी स्कैन करें",
    detectPest: "कीट पहचानें",
    calculateProfit: "लाभ गणना करें",
    findSchemes: "योजना खोजें",
    speakNow: "बोलें",
    listening: "सुन रहा हूं...",
  },
};

// Icons as SVG components
const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const icons = {
    leaf: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    sun: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    cloud: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    bug: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="8" y="6" width="8" height="14" rx="4" />
        <path d="m19 7-3 2"/><path d="m5 7 3 2"/><path d="m19 19-3-2"/><path d="m5 19 3-2"/>
        <path d="M20 13h-4"/><path d="M4 13h4"/><path d="m8 6-1-4"/><path d="m16 6 1-4"/>
      </svg>
    ),
    trending: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    map: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
    mic: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
    shop: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
        <path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
      </svg>
    ),
    bell: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    dollar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    satellite: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M13 7 9 3 5 7l4 4" /><path d="m17 11 4 4-4 4-4-4" />
        <path d="m8 12 4 4 6-6-4-4Z" /><path d="m16 8 3-3" /><path d="M9 21a6 6 0 0 0-6-6" />
      </svg>
    ),
    flask: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M9 3h6l1 7H8L9 3z" />
        <path d="M8 10c-1.5 2-2 3.5-2 5 0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.5-.5-3-2-5" />
        <path d="M10 15h4" />
      </svg>
    ),
    govt: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    camera: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    chart: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
    close: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    menu: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    rain: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <line x1="16" y1="13" x2="16" y2="21" /><line x1="8" y1="13" x2="8" y2="21" /><line x1="12" y1="15" x2="12" y2="23" />
        <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
      </svg>
    ),
    wind: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
      </svg>
    ),
    drop: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
      </svg>
    ),
  };
  return icons[name] || <span>{name}</span>;
};

// Circular progress component
const CircularProgress = ({ value, max = 100, size = 80, color = COLORS.primary, label }) => {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / max) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e0e0e0" strokeWidth={8} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        <text x={size / 2} y={size / 2 + 6} textAnchor="middle" fill={color}
          fontSize={size * 0.22} fontWeight="bold">{value}%</text>
      </svg>
      {label && <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, textAlign: "center" }}>{label}</div>}
    </div>
  );
};

// Mini chart bar
const MiniBar = ({ data, color = COLORS.primary, height = 40 }) => {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1, background: i === data.length - 1 ? color : color + "60",
          height: `${(v / max) * 100}%`, borderRadius: "2px 2px 0 0", minWidth: 6,
          transition: "height 0.5s ease"
        }} />
      ))}
    </div>
  );
};

// Badge component
const Badge = ({ children, color = COLORS.primary, bg }) => (
  <span style={{
    background: bg || color + "20", color, fontSize: 11, fontWeight: 700,
    padding: "2px 8px", borderRadius: 20, letterSpacing: 0.5
  }}>{children}</span>
);

// Card component
const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: COLORS.card, borderRadius: 16, padding: 16,
    boxShadow: "0 2px 12px rgba(26,107,46,0.08)", border: `1px solid ${COLORS.border}`,
    cursor: onClick ? "pointer" : "default",
    transition: "transform 0.15s, box-shadow 0.15s",
    ...style
  }}
    onMouseEnter={e => onClick && (e.currentTarget.style.transform = "translateY(-2px)")}
    onMouseLeave={e => onClick && (e.currentTarget.style.transform = "translateY(0)")}
  >{children}</div>
);

// AI Analysis with Claude API
const useClaudeAI = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyze = async (prompt, systemPrompt) => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt || "You are AgriGenius AI, an expert agricultural advisor for Indian farmers. Provide practical, actionable advice. Always respond in the same language the user writes in. Format responses clearly with emojis for better readability.",
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "No response";
      setResult(text);
    } catch (e) {
      setError("AI service unavailable. Please try again.");
    }
    setLoading(false);
  };

  return { analyze, loading, result, error, setResult };
};

// ============================================================
// MODULES
// ============================================================

// 1. DASHBOARD
const Dashboard = ({ t, lang }) => {
  const stats = [
    { label: t.soilHealth, value: 78, color: COLORS.primary, icon: "leaf" },
    { label: t.cropHealth, value: 85, color: COLORS.teal, icon: "leaf" },
    { label: "Water Level", value: 62, color: COLORS.blue, icon: "drop" },
    { label: "Pest Risk", value: 15, color: COLORS.red, icon: "bug" },
  ];

  const weather = { temp: 28, humidity: 72, rain: 40, wind: 12, condition: "Partly Cloudy" };

  const mandiPrices = [
    { crop: lang === "kn" ? "ಟೊಮ್ಯಾಟೊ" : lang === "hi" ? "टमाटर" : "Tomato", price: 2400, change: +200, market: "Mysuru" },
    { crop: lang === "kn" ? "ಆಲೂ" : lang === "hi" ? "आलू" : "Potato", price: 1800, change: -100, market: "Bengaluru" },
    { crop: lang === "kn" ? "ಈರುಳ್ಳಿ" : lang === "hi" ? "प्याज़" : "Onion", price: 3200, change: +350, market: "Davanagere" },
    { crop: lang === "kn" ? "ಮೆಣಸಿನಕಾಯಿ" : lang === "hi" ? "मिर्च" : "Chilli", price: 8500, change: +600, market: "Mandya" },
  ];

  const alerts = [
    { type: "warning", msg: lang === "kn" ? "⚠️ ನಾಳೆ ಭಾರಿ ಮಳೆ ಸಾಧ್ಯತೆ" : lang === "hi" ? "⚠️ कल भारी बारिश की संभावना" : "⚠️ Heavy rain forecast tomorrow", color: "#f57f17" },
    { type: "danger", msg: lang === "kn" ? "🐛 ಹತ್ತಿರದ ಜಮೀನಿನಲ್ಲಿ ಕೀಟ ಪತ್ತೆ" : lang === "hi" ? "🐛 पास के खेत में कीट मिले" : "🐛 Pest outbreak in nearby farms", color: COLORS.red },
    { type: "success", msg: lang === "kn" ? "📈 ಟೊಮ್ಯಾಟೊ ಬೆಲೆ 15% ಹೆಚ್ಚಾಗಿದೆ" : lang === "hi" ? "📈 टमाटर भाव 15% बढ़ा" : "📈 Tomato prices up 15% today", color: COLORS.teal },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Greeting */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.teal})`,
        borderRadius: 20, padding: "20px 20px 16px", color: "white",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", right: -20, top: -20, opacity: 0.15, fontSize: 120 }}>🌾</div>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{t.greeting}</div>
        <div style={{ fontSize: 13, opacity: 0.85 }}>
          {lang === "kn" ? "ಇಂದಿನ ಹವಾಮಾನ: " : lang === "hi" ? "आज का मौसम: " : "Today: "}
          {weather.condition} • {weather.temp}°C
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20 }}>💧</div>
            <div style={{ fontSize: 12 }}>{weather.humidity}%</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20 }}>🌧️</div>
            <div style={{ fontSize: 12 }}>{weather.rain}%</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20 }}>💨</div>
            <div style={{ fontSize: 12 }}>{weather.wind} km/h</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20 }}>☀️</div>
            <div style={{ fontSize: 12 }}>{weather.temp}°C</div>
          </div>
        </div>
      </div>

      {/* Health circles */}
      <Card>
        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>
          {lang === "kn" ? "🌱 ಜಮೀನಿನ ಆರೋಗ್ಯ" : lang === "hi" ? "🌱 खेत का स्वास्थ्य" : "🌱 Farm Health Overview"}
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {stats.map(s => <CircularProgress key={s.label} value={s.value} color={s.color} label={s.label} size={72} />)}
        </div>
      </Card>

      {/* Alerts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {alerts.map((a, i) => (
          <div key={i} style={{
            background: a.color + "15", border: `1px solid ${a.color}40`,
            borderRadius: 12, padding: "10px 14px", fontSize: 13, fontWeight: 600, color: a.color
          }}>{a.msg}</div>
        ))}
      </div>

      {/* Mandi Prices */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>
            💹 {t.marketPrice}
          </div>
          <Badge color={COLORS.primary}>LIVE</Badge>
        </div>
        {mandiPrices.map((p, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "8px 0", borderBottom: i < mandiPrices.length - 1 ? `1px solid ${COLORS.border}` : "none"
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{p.crop}</div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>{p.market}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: COLORS.dark }}>₹{p.price}/q</div>
              <div style={{ fontSize: 12, color: p.change > 0 ? COLORS.teal : COLORS.red, fontWeight: 600 }}>
                {p.change > 0 ? "▲" : "▼"} ₹{Math.abs(p.change)}
              </div>
            </div>
          </div>
        ))}
      </Card>

      {/* Profit estimate */}
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.accent}20, ${COLORS.accent2}10)`, border: `1px solid ${COLORS.accent}40` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 36 }}>💰</div>
          <div>
            <div style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>
              {lang === "kn" ? "ಈ ಋತುವಿನ ಅಂದಾಜು ಲಾಭ" : lang === "hi" ? "इस सीज़न का अनुमानित लाभ" : "Estimated Profit This Season"}
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.accent2 }}>₹ 84,500</div>
            <div style={{ fontSize: 11, color: COLORS.teal }}>▲ 23% vs last season</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// 2. SOIL SCANNER
const SoilScanner = ({ t, lang }) => {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const { analyze, loading, result: aiResult, error } = useClaudeAI();
  const fileRef = useRef();

  const handleImage = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target.result);
    reader.readAsDataURL(f);
  };

  const handleAnalyze = async () => {
    if (!image) return;
    const prompt = lang === "kn"
      ? "ರೈತನ ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ ಮಾಡಿ. ಮಣ್ಣಿನ ವಿಧ, pH, NPK ಅಂದಾಜು, ಆರೋಗ್ಯ ಸ್ಕೋರ್, ಉತ್ತಮ ಬೆಳೆಗಳು, ಮತ್ತು ಗೊಬ್ಬರದ ಶಿಫಾರಸು ನೀಡಿ."
      : lang === "hi"
        ? "किसान की मिट्टी का विश्लेषण करें। मिट्टी प्रकार, pH, NPK, स्वास्थ्य स्कोर, सर्वोत्तम फसल और उर्वरक सलाह दें।"
        : "Analyze this soil image for an Indian farmer. Provide: Soil Type, pH estimate (0-14), NPK levels (Low/Medium/High), Soil Health Score (0-100), Top 5 recommended crops, fertilizer requirements, and organic improvement tips. Use simple language.";
    await analyze(prompt);
  };

  useEffect(() => {
    if (aiResult) setResult(aiResult);
  }, [aiResult]);

  const mockResult = {
    soilType: "Red Laterite Soil",
    ph: "6.2 – 6.8",
    nitrogen: "Medium", phosphorus: "Low", potassium: "High",
    score: 72,
    crops: ["Ragi", "Groundnut", "Turmeric", "Maize", "Millets"],
    fertilizer: "Apply DAP 50kg/acre + Urea 30kg/acre",
    organic: "Add 2 tons of farm yard manure per acre before sowing",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg, #4e342e20, #8d6e6320)` }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#4e342e", marginBottom: 8 }}>
          🔬 {t.soilScanner}
        </div>
        <div style={{ fontSize: 13, color: COLORS.muted }}>
          {lang === "kn" ? "ಮಣ್ಣಿನ ಫೋಟೋ ತೆಗೆದು AI ವಿಶ್ಲೇಷಣೆ ಪಡೆಯಿರಿ"
            : lang === "hi" ? "मिट्टी की फोटो खींचकर AI विश्लेषण पाएं"
              : "Take a photo of your soil to get AI-powered analysis"}
        </div>
      </Card>

      {/* Upload area */}
      <div onClick={() => fileRef.current.click()} style={{
        border: `2px dashed ${COLORS.primary}`, borderRadius: 16,
        padding: 32, textAlign: "center", cursor: "pointer",
        background: image ? "transparent" : COLORS.secondary,
        position: "relative", overflow: "hidden"
      }}>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImage} />
        {image ? (
          <img src={image} alt="soil" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 12, objectFit: "cover" }} />
        ) : (
          <div>
            <div style={{ fontSize: 48, marginBottom: 8 }}>📷</div>
            <div style={{ color: COLORS.primary, fontWeight: 700, fontSize: 15 }}>{t.uploadSoil}</div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>
              {lang === "kn" ? "ಅಥವಾ ಕ್ಯಾಮೆರಾ ಬಳಸಿ" : lang === "hi" ? "या कैमरा इस्तेमाल करें" : "or take a photo with camera"}
            </div>
          </div>
        )}
      </div>

      {image && (
        <button onClick={handleAnalyze} disabled={loading} style={{
          background: loading ? "#ccc" : `linear-gradient(135deg, #4e342e, #8d6e63)`,
          color: "white", border: "none", borderRadius: 12, padding: "14px 24px",
          fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8
        }}>
          {loading ? <span>🔄 {t.analyzing}</span> : <span>🔬 {t.scanSoil}</span>}
        </button>
      )}

      {/* Show mock result always + AI result if available */}
      {(image || true) && (
        <Card>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#4e342e", marginBottom: 12 }}>
            📊 {t.soilResult}
            {!result && <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 500 }}> (Sample)</span>}
          </div>
          {result ? (
            <div style={{ fontSize: 13, lineHeight: 1.7, color: COLORS.text, whiteSpace: "pre-wrap" }}>{result}</div>
          ) : (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                {[
                  { label: "Soil Type", value: mockResult.soilType, icon: "🪨" },
                  { label: "pH Level", value: mockResult.ph, icon: "⚗️" },
                  { label: "Nitrogen (N)", value: mockResult.nitrogen, icon: "🟡" },
                  { label: "Phosphorus (P)", value: mockResult.phosphorus, icon: "🔴" },
                  { label: "Potassium (K)", value: mockResult.potassium, icon: "🟢" },
                  { label: "Health Score", value: `${mockResult.score}/100`, icon: "💯" },
                ].map(item => (
                  <div key={item.label} style={{ background: COLORS.secondary, borderRadius: 10, padding: 10 }}>
                    <div style={{ fontSize: 18 }}>{item.icon}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary, marginBottom: 6 }}>🌾 Best Crops</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {mockResult.crops.map(c => <Badge key={c} color={COLORS.primary}>{c}</Badge>)}
                </div>
              </div>
              <div style={{ background: "#fff3e0", borderRadius: 10, padding: 10, marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent2 }}>💊 Fertilizer Advice</div>
                <div style={{ fontSize: 12, color: COLORS.text, marginTop: 4 }}>{mockResult.fertilizer}</div>
              </div>
              <div style={{ background: "#e8f5e9", borderRadius: 10, padding: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary }}>🌿 Organic Tip</div>
                <div style={{ fontSize: 12, color: COLORS.text, marginTop: 4 }}>{mockResult.organic}</div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

// 3. SATELLITE MONITOR
const SatelliteMonitor = ({ t, lang }) => {
  const [selectedZone, setSelectedZone] = useState(null);
  const zones = [
    { id: 1, x: 15, y: 20, w: 30, h: 25, health: "healthy", ndvi: 0.78, label: "Zone A" },
    { id: 2, x: 50, y: 15, w: 25, h: 30, health: "moderate", ndvi: 0.52, label: "Zone B" },
    { id: 3, x: 20, y: 55, w: 35, h: 25, health: "stressed", ndvi: 0.31, label: "Zone C" },
    { id: 4, x: 60, y: 55, w: 30, h: 30, health: "healthy", ndvi: 0.81, label: "Zone D" },
  ];

  const healthColor = { healthy: "#2e7d32", moderate: "#f9a825", stressed: "#c62828" };
  const healthBg = { healthy: "#e8f5e9", moderate: "#fff8e1", stressed: "#ffebee" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg, #0d47a120, #1565c020)` }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#0d47a1", marginBottom: 4 }}>
          🛰️ {t.satellite}
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted }}>
          {lang === "kn" ? "ನಿಮ್ಮ ಜಮೀನಿನ ಉಪಗ್ರಹ ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆ" : lang === "hi" ? "आपके खेत का उपग्रह चित्र विश्लेषण" : "Real-time satellite analysis of your farm"}
        </div>
      </Card>

      {/* NDVI Map */}
      <Card>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: COLORS.text }}>
          🗺️ NDVI Vegetation Map
        </div>
        <div style={{
          position: "relative", width: "100%", paddingBottom: "60%",
          background: "linear-gradient(135deg, #a5d6a7, #81c784, #66bb6a)",
          borderRadius: 12, overflow: "hidden"
        }}>
          {/* Simulated farm map */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"300\"><rect width=\"400\" height=\"300\" fill=\"%23e8f5e9\"/><rect x=\"20\" y=\"20\" width=\"150\" height=\"80\" fill=\"%232e7d32\" rx=\"8\" opacity=\"0.7\"/><rect x=\"180\" y=\"15\" width=\"100\" height=\"90\" fill=\"%23f9a825\" rx=\"8\" opacity=\"0.7\"/><rect x=\"30\" y=\"120\" width=\"140\" height=\"80\" fill=\"%23c62828\" rx=\"8\" opacity=\"0.6\"/><rect x=\"200\" y=\"125\" width=\"120\" height=\"90\" fill=\"%232e7d32\" rx=\"8\" opacity=\"0.7\"/><text x=\"80\" y=\"68\" fill=\"white\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Zone A</text><text x=\"230\" y=\"65\" fill=\"white\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Zone B</text><text x=\"100\" y=\"165\" fill=\"white\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Zone C</text><text x=\"260\" y=\"172\" fill=\"white\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">Zone D</text></svg>')", backgroundSize: "cover" }} />
          {zones.map(z => (
            <div key={z.id} onClick={() => setSelectedZone(z === selectedZone ? null : z)}
              style={{
                position: "absolute", left: `${z.x}%`, top: `${z.y}%`,
                width: `${z.w}%`, height: `${z.h}%`,
                background: healthColor[z.health] + "40",
                border: `2px solid ${healthColor[z.health]}`,
                borderRadius: 8, cursor: "pointer",
                boxShadow: selectedZone?.id === z.id ? `0 0 0 3px ${healthColor[z.health]}` : "none"
              }} />
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 12, marginTop: 10, justifyContent: "center" }}>
          {[["healthy", "🟢 Healthy"], ["moderate", "🟡 Moderate"], ["stressed", "🔴 Stressed"]].map(([k, l]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: healthColor[k] }} />
              {l}
            </div>
          ))}
        </div>
      </Card>

      {/* Zone detail */}
      {selectedZone && (
        <Card style={{ background: healthBg[selectedZone.health], border: `1px solid ${healthColor[selectedZone.health]}40` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: healthColor[selectedZone.health], marginBottom: 10 }}>
            📍 {selectedZone.label} Analysis
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "NDVI Index", value: selectedZone.ndvi.toFixed(2) },
              { label: "Health Status", value: selectedZone.health.toUpperCase() },
              { label: "Water Stress", value: selectedZone.ndvi < 0.4 ? "HIGH" : "LOW" },
              { label: "Moisture", value: selectedZone.ndvi > 0.6 ? "Adequate" : "Deficient" },
            ].map(item => (
              <div key={item.label} style={{ background: "white", borderRadius: 10, padding: 10 }}>
                <div style={{ fontSize: 11, color: COLORS.muted }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{item.value}</div>
              </div>
            ))}
          </div>
          {selectedZone.health === "stressed" && (
            <div style={{ marginTop: 10, background: "#ffebee", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.red }}>⚠️ Action Required</div>
              <div style={{ fontSize: 12, color: COLORS.text, marginTop: 4 }}>
                Irrigate immediately. Check for pest infestation. Apply foliar spray of micronutrients.
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { label: "Avg NDVI", value: "0.63", icon: "🌿", color: COLORS.primary },
          { label: "Healthy Area", value: "68%", icon: "✅", color: COLORS.teal },
          { label: "Water Stress", value: "22%", icon: "💧", color: COLORS.blue },
          { label: "Pest Risk", value: "Low", icon: "🐛", color: COLORS.accent2 },
        ].map(s => (
          <Card key={s.label} style={{ padding: 14 }}>
            <div style={{ fontSize: 24 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: COLORS.muted }}>{s.label}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// 4. CROP AI
const CropAI = ({ t, lang }) => {
  const [form, setForm] = useState({ soil: "red", rainfall: "medium", region: "karnataka", temp: "warm", season: "kharif" });
  const { analyze, loading, result, error } = useClaudeAI();

  const handleSubmit = () => {
    const prompt = lang === "kn"
      ? `ಮಣ್ಣಿನ ಪ್ರಕಾರ: ${form.soil}, ಮಳೆ: ${form.rainfall}, ಪ್ರದೇಶ: ${form.region}, ತಾಪಮಾನ: ${form.temp}, ಋತು: ${form.season}. ಭಾರತೀಯ ರೈತರಿಗೆ ಉತ್ತಮ 5 ಬೆಳೆಗಳನ್ನು ಸೂಚಿಸಿ. ಪ್ರತಿ ಬೆಳೆಗೆ ಅಂದಾಜು ಇಳುವರಿ ಮತ್ತು ಬೆಲೆ ತಿಳಿಸಿ.`
      : lang === "hi"
        ? `मिट्टी: ${form.soil}, वर्षा: ${form.rainfall}, क्षेत्र: ${form.region}, तापमान: ${form.temp}, सीज़न: ${form.season}. भारतीय किसान के लिए शीर्ष 5 फसल सुझाएं। प्रत्येक फसल की उपज और बाज़ार भाव बताएं।`
        : `Soil: ${form.soil}, Rainfall: ${form.rainfall}, Region: ${form.region}, Temperature: ${form.temp}, Season: ${form.season}. Recommend top 5 crops for an Indian farmer with estimated yield per acre and current market price. Include sowing tips.`;
    analyze(prompt);
  };

  const fields = [
    { key: "soil", label: lang === "kn" ? "ಮಣ್ಣಿನ ಪ್ರಕಾರ" : lang === "hi" ? "मिट्टी प्रकार" : "Soil Type", options: ["red", "black", "alluvial", "sandy", "loamy"] },
    { key: "rainfall", label: lang === "kn" ? "ಮಳೆ" : lang === "hi" ? "वर्षा" : "Rainfall", options: ["low", "medium", "high"] },
    { key: "region", label: lang === "kn" ? "ಪ್ರದೇಶ" : lang === "hi" ? "क्षेत्र" : "Region", options: ["karnataka", "maharashtra", "punjab", "rajasthan", "up"] },
    { key: "temp", label: lang === "kn" ? "ತಾಪಮಾನ" : lang === "hi" ? "तापमान" : "Temperature", options: ["cool", "warm", "hot"] },
    { key: "season", label: lang === "kn" ? "ಋತು" : lang === "hi" ? "सीज़न" : "Season", options: ["kharif", "rabi", "zaid"] },
  ];

  const suggestedCrops = [
    { name: "Ragi", yield: "18-20 q/acre", price: "₹3,200/q", profit: "High", icon: "🌾" },
    { name: "Groundnut", yield: "8-10 q/acre", price: "₹5,500/q", profit: "Very High", icon: "🥜" },
    { name: "Turmeric", yield: "25-30 q/acre", price: "₹8,000/q", profit: "Excellent", icon: "🟡" },
    { name: "Maize", yield: "20-25 q/acre", price: "₹2,100/q", profit: "Medium", icon: "🌽" },
    { name: "Millets", yield: "10-12 q/acre", price: "₹2,800/q", profit: "Good", icon: "🌿" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.teal}10)` }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.primary, marginBottom: 4 }}>
          🌾 {t.cropAI}
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted }}>
          {lang === "kn" ? "AI ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳನ್ನು ಪಡೆಯಿರಿ" : lang === "hi" ? "AI अनुशंसित फसलें पाएं" : "Get AI-recommended crops for your farm conditions"}
        </div>
      </Card>

      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {fields.map(f => (
            <div key={f.key}>
              <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.text, display: "block", marginBottom: 6 }}>{f.label}</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {f.options.map(o => (
                  <button key={o} onClick={() => setForm(prev => ({ ...prev, [f.key]: o }))}
                    style={{
                      padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                      border: `1.5px solid ${form[f.key] === o ? COLORS.primary : COLORS.border}`,
                      background: form[f.key] === o ? COLORS.primary : "white",
                      color: form[f.key] === o ? "white" : COLORS.text, cursor: "pointer",
                      textTransform: "capitalize"
                    }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <button onClick={handleSubmit} disabled={loading} style={{
        background: loading ? "#ccc" : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.teal})`,
        color: "white", border: "none", borderRadius: 12, padding: "14px 24px",
        fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer"
      }}>
        {loading ? `🔄 ${t.analyzing}` : `🌱 ${lang === "kn" ? "ಬೆಳೆ ಶಿಫಾರಸು ಪಡೆಯಿರಿ" : lang === "hi" ? "फसल सुझाव पाएं" : "Get Crop Recommendations"}`}
      </button>

      {result ? (
        <Card>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.primary, marginBottom: 10 }}>🌾 AI Crop Recommendations</div>
          <div style={{ fontSize: 13, lineHeight: 1.8, color: COLORS.text, whiteSpace: "pre-wrap" }}>{result}</div>
        </Card>
      ) : (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>
            🌾 {lang === "kn" ? "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು (Red soil + Medium rainfall)" : lang === "hi" ? "अनुशंसित फसलें" : "Recommended Crops (Red Soil + Medium Rainfall)"}
          </div>
          {suggestedCrops.map((c, i) => (
            <Card key={c.name} style={{ marginBottom: 10, padding: 14, border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: COLORS.secondary,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                  flexShrink: 0
                }}>{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>#{i + 1} {c.name}</div>
                    <Badge color={c.profit === "Excellent" ? COLORS.teal : c.profit === "Very High" ? COLORS.primary : COLORS.accent2}>
                      {c.profit}
                    </Badge>
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.muted }}>Yield: {c.yield} • {c.price}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// 5. MANDI PRICES
const MandiPrices = ({ t, lang }) => {
  const [selectedCrop, setSelectedCrop] = useState("All");

  const crops = ["All", "Tomato", "Potato", "Onion", "Chilli", "Rice", "Wheat", "Maize", "Groundnut"];
  const markets = [
    { market: "Mysuru", crop: "Tomato", price: 2400, min: 2200, max: 2800, trend: [1800, 2000, 2100, 2000, 2300, 2400], change: +200 },
    { market: "Bengaluru", crop: "Tomato", price: 2600, min: 2400, max: 3000, trend: [2000, 2100, 2200, 2300, 2500, 2600], change: +300 },
    { market: "Davanagere", crop: "Onion", price: 3200, min: 2800, max: 3500, trend: [2400, 2500, 2700, 2900, 3100, 3200], change: +350 },
    { market: "Mandya", crop: "Chilli", price: 8500, min: 7500, max: 9500, trend: [7000, 7200, 7800, 8000, 8200, 8500], change: +600 },
    { market: "Mysuru", crop: "Potato", price: 1800, min: 1600, max: 2100, trend: [2000, 1900, 1850, 1900, 1800, 1800], change: -100 },
    { market: "Bengaluru", crop: "Rice", price: 3800, min: 3500, max: 4200, trend: [3600, 3700, 3700, 3750, 3800, 3800], change: +50 },
  ];

  const filtered = selectedCrop === "All" ? markets : markets.filter(m => m.crop === selectedCrop);
  const best = [...filtered].sort((a, b) => b.price - a.price)[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg, #1a237e15, #283593)`, borderColor: "#3949ab40" }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#1a237e", marginBottom: 4 }}>
          💹 {t.mandiPrice}
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted }}>
          {lang === "kn" ? "ರಿಯಲ್-ಟೈಮ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು" : lang === "hi" ? "रियल-टाइम मंडी भाव" : "Live agricultural market prices across Karnataka"}
        </div>
      </Card>

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
        {crops.map(c => (
          <button key={c} onClick={() => setSelectedCrop(c)} style={{
            padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
            border: `1.5px solid ${selectedCrop === c ? "#1a237e" : COLORS.border}`,
            background: selectedCrop === c ? "#1a237e" : "white",
            color: selectedCrop === c ? "white" : COLORS.text, cursor: "pointer"
          }}>{c}</button>
        ))}
      </div>

      {/* Best market highlight */}
      {best && (
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.accent}20, ${COLORS.accent2}15)`,
          border: `1px solid ${COLORS.accent}50`, borderRadius: 14, padding: 14
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent2 }}>🏆 BEST MARKET TO SELL</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{best.market} – {best.crop}</div>
              <div style={{ fontSize: 12, color: COLORS.muted }}>Min: ₹{best.min} • Max: ₹{best.max}</div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: COLORS.accent2 }}>₹{best.price}</div>
          </div>
        </div>
      )}

      {/* Market cards */}
      {filtered.map((m, i) => (
        <Card key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{m.market}</div>
                {m === best && <Badge color={COLORS.accent2} bg={COLORS.accent + "30"}>BEST</Badge>}
              </div>
              <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 8 }}>{m.crop}</div>
              <MiniBar data={m.trend} color="#1a237e" height={36} />
              <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 2 }}>6-day trend</div>
            </div>
            <div style={{ textAlign: "right", marginLeft: 16 }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#1a237e" }}>₹{m.price}</div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>per quintal</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: m.change > 0 ? COLORS.teal : COLORS.red, marginTop: 4 }}>
                {m.change > 0 ? "▲" : "▼"} ₹{Math.abs(m.change)}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

// 6. FERTILIZER TRACKER
const FertilizerTracker = ({ t, lang }) => {
  const fertilizers = [
    { name: "Urea", price: 266, unit: "45kg bag", trend: [255, 258, 260, 262, 266, 266], color: COLORS.blue, change: +4 },
    { name: "DAP", price: 1350, unit: "50kg bag", trend: [1300, 1310, 1330, 1340, 1350, 1350], color: COLORS.teal, change: +20 },
    { name: "MOP (Potash)", price: 1655, unit: "50kg bag", trend: [1600, 1620, 1635, 1640, 1655, 1655], color: COLORS.accent2, change: +35 },
    { name: "NPK (10:26:26)", price: 1475, unit: "50kg bag", trend: [1450, 1455, 1460, 1468, 1475, 1475], color: COLORS.primary, change: +15 },
  ];

  const stores = [
    { name: "Srinivasa Agro", dist: "0.8 km", phone: "9845XXXXXX" },
    { name: "Farmland Depot", dist: "1.2 km", phone: "9876XXXXXX" },
    { name: "Kisaan Store", dist: "2.1 km", phone: "9900XXXXXX" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg, #1b5e2015, #33691e15)` }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#1b5e20", marginBottom: 4 }}>
          🧪 {t.fertilizer}
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted }}>
          {lang === "kn" ? "ಇಂದಿನ ಗೊಬ್ಬರದ ಬೆಲೆಗಳು ಮತ್ತು ಇತಿಹಾಸ" : lang === "hi" ? "आज के उर्वरक मूल्य और इतिहास" : "Today's fertilizer prices with price history"}
        </div>
      </Card>

      {fertilizers.map((f, i) => (
        <Card key={f.name}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: COLORS.text }}>{f.name}</div>
              <div style={{ fontSize: 12, color: COLORS.muted }}>{f.unit}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: f.color }}>₹{f.price}</div>
              <div style={{ fontSize: 12, color: f.change > 0 ? COLORS.red : COLORS.teal, fontWeight: 600 }}>
                {f.change > 0 ? "▲" : "▼"} ₹{Math.abs(f.change)} this week
              </div>
            </div>
          </div>
          <MiniBar data={f.trend} color={f.color} height={40} />
          <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 4 }}>6-week price history</div>
        </Card>
      ))}

      <Card>
        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>
          📍 {lang === "kn" ? "ಹತ್ತಿರದ ಗೊಬ್ಬರ ಅಂಗಡಿಗಳು" : lang === "hi" ? "पास की उर्वरक दुकानें" : "Nearby Fertilizer Stores"}
        </div>
        {stores.map((s, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 0", borderBottom: i < stores.length - 1 ? `1px solid ${COLORS.border}` : "none"
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: COLORS.muted }}>📍 {s.dist} away</div>
            </div>
            <button style={{
              background: COLORS.primary + "15", color: COLORS.primary, border: `1px solid ${COLORS.primary}30`,
              borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer"
            }}>📞 Call</button>
          </div>
        ))}
      </Card>
    </div>
  );
};

// 7. WEATHER
const Weather = ({ t, lang }) => {
  const forecast = [
    { day: "Today", icon: "⛅", high: 30, low: 22, rain: 40, condition: "Partly Cloudy" },
    { day: "Tue", icon: "🌧️", high: 27, low: 20, rain: 80, condition: "Heavy Rain" },
    { day: "Wed", icon: "🌧️", high: 25, low: 19, rain: 70, condition: "Rain" },
    { day: "Thu", icon: "🌤️", high: 29, low: 21, rain: 20, condition: "Mostly Sunny" },
    { day: "Fri", icon: "☀️", high: 32, low: 23, rain: 5, condition: "Sunny" },
    { day: "Sat", icon: "⛅", high: 30, low: 22, rain: 30, condition: "Partly Cloudy" },
    { day: "Sun", icon: "🌧️", high: 26, low: 19, rain: 65, condition: "Rainy" },
  ];

  const { analyze, loading, result } = useClaudeAI();

  const getAdvice = () => {
    const p = lang === "kn"
      ? "ಹವಾಮಾನ: ಇಂದು ಭಾಗಶಃ ಮೋಡ 30°C, ನಾಳೆ ಭಾರಿ ಮಳೆ 27°C. ರೈತರಿಗೆ ಈ ವಾರ ಕೃಷಿ ಸಲಹೆ ನೀಡಿ."
      : lang === "hi"
        ? "मौसम: आज आंशिक बादल 30°C, कल भारी बारिश 27°C। किसानों के लिए इस सप्ताह की कृषि सलाह दें।"
        : "Weather: Today partly cloudy 30°C, tomorrow heavy rain 27°C, rest of week mixed. Provide 5 specific farming activities and warnings for an Indian farmer this week based on this forecast.";
    analyze(p);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Main weather card */}
      <div style={{
        background: "linear-gradient(135deg, #1565c0, #0288d1, #29b6f6)",
        borderRadius: 20, padding: 24, color: "white", textAlign: "center"
      }}>
        <div style={{ fontSize: 64 }}>⛅</div>
        <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1 }}>28°C</div>
        <div style={{ fontSize: 16, opacity: 0.85, marginBottom: 16 }}>Partly Cloudy</div>
        <div style={{ fontSize: 13, opacity: 0.75 }}>Mysuru, Karnataka</div>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20, background: "rgba(255,255,255,0.15)", borderRadius: 14, padding: 14 }}>
          {[
            { icon: "💧", label: "Humidity", value: "72%" },
            { icon: "🌧️", label: "Rain Chance", value: "40%" },
            { icon: "💨", label: "Wind", value: "12 km/h" },
            { icon: "👁️", label: "Visibility", value: "8 km" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>{s.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{s.value}</div>
              <div style={{ fontSize: 10, opacity: 0.8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-day forecast */}
      <Card>
        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>
          📅 {lang === "kn" ? "7 ದಿನದ ಮುನ್ಸೂಚನೆ" : lang === "hi" ? "7 दिन का पूर्वानुमान" : "7-Day Forecast"}
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
          {forecast.map((f, i) => (
            <div key={f.day} style={{
              minWidth: 64, textAlign: "center", padding: "10px 6px",
              background: i === 0 ? COLORS.primary + "20" : COLORS.secondary,
              borderRadius: 12, border: i === 0 ? `2px solid ${COLORS.primary}` : "none"
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.text }}>{f.day}</div>
              <div style={{ fontSize: 24, margin: "4px 0" }}>{f.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.dark }}>{f.high}°</div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>{f.low}°</div>
              <div style={{ fontSize: 10, color: "#1565c0", marginTop: 2 }}>💧{f.rain}%</div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI farming advice button */}
      <button onClick={getAdvice} disabled={loading} style={{
        background: loading ? "#ccc" : "linear-gradient(135deg, #1565c0, #0288d1)",
        color: "white", border: "none", borderRadius: 12, padding: "14px 24px",
        fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer"
      }}>
        {loading ? "🔄 Getting advice..." : `🤖 ${lang === "kn" ? "AI ಕೃಷಿ ಸಲಹೆ ಪಡೆಯಿರಿ" : lang === "hi" ? "AI कृषि सलाह पाएं" : "Get AI Farming Advice"}`}
      </button>

      {result && (
        <Card style={{ border: "1px solid #1565c020", background: "#e3f2fd" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1565c0", marginBottom: 8 }}>🤖 AI Weather Farming Advice</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: COLORS.text, whiteSpace: "pre-wrap" }}>{result}</div>
        </Card>
      )}
    </div>
  );
};

// 8. PEST DETECTION
const PestDetection = ({ t, lang }) => {
  const [image, setImage] = useState(null);
  const { analyze, loading, result } = useClaudeAI();
  const fileRef = useRef();

  const handleAnalyze = () => {
    const p = lang === "kn"
      ? "ಈ ಬೆಳೆ ಎಲೆಯ ಫೋಟೋದಲ್ಲಿ ಕೀಟ ಅಥವಾ ರೋಗ ಪತ್ತೆ ಮಾಡಿ. ಸಮಸ್ಯೆ, ತೀವ್ರತೆ, ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ ತಿಳಿಸಿ."
      : lang === "hi"
        ? "इस फसल की पत्ती में कीट या रोग पहचानें। समस्या, गंभीरता, जैविक और रासायनिक उपचार बताएं।"
        : "Analyze this crop leaf image for an Indian farmer. Identify: 1) Disease/Pest name, 2) Severity (Low/Medium/High/Critical), 3) Organic treatment options, 4) Chemical pesticide recommendations with dosage, 5) Prevention tips. Be specific and practical.";
    analyze(p);
  };

  const mockDetection = {
    name: "Early Blight (Alternaria solani)",
    severity: "Medium",
    organic: ["Neem oil spray (5ml/L water)", "Trichoderma viride application", "Remove affected leaves immediately"],
    chemical: ["Mancozeb 75% WP @ 2g/L", "Chlorothalonil 75% WP @ 2g/L", "Spray every 7-10 days"],
    prevention: "Maintain proper plant spacing, avoid overhead irrigation"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: "#b71c1c15", borderColor: "#b71c1c30" }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#b71c1c", marginBottom: 4 }}>
          🐛 {t.pestDetection}
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted }}>
          {lang === "kn" ? "ಬೆಳೆ ಎಲೆ ಫೋಟೋ ತೆಗೆದು AI ರೋಗ ಪತ್ತೆ ಮಾಡಿ" : lang === "hi" ? "पत्ती फोटो से AI रोग पहचान" : "Upload crop leaf photo for AI disease detection"}
        </div>
      </Card>

      <div onClick={() => fileRef.current.click()} style={{
        border: `2px dashed ${COLORS.red}`, borderRadius: 16,
        padding: 32, textAlign: "center", cursor: "pointer",
        background: image ? "transparent" : "#ffebee", overflow: "hidden"
      }}>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
          onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => setImage(ev.target.result); r.readAsDataURL(f); } }} />
        {image
          ? <img src={image} alt="crop" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 12, objectFit: "cover" }} />
          : <div><div style={{ fontSize: 48 }}>🌿</div><div style={{ color: COLORS.red, fontWeight: 700, fontSize: 15 }}>{t.uploadCrop}</div><div style={{ color: COLORS.muted, fontSize: 12 }}>Leaf, stem or fruit photo</div></div>
        }
      </div>

      {image && (
        <button onClick={handleAnalyze} disabled={loading} style={{
          background: loading ? "#ccc" : `linear-gradient(135deg, #b71c1c, #c62828)`,
          color: "white", border: "none", borderRadius: 12, padding: "14px 24px",
          fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer"
        }}>
          {loading ? `🔄 ${t.analyzing}` : `🔬 ${t.detectPest}`}
        </button>
      )}

      {result ? (
        <Card style={{ border: "1px solid #b71c1c30", background: "#ffebee" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#b71c1c", marginBottom: 8 }}>🔬 Detection Result</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: COLORS.text, whiteSpace: "pre-wrap" }}>{result}</div>
        </Card>
      ) : (
        <Card>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>
            📊 {lang === "kn" ? "ಮಾದರಿ ವಿಶ್ಲೇಷಣೆ" : lang === "hi" ? "नमूना विश्लेषण" : "Sample Detection Result"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, padding: 12, background: "#fff3e0", borderRadius: 10 }}>
            <div style={{ fontSize: 32 }}>⚠️</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, color: COLORS.accent2 }}>{mockDetection.name}</div>
              <Badge color={COLORS.accent2}>Severity: {mockDetection.severity}</Badge>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary, marginBottom: 6 }}>🌿 Organic Treatment</div>
            {mockDetection.organic.map((o, i) => <div key={i} style={{ fontSize: 12, color: COLORS.text, padding: "3px 0" }}>✅ {o}</div>)}
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.red, marginBottom: 6 }}>💊 Chemical Treatment</div>
            {mockDetection.chemical.map((c, i) => <div key={i} style={{ fontSize: 12, color: COLORS.text, padding: "3px 0" }}>• {c}</div>)}
          </div>
          <div style={{ background: COLORS.secondary, borderRadius: 10, padding: 10, fontSize: 12, color: COLORS.text }}>
            🛡️ <strong>Prevention:</strong> {mockDetection.prevention}
          </div>
        </Card>
      )}
    </div>
  );
};

// 9. PROFIT ANALYZER
const ProfitAnalyzer = ({ t, lang }) => {
  const [form, setForm] = useState({ land: 2, crop: "tomato", seed: 5000, fertilizer: 8000, labor: 12000, irrigation: 3000 });
  const { analyze, loading, result } = useClaudeAI();

  const yields = { tomato: { qty: 80, price: 2400 }, potato: { qty: 60, price: 1800 }, onion: { qty: 70, price: 3200 }, rice: { qty: 25, price: 3800 } };
  const selectedYield = yields[form.crop] || yields.tomato;
  const totalCost = (form.seed + form.fertilizer + form.labor + form.irrigation) * form.land;
  const totalRevenue = selectedYield.qty * selectedYield.price * form.land;
  const profit = totalRevenue - totalCost;
  const roi = ((profit / totalCost) * 100).toFixed(1);

  const getAIAdvice = () => {
    const p = `Farm: ${form.land} acres, Crop: ${form.crop}, Total cost: ₹${totalCost}, Expected revenue: ₹${totalRevenue}, Profit: ₹${profit}. Give profit optimization tips and cost reduction strategies for an Indian farmer.`;
    analyze(p);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.accent}20, ${COLORS.accent2}10)` }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.accent2, marginBottom: 4 }}>
          💰 {t.profitAnalyzer}
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted }}>
          {lang === "kn" ? "ನಿಮ್ಮ ಜಮೀನಿನ ಲಾಭ ಲೆಕ್ಕ ಮಾಡಿ" : lang === "hi" ? "अपने खेत का लाभ गणना करें" : "Calculate your farm profitability"}
        </div>
      </Card>

      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { key: "land", label: lang === "kn" ? "ಭೂಮಿ (ಎಕರೆ)" : lang === "hi" ? "ज़मीन (एकड़)" : "Land Size (acres)", min: 0.5, max: 20, step: 0.5 },
            { key: "seed", label: lang === "kn" ? "ಬೀಜ ಖರ್ಚು (₹/ಎಕರೆ)" : lang === "hi" ? "बीज लागत (₹/एकड़)" : "Seed Cost (₹/acre)", min: 500, max: 20000, step: 500 },
            { key: "fertilizer", label: lang === "kn" ? "ಗೊಬ್ಬರ (₹/ಎಕರೆ)" : lang === "hi" ? "उर्वरक (₹/एकड़)" : "Fertilizer (₹/acre)", min: 1000, max: 30000, step: 1000 },
            { key: "labor", label: lang === "kn" ? "ಕಾರ್ಮಿಕ (₹/ಎಕರೆ)" : lang === "hi" ? "मजदूरी (₹/एकड़)" : "Labor Cost (₹/acre)", min: 2000, max: 30000, step: 1000 },
          ].map(f => (
            <div key={f.key}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.text }}>{f.label}</label>
                <span style={{ fontSize: 13, fontWeight: 800, color: COLORS.primary }}>{f.key === "land" ? form[f.key] : `₹${form[f.key].toLocaleString()}`}</span>
              </div>
              <input type="range" min={f.min} max={f.max} step={f.step} value={form[f.key]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: +e.target.value }))}
                style={{ width: "100%", accentColor: COLORS.primary }} />
            </div>
          ))}

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.text, display: "block", marginBottom: 6 }}>
              {lang === "kn" ? "ಬೆಳೆ" : lang === "hi" ? "फसल" : "Crop"}
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {Object.keys(yields).map(c => (
                <button key={c} onClick={() => setForm(prev => ({ ...prev, crop: c }))} style={{
                  padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: "capitalize",
                  border: `1.5px solid ${form.crop === c ? COLORS.accent2 : COLORS.border}`,
                  background: form.crop === c ? COLORS.accent2 : "white",
                  color: form.crop === c ? "white" : COLORS.text, cursor: "pointer"
                }}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Result */}
      <Card style={{ background: profit > 0 ? "#e8f5e9" : "#ffebee", border: `2px solid ${profit > 0 ? COLORS.primary : COLORS.red}40` }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.text, marginBottom: 12 }}>📊 Profit Analysis</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          {[
            { label: "Total Investment", value: `₹${totalCost.toLocaleString()}`, color: COLORS.red },
            { label: "Expected Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: COLORS.teal },
            { label: "Net Profit", value: `₹${profit.toLocaleString()}`, color: profit > 0 ? COLORS.primary : COLORS.red },
            { label: "ROI", value: `${roi}%`, color: profit > 0 ? COLORS.primary : COLORS.red },
          ].map(item => (
            <div key={item.label} style={{ background: "white", borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: COLORS.muted }}>{item.label}</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>
        <button onClick={getAIAdvice} disabled={loading} style={{
          width: "100%", background: loading ? "#ccc" : `linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.accent})`,
          color: "white", border: "none", borderRadius: 10, padding: "12px",
          fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer"
        }}>
          {loading ? "🔄 Analyzing..." : "🤖 Get AI Profit Optimization Tips"}
        </button>
      </Card>

      {result && (
        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent2, marginBottom: 8 }}>💡 AI Recommendations</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: COLORS.text, whiteSpace: "pre-wrap" }}>{result}</div>
        </Card>
      )}
    </div>
  );
};

// 10. GOV SCHEMES
const GovSchemes = ({ t, lang }) => {
  const [expanded, setExpanded] = useState(null);
  const { analyze, loading, result, setResult } = useClaudeAI();

  const schemes = [
    {
      name: "PM-KISAN", emoji: "🌾",
      benefit: lang === "kn" ? "₹6000/ವರ್ಷ ನೇರ ನಗದು ಸಹಾಯ" : lang === "hi" ? "₹6000/वर्ष सीधे बैंक खाते में" : "₹6,000/year direct income support",
      eligibility: "All landholding farmer families",
      color: COLORS.primary
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana", emoji: "🛡️",
      benefit: lang === "kn" ? "ಬೆಳೆ ವಿಮೆ ಯೋಜನೆ" : lang === "hi" ? "फसल बीमा योजना" : "Crop insurance at subsidized premium rates",
      eligibility: "All farmers growing notified crops",
      color: COLORS.blue
    },
    {
      name: "Kisan Credit Card", emoji: "💳",
      benefit: lang === "kn" ? "ಕಡಿಮೆ ಬಡ್ಡಿ ದರದಲ್ಲಿ ಸಾಲ" : lang === "hi" ? "कम ब्याज पर कृषि ऋण" : "Short-term credit at 4% interest rate",
      eligibility: "Farmers, tenant farmers, sharecroppers",
      color: COLORS.teal
    },
    {
      name: "Soil Health Card", emoji: "🧪",
      benefit: lang === "kn" ? "ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷೆ" : lang === "hi" ? "मुफ्त मिट्टी परीक्षण" : "Free soil testing and health card every 2 years",
      eligibility: "All farmers in India",
      color: "#6a1b9a"
    },
    {
      name: "PM Kusum Yojana", emoji: "☀️",
      benefit: lang === "kn" ? "ಸೌರ ಪಂಪ್ ಸಬ್ಸಿಡಿ 90% ವರೆಗೆ" : lang === "hi" ? "90% तक सब्सिडी पर सोलर पंप" : "Solar pumps with up to 90% subsidy",
      eligibility: "Farmers without reliable power supply",
      color: COLORS.accent2
    },
  ];

  const getSchemeInfo = (scheme) => {
    setResult(null);
    const p = lang === "kn"
      ? `${scheme.name} ಯೋಜನೆಯ ವಿಸ್ತೃತ ಮಾಹಿತಿ, ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ, ಅಗತ್ಯ ದಾಖಲೆಗಳು ಮತ್ತು ಅರ್ಹತೆ ತಿಳಿಸಿ.`
      : lang === "hi"
        ? `${scheme.name} योजना की विस्तृत जानकारी, आवेदन प्रक्रिया, आवश्यक दस्तावेज़ और पात्रता बताएं।`
        : `Explain ${scheme.name} government scheme in detail for Indian farmers: eligibility criteria, benefits amount, required documents, application process step by step, and contact information.`;
    analyze(p);
    setExpanded(scheme.name);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg, #311b9215, #4527a015)` }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#311b92", marginBottom: 4 }}>
          🏛️ {t.govSchemes}
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted }}>
          {lang === "kn" ? "ರೈತರಿಗಾಗಿ ಸರ್ಕಾರದ ಯೋಜನೆಗಳು" : lang === "hi" ? "किसानों के लिए सरकारी योजनाएं" : "Government schemes & subsidies for farmers"}
        </div>
      </Card>

      {schemes.map(s => (
        <Card key={s.name} style={{ border: expanded === s.name ? `2px solid ${s.color}` : `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ fontSize: 32, flexShrink: 0 }}>{s.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: COLORS.text, marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>{s.benefit}</div>
              <div style={{ fontSize: 11, background: s.color + "15", color: s.color, padding: "4px 8px", borderRadius: 8, display: "inline-block", marginBottom: 10 }}>
                ✓ {s.eligibility}
              </div>
              <button onClick={() => getSchemeInfo(s)} style={{
                display: "block", width: "100%", background: s.color, color: "white",
                border: "none", borderRadius: 10, padding: "10px",
                fontSize: 13, fontWeight: 700, cursor: "pointer"
              }}>
                {lang === "kn" ? "ವಿಸ್ತೃತ ಮಾಹಿತಿ" : lang === "hi" ? "पूरी जानकारी" : "Learn More & Apply"}
              </button>
            </div>
          </div>
          {expanded === s.name && result && (
            <div style={{ marginTop: 12, padding: 12, background: s.color + "08", borderRadius: 10, fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
              {loading ? "Loading..." : result}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

// 11. VOICE ASSISTANT
const VoiceAssistant = ({ t, lang }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [question, setQuestion] = useState("");
  const { analyze, loading, result } = useClaudeAI();

  const examples = {
    kn: ["ಇವತ್ತು ಮಳೆ ಬರತ್ತಾ?", "ಟೊಮ್ಯಾಟೊ ಬೆಲೆ ಎಷ್ಟು?", "ನನ್ನ ಮಣ್ಣಿಗೆ ಯಾವ ಗೊಬ್ಬರ ಹಾಕಬೇಕು?"],
    hi: ["आज बारिश होगी?", "टमाटर का भाव क्या है?", "कौनसी फसल लगाऊं?"],
    en: ["Will it rain today?", "What's the tomato price?", "Which crop should I plant?"],
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setTranscript("Voice recognition not supported. Please type your question.");
      return;
    }
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const rec = new SpeechRecognition();
    rec.lang = lang === "kn" ? "kn-IN" : lang === "hi" ? "hi-IN" : "en-IN";
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (e) => { const t = e.results[0][0].transcript; setTranscript(t); setQuestion(t); };
    rec.start();
  };

  const askQuestion = (q) => {
    setQuestion(q);
    const prompt = lang === "kn"
      ? `ನೀವು ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರ ನೀಡಬೇಕು. ಭಾರತೀಯ ರೈತನ ಪ್ರಶ್ನೆ: ${q}`
      : lang === "hi"
        ? `आपको हिंदी में जवाब देना है। भारतीय किसान का प्रश्न: ${q}`
        : `You are AgriGenius AI assistant for Indian farmers. Answer concisely: ${q}`;
    analyze(prompt);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: "linear-gradient(135deg, #4a148c15, #6a1b9a15)" }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#4a148c", marginBottom: 4 }}>
          🎤 {t.voiceAssistant}
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted }}>
          {lang === "kn" ? "ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಕೇಳಿ" : lang === "hi" ? "अपना सवाल पूछें" : "Ask your farming questions in any language"}
        </div>
      </Card>

      {/* Mic button */}
      <div style={{ textAlign: "center", padding: 24 }}>
        <button onClick={startListening} style={{
          width: 100, height: 100, borderRadius: "50%", border: "none",
          background: listening ? `linear-gradient(135deg, ${COLORS.red}, #e53935)` : `linear-gradient(135deg, #4a148c, #7b1fa2)`,
          cursor: "pointer", boxShadow: listening ? `0 0 0 12px ${COLORS.red}30, 0 0 0 24px ${COLORS.red}15` : `0 4px 20px #4a148c40`,
          transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center",
          animation: listening ? "pulse 1s infinite" : "none", margin: "0 auto"
        }}>
          <Icon name="mic" size={40} color="white" />
        </button>
        <div style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: listening ? COLORS.red : "#4a148c" }}>
          {listening ? t.listening : t.speakNow}
        </div>
      </div>

      {/* Text input */}
      <div style={{ display: "flex", gap: 8 }}>
        <input value={question} onChange={e => setQuestion(e.target.value)}
          placeholder={lang === "kn" ? "ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ..." : lang === "hi" ? "सवाल टाइप करें..." : "Type your question..."}
          style={{ flex: 1, padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${COLORS.border}`, fontSize: 14, outline: "none" }}
          onKeyDown={e => e.key === "Enter" && question && askQuestion(question)}
        />
        <button onClick={() => question && askQuestion(question)} style={{
          background: "#4a148c", color: "white", border: "none", borderRadius: 12,
          padding: "12px 18px", cursor: "pointer", fontWeight: 700, fontSize: 14
        }}>Ask</button>
      </div>

      {/* Example questions */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, marginBottom: 8 }}>
          {lang === "kn" ? "ಮಾದರಿ ಪ್ರಶ್ನೆಗಳು:" : lang === "hi" ? "उदाहरण प्रश्न:" : "Example questions:"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {(examples[lang] || examples.en).map(q => (
            <button key={q} onClick={() => askQuestion(q)} style={{
              background: "#4a148c10", border: "1px solid #4a148c20", color: "#4a148c",
              borderRadius: 10, padding: "10px 14px", textAlign: "left",
              fontSize: 13, fontWeight: 600, cursor: "pointer"
            }}>💬 {q}</button>
          ))}
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: 20, color: "#4a148c", fontWeight: 600 }}>
          🤖 Thinking...
        </div>
      )}

      {result && (
        <Card style={{ background: "#f3e5f5", border: "1px solid #4a148c30" }}>
          {question && <div style={{ fontSize: 12, color: "#4a148c80", marginBottom: 6 }}>Q: {question}</div>}
          <div style={{ fontSize: 14, fontWeight: 700, color: "#4a148c", marginBottom: 8 }}>🤖 AgriGenius AI</div>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: COLORS.text, whiteSpace: "pre-wrap" }}>{result}</div>
        </Card>
      )}
    </div>
  );
};

// 12. MARKETPLACE
const Marketplace = ({ t, lang }) => {
  const [tab, setTab] = useState("buy");
  const products = {
    buy: [
      { name: "Hybrid Tomato Seeds", price: 450, unit: "100g pack", seller: "Syngenta", emoji: "🌱", rating: 4.5 },
      { name: "Neem Pesticide", price: 320, unit: "1L bottle", seller: "Agro India", emoji: "🧴", rating: 4.2 },
      { name: "DAP Fertilizer", price: 1350, unit: "50kg bag", seller: "IFFCO", emoji: "💊", rating: 4.7 },
      { name: "Drip Irrigation Kit", price: 8500, unit: "1 acre kit", seller: "Netafim", emoji: "💧", rating: 4.8 },
    ],
    sell: [
      { name: "Tomato", price: 2400, qty: "5 quintal available", location: "Mysuru", emoji: "🍅", seller: "Ravi Kumar" },
      { name: "Onion", price: 3200, qty: "8 quintal available", location: "Mandya", emoji: "🧅", seller: "Suresh S" },
      { name: "Rice (Sona Masuri)", price: 4200, qty: "20 quintal", location: "Davanagere", emoji: "🌾", seller: "K Patel" },
    ]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg, #e65100 15, #bf360c10)` }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#e65100", marginBottom: 4 }}>
          🛒 {t.marketplace}
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted }}>
          {lang === "kn" ? "ಖರೀದಿ ಮತ್ತು ಮಾರಾಟ ಮಾಡಿ" : lang === "hi" ? "खरीदें और बेचें" : "Buy inputs, sell your produce directly"}
        </div>
      </Card>

      <div style={{ display: "flex", background: COLORS.secondary, borderRadius: 12, padding: 4 }}>
        {["buy", "sell"].map(tab_ => (
          <button key={tab_} onClick={() => setTab(tab_)} style={{
            flex: 1, padding: "10px", borderRadius: 10, fontWeight: 700, fontSize: 14,
            border: "none", background: tab === tab_ ? COLORS.primary : "transparent",
            color: tab === tab_ ? "white" : COLORS.muted, cursor: "pointer", transition: "all 0.2s"
          }}>
            {tab_ === "buy" ? (lang === "kn" ? "🛒 ಖರೀದಿ" : lang === "hi" ? "🛒 खरीदें" : "🛒 Buy") :
              (lang === "kn" ? "💰 ಮಾರಿ" : lang === "hi" ? "💰 बेचें" : "💰 Sell")}
          </button>
        ))}
      </div>

      {tab === "buy" && products.buy.map(p => (
        <Card key={p.name} style={{ padding: 14 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ fontSize: 36, width: 56, height: 56, background: COLORS.secondary, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {p.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: COLORS.muted }}>{p.seller} • {p.unit}</div>
              <div style={{ fontSize: 12, color: COLORS.accent }}>⭐ {p.rating}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: COLORS.primary }}>₹{p.price}</div>
                <button style={{ background: COLORS.primary, color: "white", border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {tab === "sell" && (
        <div>
          {products.sell.map(p => (
            <Card key={p.name} style={{ marginBottom: 12, padding: 14 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ fontSize: 36, width: 56, height: 56, background: "#fff3e0", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {p.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted }}>{p.seller} • {p.location}</div>
                  <div style={{ fontSize: 12, color: COLORS.teal }}>{p.qty}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: COLORS.accent2 }}>₹{p.price}/q</div>
                    <button style={{ background: COLORS.accent2, color: "white", border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          <button style={{
            width: "100%", background: COLORS.accent2, color: "white",
            border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer"
          }}>
            + {lang === "kn" ? "ನನ್ನ ಬೆಳೆ ಮಾರಿ" : lang === "hi" ? "अपनी फसल बेचें" : "List Your Produce"}
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================

export default function AgriGeniusApp() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [lang, setLang] = useState("en");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [alertCount] = useState(3);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const modules = [
    { id: "dashboard", icon: "🏠", label: t.dashboard },
    { id: "soil", icon: "🔬", label: t.soilScanner },
    { id: "satellite", icon: "🛰️", label: t.satellite },
    { id: "crop", icon: "🌾", label: t.cropAI },
    { id: "mandi", icon: "💹", label: t.mandiPrice },
    { id: "fertilizer", icon: "🧪", label: t.fertilizer },
    { id: "weather", icon: "⛅", label: t.weather },
    { id: "pest", icon: "🐛", label: t.pestDetection },
    { id: "profit", icon: "💰", label: t.profitAnalyzer },
    { id: "schemes", icon: "🏛️", label: t.govSchemes },
    { id: "voice", icon: "🎤", label: t.voiceAssistant },
    { id: "marketplace", icon: "🛒", label: t.marketplace },
  ];

  const bottomNav = [
    { id: "dashboard", icon: "🏠", label: t.dashboard },
    { id: "soil", icon: "🔬", label: t.soilScanner },
    { id: "mandi", icon: "💹", label: t.mandiPrice },
    { id: "voice", icon: "🎤", label: t.voiceAssistant },
    { id: "more", icon: "⋯", label: "More" },
  ];

  const renderModule = () => {
    const props = { t, lang };
    switch (activeModule) {
      case "dashboard": return <Dashboard {...props} />;
      case "soil": return <SoilScanner {...props} />;
      case "satellite": return <SatelliteMonitor {...props} />;
      case "crop": return <CropAI {...props} />;
      case "mandi": return <MandiPrices {...props} />;
      case "fertilizer": return <FertilizerTracker {...props} />;
      case "weather": return <Weather {...props} />;
      case "pest": return <PestDetection {...props} />;
      case "profit": return <ProfitAnalyzer {...props} />;
      case "schemes": return <GovSchemes {...props} />;
      case "voice": return <VoiceAssistant {...props} />;
      case "marketplace": return <Marketplace {...props} />;
      default: return <Dashboard {...props} />;
    }
  };

  return (
    <div style={{
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      background: darkMode ? "#0a1a0b" : COLORS.bg,
      minHeight: "100vh",
      maxWidth: 430,
      margin: "0 auto",
      position: "relative",
      color: COLORS.text,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.primary}40; border-radius: 4px; }
        input[type=range] { -webkit-appearance: none; height: 6px; border-radius: 3px; background: ${COLORS.border}; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: ${COLORS.primary}; cursor: pointer; }
        @keyframes pulse { 0%, 100% { box-shadow: 0 0 0 12px rgba(198,40,40,0.3), 0 0 0 24px rgba(198,40,40,0.15); } 50% { box-shadow: 0 0 0 20px rgba(198,40,40,0.2), 0 0 0 40px rgba(198,40,40,0.05); } }
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
      `}</style>

      {/* Sidebar */}
      {sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999 }}>
          <div onClick={() => setSidebarOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: 280,
            background: "white", padding: 0, animation: "slideIn 0.25s ease",
            display: "flex", flexDirection: "column"
          }}>
            <div style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.teal})`, padding: "20px 16px", color: "white" }}>
              <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 2 }}>🌾 {t.appName}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{t.tagline}</div>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {modules.map(m => (
                <div key={m.id} onClick={() => { setActiveModule(m.id); setSidebarOpen(false); }}
                  style={{
                    padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
                    cursor: "pointer", borderLeft: activeModule === m.id ? `4px solid ${COLORS.primary}` : "4px solid transparent",
                    background: activeModule === m.id ? COLORS.secondary : "transparent",
                    fontWeight: activeModule === m.id ? 700 : 400
                  }}>
                  <span style={{ fontSize: 20 }}>{m.icon}</span>
                  <span style={{ fontSize: 14 }}>{m.label}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: 16, borderTop: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.muted, marginBottom: 10 }}>LANGUAGE / ಭಾಷೆ / भाषा</div>
              <div style={{ display: "flex", gap: 8 }}>
                {[["en", "English"], ["kn", "ಕನ್ನಡ"], ["hi", "हिंदी"]].map(([code, label]) => (
                  <button key={code} onClick={() => setLang(code)} style={{
                    flex: 1, padding: "8px 4px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                    border: `1.5px solid ${lang === code ? COLORS.primary : COLORS.border}`,
                    background: lang === code ? COLORS.primary : "white",
                    color: lang === code ? "white" : COLORS.text, cursor: "pointer"
                  }}>{label}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.teal})`,
        padding: "12px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 12px rgba(26,107,46,0.3)"
      }}>
        <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "white" }}>
          <Icon name="menu" size={24} color="white" />
        </button>
        <div style={{ color: "white", textAlign: "center" }}>
          <div style={{ fontWeight: 900, fontSize: 16, letterSpacing: 0.5 }}>🌾 {t.appName}</div>
          <div style={{ fontSize: 10, opacity: 0.8 }}>{modules.find(m => m.id === activeModule)?.label}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setDarkMode(d => !d)} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, padding: "4px 8px", cursor: "pointer", color: "white", fontSize: 14 }}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          <div style={{ position: "relative" }}>
            <button style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, padding: "4px 8px", cursor: "pointer", color: "white" }}>
              <Icon name="bell" size={18} color="white" />
            </button>
            <div style={{
              position: "absolute", top: -4, right: -4, background: COLORS.red,
              color: "white", fontSize: 10, fontWeight: 700, width: 16, height: 16,
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"
            }}>{alertCount}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 90px" }}>
        {renderModule()}
      </div>

      {/* Bottom navigation */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: "white", borderTop: `1px solid ${COLORS.border}`,
        display: "flex", padding: "8px 0 12px",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)", zIndex: 100
      }}>
        {bottomNav.map(item => (
          <button key={item.id} onClick={() => {
            if (item.id === "more") setSidebarOpen(true);
            else setActiveModule(item.id);
          }} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            background: "none", border: "none", cursor: "pointer",
            color: activeModule === item.id ? COLORS.primary : COLORS.muted,
          }}>
            <div style={{ fontSize: 22 }}>{item.icon}</div>
            <div style={{ fontSize: 10, fontWeight: activeModule === item.id ? 800 : 500 }}>{item.label}</div>
            {activeModule === item.id && (
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: COLORS.primary }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
