import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** 180×180 touch icon: the mark on paper. iOS applies its own corner radius. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fefdfc",
        }}
      >
        <svg viewBox="0 0 24 24" width="124" height="124">
          <circle cx="12" cy="12" r="9.25" fill="none" stroke="#1c1712" strokeWidth="1.5" />
          <path
            d="M12 2.75A6.55 9.25 0 0 1 12 21.25M12 2.75A6.55 9.25 0 0 0 12 21.25"
            fill="none"
            stroke="#1c1712"
            strokeWidth="1.25"
            opacity="0.42"
          />
          <path d="M12 2.75v18.5" stroke="#1f5390" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="12" cy="8.1" r="1.9" fill="#fefdfc" />
          <circle cx="12" cy="8.1" r="1.35" fill="#1f5390" />
        </svg>
      </div>
    ),
    size,
  );
}
