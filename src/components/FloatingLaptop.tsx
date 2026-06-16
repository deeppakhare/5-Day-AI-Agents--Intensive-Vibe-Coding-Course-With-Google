import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Extremely simple syntax highlighting just for visual effect
function syntaxHighlight(code: string) {
  return code
    .replace(/const|let|var|function/g, '<span style="color: #bb9af7">$&</span>')
    .replace(/".*?"/g, '<span style="color: #9ece6a">$&</span>')
    .replace(/developer|name|role|passion|goal|skills|system|boot|mode|theme|status/g, '<span style="color: #7aa2f7">$&</span>')
    .replace(/\{|\}|\:|\[|\]/g, '<span style="color: #89ddff">$&</span>');
}

// Typing Effect inside Laptop Screen
function ScreenUI() {
  const [text, setText] = useState('');
  const [viewIndex, setViewIndex] = useState(0);
  
  const codeString = `const developer = {
  name: "Deep Pakhare",
  role: "MERN Developer",
  passion: "AI & Innovation",
  goal: "Build solutions that matter",
  skills: ["React", "Node", "MongoDB", "Three.js"]
};

// Initialize futuristic portfolio...
system.boot({
  mode: "creative",
  theme: "dark-glassmorphism",
  status: "ready"
});`;

  const terminalString = `guest@deep-os:~$ whoami
Deep Pakhare

guest@deep-os:~$ skills
React, JavaScript, MongoDB, Tailwind, Three.js

guest@deep-os:~$ status
System Online. Innovation Engine Running.
All systems nominal.`;

  useEffect(() => {
    // Switch between Code Editor and Terminal every 8 seconds
    const interval = setInterval(() => {
      setViewIndex((prev) => (prev === 0 ? 1 : 0));
      setText(''); // Reset typing
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const targetString = viewIndex === 0 ? codeString : terminalString;
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= targetString.length) {
        setText(targetString.substring(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, viewIndex === 0 ? 15 : 25);
    
    return () => clearInterval(typeInterval);
  }, [viewIndex]);

  return (
    <div className="w-full h-full bg-[#0a0a0f] text-[#a9b1d6] p-8 font-mono text-xl md:text-2xl border-4 border-[#1a1a2e] flex flex-col relative select-none">
      {/* Window Controls */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-[#151520] border-b border-[#252535] flex items-center px-6 gap-3">
        <div className="w-4 h-4 rounded-full bg-red-500" />
        <div className="w-4 h-4 rounded-full bg-yellow-500" />
        <div className="w-4 h-4 rounded-full bg-green-500" />
        <div className="ml-4 text-base text-[#5a5a7a]">
          {viewIndex === 0 ? 'developer.ts - VS Code' : 'deep-os - Terminal'}
        </div>
      </div>
      
      <div className="mt-12 flex-1 overflow-hidden whitespace-pre-wrap leading-relaxed">
        {viewIndex === 0 ? (
           <span dangerouslySetInnerHTML={{ __html: syntaxHighlight(text) }} />
        ) : (
           <span className="text-[#a9b1d6]">{text}</span>
        )}
        <span className="inline-block w-4 h-7 bg-[#9d4edd] animate-pulse align-middle ml-1 translate-y-[2px]" />
      </div>
      
      {/* Click indicator */}
      <div className="absolute bottom-6 right-6 bg-[#9d4edd]/20 text-[#e0c3fc] border border-[#9d4edd]/50 px-6 py-3 rounded-full text-base animate-pulse flex items-center gap-2 shadow-[0_0_15px_rgba(157,78,221,0.3)]">
         Click to Open Interactive Terminal
      </div>
    </div>
  );
}

// Laptop Model
function LaptopModel({ onClick }: { onClick: () => void }) {
  const group = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      // Smoothly tilt laptop based on mouse position
      const targetX = state.pointer.y * 0.2 + 0.05;
      const targetY = state.pointer.x * 0.3;
      
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.1);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.1);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 4) * 0.05, 0.1);
      
      // Floating offset
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(t) * 0.1, 0.1);
    }
    
    if (screenRef.current) {
      const targetEmissive = hovered ? 0.6 : 0.2;
      (screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 
        THREE.MathUtils.lerp((screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity, targetEmissive, 0.1);
    }
  });

  return (
    <group 
      ref={group} 
      onClick={(e) => { e.stopPropagation(); onClick(); }} 
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }} 
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      scale={[1.2, 1.2, 1.2]}
      rotation={[0.1, 0, 0]}
    >
      {/* Base */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[4.2, 0.15, 3]} />
        <meshStandardMaterial color="#111" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Keyboard Area */}
      <mesh position={[0, 0.01, 0.2]}>
        <boxGeometry args={[3.8, 0.05, 1.8]} />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>
      
      {/* Trackpad */}
      <mesh position={[0, 0.01, 1.25]}>
        <boxGeometry args={[1.2, 0.06, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>

      {/* Screen Hinge */}
      <group position={[0, 0, -1.4]} rotation={[-0.15, 0, 0]}>
        {/* Screen Frame */}
        <mesh position={[0, 1.45, 0]}>
          <boxGeometry args={[4.2, 2.9, 0.1]} />
          <meshStandardMaterial color="#111" roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Screen Panel */}
        <mesh ref={screenRef} position={[0, 1.45, 0.06]}>
          <planeGeometry args={[4, 2.7]} />
          <meshStandardMaterial color="#000" emissive="#9d4edd" emissiveIntensity={0.2} toneMapped={false} />
          
          <Html 
            transform 
            distanceFactor={1.1} 
            position={[0, 0, 0.01]} 
            rotation-x={0}
            occlude="blending"
          >
            <div style={{ width: '900px', height: '600px', borderRadius: '4px', overflow: 'hidden' }}>
              <ScreenUI />
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  );
}

