"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  wobble: number;
  wobbleSpeed: number;
  alpha: number;
  hue: number;
  isBlinking: boolean;
  blinkTimer: number;
}

export function FloatingSpirits() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);
    resize();

    // Các tone màu pastel: Xanh baby, Hồng phấn, Tím oải hương, Cam đào, Xanh bạc hà, Vàng kem
    const pastelHues = [205, 335, 275, 28, 155, 45];

    const createParticle = (initialY?: number): Particle => {
      const radius = Math.random() * 3 + 6; // Kích thước mini xinh xắn (6px - 9px)
      const alpha = Math.random() * 0.25 + 0.7; // Rõ nét tự nhiên (0.7 - 0.95)

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        radius,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.35 + 0.2), // Trôi nhẹ lên trên
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.015 + 0.006,
        alpha,
        hue: pastelHues[Math.floor(Math.random() * pastelHues.length)],
        isBlinking: false,
        blinkTimer: Math.random() * 180 + 80,
      };
    };

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 12 : 22;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }

    const drawCloud = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);

      // Đổ bóng màu pastel dịu nhẹ tạo viền mờ êm ái
      ctx.shadowColor = `hsla(${p.hue}, 80%, 75%, ${p.alpha * 0.7})`;
      ctx.shadowBlur = 10;

      // Thân mây trắng mịn - hợp nhất các hình tròn thành một khối
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.95})`;
      ctx.beginPath();
      ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
      ctx.arc(-p.radius * 0.7, p.radius * 0.15, p.radius * 0.65, 0, Math.PI * 2);
      ctx.arc(p.radius * 0.7, p.radius * 0.15, p.radius * 0.65, 0, Math.PI * 2);
      ctx.arc(-p.radius * 0.35, -p.radius * 0.4, p.radius * 0.7, 0, Math.PI * 2);
      ctx.arc(p.radius * 0.35, -p.radius * 0.4, p.radius * 0.7, 0, Math.PI * 2);
      ctx.fill();

      // Tắt bóng để vẽ chi tiết mặt
      ctx.shadowColor = "transparent";

      // Má hồng mini
      ctx.fillStyle = `rgba(255, 150, 180, ${p.alpha * 0.7})`;
      ctx.beginPath();
      ctx.arc(-p.radius * 0.5, p.radius * 0.15, p.radius * 0.22, 0, Math.PI * 2);
      ctx.arc(p.radius * 0.5, p.radius * 0.15, p.radius * 0.22, 0, Math.PI * 2);
      ctx.fill();

      // Mắt
      ctx.fillStyle = `rgba(80, 70, 95, ${p.alpha * 0.85})`;
      if (p.isBlinking) {
        ctx.strokeStyle = `rgba(80, 70, 95, ${p.alpha * 0.85})`;
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-p.radius * 0.35, 0);
        ctx.lineTo(-p.radius * 0.15, 0);
        ctx.moveTo(p.radius * 0.15, 0);
        ctx.lineTo(p.radius * 0.35, 0);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(-p.radius * 0.25, -p.radius * 0.05, p.radius * 0.15, 0, Math.PI * 2);
        ctx.arc(p.radius * 0.25, -p.radius * 0.05, p.radius * 0.15, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const drawStar = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);

      // Đổ bóng màu pastel dịu nhẹ tạo viền hào quang phát sáng trong đêm
      ctx.shadowColor = `hsla(${p.hue}, 90%, 75%, ${p.alpha * 0.85})`;
      ctx.shadowBlur = 10;

      // Thân ngôi sao thuần trắng
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.95})`;
      ctx.beginPath();
      const points = 5;
      const innerRadius = p.radius * 0.58;
      const outerRadius = p.radius;
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
        else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
      }
      ctx.closePath();
      ctx.fill();

      // Viền màu pastel tinh tế quanh ngôi sao
      ctx.strokeStyle = `hsla(${p.hue}, 85%, 75%, ${p.alpha * 0.9})`;
      ctx.lineWidth = 1.2;
      ctx.lineJoin = "round";
      ctx.stroke();

      // Tắt bóng để vẽ chi tiết mặt
      ctx.shadowColor = "transparent";

      // Má hồng mini
      ctx.fillStyle = `rgba(255, 160, 190, ${p.alpha * 0.75})`;
      ctx.beginPath();
      ctx.arc(-p.radius * 0.35, p.radius * 0.1, p.radius * 0.16, 0, Math.PI * 2);
      ctx.arc(p.radius * 0.35, p.radius * 0.1, p.radius * 0.16, 0, Math.PI * 2);
      ctx.fill();

      // Mắt
      ctx.fillStyle = `rgba(35, 25, 50, ${p.alpha * 0.9})`;
      if (p.isBlinking) {
        ctx.strokeStyle = `rgba(35, 25, 50, ${p.alpha * 0.9})`;
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-p.radius * 0.28, 0);
        ctx.lineTo(-p.radius * 0.1, 0);
        ctx.moveTo(p.radius * 0.1, 0);
        ctx.lineTo(p.radius * 0.28, 0);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(-p.radius * 0.18, -p.radius * 0.05, p.radius * 0.13, 0, Math.PI * 2);
        ctx.arc(p.radius * 0.18, -p.radius * 0.05, p.radius * 0.13, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");

      particles.forEach((p) => {
        p.blinkTimer--;
        if (p.blinkTimer <= 0) {
          p.isBlinking = !p.isBlinking;
          p.blinkTimer = p.isBlinking ? 10 : Math.random() * 200 + 100;
        }

        // Chuyển động lượn sóng êm ái
        p.y += p.vy;
        p.x += Math.sin(p.wobble) * 0.35 + p.vx;
        p.wobble += p.wobbleSpeed;

        // Vòng lặp khi bay ra khỏi màn hình
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        if (isDark) {
          drawStar(p);
        } else {
          drawCloud(p);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  );
}
