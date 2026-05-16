import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Wind, Coffee, TowerControl as Tower } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useRef } from 'react';
import { TextReveal, StaggeredTextReveal } from '../ui/TextReveal';

export function AboutCafe() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section id="about" ref={containerRef} className="py-48 px-6 bg-matte-black overflow-hidden relative">
      {/* Background Decorative Text */}
      <motion.div 
        style={{ x: useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]) }}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-serif opacity-[0.02] whitespace-nowrap pointer-events-none select-none"
      >
        {i18n.language === 'en' ? 'CRAFTED COFFEE' : 'قهوة مختصة'}
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="relative group">
            <motion.div 
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl"
            >
              <motion.img 
                style={{ scale: useTransform(scrollYProgress, [0, 1], [1.2, 1]) }}
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80" 
                alt="Cafe Interior"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/60 to-transparent opacity-60" />
            </motion.div>
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1 }}
              className={cn(
                "absolute -bottom-12 w-72 glass p-10 rounded-3xl hidden md:block border-white/10 shadow-2xl backdrop-blur-3xl",
                i18n.language === 'ar' ? "-left-12" : "-right-12"
              )}
            >
              <div className="text-bronze mb-6 flex justify-between items-start">
                <Tower size={36} />
                <div className="w-10 h-10 rounded-full border border-bronze/20 flex items-center justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-bronze animate-ping" />
                </div>
              </div>
              <h4 className="font-serif text-2xl mb-4 leading-tight">{t('about.iconic_views')}</h4>
              <p className="text-warm-beige/50 text-sm leading-relaxed font-light">
                {t('about.iconic_desc')}
              </p>
            </motion.div>
          </div>

          <div className="space-y-12">
            <div className={i18n.language === 'ar' ? "text-right" : "text-left"}>
              <TextReveal delay={0.2}>
                <span className="text-bronze font-display text-[10px] tracking-[0.5em] uppercase mb-6 block font-bold">
                  {t('about.subtitle')}
                </span>
              </TextReveal>
              
              <StaggeredTextReveal
                text={t('about.title')}
                className="text-5xl md:text-8xl font-serif mb-10 leading-[1.05] tracking-tight"
                delay={0.4}
              />

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-warm-beige/70 text-lg md:text-2xl font-light leading-relaxed mb-12"
              >
                {t('about.description')}
              </motion.p>
              
              <div className={cn(
                "grid grid-cols-2 gap-12 pt-12 border-t border-white/5",
                i18n.language === 'ar' && "text-right"
              )}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                >
                  <div className="text-4xl font-serif text-bronze mb-3 font-light italic">12+</div>
                  <div className="text-[10px] font-display uppercase tracking-[0.3em] opacity-40 font-bold">
                    {t('about.bean_origins')}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="text-4xl font-serif text-bronze mb-3 font-light italic">24/7</div>
                  <div className="text-[10px] font-display uppercase tracking-[0.3em] opacity-40 font-bold">
                    {t('about.artisanal')}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  const { t, i18n } = useTranslation();
  const images = [
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80"
  ];

  return (
    <section id="experience" className="py-48 bg-espresso/[0.03] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-10 relative z-10">
        <div className={cn(
          "flex flex-col md:flex-row justify-between items-end gap-12 mb-32",
          i18n.language === 'ar' && "md:flex-row-reverse"
        )}>
          <div className={cn("max-w-3xl", i18n.language === 'ar' && "md:text-right")}>
            <StaggeredTextReveal
              text={t('experience.title')}
              className="text-5xl md:text-8xl font-serif mb-10 tracking-tight"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-warm-beige/50 font-light text-lg max-w-2xl"
            >
              {t('experience.description')}
            </motion.p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 rounded-full border border-white/10 hover:border-bronze flex items-center gap-6 group transition-all glass shadow-xl"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] font-display">{t('experience.gallery')}</span>
            <div className="w-10 h-10 rounded-full bg-bronze flex items-center justify-center transition-transform group-hover:rotate-45">
              <Wind size={18} className="text-white" />
            </div>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {images.map((src, i) => (
            <ExperienceItem key={i} src={src} i={i} quote={t('experience.quote')} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ src, i, quote }: { src: string; i: number; quote: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, i % 2 === 0 ? -100 : 100]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] group shadow-2xl",
        i % 2 === 0 ? "md:mt-16" : ""
      )}
    >
      <motion.img 
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 1.5 }}
        src={src} 
        alt="Coffee Experience" 
        className="w-full h-[600px] object-cover"
      />
      <div className="absolute inset-0 bg-matte-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-12 text-center backdrop-blur-md">
        <p className="text-lg font-serif italic text-white/90 leading-relaxed scale-90 group-hover:scale-100 transition-transform duration-700">
          {quote}
        </p>
      </div>
    </motion.div>
  );
}

