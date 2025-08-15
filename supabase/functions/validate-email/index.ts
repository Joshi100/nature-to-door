import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailValidationRequest {
  email: string;
}

interface EmailValidationResponse {
  isValid: boolean;
  message?: string;
  details?: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: EmailValidationRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ isValid: false, message: 'Email is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ isValid: false, message: 'Invalid email format' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Use ZeroBounce API for email validation (you can replace with other providers)
    const apiKey = Deno.env.get('EMAIL_VALIDATION_API_KEY');
    
    if (!apiKey) {
      console.log('Email validation API key not configured, skipping validation');
      return new Response(
        JSON.stringify({ isValid: true, message: 'Email validation skipped - API key not configured' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Example using ZeroBounce API (replace with your preferred provider)
    const validationUrl = `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(email)}`;
    
    const response = await fetch(validationUrl);
    const validationResult = await response.json();

    console.log('Email validation result:', validationResult);

    // ZeroBounce response statuses: valid, invalid, catch-all, unknown, spamtrap, abuse, do_not_mail
    const isValid = validationResult.status === 'valid';
    
    let message = '';
    if (!isValid) {
      switch (validationResult.status) {
        case 'invalid':
          message = 'This email address is invalid';
          break;
        case 'catch-all':
          message = 'This email domain accepts all emails - verification uncertain';
          break;
        case 'unknown':
          message = 'Email verification status unknown';
          break;
        case 'spamtrap':
          message = 'This email is identified as a spam trap';
          break;
        case 'abuse':
          message = 'This email is associated with abuse';
          break;
        case 'do_not_mail':
          message = 'This email should not be used for mailing';
          break;
        default:
          message = 'Email validation failed';
      }
    }

    return new Response(
      JSON.stringify({
        isValid,
        message,
        details: validationResult
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in validate-email function:', error);
    
    // If validation service fails, allow the email through but log the error
    return new Response(
      JSON.stringify({
        isValid: true,
        message: 'Email validation service temporarily unavailable',
        error: error.message
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);