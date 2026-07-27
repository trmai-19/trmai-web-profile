"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CorgiMinigameProps {
  onClose: () => void;
}

export function CorgiMinigame({ onClose }: CorgiMinigameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const corgiRef = useRef<HTMLDivElement>(null);

  const [gameState, setGameState] = useState<"playing" | "win" | "lose">("playing");
  const [timeLeft, setTimeLeft] = useState(60);
  const [hitCount, setHitCount] = useState(0);
  const [countdown, setCountdown] = useState(5);

  // Mutable state cho Game Loop (60fps)
  const corgiPos = useRef({ x: 0, y: 0 });
  const startDragPos = useRef({ x: 0, y: 0 });
  const startCorgiPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  
  const bullets = useRef<any[]>([]);
  const gameTime = useRef(0);
  const hits = useRef(0);
  const isGameOver = useRef(false);
  const requestRef = useRef<number>(0);
  const lastSpawnTime = useRef(0);
  const scaleMultiplier = useRef(2);

  // Constants
  const corgiOrange = "#F29C38";
  const corgiDarkOrange = "#D87A1D";
  const corgiWhite = "#FFFFFF";
  const corgiPink = "#FF8DA1";
  const corgiBlack = "#333333";

  useEffect(() => {
    // Khởi tạo vị trí chính giữa màn hình
    corgiPos.current = {
      x: window.innerWidth / 2 - 40,
      y: window.innerHeight / 2 - 30,
    };
    // Tính toán tỷ lệ phóng to dựa trên kích thước màn hình
    // Base scale = 0.6 (48px). Ở hit thứ 5 (nổ), Corgi chiếm khoảng 90% cạnh nhỏ nhất của màn hình.
    const maxSize = Math.min(window.innerWidth, window.innerHeight) * 0.9;
    const maxScale = maxSize / 80; // Vì SVG là 80x80
    scaleMultiplier.current = Math.pow(maxScale / 0.6, 1 / 5);

    if (corgiRef.current) {
      corgiRef.current.style.transform = `translate3d(${corgiPos.current.x}px, ${corgiPos.current.y}px, 0) scale(0.6)`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver.current) return;
      const speed = 25;
      if (e.key === "ArrowUp" || e.key === "w") corgiPos.current.y -= speed;
      if (e.key === "ArrowDown" || e.key === "s") corgiPos.current.y += speed;
      if (e.key === "ArrowLeft" || e.key === "a") corgiPos.current.x -= speed;
      if (e.key === "ArrowRight" || e.key === "d") corgiPos.current.x += speed;
      
      // Clamp
      corgiPos.current.x = Math.max(0, Math.min(window.innerWidth - 80, corgiPos.current.x));
      corgiPos.current.y = Math.max(0, Math.min(window.innerHeight - 60, corgiPos.current.y));
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const spawnBullet = (time: number) => {
    // Tăng tốc độ và số lượng theo thời gian (time là thời gian đã chơi theo giây)
    const difficultyMultiplier = 1 + time / 20; // Tăng độ khó nhanh hơn (mỗi 20s)
    
    // Đạn bay từ viền màn hình vào
    const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let x, y, vx, vy;
    const speed = (Math.random() * 5 + 6) * difficultyMultiplier; // Đạn bay nhanh ngay từ đầu
    
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (edge === 0) {
      x = Math.random() * w; y = -20;
    } else if (edge === 1) {
      x = w + 20; y = Math.random() * h;
    } else if (edge === 2) {
      x = Math.random() * w; y = h + 20;
    } else {
      x = -20; y = Math.random() * h;
    }

    // Nhắm thẳng vào tâm Corgi hiện tại
    const targetX = corgiPos.current.x + 40;
    const targetY = corgiPos.current.y + 30;
    const dx = targetX - x;
    const dy = targetY - y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    vx = (dx / dist) * speed;
    vy = (dy / dist) * speed;

    // Đôi lúc thêm chút nhiễu loạn để đạn không hoàn toàn thành đường thẳng
    vx += (Math.random() - 0.5) * speed * 0.3;
    vy += (Math.random() - 0.5) * speed * 0.3;

    bullets.current.push({
      x, y, vx, vy,
      radius: Math.random() * 8 + 8, // Tăng kích thước bự hơn
      color: `hsl(${Math.random() * 360}, 80%, 60%)`
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    const startTime = performance.now();

    const loop = (now: number) => {
      if (isGameOver.current) return;
      
      const elapsedMs = now - startTime;
      const elapsedSec = elapsedMs / 1000;
      gameTime.current = elapsedSec;
      
      // Update Timer UI mỗi nửa giây để tối ưu
      const currentLeft = Math.max(0, 60 - Math.floor(elapsedSec));
      setTimeLeft((prev) => (prev !== currentLeft ? currentLeft : prev));

      if (currentLeft <= 0) {
        isGameOver.current = true;
        setGameState("win");
        return;
      }

      // Spawn đạn
      // Base rate: 400ms / difficulty
      const spawnInterval = Math.max(50, 400 - (elapsedSec * 6)); // Giảm dần tới 50ms (dày đặc)
      if (now - lastSpawnTime.current > spawnInterval) {
        spawnBullet(elapsedSec);
        // Có thể spawn 2-3 viên cùng lúc nếu qua 30s
        if (elapsedSec > 30 && Math.random() > 0.5) spawnBullet(elapsedSec);
        if (elapsedSec > 60 && Math.random() > 0.3) spawnBullet(elapsedSec);
        lastSpawnTime.current = now;
      }

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Cập nhật Corgi DOM Position & Scale
      const scale = 0.6 * Math.pow(scaleMultiplier.current, hits.current);
      if (corgiRef.current) {
        corgiRef.current.style.transform = `translate3d(${corgiPos.current.x}px, ${corgiPos.current.y}px, 0) scale(${scale})`;
      }

      // Hitbox của Corgi
      const hitRadius = 25 * scale;
      const corgiCenterX = corgiPos.current.x + 40;
      const corgiCenterY = corgiPos.current.y + 30;

      // Update & Draw Bullets
      for (let i = bullets.current.length - 1; i >= 0; i--) {
        const b = bullets.current[i];
        b.x += b.vx;
        b.y += b.vy;

        // Draw
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = width < 768 ? 0 : 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Collision detection
        const dx = b.x - corgiCenterX;
        const dy = b.y - corgiCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < hitRadius + b.radius) {
          // HIT!
          hits.current++;
          setHitCount(hits.current);
          bullets.current.splice(i, 1); // Xoá viên đạn này
          
          // Flash đỏ màn hình một chút
          ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
          ctx.fillRect(0, 0, width, height);

          if (hits.current >= 5) {
            isGameOver.current = true;
            setGameState("lose");
            return;
          }
          continue;
        }

        // Xoá đạn nếu bay ra ngoài
        if (b.x < -50 || b.x > width + 50 || b.y < -50 || b.y > height + 50) {
          bullets.current.splice(i, 1);
        }
      }

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (gameState !== "playing") {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  useEffect(() => {
    if (countdown <= 0) {
      onClose();
    }
  }, [countdown, onClose]);

  // Điều khiển Joystick cảm ứng / Chuột
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startDragPos.current = { x: e.clientX, y: e.clientY };
    startCorgiPos.current = { ...corgiPos.current };
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || isGameOver.current) return;
    
    // Joystick logic: di chuyển tương đối so với ngón tay/chuột
    const dx = e.clientX - startDragPos.current.x;
    const dy = e.clientY - startDragPos.current.y;
    
    // Hệ số nhạy
    const sensitivity = 1.3;
    let newX = startCorgiPos.current.x + dx * sensitivity;
    let newY = startCorgiPos.current.y + dy * sensitivity;

    // Clamp boundary
    newX = Math.max(0, Math.min(window.innerWidth - 80, newX));
    newY = Math.max(0, Math.min(window.innerHeight - 60, newY));

    corgiPos.current = { x: newX, y: newY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100000] bg-dusk/90 backdrop-blur-sm overflow-hidden touch-none"
    >
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        {/* Corgi Character DOM Layer */}
        {gameState === "playing" && (
          <div ref={corgiRef} className="absolute w-[80px] h-[60px] pointer-events-none origin-center" style={{ willChange: "transform" }}>
            {/* Dáng Corgi đi bộ nhìn ngang */}
            <svg width="80" height="60" viewBox="0 0 120 80">
              <motion.rect x="35" y="55" width="12" height="18" rx="6" fill={corgiDarkOrange}
                animate={{ rotate: [-25, 25, -25] }} 
                transition={{ repeat: Infinity, duration: 0.2, ease: "easeInOut" }} 
                style={{ originX: 0.5, originY: 0 }} 
              />
              <motion.rect x="75" y="55" width="12" height="18" rx="6" fill={corgiDarkOrange}
                animate={{ rotate: [25, -25, 25] }} 
                transition={{ repeat: Infinity, duration: 0.2, ease: "easeInOut" }} 
                style={{ originX: 0.5, originY: 0 }} 
              />
              <circle cx="20" cy="40" r="10" fill={corgiWhite} />
              <rect x="25" y="25" width="60" height="40" rx="20" fill={corgiOrange} />
              <path d="M 35 65 C 35 55, 80 55, 80 65 Z" fill={corgiWhite} />
              <motion.rect x="28" y="55" width="14" height="20" rx="7" fill={corgiWhite}
                animate={{ rotate: [25, -25, 25] }} 
                transition={{ repeat: Infinity, duration: 0.2, ease: "easeInOut" }} 
                style={{ originX: 0.5, originY: 0 }} 
              />
              <motion.rect x="80" y="55" width="14" height="20" rx="7" fill={corgiWhite}
                animate={{ rotate: [-25, 25, -25] }} 
                transition={{ repeat: Infinity, duration: 0.2, ease: "easeInOut" }} 
                style={{ originX: 0.5, originY: 0 }} 
              />
              <circle cx="85" cy="40" r="18" fill={corgiWhite} />
              <circle cx="95" cy="30" r="18" fill={corgiOrange} />
              <ellipse cx="108" cy="35" rx="10" ry="7" fill={corgiWhite} />
              <circle cx="115" cy="32" r="3" fill={corgiBlack} />
              <circle cx="102" cy="25" r="3.5" fill={corgiBlack} />
              <circle cx="103" cy="24" r="1" fill={corgiWhite} />
              <path d="M 108 40 L 108 46 C 108 48, 112 48, 112 46 L 112 40 Z" fill={corgiPink} />
              <path d="M 85 20 L 75 0 L 95 10 Z" fill={corgiDarkOrange} />
              <path d="M 95 18 L 90 -2 L 108 8 Z" fill={corgiOrange} />
              <path d="M 97 16 L 93 4 L 104 10 Z" fill={corgiPink} />
            </svg>
          </div>
        )}
      </div>

      {/* UI Lớp trên cùng */}
      <div className="absolute top-8 left-0 right-0 flex justify-between items-center px-8 pointer-events-none">
        <div className="text-white font-display text-2xl font-bold bg-black/30 px-4 py-2 rounded-xl backdrop-blur-md">
          Survive: <span className="text-mint">{timeLeft}s</span>
        </div>
        <div className="text-white font-display text-2xl font-bold bg-black/30 px-4 py-2 rounded-xl backdrop-blur-md">
          Hits: <span className={hitCount >= 4 ? "text-red-500 animate-pulse" : "text-peach"}>{hitCount}/5</span>
        </div>
      </div>

      {/* Game Over / Win Screens */}
      <AnimatePresence>
        {gameState !== "playing" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto"
          >
            <div className="bg-dusk-card border-2 border-moon/40 p-10 rounded-4xl text-center shadow-[0_0_50px_rgba(201,184,240,0.2)]">
              {gameState === "win" ? (
                <>
                  <h2 className="text-5xl font-display font-extrabold text-mint mb-4">YOU WIN! 🏆</h2>
                  <p className="text-cream/80 mb-8">Bé Corgi siêu đẳng, né đạn tuyệt vời!</p>
                </>
              ) : (
                <>
                  <h2 className="text-5xl font-display font-extrabold text-red-500 mb-4">GAME OVER 💥</h2>
                  <p className="text-cream/80 mb-8">Bé Corgi đã ăn quá nhiều đạn và nổ tung :(</p>
                </>
              )}
              <p className="text-cream/50 mt-4 font-mono">Quay lại profile sau {countdown}s...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
