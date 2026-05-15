import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Coffee, Cake, Wind, Star, MapPin, Clock, Instagram, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, MeshDistortMaterial } from '@react-three/drei';

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
    <section id="menu" className="py-32 px-6 bg-matte-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-bronze font-display text-xs tracking-[0.4em] uppercase mb-4 block">
            {t('menu.subtitle')}
          </span>
          <h2 className="text-5xl md:text-7xl font-serif mb-6">{t('menu.title')}</h2>
          <div className="w-24 h-[1px] bg-bronze mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Specialty Coffee */}
          <div className="space-y-12">
            <h3 className={cn(
              "text-2xl font-display uppercase tracking-widest flex items-center gap-4 text-bronze",
              i18n.language === 'ar' && "flex-row-reverse"
            )}>
              <Coffee size={24} />
              {t('menu.specialty')}
            </h3>
            <div className="space-y-8">
              {MENU_DATA.specialty.map((item, i) => (
                <MenuRow key={item.name} item={item} i={i} />
              ))}
            </div>
          </div>

          {/* Bakery */}
          <div className="space-y-12">
            <h3 className={cn(
              "text-2xl font-display uppercase tracking-widest flex items-center gap-4 text-bronze",
              i18n.language === 'ar' && "flex-row-reverse"
            )}>
              <Cake size={24} />
              {t('menu.bakery')}
            </h3>
            <div className="space-y-8">
              {MENU_DATA.bakery.map((item, i) => (
                <MenuRow key={item.name} item={item} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-espresso/30 blur-[120px] rounded-full -translate-x-1/2" />
    </section>
  );
}

function MenuRow({ item, i }: { item: any; i: number }) {
  const { i18n } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, x: i18n.language === 'ar' ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className={cn(
        "group flex justify-between items-start border-b border-white/5 pb-8 hover:border-bronze/30 transition-colors cursor-pointer",
        i18n.language === 'ar' ? "flex-row-reverse text-right" : "flex-row text-left"
      )}
    >
      <div className="flex-1">
        <div className={cn(
          "flex items-center gap-4 mb-2",
          i18n.language === 'ar' && "flex-row-reverse"
        )}>
          <h4 className="text-xl font-serif group-hover:text-bronze transition-colors">{item.name}</h4>
          <div className="flex-1 h-[1px] border-b border-dashed border-white/10 mx-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-warm-beige/60 text-sm italic font-light">{item.description}</p>
      </div>
      <span className={cn(
        "font-display font-bold text-bronze",
        i18n.language === 'ar' ? "mr-8" : "ml-8"
      )}>{item.price}</span>
    </motion.div>
  );
}

