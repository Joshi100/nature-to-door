import { supabase } from '@/integrations/supabase/client';

export interface EmailValidationResult {
  isValid: boolean;
  message?: string;
  details?: any;
}

export const validateEmailAddress = async (email: string): Promise<EmailValidationResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('validate-email', {
      body: { email }
    });

    if (error) {
      console.error('Email validation error:', error);
      return {
        isValid: true, // Allow signup if validation service fails
        message: 'Email validation service temporarily unavailable'
      };
    }

    return data;
  } catch (error) {
    console.error('Email validation error:', error);
    return {
      isValid: true, // Allow signup if validation service fails
      message: 'Email validation service temporarily unavailable'
    };
  }
};