import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 9999,
          background: "#2A3EFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 9999,
            border: "3px solid #FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 9999,
              border: "1.5px solid #FFFFFF",
              opacity: 0.85,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
