import { motion } from "framer-motion";
import { Instagram, Youtube, Users } from "lucide-react";

const influencers = [
  { name: "MC Kevin Chris", role: "MC / Artista", followers: "5.2M", initials: "KC", gradient: "from-blue-500 to-blue-600" },
  { name: "Chris Dias", role: "Criador de Conteúdo", followers: "2.1M", initials: "CD", gradient: "from-purple-500 to-purple-600" },
  { name: "RSP", role: "MC / Influenciador", followers: "3.5M", initials: "RS", gradient: "from-orange-500 to-orange-600" },
  { name: "Débora Paixão", role: "Influenciadora Digital", followers: "1.8M", initials: "DP", gradient: "from-pink-500 to-pink-600" },
  { name: "Thaís Carla", role: "Dançarina / Influenciadora", followers: "1.5M", initials: "TC", gradient: "from-teal-500 to-teal-600" },
  { name: "Vitão", role: "Cantor / Influenciador", followers: "4.8M", initials: "VT", gradient: "from-red-500 to-red-600" },
];

export const InfluencersSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
              <Users className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Organizadores</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-foreground mb-2">
              Artistas unidos por Ubá
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Esses influenciadores criaram essa vaquinha para ajudar as vítimas da enchente
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {influencers.map((inf, i) => (
              <motion.div
                key={inf.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card rounded-xl p-4 border border-border hover:shadow-elevated transition-all duration-300 group text-center"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${inf.gradient} flex items-center justify-center text-white font-bold text-sm mx-auto mb-3 group-hover:scale-105 transition-transform`}>
                  {inf.initials}
                </div>
                <h4 className="font-bold text-foreground text-sm mb-0.5">{inf.name}</h4>
                <p className="text-[11px] text-muted-foreground mb-2">{inf.role}</p>
                <p className="text-[11px] text-muted-foreground font-medium">{inf.followers} seguidores</p>
                <div className="flex justify-center gap-2 mt-3">
                  <Instagram className="w-3.5 h-3.5 text-muted-foreground/50 hover:text-primary cursor-pointer transition-colors" />
                  <Youtube className="w-3.5 h-3.5 text-muted-foreground/50 hover:text-destructive cursor-pointer transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