export function Testimonials() {
  const { i18n } = useTranslation();
  const reviews = [
    { name: "Ahmed R.", text: "اللاتيه الأبيض استثنائي. الأفضل في الرياض. إطلالة الفيصلية مذهلة.", rating: 5 },
    { name: "Sarah K.", text: "Amazing ambiance. Quiet, premium, and perfect for working. My go-to spot.", rating: 5 },
    { name: "Khalid M.", text: "قهوة V60 تتميز بنقاء لا يصدق. تشعر بالحرفة اليدوية في كل رشفة.", rating: 4.8 },
  ];

  return (
    <section className="py-32 px-6 glass relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex gap-1 text-bronze">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
          </div>
          <span className="text-2xl font-serif">{i18n.language === 'ar' ? 'تقييم 4.4 نجوم' : '4.4 Star Rating'}</span>
        </div>
        <p className="text-warm-beige/60 uppercase tracking-[0.3em] text-xs mb-16">
          {i18n.language === 'ar' ? 'بناءً على أكثر من 4,520 تقييم حقيقي' : 'Based on 4,520+ Real Customer Reviews'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass p-10 rounded-2xl text-center md:text-left relative group hover:bg-white/10 transition-colors"
            >
              <div className={cn(
                "absolute top-0 -translate-y-1/2 w-12 h-12 bg-bronze flex items-center justify-center rounded-full text-white",
                i18n.language === 'ar' ? "left-10" : "right-10"
              )}>
                <Coffee size={20} />
              </div>
              <p className={cn(
                "text-warm-beige/80 italic mb-8 leading-relaxed",
                i18n.language === 'ar' && "text-right"
              )}>"{review.text}"</p>
              <h5 className={cn(
                "font-display uppercase tracking-widest text-xs text-bronze",
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
    <section id="location" className="py-32 px-6 bg-matte-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: i18n.language === 'ar' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={i18n.language === 'ar' ? "text-right" : "text-left"}
          >
            <h2 className="text-5xl md:text-7xl font-serif mb-12">{t('location.title')}</h2>
            <div className="space-y-8">
              <div className={cn("flex items-start gap-6", i18n.language === 'ar' && "flex-row-reverse")}>
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-bronze" />
                </div>
                <div>
                  <h4 className="font-display uppercase tracking-widest text-xs text-bronze mb-2">{t('location.address_label')}</h4>
                  <p className="text-warm-beige/80">{t('location.address')}</p>
                  <p className="text-warm-beige/40 text-sm mt-2 flex items-center gap-2">
                    {t('location.note')}
                  </p>
                </div>
              </div>
              
              <div className={cn("flex items-start gap-6", i18n.language === 'ar' && "flex-row-reverse")}>
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-bronze" />
                </div>
                <div>
                  <h4 className="font-display uppercase tracking-widest text-xs text-bronze mb-2">{t('location.hours_label')}</h4>
                  <p className="text-warm-beige/80">{t('location.hours')}</p>
                </div>
              </div>

              <div className={cn("flex items-start gap-6", i18n.language === 'ar' && "flex-row-reverse")}>
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-bronze" />
                </div>
                <div>
                  <h4 className="font-display uppercase tracking-widest text-xs text-bronze mb-2">{t('location.connect')}</h4>
                  <p className="text-warm-beige/80">+966 50 123 4567</p>
                  <div className={cn("flex gap-4 mt-4", i18n.language === 'ar' && "justify-end")}>
                    <Instagram size={20} className="hover:text-bronze cursor-pointer transition-colors" />
                    <Mail size={20} className="hover:text-bronze cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[500px] glass rounded-3xl overflow-hidden border border-white/10 group"
        >
          {/* Aesthetic Map Placeholder */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
          <div className="absolute inset-0 bg-matte-black/50" />
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
            <MapPin size={48} className="text-bronze animate-bounce" />
            <a 
              href="https://maps.app.goo.gl/WXRwxAwEStWjT1ow7" 
              target="_blank" 
              className="px-8 py-4 glass text-xs font-bold uppercase tracking-widest hover:bg-bronze hover:text-white transition-all flex items-center gap-2 font-display"
            >
              {t('location.map_btn')} <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  const { i18n } = useTranslation();
  return (
    <footer className="py-20 px-6 border-t border-white/5 overflow-hidden">
      <div className={cn(
        "max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12",
        i18n.language === 'ar' && "md:flex-row-reverse"
      )}>
        <div className="flex items-center gap-4">
           <Coffee className="text-bronze" size={32} />
           <span className="text-3xl font-serif tracking-tighter">CAF LAB</span>
        </div>

        <div className="flex gap-12 text-xs font-display uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">
           <a href="#" className="hover:text-bronze transition-colors underline decoration-bronze/30 underline-offset-8">Insta</a>
           <a href="#" className="hover:text-bronze transition-colors underline decoration-bronze/30 underline-offset-8">X</a>
           <a href="#" className="hover:text-bronze transition-colors underline decoration-bronze/30 underline-offset-8">TikTok</a>
        </div>

        <p className="text-xs font-display opacity-30 uppercase tracking-widest">
          © 2026 CAF LAB. Riyadh, Saudi Arabia.
        </p>
      </div>
    </footer>
  );
}
