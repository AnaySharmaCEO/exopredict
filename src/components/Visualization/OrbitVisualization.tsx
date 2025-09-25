import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface OrbitVisualizationProps {
  orbitalPeriod: number;
  planetRadius: number;
  isExoplanet: boolean;
}

function OrbitingPlanet({ orbitalPeriod, planetRadius, isExoplanet }: OrbitVisualizationProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  
  // Scale orbital radius based on period (simplified Kepler's law)
  const orbitRadius = Math.pow(orbitalPeriod / 365, 2/3) * 3;
  const scaledPlanetRadius = Math.max(0.1, planetRadius * 0.2);
  
  useFrame(({ clock }) => {
    if (orbitRef.current) {
      // Orbital motion speed inversely related to period
      const speed = 2 / Math.sqrt(orbitalPeriod);
      orbitRef.current.rotation.y = clock.getElapsedTime() * speed;
    }
    
    if (planetRef.current) {
      // Planet rotation
      planetRef.current.rotation.y = clock.getElapsedTime() * 2;
    }
  });

  return (
    <group>
      {/* Central star */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial 
          color="#FFFF99" 
          emissive="#FFAA00"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Star glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial 
          color="#FFAA00" 
          transparent 
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbital path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.01, orbitRadius + 0.01, 64]} />
        <meshBasicMaterial 
          color={isExoplanet ? "#00FFFF" : "#FF6B6B"} 
          transparent 
          opacity={0.5}
        />
      </mesh>

      {/* Orbiting planet */}
      <group ref={orbitRef}>
        <mesh ref={planetRef} position={[orbitRadius, 0, 0]}>
          <sphereGeometry args={[scaledPlanetRadius, 16, 16]} />
          <meshStandardMaterial 
            color={isExoplanet ? "#4A90E2" : "#FF6B6B"}
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
        
        {/* Planet glow if exoplanet */}
        {isExoplanet && (
          <mesh position={[orbitRadius, 0, 0]}>
            <sphereGeometry args={[scaledPlanetRadius * 1.2, 16, 16]} />
            <meshBasicMaterial 
              color="#00FFFF" 
              transparent 
              opacity={0.2}
              side={THREE.BackSide}
            />
          </mesh>
        )}
      </group>

      {/* Background stars */}
      <Stars 
        radius={50} 
        depth={20} 
        count={200} 
        factor={2} 
        saturation={0} 
        fade 
      />
    </group>
  );
}

export function OrbitVisualization(props: OrbitVisualizationProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 8, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FFAA00" />
        
        <OrbitingPlanet {...props} />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          maxDistance={15}
          minDistance={3}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}