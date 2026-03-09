import { useState } from "react";

const EXAMPLES = ["פאנלים סולאריים", "כרטיס אשראי", "ביטוח נסיעות", "רכב חשמלי"];

export default function SEOGenerator() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null);

  const generate = async () => {
    if (!keyword.trim()) return;
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
          messages: [{
            role: "user",
            content: `אתה מומחה SEO לשוק הישראלי. צור תגיות SEO בעברית עבור מילת המפתח: "${keyword}"

החזר JSON בלבד, ללא טקסט נוסף, בפורמט הבא:
{
  "title": "כותרת עמוד (50-60 תווים, כולל מילת המפתח, עם - לפני שם המותג)",
  "description": "תיאור מטא (150-158 תווים, משכנע, כולל CTA)",
  "h1": "כותרת H1 (עד 70 תווים, מכילה את מילת המפתח)",
  "title_length": <מספר תווים>,
  "description_length": <מספר תווים>,
  "h1_length": <מספר תווים>
}`
          }]
        })
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (e) {
      setError("שגיאה בייצור התוצאות. נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const getLengthColor = (len, min, max) => {
    if (len >= min && len <= max) return "#00d68f";
    if (len < min) return "#ffaa00";
    return "#ff4757";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0f 0%, #0f1923 50%, #0a0a0f 100%)",
      fontFamily: "'Heebo', 'Arial Hebrew', sans-serif",
      direction: "rtl",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;700;900&display=swap');
        * { box-sizing: border-box; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        .tag-card { transition: transform 0.2s, box-shadow 0.2s; }
        .tag-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,214,143,0.15); }
        .copy-btn { cursor: pointer; transition: all 0.2s; border: none; }
        .copy-btn:hover { opacity: 0.8; }
        .example-pill { cursor: pointer; transition: all 0.15s; }
        .example-pill:hover { background: rgba(0,214,143,0.2); border-color: #00d68f; color: #00d68f; }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "#00d68f", marginBottom: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>CLAUDE × SEO</div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1.1, background: "linear-gradient(90deg, #fff 0%, #00d68f 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>מחולל תגיות SEO</h1>
        <p style={{ color: "#8892a4", marginTop: "0.75rem", fontSize: "1rem" }}>מילת מפתח → Title + Description + H1 בשניות</p>
      </div>

      <div style={{ width: "100%", maxWidth: "640px" }}>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
          <input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && generate()}
            placeholder="הכנס מילת מפתח..."
            style={{ flex: 1, padding: "0.9rem 1.25rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", color: "#fff", fontSize: "1rem", outline: "none", transition: "border-color 0.2s", fontFamily: "inherit" }}
            onFocus={e => e.target.style.borderColor = "#00d68f"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
          />
          <button onClick={generate} disabled={loading || !keyword.trim()} style={{ padding: "0.9rem 1.75rem", background: keyword.trim() && !loading ? "linear-gradient(135deg, #00d68f, #00b377)" : "rgba(255,255,255,0.1)", border: "none", borderRadius: "12px", color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: keyword.trim() && !loading ? "pointer" : "default", fontFamily: "inherit", whiteSpace: "nowrap" }}>
            {loading ? "⏳" : "צור ←"}
          </button>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {EXAMPLES.map(ex => (
            <span key={ex} className="example-pill" onClick={() => setKeyword(ex)} style={{ padding: "0.35rem 0.9rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.15)", color: "#8892a4", fontSize: "0.85rem", background: "transparent" }}>{ex}</span>
          ))}
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#00d68f" }}>
            <div className="pulse" style={{ fontSize: "2rem" }}>⚡</div>
            <p style={{ marginTop: "1rem", color: "#8892a4" }}>Claude חושב...</p>
          </div>
        )}

        {error && <div style={{ padding: "1rem", background: "rgba(255,71,87,0.1)", border: "1px solid rgba(255,71,87,0.3)", borderRadius: "12px", color: "#ff4757", textAlign: "center" }}>{error}</div>}

        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { key: "title", label: "Title", min: 50, max: 60, icon: "🏷️" },
              { key: "description", label: "Meta Description", min: 150, max: 158, icon: "📝" },
              { key: "h1", label: "H1", min: 20, max: 70, icon: "📌" }
            ].map(({ key, label, min, max, icon }) => {
              const len = result[`${key}_length`] || result[key]?.length || 0;
              const color = getLengthColor(len, min, max);
              return (
                <div key={key} className="tag-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ color: "#8892a4", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em" }}>{icon} {label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ color, fontSize: "0.8rem", fontWeight: 700 }}>{len} / {min}-{max}</span>
                      <button className="copy-btn" onClick={() => copy(result[key], key)} style={{ padding: "0.3rem 0.8rem", background: copied === key ? "rgba(0,214,143,0.2)" : "rgba(255,255,255,0.08)", borderRadius: "8px", color: copied === key ? "#00d68f" : "#8892a4", fontSize: "0.75rem" }}>
                        {copied === key ? "✓ הועתק" : "העתק"}
                      </button>
                    </div>
                  </div>
                  <p style={{ color: "#e8eaf0", margin: 0, lineHeight: 1.6, fontSize: "0.95rem" }}>{result[key]}</p>
                  <div style={{ marginTop: "0.75rem", height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min((len / max) * 100, 100)}%`, background: color, borderRadius: "999px", transition: "width 0.5s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.7rem", marginTop: "3rem" }}>Powered by Claude AI × Syrup Digital</p>
    </div>
  );
}
