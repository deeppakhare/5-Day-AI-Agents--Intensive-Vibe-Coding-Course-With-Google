import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '../lib/utils';
import { X } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  short: string;
  orbit: number;
  category: string;
  desc: string;
  projects: string[];
  iconPath: string;
}

const technologies: Skill[] = [
  // Orbit 1 (Inner) - Frontend core
  { id: 'html', name: 'HTML', short: 'H', orbit: 1, category: 'Frontend', desc: 'Semantic structural markup for modern web experiences.', projects: ['Civic App', 'Shroomify', 'Portfolio'], iconPath: '/skills/html.svg' },
  { id: 'css', name: 'CSS', short: 'C', orbit: 1, category: 'Frontend', desc: 'Premium styling, layouts, and advanced animations.', projects: ['Civic App', 'Shroomify', 'Portfolio'], iconPath: '/skills/css.svg' },
  { id: 'js', name: 'JavaScript', short: 'JS', orbit: 1, category: 'Frontend', desc: 'Dynamic interactivity, logic, and rich UI states.', projects: ['Civic App', 'Shroomify'], iconPath: '/skills/javascript.svg' },
  
  // Orbit 2 (Middle) - Frameworks & Backend
  { id: 'react', name: 'React', short: 'R', orbit: 2, category: 'Frontend', desc: 'Component-driven UI library for scalable frontends.', projects: ['Civic App', 'Shroomify', 'Portfolio'], iconPath: '/skills/react.svg' },
  { id: 'node', name: 'Node.js', short: 'N', orbit: 2, category: 'Backend', desc: 'Scalable server-side execution and API development.', projects: ['Civic App'], iconPath: '/skills/node.svg' },
  { id: 'tailwind', name: 'Tailwind CSS', short: 'TW', orbit: 2, category: 'Frontend', desc: 'Utility-first framework for rapid futuristic layouts.', projects: ['Portfolio', 'Shroomify', 'AI Prototype'], iconPath: '/skills/tailwind.svg' },
  { id: 'mongo', name: 'MongoDB', short: 'M', orbit: 2, category: 'Backend', desc: 'NoSQL document database for flexible data structures.', projects: ['Civic App'], iconPath: '/skills/mongodb.svg' },
  
  // Orbit 3 (Outer) - Tools & AI
  { id: 'git', name: 'Git', short: 'G', orbit: 3, category: 'Tools', desc: 'Version control system for tracking software changes.', projects: ['All Projects'], iconPath: '/skills/git.svg' },
  { id: 'github', name: 'GitHub', short: 'GH', orbit: 3, category: 'Tools', desc: 'Global code hosting, CI/CD, and collaboration.', projects: ['All Projects'], iconPath: '/skills/github.svg' },
  { id: 'figma', name: 'Figma', short: 'F', orbit: 3, category: 'Tools', desc: 'UI/UX design, wireframing, and interactive prototyping.', projects: ['Portfolio', 'Shroomify'], iconPath: '/skills/figma.svg' },
  { id: 'postman', name: 'Postman', short: 'P', orbit: 3, category: 'Tools', desc: 'API testing, documentation, and endpoint development.', projects: ['Civic App'], iconPath: '/skills/postman.svg' },
  { id: 'canva', name: 'Canva', short: 'CV', orbit: 3, category: 'Tools', desc: 'Graphic design layouts and marketing asset creation.', projects: ['Shroomify'], iconPath: '/skills/canva.svg' },
  { id: 'ai-studio', name: 'Google AI Studio', short: 'AI', orbit: 3, category: 'AI', desc: 'Generative AI model prototyping and API integration.', projects: ['AI Prompt to Prototype', 'Portfolio'], iconPath: '/skills/ai-studio.svg' },
  { id: 'antigravity', name: 'Antigravity', short: 'AG', orbit: 3, category: 'AI', desc: 'Advanced AI agent architecture and workflow systems.', projects: ['AI Prompt to Prototype'], iconPath: '/skills/antigravity.svg' },
];

