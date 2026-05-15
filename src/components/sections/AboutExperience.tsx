import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Wind, Coffee, TowerControl as Tower } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useRef } from 'react';

export function AboutCafe() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 bg-matte-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <motion.div 
              style={{ y: imageY }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden glass border border-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80" 
                alt="Cafe Interior"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-xs font-display uppercase tracking-widest mb-2 opacity-60">
                  {t('about.inner_peace')}
                </p>
                <h3 className="text-2xl font-serif">
                   {t('about.sanctuary')}
                </h3>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={cn(
                "absolute -bottom-10 w-64 h-64 glass p-8 rounded-2xl hidden md:block",
                i18n.language === 'ar' ? "-left-10" : "-right-10"
              )}
            >
              <div className="text-bronze mb-4"><Tower size={32} /></div>
              <h4 className="font-serif text-xl mb-2">{t('about.iconic_views')}</h4>
              <p className="text-warm-beige/60 text-sm leading-relaxed">
                {t('about.iconic_desc')}
              </p>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={i18n.language === 'ar' ? "text-right" : "text-left"}
            >
              <span className="text-bronze font-display text-xs tracking-[0.4em] uppercase mb-4 block">
                {t('about.subtitle')}
              </span>
              <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1]">{t('about.title')}</h2>
              <p className="text-warm-beige/80 text-lg md:text-xl font-light leading-relaxed mb-8">
                {t('about.description')}
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <div className="text-3xl font-serif text-bronze mb-2">12+</div>
                  <div className="text-xs font-display uppercase tracking-widest opacity-40">
                    {t('about.bean_origins')}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-bronze mb-2">24/7</div>
                  <div className="text-xs font-display uppercase tracking-widest opacity-40">
                    {t('about.artisanal')}
                  </div>
                </div>
              </div>
            </motion.div>
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
    <section id="experience" className="py-32 bg-espresso/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className={cn(
          "flex flex-col md:flex-row justify-between items-end gap-12 mb-20",
          i18n.language === 'ar' && "md:flex-row-reverse"
        )}>
          <div className={cn("max-w-2xl", i18n.language === 'ar' && "md:text-right")}>
            <h2 className="text-5xl md:text-7xl font-serif mb-8">{t('experience.title')}</h2>
            <p className="text-warm-beige/60 font-light">
              {t('experience.description')}
            </p>
          </div>
          <button className="px-10 py-5 rounded-full border border-white/20 hover:border-bronze flex items-center gap-4 group transition-all glass">
            <span className="text-xs font-bold uppercase tracking-widest font-display">{t('experience.gallery')}</span>
            <div className="w-8 h-8 rounded-full bg-bronze flex items-center justify-center transition-transform group-hover:translate-x-2">
              <Wind size={16} className="text-white" />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative overflow-hidden rounded-2xl group",
                i % 2 === 0 ? "md:mt-12" : ""
              )}
            >
              <img 
                src={src} 
                alt="Coffee Experience" 
                className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-matte-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8 text-center backdrop-blur-sm">
                <p className="text-sm font-serif italic text-white line-clamp-3">
                  {t('experience.quote')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
