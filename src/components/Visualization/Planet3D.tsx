import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface Planet3DProps {
  size?: number;
  autoRotate?: boolean;
  color?: string;
  className?: string;
}

function RotatingPlanet({ size = 1, color = '#4A90E2' }: { size?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a realistic planet texture
  const planetTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, '#2A5A8A');
      gradient.addColorStop(1, '#1A3A5A');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      // Add some surface features
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 20 + 5;
        
        ctx.fillStyle = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 150}, ${Math.random() * 100 + 200}, 0.3)`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [color]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[size, 64, 64]}>
        <meshStandardMaterial 
          map={planetTexture}
          roughness={0.8}
          metalness={0.2}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[size * 1.05, 32, 32]}>
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

export function Planet3D({ size = 1, autoRotate = true, color = '#4A90E2', className = '' }: Planet3DProps) {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00FFFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8A2BE2" />
        
        <RotatingPlanet size={size} color={color} />
        
        <Stars 
          radius={50} 
          depth={50} 
          count={1000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5}
        />
        
        {autoRotate && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />}
      </Canvas>
    </div>
  );
}