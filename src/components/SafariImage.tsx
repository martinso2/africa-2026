"use client";

import { useState } from "react";

interface SafariImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

export default function SafariImage({
  src,
  fallbackSrc,
  alt,
  className,
}: SafariImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
