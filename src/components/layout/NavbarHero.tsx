import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, Instagram, Phone, MapPin, Coffee, ArrowRight } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { cn } from '../../lib/utils';
import { Canvas } from '@react-three/fiber';
import { CoffeeBeans } from '../3d/CoffeeBeans';
import { CoffeeCup } from '../3d/CoffeeCup';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { TextReveal, StaggeredTextReveal } from '../ui/TextReveal';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    const nextLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLang;
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elemRect = elem.getBoundingClientRect().top;
      const elemPosition = elemRect - bodyRect;
      const offsetPosition = elemPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.menu'), href: '#menu' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.location'), href: '#location' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-700 py-6 px-12 flex justify-between items-center",
      isScrolled ? "glass py-4 shadow-xl border-white/5" : "bg-transparent",
      i18n.language === 'ar' ? "flex-row-reverse" : "flex-row"
    )}>
      <motion.div 
        initial={{ opacity: 0, x: i18n.language === 'ar' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2"
      >
        <Coffee className="text-bronze" size={28} />
        <span className="font-serif font-bold text-2xl tracking-tighter uppercase">CAF LAB</span>
      </motion.div>

      <div className={cn(
        "hidden md:flex items-center gap-12",
        i18n.language === 'ar' ? "flex-row-reverse" : "flex-row"
      )}>
        {navLinks.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            onClick={(e) => scrollToSection(e, link.href)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
            whileHover={{ y: -2 }}
            className="text-[11px] font-display font-semibold tracking-[0.2em] uppercase hover:text-bronze transition-colors opacity-70 hover:opacity-100"
          >
            {link.name}
          </motion.a>
        ))}
      </div>

      <div className={cn(
        "flex items-center gap-8",
        i18n.language === 'ar' ? "flex-row-reverse" : "flex-row"
      )}>
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={toggleLang}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 hover:border-bronze transition-all glass hover:bg-bronze hover:text-white group"
        >
          <Globe size={14} className="text-bronze group-hover:text-white transition-colors" />
          <span className="text-[10px] font-bold uppercase font-display tracking-widest">{i18n.language === 'en' ? 'Arabic' : 'English'}</span>
        </motion.button>

        <button 
          className="md:hidden text-white/80 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ clipPath: 'circle(0% at 90% 10%)' }}
            animate={{ clipPath: 'circle(150% at 90% 10%)' }}
            exit={{ clipPath: 'circle(0% at 90% 10%)' }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className={cn(
              "fixed inset-0 bg-matte-black/98 backdrop-blur-2xl z-40 p-12 flex flex-col justify-center items-center gap-12 md:hidden",
              i18n.language === 'ar' ? "text-right" : "text-left"
            )}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-4xl font-serif font-light tracking-tight hover:text-bronze transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Hero() {
  const { t, i18n } = useTranslation();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elemRect = elem.getBoundingClientRect().top;
      const elemPosition = elemRect - bodyRect;
      const offsetPosition = elemPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative h-screen min-h-[850px] flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas shadow={false} flat>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} />
            <Environment preset="night" />
            <ambientLight intensity={0.5} />
            <CoffeeBeans />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-matte-black/20 to-matte-black pointer-events-none" />

      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-10 text-center max-w-5xl px-8"
      >
        <div className="mb-12">
          <TextReveal delay={0.1}>
            <span className="text-bronze font-display text-[11px] tracking-[0.5em] uppercase mb-6 block font-bold">
              {i18n.language === 'en' ? 'Riyadh • Saudi Arabia' : 'الرياض • المملكة العربية السعودية'}
            </span>
          </TextReveal>
          
          <StaggeredTextReveal
            text={t('hero.headline')}
            className="text-6xl md:text-9xl font-serif font-light leading-[1.05] tracking-tighter mb-8 text-glow-subtle justify-center"
            delay={0.3}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-warm-beige/70 text-lg md:text-2xl font-light max-w-3xl mx-auto mb-16 leading-relaxed">
              {t('hero.subheadline')}
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-8",
            i18n.language === 'ar' && "sm:flex-row-reverse"
          )}
        >
          <a 
            href="#menu" 
            onClick={(e) => scrollToSection(e, '#menu')}
            className="group relative px-12 py-6 bg-bronze text-white font-bold uppercase tracking-[0.2em] text-xs transition-all hover:scale-105 active:scale-95 font-display min-w-[240px] shadow-2xl"
          >
            <span className="relative z-10">{t('hero.cta_menu')}</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
          </a>
          <a 
            href="#location" 
            onClick={(e) => scrollToSection(e, '#location')}
            className="px-12 py-6 border border-white/20 hover:border-bronze hover:bg-bronze/5 font-bold uppercase tracking-[0.2em] text-xs transition-all glass font-display min-w-[240px]"
          >
            {t('hero.cta_visit')}
          </a>
        </motion.div>
      </motion.div>

      {/* Floating Cup - Parallaxed */}
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 800], [0, -200]) }}
        className="absolute bottom-[10%] right-[5%] w-64 h-64 md:w-[450px] md:h-[450px] opacity-30 pointer-events-none blur-sm"
      >
        <Canvas shadow={false} flat>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <Environment preset="sunset" />
            <CoffeeCup />
          </Suspense>
        </Canvas>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-display uppercase tracking-[0.4em] text-white/30">{i18n.language === 'en' ? 'Scroll' : 'مرّر'}</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}

