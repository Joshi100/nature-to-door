import { useState, useCallback, useRef } from 'react';
import { validateEmailAddress, EmailValidationResult } from '@/utils/emailValidation';

export type EmailValidationStatus = 'idle' | 'typing' | 'validating' | 'valid' | 'invalid';

interface EmailValidationCache {
  [email: string]: EmailValidationResult;
}

interface UseEmailValidationResult {
  validationStatus: EmailValidationStatus;
  validationResult: EmailValidationResult | null;
  validateEmail: (email: string) => Promise<void>;
  isValid: boolean;
  isInvalid: boolean;
  isValidating: boolean;
}

export const useEmailValidation = (): UseEmailValidationResult => {
  const [validationStatus, setValidationStatus] = useState<EmailValidationStatus>('idle');
  const [validationResult, setValidationResult] = useState<EmailValidationResult | null>(null);
  const validationCache = useRef<EmailValidationCache>({});
  const debounceTimer = useRef<NodeJS.Timeout>();

  // Basic email format validation
  const isValidEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateEmail = useCallback(async (email: string) => {
    // Clear any existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // If email is empty, reset to idle
    if (!email.trim()) {
      setValidationStatus('idle');
      setValidationResult(null);
      return;
    }

    // Set typing status immediately
    setValidationStatus('typing');

    // Debounce the validation
    debounceTimer.current = setTimeout(async () => {
      // Check basic format first
      if (!isValidEmailFormat(email)) {
        setValidationStatus('invalid');
        setValidationResult({
          isValid: false,
          message: 'Please enter a valid email format'
        });
        return;
      }

      // Check cache first
      if (validationCache.current[email]) {
        const cachedResult = validationCache.current[email];
        setValidationStatus(cachedResult.isValid ? 'valid' : 'invalid');
        setValidationResult(cachedResult);
        return;
      }

      // Perform API validation
      setValidationStatus('validating');
      try {
        const result = await validateEmailAddress(email);
        
        // Cache the result
        validationCache.current[email] = result;
        
        setValidationStatus(result.isValid ? 'valid' : 'invalid');
        setValidationResult(result);
      } catch (error) {
        console.error('Email validation error:', error);
        // Fallback to basic format validation
        const fallbackResult: EmailValidationResult = {
          isValid: true,
          message: 'Email validation service temporarily unavailable'
        };
        setValidationStatus('valid');
        setValidationResult(fallbackResult);
      }
    }, 800); // Debounce delay
  }, []);

  return {
    validationStatus,
    validationResult,
    validateEmail,
    isValid: validationStatus === 'valid',
    isInvalid: validationStatus === 'invalid',
    isValidating: validationStatus === 'validating'
  };
};