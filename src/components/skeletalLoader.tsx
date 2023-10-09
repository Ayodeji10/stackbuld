import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletalLoader({ height, width, borderRadius }: any) {
  return (
    <Skeleton
      height={height}
      width={width}
      borderRadius={borderRadius}
      className="skeleton"
    />
  );
}

export default SkeletalLoader;
