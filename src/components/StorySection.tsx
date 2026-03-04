import { motion } from "framer-motion";

export const StorySection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-foreground mb-6">
              Sobre a campanha
            </h2>

            <div className="prose prose-sm md:prose-base text-muted-foreground leading-relaxed space-y-4">
              <p>
                No início de março de 2025, <strong className="text-foreground">a cidade de Ubá, em Minas Gerais, foi devastada por uma enchente histórica</strong>. As fortes chuvas fizeram os rios transbordarem, arrastando casas inteiras, destruindo comércios e deixando centenas de famílias completamente desabrigadas.
              </p>
              <p>
                Muitas pessoas <strong className="text-foreground">perderam tudo</strong>: suas casas, seus pertences, suas memórias. Crianças ficaram sem escola, idosos sem medicamentos, famílias inteiras sem ter onde dormir. A situação é de emergência absoluta.
              </p>
              <p>
                Diante dessa tragédia, um grupo de artistas e influenciadores — incluindo <strong className="text-foreground">MC Kevin Chris, Chris Dias, RSP, Débora Paixão, Thaís Carla e Vitão</strong> — decidiram agir. Juntos, criaram esta vaquinha para arrecadar fundos e levar ajuda direta às vítimas.
              </p>
              <p>
                <strong className="text-foreground">100% do valor arrecadado</strong> será destinado a comprar alimentos, roupas, materiais de higiene, colchões e itens de primeira necessidade para as famílias afetadas.
              </p>
            </div>

            <div className="mt-8 p-5 rounded-xl bg-muted/60 border border-border">
              <p className="text-sm font-semibold text-foreground mb-2">Como os recursos serão usados:</p>
              <ul className="space-y-2">
                {[
                  "🏠 Kits de moradia temporária e colchões",
                  "🍚 Cestas básicas e água potável",
                  "👕 Roupas e cobertores",
                  "💊 Medicamentos e itens de higiene",
                  "🧒 Material escolar para crianças"
                ].map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
