import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Facebook } from "lucide-react";

const LoginSection = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'producer' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Authentication requires Supabase integration for secure login/signup functionality.");
  };

  const handleGoogleAuth = () => {
    alert("Google authentication requires Supabase integration.");
  };

  const handleFacebookAuth = () => {
    alert("Facebook authentication requires Supabase integration.");
  };

  const handlePhoneAuth = () => {
    alert("Phone authentication requires Supabase integration.");
  };

  if (isSignup && !userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Join RevoM
              </h1>
              <p className="text-xl text-muted-foreground">
                Choose how you want to join our platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Customer Signup */}
              <Card className="shadow-nature hover-lift cursor-pointer transition-nature group" onClick={() => setUserType('customer')}>
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-nature">
                    <span className="text-4xl">🛒</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Join as Customer
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Discover and purchase authentic products directly from Himalayan producers
                  </p>
                  <Button variant="outline" size="lg" className="w-full">
                    Sign Up as Customer
                  </Button>
                </CardContent>
              </Card>

              {/* Producer Signup */}
              <Card className="shadow-nature hover-lift cursor-pointer transition-nature group" onClick={() => setUserType('producer')}>
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-nature">
                    <span className="text-4xl">🌱</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Join as Producer
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Connect directly with customers and sell your authentic Himalayan products
                  </p>
                  <Button variant="producer" size="lg" className="w-full">
                    Sign Up as Producer
                  </Button>
                </CardContent>
              </Card>

              <div className="text-center mt-8">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsSignup(false)}
                  className="text-primary hover:text-primary"
                >
                  Back to Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-md mx-auto">
          <Card className="shadow-nature">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {isSignup ? `Sign Up as ${userType}` : 'Welcome Back'}
                </h1>
                <p className="text-muted-foreground">
                  {isSignup ? 'Create your account' : 'Login to your account'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignup && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        required 
                        className="mt-1"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        required 
                        className="mt-1"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    className="mt-1"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    className="mt-1"
                    placeholder="Enter your password"
                  />
                </div>

                {isSignup && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      required 
                      className="mt-1"
                      placeholder="Confirm your password"
                    />
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="producer" 
                  size="lg" 
                  className="w-full"
                >
                  {isSignup ? 'Create Account' : 'Sign In'}
                </Button>
              </form>

              {isSignup && (
                <>
                  <div className="relative my-6">
                    <Separator />
                    <span className="absolute inset-x-0 -top-3 mx-auto w-fit bg-card px-4 text-sm text-muted-foreground">
                      Or sign up with
                    </span>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full"
                      onClick={handleGoogleAuth}
                    >
                      <span className="mr-2">🔍</span>
                      Continue with Google
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full"
                      onClick={handleFacebookAuth}
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Continue with Facebook
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full"
                      onClick={handlePhoneAuth}
                    >
                      <span className="mr-2">📱</span>
                      Continue with Phone
                    </Button>
                  </div>
                </>
              )}

              <div className="text-center mt-8">
                {!isSignup ? (
                  <div>
                    <p className="text-muted-foreground mb-4">
                      New to RevoM, or don't have a RevoM account?
                    </p>
                    <Button 
                      variant="ghost" 
                      onClick={() => setIsSignup(true)}
                      className="text-primary hover:text-primary"
                    >
                      Sign up
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-muted-foreground mb-2">
                      Already have an account?
                    </p>
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        setIsSignup(false);
                        setUserType(null);
                      }}
                      className="text-primary hover:text-primary"
                    >
                      Sign in
                    </Button>
                  </div>
                )}
              </div>

              <p className="text-xs text-muted-foreground text-center mt-6">
                Note: Full authentication requires Supabase integration for secure user management.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;