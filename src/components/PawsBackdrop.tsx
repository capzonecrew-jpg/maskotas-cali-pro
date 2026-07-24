// Floating paw prints for hero backdrops.
import type { CSSProperties } from "react";

const PAWS = [
  { left: "8%", delay: "0s", size: 28, r: "-12deg" },
  { left: "22%", delay: "3s", size: 20, r: "18deg" },
  { left: "38%", delay: "5s", size: 34, r: "-6deg" },
  { left: "54%", delay: "1.5s", size: 22, r: "24deg" },
  { left: "70%", delay: "6s", size: 30, r: "-20deg" },
  { left: "84%", delay: "2.5s", size: 24, r: "10deg" },
  { left: "92%", delay: "4.5s", size: 18, r: "-14deg" },
];

export function PawsBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PAWS.map((p, i) => (
        <svg
          key={i}
          className="paw"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            ["--r" as string]: p.r,
          } as CSSProperties}
          aria-hidden="true"
        >
          <ellipse cx="7" cy="8" rx="1.8" ry="2.4" />
          <ellipse cx="12" cy="6" rx="1.8" ry="2.6" />
          <ellipse cx="17" cy="8" rx="1.8" ry="2.4" />
          <ellipse cx="4.5" cy="13" rx="1.5" ry="2" />
          <path d="M12 12c-3.2 0-5.5 2.4-5.5 5 0 2.2 2 3 5.5 3s5.5-.8 5.5-3c0-2.6-2.3-5-5.5-5z" />
        </svg>
      ))}
    </div>
  );
}