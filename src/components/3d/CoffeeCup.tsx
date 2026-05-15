import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function CoffeeCup() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Cup Body */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[1, 0.8, 1.5, 32]} />
          <meshStandardMaterial color="#F5F5F0" roughness={0.1} metalness={0.5} />
        </mesh>
        
        {/* Cup Handle */}
        <mesh position={[1, -0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.4, 0.1, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#F5F5F0" roughness={0.1} metalness={0.5} />
        </mesh>

        {/* Coffee Surface */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.1, 32]} />
          <meshStandardMaterial color="#2d1b14" />
        </mesh>

        {/* Steam Effect (Abstract) */}
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <MeshDistortMaterial color="#ffffff" opacity={0.2} transparent factor={1} speed={2} />
        </mesh>
      </Float>
    </group>
  );
}
