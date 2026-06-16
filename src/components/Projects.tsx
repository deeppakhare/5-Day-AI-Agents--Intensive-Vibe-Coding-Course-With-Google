import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  const { t } = useTranslation();

  const projects = [
    {
      title: "Civic Issue Reporting app",
      desc: "A MERN stack application to report and track civic issues effectively, featuring a modern dashboard and real-time updates.",
      tech: ["MongoDB", "Express", "React", "Node.js"],
      github: "https://github.com/deeppakhare19",
      live: "#"
    },
    {
      title: "Shroomify",
      desc: "An e-commerce platform dedicated to selling mushrooms and their byproducts, featuring payment integration and inventory management.",
      tech: ["React", "Tailwind CSS", "Firebase"],
      github: "https://github.com/deeppakhare19",
      live: "#"
    },
    {
      title: "AI Prompt to Prototype",
      desc: "A web prototype developed during the Startup School program focusing on solving real-world challenges using Generative AI.",
      tech: ["Gemini AI", "Next.js", "Tailwind CSS"],
      github: "https://github.com/deeppakhare19",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 relative px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:flex justify-between items-end"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              {t('projects.title')} <span className="text-[#9d4edd]">.</span>
            </h2>
            <p className="text-white/60 font-mono text-sm uppercase tracking-widest">// selected works</p>
          </div>
          <a href="https://github.com/deeppakhare19" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-[#9d4edd] hover:text-white transition-colors font-mono hover:scale-105 transition-transform">
            View all on GitHub <ExternalLink size={16} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group glass-panel rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="h-48 bg-[#9d4edd]/10 relative overflow-hidden flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <h3 className="text-2xl font-display font-bold text-white/50 group-hover:text-white group-hover:scale-110 transition-all z-0">
                  {project.title.split(' ')[0]}
                </h3>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 glass-panel text-white/80 text-xs rounded-full font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                   <a href={project.live} aria-label={`View live demo of ${project.title}`} className="flex items-center gap-2 text-sm text-white/80 hover:text-[#9d4edd] transition-colors">
                    <ExternalLink size={16} /> {t('projects.live')}
                  </a>
                  <a href={project.github} aria-label={`View ${project.title} source code on GitHub`} className="flex items-center gap-2 text-sm text-white/80 hover:text-[#9d4edd] transition-colors">
                    <Github size={16} /> {t('projects.github')}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <a href="https://github.com/deeppakhare19" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#9d4edd]">
            View all on GitHub <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
