import React, { useState, useEffect, useRef } from "react";

export default function SeamlessVideoBackground() {
  const [activeVideo, setActiveVideo] = useState(0);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Aumentando a velocidade de reprodução para restaurar a fluidez (FPS)
    // Valores muito baixos (como 0.5) fazem o vídeo parecer "travando" pois reduzem os quadros pela metade.
    // 0.8 é um bom meio termo: levemente mais lento, mas ainda fluido. Para velocidade normal, use 1.0.
    if (video1Ref.current) video1Ref.current.playbackRate = 0.8;
    if (video2Ref.current) video2Ref.current.playbackRate = 0.8;
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let isActive = true;

    const updateVideos = () => {
      if (!isActive) return;

      const videoRefs = [video1Ref, video2Ref];
      const currentVideo = videoRefs[activeVideo].current;
      const nextVideo = videoRefs[(activeVideo + 1) % 2].current;
      
      const crossfadeTime = 1.5;

      if (currentVideo && nextVideo && currentVideo.duration) {
        if (currentVideo.currentTime >= currentVideo.duration - crossfadeTime) {
          nextVideo.currentTime = 0;
          nextVideo.play().catch(() => {});
          setActiveVideo((prev) => (prev + 1) % 2);
          return;
        }
      }
      
      animationFrameId = requestAnimationFrame(updateVideos);
    };

    animationFrameId = requestAnimationFrame(updateVideos);
    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeVideo]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full overflow-hidden">
      <video
        ref={video1Ref}
        autoPlay
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-[1500ms] ease-linear ${
          activeVideo === 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/videos/kryon-infinity.mp4" type="video/mp4" />
      </video>
      <video
        ref={video2Ref}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-[1500ms] ease-linear ${
          activeVideo === 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/videos/kryon-infinity.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-slate-950/90 z-0 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );
}
