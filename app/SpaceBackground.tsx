'use client';

import React, { useEffect, useRef, useState } from 'react';

const GranularBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [colorScheme, setColorScheme] = useState<'dark' | 'light'>('light');

  // Utility function to convert color to RGBA
  const convertToRGBA = (color: string, alpha: number = 1) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = color;
    const rgbColor = ctx.fillStyle;
    
    // Extract RGB values
    const match = rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (match) {
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha})`;
    }
    
    // If RGB extraction fails, fallback to a default
    return `rgba(17, 17, 17, ${alpha})`;
  };

  useEffect(() => {
    // Function to detect current theme
    const detectTheme = () => {
      const rootElement = document.documentElement;
      return rootElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    };

    // Initial theme detection
    setColorScheme(detectTheme());

    // Theme change observer
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          setColorScheme(detectTheme());
        }
      }
    });

    // Start observing the html element for data-theme changes
    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
    canvas.style.transition = 'opacity 0.5s ease-in-out'; // Smooth transition
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get theme-specific colors from CSS variables
    const rootStyles = getComputedStyle(document.documentElement);
    const backgroundColor = rootStyles.getPropertyValue('--background').trim();
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const createGranularTexture = () => {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < 0.15) {
          const noiseValue = colorScheme === 'dark' ? 
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

      if (colorScheme === 'dark') {
        // Dark mode gradient
        gradient.addColorStop(0, convertToRGBA(backgroundColor, 0));
        gradient.addColorStop(0.3, convertToRGBA(backgroundColor, 0.1));
        gradient.addColorStop(0.5, convertToRGBA(backgroundColor, 0.3));
        gradient.addColorStop(0.7, convertToRGBA(backgroundColor, 0.6));
        gradient.addColorStop(1, convertToRGBA(backgroundColor, 0.9));

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
      // No gradient for light mode
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

      const delugeColors = colorScheme === 'dark' ? 
        [
          computedStyle.getPropertyValue('--deluge-150').trim(),
          computedStyle.getPropertyValue('--deluge-300').trim(),
          computedStyle.getPropertyValue('--deluge-500').trim()
        ] : 
        [
          computedStyle.getPropertyValue('--deluge-300').trim(),
          computedStyle.getPropertyValue('--deluge-500').trim(),
          computedStyle.getPropertyValue('--deluge-700').trim()
        ];

      ctx.lineWidth = lineWidth;

      const startOffset = -diagonalLength / 2;

      for (let i = 0; i < numLines; i++) {
        const offset = startOffset + i * spacing;

        const colorIndex = i % delugeColors.length;
        ctx.strokeStyle = delugeColors[colorIndex];

        ctx.globalAlpha = colorScheme === 'dark' ? 0.2 : 0.15;

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
      
      const rootStyles = getComputedStyle(document.documentElement);
      const backgroundColor = rootStyles.getPropertyValue('--background').trim();
      
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

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full overflow-hidden bg-[var(--background)] transition-colors duration-500"
    >
    </div>
  );
};

export default GranularBackground;