import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import gianPortrait from '../assets/daed18a7e5276dcc2fa3ef99b2ffc28c81082934.png';
  onNavigate: (page: 'booking') => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const services = [
    "Commercial & Brand Films",
    "Documentary Production",
    "Wedding Cinematography",
    "Event Coverage",
    "Creative Direction",
    "Post-Production"
  ];

  const testimonials = [
    { 
      client: "Sarah Mitchell", 
      role: "Creative Director", 
      company: "Northbound Collective",
      quote: "Working with Gian was like having a creative partner who just gets it. The energy he brought to our brand film was infectious – our whole team was excited to be there. And the final result? Pure gold."
    },
    { 
      client: "Marcus Thompson", 
      role: "Founder", 
      company: "Cascade Ventures",
      quote: "Gian somehow makes video shoots feel like the highlight of your week. Professional as hell, but also the kind of person you want to grab a beer with after. Our story came alive in ways we never imagined."
    },
    { 
      client: "Elena Rodriguez", 
      role: "Marketing Manager", 
      company: "Pinnacle Events",
      quote: "We were nervous about being on camera, but Gian's energy just made everything click. He caught all these amazing candid moments because everyone was actually having fun. The film still gives me chills."
    },
    { 
      client: "David Chen", 
      role: "Documentary Producer", 
      company: "Independent",
      quote: "Gian brings this unique combo of technical excellence and genuine enthusiasm. Our documentary subjects opened up to him immediately – you can feel that trust and energy in every frame."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-20 pb-16"
    >
      {/* Hero Section */}
      <motion.section 
        className="relative border-b border-border/30"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Hero background */}
        <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-lg" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div 
                className="inline-block px-4 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-full text-sm text-foreground/80 mb-6 border border-white/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                About the filmmaker
              </motion.div>
              <h2 className="text-4xl md:text-5xl tracking-[-0.03em] mb-6 text-foreground">
                Hey, I'm Gian!
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-foreground/80">
                <p>
                  I've been behind the camera for over 8 years, and honestly? I still get excited 
                  about every single shoot. There's something magical about turning ideas into 
                  visual stories that just hits different.
                </p>
                <p>
                  Here's the thing – I believe the best work happens when everyone's having a good time. 
                  Sure, I'm obsessed with getting the perfect shot and the technical details matter, 
                  but I also know that when the energy is right, that's when the real magic happens. 
                  My sets are professional but never stuffy.
                </p>
                <p>
                  Based in beautiful Alberta, Canada (yeah, the mountains are as epic as they look), 
                  I work with awesome people across North America and beyond. Every project is a chance 
                  to create something that didn't exist before – and that never gets old.
                </p>
              </div>
            </div>
            
            <motion.div 
              className="aspect-[3/4] relative overflow-hidden bg-muted/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={gianPortrait}
                alt="Gian Sarino - Cinematographer"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services */}
      <motion.section 
        className="relative border-b border-border/30"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {/* Services background */}
        <div className="absolute inset-0 bg-white/12 dark:bg-white/6 backdrop-blur-lg" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl tracking-[-0.02em] mb-4 text-foreground">
              Services & Testimonials
            </h3>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-6" />
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              What I do best and what clients say about working together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="bg-white/15 dark:bg-white/8 backdrop-blur-lg rounded-lg p-8 border border-white/25">
              <h4 className="text-xl tracking-[-0.02em] mb-6 text-foreground flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                What I Love Shooting
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {services.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-4 py-3 border-b border-border"
                  >
                    <div className="w-2 h-2 bg-foreground rounded-full" />
                    <span className="text-lg text-foreground">{service}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white/15 dark:bg-white/8 backdrop-blur-lg rounded-lg p-8 border border-white/25">
              <h4 className="text-xl tracking-[-0.02em] mb-6 text-foreground flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                What People Say
              </h4>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.client}-${testimonial.company}`}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="border-l-2 border-white/30 pl-6"
                  >
                    <blockquote className="text-foreground/80 italic mb-3 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="text-sm">
                      <div className="text-foreground font-medium">{testimonial.client}</div>
                      <div className="text-foreground/70">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Social Media */}
      <motion.section 
        className="relative border-b border-border/30"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        {/* Social background */}
        <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-lg" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-2xl tracking-[-0.02em] mb-4 text-foreground">
              Follow the Journey
            </h3>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-6" />
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Behind-the-scenes content, recent work, and creative process insights.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.a
              href="https://instagram.com/Gian.sarino"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/15 dark:bg-white/8 backdrop-blur-lg rounded-lg p-8 border border-white/25 hover:border-white/40 transition-all duration-300"
              whileHover={{ y: -4 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="flex items-center justify-between mb-4">
                <Instagram className="w-8 h-8 text-foreground" />
                <ExternalLink className="w-4 h-4 text-foreground/60 group-hover:text-foreground transition-colors" />
              </div>
              <h4 className="text-lg font-medium text-foreground mb-2">@Gian.sarino</h4>
              <p className="text-sm text-foreground/70">
                Daily inspiration, behind-the-scenes moments, and visual storytelling in progress.
              </p>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/giansarino"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/15 dark:bg-white/8 backdrop-blur-lg rounded-lg p-8 border border-white/25 hover:border-white/40 transition-all duration-300"
              whileHover={{ y: -4 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <Linkedin className="w-8 h-8 text-foreground" />
                <ExternalLink className="w-4 h-4 text-foreground/60 group-hover:text-foreground transition-colors" />
              </div>
              <h4 className="text-lg font-medium text-foreground mb-2">Professional Network</h4>
              <p className="text-sm text-foreground/70">
                Industry insights, project collaborations, and business connections.
              </p>
            </motion.a>

            <motion.a
              href="https://youtube.com/@giansarino"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/15 dark:bg-white/8 backdrop-blur-lg rounded-lg p-8 border border-white/25 hover:border-white/40 transition-all duration-300"
              whileHover={{ y: -4 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <Youtube className="w-8 h-8 text-foreground" />
                <ExternalLink className="w-4 h-4 text-foreground/60 group-hover:text-foreground transition-colors" />
              </div>
              <h4 className="text-lg font-medium text-foreground mb-2">Video Portfolio</h4>
              <p className="text-sm text-foreground/70">
                Full-length projects, cinematography reels, and tutorial content.
              </p>
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Philosophy */}
      <motion.section 
        className="relative border-b border-border/30"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        {/* Philosophy background */}
        <div className="absolute inset-0 bg-white/8 dark:bg-white/4 backdrop-blur-lg" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-2xl tracking-[-0.02em] mb-4 text-foreground">
              My Philosophy
            </h3>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto" />
          </motion.div>
          
          <div className="text-center bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-lg p-10 border border-white/30">
            <blockquote className="text-2xl md:text-3xl leading-relaxed tracking-[-0.02em] italic mb-8 text-foreground">
              "Great cinematography happens when technical skill meets genuine human connection. 
              I bring the energy, you bring the vision, and together we create something 
              that makes people feel something real."
            </blockquote>
            <div className="text-foreground/70">— Gian (probably over coffee)</div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="relative"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.0 }}
      >
        {/* CTA background */}
        <div className="absolute inset-0 bg-white/15 dark:bg-white/8 backdrop-blur-lg" />
        
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <motion.div 
              className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-lg rounded-full text-sm text-primary mb-6 border border-primary/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Next steps
            </motion.div>
            <h3 className="text-3xl tracking-[-0.02em] mb-4 text-foreground">
              Ready to make something awesome?
            </h3>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-8" />
            <p className="text-lg text-foreground/80 mb-8 max-w-xl mx-auto">
              Let's schedule a consultation to discuss your project and see how we can bring your vision to life.
            </p>
            <motion.button
              onClick={() => onNavigate('booking')}
              className="px-12 py-4 bg-primary text-primary-foreground text-lg tracking-wide transition-colors hover:bg-primary/80 rounded-md shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a Consultation
            </motion.button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}