import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, MessageCircle } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 relative px-6 z-10 bg-gradient-to-t from-[#1a0b2e]/50 to-transparent">
      <div className="max-w-4xl mx-auto" itemScope itemType="https://schema.org/Person">
        <meta itemProp="name" content="Deep Pakhare" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-white/60 max-w-lg mx-auto text-lg">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <motion.a 
            href="mailto:deeppakhare19@gmail.com"
            aria-label="Send an email to Deep Pakhare"
            itemProp="email"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 glass-panel rounded-full hover:border-[#9d4edd]/50 transition-colors"
          >
            <Mail className="text-[#9d4edd]" size={24} aria-hidden="true" />
            <span className="text-white font-medium">Email Me</span>
          </motion.a>

          <motion.a 
            href="https://wa.me/8530316804"
            aria-label="Contact Deep Pakhare on WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-[#25D366]/20 border border-[#25D366]/50 rounded-full hover:bg-[#25D366]/30 transition-colors"
          >
            <MessageCircle className="text-[#25D366]" size={24} aria-hidden="true" />
            <span className="text-white font-medium">WhatsApp</span>
          </motion.a>
        </div>

        <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm font-mono">
            © {new Date().getFullYear()} Deep Pakhare. All rights reserved.
          </p>
          <div className="flex gap-4 text-white/50">
            <a href="https://github.com/deeppakhare" aria-label="Deep Pakhare GitHub Profile" itemProp="sameAs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github size={20} aria-hidden="true" /></a>
            <a href="https://linkedin.com/in/deeppakhare6669" aria-label="Deep Pakhare LinkedIn Profile" itemProp="sameAs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={20} aria-hidden="true" /></a>
          </div>
        </footer>
      </div>
    </section>
  );
}
