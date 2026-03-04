import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Copy, Check, Shield, ArrowLeft, Loader2, QrCode } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const presetValues = [25, 50, 100, 250, 500, 1000];

type Step = "amount" | "form" | "payment";

interface PaymentData {
  qr_code: string;
  qr_code_base64: string;
  transaction_id: number;
  expires_at: string;
}

export const DonateSection = () => {
  const [step, setStep] = useState<Step>("amount");
  const [selected, setSelected] = useState<number>(50);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");

  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleCopyPix = () => {
    if (paymentData?.qr_code) {
      navigator.clipboard.writeText(paymentData.qr_code);
      setCopied(true);
      toast.success("Código PIX copiado!");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !cpf.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }

    const cleanCpf = cpf.replace(/\D/g, "");
    if (cleanCpf.length !== 11 && cleanCpf.length !== 14) {
      toast.error("CPF/CNPJ inválido");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("create-pix-payment", {
        body: {
          amount: selected * 100,
          name: name.trim(),
          email: email.trim(),
          phone: phone.replace(/\D/g, ""),
          document: cleanCpf,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setPaymentData(data);
      setStep("payment");
      toast.success("PIX gerado com sucesso!");
    } catch (err: any) {
      console.error("Payment error:", err);
      toast.error(err.message || "Erro ao gerar pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="doar" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold font-display text-foreground mb-2">
              Faça sua doação
            </h2>
            <p className="text-sm text-muted-foreground">
              Qualquer valor faz a diferença para quem perdeu tudo
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-elevated overflow-hidden">
            <AnimatePresence mode="wait">
              {/* STEP 1: Choose Amount */}
              {step === "amount" && (
                <motion.div
                  key="amount"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                    Escolha um valor
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {presetValues.map((val) => (
                      <button
                        key={val}
                        onClick={() => setSelected(val)}
                        className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                          selected === val
                            ? "bg-primary text-primary-foreground border-primary shadow-cta"
                            : "bg-background text-foreground border-border hover:border-primary/30"
                        }`}
                      >
                        R$ {val}
                      </button>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-gradient-cta text-primary-foreground font-bold text-base py-6 hover:opacity-90 transition-all shadow-cta rounded-xl active:scale-[0.98]"
                    onClick={() => setStep("form")}
                  >
                    <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                    Doar R$ {selected}
                  </Button>
                </motion.div>
              )}

              {/* STEP 2: Customer Form */}
              {step === "form" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => setStep("amount")}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </button>

                  <div className="flex items-center justify-between mb-5">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Seus dados
                    </p>
                    <span className="text-sm font-bold text-primary">R$ {selected},00</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Input
                      placeholder="Nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-xl"
                      maxLength={100}
                    />
                    <Input
                      placeholder="E-mail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl"
                      maxLength={255}
                    />
                    <Input
                      placeholder="Telefone (com DDD)"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      className="rounded-xl"
                      maxLength={15}
                    />
                    <Input
                      placeholder="CPF"
                      value={cpf}
                      onChange={(e) => setCpf(formatCPF(e.target.value))}
                      className="rounded-xl"
                      maxLength={14}
                    />
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-gradient-cta text-primary-foreground font-bold text-base py-6 hover:opacity-90 transition-all shadow-cta rounded-xl active:scale-[0.98]"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Gerando PIX...
                      </>
                    ) : (
                      <>
                        <QrCode className="w-5 h-5 mr-2" />
                        Gerar PIX de R$ {selected},00
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 mt-4">
                    <Shield className="w-3 h-3 text-primary" />
                    <p className="text-[11px] text-muted-foreground">
                      Seus dados estão seguros e protegidos
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: QR Code Payment */}
              {step === "payment" && paymentData && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => setStep("amount")}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Nova doação
                  </button>

                  <div className="text-center mb-5">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-bold mb-3">
                      <QrCode className="w-4 h-4" />
                      PIX Gerado
                    </div>
                    <p className="text-2xl font-extrabold font-display text-foreground">
                      R$ {selected},00
                    </p>
                  </div>

                  {/* QR Code Image */}
                  {paymentData.qr_code_base64 && (
                    <div className="flex justify-center mb-5">
                      <div className="bg-white p-4 rounded-2xl shadow-card">
                        <img
                          src={paymentData.qr_code_base64}
                          alt="QR Code PIX"
                          className="w-48 h-48"
                        />
                      </div>
                    </div>
                  )}

                  {/* Copy PIX code */}
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Ou copie o código PIX
                  </p>
                  <div className="flex items-center gap-2 bg-muted rounded-xl p-3 mb-5">
                    <code className="text-xs font-mono text-foreground flex-1 truncate">
                      {paymentData.qr_code}
                    </code>
                    <button
                      onClick={handleCopyPix}
                      className="p-2 rounded-lg bg-background hover:bg-card transition-colors border border-border flex-shrink-0"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-gradient-cta text-primary-foreground font-bold text-base py-6 hover:opacity-90 transition-all shadow-cta rounded-xl active:scale-[0.98]"
                    onClick={handleCopyPix}
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Código copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 mr-2" />
                        Copiar código PIX
                      </>
                    )}
                  </Button>

                  {paymentData.expires_at && (
                    <p className="text-center text-[11px] text-muted-foreground mt-3">
                      Expira em: {new Date(paymentData.expires_at).toLocaleString("pt-BR")}
                    </p>
                  )}

                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <Shield className="w-3 h-3 text-primary" />
                    <p className="text-[11px] text-muted-foreground">
                      100% do valor vai direto para as vítimas
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
