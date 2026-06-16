import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Terminal, Database, Sparkles, Rocket } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  const cards = [
    { icon: <Terminal size={24} className="text-[#9d4edd]" />, title: "Frontend Engineering", desc: "Crafting beautiful, responsive, and accessible UI using modern web technologies." },
    { icon: <Database size={24} className="text-[#9d4edd]" />, title: "Full Stack MERN", desc: "Building robust backend systems and APIs with MongoDB, Express, and Node.js." },
    { icon: <Sparkles size={24} className="text-[#9d4edd]" />, title: "AI Enthusiast", desc: "Integrating AI models to solve real-world problems and enhance user experiences." },
    { icon: <Rocket size={24} className="text-[#9d4edd]" />, title: "Startup Mindset", desc: "Passionate about entrepreneurship and building scalable software solutions." }
  ];

  return (
    <section id="about" className="py-24 relative px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            <span className="text-gradient">&lt;</span> {t('about.title')} <span className="text-gradient">/&gt;</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
            {t('about.p1')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-panel p-6 rounded-2xl border-t border-white/10 hover:bg-white/[0.02] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#9d4edd]/20 flex items-center justify-center mb-6 border border-[#9d4edd]/30">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
