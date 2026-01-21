"use client";

import { cn } from "@/lib/utils";

/**
 * Wave Divider Component
 * @description Reusable wave/curved section separator for smooth transitions between sections
 * @searchable WaveDivider, wave, divider, separator, curve, section transition
 *
 * Usage:
 * - At bottom of cream section, transitioning to white:
 *   <WaveDivider color="white" position="bottom" />
 *
 * - At top of cream section:
 *   <WaveDivider color="#FDF2E6" position="top" />
 *
 * - With variant:
 *   <WaveDivider variant="double" color="white" />
 */

export type WaveVariant = "wave" | "curve" | "double";
export type WavePosition = "top" | "bottom";

export interface WaveDividerProps {
  /** The fill color of the wave SVG (default: 'white') */
  color?: string;
  /** Position of the wave - 'top' or 'bottom' (default: 'bottom') */
  position?: WavePosition;
  /** Flip the wave horizontally (default: false) */
  flip?: boolean;
  /** Height in pixels (default: 80) */
  height?: number;
  /** Additional CSS classes */
  className?: string;
  /** Wave style variant (default: 'wave') */
  variant?: WaveVariant;
}

/**
 * SVG path definitions for different wave variants
 */
const wavePaths: Record<WaveVariant, string> = {
  // Smooth single wave - elegant S-curve
  wave: "M0,0 C320,100 480,0 640,50 C800,100 960,0 1280,80 L1280,0 L0,0 Z",

  // Simple arc curve - clean and minimal
  curve: "M0,0 Q640,120 1280,0 L1280,0 L0,0 Z",

  // Double wave - two overlapping curves for depth
  double: "M0,0 C213,100 427,0 640,50 C853,100 1067,0 1280,50 C1280,50 1280,0 1280,0 L0,0 Z",
};

/**
 * Alternative paths for bottom position (inverted)
 */
const wavePathsBottom: Record<WaveVariant, string> = {
  wave: "M0,80 C320,0 480,80 640,40 C800,0 960,80 1280,0 L1280,80 L0,80 Z",
  curve: "M0,80 Q640,-20 1280,80 L1280,80 L0,80 Z",
  double: "M0,80 C213,0 427,80 640,40 C853,0 1067,80 1280,40 L1280,80 L0,80 Z",
};

export function WaveDivider({
  color = "white",
  position = "bottom",
  flip = false,
  height = 80,
  className,
  variant = "wave",
}: WaveDividerProps) {
  // Select the appropriate path based on position
  const path = position === "top" ? wavePaths[variant] : wavePathsBottom[variant];

  // Calculate viewBox based on position
  const viewBox = "0 0 1280 80";

  return (
    <div
      className={cn(
        "absolute left-0 right-0 w-full overflow-hidden leading-none pointer-events-none",
        position === "top" ? "top-0" : "bottom-0",
        className
      )}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        className={cn(
          "relative block w-full h-full",
          flip && "scale-x-[-1]"
        )}
        viewBox={viewBox}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} fill={color} />
      </svg>
    </div>
  );
}

/**
 * Preset wave dividers for common use cases
 */

/** White wave at bottom - use when transitioning from colored section to white */
export function WaveDividerWhiteBottom({ className, ...props }: Omit<WaveDividerProps, "color" | "position">) {
  return <WaveDivider color="white" position="bottom" className={className} {...props} />;
}

/** White wave at top - use when transitioning from white section to colored */
export function WaveDividerWhiteTop({ className, ...props }: Omit<WaveDividerProps, "color" | "position">) {
  return <WaveDivider color="white" position="top" className={className} {...props} />;
}

/** Cream wave at bottom - for cream/warm sections */
export function WaveDividerCreamBottom({ className, ...props }: Omit<WaveDividerProps, "color" | "position">) {
  return <WaveDivider color="#FDF2E6" position="bottom" className={className} {...props} />;
}

/** Cream wave at top - for cream/warm sections */
export function WaveDividerCreamTop({ className, ...props }: Omit<WaveDividerProps, "color" | "position">) {
  return <WaveDivider color="#FDF2E6" position="top" className={className} {...props} />;
}

/** Primary teal wave */
export function WaveDividerPrimary({ className, position = "bottom", ...props }: Omit<WaveDividerProps, "color">) {
  return <WaveDivider color="#00BFA5" position={position} className={className} {...props} />;
}

/** Light gray wave - for subtle transitions */
export function WaveDividerGray({ className, position = "bottom", ...props }: Omit<WaveDividerProps, "color">) {
  return <WaveDivider color="#F9FAFB" position={position} className={className} {...props} />;
}

export default WaveDivider;
