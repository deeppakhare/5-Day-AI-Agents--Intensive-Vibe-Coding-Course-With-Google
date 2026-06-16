import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function TechSphere() {
  const outerGroupRef = useRef<THREE.Group>(null);
  const innerGroupRef = useRef<THREE.Group>(null);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  
  const count = 200;
  const targetScale = useRef(1);

  const [geometry, material] = useMemo(() => {
    return [
      new THREE.BoxGeometry(0.08, 0.08, 0.08),
      new THREE.MeshBasicMaterial({ color: '#e0c3fc', transparent: true, opacity: 0.8 })
    ];
  }, []);
  
  useEffect(() => {
    const handleScale = (e: Event) => {
      const customEvent = e as CustomEvent;
      targetScale.current = customEvent.detail.scale;
    };
    window.addEventListener('skill-sphere-scale', handleScale);
    return () => window.removeEventListener('skill-sphere-scale', handleScale);
  }, []);
  
  useEffect(() => {
    if (!instancedMeshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
        // Fibonacci sphere
        const phi = Math.acos(1 - 2 * (i + 0.5) / count);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        
        const r = 2.4; // Radius of sphere
        dummy.position.setFromSphericalCoords(r, phi, theta);
        dummy.lookAt(0, 0, 0);
        dummy.updateMatrix();
        instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    }
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  useFrame((state, delta) => {
    if (innerGroupRef.current) {
      innerGroupRef.current.rotation.x += delta * 0.1;
      innerGroupRef.current.rotation.y += delta * 0.15;
    }
    
    if (outerGroupRef.current) {
      // Smooth mouse interaction transition
      const targetX = state.pointer.y * 0.5;
      const targetY = state.pointer.x * 0.5;
      
      outerGroupRef.current.rotation.x += (targetX - outerGroupRef.current.rotation.x) * 5 * delta;
      outerGroupRef.current.rotation.y += (targetY - outerGroupRef.current.rotation.y) * 5 * delta;
      
      const s = targetScale.current;
      outerGroupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 5 * delta);
    }
  });

  return (
    <group ref={outerGroupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={innerGroupRef}>
          <instancedMesh 
            ref={instancedMeshRef} 
            args={[geometry, material, count]} 
            frustumCulled={true} 
          />
          <mesh frustumCulled={true}>
            <icosahedronGeometry args={[2.3, 1]} />
            <meshBasicMaterial color="#9d4edd" wireframe transparent opacity={0.15} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.05;
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 2;
    }
  });

  const particleCount = 2000;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    
    for(let i=0; i<particleCount; i++) {
      pos[i*3] = (Math.random() - 0.5) * 50;
      pos[i*3+1] = (Math.random() - 0.5) * 50;
      pos[i*3+2] = (Math.random() - 0.5) * 50;
      
      const isPurple = Math.random() > 0.5;
      col[i*3] = isPurple ? 0.6 : 1;
      col[i*3+1] = isPurple ? 0.3 : 1;
      col[i*3+2] = isPurple ? 0.8 : 1;
    }
    return [pos, col];
  }, [particleCount]);

  return (
    <points ref={pointsRef} frustumCulled={true}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a0b2e] via-[#050505] to-[#000000]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <TechSphere />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
