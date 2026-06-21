import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Briefcase, Award, GraduationCap } from 'lucide-react';

export default function Experience() {
  const { t } = useTranslation();

  const milestones = [
    {
      type: 'edu',
      title: "B.Tech Computer Science Engineering",
      org: "Maharashtra, India",
      date: "Present",
      desc: "Pursuing degree with focus on software development, AI systems, and competitive programming."
    },
    {
      type: 'exp',
      title: "Infosys Springboard Intern",
      org: "Infosys",
      date: "Recent",
      desc: "Gained hands-on experience in modern software engineering practices, exploring emerging technologies."
    },
    {
      type: 'cert',
      title: "Technology Job Simulation",
      org: "Deloitte Australia",
      date: "Completed",
      desc: "Completed practical task modules in technology, experiencing real-world client scenarios."
    },
    {
      type: 'cert',
      title: "Generative AI Studio & Startup School",
      org: "Google / YC",
      date: "Completed",
      desc: "Introduction to Generative AI Studio. Startup School: Prompt to Prototype track."
    },
    {
      type: 'award',
      title: "Research Publication",
      org: "Network Security Domain",
      date: "Published",
      desc: "Published findings in network security. Also participated in Maharashtra State Skills Competition."
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'edu': return <GraduationCap size={20} />;
      case 'exp': return <Briefcase size={20} />;
      case 'cert': return <Award size={20} />;
      case 'award': return <Award size={20} />;
      default: return <Briefcase size={20} />;
    }
  };

  return (
    <section id="experience" className="py-24 relative px-6 z-10 bg-gradient-to-b from-black/50 to-transparent">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
            {t('experience.title')}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline side line */}
          <div className="absolute left-[20px] md:left-[28px] top-4 bottom-4 w-px bg-gradient-to-b from-[#9d4edd]/10 via-[#9d4edd]/50 to-transparent" />

          {milestones.map((item, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex items-start mb-12 group"
              >
                {/* Timeline dot */}
                <div className="sticky top-24 z-10 flex-shrink-0 w-[40px] md:w-[56px] flex justify-center mt-6">
                   <div className="w-10 h-10 rounded-full bg-[#050505] border border-[#9d4edd]/30 flex items-center justify-center text-[#9d4edd] group-hover:bg-[#9d4edd]/20 group-hover:border-[#9d4edd] group-hover:shadow-[0_0_15px_rgba(157,78,221,0.5)] transition-all duration-300">
                     {getIcon(item.type)}
                   </div>
                </div>

                <div className="ml-4 md:ml-8 flex-1">
                  <article className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 group-hover:border-[#9d4edd]/30 transition-colors relative overflow-hidden">
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9d4edd]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Number Watermark */}
                    <div className="absolute -top-4 -right-4 p-4 opacity-5 text-white group-hover:opacity-10 transition-opacity pointer-events-none">
                      <div className="text-8xl font-display font-bold leading-none">{idx + 1}</div>
                    </div>
                    
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs font-mono mb-4 border border-white/10 group-hover:bg-[#9d4edd]/10 group-hover:text-[#e0c3fc] group-hover:border-[#9d4edd]/30 transition-colors">
                        {item.date}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all">{item.title}</h3>
                      <p className="text-[#9d4edd] text-sm md:text-base font-semibold mb-4 uppercase tracking-wider">{item.org}</p>
                      <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl">{item.desc}</p>
                    </div>
                  </article>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
