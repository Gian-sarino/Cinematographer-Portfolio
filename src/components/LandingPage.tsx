import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VideoPlayer } from './VideoPlayer';
import { Play } from 'lucide-react';

// Import portfolio images from assets
import portfolioImage1 from '../src/assets/ae15dc5f4d4c61e5795541d171e256c2304fc64c.png';
import portfolioImage2 from '../assets/36b5736f28a2e677a4d748d4fcfaa4714d58978a.png';
import portfolioImage3 from '../assets/461bbba6e5f116e17cc128e227c7cbefe5962a5f.png';
import portfolioImage4 from '../assets/1f61ee87097d8103debc0aaf838d5b5f9968855a.png';
import portfolioImage5 from '../assets/ef85550941b205b804adbe455cac3816019b4116.png';
import portfolioImage6 from '../assets/8acd3c775ab54c89ad3953fab5eccc8e81dd77a6.png';
import portfolioImage7 from '../assets/d363d37e11466acca09d02a60bd74f806274d36b.png';
import portfolioImage8 from '../assets/7cb044602513902e0dc6a3ca8e027840471d34a3.png';
import portfolioImage9 from '../assets/46a08e35ba62176a5a7cb5f8b13d4228ec451969.png';
import portfolioImage10 from '../assets/7073eb3e73d57ec0bc6ccead8c80ee889c3d3f1b.png';
import portfolioImage11 from '../assets/89ce83f914b9f91e969dfafc9e1da180fca72cec.png';
import portfolioImage12 from '../assets/4fe8c2e13e5c6d637641c346bc6917dcbc34e3a3.png';
import portfolioImage13 from '../assets/886225dde407796b98432e36e99e756bb1858eb8.png';
import portfolioImage14 from '../assets/36284174c5d7c8be6b3e6d2e82c6d0d60c16390a.png';
import customThumbnail from '../assets/c3744cdc08efbcbe132c5f7b142764961b0f69fb.png';

// Import Instagram Reel thumbnails from assets
import reelThumbnail1 from '../assets/d1095ac04a0815652f08e868293a8c0a38598a90.png';
import reelThumbnail2 from '../assets/55e7be24702aa4923f4352376cc7b319f1439d1a.png';
import reelThumbnail3 from '../assets/6f02597afead9506a843be7469747427ef44271c.png';
import reelThumbnail4 from '../assets/e1b35766fb68207a960ddd066262256783ad6353.png';
import reelThumbnail5 from '../assets/ee88760a3582db27757024dc75c0a33025fd8e29.png';
import reelThumbnail6 from '../assets/5bd91a7b97fbfbedd6126b51a65d47506b56482f.png';

