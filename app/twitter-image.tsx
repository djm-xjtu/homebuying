import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 1200, height: 600 };
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
          justifyContent: "center",
          gap: 24,
          padding: 72,
          background: "linear-gradient(135deg, #07101f 0%, #18284a 60%, #07101f 100%)",
          color: "#fff",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div style={{ fontSize: 26, opacity: 0.9 }}>HomeBuying.ie</div>
        <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.08 }}>
          Mortgage maths, simplified.
        </div>
        <div style={{ fontSize: 28, opacity: 0.92, maxWidth: 920 }}>
          Estimate affordability, follow every step, and turn paperwork into better questions.
        </div>
      </div>
    ),
    size,
  );
}
