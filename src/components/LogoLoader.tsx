"use client";

import clsx from "clsx";

interface LogoLoaderProps {
  isVisible: boolean;
}

const LOGO_PATH =
  "M4 600H318.1V266.217L507.167 600H1085L965.283 340.363H688.895L496.284 0L4 600Z";

const LogoLoader = ({ isVisible }: LogoLoaderProps) => {
  return (
    <div
      aria-hidden={!isVisible}
      className={clsx(
        "pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-[var(--color-supadark)] transition-opacity duration-700",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <svg
        className="h-40 w-[22rem] max-w-[70vw] text-[var(--color-highlight)]"
        viewBox="0 0 1089 608"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="loader-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="halo" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.38  0 0 0 0 0.87  0 0 0 0 0.65  0 0 0 0.6 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          className="logo-trace"
          d={LOGO_PATH}
          fill="none"
          stroke="#62DDA5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#loader-glow)"
        />
      </svg>
      <style jsx>{`
        .logo-trace {
          stroke-dasharray: 3200;
          stroke-dashoffset: 3200;
          animation: trace 2.8s ease-in-out infinite;
        }

        @keyframes trace {
          0% {
            stroke-dashoffset: 3200;
            opacity: 0;
          }
          35% {
            opacity: 1;
          }
          60% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -3200;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LogoLoader;
