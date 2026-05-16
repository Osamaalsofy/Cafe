import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Coffee, Cake, Wind, Star, MapPin, Clock, Instagram, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, MeshDistortMaterial } from '@react-three/drei';
import { TextReveal, StaggeredTextReveal } from '../ui/TextReveal';

const MENU_DATA = {
  specialty: [
    { name: 'Espresso', price: '18 SAR', description: 'Rich, intense, pure. Ground to order.', category: 'Specialty Coffee' },
    { name: 'Flat White', price: '24 SAR', description: 'Silky microfoam over double ristretto.', category: 'Specialty Coffee' },
    { name: 'Spanish Latte', price: '28 SAR', description: 'Perfect balance of sweetness and bold roast.', category: 'Specialty Coffee' },
    { name: 'V60 Custom Brew', price: '32 SAR', description: 'Artisan hand-pour with rotating single origin beans.', category: 'Specialty Coffee' },
    { name: 'Cold Brew', price: '30 SAR', description: '18-hour steep for clarity and refreshment.', category: 'Specialty Coffee' },
  ],
  bakery: [
    { name: 'Almond Croissant', price: '22 SAR', description: 'Double-baked, buttery layers with almond frangipane.', category: 'Bakery' },
    { name: 'Lemon Cake', price: '24 SAR', description: 'Zesty moist sponge with crystal citrus glaze.', category: 'Bakery' },
    { name: 'Pecan Tart', price: '28 SAR', description: 'Smoky, nutty, and decadently sweet.', category: 'Bakery' },
    { name: 'Ma’asoub Cake', price: '32 SAR', description: 'A modern tribute to Saudi heritage.', category: 'Bakery' },
  ]
};

export function SignatureMenu() {
  const { t, i18n } = useTranslation();

  return (
    <section id="menu" className="py-48 px-6 bg-matte-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-32">
          <TextReveal delay={0.1}>
            <span className="text-bronze font-display text-[10px] tracking-[0.5em] uppercase mb-6 block font-bold">
              {t('menu.subtitle')}
            </span>
          </TextReveal>
          <StaggeredTextReveal
            text={t('menu.title')}
            className="text-5xl md:text-8xl font-serif mb-8 justify-center"
          />
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-[1px] bg-bronze mx-auto" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* Specialty Coffee */}
          <div className="space-y-16">
            <h3 className={cn(
              "text-2xl font-serif italic flex items-center gap-6 text-bronze",
              i18n.language === 'ar' && "flex-row-reverse"
            )}>
              <span className="w-12 h-[1px] bg-bronze/30" />
              <div className="flex items-center gap-4">
                <Coffee size={24} />
                {t('menu.specialty')}
              </div>
            </h3>
            <div className="space-y-10">
              {MENU_DATA.specialty.map((item, i) => (
                <MenuRow key={item.name} item={item} i={i} />
              ))}
            </div>
          </div>

          {/* Bakery */}
          <div className="space-y-16">
            <h3 className={cn(
              "text-2xl font-serif italic flex items-center gap-6 text-bronze",
              i18n.language === 'ar' && "flex-row-reverse"
            )}>
              <span className="w-12 h-[1px] bg-bronze/30" />
              <div className="flex items-center gap-4">
                <Cake size={24} />
                {t('menu.bakery')}
              </div>
            </h3>
            <div className="space-y-10">
              {MENU_DATA.bakery.map((item, i) => (
                <MenuRow key={item.name} item={item} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-bronze/5 blur-[150px] rounded-full -translate-x-1/2 pointer-events-none" />
    </section>
  );
}

function MenuRow({ item, i }: { item: any; i: number }) {
  const { i18n } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group flex justify-between items-start border-b border-white/5 pb-10 hover:border-bronze transition-all duration-700 cursor-pointer overflow-hidden relative",
        i18n.language === 'ar' ? "flex-row-reverse text-right" : "flex-row text-left"
      )}
    >
      <div className="flex-1 relative z-10">
        <div className={cn(
          "flex items-center gap-4 mb-3",
          i18n.language === 'ar' && "flex-row-reverse"
        )}>
          <h4 className="text-2xl font-serif font-light group-hover:text-bronze transition-colors duration-500">{item.name}</h4>
          <div className="flex-1 h-[1px] border-b border-dashed border-white/10 mx-6 group-hover:border-bronze/30 transition-colors" />
        </div>
        <p className="text-warm-beige/40 text-sm italic font-light group-hover:text-warm-beige/60 transition-colors">{item.description}</p>
      </div>
      <div className={cn(
        "font-serif text-2xl text-bronze/70 group-hover:text-bronze group-hover:scale-110 transition-all duration-500 relative z-10",
        i18n.language === 'ar' ? "mr-10" : "ml-10"
      )}>{item.price}</div>
      
      {/* Hover Background Reveal */}
      <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-white/[0.02] transition-all duration-700 ease-[0.16, 1, 0.3, 1] -z-0" />
    </motion.div>
  );
}

