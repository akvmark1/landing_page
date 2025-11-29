import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WaveGridProps {
  size?: number;
  segments?: number;
}

export function WaveGrid({ size = 100, segments = 50 }: WaveGridProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    return geo;
  }, [size, segments]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const positions = geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      positions[i + 2] = 
        Math.sin(x * 0.1 + time * 0.5) * 0.5 +
        Math.cos(y * 0.1 + time * 0.3) * 0.5 +
        Math.sin((x + y) * 0.05 + time * 0.2) * 0.3;
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -20, -30]}
    >
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#0066ff"
        emissiveIntensity={0.1}
        wireframe
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
