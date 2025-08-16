import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import villageImage1 from "@/assets/nepal-village-1.jpg";
import villageImage2 from "@/assets/nepal-village-2.jpg";
import villageImage3 from "@/assets/nepal-village-3.jpg";

const HomeSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const villageImages = [
    { src: villageImage1, alt: "Traditional Farwest Nepal village with mountain backdrop" },
    { src: villageImage2, alt: "Scenic mountain village with traditional houses" },
    { src: villageImage3, alt: "Remote Himalayan village in valley setting" },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % villageImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + villageImages.length) % villageImages.length);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-background to-background/95 pt-24 pb-12"> {/* Account for navbar */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Welcome to RevoM
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover the authentic beauty of Farwest Nepal's villages and connect with local producers
          </p>

          {/* Village Images Showcase */}
          <Card className="bg-card/80 backdrop-blur-lg border-border shadow-nature max-w-3xl mx-auto">
            <CardContent className="p-6">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Discover Authentic Himalayan Villages
              </h2>
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden mb-6 shadow-elevation">
                  <img 
                    src={villageImages[currentImageIndex].src}
                    alt={villageImages[currentImageIndex].alt}
                    className="w-full h-full object-cover transition-all duration-500 hover-lift"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevImage}
                    className="hover-glow transition-nature"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <div className="flex space-x-3">
                    {villageImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-4 h-4 rounded-full transition-nature ${
                          index === currentImageIndex 
                            ? 'bg-primary shadow-glow' 
                            : 'bg-muted hover:bg-muted-foreground/50'
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextImage}
                    className="hover-glow transition-nature"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-2">Authentic Culture</h3>
                  <p className="text-muted-foreground text-sm">
                    Experience the rich traditions and heritage of Himalayan communities
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-2">Organic Products</h3>
                  <p className="text-muted-foreground text-sm">
                    Direct access to pure, organic products from mountain farmers
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-2">Sustainable Trade</h3>
                  <p className="text-muted-foreground text-sm">
                    Supporting fair trade and sustainable development in rural areas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;