import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, ShoppingBag, Truck, Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
  const [emailValidating, setEmailValidating] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && event === 'SIGNED_IN') {
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
  }, [toast, onBack]);

  const validateEmail = async (email: string): Promise<boolean> => {
    if (!email) return false;
    
    setEmailValidating(true);
    try {
      const { data, error } = await supabase.functions.invoke('validate-email', {
        body: { email }
      });

      if (error) {
        console.error('Email validation error:', error);
        return true; // Allow signup if validation service fails
      }

      if (!data.isValid && data.message) {
        toast({
          title: "Invalid Email",
          description: data.message,
          variant: "destructive",
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Email validation error:', error);
      return true; // Allow signup if validation service fails
    } finally {
      setEmailValidating(false);
    }
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

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords don't match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Validate email before signup
    const isEmailValid = await validateEmail(formData.email);
    if (!isEmailValid) return;

    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
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

      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Account Exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup Failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Check Your Email",
          description: "We've sent you a confirmation link. Please check your email to complete signup.",
        });
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
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

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

            <div>
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={emailValidating}
                className="mt-1"
              />
              {emailValidating && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center gap-2">
                  <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                  Validating email...
                </p>
              )}
            </div>

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
              disabled={isLoading || emailValidating}
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