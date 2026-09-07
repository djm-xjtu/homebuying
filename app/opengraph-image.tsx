import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0b1220 0%, #1a2b52 55%, #0b1220 100%)",
          color: "#fff",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 28, opacity: 0.9 }}>HomeBuying.ie</div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            From mortgage maths to moving day.
          </div>
          <div style={{ fontSize: 28, opacity: 0.92, maxWidth: 900 }}>
            Mortgage calculator · Buying checklist · Plain-English document explanations
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 22, opacity: 0.8 }}>Built for Irish buyers · Free to start</div>
          <div
            style={{
              width: 320,
              height: 16,
              borderRadius: 999,
              background: "linear-gradient(90deg, #38bdf8, #a78bfa, #34d399)",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
