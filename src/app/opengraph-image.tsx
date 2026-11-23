import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { en } from "@/i18n/en";

export const alt = `${profile.name}, cybersecurity student and software developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#050807", color: "#E8F5ED", padding: 72, border: "2px solid #174B34" }}>
        <div style={{ display: "flex", color: "#00FF88", fontSize: 30 }}>{profile.brand}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, letterSpacing: -4 }}>{profile.name.toUpperCase()}</div>
          <div style={{ display: "flex", fontSize: 36, color: "#00FF88" }}>{`${en.hero.role1} / ${en.hero.role2}`}</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#8A9C90" }}>{en.hero.headline}</div>
      </div>
    ),
    size,
  );
}
