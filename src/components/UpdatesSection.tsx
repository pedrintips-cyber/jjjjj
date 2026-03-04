import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import solidarityImg from "@/assets/solidarity.jpg";

const updates = [
  {
    date: "04 de Março, 2025",
    title: "Campanha lançada! 🚀",
    content: "MC Kevin Chris, Chris Dias, RSP, Débora Paixão e outros artistas se uniram para lançar essa vaquinha e ajudar as vítimas da enchente em Ubá. Compartilhe!",
    image: solidarityImg,
  },
  {
    date: "01 de Março, 2025",
    title: "Enchente devastadora atinge Ubá",
    content: "Fortes chuvas causaram uma enchente histórica em Ubá, MG. Centenas de casas foram destruídas, milhares de pessoas ficaram desabrigadas e vidas foram perdidas.",
    image: null,
  },
];

export const UpdatesSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-foreground mb-2">
              Atualizações
            </h2>
            <p className="text-sm text-muted-foreground">Acompanhe o progresso da campanha</p>
          </motion.div>

          <div className="space-y-4">
            {updates.map((update, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-card"
              >
                {update.image && (
                  <img
                    src={update.image}
                    alt={update.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {update.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Ubá, MG
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 font-display">{update.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{update.content}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
