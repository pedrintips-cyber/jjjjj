import { motion } from "framer-motion";
import { MessageCircle, Heart } from "lucide-react";

const comments = [
  {
    name: "Maria Souza",
    time: "há 2 horas",
    message: "Força, Ubá! Deus abençoe cada família que está passando por essa dificuldade. Estamos juntos! 🙏",
    amount: 100,
  },
  {
    name: "Carlos Henrique",
    time: "há 3 horas",
    message: "Cresci em Ubá e ver a cidade assim parte meu coração. Doei o que pude, espero que ajude! Vamos reconstruir juntos.",
    amount: 250,
  },
  {
    name: "Ana Paula",
    time: "há 5 horas",
    message: "Vi a situação pelos stories do MC Kevin Chris e não pensei duas vezes. Que essa vaquinha alcance muita gente! 💚",
    amount: 50,
  },
  {
    name: "Roberto Lima",
    time: "há 6 horas",
    message: "Qualquer valor faz diferença, gente. Vamos compartilhar essa campanha o máximo possível!",
    amount: 25,
  },
  {
    name: "Juliana Ferreira",
    time: "há 8 horas",
    message: "Minha família é de Ubá. Obrigada a todos que estão se mobilizando. Essa união é linda demais! ❤️",
    amount: 500,
  },
];

export const CommentsSection = () => {
  return (
    <section className="py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-1">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground">
                Comentários
              </h2>
              <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                {comments.length}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Mensagens de apoio da comunidade</p>

            <div className="space-y-3">
              {comments.map((comment, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card rounded-xl border border-border p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {comment.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">{comment.name}</p>
                        <p className="text-[11px] text-muted-foreground">{comment.time}</p>
                      </div>
                    </div>
                    {comment.amount && (
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Heart className="w-3 h-3" fill="currentColor" />
                        R$ {comment.amount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-[42px]">
                    {comment.message}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
