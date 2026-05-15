import { motion, AnimatePresence } from 'motion/react';
import { Navbar, Hero } from './components/layout/NavbarHero';
import { AboutCafe, ExperienceSection } from './components/sections/AboutExperience';
import { SignatureMenu, Testimonials, ContactSection, Footer } from './components/sections/MenuTestimonials';
import { CustomCursor } from './components/ui/CustomCursor';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Coffee } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reveal animation
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-matte-black text-cream overflow-x-hidden">
      <CustomCursor />
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-matte-black flex flex-col items-center justify-center gap-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 360],
                borderRadius: ["30%", "50%", "30%"]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-24 h-24 border border-bronze/30 flex items-center justify-center glass"
            >
              <Coffee className="text-bronze" size={40} />
            </motion.div>
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: 200 }}
               className="h-[1px] bg-bronze/50 relative"
            >
               <motion.div 
                 animate={{ x: [0, 200, 0] }}
                 transition={{ repeat: Infinity, duration: 1.5 }}
                 className="absolute top-0 left-0 w-8 h-full bg-bronze glow-lg"
               />
            </motion.div>
            <span className="font-display uppercase tracking-[1em] text-[10px] text-bronze opacity-50 ml-[1em]">
              {i18n.language === 'en' ? 'Brewing Excellence' : 'نحضّر التميّز'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
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
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const menu = document.getElementById('menu');
              if (menu) menu.scrollIntoView({ behavior: 'smooth' });
            }}
            className={cn(
               "fixed bottom-10 z-40 bg-bronze text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl flex items-center gap-3 glass border-white/20 font-display",
               i18n.language === 'ar' ? "left-10" : "right-10"
            )}
          >
            <Coffee size={18} />
            {i18n.language === 'en' ? 'Explore Menu' : 'استكشف القائمة'}
          </motion.button>

          {/* Social Links Rail */}
          <div className={cn(
            "fixed bottom-0 z-40 hidden md:flex flex-col items-center gap-8 after:content-[''] after:w-[1px] after:h-32 after:bg-white/20",
            i18n.language === 'ar' ? "right-10" : "left-10"
          )}>
             <a href="#" className="hover:text-bronze transition-colors -rotate-90 origin-bottom mb-2 text-[10px] font-display uppercase tracking-widest opacity-40">Instagram</a>
             <a href="#" className="hover:text-bronze transition-colors -rotate-90 origin-bottom mb-2 text-[10px] font-display uppercase tracking-widest opacity-40">X (Twitter)</a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
