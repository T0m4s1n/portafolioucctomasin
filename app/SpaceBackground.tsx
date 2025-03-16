'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpaceBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 1); // Negro sólido como fondo
    container.appendChild(renderer.domElement);
    
    // Create scene and camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Fondo negro
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 20;
    
    // Create starfield with white stars
    const createStarfield = () => {
      const starCount = 800;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      
      // Distribute stars in a 3D space
      for (let i = 0; i < starCount; i++) {
        // Scatter stars throughout the scene
        positions[i * 3] = (Math.random() - 0.5) * 100;     // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
        positions[i * 3 + 2] = Math.random() * -100;        // z
        
        // Vary star sizes - make them smaller for subtler effect
        sizes[i] = Math.random() * 0.8 + 0.2;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Create material with custom shaders for white stars
      const material = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: `
          attribute float size;
          
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          void main() {
            float r = distance(gl_PointCoord, vec2(0.5, 0.5));
            if (r > 0.5) discard;
            

            float intensity = 1.0 - r * 2.0;
            gl_FragColor = vec4(1.0, 1.0, 1.0, intensity); 
          }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
      });
      
      return new THREE.Points(geometry, material);
    };
    
    const createCloudTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d')!;

      const gradient = context.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0, 
        canvas.width / 2, 
        canvas.height / 2, 
        canvas.width / 2
      );

      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.format = THREE.RGBAFormat;
      texture.needsUpdate = true;
      
      return texture;
    };
    
    const cloudTexture = createCloudTexture();
    
    const createNebulaCloud = (x: number, y: number, z: number, size: number, color: string, opacity: number) => {
      const particleCount = Math.floor(80 + Math.random() * 50);
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);
      
      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = size * (0.2 + 0.8 * Math.pow(Math.random(), 1.5)); 

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        
        scales[i] = 1.0 + Math.random() * 4.0;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(color) },
          cloudTexture: { value: cloudTexture },
          opacity: { value: opacity }
        },
        vertexShader: `
          attribute float scale;
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = scale * (40.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float opacity;
          uniform sampler2D cloudTexture;
          varying vec2 vUv;
          
          void main() {
            vec4 texColor = texture2D(cloudTexture, gl_PointCoord);
            
            float intensity = texColor.a * opacity * 2.0;
            gl_FragColor = vec4(color, intensity);
            
            if (gl_FragColor.a < 0.01) discard;
          }
        `,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
        transparent: true
      });
      
      const cloudParticles = new THREE.Points(geometry, material);
      cloudParticles.position.set(x, y, z);
      
      cloudParticles.rotation.x = Math.random() * Math.PI;
      cloudParticles.rotation.y = Math.random() * Math.PI;
      cloudParticles.rotation.z = Math.random() * Math.PI;
      
      cloudParticles.userData = {
        lifespan: Math.random() * 15 + 10, 
        age: 0,
        fadeInTime: Math.random() * 2 + 1,
        fadeOutTime: Math.random() * 3 + 2,
        maxOpacity: opacity,
        velocityX: (Math.random() - 0.5) * 0.03,
        velocityY: (Math.random() - 0.5) * 0.03,
        velocityZ: (Math.random() - 0.5) * 0.01,
        rotationX: (Math.random() - 0.5) * 0.001,
        rotationY: (Math.random() - 0.5) * 0.001,
        rotationZ: (Math.random() - 0.5) * 0.001,
        pulseSpeed: 0.2 + Math.random() * 0.3, 
        pulseAmount: 0.1 + Math.random() * 0.2, 
        pulseOffset: Math.random() * Math.PI * 2 
      };
      
      return cloudParticles;
    };

    const nebulaClouds = new THREE.Group();
    scene.add(nebulaClouds);
    
    const addRandomNebula = () => {
      const x = (Math.random() - 0.5) * 70;
      const y = (Math.random() - 0.5) * 70;
      const z = -10 - Math.random() * 50; 
      
      const size = Math.random() * 18 + 8;
      
      const colorOptions = [
        'hsl(270, 80%, 50%)',
        'hsl(280, 85%, 45%)',
        'hsl(220, 90%, 55%)',
        'hsl(210, 85%, 60%)',
        'hsl(300, 85%, 60%)',
        'hsl(310, 80%, 55%)',
        'hsl(180, 80%, 50%)',
        'hsl(190, 85%, 55%)'
      ];
      
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      const opacity = Math.random() * 0.15 + 0.1;
      
      const cloud = createNebulaCloud(x, y, z, size, color, opacity);
      nebulaClouds.add(cloud);
      
      return cloud;
    };
    
    const maxNebulae = 32;
    for (let i = 0; i < maxNebulae / 2; i++) {
      const nebula = addRandomNebula();
      nebula.userData.age = Math.random() * nebula.userData.lifespan * 0.3; 
    }

    const starfield = createStarfield();
    scene.add(starfield);
    
    let time = 0;
    let lastNebulaTime = 0;
    
    const animate = () => {
      const delta = 0.016;
      time += delta;
      
      if (starfield && starfield.geometry.attributes.position) {
        const positions = starfield.geometry.attributes.position;
        const sizes = starfield.geometry.attributes.size;
        
        for (let i = 0; i < positions.count; i++) {
          positions.setZ(i, positions.getZ(i) + 0.05);
          
          if (positions.getZ(i) > 10) {
            positions.setX(i, (Math.random() - 0.5) * 100);
            positions.setY(i, (Math.random() - 0.5) * 100);
            positions.setZ(i, -100);
            
            sizes.setX(i, Math.random() * 0.8 + 0.2);
          }
        }
        
        positions.needsUpdate = true;
        sizes.needsUpdate = true;
      }
      
      if (time - lastNebulaTime > (Math.random() * 1.5 + 0.5) && nebulaClouds.children.length < maxNebulae) {
        addRandomNebula();
        lastNebulaTime = time;
      }

      const nebulaeToRemove: THREE.Object3D[] = [];
      nebulaClouds.children.forEach((cloud) => {
        const cloudData = cloud.userData;
        cloudData.age += delta;
        
        cloud.position.x += cloudData.velocityX;
        cloud.position.y += cloudData.velocityY;
        cloud.position.z += cloudData.velocityZ;
        cloud.rotation.x += cloudData.rotationX;
        cloud.rotation.y += cloudData.rotationY;
        cloud.rotation.z += cloudData.rotationZ;
        
        const pulseEffect = 1.0 + cloudData.pulseAmount * Math.sin(time * cloudData.pulseSpeed + cloudData.pulseOffset);
        cloud.scale.set(pulseEffect, pulseEffect, pulseEffect);
        
        if (cloudData.age < cloudData.fadeInTime) {
          const baseOpacity = (cloudData.age / cloudData.fadeInTime) * cloudData.maxOpacity;
          const pulsingOpacity = baseOpacity * (1.0 + 0.2 * Math.sin(time * 2 + cloudData.pulseOffset));
          ((cloud as THREE.Points).material as THREE.ShaderMaterial).uniforms.opacity.value = pulsingOpacity;
        } else if (cloudData.age > cloudData.lifespan - cloudData.fadeOutTime) {
          const fadeOutProgress = (cloudData.age - (cloudData.lifespan - cloudData.fadeOutTime)) / cloudData.fadeOutTime;
          const baseOpacity = (1 - fadeOutProgress) * cloudData.maxOpacity;
          const pulsingOpacity = baseOpacity * (1.0 + 0.1 * Math.sin(time * 2 + cloudData.pulseOffset));
          ((cloud as THREE.Points).material as THREE.ShaderMaterial).uniforms.opacity.value = pulsingOpacity;
        } else {
          const pulsingOpacity = cloudData.maxOpacity * (1.0 + 0.15 * Math.sin(time * 2 + cloudData.pulseOffset));
          ((cloud as THREE.Points).material as THREE.ShaderMaterial).uniforms.opacity.value = pulsingOpacity;
        }

        if (cloudData.age >= cloudData.lifespan) {
          nebulaeToRemove.push(cloud);
        }
      });

      nebulaeToRemove.forEach(cloud => {
        nebulaClouds.remove(cloud);
        (cloud as THREE.Points).geometry.dispose();
        ((cloud as THREE.Points).material as THREE.Material).dispose();
      });
      
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      
      cloudTexture.dispose();
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          if (object.geometry) object.geometry.dispose();
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(mat => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
    };
  }, []);
  
  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden bg-black">
    </div>
  );
};

export default SpaceBackground;