'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export function ElevenLabsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Create the ElevenLabs widget element
      const widget = document.createElement('elevenlabs-convai');
      widget.setAttribute('agent-id', 'agent_01kf6jh8vef8ktnq9bsdgvz1q4');
      containerRef.current.appendChild(widget);
    }
  }, []);

  return (
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />
      <div ref={containerRef} />
    </>
  );
}
