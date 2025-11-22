import { motion } from 'motion/react';
import { useState } from 'react';
import { Play, X } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  thumbnail?: string;
  title: string;
  category: string;
  duration?: string;
}

export function VideoPlayer({ videoId, thumbnail, title, category, duration }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Generate YouTube thumbnail if not provided
  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  return (
    <>
      {/* Thumbnail */}
      <motion.div
        className="group cursor-pointer"
        whileHover={{ y: -8 }}
        onClick={handlePlay}
      >
        <div className="aspect-video relative overflow-hidden bg-muted/20 mb-4 rounded-lg border border-border/50">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              // Fallback to high quality thumbnail if maxresdefault fails
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          
          {/* Video overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:from-black/40 transition-all duration-500" />
          
          {/* Play button */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0.7 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:bg-white group-hover:scale-110 transition-all duration-300">
              <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
            </div>
          </motion.div>
          
          {/* Duration badge */}
          {duration && (
            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium">
              {duration}
            </div>
          )}
          
          {/* Video progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <motion.div 
              className="h-full bg-white origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 0.3 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground tracking-wide uppercase">
            {category}
          </p>
          <h3 className="text-xl tracking-[-0.01em] text-foreground">{title}</h3>
        </div>
      </motion.div>

      {/* Video Modal */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-6xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 text-white hover:text-white/70 transition-colors p-2"
            >
              <X className="w-8 h-8" />
            </button>

            {/* YouTube Embed */}
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}