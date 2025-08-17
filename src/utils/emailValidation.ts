import { supabase } from '@/integrations/supabase/client';

export interface EmailValidationResult {
  isValid: boolean;
  message?: string;
  details?: any;
}

// Basic email format validation
const isValidEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Enhanced email validation with better error handling
export const validateEmailAddress = async (email: string): Promise<EmailValidationResult> => {
  // First check basic format
  if (!email || !isValidEmailFormat(email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address format'
    };
  }

  try {
    const { data, error } = await supabase.functions.invoke('validate-email', {
      body: { email }
    });

    if (error) {
      console.error('Email validation API error:', error);
      // Fallback to basic format validation if API fails
      return {
        isValid: true,
        message: 'Email format is valid (validation service unavailable)'
      };
    }

    // Return API result with enhanced messaging
    return {
      isValid: data.isValid,
      message: data.isValid 
        ? 'Email is valid and available' 
        : (data.message || 'This email address appears to be invalid'),
      details: data.details
    };
  } catch (error) {
    console.error('Email validation error:', error);
    // Fallback to basic format validation
    return {
      isValid: true,
      message: 'Email format is valid (validation service unavailable)'
    };
  }
};