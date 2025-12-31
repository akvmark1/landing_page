import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  size?: number;
  spread?: number;
  speed?: number;
  color?: string;
}

export function ParticleField({ 
  count = 2000, 
  size = 0.015, 
  spread = 50,
  speed = 0.1,
  color = '#00d4ff'
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;
      
      velocities[i3] = (Math.random() - 0.5) * speed;
      velocities[i3 + 1] = (Math.random() - 0.5) * speed;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed;
    }
    
    return { positions, velocities };
  }, [count, spread, speed]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const geometry = meshRef.current.geometry;
    const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
    const positions = positionAttribute.array as Float32Array;
    
    const speedFactor = delta * 60; // Normalize to 60fps
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      positions[i3] += velocities[i3] * 0.02 * speedFactor;
      positions[i3 + 1] += velocities[i3 + 1] * 0.02 * speedFactor;
      positions[i3 + 2] += velocities[i3 + 2] * 0.02 * speedFactor;
      
      const halfSpread = spread / 2;
      if (Math.abs(positions[i3]) > halfSpread) velocities[i3] *= -1;
      if (Math.abs(positions[i3 + 1]) > halfSpread) velocities[i3 + 1] *= -1;
      if (Math.abs(positions[i3 + 2]) > halfSpread) velocities[i3 + 2] *= -1;
    }
    
    positionAttribute.needsUpdate = true;
    
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;

    if (materialRef.current) {
      materialRef.current.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