function SkillNode({ skill, index, totalInOrbit, radius, activeCategory, isHovered, setHoveredSkill }: any) {
  const [imgError, setImgError] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);
  
  // Position math
  const angle = (index / totalInOrbit) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = Math.sin(angle * 4) * (radius * 0.15); 

  useFrame(() => {
    if (groupRef.current) {
      const vector = new THREE.Vector3();
      groupRef.current.getWorldPosition(vector);
      // Normalized Z space (-1 to 1 based on outer radius roughly 8.5)
      const normalizedZ = vector.z / 8.5;
      
      const targetScale = isHovered ? 1.4 : Math.max(0.6, 1 + (normalizedZ * 0.3));
      const targetOpacity = isHovered ? 1 : Math.max(0.1, 0.4 + ((normalizedZ + 1) / 2) * 0.6);
      
      setScale(s => THREE.MathUtils.lerp(s, targetScale, 0.1));
      setOpacity(o => THREE.MathUtils.lerp(o, targetOpacity, 0.1));
    }
  });

  const isActive = activeCategory === 'All' || activeCategory === skill.category;

  return (
    <group ref={groupRef} position={[x, y, z]}>
      <Html center zIndexRange={[100, 0]}>
        <div 
          className={cn(
             "relative group cursor-pointer transition-colors duration-300 will-change-transform",
             !isActive && "blur-[2px]"
          )}
          style={{
             transform: `scale(${isActive ? scale : scale * 0.7})`,
             opacity: isActive ? opacity : opacity * 0.2,
             zIndex: isHovered ? 50 : 10
          }}
          onMouseEnter={() => { if (isActive) setHoveredSkill(skill); }}
          onMouseLeave={() => { if (isActive) setHoveredSkill(null); }}
          onClick={() => { if (isActive) setHoveredSkill(skill); }}
        >
          {/* Logo Container */}
          <div className={cn(
            "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full glass-panel flex items-center justify-center overflow-hidden transition-all duration-300",
            isHovered 
              ? "bg-[#9d4edd]/20 border border-[#9d4edd] shadow-[0_0_25px_rgba(157,78,221,0.6)]" 
              : "border border-white/10 bg-[#1a1a2e]/60 hover:border-[#9d4edd]/50 hover:bg-[#1a1a2e]/80"
          )}>
            {!imgError ? (
              <img 
                src={skill.iconPath} 
                alt={skill.name}
                className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain z-10 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-[#e0c3fc] font-display font-bold text-sm sm:text-base lg:text-xl z-10 filter drop-shadow-[0_0_5px_rgba(157,78,221,0.5)]">
                {skill.short}
              </span>
            )}
          </div>
          
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 text-xs font-mono text-white/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-black bg-black/40 px-2 py-1 rounded">
             {skill.name}
          </div>
        </div>
      </Html>
    </group>
  );
}

function SystemWrapper({ activeCategory, hoveredSkill, setHoveredSkill }: any) {
  const tiltRef = useRef<THREE.Group>(null);
  const sysRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (tiltRef.current) {
      tiltRef.current.rotation.x = THREE.MathUtils.lerp(tiltRef.current.rotation.x, state.pointer.y * 0.3, 0.05);
      tiltRef.current.rotation.y = THREE.MathUtils.lerp(tiltRef.current.rotation.y, state.pointer.x * 0.3, 0.05);
    }
    if (sysRef.current) {
      const speed = hoveredSkill ? 0.05 : 0.15;
      sysRef.current.rotation.y += delta * speed;
      sysRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={tiltRef}>
      <group ref={sysRef}>
        {/* Central Element */}
        <Html center zIndexRange={[50, -50]}>
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-[#9d4edd]/30 flex items-center justify-center bg-[#110a1f]/80 backdrop-blur-md shadow-[0_0_60px_rgba(157,78,221,0.5)] pointer-events-none">
            <span className="text-2xl sm:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-[#a955ff] animate-pulse">
              DP
            </span>
          </div>
        </Html>
        
        {/* Orbits Visualizations */}
        <mesh rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[3, 0.015, 16, 100]} />
          <meshBasicMaterial color="#9d4edd" transparent opacity={0.15} />
        </mesh>
        <mesh rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[5.5, 0.015, 16, 100]} />
          <meshBasicMaterial color="#e0c3fc" transparent opacity={0.1} />
        </mesh>
        <mesh rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[8, 0.015, 16, 100]} />
          <meshBasicMaterial color="#9d4edd" transparent opacity={0.05} />
        </mesh>

        {technologies.map(skill => {
          const sibs = technologies.filter(s => s.orbit === skill.orbit);
          const idx = sibs.findIndex(s => s.id === skill.id);
          const radiuses = [0, 3, 5.5, 8];
          
          return (
            <SkillNode 
              key={skill.id}
              skill={skill}
              index={idx}
              totalInOrbit={sibs.length}
              radius={radiuses[skill.orbit]}
              activeCategory={activeCategory}
              isHovered={hoveredSkill?.id === skill.id}
              setHoveredSkill={setHoveredSkill}
            />
          );
        })}
      </group>
    </group>
  );
}

