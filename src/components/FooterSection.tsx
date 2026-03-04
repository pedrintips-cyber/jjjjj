import { Heart } from "lucide-react";

export const FooterSection = () => {
  return (
    <footer className="py-10 bg-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="font-display font-bold text-background text-sm">
            Juntos por Ubá
          </span>
        </div>
        <p className="text-xs text-background/40 max-w-sm mx-auto mb-4">
          Campanha organizada por artistas e influenciadores para ajudar as vítimas da enchente em Ubá, Minas Gerais.
        </p>
        <p className="text-[11px] text-background/25">
          © 2025 Juntos por Ubá · Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};
