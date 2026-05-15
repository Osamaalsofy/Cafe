import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, Instagram, Phone, MapPin, Coffee, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { Canvas } from '@react-three/fiber';
import { CoffeeBeans, SingleCoffeeBean } from '@/src/components/3d/CoffeeBeans';
import { CoffeeCup } from '@/src/components/3d/CoffeeCup';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';

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
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-8 flex justify-between items-center",
      isScrolled ? "glass py-4 shadow-xl" : "bg-transparent",
      i18n.language === 'ar' ? "flex-row-reverse" : "flex-row"
    )}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <Coffee className="text-bronze" size={28} />
        <span className="font-serif font-bold text-2xl tracking-tighter uppercase">CAF LAB</span>
      </motion.div>

      <div className={cn(
        "hidden md:flex items-center gap-10",
        i18n.language === 'ar' ? "flex-row-reverse" : "flex-row"
      )}>
        {navLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            onClick={(e) => scrollToSection(e, link.href)}
            whileHover={{ y: -2 }}
            className="text-sm font-display font-medium tracking-widest uppercase hover:text-bronze transition-colors opacity-80 hover:opacity-100"
          >
            {link.name}
          </motion.a>
        ))}
      </div>

      <div className={cn(
        "flex items-center gap-6",
        i18n.language === 'ar' ? "flex-row-reverse" : "flex-row"
      )}>
        <button 
          onClick={toggleLang}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 hover:border-bronze transition-all glass"
        >
          <Globe size={16} className="text-bronze" />
          <span className="text-xs font-bold uppercase font-display">{i18n.language === 'en' ? 'Arabic' : 'English'}</span>
        </button>

        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        className={cn(
          "fixed inset-0 top-[80px] bg-matte-black/95 backdrop-blur-xl z-40 p-8 flex flex-col gap-8 md:hidden",
          !mobileMenuOpen && "pointer-events-none",
          i18n.language === 'ar' ? "text-right" : "text-left"
        )}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => scrollToSection(e, link.href)}
            className="text-3xl font-serif font-light tracking-tight border-b border-white/10 pb-4"
          >
            {link.name}
          </a>
        ))}
      </motion.div>
    </nav>
  );
}

export function Hero() {
  const { t, i18n } = useTranslation();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <Environment preset="night" />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <CoffeeBeans />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-matte-black/60 pointer-events-none" />

      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-10 text-center max-w-4xl px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-bronze font-display text-xs tracking-[0.4em] uppercase mb-4 block animate-pulse">
            {i18n.language === 'en' ? 'Riyadh • Saudi Arabia' : 'الرياض • المملكة العربية السعودية'}
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-light leading-[0.9] tracking-tighter mb-8 text-glow">
            {t('hero.headline')}
          </h1>
          <p className="text-warm-beige/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('hero.subheadline')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-6",
            i18n.language === 'ar' && "sm:flex-row-reverse"
          )}
        >
          <a 
            href="#menu" 
            onClick={(e) => scrollToSection(e, '#menu')}
            className="group relative px-10 py-5 bg-bronze text-white font-bold uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-105 font-display min-w-[200px]"
          >
            <span className="relative z-10">{t('hero.cta_menu')}</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
          <a 
            href="#location" 
            onClick={(e) => scrollToSection(e, '#location')}
            className="px-10 py-5 border border-white/30 hover:border-bronze font-bold uppercase tracking-widest text-xs transition-all glass font-display min-w-[200px]"
          >
            {t('hero.cta_visit')}
          </a>
        </motion.div>
      </motion.div>

      {/* Floating Cup */}
      <div className="absolute bottom-10 right-10 w-48 h-48 md:w-80 md:h-80 opacity-40 hover:opacity-100 transition-opacity duration-1000">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Environment preset="sunset" />
          <CoffeeCup />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
