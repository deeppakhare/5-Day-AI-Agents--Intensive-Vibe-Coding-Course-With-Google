import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Globe, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-auto",
        scrolled ? "py-4 glass-panel border-x-0 border-t-0 border-b border-white/5" : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="text-xl font-display font-bold text-white tracking-widest flex items-center gap-2">
          <span className="text-[#9d4edd]">D</span>P
        </a>
        
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-white/70 hover:text-white hover:text-shadow-glow transition-all text-sm uppercase tracking-wider font-mono"
            >
              {link.name}
            </a>
          ))}
          
          <div className="relative group ml-4">
            <button className="flex items-center gap-2 text-white/70 hover:text-white" id="btn-lang">
              <Globe size={18} />
              <span className="text-sm font-mono uppercase">{i18n.language}</span>
            </button>
            <div className="absolute top-full right-0 mt-2 py-2 w-32 glass-panel rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col">
              <button onClick={() => changeLanguage('en')} className="px-4 py-2 text-sm text-left hover:bg-white/10 text-white">English</button>
              <button onClick={() => changeLanguage('hi')} className="px-4 py-2 text-sm text-left hover:bg-white/10 text-white">Hindi</button>
              <button onClick={() => changeLanguage('mr')} className="px-4 py-2 text-sm text-left hover:bg-white/10 text-white">Marathi</button>
            </div>
          </div>
        </nav>

        <button 
          className="md:hidden text-white" 
          onClick={() => setMobileOpen(!mobileOpen)}
          id="btn-mobile-menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 glass-panel border-t border-white/5 py-4 px-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/80 py-2 border-b border-white/5 text-sm uppercase tracking-wider font-mono"
            >
              {link.name}
            </a>
          ))}
          <div className="flex gap-4 pt-2">
            <button onClick={() => changeLanguage('en')} className={cn("text-sm", i18n.language === 'en' ? "text-[#9d4edd]" : "text-white/50")}>EN</button>
            <button onClick={() => changeLanguage('hi')} className={cn("text-sm", i18n.language === 'hi' ? "text-[#9d4edd]" : "text-white/50")}>HI</button>
            <button onClick={() => changeLanguage('mr')} className={cn("text-sm", i18n.language === 'mr' ? "text-[#9d4edd]" : "text-white/50")}>MR</button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
