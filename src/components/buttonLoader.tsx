import React from "react";
import { ColorRing } from "react-loader-spinner";

export default function ButtonLoader({ size, color }: any) {
  return (
    <ColorRing
      visible={true}
      height={size}
      width={size}
      colors={[color, color, color, color, color]}
    />
  );
}
