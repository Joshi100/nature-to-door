import { Card, CardContent } from "@/components/ui/card";

const ExploreSection = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background to-accent py-8 sm:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Explore Products
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover authentic products from Himalayan producers
            </p>
          </div>

          {/* Coming Soon Card */}
          <Card className="shadow-nature hover-lift">
            <CardContent className="p-16 text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl">🏔️</span>
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">
                Products Coming Soon
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're working on connecting with amazing producers from the Himalayan regions. 
                Soon you'll be able to explore and purchase authentic organic products directly from farmers.
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌾</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Organic Grains</h3>
                  <p className="text-sm text-muted-foreground">Fresh from the hills</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🍯</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Natural Honey</h3>
                  <p className="text-sm text-muted-foreground">Pure mountain honey</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🥜</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Dry Fruits</h3>
                  <p className="text-sm text-muted-foreground">Handpicked quality</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Want to become a producer? Join our platform and start selling your authentic products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;