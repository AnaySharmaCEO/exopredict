import React, { useEffect, useRef } from 'react';

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star properties
    const stars: Array<{
      x: number;
      y: number;
      z: number;
      prevX: number;
      prevY: number;
      brightness: number;
    }> = [];

    const numStars = 800;
    const speed = 0.5;
    const maxZ = 1000;

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * maxZ,
        prevX: 0,
        prevY: 0,
        brightness: Math.random(),
      });
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach((star) => {
        // Update star position
        star.z -= speed;
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = maxZ;
          star.brightness = Math.random();
        }

        // Project 3D to 2D
        const x = (star.x / star.z) * centerX + centerX;
        const y = (star.y / star.z) * centerY + centerY;

        // Calculate size and opacity based on distance
        const size = (1 - star.z / maxZ) * 3;
        const opacity = (1 - star.z / maxZ) * star.brightness;

        // Draw star trail
        if (star.prevX && star.prevY) {
          ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.3})`;
          ctx.lineWidth = size * 0.5;
          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Add some colorful stars
        if (star.brightness > 0.8) {
          ctx.fillStyle = `rgba(0, 255, 255, ${opacity * 0.5})`;
          ctx.beginPath();
          ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        if (star.brightness > 0.9) {
          ctx.fillStyle = `rgba(138, 43, 226, ${opacity * 0.3})`;
          ctx.beginPath();
          ctx.arc(x, y, size * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        star.prevX = x;
        star.prevY = y;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #000000 50%, #1a1a2e 100%)' }}
    />
  );
}