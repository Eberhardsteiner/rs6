import React from "react";
import type { NewsItem } from "@/core/engine/randomNews";

interface Props {
  news: NewsItem[];
  day: number;
}

export default function RandomNewsPanel({ news, day }: Props) {
  if (!news || news.length === 0) {
    return null; // keine News anzeigen
  }

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: "12px 16px",
        background: "#f9fafb",
        marginTop: 12,
      }}
    >
      <h3
        style={{
          margin: "0 0 8px",
          fontSize: 14,
          fontWeight: 600,
          color: "#374151",
        }}
      >
        Zufalls-News – Tag {day}
      </h3>
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {news.map((n) => (
          <li
            key={n.id}
            style={{
              marginBottom: 8,
              padding: "8px 10px",
              borderRadius: 8,
              background: "#fff",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
              {n.title}
            </div>
            <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.4 }}>
              {n.text}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
