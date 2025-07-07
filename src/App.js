import React, { useState } from "react";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

export default function App() {
  const [entries, setEntries] = useState(days.map(day => ({
    day,
    start: "",
    end: "",
    hasCar: true,
    needsCar: false
  })));

  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (i, key, value) => {
    const updated = [...entries];
    updated[i][key] = value;
    setEntries(updated);
  };

  const proposeDrivers = () => {
    const available = entries.filter(e => e.hasCar && !e.needsCar);
    const proposed = entries.map((e, i) => ({
      day: e.day,
      driver: available[i % available.length]?.day || "Pas de conducteur dispo"
    }));
    setSuggestions(proposed);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1 style={{ color: "#007BFF" }}>CovoitPro</h1>
      {entries.map((entry, i) => (
        <div key={i} style={{ marginBottom: 10, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
          <strong>{entry.day}</strong><br />
          Début: <input value={entry.start} onChange={e => handleChange(i, "start", e.target.value)} />{" "}
          Fin: <input value={entry.end} onChange={e => handleChange(i, "end", e.target.value)} /><br />
          <label>
            <input type="checkbox" checked={entry.hasCar} onChange={e => handleChange(i, "hasCar", e.target.checked)} />
            J'ai une voiture
          </label>{" "}
          <label>
            <input type="checkbox" checked={entry.needsCar} onChange={e => handleChange(i, "needsCar", e.target.checked)} />
            J'ai besoin obligatoirement de ma voiture
          </label>
        </div>
      ))}
      <button onClick={proposeDrivers} style={{ backgroundColor: "#007BFF", color: "white", padding: 10, borderRadius: 5 }}>
        Proposer les conducteurs
      </button>

      {suggestions.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Propositions :</h3>
          <ul>
            {suggestions.map((s, i) => (
              <li key={i}>{s.day} : {s.driver}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}