interface LandingPageProps {
  onNavigate: (page: 'about' | 'booking') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const portfolioItems = [
    {
      id: 1,
      title: "The Art of Procrastination",
      category: "Showreel",
      type: 'youtube' as const,
      youtubeId: 'fkh40zdZijk',
      duration: "2:34"
    },
    {
      id: 2,
      title: "Modern Dating Documentary",
      category: "Commercial",
      type: 'youtube' as const,
      youtubeId: 'x98r9XJmnbQ',
      duration: "3:15"
    },
    {
      id: 3,
      title: "A Night Out - 48 hour film challenge",
      category: "Wedding",
      type: 'youtube' as const,
      youtubeId: '1G1o_XE4iIQ',
      duration: "4:12"
    },
    {
      id: 4,
      title: "Autumn",
      category: "Urban",
      type: 'youtube' as const,
      youtubeId: 'Er9wtavAUnc',
      thumbnail: customThumbnail,
      duration: "3:28"
    },
    {
      id: 5,
      title: "from solo to Duo",
      category: "Lifestyle",
      type: 'youtube' as const,
      youtubeId: 'r1yshlvFPlw',
      duration: "2:51"
    },
    {
      id: 6,
      title: "Collective",
      category: "Commercial",
      image: portfolioImage6,
      duration: "1:23"
    },
    {
      id: 7,
      title: "Connection",
      category: "Portrait",
      image: portfolioImage7,
      duration: "3:15"
    },
    {
      id: 8,
      title: "Autumn Joy",
      category: "Lifestyle",
      image: portfolioImage8,
      duration: "2:08"
    },
    {
      id: 9,
      title: "Urban Portrait",
      category: "Fashion",
      image: portfolioImage9,
      duration: "1:56"
    },
    {
      id: 10,
      title: "Studio Sessions",
      category: "Portrait",
      image: portfolioImage10,
      duration: "3:42"
    },
    {
      id: 11,
      title: "Golden Hour",
      category: "Cinematic",
      image: portfolioImage11,
      duration: "2:29"
    },
    {
      id: 12,
      title: "Night Drive",
      category: "Narrative",
      image: portfolioImage12,
      duration: "4:03"
    },
    {
      id: 13,
      title: "Cityscape",
      category: "Urban",
      image: portfolioImage13,
      duration: "3:05"
    },
    {
      id: 14,
      title: "Sunset Reflections",
      category: "Landscape",
      image: portfolioImage14,
      duration: "2:45"
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
        <div className="absolute inset-0 bg-white/8 dark:bg-white/3 backdrop-blur-sm" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <motion.div 
              className="inline-block px-4 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-full text-sm text-foreground/80 mb-8 border border-white/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Alberta-based Cinematographer
            </motion.div>
            <h2 className="text-6xl md:text-8xl tracking-[-0.04em] mb-6 text-foreground">
              Visual Storyteller
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Crafting cinematic narratives that captivate, inspire, and endure. 
              Every frame tells a story.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Portfolio Grid */}
      <motion.section 
        className="relative border-b border-border/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* Portfolio section background */}
        <div className="absolute inset-0 bg-white/12 dark:bg-white/6 backdrop-blur-lg" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-3xl md:text-4xl tracking-[-0.02em] mb-4 text-foreground">
              Featured Work
            </h3>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-6" />
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              A curated selection of recent projects spanning commercial, documentary, and creative storytelling.
            </p>
          </motion.div>

          {/* YouTube Videos Grid - One Per Row */}
          <motion.div 
            className="grid grid-cols-1 gap-8 mb-16"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {portfolioItems.filter(item => item.type === 'youtube').map((item, index) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { y: 60, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <VideoPlayer
                  videoId={item.youtubeId}
                  title={item.title}
                  category={item.category}
                  duration={item.duration}
                  thumbnail={item.thumbnail}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Instagram Reels Section */}
          <motion.div 
            className="mt-20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl tracking-[-0.02em] mb-4 text-foreground">
                Instagram Reels
              </h3>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto" />
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              {[
                { id: 'reel1', url: 'https://www.instagram.com/reel/C-dlSEygEjR/', title: 'Instagram Reel 1', thumbnail: reelThumbnail1 },
                { id: 'reel2', url: 'https://www.instagram.com/reel/DKnVem1IWKF/', title: 'Instagram Reel 2', thumbnail: reelThumbnail2 },
                { id: 'reel3', url: 'https://www.instagram.com/reel/C-v0KZWSfJ3/', title: 'Instagram Reel 3', thumbnail: reelThumbnail3 },
                { id: 'reel4', url: 'https://www.instagram.com/reel/C_tjARKSnKL/', title: 'Instagram Reel 4', thumbnail: reelThumbnail4 },
                { id: 'reel5', url: 'https://www.instagram.com/reel/C9fgzwqP27t/', title: 'Instagram Reel 5', thumbnail: reelThumbnail5 },
                { id: 'reel6', url: 'https://www.instagram.com/reel/Cr1xlcgAAxR/', title: 'Instagram Reel 6', thumbnail: reelThumbnail6 }
              ].map((reel, index) => (
                <motion.a
                  key={reel.id}
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="group cursor-pointer block"
                  whileHover={{ y: -8 }}
                >
                  <div className="aspect-[9/16] relative overflow-hidden bg-muted/20 rounded-lg border border-border/50">
                    <img
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white shadow-lg">
                        <Play className="w-6 h-6 text-black fill-black" />
                      </div>
                    </div>

                    {/* Instagram label */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs tracking-wide">
                      REEL
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Photo Gallery Section */}
          <motion.div 
            className="mt-20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl tracking-[-0.02em] mb-4 text-foreground">
                Photo Gallery
              </h3>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto" />
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              {portfolioItems.filter(item => item.type !== 'youtube').map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square relative overflow-hidden bg-muted/20 rounded-lg border border-border/50">
                    {typeof item.image === 'string' ? (
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                    
                    {/* Title overlay on hover */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs text-white/80 tracking-wide uppercase mb-1">
                        {item.category}
                      </p>
                      <h4 className="text-sm text-white">{item.title}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="relative"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        {/* CTA background */}
        <div className="absolute inset-0 bg-white/15 dark:bg-white/8 backdrop-blur-lg" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <motion.div 
              className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-lg rounded-full text-sm text-primary mb-6 border border-primary/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              Let's collaborate
            </motion.div>
            <h3 className="text-3xl md:text-4xl tracking-[-0.02em] mb-4 text-foreground">
              Ready to create something extraordinary?
            </h3>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent mx-auto mb-8" />
            <p className="text-lg text-foreground/80 mb-8 max-w-xl mx-auto">
              Every project starts with a conversation. Let's discuss your vision and bring it to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={() => onNavigate('about')}
                className="px-8 py-3 bg-primary text-primary-foreground tracking-wide transition-colors hover:bg-primary/80 rounded-md shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
              <motion.button
                onClick={() => onNavigate('booking')}
                className="px-8 py-3 border border-white/30 tracking-wide transition-colors hover:border-white/50 text-foreground rounded-md backdrop-blur-sm bg-white/20 dark:bg-white/10 shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Session
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}