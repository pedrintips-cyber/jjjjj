import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, name, email, phone, document: cpf } = await req.json();

    // Validate inputs
    if (!amount || !name || !email || !phone || !cpf) {
      return new Response(
        JSON.stringify({ error: 'Campos obrigatórios: amount, name, email, phone, document' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (typeof amount !== 'number' || amount < 100) {
      return new Response(
        JSON.stringify({ error: 'Valor mínimo: R$ 1,00 (100 centavos)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('PARADISE_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API Key não configurada' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const reference = `VAQUINHA-UBA-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const postbackUrl = `${supabaseUrl}/functions/v1/paradise-webhook`;

    const response = await fetch('https://multi.paradisepags.com/api/v1/transaction.php', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        description: 'Doação Vaquinha Ubá - Enchentes',
        reference,
        postback_url: postbackUrl,
        source: 'api_externa',
        customer: {
          name,
          email,
          phone: phone.replace(/\D/g, ''),
          document: cpf.replace(/\D/g, ''),
        },
      }),
    });

    const data = await response.json();

    if (!response.ok || data.status === 'error') {
      console.error('Paradise API error:', data);
      return new Response(
        JSON.stringify({ error: data.message || 'Erro ao criar pagamento' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        transaction_id: data.transaction_id,
        reference: data.id || reference,
        qr_code: data.qr_code,
        qr_code_base64: data.qr_code_base64,
        amount: data.amount,
        expires_at: data.expires_at,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
