import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
          borderRadius: 16,
          color: "#fff",
          fontSize: 40,
          fontWeight: 900,
        }}
      >
        H
      </div>
    ),
    size,
  );
}
