import React, { useState } from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "h-10", showText = true }: LogoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`flex items-center gap-2 select-none ${className}`}>
        {/* Futuristic Stylized Logo Emblem */}
        <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-slate-900 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-950 to-slate-900 opacity-80" />
          {/* Cyan/Blue Glowing design lines */}
          <svg
            viewBox="0 0 100 100"
            className="w-7 h-7 relative z-10 animate-pulse-slow"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 20L45 50L25 80"
              stroke="#0ea5e9"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M50 20L75 20"
              stroke="#22d3ee"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M45 50L75 50"
              stroke="#38bdf8"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M50 80L75 80"
              stroke="#06b6d4"
              strokeWidth="12"
              strokeLinecap="round"
            />
          </svg>
          {/* Subtle glow orb */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full blur-xs opacity-50" />
        </div>
        
        {showText && (
          <div className="flex flex-col items-start leading-none font-display">
            <span className="text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-cyan-400">
              KRYON
            </span>
            <span className="text-[9px] font-medium tracking-[0.25em] text-cyan-400">
              E-TECH
            </span>
          </div>
        )}
      </div>
    );
  }

  // Use a transparent background with a gorgeous neon aura contouring the white inverted logo
  // High quality is achieved by rendering the image at a naturally larger size (avoiding pixelated small scale transforms)
  return (
    <div className={`inline-flex items-center justify-center bg-transparent relative overflow-visible ${className}`}>
      <div 
        className="relative overflow-visible flex items-center justify-center h-24 md:h-32 w-auto pointer-events-none transform-gpu"
        style={{
          transformOrigin: "center",
        }}
      >
        <img
          src="/logo.png"
          alt="KRYON E-TECH"
          className="h-full w-auto object-contain transition-all duration-300 pointer-events-none"
          style={{
            // Premium high-intensity wide neon glow with broader layered drop-shadow bounds for a smooth halo
            filter: "brightness(0) invert(1) drop-shadow(0 0 12px rgba(0, 180, 255, 1)) drop-shadow(0 0 24px rgba(0, 102, 255, 0.95)) drop-shadow(0 0 40px rgba(0, 180, 255, 0.8)) drop-shadow(0 0 60px rgba(0, 102, 255, 0.45))",
          }}
          onError={() => setHasError(true)}
        />
      </div>
    </div>
  );
}
