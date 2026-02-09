"use client";

import { useCallback, useEffect, useRef } from "react";
import clsx from "clsx";

interface PatternCanvasProps {
  active: boolean;
  colors: string[];
  reducedMotion?: boolean;
}

type Glyph = {
  x: number;
  y: number;
  size: number;
  color: string;
  driftX: number;
  driftY: number;
  rotation: number;
  rotationDelta: number;
};

const MAX_GLYPHS = 38;

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const wrapValue = (value: number, max: number) => {
  if (value < -40) return max + 40;
  if (value > max + 40) return -40;
  return value;
};

const PatternCanvas = ({ active, colors, reducedMotion = false }: PatternCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const logoRef = useRef<HTMLImageElement | null>(null);
  const glyphsRef = useRef<Glyph[]>([]);

  const seedGlyphs = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const nextGlyphs: Glyph[] = Array.from({ length: MAX_GLYPHS }).map(() => {
      const size = randomBetween(32, 120);
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        color: colors[Math.floor(Math.random() * colors.length)] ?? "#62DDA5",
        driftX: randomBetween(-0.08, 0.08),
        driftY: randomBetween(-0.12, 0.12),
        rotation: Math.random() * Math.PI,
        rotationDelta: randomBetween(-0.002, 0.002),
      };
    });
    glyphsRef.current = nextGlyphs;
  }, [colors]);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#292d40";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    glyphsRef.current.forEach((glyph) => {
      if (!logoRef.current) return;
      ctx.save();
      ctx.translate(glyph.x, glyph.y);
      ctx.rotate(glyph.rotation);
      ctx.globalAlpha = 0.45;
      ctx.drawImage(
        logoRef.current,
        -glyph.size / 2,
        -glyph.size / 2,
        glyph.size,
        glyph.size
      );
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = glyph.color;
      ctx.fillRect(-glyph.size / 2, -glyph.size / 2, glyph.size, glyph.size);
      ctx.globalCompositeOperation = "source-over";
      ctx.restore();

      if (!reducedMotion) {
        glyph.x = wrapValue(glyph.x + glyph.driftX, canvas.width);
        glyph.y = wrapValue(glyph.y + glyph.driftY, canvas.height);
        glyph.rotation += glyph.rotationDelta;
      }
    });
  }, [reducedMotion]);

  const animate = useCallback(() => {
    const step = () => {
      drawFrame();
      animationFrameRef.current = requestAnimationFrame(step);
    };
    step();
  }, [drawFrame]);

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current) return;
    animate();
  }, [animate]);

  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    const logo = new Image();
    logo.src = "/logo.svg";
    logo.onload = () => {
      logoRef.current = logo;
      seedGlyphs();
      drawFrame();
    };
  }, [drawFrame, seedGlyphs]);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      if (!reducedMotion) {
        seedGlyphs();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [reducedMotion, seedGlyphs]);

  useEffect(() => {
    if (active && !reducedMotion) {
      startAnimation();
    } else {
      stopAnimation();
    }
    if (active && reducedMotion) {
      drawFrame();
    }
    return () => stopAnimation();
  }, [active, reducedMotion, drawFrame, startAnimation, stopAnimation]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={clsx(
        "absolute inset-0 h-full w-full bg-[var(--color-supadark)] transition-opacity duration-700",
        active ? "opacity-100" : "opacity-0"
      )}
    />
  );
};

export default PatternCanvas;
