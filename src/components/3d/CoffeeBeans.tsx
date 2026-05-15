import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function CoffeeBeans() {
  const count = 40;
  const meshRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 15;
      const rotationX = Math.random() * Math.PI;
      const rotationY = Math.random() * Math.PI;
      const scale = 0.1 + Math.random() * 0.2;
      temp.push({ position: [x, y, z], rotation: [rotationX, rotationY, 0], scale });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={meshRef}>
      {particles.map((p, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
          <mesh position={p.position as [number, number, number]} rotation={p.rotation as [number, number, number]} scale={p.scale}>
            {/* Simple pill shape for bean */}
            <capsuleGeometry args={[0.5, 1, 4, 8]} />
            <meshStandardMaterial color="#2d1b14" roughness={0.3} metalness={0.1} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function SingleCoffeeBean({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={1}>
      <mesh position={position} scale={0.4}>
        <capsuleGeometry args={[0.5, 1, 4, 8]} />
        <meshStandardMaterial color="#2d1b14" roughness={0.2} metalness={0.2} />
      </mesh>
    </Float>
  );
}
