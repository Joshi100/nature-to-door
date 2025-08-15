import { Button } from "@/components/ui/button";
import { ArrowRight, Mountain, Users } from "lucide-react";
import heroImage from "@/assets/himalayan-hero.jpg";

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-8 border border-white/20">
          <Mountain className="w-4 h-4" />
          <span className="text-sm font-medium">Smart Supply Chain Platform</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Connecting{" "}
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Nature
          </span>{" "}
          with{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Technology
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
          Bridging Himalayan producers with urban consumers through intelligent 
          supply chain solutions and sustainable commerce.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="hero" 
            size="lg" 
            className="group min-w-[200px] text-lg py-6"
          >
            Start Exploring
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="nature" 
            size="lg" 
            className="group min-w-[200px] text-lg py-6 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
          >
            <Users className="w-5 h-5" />
            Join as Producer
          </Button>
        </div>

        {/* Stats */}
        <div className="flex justify-center items-center gap-8 md:gap-16 mt-16 text-white/80">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">1000+</div>
            <div className="text-sm md:text-base">Producers</div>
          </div>
          <div className="w-px h-12 bg-white/30"></div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
            <div className="text-sm md:text-base">Products</div>
          </div>
          <div className="w-px h-12 bg-white/30"></div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">10K+</div>
            <div className="text-sm md:text-base">Customers</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;