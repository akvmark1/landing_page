import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbProps {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
  offset: number;
}

function Orb({ position, color, size, speed, offset }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;
    
    const time = state.clock.elapsedTime + offset;
    
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 2;
    meshRef.current.position.x = position[0] + Math.cos(time * speed * 0.7) * 1.5;
    meshRef.current.position.z = position[2] + Math.sin(time * speed * 0.5) * 1;
    
    glowRef.current.position.copy(meshRef.current.position);
    glowRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.2);
  });

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[size * 2, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export function FloatingOrbs() {
  const orbs = useMemo(() => [
    { position: [-15, 5, -10] as [number, number, number], color: '#00d4ff', size: 0.8, speed: 0.3, offset: 0 },
    { position: [12, -3, -8] as [number, number, number], color: '#0066ff', size: 0.6, speed: 0.4, offset: 1 },
    { position: [-8, -6, -12] as [number, number, number], color: '#00ffff', size: 0.5, speed: 0.35, offset: 2 },
    { position: [18, 8, -15] as [number, number, number], color: '#0099ff', size: 0.7, speed: 0.25, offset: 3 },
    { position: [-20, 0, -20] as [number, number, number], color: '#00d4ff', size: 0.4, speed: 0.45, offset: 4 },
    { position: [8, 10, -18] as [number, number, number], color: '#0066ff', size: 0.55, speed: 0.38, offset: 5 },
  ], []);

  return (
    <group>
      {orbs.map((orb, index) => (
        <Orb key={index} {...orb} />
      ))}
    </group>
  );
}
