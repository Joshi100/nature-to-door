import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmailInput } from "@/components/ui/email-input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Sprout, ShoppingBag, Truck, Eye, EyeOff, Loader2, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEmailValidation } from "@/hooks/useEmailValidation";
import type { User, Session } from '@supabase/supabase-js';

type UserRole = 'producer' | 'customer' | 'transport';

interface AuthSectionProps {
  onBack: () => void;
}

export default function AuthSection({ onBack }: AuthSectionProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupMethod, setSignupMethod] = useState<'phone' | 'email'>('phone');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [pendingEmailSignup, setPendingEmailSignup] = useState(false);
  
  // Enhanced email validation
  const { 
    validationStatus, 
    validationResult, 
    validateEmail, 
    isValid: isEmailValid, 
    isInvalid: isEmailInvalid,
    isValidating: isEmailValidating 
  } = useEmailValidation();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && event === 'SIGNED_IN') {
          // For phone OTP users, create profile if it doesn't exist
          if (otpStep && signupMethod === 'phone') {
            try {
              const { data: existingProfile } = await supabase
                .from('profiles')
                .select('id')
                .eq('user_id', session.user.id)
                .single();

              if (!existingProfile) {
                // Create profile for phone user
                await supabase.from('profiles').insert({
                  user_id: session.user.id,
                  email: session.user.email,
                  first_name: formData.firstName,
                  last_name: formData.lastName,
                  role: selectedRole,
                  phone: formData.phone
                });
              }
            } catch (error) {
              console.error('Profile creation error:', error);
            }
          }

          toast({
            title: "Welcome!",
            description: "Successfully signed in to your account.",
          });
          // Redirect to main app or dashboard
          onBack();
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [toast, onBack, otpStep, signupMethod, formData.firstName, formData.lastName, formData.phone, selectedRole]);

  // Handle email input changes with real-time validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData(prev => ({ ...prev, email }));
    
    // Trigger real-time validation
    validateEmail(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast({
        title: "Role Required",
        description: "Please select your role before signing up.",
        variant: "destructive",
      });
      return;
    }

    // Validate based on signup method
    if (signupMethod === 'email') {
      if (!formData.email) {
        toast({
          title: "Email Required",
          description: "Please enter your email address.",
          variant: "destructive",
        });
        return;
      }
      if (isEmailInvalid) {
        toast({
          title: "Invalid Email",
          description: validationResult?.message || "Please enter a valid, existing email address.",
          variant: "destructive",
        });
        return;
      }
    } else if (signupMethod === 'phone') {
      if (!formData.phone) {
        toast({
          title: "Phone Required",
          description: "Please enter your phone number.",
          variant: "destructive",
        });
        return;
      }
      if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
        toast({
          title: "Invalid Phone",
          description: "Please enter a valid phone number.",
          variant: "destructive",
        });
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords don't match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      if (signupMethod === 'phone') {
        // Send OTP to phone number for verification first
        const { error } = await supabase.auth.signInWithOtp({
          phone: formData.phone,
        });

        if (error) {
          toast({
            title: "OTP Send Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "OTP Sent!",
            description: "Please check your phone for the verification code.",
          });
          setOtpStep(true);
        }
      } else {
        // Email signup - send OTP first
        const { error } = await supabase.auth.signInWithOtp({
          email: formData.email,
        });

        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: "Account Exists",
              description: `An account with this ${signupMethod} already exists. Please sign in instead.`,
              variant: "destructive",
            });
          } else {
            toast({
              title: "OTP Send Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "OTP Sent!",
            description: "Please check your email for the verification code.",
          });
          setPendingEmailSignup(true);
          setOtpStep(true);
        }
      }
    } catch (error: any) {
      toast({
        title: "Signup Error",
        description: error.message || "An unexpected error occurred during signup.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (signupMethod === 'phone') {
        // Verify OTP and complete phone signup
        const { error } = await supabase.auth.verifyOtp({
          phone: formData.phone,
          token: otp,
          type: 'sms'
        });

        if (error) {
          toast({
            title: "Verification Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Phone Verified!",
            description: "Your account has been created successfully.",
          });
          // User will be automatically signed in after successful OTP verification
        }
      } else if (signupMethod === 'email' && pendingEmailSignup) {
        // Verify OTP and complete email signup
        const { error } = await supabase.auth.verifyOtp({
          email: formData.email,
          token: otp,
          type: 'email'
        });

        if (error) {
          toast({
            title: "Verification Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          // Now create the actual account with password
          const redirectUrl = `${window.location.origin}/`;
          const { error: signupError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              emailRedirectTo: redirectUrl,
              data: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                role: selectedRole
              }
            }
          });

          if (signupError) {
            toast({
              title: "Account Creation Failed",
              description: signupError.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Email Verified & Account Created!",
              description: "You can now sign in with your credentials.",
            });
            setOtpStep(false);
            setPendingEmailSignup(false);
            setIsSignup(false);
          }
        }
      }
    } catch (error: any) {
      toast({
        title: "Verification Error",
        description: error.message || "An unexpected error occurred during verification.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSignup = () => {
    setOtpStep(false);
    setOtp('');
    setPendingEmailSignup(false);
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast({
        title: "Role Required",
        description: "Please select your role before signing in.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Support both email and phone signin
      const identifier = formData.email || formData.phone;
      const isPhone = /^\+?[\d\s\-\(\)]{10,}$/.test(identifier);
      
      const { error } = await supabase.auth.signInWithPassword(
        isPhone 
          ? { phone: identifier, password: formData.password }
          : { email: identifier, password: formData.password }
      );

      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Sign In Error",
        description: error.message || "An unexpected error occurred during sign in.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'producer':
        return <Sprout className="w-6 h-6" />;
      case 'customer':
        return <ShoppingBag className="w-6 h-6" />;
      case 'transport':
        return <Truck className="w-6 h-6" />;
    }
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'producer':
        return 'Share your farm-fresh products with the community';
      case 'customer':
        return 'Discover and purchase local, fresh products';
      case 'transport':
        return 'Provide pickup and delivery services';
    }
  };

  // Role selection view
  if (!selectedRole) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-mountain-gradient flex items-center justify-center p-4 py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="text-center px-4 sm:px-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold">Choose Your Role</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Select how you'd like to participate in the RevoM community
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {(['producer', 'customer', 'transport'] as UserRole[]).map((role) => (
                <Card 
                  key={role}
                  className="cursor-pointer border-2 hover:border-primary transition-colors hover-lift"
                  onClick={() => setSelectedRole(role)}
                >
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      {getRoleIcon(role)}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 capitalize">{role}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {getRoleDescription(role)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // OTP verification view
  if (otpStep && isSignup) {
    const isPhoneOtp = signupMethod === 'phone';
    const isEmailOtp = signupMethod === 'email' && pendingEmailSignup;
    
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-mountain-gradient flex items-center justify-center p-4 py-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center px-4 sm:px-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              {isPhoneOtp ? <Phone className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Verify Your {isPhoneOtp ? 'Phone Number' : 'Email Address'}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Enter the 6-digit code sent to {isPhoneOtp ? formData.phone : formData.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleOtpVerification} className="space-y-4">
              <div>
                <Label htmlFor="otp" className="text-sm">Verification Code</Label>
                <div className="mt-1 flex justify-center">
                  <InputOTP
                    value={otp}
                    onChange={(value) => {
                      setOtp(value);
                      // Auto-submit when 6 digits are entered
                      if (value.length === 6 && !isLoading) {
                        setTimeout(() => {
                          handleOtpVerification({ preventDefault: () => {} } as React.FormEvent);
                        }, 100);
                      }
                    }}
                    maxLength={6}
                    disabled={isLoading}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full text-sm sm:text-base"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Create Account'
                )}
              </Button>

              <div className="text-center space-y-2">
                <Button
                  type="button"
                  variant="link"
                  onClick={handleBackToSignup}
                  disabled={isLoading}
                  className="text-xs sm:text-sm"
                >
                  ← Back to Sign Up
                </Button>
                
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsLoading(true);
                    const otpRequest = isPhoneOtp 
                      ? supabase.auth.signInWithOtp({ phone: formData.phone })
                      : supabase.auth.signInWithOtp({ email: formData.email });
                    
                    otpRequest
                      .then(() => {
                        toast({
                          title: "Code Resent",
                          description: `A new verification code has been sent to your ${isPhoneOtp ? 'phone' : 'email'}.`,
                        });
                      })
                      .catch((error) => {
                        toast({
                          title: "Resend Failed",
                          description: error.message,
                          variant: "destructive",
                        });
                      })
                      .finally(() => setIsLoading(false));
                  }}
                  disabled={isLoading}
                  className="text-xs sm:text-sm"
                >
                  Resend Code
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main auth form
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-mountain-gradient flex items-center justify-center p-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center px-4 sm:px-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            {getRoleIcon(selectedRole)}
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold">
            {isSignup ? 'Sign Up' : 'Sign In'} as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {getRoleDescription(selectedRole)}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={isSignup ? handleSignup : handleSignin} className="space-y-3 sm:space-y-4">
            {isSignup && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </>
            )}

            {isSignup && (
              <div className="space-y-3">
                <Label className="text-sm">Sign up with</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={signupMethod === 'phone' ? 'default' : 'outline'}
                    onClick={() => setSignupMethod('phone')}
                    className="flex-1 flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                    Phone Number
                  </Button>
                  <Button
                    type="button"
                    variant={signupMethod === 'email' ? 'default' : 'outline'}
                    onClick={() => setSignupMethod('email')}
                    className="flex-1 flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                    Email
                  </Button>
                </div>
              </div>
            )}

            {(isSignup && signupMethod === 'phone') || (!isSignup) ? (
              <div>
                <Label htmlFor="phone" className="text-sm">
                  {isSignup ? 'Phone Number' : 'Phone Number or Email'}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone || formData.email}
                  onChange={(e) => {
                    if (isSignup) {
                      setFormData(prev => ({ ...prev, phone: e.target.value }));
                    } else {
                      setFormData(prev => ({ 
                        ...prev, 
                        phone: e.target.value,
                        email: e.target.value 
                      }));
                    }
                  }}
                  required
                  disabled={isLoading}
                  className="mt-1"
                  placeholder={isSignup ? "Enter your phone number" : "Enter phone number or email"}
                />
                {isSignup && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended for Himalayan producers. We'll send a verification code.
                  </p>
                )}
              </div>
            ) : (
              <div>
                <Label htmlFor="email" className="text-sm">Email</Label>
                <EmailInput
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  onBlur={(e) => validateEmail(e.target.value)}
                  validationStatus={validationStatus}
                  validationMessage={validationResult?.message}
                  required
                  disabled={isLoading}
                  className="mt-1"
                  placeholder="Enter your email address"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  We'll verify this is a real, active email address.
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="password" className="text-sm">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-2 sm:px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4" />}
                </Button>
              </div>
            </div>

            {isSignup && (
              <div>
                <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-2 sm:px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </Button>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full text-sm sm:text-base"
              disabled={isLoading || isEmailValidating || (isSignup && signupMethod === 'email' && isEmailInvalid)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                  {isSignup ? 'Creating Account...' : 'Signing In...'}
                </>
              ) : (
                isSignup ? 'Create Account' : 'Sign In'
              )}
            </Button>

            <div className="text-center space-y-1 sm:space-y-2">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsSignup(!isSignup)}
                disabled={isLoading}
                className="text-xs sm:text-sm"
              >
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
              
              <div>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setSelectedRole(null)}
                  disabled={isLoading}
                  className="text-xs sm:text-sm"
                >
                  Change Role
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}