export function Testimonials() {
  const { i18n } = useTranslation();
  const reviews = [
    { name: "Ahmed R.", text: "The white latte is exceptional. Truly the best in Riyadh. The view of Al Faisaliah is mesmerizing from here.", rating: 5 },
    { name: "Sarah K.", text: "Amazing ambiance. Quiet, premium, and perfect for working. My go-to spot for focused productivity.", rating: 5 },
    { name: "Khalid M.", text: "The V60 brew has incredible clarity. You can taste the craftsmanship in every single sip.", rating: 4.8 },
  ];

  return (
    <section className="py-48 px-6 relative overflow-hidden bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="flex gap-1.5 text-bronze">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" className="animate-pulse" />)}
            </div>
            <span className="text-3xl font-serif font-light">{i18n.language === 'ar' ? 'تقييم 4.4 نجوم' : '4.4 Star Rating'}</span>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-warm-beige/30 uppercase tracking-[0.4em] text-[10px] font-bold"
          >
            {i18n.language === 'ar' ? 'بناءً على أكثر من 4,520 تقييم حقيقي' : 'Based on 4,520+ Real Customer Reviews'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1 }}
              className="glass p-12 rounded-[2rem] text-center md:text-left relative group hover:bg-white/[0.05] transition-all duration-700 hover:-translate-y-2 border border-white/5"
            >
              <div className={cn(
                "absolute top-0 -translate-y-1/2 w-14 h-14 bg-bronze flex items-center justify-center rounded-full text-white shadow-xl",
                i18n.language === 'ar' ? "left-12" : "right-12"
              )}>
                <Coffee size={24} />
              </div>
              <p className={cn(
                "text-warm-beige/60 italic mb-10 leading-relaxed text-lg font-light",
                i18n.language === 'ar' && "text-right"
              )}>"{review.text}"</p>
              <h5 className={cn(
                "font-display uppercase tracking-[0.3em] text-[11px] font-bold text-bronze",
                i18n.language === 'ar' && "text-right"
              )}>{review.name}</h5>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const { t, i18n } = useTranslation();
  return (
    <section id="location" className="py-48 px-6 bg-matte-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32">
        <div className="space-y-16">
          <div className={i18n.language === 'ar' ? "text-right" : "text-left"}>
            <StaggeredTextReveal
              text={t('location.title')}
              className="text-5xl md:text-8xl font-serif mb-16 tracking-tight"
            />
            
            <div className="space-y-12">
              <ContactDetail 
                icon={<MapPin size={24} className="text-bronze" />}
                label={t('location.address_label')}
                value={t('location.address')}
                note={t('location.note')}
                i18n={i18n}
              />
              <ContactDetail 
                icon={<Clock size={24} className="text-bronze" />}
                label={t('location.hours_label')}
                value={t('location.hours')}
                i18n={i18n}
              />
              <ContactDetail 
                icon={<Phone size={24} className="text-bronze" />}
                label={t('location.connect')}
                value="+966 50 123 4567"
                socials={[<Instagram key="i" />, <Mail key="m" />]}
                i18n={i18n}
              />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[650px] glass rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-105 transition-all duration-[2s] ease-out" />
          <div className="absolute inset-0 bg-gradient-to-tr from-matte-black/80 via-transparent to-matte-black/40" />
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-8">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-24 h-24 rounded-full glass border border-bronze/30 flex items-center justify-center"
            >
              <MapPin size={40} className="text-bronze glow-sm" />
            </motion.div>
            <a 
              href="https://maps.app.goo.gl/WXRwxAwEStWjT1ow7" 
              target="_blank" 
              className="px-12 py-6 glass text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-bronze hover:text-white transition-all duration-500 flex items-center gap-4 font-display backdrop-blur-xl border-white/10 active:scale-95 shadow-2xl"
            >
              {t('location.map_btn')} <ArrowUpRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactDetail({ icon, label, value, note, socials, i18n }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: i18n.language === 'ar' ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={cn("flex items-start gap-8", i18n.language === 'ar' && "flex-row-reverse")}
    >
      <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center shrink-0 border border-white/5 group-hover:border-bronze transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="font-display uppercase tracking-[0.3em] text-[10px] text-bronze/60 mb-3 font-bold">{label}</h4>
        <p className="text-warm-beige/80 text-xl font-light font-serif leading-relaxed">{value}</p>
        {note && <p className="text-warm-beige/30 text-sm mt-3 font-light italic">{note}</p>}
        {socials && (
          <div className={cn("flex gap-6 mt-6", i18n.language === 'ar' && "justify-end")}>
            {socials.map((s: any, i: number) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -3, color: '#B8860B' }}
                className="text-warm-beige/40 cursor-pointer transition-colors"
              >
                {s}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Footer() {
  const { i18n } = useTranslation();
  return (
    <footer className="py-32 px-6 border-t border-white/5 overflow-hidden bg-black/20">
      <div className={cn(
        "max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20",
        i18n.language === 'ar' && "md:flex-row-reverse"
      )}>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-6"
        >
           <Coffee className="text-bronze" size={48} />
           <span className="text-4xl font-serif tracking-tighter font-light">CAF LAB</span>
        </motion.div>

        <div className="flex gap-16 text-[10px] font-display uppercase tracking-[0.5em] font-bold">
           {['Instagram', 'X (Twitter)', 'TikTok'].map((s) => (
             <a 
               key={s}
               href="#" 
               className="relative py-2 group overflow-hidden"
             >
               <span className="relative z-10 opacity-30 group-hover:opacity-100 transition-opacity duration-500">{s}</span>
               <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-bronze group-hover:w-full transition-all duration-500" />
             </a>
           ))}
        </div>

        <p className="text-[10px] font-display opacity-20 uppercase tracking-[0.3em] font-bold">
          © 2026 CAF LAB. Riyadh, Saudi Arabia.
        </p>
      </div>
    </footer>
  );
}

