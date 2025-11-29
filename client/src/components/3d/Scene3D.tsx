import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { ParticleField } from './ParticleField';
import { FloatingOrbs } from './FloatingOrbs';
import { GlowingRings } from './GlowingRings';
import { WaveGrid } from './WaveGrid';

function CameraController() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.02;
    camera.position.y += (-mouseRef.current.y * 2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, -10);
  });

  return null;
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0066ff" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#ffffff"
      />
    </>
  );
}

function GradientBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -100]}>
      <planeGeometry args={[300, 300]} />
      <shaderMaterial
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color('#000000') },
          uColor2: { value: new THREE.Color('#001122') },
          uColor3: { value: new THREE.Color('#002244') },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying vec2 vUv;
          void main() {
            float mixFactor = vUv.y;
            vec3 color = mix(uColor1, uColor2, smoothstep(0.0, 0.5, mixFactor));
            color = mix(color, uColor3, smoothstep(0.5, 1.0, mixFactor));
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export function Scene3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000000']} />
        
        <Suspense fallback={null}>
          <CameraController />
          <Lighting />
          <GradientBackground />
          
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
          
          <ParticleField count={1500} spread={60} />
          <FloatingOrbs />
          <GlowingRings />
          <WaveGrid />
          
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh position={[0, 0, -20]}>
              <icosahedronGeometry args={[3, 1]} />
              <meshStandardMaterial
                color="#00d4ff"
                emissive="#0066ff"
                emissiveIntensity={0.2}
                wireframe
                transparent
                opacity={0.3}
              />
            </mesh>
          </Float>
          
          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new THREE.Vector2(0.0005, 0.0005)}
              radialModulation={false}
              modulationOffset={0.15}
            />
            <Vignette
              offset={0.3}
              darkness={0.7}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
