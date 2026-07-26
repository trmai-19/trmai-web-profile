"use client";

import { useEffect, useRef } from "react";

type Role = "orbiter" | "floater";

interface Particle {
  role: Role;
  x: number;
  y: number;
  radius: number;
  // Floater props
  vx: number;
  vy: number;
  wobble: number;
  wobbleSpeed: number;
  // Orbiter props
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
  // Common
  alpha: number;
  blinkTimer: number;
  isBlinking: boolean;
  isCaught: boolean;
  isSucked: boolean;
  isFadingOut: boolean;
  originalRadius: number;
  originalAlpha: number;
  catchOffset: { x: number; y: number };
  toBeRemoved?: boolean;
  color: string;
  cloudLightness: number;
  hasDodged: boolean;
  dodgeVx: number;
  dodgeVy: number;
}

export function FloatingSpirits() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleRelease = () => {
      particles.forEach(p => {
        if (p.isCaught) {
          p.isCaught = false;
          // Trôi ra nhẹ nhàng lơ lửng như bay
          p.vy = -(Math.random() * 1.5 + 0.5); 
          p.vx = (Math.random() - 0.5) * 2;
        }
      });
    };
    window.addEventListener("release-spirits", handleRelease);

    let isDraggingBasket = false;
    const handleDragStart = () => { isDraggingBasket = true; };
    const handleDragEnd = () => { isDraggingBasket = false; };
    window.addEventListener("drag-basket-start", handleDragStart);
    window.addEventListener("drag-basket-end", handleDragEnd);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);
    resize();

    const pastelHues = [
      "210, 80%", // Light blue
      "340, 80%", // Light pink
      "280, 70%", // Light purple
      "20, 90%",  // Light peach
      "150, 70%"  // Light mint
    ];

    const createParticle = (): Particle => {
      const radius = Math.random() * 4 + 8; // Trả lại 8-12px
      const alpha = Math.random() * 0.4 + 0.4;
      return {
        role: "floater",
        x: Math.random() * width,
        y: Math.random() * height - height,
        radius,
        originalRadius: radius,
        vx: Math.random() * 0.3 + 0.1,
        vy: Math.random() * 0.4 + 0.2,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.01 + 0.005,
        angle: 0,
        orbitRadius: 0,
        orbitSpeed: 0,
        alpha,
        originalAlpha: alpha,
        blinkTimer: Math.random() * 200,
        isBlinking: false,
        isCaught: false,
        isSucked: false,
        isFadingOut: false,
        catchOffset: { x: 0, y: 0 },
        color: pastelHues[Math.floor(Math.random() * pastelHues.length)],
        cloudLightness: Math.floor(Math.random() * 15) + 85, // Từ 85 (Hồng nhạt) đến 100 (Trắng)
        hasDodged: false,
        dodgeVx: 0,
        dodgeVy: 0,
      };
    };

    const initParticles = (count: number) => {
      const p = [];
      for (let i = 0; i < count; i++) {
        p.push(createParticle());
      }
      return p;
    };

    // Khởi tạo lúc render loop bắt đầu
    const isMobile = window.innerWidth < 768;
    // Giảm số lượng trên mobile để chống lag
    particles = initParticles(isMobile ? 8 : 20);

    const drawCloud = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      
      // Thân mây thuần trắng hoàn toàn để không bị rối
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.alpha)})`;

      // Tạo hiệu ứng toả sáng (glow) với màu pastel để nổi bật trên nền
      ctx.shadowColor = `hsla(${p.color}, 80%, ${Math.max(0, p.alpha)})`;
      ctx.shadowBlur = window.innerWidth < 768 ? 0 : 15; // Tắt đổ bóng trên mobile để không bị lag
      
      ctx.beginPath();
      ctx.moveTo(p.radius, 0);
      ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
      
      ctx.moveTo(-p.radius*0.8 + p.radius*0.7, p.radius*0.2);
      ctx.arc(-p.radius*0.8, p.radius*0.2, p.radius*0.7, 0, Math.PI*2);
      
      ctx.moveTo(p.radius*0.8 + p.radius*0.7, p.radius*0.2);
      ctx.arc(p.radius*0.8, p.radius*0.2, p.radius*0.7, 0, Math.PI*2);
      
      ctx.moveTo(-p.radius*0.4 + p.radius*0.8, -p.radius*0.5);
      ctx.arc(-p.radius*0.4, -p.radius*0.5, p.radius*0.8, 0, Math.PI*2);
      
      ctx.moveTo(p.radius*0.4 + p.radius*0.8, -p.radius*0.5);
      ctx.arc(p.radius*0.4, -p.radius*0.5, p.radius*0.8, 0, Math.PI*2);
      
      ctx.fill();

      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = `rgba(138, 130, 153, ${p.alpha})`;
      ctx.lineWidth = p.radius * 0.12;
      ctx.lineCap = "round";
      ctx.beginPath();
      
      if (p.isBlinking) {
        ctx.moveTo(-p.radius*0.4, -p.radius*0.1); ctx.lineTo(-p.radius*0.25, 0); ctx.lineTo(-p.radius*0.4, p.radius*0.1);
        ctx.moveTo(p.radius*0.4, -p.radius*0.1); ctx.lineTo(p.radius*0.25, 0); ctx.lineTo(p.radius*0.4, p.radius*0.1);
      } else {
        ctx.moveTo(-p.radius*0.4, 0); ctx.quadraticCurveTo(-p.radius*0.25, -p.radius*0.2, -p.radius*0.1, 0);
        ctx.moveTo(p.radius*0.1, 0); ctx.quadraticCurveTo(p.radius*0.25, -p.radius*0.2, p.radius*0.4, 0);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-p.radius*0.1, p.radius*0.2);
      ctx.quadraticCurveTo(-p.radius*0.05, p.radius*0.3, 0, p.radius*0.2);
      ctx.quadraticCurveTo(p.radius*0.05, p.radius*0.3, p.radius*0.1, p.radius*0.2);
      ctx.stroke();

      ctx.fillStyle = `rgba(255, 175, 207, ${p.alpha * 0.6})`;
      ctx.beginPath();
      ctx.ellipse(-p.radius*0.35, p.radius*0.2, p.radius*0.12, p.radius*0.08, 0, 0, Math.PI*2);
      ctx.ellipse(p.radius*0.35, p.radius*0.2, p.radius*0.12, p.radius*0.08, 0, 0, Math.PI*2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawStar = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      // Màu cho Darkmode giữ nguyên L=92% để nổi bật trên nền đen
      ctx.shadowColor = `hsla(${p.color}, 92%, ${Math.max(0, p.alpha)})`;
      ctx.shadowBlur = window.innerWidth < 768 ? 0 : 10; // Tắt đổ bóng trên mobile để không bị lag
      ctx.fillStyle = `hsla(${p.color}, 92%, ${Math.max(0, p.alpha)})`; 
      
      ctx.beginPath();
      const points = 5;
      // Để sao ú và béo, innerRadius phải lớn (khoảng 0.65)
      const innerRadius = p.radius * 0.65;
      const outerRadius = p.radius;
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        if (i === 0) ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        else ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      ctx.closePath();
      ctx.lineJoin = "round";
      ctx.lineWidth = p.radius * 0.4;
      ctx.strokeStyle = `hsla(${p.color}, 92%, ${Math.max(0, p.alpha)})`;
      ctx.stroke(); 
      ctx.fill();

      // Chỉ có 2 chấm mắt (hoặc chớp mắt)
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = `rgba(138, 130, 153, ${Math.max(0, p.alpha)})`;
      ctx.lineWidth = p.radius * 0.12;
      ctx.lineCap = "round";
      
      ctx.beginPath();
      if (p.isBlinking) {
        ctx.moveTo(-p.radius*0.3, -p.radius*0.1); ctx.lineTo(-p.radius*0.15, 0); ctx.lineTo(-p.radius*0.3, p.radius*0.1);
        ctx.moveTo(p.radius*0.3, -p.radius*0.1); ctx.lineTo(p.radius*0.15, 0); ctx.lineTo(p.radius*0.3, p.radius*0.1);
      } else {
        ctx.fillStyle = `rgba(138, 130, 153, ${Math.max(0, p.alpha)})`;
        ctx.arc(-p.radius*0.2, -p.radius*0.1, p.radius*0.1, 0, Math.PI*2);
        ctx.arc(p.radius*0.2, -p.radius*0.1, p.radius*0.1, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.stroke();

      ctx.restore();
    };

    let previousBasketRect: DOMRect | null = null;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      let basketRect: DOMRect | null = null;
      const basketEl = document.getElementById("spirit-basket");
      if (basketEl) basketRect = basketEl.getBoundingClientRect();

      let basketDx = 0;
      let basketDy = 0;
      if (basketRect && previousBasketRect) {
        basketDx = basketRect.left - previousBasketRect.left;
        basketDy = basketRect.top - previousBasketRect.top;
      }
      previousBasketRect = basketRect;

      let currentCaughtCount = 0;

      particles.forEach((p) => {
        p.blinkTimer--;
        if (p.blinkTimer <= 0) {
          p.isBlinking = !p.isBlinking;
          p.blinkTimer = p.isBlinking ? 10 : Math.random() * 200 + 100;
        }

        if (p.isCaught && basketRect) {
          currentCaughtCount++;
          // Tính tâm của miệng bình để hút vào
          const mouthX = basketRect.left + basketRect.width / 2;
          const mouthY = basketRect.top + basketRect.height * 0.25;
          
          // Thu nhỏ tinh linh khi bị bắt
          if (p.radius > p.originalRadius * 0.35) p.radius -= 0.3; 
          
          // Cả hai mode đều sáng bừng lên khi bị nhốt vào bình
          if (p.alpha < 1) p.alpha += 0.05;
          
          if (p.isSucked) {
            // Hút vào miệng bình
            p.x += (mouthX - p.x) * 0.15;
            p.y += (mouthY - p.y) * 0.15;
            if (Math.abs(mouthX - p.x) < 5 && Math.abs(mouthY - p.y) < 5) {
              p.isSucked = false; // Đã chui lọt qua miệng bình
              p.vx = (Math.random() - 0.5) * 4;
              p.vy = Math.random() * 2 + 1; // Rơi tõm xuống đáy
            }
          } else {
            // Di chuyển cùng với bình (để không bị lag ra ngoài khi kéo)
            // Đồng thời bay toán loạn trong bụng bình (bể cá)
            p.x += p.vx + basketDx;
            p.y += p.vy + basketDy;
            
            // Giới hạn quỹ đạo thành một hình tròn nội tiếp hoàn hảo trong bụng bình
            const centerX = basketRect.left + basketRect.width * 0.5;
            const centerY = basketRect.top + basketRect.height * 0.56; // Tâm hình học của bụng bình
            // Bán kính tối đa của vòng tròn nội tiếp (trừ đi bán kính của tinh linh và 2px cách mép)
            const maxInscribedRadius = basketRect.width * 0.35; 
            const bellyRadius = Math.max(0, maxInscribedRadius - p.radius - 2); 
            
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist > bellyRadius) {
              // Kéo ngược lại vào trong vòng tròn
              p.x = centerX + (dx / dist) * bellyRadius;
              p.y = centerY + (dy / dist) * bellyRadius;
              // Bật ngược vận tốc như đập vào kính
              p.vx *= -1;
              p.vy *= -1;
            }
            
            // Đổi hướng ngẫu nhiên như đom đóm
            if (Math.random() < 0.05) {
              p.vx += (Math.random() - 0.5) * 1.5;
              p.vy += (Math.random() - 0.5) * 1.5;
              // Giới hạn tốc độ
              p.vx = Math.max(-2, Math.min(2, p.vx));
              p.vy = Math.max(-2, Math.min(2, p.vy));
            }
          }
        } else if (p.isFadingOut) {
          if (p.radius < p.originalRadius) {
            // Khôi phục kích thước cũ nhanh chóng trước
            p.radius += 0.8;
            p.y += p.vy * 0.3; // Bay chậm trong lúc đang phình to
            p.x += p.vx * 0.3;
          } else {
            // Khi đã đạt kích thước cũ rồi thì bắt đầu bay đi mất
            p.y += p.vy;
            p.x += p.vx;
            p.alpha -= 0.02; // Mờ dần đi
            if (p.alpha <= 0) p.toBeRemoved = true;
          }
        } else {
          p.y += p.vy;
          p.x += Math.sin(p.wobble) * p.vx;
          p.wobble += p.wobbleSpeed;

          // Thực hiện cú lướt né tránh (Dodge)
          if (Math.abs(p.dodgeVx) > 0.1 || Math.abs(p.dodgeVy) > 0.1) {
            p.x += p.dodgeVx;
            p.y += p.dodgeVy;
            p.dodgeVx *= 0.85; // Giảm tốc
            p.dodgeVy *= 0.85;
          }

          if (basketRect && p.vy > 0) {
            const dx = p.x - (basketRect.left + basketRect.width / 2);
            const dy = p.y - (basketRect.top + basketRect.height * 0.15);
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 30 && !p.isFadingOut) {
              p.isCaught = true;
              p.isSucked = true;
              p.catchOffset = { x: (Math.random() - 0.5) * 20, y: 0 };
              const newSpirit = createParticle();
              newSpirit.y = -50;
              particles.push(newSpirit);
            } else if (dist < 100 && !p.hasDodged && !p.isFadingOut && isDraggingBasket) {
              // Bỏ chạy một chút khi cái bình tiến lại gần!
              p.hasDodged = true;
              p.dodgeVx = (dx / dist) * 12; 
              p.dodgeVy = (dy / dist) * 12;
              if (p.dodgeVy > 0) p.dodgeVy = -6; // Ưu tiên vọt lên trên
            }
          }

          if (!isDraggingBasket) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 150;
            if (dist < repelRadius) {
              const force = (repelRadius - dist) / repelRadius;
              p.x += (dx / dist) * force * 4;
              p.y += (dy / dist) * force * 4;
            }
          }

          if (p.y > height + 50) {
            p.y = -50;
            p.x = Math.random() * width;
            p.vy = Math.random() * 0.4 + 0.2;
            p.vx = Math.random() * 0.3 + 0.1;
          }
          if (p.x < -50) p.x = width + 50;
          if (p.x > width + 50) p.x = -50;
        }

        if (isDark) {
          drawStar(p);
        } else {
          drawCloud(p);
        }
      });
      
      // Xoá những bé đã bay đi mất
      particles = particles.filter(p => !p.toBeRemoved);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("release-spirits", handleRelease);
      window.removeEventListener("drag-basket-start", handleDragStart);
      window.removeEventListener("drag-basket-end", handleDragEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[101]"
    />
  );
}
