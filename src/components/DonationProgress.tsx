import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp } from "lucide-react";

const GOAL = 100000;
const RAISED = 0;
const DONORS = 0;
const PERCENTAGE = GOAL > 0 ? Math.round((RAISED / GOAL) * 100) : 0;

export const DonationProgress = () => {
  return (
    <div className="bg-card rounded-2xl p-5 md:p-7 shadow-float border border-border/50">
      {/* Amount raised */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <span className="text-2xl md:text-3xl font-extrabold text-foreground font-display">
            R$ {RAISED.toLocaleString("pt-BR")}
          </span>
          <span className="text-sm text-muted-foreground ml-2">
            arrecadados
          </span>
        </div>
        <span className="text-sm font-semibold text-muted-foreground">
          Meta: R$ {GOAL.toLocaleString("pt-BR")}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden mb-3">
        <motion.div
          className="h-full bg-gradient-cta rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(PERCENTAGE, 2)}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
        />
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
          <TrendingUp className="w-3 h-3" />
          {PERCENTAGE}% da meta
        </div>
        <span className="text-xs text-muted-foreground">{DONORS} doadores</span>
      </div>

      {/* CTA Button */}
      <Button
        size="lg"
        className="w-full bg-gradient-cta text-primary-foreground font-bold text-base py-6 hover:opacity-90 transition-all shadow-cta rounded-xl active:scale-[0.98]"
        onClick={() => document.getElementById("doar")?.scrollIntoView({ behavior: "smooth" })}
      >
        <Heart className="w-5 h-5 mr-2" fill="currentColor" />
        Seja o primeiro a doar!
      </Button>
    </div>
  );
};