// Environmental visual effects
function HologramEffects() {
  const particlesRef = useRef<THREE.Points>(null);
  const cubesRef = useRef<THREE.InstancedMesh>(null);
  const particleCount = 150;
  const cubeCount = 8;
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
      particlesRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }
    if (cubesRef.current) {
      cubesRef.current.rotation.x = t * 0.1;
      cubesRef.current.rotation.y = t * 0.2;
    }
  });

  // Particles
  const positions = new Float32Array(particleCount * 3);
  for(let i=0; i<particleCount; i++) {
    positions[i*3] = (Math.random() - 0.5) * 10;
    positions[i*3+1] = (Math.random() - 0.5) * 10;
    positions[i*3+2] = (Math.random() - 0.5) * 10;
  }

  // Cubes
  useEffect(() => {
    if (cubesRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < cubeCount; i++) {
        dummy.position.set(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6
        );
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        const scale = 0.1 + Math.random() * 0.2;
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        cubesRef.current.setMatrixAt(i, dummy.matrix);
      }
      cubesRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  return (
    <>
      <points ref={particlesRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#b164ff" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      
      <instancedMesh ref={cubesRef} args={[undefined, undefined, cubeCount]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#9d4edd" wireframe transparent opacity={0.3} />
      </instancedMesh>

      {/* A faint ring representing energy underneath */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -2, 0]}>
        <torusGeometry args={[3.5, 0.01, 16, 64]} />
        <meshBasicMaterial color="#9d4edd" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -2.1, 0]}>
        <torusGeometry args={[4.5, 0.005, 16, 64]} />
        <meshBasicMaterial color="#e0c3fc" transparent opacity={0.1} />
      </mesh>
    </>
  );
}

export default function FloatingLaptopContainer({ onLaptopClick }: { onLaptopClick: () => void }) {
  return (
    <div className="w-full h-full relative cursor-pointer group">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9d4edd" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
          <LaptopModel onClick={onLaptopClick} />
        </Float>
        
        <HologramEffects />
        
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={12} blur={2.5} far={4} color="#9d4edd" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
