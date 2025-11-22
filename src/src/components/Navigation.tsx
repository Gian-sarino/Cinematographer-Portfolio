import { motion } from "motion/react";
import { Instagram, Youtube, Moon, Sun } from "lucide-react";

interface NavigationProps {
  currentPage: "landing" | "about" | "booking" | "admin";
  onNavigate: (
    page: "landing" | "about" | "booking" | "admin",
  ) => void;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

export function Navigation({
  currentPage,
  onNavigate,
  onToggleDarkMode,
  isDarkMode,
}: NavigationProps) {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => onNavigate("landing")}
        >
          <h1 className="text-2xl tracking-[-0.02em] text-foreground">
            Gian Sarino
          </h1>
        </motion.div>

        <div className="flex items-center space-x-8">
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {["Work", "About", "Book", "Admin"].map(
              (item, index) => {
                const page = [
                  "landing",
                  "about",
                  "booking",
                  "admin",
                ][index] as
                  | "landing"
                  | "about"
                  | "booking"
                  | "admin";
                const isActive = currentPage === page;

                return (
                  <motion.button
                    key={item}
                    onClick={() => onNavigate(page)}
                    className={`relative transition-colors duration-300 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-px bg-foreground"
                        layoutId="underline"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                );
              },
            )}
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4 border-l border-border/50 pl-8">
            <motion.a
              href="https://instagram.com/Gian.sarino"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://youtube.com/@Gian.Sarino-xm2hu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Youtube className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center border-l border-border/50 pl-8">
            <motion.button
              onClick={onToggleDarkMode}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}