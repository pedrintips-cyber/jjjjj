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
    const payload = await req.json();
    
    console.log('Webhook received:', JSON.stringify(payload));

    const { transaction_id, external_id, status, amount, customer } = payload;

    // Log the webhook for now - in the future this could update a donations table
    console.log(`Transaction ${transaction_id} (${external_id}): ${status} - R$ ${(amount / 100).toFixed(2)}`);
    
    if (status === 'approved') {
      console.log(`✅ Payment approved! Donor: ${customer?.name}, Amount: R$ ${(amount / 100).toFixed(2)}`);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
