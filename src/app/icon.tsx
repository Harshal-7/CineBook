import { Clapperboard } from "lucide-react";
import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 18,
  height: 18,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    <div className="flex justify-center items-center">🎬</div>,
    {
      ...size,
    }
  );
}
