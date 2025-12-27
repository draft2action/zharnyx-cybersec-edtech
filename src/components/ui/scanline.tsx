"use client";

import React from "react";

export const Scanline = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Scanline pattern */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-10" />

      {/* Flickr effect */}
      <div className="absolute inset-0 h-full w-full animate-flicker bg-white/2 pointer-events-none" />
    </div>
  );
};
