import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RingProps {
  radius: number;
  tubeRadius: number;
  color: string;
  rotationSpeed: number;
  tiltX: number;
  tiltZ: number;
}

function GlowingRing({ radius, tubeRadius, color, rotationSpeed, tiltX, tiltZ }: RingProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
    meshRef.current.rotation.x = tiltX + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    meshRef.current.rotation.z = tiltZ + Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, tubeRadius, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function GlowingRings() {
  return (
    <group position={[0, 0, -15]}>
      <GlowingRing radius={8} tubeRadius={0.02} color="#00d4ff" rotationSpeed={0.1} tiltX={0.5} tiltZ={0.2} />
      <GlowingRing radius={10} tubeRadius={0.015} color="#0066ff" rotationSpeed={-0.08} tiltX={0.3} tiltZ={-0.1} />
      <GlowingRing radius={12} tubeRadius={0.01} color="#00ffff" rotationSpeed={0.05} tiltX={0.7} tiltZ={0.3} />
      <GlowingRing radius={15} tubeRadius={0.008} color="#0099ff" rotationSpeed={-0.03} tiltX={0.4} tiltZ={-0.2} />
    </group>
  );
}
