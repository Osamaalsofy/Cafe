import { motion, AnimatePresence } from 'motion/react';
import { Navbar, Hero } from './components/layout/NavbarHero';
import { AboutCafe, ExperienceSection } from './components/sections/AboutExperience';
import { SignatureMenu, Testimonials, ContactSection, Footer } from './components/sections/MenuTestimonials';
import { CustomCursor } from './components/ui/CustomCursor';
import { StaggeredTextReveal } from './components/ui/TextReveal';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Coffee } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reveal animation delay
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-matte-black text-cream overflow-x-hidden selection:bg-bronze selection:text-white">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              y: '-100%',
              transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } 
            }}
            className="fixed inset-0 z-[100] bg-matte-black flex flex-col items-center justify-center gap-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute inset-0 w-32 h-32 -m-4 border border-bronze/20 rounded-full blur-sm"
              />
              <div className="w-24 h-24 border border-bronze/30 flex items-center justify-center glass rounded-2xl relative z-10">
                <Coffee className="text-bronze" size={40} />
              </div>
            </motion.div>

            <div className="text-center">
              <StaggeredTextReveal
                text={i18n.language === 'en' ? 'Brewing Excellence' : 'نحضّر التميّز'}
                className="font-display uppercase tracking-[1em] text-[10px] text-bronze text-center justify-center"
                delay={0.5}
              />
              <motion.div 
                 initial={{ width: 0, opacity: 0 }}
                 animate={{ width: 120, opacity: 1 }}
                 transition={{ delay: 1, duration: 1.5 }}
                 className="h-[1px] bg-bronze/30 mx-auto mt-6"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="will-change-opacity">
        <Navbar />
        
        <main>
          <Hero />
          <AboutCafe />
          <ExperienceSection />
          <SignatureMenu />
          <Testimonials />
          <ContactSection />
        </main>

        <Footer />

        {/* Persistent Floating Order Button */}
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(184, 134, 11, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const menu = document.getElementById('menu');
            if (menu) menu.scrollIntoView({ behavior: 'smooth' });
          }}
          className={cn(
             "fixed bottom-10 z-40 bg-bronze text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl flex items-center gap-3 glass border-white/20 font-display transition-shadow",
             i18n.language === 'ar' ? "left-10" : "right-10"
          )}
        >
          <Coffee size={18} />
          {i18n.language === 'en' ? 'Explore Menu' : 'استكشف القائمة'}
        </motion.button>

        {/* Social Links Rail */}
        <div className={cn(
          "fixed bottom-0 z-40 hidden md:flex flex-col items-center gap-8 after:content-[''] after:w-[1px] after:h-32 after:bg-white/10",
          i18n.language === 'ar' ? "right-10" : "left-10"
        )}>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ delay: 2.5, duration: 1 }}
            className="flex flex-col items-center gap-8 overflow-hidden"
          >
             <a href="#" className="hover:text-bronze transition-colors -rotate-90 origin-bottom mb-2 text-[10px] font-display uppercase tracking-widest opacity-40 hover:opacity-100">Instagram</a>
             <a href="#" className="hover:text-bronze transition-colors -rotate-90 origin-bottom mb-2 text-[10px] font-display uppercase tracking-widest opacity-40 hover:opacity-100">X (Twitter)</a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

