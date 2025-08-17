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

    // Use AbstractAPI for real email verification
    const apiKey = Deno.env.get('EMAIL_VALIDATION_API_KEY');
    
    if (!apiKey) {
      console.log('Email validation API key not configured, skipping validation');
      return new Response(
        JSON.stringify({ isValid: true, message: 'Email format valid - real verification skipped' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Use AbstractAPI Email Validation for real email existence checking
    const validationUrl = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`;
    
    const response = await fetch(validationUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const validationResult = await response.json();
    console.log('Email validation result:', validationResult);

    // AbstractAPI response analysis
    const isValidFormat = validationResult.is_valid_format?.value || false;
    const isDeliverable = validationResult.deliverability === 'DELIVERABLE';
    const isValidSmtp = validationResult.is_smtp_valid?.value || false;
    
    // Real email exists if it's deliverable and SMTP valid
    const isValid = isValidFormat && isDeliverable && isValidSmtp;
    
    let message = '';
    if (!isValid) {
      if (!isValidFormat) {
        message = 'Invalid email format';
      } else if (!isDeliverable) {
        message = 'This email address does not exist or is not deliverable';
      } else if (!isValidSmtp) {
        message = 'This email server does not accept emails';
      } else {
        message = 'Email verification failed';
      }
    } else {
      message = 'Email verified - this is a real, active email address';
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