'use client';

import React, { useEffect, useRef, useState } from 'react';

const GranularBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [colorScheme, setColorScheme] = useState<'dark' | 'light'>(
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light'
  );

  useEffect(() => {
    if (!containerRef.current) return;

    if (canvasRef.current && containerRef.current.contains(canvasRef.current)) {
      containerRef.current.removeChild(canvasRef.current);
      canvasRef.current = null;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDarkMode = colorScheme === 'dark';
    const backgroundColor = isDarkMode ? '#111111' : 'hsl(252, 36%, 95%)';
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const createGranularTexture = () => {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < 0.15) {
          const noiseValue = isDarkMode ? 
            Math.floor(Math.random() * 40) + 10 :
            Math.floor(Math.random() * 40) + 215;
          data[i] = noiseValue;
          data[i + 1] = noiseValue;
          data[i + 2] = noiseValue;
          data[i + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    createGranularTexture();

    const createCircularMask = () => {
      const centerX = width * 0.7;
      const centerY = height * 0.5;
      const maxRadius = Math.max(width, height) * 0.8;

      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, maxRadius
      );

      if (isDarkMode) {
        gradient.addColorStop(0, 'rgba(20, 20, 20, 0)');
        gradient.addColorStop(0.3, 'rgba(20, 20, 20, 0.1)');
        gradient.addColorStop(0.5, 'rgba(20, 20, 20, 0.3)');
        gradient.addColorStop(0.7, 'rgba(20, 20, 20, 0.6)');
        gradient.addColorStop(1, 'rgba(17, 17, 17, 0.9)');
      } else {
        gradient.addColorStop(0, 'hsla(252, 36%, 95%, 0)');
        gradient.addColorStop(0.3, 'hsla(252, 36%, 95%, 0.1)');
        gradient.addColorStop(0.5, 'hsla(252, 36%, 95%, 0.3)');
        gradient.addColorStop(0.7, 'hsla(252, 36%, 95%, 0.6)');
        gradient.addColorStop(1, 'hsla(252, 36%, 95%, 0.9)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    createCircularMask();

    const drawDashPatterns = () => {
      const spacing = 60;
      const dashLength = 15;
      const gapLength = 15;
      const lineWidth = 1;

      const diagonalLength = Math.sqrt(width * width + height * height);
      const numLines = Math.ceil(diagonalLength / spacing) * 2;

      const computedStyle = getComputedStyle(document.documentElement);

      const delugeColors = isDarkMode ? 
        [
          computedStyle.getPropertyValue('--deluge-150').trim() || 'hsl(249, 37%, 89%)',
          computedStyle.getPropertyValue('--deluge-300').trim() || 'hsl(244, 33%, 85%)',
          computedStyle.getPropertyValue('--deluge-500').trim() || 'hsl(249, 36%, 66%)'
        ] : 
        [
          computedStyle.getPropertyValue('--deluge-300').trim() || 'hsl(244, 33%, 85%)',
          computedStyle.getPropertyValue('--deluge-500').trim() || 'hsl(249, 36%, 66%)',
          computedStyle.getPropertyValue('--deluge-700').trim() || 'hsl(253, 28%, 54%)'
        ];

      ctx.lineWidth = lineWidth;

      const startOffset = -diagonalLength / 2;

      for (let i = 0; i < numLines; i++) {
        const offset = startOffset + i * spacing;

        const colorIndex = i % delugeColors.length;
        ctx.strokeStyle = delugeColors[colorIndex];

        ctx.globalAlpha = isDarkMode ? 0.2 : 0.15;

        ctx.save();

        ctx.translate(width / 2, height / 2);
        ctx.rotate(Math.PI / 4);
        ctx.translate(-width / 2, -height / 2);

        ctx.beginPath();

        ctx.setLineDash([dashLength, gapLength]);

        ctx.moveTo(0, offset);
        ctx.lineTo(diagonalLength, offset);
        ctx.stroke();

        ctx.restore();
      }

      ctx.globalAlpha = 1.0;
    };

    drawDashPatterns();

    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      canvasRef.current.width = width;
      canvasRef.current.height = height;
      
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      createGranularTexture();
      createCircularMask();
      drawDashPatterns();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (canvasRef.current && container.contains(canvasRef.current)) {
        container.removeChild(canvasRef.current);
      }
    };
  }, [colorScheme]);

  useEffect(() => {
    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleColorSchemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleColorSchemeChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden bg-[var(--deluge-100)]">
    </div>
  );
};

export default GranularBackground;