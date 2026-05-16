import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          delay: delay,
          ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth reveal
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function StaggeredTextReveal({ 
  text, 
  className, 
  delay = 0,
  once = true 
}: { 
  text: string; 
  className?: string; 
  delay?: number;
  once?: boolean;
}) {
  const words = text.split(' ');
  
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden me-[0.2em] mb-[0.1em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 5 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once }}
            transition={{
              duration: 1.2,
              delay: delay + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
}
