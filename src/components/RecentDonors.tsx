import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export const RecentDonors = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-foreground mb-2">
              Doações recentes
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Veja quem já está ajudando as famílias de Ubá
            </p>

            <div className="bg-muted/40 rounded-2xl border border-border p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-muted-foreground/60" />
              </div>
              <p className="text-foreground font-bold text-lg mb-1">Nenhuma doação ainda</p>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Seja o primeiro a ajudar as famílias de Ubá! Toda doação conta 💚
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
