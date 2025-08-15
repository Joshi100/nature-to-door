import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Sprout, ArrowRight } from "lucide-react";

const RoleSelection = () => {
  return (
    <section id="explore" className="py-20 bg-accent">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Choose Your Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're a Himalayan producer or an urban consumer, 
            RevoM connects you to a sustainable future.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Producer Card */}
          <Card className="relative overflow-hidden hover-lift group cursor-pointer border-2 hover:border-primary/50">
            <div className="absolute inset-0 forest-gradient opacity-5 group-hover:opacity-10 transition-nature"></div>
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-nature">
                <Sprout className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold">Producer</CardTitle>
              <CardDescription className="text-lg">
                Share your authentic Himalayan products with the world
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Upload and showcase your products</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Connect with urban consumers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Optimize transportation routes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Track product availability</span>
                </div>
              </div>
              <Button 
                size="lg" 
                variant="producer"
                className="w-full"
              >
                Join as Producer
              </Button>
            </CardContent>
          </Card>

          {/* Separator */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Separator orientation="vertical" className="h-64 w-px bg-border" />
          </div>

          {/* Customer Card */}
          <Card className="relative overflow-hidden hover-lift group cursor-pointer border-2 hover:border-primary/50">
            <div className="absolute inset-0 mountain-gradient opacity-5 group-hover:opacity-10 transition-nature"></div>
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-nature">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold">Customer</CardTitle>
              <CardDescription className="text-lg">
                Discover authentic products from the Himalayas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Explore authentic Himalayan products</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Filter by type, location, and benefits</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Connect directly with producers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Support sustainable commerce</span>
                </div>
              </div>
              <Button variant="nature" className="w-full group">
                Start Shopping
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Not sure which path to choose? Learn more about our platform.
          </p>
          <Button variant="outline" size="lg">
            Learn More About RevoM
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoleSelection;