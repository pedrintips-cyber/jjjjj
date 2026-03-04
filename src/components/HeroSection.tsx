import { motion } from "framer-motion";
import { MapPin, Share2 } from "lucide-react";
import heroImage from "@/assets/hero-flood.jpg";
import { DonationProgress } from "./DonationProgress";

export const HeroSection = () => {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Juntos por Ubá",
        text: "Ajude as vítimas da enchente em Ubá, MG",
        url: window.location.href,
      });
    }
  };

  return (
    <section className="relative min-h-[92vh] md:min-h-[88vh] flex flex-col">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Enchente em Ubá, Minas Gerais"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-8 md:pb-14">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto md:max-w-2xl">
            {/* Location tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-urgency px-3 py-1 text-[11px] font-bold text-urgency-foreground uppercase tracking-wider">
                🔴 Emergência
              </span>
              <span className="inline-flex items-center gap-1 text-white/70 text-xs">
                <MapPin className="w-3 h-3" />
                Ubá, Minas Gerais
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-[3.4rem] font-extrabold text-white leading-[1.1] mb-4 font-display"
            >
              Ajude as famílias de Ubá que perderam tudo na enchente
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-base text-white/70 leading-relaxed mb-6 max-w-lg"
            >
              Campanha criada por <strong className="text-white">MC Kevin Chris, Chris Dias, RSP, Débora Paixão</strong> e outros artistas. Centenas de famílias desabrigadas precisam da sua ajuda.
            </motion.p>

            {/* Share button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs font-medium transition-colors mb-8"
            >
              <Share2 className="w-3.5 h-3.5" />
              Compartilhar campanha
            </motion.button>

            {/* Progress card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <DonationProgress />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
