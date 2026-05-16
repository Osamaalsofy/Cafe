import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        about: 'About',
        menu: 'Menu',
        experience: 'Experience',
        location: 'Location',
        contact: 'Contact',
      },
      hero: {
        headline: 'Crafted Coffee. Elevated Moments.',
        subheadline: 'Experience Riyadh’s specialty coffee culture with artisan roasting, elegant interiors, and unforgettable flavors.',
        cta_menu: 'Explore Menu',
        cta_visit: 'Visit Us',
      },
      about: {
        title: 'Artisan Roasting in Riyadh',
        subtitle: 'Our Story',
        description: 'At CAF LAB, coffee isn\'t just a drink; it\'s a sensory journey. Born in the heart of Riyadh, we pair artisan roasting techniques with the world\'s most exclusive beans to create an unforgettable specialty experience.',
        inner_peace: 'Inner Peace',
        sanctuary: 'A Sanctuary in the Sky',
        iconic_views: 'Iconic Views',
        iconic_desc: 'Gaze upon the Al Faisaliah Tower while sipping our signature V60 brew.',
        bean_origins: 'Bean Origins',
        artisanal: 'Artisanal Dedication',
      },
      experience: {
        title: 'Craftsmanship in Every Pour',
        description: 'From the initial roast to the final pour, we maintain a standard of excellence that honors the coffee culture of Saudi Arabia.',
        gallery: 'See Gallery',
        quote: '"The soul of Riyadh captured in a single bean."',
      },
      menu: {
        title: 'Signature Menu',
        subtitle: 'Signature Selection',
        specialty: 'Specialty Coffee',
        bakery: 'Bakery & Desserts',
      },
      location: {
        title: 'Find Us in Riyadh',
        address_label: 'Address',
        address: 'Olaya St, Riyadh, Saudi Arabia',
        note: 'Adjacent to Olaya Towers • View of Al Faisaliah Tower',
        hours_label: 'Hours',
        hours: 'Everyday: 6:00 AM — 12:00 AM',
        connect: 'Connect',
        map_btn: 'Open in Google Maps',
      }
    }
  },
  ar: {
    translation: {
      nav: {
        about: 'من نحن',
        menu: 'القائمة',
        experience: 'التجربة',
        location: 'الموقع',
        contact: 'اتصل بنا',
      },
      hero: {
        headline: 'قهوة مصنوعة. لحظات راقية.',
        subheadline: 'استمتع بثقافة القهوة المختصة في الرياض مع تحميص يدوي، وتصاميم داخلية أنيقة، ونكهات لا تُنسى.',
        cta_menu: 'استكشف القائمة',
        cta_visit: 'زورونا الآن',
      },
      about: {
        title: 'تحميص حرفي في قلب الرياض',
        subtitle: 'قصتنا',
        description: 'في CAF LAB، القهوة ليست مجرد مشروب؛ إنها رحلة حسية. ولدت في قلب الرياض، حيث نجمع بين تقنيات التحميص اليدوي وأفخر أنواع البن في العالم لنخلق تجربة مختصة لا تُنسى.',
        inner_peace: 'سلام داخلي',
        sanctuary: 'ملاذ في أعالي السماء',
        iconic_views: 'إطلالات أيقونية',
        iconic_desc: 'تأمل برج الفيصلية بينما ترتشف قهوتنا المختصة V60.',
        bean_origins: 'أصول البن',
        artisanal: 'تفانٍ حرفي',
      },
      experience: {
        title: 'براعة في كل سكب',
        description: 'من التحميص الأول إلى السكب الأخير، نحافظ على معايير التميز التي تكرم ثقافة القهوة في المملكة العربية السعودية.',
        gallery: 'شاهد المعرض',
        quote: '"روح الرياض في حبة بن واحدة."',
      },
      menu: {
        title: 'القائمة الخاصة',
        subtitle: 'اختياراتنا المميزة',
        specialty: 'قهوة مختصة',
        bakery: 'المخبوزات والحلويات',
      },
      location: {
        title: 'تجدوننا في الرياض',
        address_label: 'العنوان',
        address: 'شارع العليا، الرياض، المملكة العربية السعودية',
        note: 'بجوار أبراج العليا • إطلالة على برج الفيصلية',
        hours_label: 'الساعات',
        hours: 'يومياً: 6:00 صباحاً — 12:00 منتصف الليل',
        connect: 'تواصل معنا',
        map_btn: 'افتح في خرائط جوجل',
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