export default function Skills() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const categories = ["All", "Frontend", "Backend", "Tools", "AI"];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    window.dispatchEvent(new CustomEvent('skill-sphere-scale', { 
      detail: { scale: 1 + latest * 0.8 } 
    }));
  });

  return (
    <section ref={containerRef} id="skills" className="relative h-[90vh] min-h-[700px] w-full z-10 bg-[#050505]/40 overflow-hidden flex flex-col justify-center">
      
      {/* Absolute positioning for UI to float above the 3D Canvas */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="absolute top-20 sm:top-24 left-0 right-0 z-20 pointer-events-none px-6 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-md">
          <span className="text-gradient">{"{"}</span> {t('skills.title')} <span className="text-gradient">{"}"}</span>
        </h2>
        <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base font-mono uppercase tracking-widest drop-shadow-md">
          Technologies I use to build modern digital experiences.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 pointer-events-auto">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-mono text-xs sm:text-sm transition-all border backdrop-blur-md",
                activeCategory === cat 
                  ? "bg-[#9d4edd]/30 border-[#9d4edd] text-white shadow-[0_0_15px_rgba(157,78,221,0.5)]" 
                  : "bg-black/20 border-white/10 text-white/50 hover:text-white hover:border-white/30"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Interactive 3D Background */}
      <div className="absolute inset-0 z-10 w-full h-full cursor-move">
         <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
             <ambientLight intensity={0.8} />
             <pointLight position={[10, 10, 10]} intensity={1.5} color="#9d4edd" />
             <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
               <SystemWrapper 
                  activeCategory={activeCategory} 
                  hoveredSkill={hoveredSkill} 
                  setHoveredSkill={setHoveredSkill} 
               />
             </Float>
         </Canvas>
      </div>

      {/* Floating Holographic Info Panel */}
      <div className="absolute inset-x-6 bottom-12 lg:inset-x-auto lg:left-12 lg:top-1/2 lg:-translate-y-1/2 z-30 pointer-events-none lg:w-96 flex flex-col justify-end lg:justify-center">
        <AnimatePresence mode="wait">
          {hoveredSkill && (
            <motion.div
              key={hoveredSkill.id}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full glass-panel p-6 sm:p-8 rounded-2xl border border-[#9d4edd]/40 shadow-[0_0_40px_rgba(157,78,221,0.2)] relative overflow-hidden backdrop-blur-3xl pointer-events-auto"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9d4edd] to-[#e0c3fc]" />
              
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#9d4edd]/20 flex items-center justify-center font-bold text-xl text-[#e0c3fc] border border-[#9d4edd]/50 shadow-[0_0_15px_rgba(157,78,221,0.3)]">
                    {hoveredSkill.short}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">{hoveredSkill.name}</h3>
                    <p className="text-xs font-mono text-[#9d4edd] uppercase tracking-wider">{hoveredSkill.category}</p>
                  </div>
                </div>
                
                <button 
                  className="lg:hidden text-white/40 hover:text-white transition-colors bg-white/5 rounded-full p-2"
                  onClick={() => setHoveredSkill(null)}
                >
                  <X size={18} />
                </button>
              </div>
              
              <p className="text-white/70 text-sm leading-relaxed mb-6 font-sans">
                {hoveredSkill.desc}
              </p>
              
              <div>
                <h4 className="text-xs font-mono text-white/40 uppercase mb-3 tracking-widest">Example Projects</h4>
                <ul className="space-y-2">
                  {hoveredSkill.projects.map((proj, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9d4edd] shadow-[0_0_5px_rgba(157,78,221,0.8)]" />
                      {proj}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}

