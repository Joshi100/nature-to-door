import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/himalayan-hero.jpg";
import villageImage1 from "@/assets/nepal-village-1.jpg";
import villageImage2 from "@/assets/nepal-village-2.jpg";
import villageImage3 from "@/assets/nepal-village-3.jpg";

interface HeroSectionProps {
  onSectionChange?: (section: string) => void;
}

const HeroSection = ({ onSectionChange }: HeroSectionProps) => {
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
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            Connecting Nature with Technology
          </h2>
          <p className="text-xl md:text-2xl mb-12 drop-shadow-lg max-w-2xl mx-auto font-light">
            Bridging Himalayan producers with urban consumers through innovative supply chain solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              variant="hero"
              className="text-lg px-8 py-6 shadow-2xl"
              onClick={() => onSectionChange?.('explore')}
            >
              Start Exploring
            </Button>
            <Button 
              size="lg" 
              variant="producer"
              className="text-lg px-8 py-6 shadow-2xl"
              onClick={() => onSectionChange?.('login')}
            >
              Join as Producer
            </Button>
          </div>

          {/* Village Images Showcase */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Discover Authentic Himalayan Villages
              </h3>
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img 
                    src={villageImages[currentImageIndex].src}
                    alt={villageImages[currentImageIndex].alt}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <div className="flex space-x-2">
                    {villageImages.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="text-white hover:bg-white/20"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;