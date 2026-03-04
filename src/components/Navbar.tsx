import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Heart className="w-4 h-4 text-primary-foreground" fill="currentColor" />
          </div>
          <span className={`font-display font-bold text-sm transition-colors ${
            scrolled ? "text-foreground" : "text-white"
          }`}>
            Juntos por Ubá
          </span>
        </div>

        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Button
                size="sm"
                className="bg-gradient-cta text-primary-foreground font-bold text-xs shadow-cta rounded-full px-5"
                onClick={() => document.getElementById("doar")?.scrollIntoView({ behavior: "smooth" })}
              >
                Doar agora
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
